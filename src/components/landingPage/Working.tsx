import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquareText,
  BrainCircuit,
  PackageCheck,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Step {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
  detail: string;
}

const steps: Step[] = [
  {
    icon: MessageSquareText,
    step: "01",
    title: "Describe Your Task",
    description:
      "Tell the agent what you need in plain English. No code, no config.",
    detail: '"Find top 5 laptops under ₹50k on Amazon"',
  },
  {
    icon: BrainCircuit,
    step: "02",
    title: "Agent Executes",
    description:
      "TinyFish launches a browser, navigates pages, and performs actions autonomously.",
    detail: "Navigating → Clicking → Extracting...",
  },
  {
    icon: PackageCheck,
    step: "03",
    title: "Get Results",
    description:
      "Receive clean, structured data ready to use in your workflow.",
    detail: "✓ 5 products extracted in 3.2s",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 py-24 sm:py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <Badge
            variant="outline"
            className="mb-5 bg-white/[0.02] border-white/[0.06] text-neutral-500 text-[10px] tracking-[0.25em] uppercase px-3 py-1 font-mono"
          >
            How it works
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
            Three steps.{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Zero friction.
            </span>
          </h2>

          <p className="text-neutral-500 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            From prompt to results in seconds — no setup required.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {steps.map((s, index) => {
            const Icon = s.icon;

            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
              >
                {/* Connector arrow — desktop only */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20">
                    <ArrowRight size={16} className="text-neutral-700" />
                  </div>
                )}

                <Card className="group h-full bg-neutral-900 border-neutral-800 hover:border-neutral-700 rounded-2xl transition-all duration-300">
                  <CardContent className="p-6 sm:p-7 flex flex-col h-full">
                    {/* Step number + Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={20} className="text-indigo-400" />
                      </div>

                      <span className="text-[11px] font-mono text-neutral-700">
                        STEP {s.step}
                      </span>
                    </div>

                    <Separator className="bg-neutral-800/60 mb-4" />

                    {/* Title */}
                    <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-500 text-[13px] leading-relaxed mb-5 flex-grow group-hover:text-neutral-400 transition-colors">
                      {s.description}
                    </p>

                    {/* Detail chip */}
                    <div className="px-3 py-2 rounded-lg bg-neutral-800/50 border border-neutral-800">
                      <p className="text-[12px] font-mono text-neutral-400 truncate">
                        {s.detail}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom timeline — mobile */}
        <div className="flex items-center justify-center gap-2 mt-8 md:hidden">
          {steps.map((s, index) => (
            <React.Fragment key={s.step}>
              <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <span className="text-[10px] font-mono text-indigo-400">
                  {s.step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-8 h-px bg-neutral-800" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;