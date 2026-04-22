import { Box } from "@mui/material";

export function CellMitosis({ opacity = 0.55 }: { opacity?: number }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 400 400"
      sx={{ width: "100%", height: "100%", opacity, pointerEvents: "none" }}
      aria-hidden
    >
      <defs>
        <radialGradient id="cell-body" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#2e7d32" stopOpacity={0.45} />
          <stop offset="50%" stopColor="#1976d2" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#1976d2" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="cell-membrane" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="transparent" />
          <stop offset="100%" stopColor="#2e7d32" stopOpacity={0.9} />
        </radialGradient>
        <radialGradient id="nucleus-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2e7d32" />
          <stop offset="60%" stopColor="#1976d2" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#1976d2" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={200} cy={200} r={180} fill="url(#cell-body)" className="cell-halo" />
      <g className="cell-split">
        <circle cx={200} cy={200} r={130} fill="url(#cell-body)" />
        <circle cx={200} cy={200} r={130} fill="none" stroke="#2e7d32" strokeOpacity={0.55} strokeWidth={1.25} />
        <circle cx={200} cy={200} r={130} fill="url(#cell-membrane)" opacity={0.8} />
      </g>
      <g className="cell-nucleus">
        <circle cx={200} cy={200} r={38} fill="url(#nucleus-grad)" />
        <circle cx={200} cy={200} r={18} fill="#2e7d32" opacity={0.9} />
        <circle cx={200} cy={200} r={10} fill="#ffffff" opacity={0.9} />
      </g>
      {[
        { cx: 150, cy: 160, r: 6, d: 8 },
        { cx: 250, cy: 240, r: 5, d: 11 },
        { cx: 165, cy: 245, r: 4, d: 9 },
        { cx: 240, cy: 155, r: 5, d: 10 },
      ].map((o, i) => (
        <circle
          key={i}
          cx={o.cx}
          cy={o.cy}
          r={o.r}
          fill="#2e7d32"
          opacity={0.85}
          style={{
            transformOrigin: "200px 200px",
            animation: `cell-orbit ${o.d}s linear infinite`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}
      <style>{`
        .cell-halo { transform-origin: 200px 200px; animation: cell-breathe 6s ease-in-out infinite; }
        .cell-split { transform-origin: 200px 200px; animation: cell-divide 9s ease-in-out infinite; }
        .cell-nucleus { transform-origin: 200px 200px; animation: nucleus-drift 7s ease-in-out infinite; }
        @keyframes cell-breathe { 0%,100%{ transform: scale(1); opacity:.6;} 50%{ transform: scale(1.08); opacity:.95;} }
        @keyframes cell-divide { 0%,100%{ transform: scaleX(1);} 45%{ transform: scaleX(1.22) scaleY(.92);} 55%{ transform: scaleX(1.22) scaleY(.92);} }
        @keyframes nucleus-drift { 0%,100%{ transform: translate(0,0);} 33%{ transform: translate(-14px,8px);} 66%{ transform: translate(10px,-10px);} }
        @keyframes cell-orbit { from { transform: rotate(0);} to { transform: rotate(360deg);} }
      `}</style>
    </Box>
  );
}
