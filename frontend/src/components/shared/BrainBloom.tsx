import React from "react";

interface Props {
  progress?: number; // 0–100
  size?: number;     // rendered width in px (height auto)
}

export function getStage(pct: number): 0 | 1 | 2 | 3 | 4 | 5 {
  if (pct >= 90) return 5;
  if (pct >= 70) return 4;
  if (pct >= 50) return 3;
  if (pct >= 30) return 2;
  if (pct >= 10) return 1;
  return 0;
}

export const BRAIN_STAGE_LABELS = [
  "Just sprouting",
  "Taking root",
  "Growing strong",
  "Branching out",
  "Blossoming",
  "In full bloom 🌸",
];

// Brain surface peaks (sx,sy) → flower position (fx,fy), ordered center-outward
const FLORA = [
  { sx: 120, sy: 26, fx: 120, fy: 10, color: "#F59E0B", r: 1.1 },  // center — amber
  { sx:  98, sy: 28, fx:  98, fy: 12, color: "#EF4444", r: 0.95 }, // L near-center — red
  { sx: 142, sy: 28, fx: 142, fy: 12, color: "#8B5CF6", r: 0.95 }, // R near-center — purple
  { sx:  84, sy: 35, fx:  84, fy: 18, color: "#EC4899", r: 0.9  }, // L mid — pink
  { sx: 156, sy: 35, fx: 156, fy: 18, color: "#10B981", r: 0.9  }, // R mid — green
  { sx:  64, sy: 42, fx:  64, fy: 26, color: "#F97316", r: 0.85 }, // L outer — orange
  { sx: 176, sy: 42, fx: 176, fy: 26, color: "#3B82F6", r: 0.85 }, // R outer — blue
  { sx:  46, sy: 52, fx:  46, fy: 36, color: "#EF4444", r: 0.75 }, // far L — red
  { sx: 194, sy: 52, fx: 194, fy: 36, color: "#F59E0B", r: 0.75 }, // far R — amber
];

// How many show as full flowers vs sprouts per stage
const FLOWERS_AT_STAGE = [0, 1, 3, 5, 7, 9];
const TOTAL_AT_STAGE   = [0, 2, 4, 6, 8, 9];

function Flower({ x, y, color, r = 1 }: { x: number; y: number; color: string; r?: number }) {
  const pd = 5 * r; // petal distance from center
  const pr = 4 * r; // petal circle radius
  return (
    <g>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={x + Math.cos(rad) * pd}
            cy={y + Math.sin(rad) * pd}
            r={pr}
            fill={color}
            opacity={0.92}
          />
        );
      })}
      <circle cx={x} cy={y} r={3 * r} fill="#FDE68A" stroke="#F59E0B" strokeWidth={0.5} />
    </g>
  );
}

function Sprout({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line x1={x} y1={y + 12} x2={x} y2={y + 2} stroke="#16A34A" strokeWidth={1.5} strokeLinecap="round" />
      <ellipse cx={x - 4} cy={y + 7} rx={4} ry={2.4}
        fill="#22C55E" transform={`rotate(-40,${x - 4},${y + 7})`} />
      <ellipse cx={x + 4} cy={y + 5} rx={4} ry={2.4}
        fill="#16A34A" transform={`rotate(40,${x + 4},${y + 5})`} />
    </g>
  );
}

const BRAIN = `
  M 120,182
  C 88,182 62,173 44,156
  C 26,138 16,116 16,94
  C 16,72 26,58 40,54
  C 46,52 52,53 56,58
  C 58,50 64,42 72,44
  C 78,39 84,35 88,40
  C 92,34 98,28 104,32
  C 108,27 114,24 120,26
  C 126,24 132,27 136,32
  C 142,28 148,34 152,40
  C 156,35 162,39 168,44
  C 176,42 182,50 184,58
  C 188,53 194,52 200,54
  C 214,58 224,72 224,94
  C 224,116 214,138 196,156
  C 178,173 152,182 120,182
  Z
`;

export function BrainBloom({ progress = 0, size = 240 }: Props) {
  const stage = getStage(progress);
  const flowerCount = FLOWERS_AT_STAGE[stage];
  const totalCount  = TOTAL_AT_STAGE[stage];
  const ratio = size / 240;

  return (
    <svg
      viewBox="0 0 240 200"
      width={size}
      height={size * (200 / 240)}
      style={{ overflow: "visible" }}
      aria-label={`Brain bloom — ${BRAIN_STAGE_LABELS[stage]}`}
    >
      {/* Stems — drawn before brain so brain covers root */}
      {FLORA.slice(0, totalCount).map((f, i) => (
        <line
          key={`stem-${i}`}
          x1={f.sx} y1={f.sy - 1}
          x2={f.fx} y2={f.fy + (i < flowerCount ? 5 : 12)}
          stroke="#16A34A"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ))}

      {/* Brain */}
      <path d={BRAIN} fill="#F5EFE8" stroke="#C9B8A8" strokeWidth={2} />

      {/* Central sulcus */}
      <path
        d="M 120,26 C 119,55 118,85 119,118"
        fill="none" stroke="#C9B8A8" strokeWidth={1.5} strokeLinecap="round"
      />

      {/* Gyri texture lines */}
      <path d="M 56,58 C 54,80 52,108 56,135" fill="none" stroke="#D9C9BA" strokeWidth={1} strokeLinecap="round" />
      <path d="M 88,40 C 86,65 84,95 88,124"  fill="none" stroke="#D9C9BA" strokeWidth={1} strokeLinecap="round" />
      <path d="M 184,58 C 186,80 188,108 184,135" fill="none" stroke="#D9C9BA" strokeWidth={1} strokeLinecap="round" />
      <path d="M 152,40 C 154,65 156,95 152,124"  fill="none" stroke="#D9C9BA" strokeWidth={1} strokeLinecap="round" />

      {/* Flowers / sprouts */}
      {FLORA.slice(0, totalCount).map((f, i) =>
        i < flowerCount
          ? <Flower key={`fl-${i}`} x={f.fx} y={f.fy} color={f.color} r={f.r} />
          : <Sprout key={`sp-${i}`} x={f.fx} y={f.fy + 8} />
      )}
    </svg>
  );
}
