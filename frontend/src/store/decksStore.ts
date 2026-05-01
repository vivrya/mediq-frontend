import { create } from "zustand";
import axios from "axios";
import type { ApiDeck, DecksApiResponse, ApiFlashcard, DeckFlashcardsApiResponse } from "@/types";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

// Dummy flashcard data used as fallback until /decks/{deckId}/flashcards is live
const DUMMY_FLASHCARDS: Record<string, ApiFlashcard[]> = {
  DK1: [
    { id: "DK1-FC1", order: 1, question: "What are the roots of the brachial plexus?", answer: "C5, C6, C7, C8, T1. Mnemonic: 'Rugby Teams Drink Cold Beer' (Roots, Trunks, Divisions, Cords, Branches).", difficulty: "easy", tags: ["Anatomy", "Nerves"] },
    { id: "DK1-FC2", order: 2, question: "Which muscle is tested to assess C5 nerve root integrity?", answer: "Deltoid (shoulder abduction) and biceps brachii (elbow flexion) — both innervated primarily by C5 via the axillary and musculocutaneous nerves respectively.", difficulty: "medium", tags: ["Neurology", "Clinical"] },
    { id: "DK1-FC3", order: 3, question: "Name the contents of the carpal tunnel.", answer: "4 tendons of FDS, 4 tendons of FDP, 1 tendon of FPL, and the median nerve. The flexor carpi radialis runs in its own compartment. Mnemonic: 4+4+1+1.", difficulty: "medium", tags: ["Hand", "Surgery"] },
    { id: "DK1-FC4", order: 4, question: "What is the clinical significance of the femoral triangle boundaries?", answer: "The femoral triangle (inguinal ligament superiorly, sartorius laterally, adductor longus medially) contains the femoral nerve, artery, and vein (NAVY from lateral to medial). It is the site for femoral hernias and vascular access.", difficulty: "hard", tags: ["Pelvis", "Vascular"] },
    { id: "DK1-FC5", order: 5, question: "Which dermatome covers the nipple?", answer: "T4 — the fourth intercostal nerve. Useful landmark: T10 = umbilicus, T4 = nipple, T2 = inner upper arm.", difficulty: "easy", tags: ["Dermatomes", "Landmarks"] },
  ],
  DK2: [
    { id: "DK2-FC1", order: 1, question: "What is the mechanism of action of beta-blockers?", answer: "Competitive antagonism at β-adrenergic receptors. β1 blockade reduces heart rate and contractility (negative chronotropy and inotropy), decreasing cardiac output and BP.", difficulty: "easy", tags: ["Cardiology", "MOA"] },
    { id: "DK2-FC2", order: 2, question: "Why are ACE inhibitors contraindicated in bilateral renal artery stenosis?", answer: "Efferent arteriolar tone maintained by Ang II is critical to preserve GFR when afferent flow is reduced. ACE inhibitor removes this tone, causing acute kidney injury.", difficulty: "hard", tags: ["Renal", "ACE-I"] },
    { id: "DK2-FC3", order: 3, question: "What is the first-line drug for heart failure with reduced ejection fraction (HFrEF)?", answer: "ACE inhibitor (or ARB if intolerant) + beta-blocker + MRA. SGLT2 inhibitors (dapagliflozin/empagliflozin) are now added as a fourth pillar per recent guidelines.", difficulty: "medium", tags: ["HFrEF", "Guidelines"] },
    { id: "DK2-FC4", order: 4, question: "Statins work by inhibiting which enzyme?", answer: "HMG-CoA reductase — the rate-limiting step in hepatic cholesterol synthesis. This upregulates LDL receptors, increasing LDL clearance from the blood.", difficulty: "easy", tags: ["Statins", "MOA"] },
    { id: "DK2-FC5", order: 5, question: "What ECG change classically distinguishes digoxin effect from toxicity?", answer: "Digoxin effect = reverse-tick ST depression (scooped), shortened QT. Digoxin toxicity = any arrhythmia, especially PVCs, bidirectional VT, AV block — NOT just ST changes.", difficulty: "hard", tags: ["Digoxin", "ECG"] },
  ],
  DK3: [
    { id: "DK3-FC1", order: 1, question: "What is the mechanism by which aspirin irreversibly inhibits COX?", answer: "Aspirin acetylates a serine residue (Ser530 on COX-1, Ser516 on COX-2) in the active site, permanently blocking arachidonic acid binding and thromboxane/prostaglandin synthesis.", difficulty: "medium", tags: ["Aspirin", "COX"] },
    { id: "DK3-FC2", order: 2, question: "Benzodiazepines enhance which receptor, and how?", answer: "GABA-A receptor (ligand-gated Cl⁻ channel). Benzodiazepines increase the frequency of Cl⁻ channel opening in response to GABA — distinct from barbiturates which increase duration.", difficulty: "medium", tags: ["BZD", "GABA"] },
    { id: "DK3-FC3", order: 3, question: "By what mechanism does metformin lower blood glucose?", answer: "Activates AMPK in the liver → inhibits gluconeogenesis. Also improves peripheral insulin sensitivity. Does not cause hypoglycaemia alone. Inhibits mitochondrial complex I.", difficulty: "medium", tags: ["Metformin", "Diabetes"] },
    { id: "DK3-FC4", order: 4, question: "Warfarin inhibits which vitamin K-dependent clotting factors?", answer: "Factors II, VII, IX, X and proteins C and S. Warfarin blocks vitamin K epoxide reductase, preventing recycling of vitamin K to its active form needed for γ-carboxylation.", difficulty: "easy", tags: ["Warfarin", "Coagulation"] },
    { id: "DK3-FC5", order: 5, question: "What is the antidote for heparin overdose, and how does it work?", answer: "Protamine sulfate. It is a positively charged protein that binds the negatively charged heparin molecule, forming an inactive complex and rapidly reversing anticoagulation.", difficulty: "easy", tags: ["Heparin", "Antidote"] },
  ],
  DK4: [
    { id: "DK4-FC1", order: 1, question: "What X-ray finding is pathognomonic of tension pneumothorax?", answer: "Tracheal deviation away from the affected side, combined with absent lung markings, hyper-expanded hemithorax, and depressed ipsilateral hemidiaphragm. Treat immediately — do not wait for imaging.", difficulty: "hard", tags: ["Pneumothorax", "Emergency"] },
    { id: "DK4-FC2", order: 2, question: "How does a pleural effusion appear on an erect CXR?", answer: "Blunting of the costophrenic angle (>200 ml). Larger effusions show a meniscus sign (concave upper border), opacification of the lower zone, and mediastinal shift away (if large) or tracheal deviation toward (if loculated/collapsed).", difficulty: "medium", tags: ["Effusion", "CXR"] },
    { id: "DK4-FC3", order: 3, question: "Describe the 'air bronchogram' sign and its significance.", answer: "Air-filled bronchi visible within an area of opacification, indicating the surrounding alveoli are consolidated (filled with fluid/pus) while the airways remain patent. Classic for lobar pneumonia; not seen in pleural effusion.", difficulty: "medium", tags: ["Consolidation", "Signs"] },
    { id: "DK4-FC4", order: 4, question: "What is the Kerley B line and what does it indicate?", answer: "Short (1–2 cm), horizontal lines at the lung periphery perpendicular to the pleural surface, best seen at the lung bases. They represent thickened interlobular septa due to interstitial oedema — classic for pulmonary venous hypertension (e.g., heart failure).", difficulty: "hard", tags: ["Oedema", "Heart failure"] },
    { id: "DK4-FC5", order: 5, question: "Which CXR pattern is characteristic of sarcoidosis?", answer: "Bilateral hilar lymphadenopathy (BHL) — 'potato nodes' — often with paratracheal enlargement forming a '1-2-3 sign' or 'pawnbroker sign'. Upper-lobe reticular shadowing develops in fibrotic disease.", difficulty: "hard", tags: ["Sarcoidosis", "Hilar"] },
  ],
};

