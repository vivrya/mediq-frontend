import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Button,
  Divider,
  Alert,
  TextField,
  CircularProgress,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { supabase } from "@/lib/supabase";
import { Logo } from "@/components/shared/Logo";
import { usePostAuthRedirect } from "./usePostAuthRedirect";

const REDIRECT = `${window.location.origin}/auth/callback`;
const OTP_LENGTH = 6;

type Stage = "input" | "otp_verify";

// Standard Google "G" SVG mark
function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { completeAuth } = usePostAuthRedirect();
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<Stage>("input");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<"google" | "email" | "verify" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  async function handleGoogle() {
    setLoading("google");
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: REDIRECT },
    });
    if (error) { setError(error.message); setLoading(null); }
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading("email");
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) { setError(error.message); setLoading(null); }
    else { setStage("otp_verify"); setLoading(null); }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    const token = otp.join("");
    if (token.length < OTP_LENGTH) return;
    setLoading("verify");
    setError(null);

    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });

    if (error) { setError(error.message); setLoading(null); return; }

    if (!data.session) {
      setError("Verification succeeded but no session returned. Please try again.");
      setLoading(null);
      return;
    }

    try {
      await completeAuth(data.session);
    } catch (err: any) {
      setError(err.message ?? "Failed to sign you in. Please try again.");
      setLoading(null);
    }
  }

  function handleOtpChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = [...otp];
    pasted.split("").forEach((d, i) => { next[i] = d; });
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  }

  function resetToInput() {
    setStage("input");
    setOtp(["", "", "", "", "", ""]);
    setError(null);
  }

  async function handleResend() {
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: (t) =>
          t.palette.mode === "light"
            ? "linear-gradient(135deg, #eff6ff 0%, #ecfdf5 100%)"
            : "linear-gradient(135deg, #050814 0%, #0a1628 100%)",
      }}
    >
      <Card
        variant="outlined"
        sx={{ width: "100%", maxWidth: 420, p: { xs: 3, sm: 4.5 }, borderRadius: 4 }}
      >
        <Box sx={{ mb: 3 }}>
          <Logo />
        </Box>

        {stage === "otp_verify" ? (
          <>
            <IconButton size="small" onClick={resetToInput} sx={{ mb: 1, ml: -0.5 }}>
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
              Enter verification code
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              We sent a 6-digit code to <strong>{email}</strong>
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleVerifyOtp}>
              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                {otp.map((digit, i) => (
                  <TextField
                    key={i}
                    inputRef={(el) => { otpRefs.current[i] = el; }}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", fontSize: 22, fontWeight: 700, padding: "10px 0" },
                    }}
                    sx={{ width: 48 }}
                    data-testid={`otp-digit-${i}`}
                  />
                ))}
              </Stack>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={otp.join("").length < OTP_LENGTH || loading === "verify"}
                endIcon={loading === "verify" ? <CircularProgress size={18} color="inherit" /> : null}
                sx={{ fontWeight: 700, mb: 1.5 }}
                data-testid="otp-verify-btn"
              >
                {loading === "verify" ? "Verifying…" : "Verify & sign in"}
              </Button>

              <Button
                fullWidth
                variant="text"
                size="small"
                onClick={handleResend}
                disabled={!!loading}
                sx={{ color: "text.secondary", fontSize: 13 }}
              >
                Didn't receive it? Resend code
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              Welcome to MediQ
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Sign in to continue your learning journey.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2.5 }} onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            {/* Google — icon only */}
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={handleGoogle}
              disabled={!!loading}
              sx={{
                mb: 2.5,
                borderColor: "divider",
                gap: 1.5,
                fontWeight: 600,
                fontSize: 15,
                textTransform: "none",
              }}
              data-testid="login-google"
            >
              {loading === "google" ? <CircularProgress size={20} /> : <GoogleG size={20} />}
              {loading === "google" ? "Signing in…" : "Sign in with Google"}
            </Button>

            <Divider sx={{ mb: 2.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
                or sign in with email
              </Typography>
            </Divider>

            <Box component="form" onSubmit={handleSendOtp}>
              <TextField
                fullWidth
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                size="small"
                sx={{ mb: 2 }}
                data-testid="login-email"
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={!!loading || !email}
                endIcon={loading === "email" ? <CircularProgress size={18} color="inherit" /> : null}
                sx={{ fontWeight: 700 }}
                data-testid="login-submit"
              >
                {loading === "email" ? "Sending…" : "Send OTP code"}
              </Button>
            </Box>
          </>
        )}

        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 3, textAlign: "center" }}>
          By signing in you agree to our Terms of Service and Privacy Policy.
        </Typography>
      </Card>
    </Box>
  );
}
