interface Props {
  progress: number; // 0–100
  color?: string;   // accent colour used for pot rim / flower tint
  size?: number;    // rendered width in px (height auto from viewBox ratio)
}

function getStage(pct: number): 0 | 1 | 2 | 3 | 4 | 5 {
  if (pct === 0) return 0;
  if (pct <= 30) return 1;
  if (pct <= 50) return 2;
  if (pct <= 75) return 3;
  if (pct < 100) return 4;
  return 5;
}

// ── Shared pot ─────────────────────────────────────────────────
function Pot({ color }: { color: string }) {
  return (
    <>
      {/* pot body */}
      <path d="M30 110 L24 144 L96 144 L90 110 Z" fill="#C8845A" />
      {/* pot sheen */}
      <path d="M38 114 L33 140" stroke="#D9A07A" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      {/* pot rim */}
      <rect x="22" y="104" width="76" height="10" rx="5" fill={color} opacity="0.85" />
      {/* soil */}
      <ellipse cx="60" cy="109" rx="34" ry="7" fill="#5C3417" />
      <ellipse cx="60" cy="108" rx="22" ry="4" fill="#6B4225" opacity="0.7" />
    </>
  );
}

// ── Stage 0 — bare sprout ──────────────────────────────────────
function Stage0() {
  return (
    <>
      <line x1="60" y1="109" x2="60" y2="90" stroke="#5B8C4A" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 90 Q68 84 63 76" stroke="#7DC46A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  );
}

// ── Stage 1 — seedling (1–30%) ─────────────────────────────────
function Stage1() {
  return (
    <>
      {/* stem */}
      <line x1="60" y1="109" x2="60" y2="72" stroke="#5B8C4A" strokeWidth="3.5" strokeLinecap="round" />
      {/* left leaf */}
      <path d="M60 90 C50 85 36 86 38 73 C42 85 57 87 60 90Z" fill="#6DC47C" />
      {/* right leaf */}
      <path d="M60 90 C70 85 84 86 82 73 C78 85 63 87 60 90Z" fill="#7DD48A" />
      {/* tip curl */}
      <path d="M60 72 Q66 65 62 58" stroke="#5B8C4A" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  );
}

// ── Stage 2 — growing (31–50%) ────────────────────────────────
function Stage2() {
  return (
    <>
      {/* stem */}
      <line x1="60" y1="109" x2="60" y2="52" stroke="#4E7A40" strokeWidth="4" strokeLinecap="round" />
      {/* lower-left leaf */}
      <path d="M60 96 C48 89 32 92 34 77 C38 90 56 92 60 96Z" fill="#6DC47C" />
      {/* lower-right leaf */}
      <path d="M60 96 C72 89 88 92 86 77 C82 90 64 92 60 96Z" fill="#7DD48A" />
      {/* upper-left leaf */}
      <path d="M60 74 C50 67 38 70 40 58 C44 69 57 71 60 74Z" fill="#5EBA6C" />
      {/* upper-right leaf */}
      <path d="M60 74 C70 67 82 70 80 58 C76 69 63 71 60 74Z" fill="#6DC47C" />
      {/* tip */}
      <path d="M60 52 Q65 44 61 37" stroke="#4E7A40" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  );
}

// ── Stage 3 — budding (51–75%) ────────────────────────────────
function Stage3() {
  return (
    <>
      {/* stem */}
      <line x1="60" y1="109" x2="60" y2="36" stroke="#3E6832" strokeWidth="4" strokeLinecap="round" />
      {/* lower leaves */}
      <path d="M60 98 C46 90 28 93 30 78 C35 91 56 93 60 98Z" fill="#6DC47C" />
      <path d="M60 98 C74 90 92 93 90 78 C85 91 64 93 60 98Z" fill="#7DD48A" />
      {/* mid leaves */}
      <path d="M60 78 C48 70 34 73 36 60 C40 72 56 74 60 78Z" fill="#5EBA6C" />
      <path d="M60 78 C72 70 86 73 84 60 C80 72 64 74 60 78Z" fill="#6DC47C" />
      {/* upper leaves */}
      <path d="M60 58 C52 52 42 54 43 44 C46 53 57 54 60 58Z" fill="#5BAF6A" />
      <path d="M60 58 C68 52 78 54 77 44 C74 53 63 54 60 58Z" fill="#6DC47C" />
      {/* closed bud */}
      <ellipse cx="60" cy="32" rx="7" ry="10" fill="#F9A8C9" />
      <path d="M60 36 Q55 28 60 22 Q65 28 60 36Z" fill="#EC89B2" />
    </>
  );
}

// ── Stage 4 — opening (76–99%) ───────────────────────────────
function Stage4() {
  return (
    <>
      {/* stem + 2 side branches */}
      <line x1="60" y1="109" x2="60" y2="30" stroke="#3E6832" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 70 Q42 58 38 44" stroke="#4A7A3C" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M60 70 Q78 58 82 44" stroke="#4A7A3C" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* leaves */}
      <path d="M60 96 C46 88 28 91 30 76 C35 89 56 91 60 96Z" fill="#6DC47C" />
      <path d="M60 96 C74 88 92 91 90 76 C85 89 64 91 60 96Z" fill="#7DD48A" />
      <path d="M60 76 C48 68 34 71 36 58 C40 70 56 72 60 76Z" fill="#5EBA6C" />
      <path d="M60 76 C72 68 86 71 84 58 C80 70 64 72 60 76Z" fill="#6DC47C" />
      {/* side buds opening */}
      <ellipse cx="38" cy="40" rx="8" ry="10" fill="#FAB8D0" />
      <path d="M33 40 Q38 30 43 40" fill="#F78FB3" />
      <ellipse cx="82" cy="40" rx="8" ry="10" fill="#FAB8D0" />
      <path d="M77 40 Q82 30 87 40" fill="#F78FB3" />
      {/* main bud half-open */}
      <ellipse cx="60" cy="26" rx="9" ry="11" fill="#FDA4C4" />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const px = 60 + Math.cos(rad) * 9;
        const py = 26 + Math.sin(rad) * 11;
        return (
          <ellipse
            key={deg}
            cx={60 + Math.cos(rad) * 6}
            cy={26 + Math.sin(rad) * 7}
            rx="5"
            ry="8"
            transform={`rotate(${deg} ${px} ${py})`}
            fill="#FBBDD6"
            opacity="0.8"
          />
        );
      })}
      <circle cx="60" cy="26" r="5" fill="#FDE68A" />
    </>
  );
}

