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

    // TEST OVERRIDES — remove once backend returns real subscription data
    const TEST_SUBSCRIBED = true;

    const fullName = data.full_name ?? session.user.user_metadata?.full_name ?? "User";

    const profile: UserProfile = {
      id: data.id ?? session.user.id,
      name: fullName,
      email: data.email ?? session.user.email ?? "",
      avatarInitial: fullName[0].toUpperCase(),
      role: data.role ?? "ug",
      plan: data.plan ?? (TEST_SUBSCRIBED ? "ug" : "free"),
      planLabel: data.plan_label ?? (TEST_SUBSCRIBED ? "UG Complete" : "Free"),
      isActive: data.is_active ?? TEST_SUBSCRIBED,
      planExpiry: data.plan_expiry ?? (TEST_SUBSCRIBED ? "2026-12-31" : null),
      joinedAt: data.joined_at ?? new Date().toISOString().split("T")[0],
      streakDays: data.streak_days ?? (TEST_SUBSCRIBED ? 7 : 0),
      university: data.university ?? session.user.user_metadata?.med_school ?? "",
      yearOfStudy: data.year_of_study ?? session.user.user_metadata?.year_of_study ?? 1,
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
