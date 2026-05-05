// viewBox: 0 0 120 150
// Pot occupies y: 108–148, plant grows upward from y: 108

interface Props {
  progress: number;
  color?: string;
  size?: number;
}

export function getStage(pct: number): 0 | 1 | 2 | 3 | 4 | 5 {
  if (pct === 0)   return 0;
  if (pct <= 25)   return 1;
  if (pct <= 50)   return 2;
  if (pct <= 70)   return 3;
  if (pct < 100)   return 4;
  return 5;
}

// ── Shared design tokens ──────────────────────────────────────
const STEM   = "#4A7040";
const LEAF_F = "#C6DFC0";   // soft sage fill
const LEAF_S = "#4A7040";   // leaf stroke
const SW     = 1.5;         // stroke width for leaves
const SSW    = 2;           // stem stroke width

// ── Reusable leaf pair ────────────────────────────────────────
// cx=60 (stem), y=attachment point, spread=how far leaves extend
function LeafPair({ y, spread = 18 }: { y: number; spread?: number }) {
  return (
    <>
      {/* left leaf */}
      <path
        d={`M60,${y} C${60 - spread * 0.5},${y - 4} ${60 - spread},${y - 10} ${60 - spread * 0.7},${y - 18} C${60 - spread * 0.3},${y - 10} 58,${y - 4} 60,${y}Z`}
        fill={LEAF_F} stroke={LEAF_S} strokeWidth={SW} strokeLinejoin="round"
      />
      {/* right leaf */}
      <path
        d={`M60,${y} C${60 + spread * 0.5},${y - 4} ${60 + spread},${y - 10} ${60 + spread * 0.7},${y - 18} C${60 + spread * 0.3},${y - 10} 62,${y - 4} 60,${y}Z`}
        fill={LEAF_F} stroke={LEAF_S} strokeWidth={SW} strokeLinejoin="round"
      />
    </>
  );
}

// ── Pot (shared across all stages) ────────────────────────────
function Pot() {
  return (
    <>
      {/* rim */}
      <rect x="22" y="106" width="76" height="9" rx="3"
        fill="#EDE0D4" stroke="#C4AFA6" strokeWidth="1.5" />
      {/* body */}
      <path d="M26,115 L34,148 L86,148 L94,115 Z"
        fill="#F5EDE6" stroke="#C4AFA6" strokeWidth="1.5" strokeLinejoin="round" />
      {/* subtle soil line */}
      <ellipse cx="60" cy="115" rx="32" ry="4"
        fill="#DDD0C8" opacity="0.5" />
    </>
  );
}

// ── Stage 0 — seed / empty pot ────────────────────────────────
function Stage0() {
  return (
    // tiny seed bump
    <ellipse cx="60" cy="112" rx="5" ry="3"
      fill="#A8C4A0" opacity="0.6" />
  );
}

// ── Stage 1 — sprout (1–25%) ─────────────────────────────────
function Stage1() {
  return (
    <>
      <line x1="60" y1="108" x2="60" y2="86"
        stroke={STEM} strokeWidth={SSW} strokeLinecap="round" />
      <LeafPair y={94} spread={14} />
      {/* tiny tip */}
      <path d="M60,86 C58,80 62,74 60,70"
        stroke={STEM} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  );
}

// ── Stage 2 — growing / leafy (26–50%) ───────────────────────
function Stage2() {
  return (
    <>
      <line x1="60" y1="108" x2="60" y2="66"
        stroke={STEM} strokeWidth={SSW} strokeLinecap="round" />
      <LeafPair y={96} spread={18} />
      <LeafPair y={78} spread={15} />
      <path d="M60,66 C58,60 62,54 60,50"
        stroke={STEM} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  );
}

// ── Stage 3 — budding (51–70%) ────────────────────────────────
function Stage3() {
  return (
    <>
      <line x1="60" y1="108" x2="60" y2="48"
        stroke={STEM} strokeWidth={SSW} strokeLinecap="round" />
      <LeafPair y={96} spread={18} />
      <LeafPair y={78} spread={16} />
      <LeafPair y={62} spread={13} />
      {/* closed bud */}
      <ellipse cx="60" cy="42" rx="6" ry="9"
        fill="#F2C4CE" stroke="#D4889A" strokeWidth="1.5" />
      <path d="M60,48 C56,42 64,42 60,34"
        fill="#F2C4CE" stroke="#D4889A" strokeWidth="1" strokeLinecap="round" />
    </>
  );
}

// ── Stage 4 — blooming (71–99%) ───────────────────────────────
function Stage4() {
  const cx = 60, cy = 38;
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <>
      <line x1="60" y1="108" x2="60" y2="50"
        stroke={STEM} strokeWidth={SSW} strokeLinecap="round" />
      <LeafPair y={96} spread={19} />
      <LeafPair y={78} spread={16} />
      <LeafPair y={62} spread={13} />
      {/* petals */}
      {petals.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <ellipse
            key={deg}
            cx={cx + Math.cos(rad) * 8}
            cy={cy + Math.sin(rad) * 8}
            rx="5" ry="8"
            transform={`rotate(${deg}, ${cx + Math.cos(rad) * 8}, ${cy + Math.sin(rad) * 8})`}
            fill="#F9B8C4" stroke="#E8889A" strokeWidth="1"
          />
        );
      })}
      {/* centre */}
      <circle cx={cx} cy={cy} r="6"
        fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
    </>
  );
}

// ── Stage 5 — full bloom (100%) ───────────────────────────────
function Stage5() {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <>
      <line x1="60" y1="108" x2="60" y2="48"
        stroke={STEM} strokeWidth={SSW} strokeLinecap="round" />
      {/* side branches */}
      <path d="M60,76 Q42,64 36,50"
        stroke={STEM} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M60,76 Q78,64 84,50"
        stroke={STEM} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <LeafPair y={96} spread={20} />
      <LeafPair y={78} spread={16} />
      {/* side flowers */}
      {[36, 84].map((fx) =>
        [0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <ellipse
              key={`${fx}-${deg}`}
              cx={fx + Math.cos(rad) * 6}
              cy={48 + Math.sin(rad) * 6}
              rx="4" ry="6"
              transform={`rotate(${deg}, ${fx + Math.cos(rad) * 6}, ${48 + Math.sin(rad) * 6})`}
              fill="#C4B5FD" stroke="#9B7FE8" strokeWidth="0.8"
            />
          );
        })
      )}
      <circle cx="36" cy="48" r="4.5" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
      <circle cx="84" cy="48" r="4.5" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
      {/* centre flower */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <ellipse
            key={`c${deg}`}
            cx={60 + Math.cos(rad) * 9}
            cy={34 + Math.sin(rad) * 9}
            rx="5.5" ry="9"
            transform={`rotate(${deg}, ${60 + Math.cos(rad) * 9}, ${34 + Math.sin(rad) * 9})`}
            fill="#F9B8C4" stroke="#E8889A" strokeWidth="0.8"
          />
        );
      })}
      <circle cx="60" cy="34" r="7" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
    </>
  );
}

// ── Export ────────────────────────────────────────────────────
export function PlantGrowth({ progress, color = "#10B981", size = 140 }: Props) {
  const stage = getStage(progress);
  const map = { 0: <Stage0 />, 1: <Stage1 />, 2: <Stage2 />, 3: <Stage3 />, 4: <Stage4 />, 5: <Stage5 /> };

  return (
    <svg
      viewBox="0 0 120 150"
      width={size}
      height={size * (150 / 120)}
      style={{ display: "block", overflow: "visible" }}
      aria-label={`Plant at ${progress}% growth`}
    >
      {map[stage]}
      <Pot />
    </svg>
  );
}

export const STAGE_LABELS: Record<0 | 1 | 2 | 3 | 4 | 5, string> = {
  0: "Just planted",
  1: "Sprouting",
  2: "Leafy",
  3: "Budding",
  4: "Blooming",
  5: "In full bloom 🌸",
};
