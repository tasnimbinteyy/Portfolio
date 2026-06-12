"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, ImageIcon, BarChart2 } from "lucide-react";
import type { ImageEntry } from "./labImages";

// ── SVG Graph Placeholders ────────────────────────────────────────────────────

function HistogramSVG({ variant = "normal" }: { variant?: "normal" | "equalized" }) {
  const bars =
    variant === "equalized"
      ? [6, 8, 9, 10, 10, 10, 11, 10, 10, 10, 9, 10, 10, 10, 9, 8, 9, 10, 10, 9]
      : [1, 1, 2, 3, 5, 8, 14, 22, 30, 35, 28, 20, 12, 7, 4, 2, 1, 1, 1, 1];
  const max = Math.max(...bars);
  const w = 320, h = 180, padX = 30, padY = 16;
  const bw = (w - padX * 2) / bars.length;
  return (
    <svg viewBox={`0 0 ${w} ${h + 34}`} className="w-full h-full">
      <rect width={w} height={h + 34} fill="#0a0a0f" rx="8" />
      {[0.25, 0.5, 0.75, 1].map((v, i) => (
        <line key={i}
          x1={padX} y1={padY + (1 - v) * (h - padY * 2)}
          x2={w - padX} y2={padY + (1 - v) * (h - padY * 2)}
          stroke="#1e1e28" strokeWidth="1" strokeDasharray="3,3" />
      ))}
      {bars.map((v, i) => {
        const bh = (v / max) * (h - padY * 2);
        const x = padX + i * bw;
        const y = h - padY - bh;
        const hue = variant === "equalized" ? 150 : 200;
        return <rect key={i} x={x + 1} y={y} width={bw - 2} height={bh} fill={`hsl(${hue},35%,48%)`} rx="1.5" opacity="0.9" />;
      })}
      <line x1={padX} y1={padY} x2={padX} y2={h - padY} stroke="#2a2a35" strokeWidth="1.5" />
      <line x1={padX} y1={h - padY} x2={w - padX} y2={h - padY} stroke="#2a2a35" strokeWidth="1.5" />
      <text x={padX} y={h + 14} fill="#506464" fontSize="9" textAnchor="middle">0</text>
      <text x={w / 2} y={h + 14} fill="#506464" fontSize="9" textAnchor="middle">128</text>
      <text x={w - padX} y={h + 14} fill="#506464" fontSize="9" textAnchor="middle">255</text>
      <text x={w / 2} y={h + 28} fill="#8a9a8a" fontSize="9" textAnchor="middle" fontWeight="600">
        {variant === "equalized" ? "After Equalization — uniform spread" : "Original — narrow peak (low contrast)"}
      </text>
    </svg>
  );
}

function WaveformSVG() {
  const w = 320, h = 160;
  const pts = Array.from({ length: 120 }, (_, i) => {
    const x = 20 + i * 2.35;
    const y = h / 2
      + Math.sin(i * 0.35) * 50 * Math.exp(-i * 0.012)
      + Math.sin(i * 1.1)  * 18 * Math.exp(-i * 0.018)
      + Math.sin(i * 2.3)  * 7;
    return `${x},${y}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h + 30}`} className="w-full h-full">
      <rect width={w} height={h + 30} fill="#0a0a0f" rx="8" />
      {[-0.5, 0, 0.5].map((v, i) => (
        <line key={i} x1={20} y1={h / 2 + v * h * 0.65} x2={w - 20} y2={h / 2 + v * h * 0.65}
          stroke="#1e1e28" strokeWidth="1" strokeDasharray="3,3" />
      ))}
      <line x1={20} y1={h / 2} x2={w - 20} y2={h / 2} stroke="#2a2a35" strokeWidth="1.5" />
      <line x1={20} y1={12} x2={20} y2={h - 12} stroke="#2a2a35" strokeWidth="1.5" />
      <path d={"M " + pts.join(" L ")} fill="none" stroke="#8a9a8a" strokeWidth="2" strokeLinejoin="round" />
      <text x={w / 2} y={h + 14} fill="#506464" fontSize="9" textAnchor="middle">Time →</text>
      <text x={w / 2} y={h + 26} fill="#8a9a8a" fontSize="9" textAnchor="middle" fontWeight="600">
        Audio Waveform — amplitude over time
      </text>
    </svg>
  );
}

