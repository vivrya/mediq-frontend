import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  Chip,
  Skeleton,
  Alert,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid2";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useDecksStore, getDeckColor } from "@/store/decksStore";

function DeckSkeleton() {
  return (
    <Card variant="outlined" sx={{ p: 3, height: "100%" }}>
      <Skeleton variant="rounded" width={44} height={44} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="70%" height={22} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="45%" height={16} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="90%" height={14} />
      <Skeleton variant="text" width="80%" height={14} sx={{ mb: 2 }} />
      <Skeleton variant="rounded" width={80} height={24} />
    </Card>
  );
}

export default function DecksPage() {
  const { decks, loading, error, fetched, fetchDecks } = useDecksStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDecks();
  }, [fetchDecks]);

  const filteredDecks = decks.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.courseName.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    );
  });

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
      {/* Page header */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 4 }}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.75 }}>
            <LayersOutlinedIcon sx={{ color: "primary.main", fontSize: 22 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Flashcard Decks
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Pick a deck and start active recall — tap any card to reveal the answer.
          </Typography>
        </Box>
        {fetched && (
          <Chip
            label={`${decks.length} deck${decks.length !== 1 ? "s" : ""}`}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 600, mt: 0.5 }}
          />
        )}
      </Stack>

      {/* Search */}
      <TextField
        placeholder="Search decks, subjects…"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 18, color: "text.disabled" }} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3, maxWidth: 360 }}
        data-testid="decks-search"
      />

      {/* Error */}
      {error && (
        <Alert
          severity="error"
          action={
            <Button
              size="small"
              color="inherit"
              onClick={() => {
                useDecksStore.setState({ fetched: false });
                fetchDecks();
              }}
            >
              Retry
            </Button>
          }
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
              <DeckSkeleton />
            </Grid>
          ))}

        {!loading && filteredDecks.length === 0 && search && (
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" color="text.secondary">
              No decks match "<strong>{search}</strong>".
            </Typography>
          </Grid>
        )}

        {!loading &&
          filteredDecks.map((deck) => {
            const color = getDeckColor(deck.courseId);
            return (
              <Grid key={deck.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Card
                  variant="outlined"
                  onClick={() => navigate(`/dashboard/flashcards/${deck.id}`)}
                  data-testid={`deck-card-${deck.id}`}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    "&:hover": {
                      boxShadow: 6,
                      transform: "translateY(-2px)",
                    },
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* colour accent bar */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      bgcolor: color,
                    }}
                  />

                  {/* Icon */}
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: color + "18",
                      color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      flexShrink: 0,
                    }}
                  >
                    <AutorenewIcon sx={{ fontSize: 22 }} />
                  </Box>

                  <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5, lineHeight: 1.3 }}>
                    {deck.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1.25 }}
                  >
                    {deck.courseName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flex: 1, mb: 2.5, lineHeight: 1.55, fontSize: "0.8rem" }}
                  >
                    {deck.description}
                  </Typography>

                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Chip
                      label={`${deck.flashcardCount} cards`}
                      size="small"
                      sx={{
                        bgcolor: color + "15",
                        color,
                        fontWeight: 700,
                        fontSize: 11,
                        height: 22,
                      }}
                    />
                    <ArrowForwardIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                  </Stack>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
