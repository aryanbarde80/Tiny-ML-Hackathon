import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DocSidebar from './DocsSidebar';
import DocHeader from './DocsHeader';
import TableOfContents from './TableofContent';

interface DocsLayoutProps {
  children: React.ReactNode;
  sections: Array<{
    id: string;
    title: string;
    level: number;
  }>;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ children, sections }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = document.querySelectorAll('[data-section-id]');
      const scrollPosition = window.scrollY + 120; // Offset for header

      // Find the current section
      let currentSection = '';
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i] as HTMLElement;
        if (element.offsetTop <= scrollPosition) {
          currentSection = element.dataset.sectionId || '';
          break;
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Handle hash changes for direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Handle initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects - Fixed */}
      <div className="fixed inset-0 bg-black pointer-events-none" />
      
      {/* Noise texture */}
      <div 
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Gradient orbs */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[100px] pointer-events-none" />
      
      {/* Subtle grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      {/* Header - Fixed */}
      <DocHeader onMenuClick={() => setSidebarOpen(true)} />

      {/* Sidebar */}
      <DocSidebar
        sections={sections}
        activeSection={activeSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Table of Contents (Right Sidebar) */}
      <TableOfContents sections={sections} activeSection={activeSection} />

      {/* Main Content Area */}
      <div className="relative z-10 pt-16">
        <div className="lg:pl-72 lg:pr-72">
          <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Progress bar */}
              <div className="fixed top-16 left-0 right-0 h-0.5 bg-white/[0.08] z-20">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: activeSection 
                      ? `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` 
                      : '0%' 
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* Content */}
              <article className="docs-content-wrapper">
                {children}

                {/* Bottom navigation */}
                <div className="mt-16 pt-8 border-t border-white/[0.08]">
                  <div className="flex justify-between">
                    {sections.map((section, index) => {
                      const prevSection = sections[index - 1];
                      const nextSection = sections[index + 1];
                      
                      if (section.id === activeSection) {
                        return (
                          <div key="nav" className="w-full flex justify-between">
                            {prevSection && (
                              <a
                                href={`#${prevSection.id}`}
                                className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                              >
                                <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
                                <div className="max-w-[200px]">
                                  <div className="text-xs text-gray-500">Previous</div>
                                  <div className="font-medium truncate">{prevSection.title}</div>
                                </div>
                              </a>
                            )}
                            
                            {nextSection && (
                              <a
                                href={`#${nextSection.id}`}
                                className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors ml-auto text-right"
                              >
                                <div className="max-w-[200px]">
                                  <div className="text-xs text-gray-500">Next</div>
                                  <div className="font-medium truncate">{nextSection.title}</div>
                                </div>
                                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                              </a>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </article>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Mobile overlay for sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Scroll to top button */}
      <AnimatePresence>
        {activeSection && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg transition-colors z-30"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocsLayout;