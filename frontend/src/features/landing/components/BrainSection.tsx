import { useState, useEffect, useRef } from "react";
import { Box, Typography, Container } from "@mui/material";
import { BrainBloom } from "@/components/shared/BrainBloom";

export function BrainSection() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Trigger animation when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Animate progress to 100 once visible
  useEffect(() => {
    if (!visible) return;
    let val = 0;
    const interval = setInterval(() => {
      val += 1.2;
      setProgress(Math.min(val, 100));
      if (val >= 100) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        textAlign: "center",
        background: (t) =>
          t.palette.mode === "light"
            ? "linear-gradient(180deg, #f0fdf4 0%, #eff6ff 100%)"
            : "linear-gradient(180deg, rgba(16,185,129,.06) 0%, rgba(15,82,186,.06) 100%)",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="overline"
          sx={{ color: "success.main", fontWeight: 700, letterSpacing: "0.15em", mb: 1, display: "block" }}
        >
          The MediQ Philosophy
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 2,
            fontSize: { xs: "2rem", md: "2.75rem" },
            lineHeight: 1.15,
          }}
        >
          Your brain,{" "}
          <Box component="span" sx={{ color: "success.main" }}>
            in full bloom.
          </Box>
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 7, maxWidth: 480, mx: "auto", lineHeight: 1.8 }}
        >
          Every concept you master plants a new seed. Every lesson you complete makes it grow.
          MediQ turns medical knowledge into something alive — and beautiful.
        </Typography>

        {/* Brain illustration */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 4,
            filter: "drop-shadow(0 20px 40px rgba(16,185,129,0.18))",
            transition: "transform 0.6s ease",
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <BrainBloom progress={progress} size={280} />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic", opacity: 0.7 }}
        >
          Your brain when you believe in yourself.
        </Typography>
      </Container>
    </Box>
  );
}