function LineSVG({ variant = "dda" }: { variant?: "dda" | "bresenham" }) {
  const cols = 18, rows = 14, cw = 17, ch = 15;
  const pixels: [number, number][] = [];
  const x1 = 1, y1 = 12, x2 = 16, y2 = 1;
  if (variant === "dda") {
    const dx = x2 - x1, dy = y2 - y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    let x = x1, y = y1;
    for (let i = 0; i <= steps; i++) {
      pixels.push([Math.round(x), Math.round(y)]);
      x += dx / steps; y += dy / steps;
    }
  } else {
    let [cx, cy] = [x1, y1];
    const dx = Math.abs(x2 - x1), dy = Math.abs(y2 - y1);
    const sx = cx < x2 ? 1 : -1, sy = cy < y2 ? 1 : -1;
    let err = dx - dy;
    while (true) {
      pixels.push([cx, cy]);
      if (cx === x2 && cy === y2) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; cx += sx; }
      if (e2 < dx)  { err += dx; cy += sy; }
    }
  }
  const color = variant === "dda" ? "#7aaa7a" : "#6aaaaa";
  const totalW = cols * cw + 8;
  const totalH = rows * ch + 36;
  return (
    <svg viewBox={`0 0 ${totalW} ${totalH}`} className="w-full h-full">
      <rect width={totalW} height={totalH} fill="#0a0a0f" rx="8" />
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <rect key={`${r}-${c}`}
            x={4 + c * cw} y={4 + r * ch}
            width={cw - 2} height={ch - 2}
            fill={pixels.some(([px, py]) => px === c && py === r) ? color : "#131318"}
            rx="2" />
        ))
      )}
      <line
        x1={4 + x1 * cw + cw / 2} y1={4 + y1 * ch + ch / 2}
        x2={4 + x2 * cw + cw / 2} y2={4 + y2 * ch + ch / 2}
        stroke="#506464" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7" />
      <text x={totalW / 2} y={rows * ch + 18} fill={color} fontSize="10" textAnchor="middle" fontWeight="700">
        {variant === "dda" ? "DDA Algorithm" : "Bresenham Algorithm"}
      </text>
      <text x={totalW / 2} y={rows * ch + 32} fill="#506464" fontSize="8" textAnchor="middle">
        {variant === "dda" ? "float rounding" : "integer arithmetic only"} · dashed = ideal line
      </text>
    </svg>
  );
}

function ScatterSVG() {
  const w = 320, h = 200;
  const clusters = [
    { cx: 80,  cy: 60,  color: "#8aaa8a", label: "Cluster 1", n: 25 },
    { cx: 210, cy: 110, color: "#6a9aaa", label: "Cluster 2", n: 22 },
    { cx: 120, cy: 150, color: "#aa8a7a", label: "Cluster 3", n: 20 },
  ];
  const seed = (n: number) => (Math.sin(n * 9301 + 49297) * 826) % 1;
  return (
    <svg viewBox={`0 0 ${w} ${h + 30}`} className="w-full h-full">
      <rect width={w} height={h + 30} fill="#0a0a0f" rx="8" />
      {clusters.map((cl, ci) =>
        Array.from({ length: cl.n }, (_, i) => (
          <circle key={`${ci}-${i}`}
            cx={cl.cx + (seed(ci * 100 + i) - 0.5) * 70}
            cy={cl.cy + (seed(ci * 100 + i + 50) - 0.5) * 55}
            r="4.5" fill={cl.color} opacity="0.65" />
        ))
      )}
      {clusters.map((cl, ci) => (
        <g key={ci}>
          <circle cx={cl.cx} cy={cl.cy} r="9" fill="none" stroke={cl.color} strokeWidth="2" strokeDasharray="4,3" />
          <circle cx={cl.cx} cy={cl.cy} r="3.5" fill={cl.color} />
          <text x={cl.cx + 14} y={cl.cy + 4} fill={cl.color} fontSize="10" fontWeight="700">{cl.label}</text>
        </g>
      ))}
      <text x={w / 2} y={h + 14} fill="#506464" fontSize="9" textAnchor="middle">
        Pixels in RGB space — dashed circles = centroids
      </text>
      <text x={w / 2} y={h + 26} fill="#8a9a8a" fontSize="9" textAnchor="middle" fontWeight="600">
        K-Means groups similar-colored pixels together
      </text>
    </svg>
  );
}

