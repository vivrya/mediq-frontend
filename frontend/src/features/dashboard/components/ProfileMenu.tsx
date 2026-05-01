import {
  Menu,
  Box,
  Typography,
  Avatar,
  Divider,
  Stack,
  Chip,
  Button,
  Switch,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LogoutIcon from "@mui/icons-material/Logout";
import AbcIcon from "@mui/icons-material/Abc";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export function ProfileMenu({ anchorEl, onClose }: Props) {
  const navigate = useNavigate();
  const { profile, isSubscribed, isDyslexicMode, setDyslexicMode } = useUserStore();

  function handleSignOut() {
    onClose();
    navigate("/");
  }

  function handleUpgrade() {
    onClose();
    navigate("/dashboard/demo");
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            minWidth: 280,
            borderRadius: 3,
            border: 1,
            borderColor: "divider",
            boxShadow: 6,
            overflow: "visible",
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: -6,
              right: 18,
              width: 12,
              height: 12,
              bgcolor: "background.paper",
              border: 1,
              borderColor: "divider",
              borderBottom: "none",
              borderRight: "none",
              transform: "rotate(45deg)",
            },
          },
        },
      }}
    >
      {/* Profile section */}
      <Box sx={{ px: 2.5, pt: 2, pb: 1.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", width: 42, height: 42, fontWeight: 700, fontSize: 16 }}>
            {profile.avatarInitial}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
              {profile.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {profile.email}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={0.75} sx={{ mt: 1.25 }}>
          <Chip label={`ID: ${profile.id}`} size="small" variant="outlined" sx={{ fontSize: 10, height: 18, fontWeight: 600 }} />
          <Chip label={profile.role.toUpperCase()} size="small" variant="outlined" sx={{ fontSize: 10, height: 18, fontWeight: 600 }} />
          <Chip label={profile.university} size="small" variant="outlined" sx={{ fontSize: 10, height: 18, fontWeight: 600 }} />
        </Stack>
      </Box>

      <Divider />

      {/* Current plan */}
      <Box sx={{ px: 2.5, py: 1.75 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", display: "block", mb: 1.25 }}>
          Current Plan
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.75 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AutoAwesomeIcon sx={{ fontSize: 15, color: profile.isActive ? "warning.main" : "text.disabled" }} />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {profile.plan === "free" ? "Free Plan" : profile.planLabel}
            </Typography>
          </Stack>
          <Chip
            label={profile.isActive ? "Active" : "Inactive"}
            size="small"
            color={profile.isActive ? "success" : "default"}
            sx={{ fontWeight: 700, fontSize: 10, height: 20 }}
          />
        </Stack>

        {profile.planExpiry ? (
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <CheckCircleOutlineIcon sx={{ fontSize: 13, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              Expires {new Date(profile.planExpiry).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
            </Typography>
          </Stack>
        ) : (
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={handleUpgrade}
            startIcon={<AutoAwesomeIcon sx={{ fontSize: "14px !important" }} />}
            sx={{ mt: 1, fontWeight: 700 }}
            data-testid="profile-menu-upgrade"
          >
            Upgrade to Pro
          </Button>
        )}
      </Box>

      <Divider />

      {/* Dyslexic mode */}
      <Box sx={{ px: 2.5, py: 1.5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <AbcIcon sx={{ fontSize: 20, color: isDyslexicMode ? "primary.main" : "text.secondary" }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                Dyslexic Mode
              </Typography>
              <Typography variant="caption" color="text.secondary">
                OpenDyslexic font + wider spacing
              </Typography>
            </Box>
          </Stack>
          <Switch
            checked={isDyslexicMode}
            onChange={(e) => setDyslexicMode(e.target.checked)}
            size="small"
            color="primary"
            inputProps={{ "aria-label": "Dyslexic mode", "data-testid": "dyslexic-mode-toggle" } as React.InputHTMLAttributes<HTMLInputElement>}
          />
        </Stack>
      </Box>

      <Divider />

      {/* Sign out */}
      <MenuItem onClick={handleSignOut} data-testid="profile-menu-signout" sx={{ px: 2.5, py: 1.5, borderRadius: 0 }}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ fontSize: 14, fontWeight: 600, color: "error.main" }}
        >
          Sign out
        </ListItemText>
      </MenuItem>
    </Menu>
  );
}
