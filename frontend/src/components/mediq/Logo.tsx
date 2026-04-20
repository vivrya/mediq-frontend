import { Box, Typography, Stack } from "@mui/material";

export function Logo() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.25}
      component="a"
      href="#top"
      data-testid="mediq-logo"
      sx={{ textDecoration: "none", color: "text.primary" }}
    >
      <Box
        sx={{
          position: "relative",
          width: 32,
          height: 32,
          borderRadius: 2,
          bgcolor: "primary.main",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "primary.contrastText",
          boxShadow: (t) => `0 8px 24px -8px ${t.palette.primary.main}`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width={18}
          height={18}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <Box
          sx={{
            position: "absolute",
            top: -4,
            right: -4,
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: "success.main",
            boxShadow: (t) => `0 0 0 2px ${t.palette.background.paper}`,
          }}
        />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.01em" }}>
        Mediq
      </Typography>
    </Stack>
  );
}
