export type LessonType = "video" | "quiz" | "flashcard";
export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: LessonType;
  free?: boolean;
}

export interface Course {
  id: string;
  name: string;
  category: string;
  tagline: string;
  instructor?: string;
  level: Level;
  chapters: number;
  totalDuration: string;
  color: string;
  tags: string[];
  lessons: Lesson[];
}

export interface CourseCategory {
  id: string;
  label: string;
  description: string;
  courses: Course[];
}

export const COURSES_PAGE = {
  title: "Browse Courses",
  subtitle: "Structured, high-yield medical content — learn at your own pace.",
  freeLabel: "Free preview",
  enrollLabel: "Enroll now",
  viewLabel: "View course",
  chaptersLabel: "chapters",
  lessonsLabel: "lessons",
};

export const COURSE_DETAIL = {
  backLabel: "Back to Courses",
  instructorLabel: "Instructor",
  levelLabel: "Level",
  chaptersLabel: "Chapters",
  durationLabel: "Total duration",
  playlistTitle: "Course Playlist",
  freeTag: "FREE",
  lockedTag: "PRO",
  typeLabels: { video: "Video", quiz: "Quiz", flashcard: "Flashcards" } as Record<LessonType, string>,
};

export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    id: "pre-clinical",
    label: "Pre-Clinical",
    description: "Foundation sciences — Year 1 & 2",
    courses: [
      {
        id: "anatomy-101",
        name: "Anatomy",
        category: "Pre-Clinical",
        tagline: "Master the human body from surface to deep structures",
        instructor: "Dr. Priti",
        level: "Beginner",
        chapters: 42,
        totalDuration: "18h 30m",
        color: "#0F52BA",
        tags: ["MBBS", "USMLE Step 1", "NEET"],
        lessons: [
          { id: "anatomy-101-l1", title: "Introduction to Human Anatomy", duration: "6:45", type: "video", free: true },
          { id: "anatomy-101-l2", title: "Skeletal System Overview", duration: "8:12", type: "video", free: true },
          { id: "anatomy-101-l3", title: "Skeletal System Quiz", duration: "5:00", type: "quiz", free: true },
          { id: "anatomy-101-l4", title: "Upper Limb: Bones & Joints", duration: "9:30", type: "video" },
          { id: "anatomy-101-l5", title: "Brachial Plexus Flashcards", duration: "4:00", type: "flashcard" },
          { id: "anatomy-101-l6", title: "Lower Limb: Muscles & Nerves", duration: "11:15", type: "video" },
          { id: "anatomy-101-l7", title: "Thorax & Mediastinum", duration: "10:40", type: "video" },
          { id: "anatomy-101-l8", title: "Thorax Review Quiz", duration: "5:00", type: "quiz" },
        ],
      },
      {
        id: "physiology-101",
        name: "Physiology",
        category: "Pre-Clinical",
        tagline: "Understand how the body functions at every level",
        instructor: "Dr. Priti",
        level: "Beginner",
        chapters: 36,
        totalDuration: "15h 20m",
        color: "#10B981",
        tags: ["MBBS", "USMLE Step 1"],
        lessons: [
          { id: "physiology-101-l1", title: "Cell Physiology Fundamentals", duration: "7:20", type: "video", free: true },
          { id: "physiology-101-l2", title: "Action Potential Explained", duration: "8:55", type: "video", free: true },
          { id: "physiology-101-l3", title: "Nerve Conduction Flashcards", duration: "4:30", type: "flashcard", free: true },
          { id: "physiology-101-l4", title: "Cardiac Cycle Deep Dive", duration: "9:10", type: "video" },
          { id: "physiology-101-l5", title: "Frank-Starling Law", duration: "6:00", type: "video" },
          { id: "physiology-101-l6", title: "Cardiac Output Quiz", duration: "5:00", type: "quiz" },
          { id: "physiology-101-l7", title: "Respiratory Physiology", duration: "10:25", type: "video" },
        ],
      },
      {
        id: "biochemistry-101",
        name: "Biochemistry",
        category: "Pre-Clinical",
        tagline: "Enzymes, metabolism and molecular biology made simple",
        instructor: "Dr. Priti",
        level: "Intermediate",
        chapters: 30,
        totalDuration: "12h 10m",
        color: "#7C3AED",
        tags: ["MBBS", "NEET"],
        lessons: [
          { id: "biochemistry-101-l1", title: "Amino Acids & Proteins", duration: "7:50", type: "video", free: true },
          { id: "biochemistry-101-l2", title: "Enzyme Kinetics", duration: "9:05", type: "video", free: true },
          { id: "biochemistry-101-l3", title: "Glycolysis Pathway", duration: "8:30", type: "video" },
          { id: "biochemistry-101-l4", title: "Glycolysis Flashcards", duration: "4:00", type: "flashcard" },
          { id: "biochemistry-101-l5", title: "Krebs Cycle & Oxidative Phosphorylation", duration: "10:00", type: "video" },
          { id: "biochemistry-101-l6", title: "Metabolism MCQ Drill", duration: "5:00", type: "quiz" },
        ],
      },
    ],
  },
  {
    id: "clinical-sciences",
    label: "Clinical Sciences",
    description: "Core clinical subjects for final years",
    courses: [
      {
        id: "medicine-201",
        name: "Medicine",
        category: "Clinical Sciences",
        tagline: "Comprehensive internal medicine for clinical exams",
        instructor: "Dr. Priti",
        level: "Advanced",
        chapters: 64,
        totalDuration: "28h 45m",
        color: "#F59E0B",
        tags: ["MBBS", "USMLE Step 2", "NEET PG", "PLAB"],
        lessons: [
          { id: "medicine-201-l1", title: "Approach to Chest Pain", duration: "8:15", type: "video", free: true },
          { id: "medicine-201-l2", title: "ECG Interpretation Basics", duration: "10:30", type: "video", free: true },
          { id: "medicine-201-l3", title: "ECG Pattern Flashcards", duration: "5:00", type: "flashcard", free: true },
          { id: "medicine-201-l4", title: "Heart Failure Management", duration: "9:45", type: "video" },
          { id: "medicine-201-l5", title: "Hypertension Guidelines", duration: "7:20", type: "video" },
          { id: "medicine-201-l6", title: "Cardiology MCQ Drill", duration: "10:00", type: "quiz" },
          { id: "medicine-201-l7", title: "Respiratory: Asthma vs COPD", duration: "9:00", type: "video" },
          { id: "medicine-201-l8", title: "Respiratory High-Yield Quiz", duration: "5:00", type: "quiz" },
        ],
      },
      {
        id: "pharmacology-201",
        name: "Pharmacology",
        category: "Clinical Sciences",
        tagline: "Drug mechanisms, side effects and clinical use",
        instructor: "Dr. Priti",
        level: "Intermediate",
        chapters: 38,
        totalDuration: "16h 00m",
        color: "#EC4899",
        tags: ["MBBS", "USMLE Step 1", "NEET"],
        lessons: [
          { id: "pharmacology-201-l1", title: "Pharmacokinetics Essentials", duration: "7:40", type: "video", free: true },
          { id: "pharmacology-201-l2", title: "β-Lactam Antibiotics", duration: "8:20", type: "video", free: true },
          { id: "pharmacology-201-l3", title: "Antibiotic Flashcards", duration: "4:30", type: "flashcard", free: true },
          { id: "pharmacology-201-l4", title: "Cardiovascular Drugs", duration: "10:15", type: "video" },
          { id: "pharmacology-201-l5", title: "CVS Drug Quiz", duration: "5:00", type: "quiz" },
          { id: "pharmacology-201-l6", title: "CNS Pharmacology", duration: "9:30", type: "video" },
        ],
      },
      {
        id: "pathology-201",
        name: "Pathology",
        category: "Clinical Sciences",
        tagline: "Disease mechanisms and histopathology",
        instructor: "Dr. Priti",
        level: "Intermediate",
        chapters: 35,
        totalDuration: "14h 50m",
        color: "#EF4444",
        tags: ["MBBS", "USMLE Step 1", "NEET"],
        lessons: [
          { id: "pathology-201-l1", title: "Cell Injury & Death", duration: "8:10", type: "video", free: true },
          { id: "pathology-201-l2", title: "Inflammation Explained", duration: "9:00", type: "video", free: true },
          { id: "pathology-201-l3", title: "Inflammation Flashcards", duration: "4:00", type: "flashcard" },
          { id: "pathology-201-l4", title: "Neoplasia: Benign vs Malignant", duration: "10:30", type: "video" },
          { id: "pathology-201-l5", title: "Oncology MCQ Drill", duration: "5:00", type: "quiz" },
        ],
      },
    ],
  },
  {
    id: "specialty",
    label: "Specialty",
    description: "High-yield specialty subjects",
    courses: [
      {
        id: "pediatrics-301",
        name: "Pediatrics",
        category: "Specialty",
        tagline: "Child health, growth and common paediatric conditions",
        instructor: "Dr. Priti",
        level: "Advanced",
        chapters: 28,
        totalDuration: "11h 30m",
        color: "#06B6D4",
        tags: ["MBBS", "NEET PG"],
        lessons: [
          { id: "pediatrics-301-l1", title: "Neonatal Assessment", duration: "7:30", type: "video", free: true },
          { id: "pediatrics-301-l2", title: "Growth & Development Charts", duration: "6:45", type: "video", free: true },
          { id: "pediatrics-301-l3", title: "Vaccination Schedule", duration: "8:00", type: "video" },
          { id: "pediatrics-301-l4", title: "Vaccine Flashcards", duration: "4:00", type: "flashcard" },
          { id: "pediatrics-301-l5", title: "Common Febrile Illnesses", duration: "9:15", type: "video" },
          { id: "pediatrics-301-l6", title: "Pediatrics MCQ Drill", duration: "5:00", type: "quiz" },
        ],
      },
      {
        id: "obs-gyn-301",
        name: "Obstetrics & Gynecology",
        category: "Specialty",
        tagline: "Antenatal care, labour and gynaecological disorders",
        instructor: "Dr. Priti",
        level: "Advanced",
        chapters: 32,
        totalDuration: "13h 00m",
        color: "#F97316",
        tags: ["MBBS", "NEET PG", "PLAB"],
        lessons: [
          { id: "obs-gyn-301-l1", title: "Antenatal Care Overview", duration: "8:00", type: "video", free: true },
          { id: "obs-gyn-301-l2", title: "Normal Labour & Delivery", duration: "9:30", type: "video", free: true },
          { id: "obs-gyn-301-l3", title: "Complications of Pregnancy", duration: "10:15", type: "video" },
          { id: "obs-gyn-301-l4", title: "Obstetric Flashcards", duration: "4:30", type: "flashcard" },
          { id: "obs-gyn-301-l5", title: "Gynaecology: Menstrual Disorders", duration: "7:45", type: "video" },
          { id: "obs-gyn-301-l6", title: "Obs & Gyn High-Yield Quiz", duration: "5:00", type: "quiz" },
        ],
      },
    ],
  },
];

export function findCourse(courseId: string): Course | undefined {
  for (const cat of COURSE_CATEGORIES) {
    const found = cat.courses.find((c) => c.id === courseId);
    if (found) return found;
  }
  return undefined;
}
