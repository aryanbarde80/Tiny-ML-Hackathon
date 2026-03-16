import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AppWindow,
  Book,
  Bot,
  Home,
  Menu,
  X,
  Fish,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface NavLink {
  name: string;
  path: string;
  icon: LucideIcon;
}

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const links: NavLink[] = [
    { name: "Home", path: "/", icon: Home },
    { name: "Agent", path: "/agent", icon: Bot },
  
    { name: "Docs", path: "/docs", icon: Book },
  ];

  return (
    <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[92%] sm:max-w-4xl z-50">
      <nav className="flex items-center justify-between gap-4 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group shrink-0">
          <img src="/tiny.svg" alt="TinyFish" className="w-6 h-6" />
          <span className="text-white font-semibold text-sm sm:text-base tracking-tight">
            TinyFish
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.name}>
                <a
                  href={link.path}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/50 text-sm transition-all"
                >
                  <Icon size={14} />
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Separator orientation="vertical" className="h-5 bg-neutral-800" />

          <Button
            asChild
            size="sm"
            className="bg-white text-black hover:bg-neutral-200 rounded-lg px-4 h-8 text-xs font-semibold"
          >
            <a href="/agent" className="flex items-center gap-1">
              Launch Agent
              <ArrowUpRight size={12} />
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-colors shrink-0"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="mt-2 md:hidden bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-2xl p-2 shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            <div className="space-y-1">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 py-2.5 px-4 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-xl transition-colors"
                  >
                    <Icon size={16} />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            <Separator className="bg-neutral-800/60 my-2" />

            <a
              href="/agent"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-neutral-200 rounded-xl py-2.5 text-sm font-semibold transition-colors"
            >
              Launch Agent
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;