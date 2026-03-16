import React from "react";
import { Github, Linkedin, Fish, ArrowUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FooterLink {
  name: string;
  path: string;
}

const Footer: React.FC = () => {
  const quickLinks: FooterLink[] = [
    { name: "Home", path: "/" },
    { name: "Agent", path: "/agent" },
    { name: "Docs", path: "/docs" },
  ];

  const team = [
    {
      name: "Aryan Barde",
      github: "https://github.com/aryanbarde80",
      linkedin: "https://www.linkedin.com/in/aryanbarde80/",
    },
    {
      name: "Vishal Jha",
      github: "https://github.com/vishaljha04",
      linkedin: "https://www.linkedin.com/in/vishal-jha-897a7b256/",
    },
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
                  href="https://github.com/aryanbarde80/Tiny-ML-Hackathon"
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
            </ul>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-[11px] font-mono text-neutral-600 uppercase tracking-[0.2em] mb-4">
              Built By
            </h3>
            <div className="space-y-4">
              {team.map((member) => (
                <div key={member.name} className="group">
                  <p className="text-neutral-300 text-sm font-medium mb-1.5">
                    {member.name}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-200 group/icon"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github
                        size={13}
                        className="text-neutral-500 group-hover/icon:text-white transition-colors"
                      />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md bg-neutral-900 border border-neutral-800 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200 group/icon"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin
                        size={13}
                        className="text-neutral-500 group-hover/icon:text-indigo-400 transition-colors"
                      />
                    </a>
                  </div>
                </div>
              ))}
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