const DECK_COLORS: Record<string, string> = {
  "1": "#10B981",
  "2": "#EC4899",
  "3": "#0F52BA",
};

export function getDeckColor(courseId: string): string {
  return DECK_COLORS[courseId] ?? "#6366F1";
}

interface DecksState {
  decks: ApiDeck[];
  loading: boolean;
  error: string | null;
  fetched: boolean;

  flashcardsByDeck: Record<string, ApiFlashcard[]>;
  flashcardsLoading: Record<string, boolean>;
  flashcardsError: Record<string, string | null>;

  fetchDecks: () => Promise<void>;
  fetchDeckFlashcards: (deckId: string) => Promise<void>;
  getDeckById: (id: string) => ApiDeck | undefined;
}

export const useDecksStore = create<DecksState>((set, get) => ({
  decks: [],
  loading: false,
  error: null,
  fetched: false,

  flashcardsByDeck: {},
  flashcardsLoading: {},
  flashcardsError: {},

  fetchDecks: async () => {
    if (get().fetched) return;
    if (!API_BASE) {
      set({ error: "REACT_APP_API_BASE_URL is not set.", loading: false });
      return;
    }
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get<DecksApiResponse>(`${API_BASE}/decks`);
      set({ decks: data.data, loading: false, fetched: true });
    } catch {
      set({ error: "Failed to load decks. Please try again.", loading: false });
    }
  },

  fetchDeckFlashcards: async (deckId) => {
    if (get().flashcardsByDeck[deckId] !== undefined) return;
    if (!API_BASE) return;

    set((s) => ({
      flashcardsLoading: { ...s.flashcardsLoading, [deckId]: true },
      flashcardsError: { ...s.flashcardsError, [deckId]: null },
    }));
    try {
      const { data } = await axios.get<DeckFlashcardsApiResponse>(
        `${API_BASE}/decks/${deckId}/flashcards`
      );
      set((s) => ({
        flashcardsByDeck: { ...s.flashcardsByDeck, [deckId]: data.data.flashcards },
        flashcardsLoading: { ...s.flashcardsLoading, [deckId]: false },
      }));
    } catch {
      // Fall back to dummy data while backend endpoint is pending
      set((s) => ({
        flashcardsByDeck: {
          ...s.flashcardsByDeck,
          [deckId]: DUMMY_FLASHCARDS[deckId] ?? [],
        },
        flashcardsLoading: { ...s.flashcardsLoading, [deckId]: false },
      }));
    }
  },

  getDeckById: (id) => get().decks.find((d) => d.id === id),
}));
