import { useEffect, useMemo, useRef } from "react";
import { Box } from "@mui/material";

interface Props {
  density?: number;
  opacity?: number;
}

export function NeuralNet({ density = 22, opacity = 0.32 }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const nodes = useMemo(() => {
    const rand = (seed: number) => {
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

  const edges = useMemo(() => {
    const e: { a: number; b: number }[] = [];
    nodes.forEach((n, i) => {
      const near = nodes
        .map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      near.forEach(({ j }) => {
        if (i < j) e.push({ a: i, b: j });
      });
    });
    return e;
  }, [nodes]);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const parent = el.parentElement;
    const onMove = (ev: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (ev.clientX - rect.left) / rect.width - 0.5;
      const cy = (ev.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `translate3d(${cx * -10}px, ${cy * -10}px, 0)`;
    };
    parent?.addEventListener("mousemove", onMove);
    return () => parent?.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: "100%",
          height: "100%",
          opacity,
          transition: "transform .3s ease-out",
        }}
      >
        <defs>
          <radialGradient id="nn-neuron" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--mui-palette-success-main, #2e7d32)" stopOpacity={0.9} />
            <stop offset="70%" stopColor="var(--mui-palette-primary-main, #1976d2)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--mui-palette-primary-main, #1976d2)" stopOpacity={0} />
          </radialGradient>
          <linearGradient id="nn-syn" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--mui-palette-primary-main, #1976d2)" stopOpacity={0.15} />
            <stop offset="50%" stopColor="var(--mui-palette-success-main, #2e7d32)" stopOpacity={0.6} />
            <stop offset="100%" stopColor="var(--mui-palette-primary-main, #1976d2)" stopOpacity={0.15} />
          </linearGradient>
        </defs>

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
              stroke="#1976d2"
              strokeOpacity={0.35}
              strokeWidth={0.22}
            />
          );
        })}

        {edges.slice(0, 14).map((e, i) => {
          const a = nodes[e.a];
          const b = nodes[e.b];
          const dur = 4 + ((i * 0.7) % 5);
          const delay = (i * 0.37) % 4;
          return (
            <line
              key={`s-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#nn-syn)"
              strokeWidth={0.55}
              strokeDasharray="2.5 40"
              strokeLinecap="round"
              style={{
                animation: `nn-dash ${dur}s linear ${delay}s infinite`,
              }}
            />
          );
        })}

        {nodes.map((n) => (
          <g key={`n-${n.id}`} transform={`translate(${n.x} ${n.y})`}>
            <circle
              r={n.r * 3}
              fill="url(#nn-neuron)"
              style={{
                animation: `nn-pulse ${n.dur}s ease-in-out ${n.delay}s infinite`,
                transformOrigin: "center",
              }}
            />
            <circle r={n.r * 0.55} fill="#2e7d32" />
          </g>
        ))}
        <style>{`
          @keyframes nn-pulse { 0%, 100% { opacity: .25; transform: scale(.9);} 50% { opacity: .9; transform: scale(1.25);} }
          @keyframes nn-dash { 0% { stroke-dashoffset: 0; opacity: 0;} 20% { opacity: 1;} 80% { opacity: 1;} 100% { stroke-dashoffset: -60; opacity: 0;} }
        `}</style>
      </svg>
    </Box>
  );
}