function BarSVG() {
  const vals   = [0.33, 0.34, 0.33];
  const colors = ["#c06060", "#60b060", "#6080c0"];
  const labels = ["Red (R)", "Green (G)", "Blue (B)"];
  const w = 320, h = 180, padX = 32, padY = 16;
  const bw = 62;
  return (
    <svg viewBox={`0 0 ${w} ${h + 40}`} className="w-full h-full">
      <rect width={w} height={h + 40} fill="#0a0a0f" rx="8" />
      {[0.25, 0.5, 0.75, 1].map((v, i) => (
        <line key={i} x1={padX} y1={padY + (1 - v) * (h - padY * 2)}
          x2={w - padX} y2={padY + (1 - v) * (h - padY * 2)}
          stroke="#1e1e28" strokeWidth="1" strokeDasharray="3,3" />
      ))}
      {vals.map((v, i) => {
        const bh = v * (h - padY * 2);
        const x  = padX + i * ((w - padX * 2) / 3) + 8;
        const y  = h - padY - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} fill={colors[i]} rx="4" opacity="0.82" />
            <text x={x + bw / 2} y={y - 6} fill={colors[i]} fontSize="11" textAnchor="middle" fontWeight="700">
              {Math.round(v * 100)}%
            </text>
            <text x={x + bw / 2} y={h + 6} fill="#8a9a8a" fontSize="9" textAnchor="middle">{labels[i]}</text>
          </g>
        );
      })}
      <line x1={padX} y1={padY} x2={padX} y2={h - padY} stroke="#2a2a35" strokeWidth="1.5" />
      <line x1={padX} y1={h - padY} x2={w - padX} y2={h - padY} stroke="#2a2a35" strokeWidth="1.5" />
      <text x={w / 2} y={h + 22} fill="#506464" fontSize="9" textAnchor="middle">RGB Channel Distribution</text>
      <text x={w / 2} y={h + 35} fill="#8a9a8a" fontSize="9" textAnchor="middle" fontWeight="600">
        Shape: (512, 512, 3) — 3 channels, balanced
      </text>
    </svg>
  );
}

function GraphPlaceholder({ variant, slot }: { variant?: string; slot: "input" | "output" }) {
  if (variant === "histogram") return <HistogramSVG variant={slot === "output" ? "equalized" : "normal"} />;
  if (variant === "waveform")  return slot === "output" ? <WaveformSVG /> : <BarSVG />;
  if (variant === "line")      return <LineSVG variant={slot === "output" ? "bresenham" : "dda"} />;
  if (variant === "scatter")   return <ScatterSVG />;
  if (variant === "bar")       return <BarSVG />;
  return <HistogramSVG />;
}

// ── Stacked card ──────────────────────────────────────────────────────────────

interface CardProps {
  src?: string;
  label: string;
  graphVariant?: string;
  slot: "input" | "output";
  isActive: boolean;
  index: number;
  isGraph: boolean;
  onError: () => void;
  hasError: boolean;
}

