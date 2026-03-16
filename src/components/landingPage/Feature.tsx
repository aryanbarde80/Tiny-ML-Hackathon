import React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Globe,
  Database,
  Activity,
  ShieldAlert,
  Code2,
  LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Bot,
    title: "Autonomous Web Agents",
    description:
      "Execute real-world web tasks from simple natural language instructions without manual scripting.",
  },
  {
    icon: Globe,
    title: "Dynamic Website Navigation",
    description:
      "Handles JavaScript-heavy websites, authentication flows, popups, and multi-step interactions.",
  },
  {
    icon: Database,
    title: "Intelligent Data Extraction",
    description:
      "Extract structured data from thousands of pages with AI-powered parsing and validation.",
  },
  {
    icon: Activity,
    title: "Real-time Telemetry",
    description:
      "Watch every agent action live with real-time streaming logs and activity monitoring.",
  },
  {
    icon: ShieldAlert,
    title: "Error Recovery System",
    description:
      "Automatic retry logic, fallback selectors, and smart recovery for resilient automation.",
  },
  {
    icon: Code2,
    title: "Developer API",
    description:
      "Full REST API to integrate autonomous web agents directly into enterprise workflows.",
  },
];

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({
  feature,
  index,
}) => {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-100px" }}
      className="sticky"
      style={{
        top: `${130 + index * 30}px`,
        zIndex: index + 1,
      }}
    >
      <div
        className="
          group relative mx-auto max-w-2xl
          p-6 sm:p-8 rounded-2xl
          bg-neutral-900
          border border-neutral-800
          hover:border-neutral-700
          hover:bg-neutral-900/80
          shadow-[0_8px_40px_rgba(0,0,0,0.5)]
          hover:shadow-[0_12px_60px_rgba(0,0,0,0.7)]
          transition-all duration-500
        "
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
          {/* Icon */}
          <div
            className="
              shrink-0 p-3 rounded-xl
              bg-indigo-500/10 border border-indigo-500/20
              group-hover:scale-110
              transition-transform duration-300
            "
          >
            <Icon size={22} className="text-indigo-400" />
          </div>

          {/* Text */}
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-white mb-1.5 tracking-tight">
              {feature.title}
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-400 transition-colors">
              {feature.description}
            </p>
          </div>

          {/* Index number */}
          <span className="hidden sm:block shrink-0 text-[11px] font-mono text-neutral-600 mt-1">
            0{index + 1}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="relative bg-black py-24 sm:py-32 px-4 sm:px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/[0.03] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[11px] font-mono tracking-[0.2em] text-neutral-600 uppercase mb-4">
              Capabilities
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
              Built for the
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                {" "}modern web
              </span>
            </h2>

            <p className="text-neutral-500 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              Every feature is designed for autonomous, reliable, and
              intelligent web automation.
            </p>
          </motion.div>
        </div>

        {/* Sticky Overlapping Cards */}
        <div className="relative flex flex-col gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom spacer */}
        <div className="h-32 sm:h-48" />
      </div>
    </section>
  );
};

export default Features;