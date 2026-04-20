/**
 * OrbitParticles — gradient rings of drifting particles forming a subtle
 * brain-like orbit for large dark CTA panels.
 */
export function OrbitParticles({ className = "", opacity = 0.5 }) {
  const rings = [
    { r: 120, count: 14, dur: 30, rev: false },
    { r: 170, count: 20, dur: 45, rev: true },
    { r: 220, count: 26, dur: 60, rev: false },
  ];

  return (
    <svg
      viewBox="0 0 500 500"
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <radialGradient id="orb-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="1" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="orb-particle" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Core glow */}
      <circle cx="250" cy="250" r="80" fill="url(#orb-core)" className="orb-core" />

      {rings.map((ring, ri) => {
        const particles = Array.from({ length: ring.count });
        return (
          <g
            key={ri}
            style={{
              transformOrigin: "250px 250px",
              animation: `orb-spin ${ring.dur}s linear ${ring.rev ? "reverse" : "normal"} infinite`,
            }}
          >
            <circle
              cx="250"
              cy="250"
              r={ring.r}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeOpacity="0.1"
              strokeWidth="0.75"
              strokeDasharray="2 6"
            />
            {particles.map((_, i) => {
              const angle = (i / ring.count) * Math.PI * 2;
              const x = 250 + Math.cos(angle) * ring.r;
              const y = 250 + Math.sin(angle) * ring.r;
              const size = 3 + ((i * 7) % 4);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={size}
                  fill="url(#orb-particle)"
                  style={{
                    animation: `orb-twinkle ${2 + (i % 3)}s ease-in-out ${(i * 0.13) % 3}s infinite`,
                  }}
                />
              );
            })}
          </g>
        );
      })}

      <style>{`
        .orb-core {
          transform-origin: 250px 250px;
          animation: orb-breathe 5s ease-in-out infinite;
        }
        @keyframes orb-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orb-breathe {
          0%, 100% { transform: scale(0.85); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes orb-twinkle {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          svg * { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}
