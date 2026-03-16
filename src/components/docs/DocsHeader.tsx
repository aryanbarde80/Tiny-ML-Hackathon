import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, Search, Github, Star, GitBranch, Fish, 
  X, Bell, ChevronDown, BookOpen, Command 
} from 'lucide-react';

interface DocsHeaderProps {
  onMenuClick: () => void;
}

const DocsHeader: React.FC<DocsHeaderProps> = ({ onMenuClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [versionOpen, setVersionOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      // Esc to close search
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Mock search results
  const searchResults = [
    { title: 'Introduction & Problem Statement', href: '#introduction', category: 'Getting Started' },
    { title: 'System Architecture', href: '#architecture', category: 'Core Concepts' },
    { title: 'API Reference', href: '#appendices', category: 'Reference' },
    { title: 'Performance Metrics', href: '#results', category: 'Guides' },
    { title: 'Security Considerations', href: '#security', category: 'Guides' },
    { title: 'Authentication Flows', href: '#implementation', category: 'Examples' },
    { title: 'Error Recovery', href: '#features', category: 'Features' },
    { title: 'Pricing Model', href: '#business-model', category: 'Business' },
  ].filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group search results by category
  const groupedResults = searchResults.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, typeof searchResults>);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section */}
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-white/[0.06] rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} className="text-gray-400" />
              </button>

              {/* Logo */}
              <a href="/" className="flex items-center gap-2.5 group">
                <div className="relative">
                  <Fish 
                    size={28} 
                    className="text-indigo-400 transition-transform group-hover:scale-110" 
                  />
                  <div className="absolute -inset-1 bg-indigo-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white leading-tight text-lg">
                      TinyFish Agent
                    </span>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded">
                      BETA
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 leading-tight">
                    Documentation v1.0.0
                  </span>
                </div>
              </a>

             
            </div>

            {/* Center - Search (desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
              >
                <Search size={16} className="text-gray-500 group-hover:text-gray-400" />
                <span className="flex-1 text-left text-sm text-gray-500">
                  Search documentation...
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <kbd className="px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.02] text-gray-500 font-mono">
                    ⌘
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.02] text-gray-500 font-mono">
                    K
                  </kbd>
                </div>
              </button>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
              
            

              {/* GitHub stats */}
              <a
                href="https://github.com/aryanbarde80/Tiny-ML-Hackathon"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors group"
              >
                <div className="flex items-center gap-1.5">
                  <Github size={16} className="text-gray-400 group-hover:text-gray-300" />
                  <span className="text-sm text-gray-300">GitHub</span>
                </div>
               
              </a>

              {/* Mobile search button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2 hover:bg-white/[0.06] rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search size={20} className="text-gray-400" />
              </button>

              {/* Try Agent button */}
              <a
                href="/agent"
                className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 transition-colors shadow-lg shadow-indigo-500/20"
              >
                <Fish size={16} className="text-white" />
                <span className="text-sm font-medium text-white">Try Agent</span>
              </a>

              
            </div>
          </div>
        </div>

        {/* Secondary navigation (tabs) - appears on scroll */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border-t border-white/[0.08] bg-black/40 backdrop-blur-xl"
            >
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
                  {[
                    { label: 'Introduction', href: '#introduction', icon: '📘' },
                    { label: 'API Reference', href: '#appendices', icon: '🔌' },
                    { label: 'Examples', href: '#case-studies', icon: '💡' },
                    { label: 'Performance', href: '#results', icon: '📊' },
                    { label: 'Security', href: '#security', icon: '🔒' },
                    { label: 'Pricing', href: '#business-model', icon: '💰' },
                  ].map((tab) => (
                    <a
                      key={tab.label}
                      href={tab.href}
                      className="flex items-center gap-1.5 py-3 text-sm text-gray-400 hover:text-white border-b-2 border-transparent hover:border-indigo-400 transition-colors whitespace-nowrap"
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </a>
                  ))}
                  
                  {/* Live indicator */}
                  <div className="flex items-center gap-1.5 ml-auto text-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-gray-500">API Status: Healthy</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            >
              <div className="bg-gray-900 border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden">
                {/* Search input */}
                <div className="flex items-center gap-3 p-4 border-b border-white/[0.08]">
                  <Search size={20} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search documentation... (e.g., authentication, pricing, api)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-0 outline-none text-white placeholder-gray-500 text-sm"
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="p-1 hover:bg-white/[0.06] rounded transition-colors"
                  >
                    <X size={18} className="text-gray-400" />
                  </button>
                </div>

                {/* Search results */}
                <div className="max-h-96 overflow-y-auto p-2">
                  {Object.keys(groupedResults).length > 0 ? (
                    Object.entries(groupedResults).map(([category, items]) => (
                      <div key={category} className="mb-4">
                        <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {category}
                        </div>
                        {items.map((result, i) => (
                          <a
                            key={i}
                            href={result.href}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors group"
                          >
                            <Hash size={12} className="text-gray-600 group-hover:text-indigo-400" />
                            <div className="flex-1">
                              <p className="text-sm text-gray-300 group-hover:text-white">{result.title}</p>
                              <p className="text-xs text-gray-600">{result.href}</p>
                            </div>
                            <kbd className="text-xs text-gray-600 group-hover:text-gray-400">↵</kbd>
                          </a>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-8 text-center">
                      <Search size={24} className="mx-auto mb-2 text-gray-700" />
                      <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
                      <p className="text-xs text-gray-700 mt-1">Try different keywords</p>
                    </div>
                  )}
                </div>

                {/* Search tips */}
                <div className="p-3 bg-white/[0.02] border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>✨ Pro tip: Use quotes for exact matches</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">Press ↑ ↓ to navigate</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <kbd className="px-1.5 py-0.5 rounded border border-white/[0.08] bg-black text-gray-400">ESC</kbd>
                    <span className="text-gray-600">to close</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DocsHeader;