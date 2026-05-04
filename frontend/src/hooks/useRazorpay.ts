import { useState } from "react";
import { loadRazorpayScript, type RazorpayPaymentResponse } from "@/lib/razorpay";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/userStore";

const API_BASE = process.env.REACT_APP_API_BASE_URL ?? "";
const RZP_KEY  = process.env.REACT_APP_RAZORPAY_KEY_ID ?? "";

export interface PlanOption {
  id: string;
  label: string;
  amountInr: number; // full rupees
  description: string;
}

interface UseRazorpayReturn {
  initiatePayment: (plan: PlanOption) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useRazorpay(
  onSuccess?: (response: RazorpayPaymentResponse, plan: PlanOption) => void
): UseRazorpayReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const { profile } = useUserStore();

  async function initiatePayment(plan: PlanOption) {
    setLoading(true);
    setError(null);

    // 1. Load Razorpay SDK
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setError("Failed to load payment gateway. Check your internet connection.");
      setLoading(false);
      return;
    }

    // 2. Get Supabase access token for auth header
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token ?? "";

    // 3. Create order on backend
    let orderId: string;
    try {
      const res = await fetch(`${API_BASE}/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          plan_id: plan.id,
          amount: plan.amountInr * 100, // convert to paise
          currency: "INR",
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.detail ?? `Order creation failed (${res.status})`);
      }
      const data = await res.json();
      orderId = data.order_id ?? data.id;
    } catch (err: any) {
      setError(err.message ?? "Could not create payment order.");
      setLoading(false);
      return;
    }

    // 4. Open Razorpay checkout
    const rzp = new window.Razorpay({
      key: RZP_KEY,
      amount: plan.amountInr * 100,
      currency: "INR",
      name: "MediQ",
      description: plan.description,
      order_id: orderId,
      prefill: {
        name: profile.name,
        email: profile.email,
      },
      theme: { color: "#0F52BA" },
      handler: async (response: RazorpayPaymentResponse) => {
        // 5. Verify payment on backend
        try {
          const verifyRes = await fetch(`${API_BASE}/payments/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_signature:  response.razorpay_signature,
              plan_id: plan.id,
            }),
          });
          if (!verifyRes.ok) {
            const body = await verifyRes.json().catch(() => ({}));
            setError(body?.detail ?? "Payment verification failed. Contact support.");
            return;
          }
        } catch {
          setError("Payment verification failed. Contact support.");
          return;
        }
        onSuccess?.(response, plan);
        setLoading(false);
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    });

    rzp.open();
  }

  return { initiatePayment, loading, error };
}
