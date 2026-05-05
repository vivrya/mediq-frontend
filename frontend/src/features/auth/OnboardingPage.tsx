import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Stepper,
  Step,
  StepLabel,
  Alert,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/userStore";
import { Logo } from "@/components/shared/Logo";

const YEARS = [1, 2, 3, 4, 5, 6];

const STEPS = ["About you", "Your studies", "All set"];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const setProfile = useUserStore((s) => s.setProfile);
  const setSubscribed = useUserStore((s) => s.setSubscribed);

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [medSchool, setMedSchool] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [role, setRole] = useState<"ug" | "pg" | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function canProceedStep0() {
    return name.trim().length > 1;
  }

  function canProceedStep1() {
    return medSchool.trim().length > 1 && year !== "" && role !== "";
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.updateUser({
      data: {
        full_name: name.trim(),
        med_school: medSchool.trim(),
        year_of_study: year,
        role,
        onboarded: true,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    if (user) {
      const resolvedRole = role as "ug" | "pg";
      setProfile({
        id: user.id,
        name: name.trim(),
        email: user.email ?? "",
        avatarInitial: name.trim()[0].toUpperCase(),
        role: resolvedRole,
        plan: resolvedRole,
        planLabel: resolvedRole === "pg" ? "PG Complete" : "UG Complete",
        isActive: true,
        planExpiry: "2026-12-31",
        joinedAt: new Date().toISOString().split("T")[0],
        streakDays: 0,
        university: medSchool.trim(),
        yearOfStudy: year as number,
      });
      setSubscribed(true);
    }

    setStep(2);
    setLoading(false);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
        background: (t) =>
          t.palette.mode === "light"
            ? "linear-gradient(135deg, #eff6ff 0%, #ecfdf5 100%)"
            : "linear-gradient(135deg, #050814 0%, #0a1628 100%)",
      }}
    >
      <Card
        variant="outlined"
        sx={{ width: "100%", maxWidth: 480, p: { xs: 3, sm: 4.5 }, borderRadius: 4 }}
      >
        <Box sx={{ mb: 3 }}>
          <Logo />
        </Box>

        <Stepper activeStep={step} sx={{ mb: 3 }}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Step 0 — Name */}
        {step === 0 && (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <PersonOutlineIcon color="primary" />
              <Typography variant="h6" fontWeight={700}>
                What should we call you?
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This is how your name will appear in MediQ.
            </Typography>

            <TextField
              fullWidth
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              size="small"
              sx={{ mb: 3 }}
              data-testid="onboarding-name"
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={!canProceedStep0()}
              onClick={() => setStep(1)}
              sx={{ fontWeight: 700 }}
              data-testid="onboarding-next-0"
            >
              Continue
            </Button>
          </Box>
        )}

        {/* Step 1 — Studies */}
        {step === 1 && (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <SchoolIcon color="primary" />
              <Typography variant="h6" fontWeight={700}>
                Tell us about your studies
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              We'll personalise your content based on where you are in your journey.
            </Typography>

            <TextField
              fullWidth
              label="Medical school / institution"
              value={medSchool}
              onChange={(e) => setMedSchool(e.target.value)}
              size="small"
              sx={{ mb: 2 }}
              data-testid="onboarding-school"
            />

            <TextField
              select
              fullWidth
              label="Year of study"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              size="small"
              sx={{ mb: 2 }}
              data-testid="onboarding-year"
            >
              {YEARS.map((y) => (
                <MenuItem key={y} value={y}>
                  Year {y}
                </MenuItem>
              ))}
            </TextField>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Programme
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={role}
              onChange={(_, v) => { if (v) setRole(v); }}
              fullWidth
              size="small"
              sx={{ mb: 3 }}
              data-testid="onboarding-role"
            >
              <ToggleButton value="ug" sx={{ fontWeight: 600 }}>
                Undergraduate (MBBS / BDS)
              </ToggleButton>
              <ToggleButton value="pg" sx={{ fontWeight: 600 }}>
                Postgraduate (MD / MS / DNB)
              </ToggleButton>
            </ToggleButtonGroup>

            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setStep(0)}
                sx={{ flex: 1 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                size="large"
                disabled={!canProceedStep1() || loading}
                endIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
                onClick={handleSubmit}
                sx={{ flex: 2, fontWeight: 700 }}
                data-testid="onboarding-submit"
              >
                {loading ? "Saving…" : "Let's go"}
              </Button>
            </Box>
          </Box>
        )}

        {/* Step 2 — Done */}
        {step === 2 && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ mb: 1 }}>
              🎉
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
              You're all set, {name.split(" ")[0]}!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Your personalised learning dashboard is ready.
            </Typography>
            <LinearProgress sx={{ mb: 3, borderRadius: 2, height: 6 }} />
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => navigate("/dashboard", { replace: true })}
              sx={{ fontWeight: 700 }}
              data-testid="onboarding-enter"
            >
              Go to dashboard
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
}
