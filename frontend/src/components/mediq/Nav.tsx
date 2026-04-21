import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Stack,
  Button,
  Drawer,
  IconButton,
  Box,
  Link as MuiLink,
  Divider,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink } from "react-router-dom";
import { Logo } from "@/components/mediq/Logo";
import { ThemeToggle } from "@/components/mediq/ThemeToggle";

const links = [
  { label: "Features", href: "#features" },
  { label: "Method", href: "#method" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          backgroundColor: scrolled
            ? theme.palette.mode === "dark"
              ? "rgba(17,24,39,0.8)"
              : "rgba(255,255,255,0.8)"
            : "transparent",
          backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
          borderBottom: scrolled ? 1 : 0,
          borderColor: "divider",
          transition: "all .25s ease",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 64, gap: 2 }}>
            <Logo />
            <Box sx={{ flex: 1 }} />
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ display: { xs: "none", md: "flex" } }}
              data-testid="primary-nav"
            >
              {links.map((l) => (
                <Button
                  key={l.href}
                  href={l.href}
                  color="inherit"
                  size="small"
                  data-testid={`nav-${l.label.toLowerCase()}`}
                  sx={{ color: "text.secondary", px: 1.5 }}
                >
                  {l.label}
                </Button>
              ))}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1.25}>
              <ThemeToggle />
              <Button
                variant="contained"
                color="primary"
                size="small"
                component={RouterLink}
                to="/dashboard"
                data-testid="nav-cta-sign-up"
                sx={{ display: { xs: "none", sm: "inline-flex" }, px: 2.5 }}
              >
                Sign up
              </Button>
              <IconButton
                onClick={() => setOpen(true)}
                data-testid="mobile-menu-toggle"
                sx={{
                  display: { md: "none" },
                  border: 1,
                  borderColor: "divider",
                  width: 36,
                  height: 36,
                }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: { md: "none" } }}
        PaperProps={{ sx: { width: 280, p: 2 } }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Logo />
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ mb: 1 }} />
        <Stack>
          {links.map((l) => (
            <MuiLink
              key={l.href}
              href={l.href}
              underline="none"
              onClick={() => setOpen(false)}
              data-testid={`mobile-nav-${l.label.toLowerCase()}`}
              sx={{
                py: 1.25,
                px: 1.5,
                borderRadius: 1,
                color: "text.primary",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              {l.label}
            </MuiLink>
          ))}
        </Stack>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          component={RouterLink}
          to="/dashboard"
          onClick={() => setOpen(false)}
          data-testid="mobile-nav-cta"
        >
          Sign up
        </Button>
      </Drawer>
    </>
  );
}
