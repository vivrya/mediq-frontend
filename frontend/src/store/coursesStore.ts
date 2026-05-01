import { create } from "zustand";
import axios from "axios";
import type { Course, Level } from "@/features/courses/constants";
import type {
  ApiCourse,
  CoursesApiResponse,
  ApiLesson,
  LessonsApiResponse,
  ApiSegment,
  SegmentsApiResponse,
  VideoApiResponse,
} from "@/types";

const VIDEO_EXPIRY_BUFFER_MS = 5 * 60 * 1000; // re-fetch 5 min before expiry

const API_BASE = process.env.REACT_APP_API_BASE_URL;

// ── Mappers ────────────────────────────────────────────────────

const DIFFICULTY_MAP: Record<ApiCourse["difficulty"], Level> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const CATEGORY_COLOR: Record<string, string> = {
  Medicine: "#F59E0B",
  Pharmacology: "#EC4899",
  Radiology: "#0F52BA",
  Anatomy: "#10B981",
  Pathology: "#EF4444",
  Pediatrics: "#06B6D4",
  Surgery: "#7C3AED",
  Physiology: "#10B981",
  Biochemistry: "#7C3AED",
};

function formatDuration(totalMinutes: number): string {
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function mapApiCourse(api: ApiCourse): Course {
  const totalMinutes = api.lessonCount * api.estimatedMinutes;
  return {
    id: api.id,
    name: api.title,
    category: api.category,
    tagline: api.description,
    level: DIFFICULTY_MAP[api.difficulty] ?? "Beginner",
    chapters: api.lessonCount,
    totalDuration: formatDuration(totalMinutes),
    color: CATEGORY_COLOR[api.category] ?? "#6366F1",
    tags: api.tags,
    lessons: [],
  };
}

// ── Store types ────────────────────────────────────────────────

interface CoursesState {
  // courses list
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetched: boolean;

  // lessons per course  —  keyed by courseId
  lessonsByCourse: Record<string, ApiLesson[]>;
  lessonsLoading: Record<string, boolean>;
  lessonsError: Record<string, string | null>;

  // segments per lesson  —  keyed by lessonId
  segmentsByLesson: Record<string, ApiSegment[]>;
  segmentsLoading: Record<string, boolean>;
  segmentsError: Record<string, string | null>;

  // video urls  —  keyed by segmentId
  videoBySegment: Record<string, { url: string; expiresAt: number }>;
  videoLoading: Record<string, boolean>;
  videoError: Record<string, string | null>;

  // actions
  fetchCourses: () => Promise<void>;
  fetchLessons: (courseId: string) => Promise<void>;
  fetchSegments: (courseId: string, lessonId: string) => Promise<void>;
  fetchSegmentVideo: (courseId: string, lessonId: string, segmentId: string) => Promise<void>;
  getCourseById: (id: string) => Course | undefined;
}

// ── Store ──────────────────────────────────────────────────────

export const useCoursesStore = create<CoursesState>((set, get) => ({
  courses: [],
  loading: false,
  error: null,
  fetched: false,

  lessonsByCourse: {},
  lessonsLoading: {},
  lessonsError: {},

  segmentsByLesson: {},
  segmentsLoading: {},
  segmentsError: {},

  videoBySegment: {},
  videoLoading: {},
  videoError: {},

  fetchCourses: async () => {
    if (get().fetched) return;
    if (!API_BASE) {
      set({ error: "REACT_APP_API_BASE_URL is not set in your .env file.", loading: false });
      return;
    }
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get<CoursesApiResponse>(`${API_BASE}/courses`);
      set({ courses: data.data.map(mapApiCourse), loading: false, fetched: true });
    } catch {
      set({ error: "Failed to load courses. Please try again.", loading: false });
    }
  },

  fetchLessons: async (courseId) => {
    // skip if already fetched
    if (get().lessonsByCourse[courseId] !== undefined) return;
    if (!API_BASE) return;

    set((s) => ({
      lessonsLoading: { ...s.lessonsLoading, [courseId]: true },
      lessonsError: { ...s.lessonsError, [courseId]: null },
    }));
    try {
      const { data } = await axios.get<LessonsApiResponse>(
        `${API_BASE}/courses/${courseId}/lessons`
      );
      set((s) => ({
        lessonsByCourse: { ...s.lessonsByCourse, [courseId]: data.data },
        lessonsLoading: { ...s.lessonsLoading, [courseId]: false },
      }));
    } catch {
      set((s) => ({
        lessonsLoading: { ...s.lessonsLoading, [courseId]: false },
        lessonsError: {
          ...s.lessonsError,
          [courseId]: "Failed to load lessons.",
        },
      }));
    }
  },

  fetchSegments: async (courseId, lessonId) => {
    // skip if already fetched
    if (get().segmentsByLesson[lessonId] !== undefined) return;
    if (!API_BASE) return;

    set((s) => ({
      segmentsLoading: { ...s.segmentsLoading, [lessonId]: true },
      segmentsError: { ...s.segmentsError, [lessonId]: null },
    }));
    try {
      const { data } = await axios.get<SegmentsApiResponse>(
        `${API_BASE}/courses/${courseId}/lessons/${lessonId}/segments`
      );
      set((s) => ({
        segmentsByLesson: { ...s.segmentsByLesson, [lessonId]: data.data },
        segmentsLoading: { ...s.segmentsLoading, [lessonId]: false },
      }));
    } catch {
      set((s) => ({
        segmentsLoading: { ...s.segmentsLoading, [lessonId]: false },
        segmentsError: {
          ...s.segmentsError,
          [lessonId]: "Failed to load segments.",
        },
      }));
    }
  },

  fetchSegmentVideo: async (courseId, lessonId, segmentId) => {
    if (!API_BASE) return;

    // skip if cached and not near expiry
    const cached = get().videoBySegment[segmentId];
    if (cached && Date.now() < cached.expiresAt - VIDEO_EXPIRY_BUFFER_MS) return;

    set((s) => ({
      videoLoading: { ...s.videoLoading, [segmentId]: true },
      videoError: { ...s.videoError, [segmentId]: null },
    }));
    try {
      const { data } = await axios.get<VideoApiResponse>(
        `${API_BASE}/courses/${courseId}/lessons/${lessonId}/segments/${segmentId}/video`
      );
      set((s) => ({
        videoBySegment: {
          ...s.videoBySegment,
          [segmentId]: {
            url: data.data.url,
            expiresAt: Date.now() + data.data.expiresIn * 1000,
          },
        },
        videoLoading: { ...s.videoLoading, [segmentId]: false },
      }));
    } catch {
      set((s) => ({
        videoLoading: { ...s.videoLoading, [segmentId]: false },
        videoError: { ...s.videoError, [segmentId]: "Failed to load video. Please try again." },
      }));
    }
  },

  getCourseById: (id) => get().courses.find((c) => c.id === id),
}));
