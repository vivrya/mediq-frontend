export type Difficulty = "easy" | "medium" | "hard";

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: Difficulty;
}

export const FLASHCARDS_BY_SEGMENT: Record<string, Flashcard[]> = {
  SG1: [
    {
      id: "SG1-FC1",
      question: "What are the three primary layers of the human body wall from superficial to deep?",
      answer: "Skin (epidermis + dermis), subcutaneous tissue (hypodermis), and deep fascia covering the underlying muscles.",
      difficulty: "easy",
    },
    {
      id: "SG1-FC2",
      question: "Which embryonic germ layer gives rise to skeletal muscle?",
      answer: "Mesoderm — specifically somites differentiate into myotomes, which develop into skeletal muscles.",
      difficulty: "medium",
    },
    {
      id: "SG1-FC3",
      question: "Explain the significance of the neurovascular plane in clinical injections.",
      answer:
        "Nerves, arteries, and veins travel together in the neurovascular plane between muscle layers. Injections delivered in this plane risk direct vessel or nerve injury; staying superficial or targeting specific muscle bellies avoids these structures.",
      difficulty: "hard",
    },
  ],
  SG2: [
    {
      id: "SG2-FC1",
      question: "What is the functional unit of skeletal muscle?",
      answer: "The sarcomere — the repeating contractile unit bounded by Z-lines, containing overlapping actin (thin) and myosin (thick) filaments.",
      difficulty: "easy",
    },
    {
      id: "SG2-FC2",
      question: "During isometric contraction, what happens to sarcomere length?",
      answer:
        "Sarcomere length remains constant. Cross-bridges cycle and force is generated, but no net shortening occurs because the external load equals the force produced.",
      difficulty: "medium",
    },
    {
      id: "SG2-FC3",
      question: "How does the length-tension relationship affect cardiac output at different preloads?",
      answer:
        "Frank-Starling law: increased ventricular filling (preload) stretches sarcomeres toward optimal overlap, increasing cross-bridge formation and stroke volume — until over-stretch reduces overlap and contractile force falls.",
      difficulty: "hard",
    },
  ],
  SG3: [
    {
      id: "SG3-FC1",
      question: "Name the four chambers of the heart.",
      answer: "Right atrium, right ventricle, left atrium, left ventricle.",
      difficulty: "easy",
    },
    {
      id: "SG3-FC2",
      question: "What anatomical structure separates the left and right ventricles, and what is its clinical relevance?",
      answer:
        "The interventricular septum. A ventricular septal defect (VSD) here causes left-to-right shunting, increasing pulmonary blood flow and potentially leading to Eisenmenger syndrome if uncorrected.",
      difficulty: "medium",
    },
  ],
};

export function getFlashcardsForSegment(segmentId: string): Flashcard[] {
  return FLASHCARDS_BY_SEGMENT[segmentId] ?? [];
}
