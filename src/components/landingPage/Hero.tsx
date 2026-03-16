import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Terminal,
  Globe,
  MousePointerClick,
  CheckCircle2,
  Loader2,
  Fish,
} from "lucide-react";

// Rotating words for the typing effect
const rotatingWords: string[] = [
  "scrape websites",
  "fill out forms",
  "extract pricing data",
  "monitor competitors",
  "automate signups",
  "collect leads",
];

// Fake terminal lines showing the agent working
interface TerminalLine {
  text: string;
  type: "command" | "info" | "success" | "loading";
  icon?: React.ReactNode;
}

const terminalLines: TerminalLine[] = [
  {
    text: '"Go to amazon.in and find top 5 laptops under ₹50k"',
    type: "command",
    icon: <Terminal size={14} />,
  },
  {
    text: "Launching browser session...",
    type: "loading",
    icon: <Loader2 size={14} className="animate-spin" />,
  },
  {
    text: "Navigating to amazon.in",
    type: "info",
    icon: <Globe size={14} />,
  },
  {
    text: 'Searching "laptops under 50000"',
    type: "info",
    icon: <MousePointerClick size={14} />,
  },
  {
    text: "Extracting product data... 5 items found",
    type: "success",
    icon: <CheckCircle2 size={14} />,
  },
];

const HeroSection: React.FC = () => {
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);

  // Rotate words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Animate terminal lines one by one
  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timeout);
    }

    // Reset after all lines shown
    const resetTimeout = setTimeout(() => {
      setVisibleLines(0);
    }, 3000);
    return () => clearTimeout(resetTimeout);
  }, [visibleLines]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-24 pb-16">

      {/* ── Background Layers ── */}
      <div className="absolute inset-0 bg-black" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial glow behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/[0.07] rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-600/[0.05] rounded-full blur-[80px]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left: Text Content ── */}
        <div className="text-center lg:text-left">

          {/* Tiny badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-gray-400 text-xs tracking-wide mb-8"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            AGENT ACTIVE
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            <span className="text-white">Tell it what</span>
            <br />
            <span className="text-white">to do.</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              It browses for you.
            </span>
          </motion.h1>

          {/* Rotating subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-gray-500 leading-relaxed"
          >
            <span>Your AI agent can </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="text-indigo-400 font-medium inline-block"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
            <br className="hidden sm:block" />
            <span> — no code, no setup, just results.</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mt-10"
          >
            <a
              href="/agent"
              className="group relative flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] w-full sm:w-auto justify-center"
            >
              <Fish size={18} />
              Launch Agent
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </a>

            <a
              href="https://github.com/aryanbarde80/Tiny-ML-Hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-gray-400 hover:text-white text-sm font-medium transition-colors border border-white/[0.06] hover:border-white/[0.15] w-full sm:w-auto justify-center"
            >
              View on GitHub
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 text-[13px] text-gray-600"
          >
            Open source · No API key needed · Works on any website
          </motion.p>
        </div>

        {/* ── Right: Live Terminal ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative"
        >
          {/* Glow behind terminal */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl opacity-60" />

          {/* Terminal Window */}
          <div className="relative bg-[#0a0a0a] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">

            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
              </div>
              <span className="text-[11px] text-gray-600 font-mono">
                tinyfish-agent
              </span>
              <div className="w-12" /> {/* Spacer */}
            </div>

            {/* Terminal Body */}
            <div className="p-5 min-h-[280px] sm:min-h-[320px] font-mono text-sm space-y-3">

              {/* Prompt */}
              <div className="flex items-start gap-2 text-gray-500">
                <span className="text-indigo-400 select-none shrink-0">❯</span>
                <span className="text-gray-300">tinyfish run</span>
              </div>

              {/* Animated Lines */}
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={`${line.text}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-2.5 pl-4 ${
                    line.type === "command"
                      ? "text-white"
                      : line.type === "success"
                      ? "text-green-400"
                      : line.type === "loading"
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }`}
                >
                  <span className="shrink-0 mt-0.5">{line.icon}</span>
                  <span className="text-[13px] leading-relaxed break-all">
                    {line.text}
                  </span>
                </motion.div>
              ))}

              {/* Blinking cursor */}
              {visibleLines < terminalLines.length && (
                <div className="flex items-center gap-2 pl-4">
                  <div className="w-1.5 h-4 bg-indigo-400 animate-pulse rounded-sm" />
                </div>
              )}

              {/* Result preview when all lines done */}
              <AnimatePresence>
                {visibleLines >= terminalLines.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-4 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                  >
                    <div className="text-[11px] text-gray-600 mb-2">
                      ── Results ──
                    </div>
                    {[
                      { name: "ASUS VivoBook 15", price: "₹42,990" },
                      { name: "Lenovo IdeaPad Slim 3", price: "₹38,490" },
                      { name: "HP 15s Ryzen 5", price: "₹44,990" },
                    ].map((item, i) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between py-1 text-[12px]"
                      >
                        <span className="text-gray-400">
                          {i + 1}. {item.name}
                        </span>
                        <span className="text-green-400 font-medium">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Bar */}
            <div className="px-4 py-2.5 border-t border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Connected
              </div>
              <div className="text-[11px] text-gray-700">
                chromium · headless
              </div>
            </div>
          </div>

          {/* Floating badges around terminal */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-[11px] font-medium backdrop-blur-sm"
          >
            ✓ 96.8% accuracy
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-[11px] font-medium backdrop-blur-sm"
          >
            ⚡ 3.2s avg
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default HeroSection;