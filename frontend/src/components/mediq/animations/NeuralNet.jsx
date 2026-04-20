import { useEffect, useMemo, useRef } from "react";

/**
 * Ambient SVG neural network — pulsing neurons + animated synapse signals.
 * Pure SVG + CSS, no external deps, respects prefers-reduced-motion.
 */
export function NeuralNet({ className = "", density = 22, opacity = 0.35 }) {
  const svgRef = useRef(null);

  // Stable randomised nodes
  const nodes = useMemo(() => {
    const rand = (seed) => {
      const x = Math.sin(seed * 9301 + 49297) * 233280;
      return x - Math.floor(x);
    };
    return Array.from({ length: density }, (_, i) => ({
      id: i,
      x: rand(i + 1) * 100,
      y: rand(i + 11) * 100,
      r: 1.2 + rand(i + 21) * 2.2,
      delay: rand(i + 31) * 5,
      dur: 3 + rand(i + 41) * 4,
    }));
  }, [density]);

  // Build edges: connect each node to its 2 nearest neighbours
  const edges = useMemo(() => {
    const e = [];
    nodes.forEach((n, i) => {
      const distances = nodes
        .map((m, j) => ({
          j,
          d: Math.hypot(n.x - m.x, n.y - m.y),
        }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      distances.forEach(({ j }) => {
        if (i < j) e.push({ a: i, b: j, d: Math.hypot(n.x - nodes[j].x, n.y - nodes[j].y) });
      });
    });
    return e;
  }, [nodes]);

  // Parallax on mouse move — very subtle
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `translate3d(${cx * -10}px, ${cy * -10}px, 0)`;
    };
    const parent = el.parentElement;
    parent?.addEventListener("mousemove", onMove);
    return () => parent?.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full transition-transform duration-300 ease-out ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <defs>
        <radialGradient id="neuron-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
          <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="synapse-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
        </linearGradient>
        <filter id="soft-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.3" />
        </filter>
      </defs>

      {/* Connecting lines */}
      <g filter="url(#soft-blur)">
        {edges.map((e, i) => {
          const a = nodes[e.a];
          const b = nodes[e.b];
          return (
            <line
              key={`e-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="hsl(var(--primary))"
              strokeOpacity="0.35"
              strokeWidth="0.22"
            />
          );
        })}
      </g>

      {/* Animated synapse signals traveling along edges */}
      {edges.slice(0, Math.min(edges.length, 14)).map((e, i) => {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const dur = 4 + ((i * 0.7) % 5);
        const delay = (i * 0.37) % 4;
        return (
          <g key={`s-${i}`}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#synapse-line)"
              strokeWidth="0.55"
              strokeDasharray="2.5 40"
              strokeLinecap="round"
              style={{
                animation: `nn-dash ${dur}s linear ${delay}s infinite`,
              }}
            />
          </g>
        );
      })}

      {/* Neurons */}
      {nodes.map((n) => (
        <g key={`n-${n.id}`} transform={`translate(${n.x} ${n.y})`}>
          <circle
            r={n.r * 3}
            fill="url(#neuron-glow)"
            style={{
              animation: `nn-pulse ${n.dur}s ease-in-out ${n.delay}s infinite`,
              transformOrigin: "center",
            }}
          />
          <circle r={n.r * 0.55} fill="hsl(var(--accent))" />
        </g>
      ))}

      <style>{`
        @keyframes nn-pulse {
          0%, 100% { opacity: 0.25; transform: scale(0.9); }
          50% { opacity: 0.9; transform: scale(1.25); }
        }
        @keyframes nn-dash {
          0% { stroke-dashoffset: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: -60; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          svg * { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}
