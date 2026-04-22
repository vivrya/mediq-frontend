import { Box, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle?: string;
  compact?: boolean;
}

export function SectionHeader({ title, subtitle, compact }: Props) {
  return (
    <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: compact ? 0 : 2.5 }}>
      <Box>
        <Typography variant={compact ? "h6" : "h5"} sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
