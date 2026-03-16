import React, { useState } from "react";
import { AppWindow, Book, Bot, Home, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggler";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/", icon: Home },
    { name: "Agent", path: "/agent", icon: Bot },
    { name: "API", path: "/api", icon: AppWindow },
    { name: "Docs", path: "/docs", icon: Book },
  ];

  return (
    <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[92%] sm:max-w-5xl z-50">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src="/tiny.svg" alt="TinyFish" className="w-6 h-6" />
          <span className="text-white font-semibold text-base sm:text-lg tracking-wide">
            TinyFish
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-8">
          <ul className="flex items-center gap-6 lg:gap-8 text-sm text-gray-200">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Theme Toggle - Desktop */}
          <div className="border-l border-white/20 pl-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Right Side */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="mt-2 md:hidden bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 overflow-hidden">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.path}
                className="flex items-center justify-center gap-2 py-2.5 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                onClick={() => setOpen(false)}
              >
                <Icon size={18} />
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Navbar;