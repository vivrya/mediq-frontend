import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, Alert, Button } from "@mui/material";
import { supabase } from "@/lib/supabase";
import { usePostAuthRedirect } from "./usePostAuthRedirect";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { completeAuth } = usePostAuthRedirect();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        await completeAuth(session);
      } catch (err: any) {
        setError(err.message ?? "Failed to sign you in. Please try again.");
      }
    }

    handleCallback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, px: 2 }}>
        <Alert
          severity="error"
          sx={{ maxWidth: 420, width: "100%" }}
          action={
            <Button color="inherit" size="small" onClick={() => navigate("/login", { replace: true })}>
              Back to login
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">Signing you in…</Typography>
    </Box>
  );
}
