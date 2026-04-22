export type Role = "ug" | "pg" | "other";

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
