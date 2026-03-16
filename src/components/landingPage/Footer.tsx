import React from "react";
import { Github, Twitter, Linkedin, Fish, ArrowUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FooterLink {
  name: string;
  path: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const Footer: React.FC = () => {
  const quickLinks: FooterLink[] = [
    { name: "Home", path: "/" },
    { name: "Agent", path: "/agent" },
    { name: "API", path: "/api" },
    { name: "Docs", path: "/docs" },
  ];

  return (
    <footer className="relative bg-black border-t border-neutral-800/60">
      {/* Main Footer */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <Fish size={16} className="text-indigo-400" />
              </div>
              <span className="text-white font-semibold tracking-tight">
                TinyFish
              </span>
            </a>
            <p className="text-neutral-500 text-[13px] leading-relaxed max-w-[200px]">
              Autonomous AI agent for web automation and data extraction.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-neutral-500 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[11px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                >
                  GitHub
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                  />
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  className="text-neutral-500 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                >
                  Documentation
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                  />
                </a>
              </li>
              <li>
                <a
                  href="/api"
                  className="text-neutral-500 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                >
                  API Reference
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-[11px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-4">
              Built By
            </h3>
            <div className="space-y-2">
              <p className="text-neutral-400 text-sm">Aryan Barde</p>
              <p className="text-neutral-400 text-sm">Vishal Jha</p>
            </div>

            
          </div>
        </div>

        <Separator className="bg-neutral-800/60 my-8 sm:my-10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-[12px] font-mono">
            © {new Date().getFullYear()} TinyFish Agent
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-[12px] text-neutral-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Agent Online
            </span>

            <span className="text-neutral-800">•</span>

            <span className="text-[12px] text-neutral-700 font-mono">
              Built for Hackathon
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;