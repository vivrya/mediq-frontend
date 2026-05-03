import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import type { UserProfile } from "@/store/userStore";
import type { Session } from "@supabase/supabase-js";

const API_BASE = process.env.REACT_APP_API_BASE_URL ?? "";

export function usePostAuthRedirect() {
  const navigate = useNavigate();
  const setProfile = useUserStore((s) => s.setProfile);

  async function completeAuth(session: Session): Promise<string | null> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.detail ?? `Server error ${res.status}`);
    }

    const data = await res.json();

    const profile: UserProfile = {
      id: data.id ?? session.user.id,
      name: data.full_name ?? session.user.user_metadata?.full_name ?? "",
      email: data.email ?? session.user.email ?? "",
      avatarInitial: (data.full_name ?? session.user.user_metadata?.full_name ?? "?")[0].toUpperCase(),
      role: data.role ?? "ug",
      plan: data.plan ?? "free",
      planLabel: data.plan_label ?? "Free",
      isActive: data.is_active ?? false,
      planExpiry: data.plan_expiry ?? null,
      joinedAt: data.joined_at ?? new Date().toISOString().split("T")[0],
      streakDays: data.streak_days ?? 0,
      university: data.university ?? "",
      yearOfStudy: data.year_of_study ?? 1,
    };

    setProfile(profile);

    const isOnboarded = data.onboarded || session.user.user_metadata?.onboarded;
    if (!isOnboarded) {
      navigate("/onboarding", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }

    return null;
  }

  return { completeAuth };
}
