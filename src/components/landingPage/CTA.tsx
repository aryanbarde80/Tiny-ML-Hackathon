import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Fish } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CTA: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 py-24 sm:py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/[0.04] rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        {/* Card */}
        <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-8 sm:p-12 text-center overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

          {/* Badge */}
          <Badge
            variant="outline"
            className="mb-6 bg-indigo-500/10 border-indigo-500/20 text-indigo-400 text-[10px] tracking-[0.25em] uppercase px-3 py-1 font-mono"
          >
            Get Started
          </Badge>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to automate{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              the web?
            </span>
          </h2>

          {/* Description */}
          <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
            Let AI agents handle repetitive tasks so you can focus on building
            what matters.
          </p>

          <Separator className="bg-neutral-800/60 mb-8" />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              className="group bg-white text-black hover:bg-neutral-200 rounded-xl px-6 py-5 text-sm font-semibold w-full sm:w-auto"
            >
              <a href="/agent">
                <Fish size={16} className="mr-2" />
                Launch TinyFish
                <ArrowRight
                  size={14}
                  className="ml-2 group-hover:translate-x-0.5 transition-transform"
                />
              </a>
            </Button>

            <Button
              variant="outline"
              asChild
              className="rounded-xl px-6 py-5 text-sm border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 w-full sm:w-auto"
            >
              <a href="https://github.com/aryanbarde80/Tiny-ML-Hackathon" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>

          {/* Bottom info */}
          <p className="mt-6 text-[12px] text-neutral-600 font-mono">
            Open source · No API key needed · Free to use
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;