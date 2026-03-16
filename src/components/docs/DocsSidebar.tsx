import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Fish, ChevronRight, BookOpen, Github, 
  ExternalLink, Search, Menu, Home 
} from 'lucide-react';

interface DocSidebarProps {
  sections: Array<{
    id: string;
    title: string;
    level: number;
  }>;
  activeSection: string;
  isOpen: boolean;
  onClose: () => void;
}

const DocSidebar: React.FC<DocSidebarProps> = ({
  sections,
  activeSection,
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Filter sections based on search
  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group sections by level for hierarchy
  const topLevelSections = sections.filter(s => s.level === 1);
  
  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Auto-expand active section
  useEffect(() => {
    if (activeSection) {
      setExpandedSections(prev => ({
        ...prev,
        [activeSection]: true
      }));
    }
  }, [activeSection]);

  // Handle link click
  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose(); // Close sidebar on mobile after click
    }
  };

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 left-0 bottom-0 w-72 bg-black/90 backdrop-blur-xl border-r border-white/[0.08] z-50 lg:translate-x-0 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
          <a href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Fish size={24} className="text-indigo-400 transition-transform group-hover:scale-110" />
              <div className="absolute -inset-1 bg-indigo-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="font-semibold text-white block leading-tight">
                TinyFish Docs
              </span>
              <span className="text-[10px] text-gray-500">v1.0.0</span>
            </div>
          </a>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-white/[0.06] rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/[0.08]">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin scrollbar-thumb-white/[0.08] scrollbar-track-transparent">
          <div className="space-y-1">
            {/* Home link */}
            <a
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors mb-4"
            >
              <Home size={16} />
              <span>Home</span>
            </a>

            {/* Documentation sections */}
            {searchQuery ? (
              // Search results
              <div className="space-y-1">
                {filteredSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleLinkClick(section.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all text-left ${
                      activeSection === section.id
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <ChevronRight
                      size={14}
                      className={`transition-opacity ${
                        activeSection === section.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <span className="flex-1">{section.title}</span>
                  </button>
                ))}
              </div>
            ) : (
              // Hierarchical view
              <div className="space-y-2">
                {topLevelSections.map((section) => (
                  <div key={section.id} className="space-y-1">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? 'text-indigo-400 bg-indigo-500/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <span>{section.title}</span>
                      <ChevronRight
                        size={14}
                        className={`transition-transform ${
                          expandedSections[section.id] ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections[section.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 space-y-1 overflow-hidden"
                        >
                          {/* Sub-sections would go here */}
                          <button
                            onClick={() => handleLinkClick(section.id)}
                            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all ${
                              activeSection === section.id
                                ? 'text-indigo-400'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                          >
                            <span className="w-1 h-1 rounded-full bg-current" />
                            <span>Overview</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-3">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Resources
            </p>
            
            <a
              href="https://github.com/aryanbarde80/Tiny-ML-Hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors group"
            >
              <Github size={16} />
              <span className="flex-1">GitHub</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a
              href="/agent"
              className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors group"
            >
              <Fish size={16} />
              <span className="flex-1">Try the Agent</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a
              href="#"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors group"
            >
              <BookOpen size={16} />
              <span className="flex-1">API Reference</span>
            </a>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-black/50">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>© 2026 TriSight Global</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              v1.0.0
            </span>
          </div>
        </div>
      </motion.aside>

      {/* Mobile toggle button (visible when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={onClose}
          className="fixed bottom-6 left-6 lg:hidden z-40 p-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
};

export default DocSidebar;