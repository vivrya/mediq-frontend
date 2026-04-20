/**
 * Cell mitosis / birth animation — pure SVG.
 * A membrane-bounded cell with drifting organelles that breathes, splits
 * and re-forms in a slow, calm loop.
 */
export function CellMitosis({ className = "", opacity = 0.55 }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <radialGradient id="cell-body" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.45" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cell-membrane" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="transparent" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
        </radialGradient>
        <radialGradient id="nucleus-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="1" />
          <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
        <filter id="cell-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* Outer pulsing halo */}
      <circle cx="200" cy="200" r="180" fill="url(#cell-body)" className="cell-halo" />

      {/* Dividing membrane group — splits horizontally and returns */}
      <g className="cell-split">
        <circle cx="200" cy="200" r="130" fill="url(#cell-body)" />
        <circle cx="200" cy="200" r="130" fill="none" stroke="hsl(var(--accent))" strokeOpacity="0.55" strokeWidth="1.25" filter="url(#cell-blur)" />
        <circle cx="200" cy="200" r="130" fill="url(#cell-membrane)" opacity="0.8" />
      </g>

      {/* Nucleus that orbits gently */}
      <g className="cell-nucleus">
        <circle cx="200" cy="200" r="38" fill="url(#nucleus-grad)" />
        <circle cx="200" cy="200" r="18" fill="hsl(var(--accent))" opacity="0.9" />
        <circle cx="200" cy="200" r="10" fill="hsl(var(--background))" opacity="0.9" />
      </g>

      {/* Drifting organelles */}
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
          fill="hsl(var(--accent))"
          opacity="0.85"
          style={{
            transformOrigin: "200px 200px",
            animation: `cell-orbit ${o.d}s linear infinite`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}

      <style>{`
        .cell-halo {
          transform-origin: 200px 200px;
          animation: cell-breathe 6s ease-in-out infinite;
        }
        .cell-split {
          transform-origin: 200px 200px;
          animation: cell-divide 9s ease-in-out infinite;
        }
        .cell-nucleus {
          transform-origin: 200px 200px;
          animation: nucleus-drift 7s ease-in-out infinite;
        }
        @keyframes cell-breathe {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 0.95; }
        }
        @keyframes cell-divide {
          0%, 100% { transform: scaleX(1); }
          45% { transform: scaleX(1.22) scaleY(0.92); }
          55% { transform: scaleX(1.22) scaleY(0.92); }
        }
        @keyframes nucleus-drift {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-14px, 8px); }
          66% { transform: translate(10px, -10px); }
        }
        @keyframes cell-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          svg * { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}