function StackCard({ src, label, graphVariant, slot, isActive, index, isGraph, onError, hasError }: CardProps) {
  const rotations = [0, -5, -10];
  const scales    = [1, 0.95, 0.90];
  const yOffsets  = [0, 10, 20];

  return (
    <motion.div
      layout
      animate={{
        rotate: isActive ? 0 : (rotations[index] ?? -10),
        scale:  isActive ? 1 : (scales[index]    ?? 0.88),
        y:      isActive ? 0 : (yOffsets[index]  ?? 20),
        zIndex: isActive ? 10 : 10 - index,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="absolute inset-0 rounded-2xl overflow-hidden border border-[#1e1e28] bg-[#0a0a0f] shadow-2xl"
      style={{ transformOrigin: "bottom center" }}
    >
      <div className="w-full h-full flex items-center justify-center p-3">
        {isGraph || !src || hasError ? (
          <GraphPlaceholder variant={graphVariant} slot={slot} />
        ) : (
          <img src={src} alt={label} className="w-full h-full object-contain rounded-lg" onError={onError} />
        )}
      </div>

      {/* label pill */}
      <div className="absolute bottom-3 left-3 right-3">
        <span className="inline-block px-2.5 py-1 rounded-full bg-[#0e0e12]/90 backdrop-blur-sm border border-[#2a2a35] text-[10px] text-[#8a9a8a] truncate max-w-full">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

// ── Main ImagePanel ───────────────────────────────────────────────────────────

interface Props {
  entry: ImageEntry;
  sectionTitle: string;
  defaultOpen?: boolean;
}

export default function ImagePanel({ entry, sectionTitle, defaultOpen = false }: Props) {
  const [open, setOpen]           = useState(defaultOpen);
  const [active, setActive]       = useState(0);
  const [inputErr, setInputErr]   = useState(false);
  const [outputErr, setOutputErr] = useState(false);

  const isGraph = entry.type === "graph";

  const slides = [
    { slot: "input"  as const, src: entry.inputSrc,  label: entry.inputLabel,  hasError: inputErr,  onError: () => setInputErr(true)  },
    { slot: "output" as const, src: entry.outputSrc, label: entry.outputLabel, hasError: outputErr, onError: () => setOutputErr(true) },
  ];

  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);
  const next = () => setActive((a) => (a + 1) % slides.length);

  return (
    <div className="my-5 rounded-xl border border-[#1e1e28] overflow-hidden">

      {/* Toggle header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#0e0e12] hover:bg-[#131318] transition-colors group"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#506464]/20 text-[#8a9a8a]">
            {isGraph ? <BarChart2 className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
          </span>
          <span className="text-xs font-medium text-[#8a9a8a] group-hover:text-[#e8e8e4] transition-colors">
            {isGraph ? "Output Graph" : "Input / Output"} — {sectionTitle}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#506464] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Collapsible body */}
      <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-5 bg-[#080810]">
            <div className="flex gap-6 items-start">

              {/* Stacked card — bigger */}
              <div className="relative flex-shrink-0" style={{ width: 360, height: 300 }}>
                {[...slides].reverse().map((slide, revIdx) => {
                  const idx = slides.length - 1 - revIdx;
                  const distFromActive = (idx - active + slides.length) % slides.length;
                  return (
                    <StackCard
                      key={slide.slot}
                      src={slide.src}
                      label={slide.label}
                      graphVariant={entry.graphVariant}
                      slot={slide.slot}
                      isActive={idx === active}
                      index={distFromActive}
                      isGraph={isGraph}
                      onError={slide.onError}
                      hasError={slide.hasError}
                    />
                  );
                })}
              </div>

              {/* Right side */}
              <div className="flex flex-col justify-between min-h-[300px] flex-1 min-w-0">

                <div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-3 ${
                        active === 0
                          ? "bg-[#506464]/20 text-[#8a9a8a] border border-[#506464]/40"
                          : "bg-[#4a7a4a]/20 text-[#7aaa7a] border border-[#4a7a4a]/40"
                      }`}>
                        {active === 0 ? "⬅ Input" : "➡ Output"}
                      </span>
                      <p className="text-sm font-semibold text-[#e8e8e4] leading-snug mb-3">
                        {slides[active].label}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <p className="text-xs text-[#606060] leading-relaxed italic border-l-2 border-[#2a2a35] pl-3">
                    {entry.caption}
                  </p>
                </div>

                {/* Nav */}
                <div className="flex items-center gap-3 mt-4">
                  <button onClick={prev}
                    className="w-9 h-9 rounded-full border border-[#2a2a35] bg-[#0e0e12] hover:bg-[#1a1a20] hover:border-[#506464]/50 flex items-center justify-center transition-all">
                    <ChevronLeft className="w-4 h-4 text-[#506464]" />
                  </button>
                  <button onClick={next}
                    className="w-9 h-9 rounded-full border border-[#2a2a35] bg-[#0e0e12] hover:bg-[#1a1a20] hover:border-[#506464]/50 flex items-center justify-center transition-all">
                    <ChevronRight className="w-4 h-4 text-[#506464]" />
                  </button>

                  <div className="flex gap-2">
                    {slides.map((_, i) => (
                      <button key={i} onClick={() => setActive(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === active ? "bg-[#8a9a8a] w-5" : "bg-[#2a2a35] w-1.5 hover:bg-[#506464]"
                        }`} />
                    ))}
                  </div>

                  <span className="text-[10px] text-[#404040] ml-auto">{active + 1} / {slides.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
