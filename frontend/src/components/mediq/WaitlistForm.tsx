import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const API = (process.env.REACT_APP_BACKEND_URL || "") + "/api";

type Role = "ug" | "pg" | "other";

interface Props {
  source?: string;
  dark?: boolean;
  showRole?: boolean;
  ctaLabel?: string;
  testIdPrefix?: string;
}

export function WaitlistForm({
  source = "hero",
  dark = false,
  showRole = true,
  ctaLabel = "Request early access",
  testIdPrefix = "waitlist",
}: Props) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("ug");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [display, setDisplay] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    axios
      .get(`${API}/waitlist/count`)
      .then((r) => {
        if (alive) setDisplay(r.data.display_count);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const v = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(`${API}/waitlist`, {
        email: v,
        role,
        source,
      });
      setPosition(data.position);
      setDone(true);
      setEmail("");
    } catch (err: any) {
      setError(
        err?.response?.data?.detail?.toString?.() ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputColor = dark ? "rgba(255,255,255,0.95)" : undefined;
  const placeholderColor = dark ? "rgba(255,255,255,0.5)" : undefined;

  if (done) {
    return (
      <Box
        data-testid={`${testIdPrefix}-success`}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1.5,
          py: 1.75,
          px: 2.5,
          borderRadius: 999,
          bgcolor: dark ? "rgba(16,185,129,.15)" : "success.main",
          color: dark ? "success.light" : "success.contrastText",
          border: 1,
          borderColor: dark ? "rgba(16,185,129,.35)" : "transparent",
          maxWidth: "100%",
        }}
      >
        <CheckCircleIcon fontSize="small" />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          You're in{position ? ` — spot #${position}` : ""}. We'll email you
          when your slot opens.
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={submit} sx={{ width: "100%", maxWidth: 560 }}>
      {showRole && (
        <ToggleButtonGroup
          exclusive
          size="small"
          value={role}
          onChange={(_, v: Role | null) => v && setRole(v)}
          data-testid={`${testIdPrefix}-role`}
          sx={{
            mb: 1.5,
            bgcolor: dark ? "rgba(255,255,255,.06)" : "background.paper",
            borderRadius: 999,
            p: 0.5,
            border: 1,
            borderColor: dark ? "rgba(255,255,255,.1)" : "divider",
          }}
        >
          <ToggleButton
            value="ug"
            data-testid={`${testIdPrefix}-role-ug`}
            sx={{
              border: 0,
              borderRadius: "999px !important",
              px: 2,
              py: 0.5,
              fontSize: 12,
              color: dark ? "grey.300" : "text.secondary",
            }}
          >
            UG student
          </ToggleButton>
          <ToggleButton
            value="pg"
            data-testid={`${testIdPrefix}-role-pg`}
            sx={{
              border: 0,
              borderRadius: "999px !important",
              px: 2,
              py: 0.5,
              fontSize: 12,
              color: dark ? "grey.300" : "text.secondary",
            }}
          >
            PG aspirant
          </ToggleButton>
          <ToggleButton
            value="other"
            data-testid={`${testIdPrefix}-role-other`}
            sx={{
              border: 0,
              borderRadius: "999px !important",
              px: 2,
              py: 0.5,
              fontSize: 12,
              color: dark ? "grey.300" : "text.secondary",
            }}
          >
            Curious
          </ToggleButton>
        </ToggleButtonGroup>
      )}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} alignItems={{ sm: "stretch" }}>
        <TextField
          fullWidth
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid={`${testIdPrefix}-email`}
          error={!!error}
          disabled={loading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon
                  fontSize="small"
                  sx={{ color: dark ? "rgba(255,255,255,.7)" : "text.secondary" }}
                />
              </InputAdornment>
            ),
            sx: {
              bgcolor: dark ? "rgba(255,255,255,.06)" : "background.paper",
              color: inputColor,
              "& input::placeholder": { color: placeholderColor, opacity: 1 },
              "& fieldset": {
                borderColor: dark ? "rgba(255,255,255,.15)" : undefined,
              },
              "&:hover fieldset": {
                borderColor: dark ? "rgba(255,255,255,.3)" : undefined,
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-testid={`${testIdPrefix}-submit`}
          disabled={loading}
          endIcon={
            loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <ArrowForwardIcon />
            )
          }
          sx={{ whiteSpace: "nowrap", px: 3.5 }}
        >
          {ctaLabel}
        </Button>
      </Stack>

      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 1.25,
          color: dark ? "rgba(255,255,255,.55)" : "text.secondary",
        }}
      >
        {display !== null
          ? `${display.toLocaleString()}+ medics ahead of you. Free forever tier. No spam.`
          : "Free forever tier. No spam. Unsubscribe in one click."}
      </Typography>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
