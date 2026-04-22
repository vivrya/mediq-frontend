import { useEffect, useState } from "react";
import {
  AppBar, Toolbar, Container, Stack, Button, Drawer,
  IconButton, Box, Link as MuiLink, Divider, useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink } from "react-router-dom";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { NAV } from "../constants";

export function Nav() {
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 2 : 0}
        sx={{
          bgcolor: scrolled ? "background.paper" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? 1 : 0,
          borderColor: "divider",
          transition: "all .25s ease",
          color: "text.primary",
        }}
        data-testid="nav"
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Logo />
            <Stack direction="row" spacing={3} alignItems="center" sx={{ ml: 5, display: { xs: "none", md: "flex" }, flex: 1 }}>
              {NAV.links.map((l) => (
                <MuiLink key={l.label} href={l.href} underline="hover" color="text.secondary" variant="body2" sx={{ fontWeight: 500, "&:hover": { color: "text.primary" } }}>
                  {l.label}
                </MuiLink>
              ))}
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ ml: "auto" }}>
              <ThemeToggle />
              <Button
                component={RouterLink}
                to="/dashboard"
                variant="contained"
                size="small"
                data-testid="nav-signup"
                sx={{ display: { xs: "none", md: "inline-flex" }, fontWeight: 700, px: 2.5 }}
              >
                {NAV.cta}
              </Button>
              <IconButton onClick={() => setOpen(true)} sx={{ display: { md: "none" } }} data-testid="nav-menu">
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 280, p: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Logo />
          <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1}>
          {NAV.links.map((l) => (
            <MuiLink key={l.label} href={l.href} underline="hover" color="text.primary" variant="body1" sx={{ fontWeight: 500, py: 0.5 }} onClick={() => setOpen(false)}>
              {l.label}
            </MuiLink>
          ))}
        </Stack>
        <Button component={RouterLink} to="/dashboard" variant="contained" fullWidth sx={{ mt: 3, fontWeight: 700 }} onClick={() => setOpen(false)}>
          {NAV.cta}
        </Button>
      </Drawer>
    </>
  );
}
