import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserPlan = "free" | "ug" | "pg";
export type UserRole = "ug" | "pg" | "other";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarInitial: string;
  role: UserRole;
  plan: UserPlan;
  planLabel: string;
  isActive: boolean;
  planExpiry: string | null;   // ISO date string, null for free
  joinedAt: string;            // ISO date string
  streakDays: number;
  university: string;
  yearOfStudy: number;
}

export const SAMPLE_PROFILE: UserProfile = {
  id: "USR-001",
  name: "Dr. Vivek Arya",
  email: "vivek.aryaiitkgp@gmail.com",
  avatarInitial: "V",
  role: "pg",
  plan: "ug",
  planLabel: "UG Complete",
  isActive: true,
  planExpiry: "2026-12-31",
  joinedAt: "2026-01-15",
  streakDays: 14,
  university: "IIT Kharagpur",
  yearOfStudy: 3,
};

interface UserState {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  isSubscribed: boolean;
  setSubscribed: (value: boolean) => void;
  isDyslexicMode: boolean;
  setDyslexicMode: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: SAMPLE_PROFILE,
      setProfile: (profile) => set({ profile }),
      isSubscribed: false,
      setSubscribed: (value) => set({ isSubscribed: value }),
      isDyslexicMode: false,
      setDyslexicMode: (value) => set({ isDyslexicMode: value }),
    }),
    { name: "mediq-user" }
  )
);
