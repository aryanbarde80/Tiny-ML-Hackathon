import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListOrdered, ChevronRight, Hash } from 'lucide-react';

interface TableOfContentsProps {
  sections: Array<{
    id: string;
    title: string;
    level: number;
  }>;
  activeSection: string;
}

interface Heading {
  id: string;
  title: string;
  level: number;
  children?: Heading[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, activeSection }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  // Generate headings from sections and also scan the page for h3/h4 tags
  useEffect(() => {
    // Start with the main sections
    const mainHeadings: Heading[] = sections.map(section => ({
      id: section.id,
      title: section.title,
      level: section.level,
      children: []
    }));

    // Scan the page for subheadings
    const articleElement = document.querySelector('article');
    if (articleElement) {
      const subheadings = articleElement.querySelectorAll('h3, h4');
      subheadings.forEach((heading) => {
        const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-');
        if (id) {
          heading.id = id; // Set id if not present
          
          // Find parent section
          let parentSection = null;
          let parentElement = heading.parentElement;
          while (parentElement && parentElement !== articleElement) {
            if (parentElement.tagName === 'SECTION' && parentElement.id) {
              parentSection = parentElement.id;
              break;
            }
            parentElement = parentElement.parentElement;
          }

          // Add to appropriate parent
          if (parentSection) {
            const parent = mainHeadings.find(h => h.id === parentSection);
            if (parent) {
              parent.children = parent.children || [];
              parent.children.push({
                id,
                title: heading.textContent || '',
                level: heading.tagName === 'H3' ? 2 : 3
              });
            }
          }
        }
      });
    }

    setHeadings(mainHeadings);
  }, [sections]);

  // Handle scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Don't render if no sections
  if (!sections.length) return null;

  return (
    <>
      {/* Desktop TOC - visible on large screens */}
      <div className="hidden lg:block fixed right-8 top-24 w-64 z-20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <ListOrdered size={16} className="text-indigo-400" />
              <span className="text-sm font-medium text-white">On this page</span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-white/[0.06] rounded transition-colors"
            >
              <ChevronRight
                size={14}
                className={`text-gray-400 transition-transform ${
                  isExpanded ? 'rotate-90' : ''
                }`}
              />
            </button>
          </div>

          {/* TOC Links */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/[0.08] scrollbar-track-transparent"
              >
                <div className="p-3 space-y-1">
                  {headings.map((heading) => (
                    <div key={heading.id}>
                      {/* Main section */}
                      <button
                        onClick={() => scrollToSection(heading.id)}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all group ${
                          activeSection === heading.id
                            ? 'bg-indigo-500/10 text-indigo-400'
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        <Hash size={10} className={`${activeSection === heading.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'} transition-opacity`} />
                        <span className="flex-1 text-left truncate">{heading.title}</span>
                        {activeSection === heading.id && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="w-1 h-1 rounded-full bg-indigo-400"
                          />
                        )}
                      </button>

                      {/* Subheadings */}
                      {heading.children && heading.children.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1 border-l border-white/[0.08] pl-2">
                          {heading.children.map((child) => (
                            <button
                              key={child.id}
                              onClick={() => scrollToSection(child.id)}
                              className="w-full flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] transition-all group"
                            >
                              <span className="w-0.5 h-0.5 rounded-full bg-gray-500 group-hover:bg-gray-300" />
                              <span className="flex-1 text-left truncate">{child.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Empty state */}
                  {headings.length === 0 && (
                    <div className="px-3 py-8 text-center">
                      <p className="text-xs text-gray-600">No sections found</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="p-3 border-t border-white/[0.08] bg-black/30">
            <div className="flex items-center justify-between text-[10px] text-gray-600">
              <span>{headings.length} sections</span>
              <span className="px-1.5 py-0.5 rounded bg-white/[0.04]">TOC</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile TOC - appears as a floating button with drawer */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg transition-colors"
        >
          <ListOrdered size={20} />
        </button>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isExpanded && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsExpanded(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-white/[0.08] rounded-t-xl z-50 max-h-[80vh] overflow-hidden"
              >
                {/* Drawer handle */}
                <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <ListOrdered size={16} className="text-indigo-400" />
                    <span className="text-sm font-medium text-white">On this page</span>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors"
                  >
                    <ChevronRight size={16} className="text-gray-400 rotate-90" />
                  </button>
                </div>

                {/* Mobile TOC Links */}
                <div className="overflow-y-auto max-h-[60vh] p-3">
                  {headings.map((heading) => (
                    <div key={heading.id}>
                      <button
                        onClick={() => {
                          scrollToSection(heading.id);
                          setIsExpanded(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all ${
                          activeSection === heading.id
                            ? 'bg-indigo-500/10 text-indigo-400'
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        <Hash size={12} />
                        <span className="flex-1 text-left">{heading.title}</span>
                      </button>

                      {heading.children && heading.children.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1 border-l border-white/[0.08] pl-2">
                          {heading.children.map((child) => (
                            <button
                              key={child.id}
                              onClick={() => {
                                scrollToSection(child.id);
                                setIsExpanded(false);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] transition-all"
                            >
                              <span className="w-1 h-1 rounded-full bg-gray-500" />
                              <span className="flex-1 text-left">{child.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default TableOfContents;