// ── Stage 5 — full bloom (100%) ───────────────────────────────
function Stage5() {
  return (
    <>
      {/* stem + branches */}
      <line x1="60" y1="109" x2="60" y2="38" stroke="#3E6832" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 72 Q40 58 34 42" stroke="#4A7A3C" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M60 72 Q80 58 86 42" stroke="#4A7A3C" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* leaves */}
      <path d="M60 96 C46 88 28 91 30 76 C35 89 56 91 60 96Z" fill="#6DC47C" />
      <path d="M60 96 C74 88 92 91 90 76 C85 89 64 91 60 96Z" fill="#7DD48A" />
      <path d="M60 76 C48 68 34 71 36 58 C40 70 56 72 60 76Z" fill="#5EBA6C" />
      <path d="M60 76 C72 68 86 71 84 58 C80 70 64 72 60 76Z" fill="#6DC47C" />
      {/* left flower */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <ellipse
            key={`l${deg}`}
            cx={34 + Math.cos(rad) * 8}
            cy={38 + Math.sin(rad) * 8}
            rx="5"
            ry="8"
            transform={`rotate(${deg} ${34 + Math.cos(rad) * 8} ${38 + Math.sin(rad) * 8})`}
            fill="#FBBDD6"
          />
        );
      })}
      <circle cx="34" cy="38" r="6" fill="#FDE68A" />
      {/* right flower */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <ellipse
            key={`r${deg}`}
            cx={86 + Math.cos(rad) * 8}
            cy={38 + Math.sin(rad) * 8}
            rx="5"
            ry="8"
            transform={`rotate(${deg} ${86 + Math.cos(rad) * 8} ${38 + Math.sin(rad) * 8})`}
            fill="#C4B5FD"
          />
        );
      })}
      <circle cx="86" cy="38" r="6" fill="#FDE68A" />
      {/* centre flower — bigger */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <ellipse
            key={`c${deg}`}
            cx={60 + Math.cos(rad) * 11}
            cy={28 + Math.sin(rad) * 11}
            rx="6"
            ry="10"
            transform={`rotate(${deg} ${60 + Math.cos(rad) * 11} ${28 + Math.sin(rad) * 11})`}
            fill="#FDA4C4"
          />
        );
      })}
      <circle cx="60" cy="28" r="8" fill="#FCD34D" />
      {/* sparkles */}
      {[[18, 12], [100, 16], [106, 52], [14, 56]].map(([sx, sy]) => (
        <g key={`${sx}${sy}`}>
          <line x1={sx} y1={sy - 5} x2={sx} y2={sy + 5} stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={sx - 5} y1={sy} x2={sx + 5} y2={sy} stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
    </>
  );
}

// ── Public component ──────────────────────────────────────────

export function PlantGrowth({ progress, color = "#10B981", size = 140 }: Props) {
  const stage = getStage(progress);
  const stageMap = { 0: <Stage0 />, 1: <Stage1 />, 2: <Stage2 />, 3: <Stage3 />, 4: <Stage4 />, 5: <Stage5 /> };

  return (
    <svg
      viewBox="0 0 120 150"
      width={size}
      height={size * (150 / 120)}
      style={{ display: "block", overflow: "visible" }}
      aria-label={`Plant at ${progress}% growth`}
    >
      {stageMap[stage]}
      <Pot color={color} />
    </svg>
  );
}

export const STAGE_LABELS: Record<0 | 1 | 2 | 3 | 4 | 5, string> = {
  0: "Just planted",
  1: "Sprouting",
  2: "Growing",
  3: "Budding",
  4: "Almost blooming",
  5: "In full bloom 🌸",
};

export { getStage };
