export type Role = "ug" | "pg" | "other";

// ── Courses API ────────────────────────────────────────────────
export interface ApiCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  lessonCount: number;
  estimatedMinutes: number;
  tags: string[];
}

export interface CoursesApiResponse {
  success: boolean;
  count: number;
  data: ApiCourse[];
}

export interface ApiLesson {
  id: string;
  title: string;
  order?: number;
  duration?: string;
  estimatedMinutes?: number;
  free?: boolean;
  type?: string;
}

export interface LessonsApiResponse {
  success: boolean;
  data: ApiLesson[];
}

export interface ApiSegment {
  id: string;
  title: string;
  type?: string;
  duration?: string;
  order?: number;
  url?: string;
}

export interface SegmentsApiResponse {
  success: boolean;
  data: ApiSegment[];
}

export interface VideoApiResponse {
  success: boolean;
  data: {
    url: string;
    expiresIn: number;
  };
}

export interface ApiDeck {
  id: string;
  courseId: string;
  title: string;
  description: string;
  isPublished: boolean;
  courseName: string;
  flashcardCount: number;
}

export interface DecksApiResponse {
  success: boolean;
  count: number;
  data: ApiDeck[];
}

export interface ApiFlashcard {
  id: string;
  order: number;
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

export interface DeckFlashcardsApiResponse {
  success: boolean;
  data: {
    deckId: string;
    flashcards: ApiFlashcard[];
  };
}

export interface WaitlistPayload {
  email: string;
  role: Role;
  source: string;
}

export interface WaitlistCountResponse {
  display_count: number;
}

export interface WaitlistSignupResponse {
  position: number;
}
