import axios from "axios";
import type { WaitlistPayload, WaitlistCountResponse, WaitlistSignupResponse } from "@/types";

const API = (process.env.REACT_APP_BACKEND_URL || "") + "/api";

export const waitlistApi = {
  getCount: (): Promise<WaitlistCountResponse> =>
    axios.get(`${API}/waitlist/count`).then((r) => r.data),

  signup: (payload: WaitlistPayload): Promise<WaitlistSignupResponse> =>
    axios.post(`${API}/waitlist`, payload).then((r) => r.data),
};
