import React from 'react';
import DocsLayout from '@/components/docs/DocsLayout';

import { docsData } from '@/data/docs'; 
import DocSectionRenderer from '@/components/docs/DocsRenderer';

const Docs: React.FC = () => {
  // Extract just the section info for the sidebar
  const sections = docsData.map(({ id, title, level }) => ({
    id,
    title,
    level
  }));

  return (
    <DocsLayout sections={sections}>
      <div className="docs-content space-y-16 pb-32">
        {docsData.map((section, index) => (
          <div 
            key={section.id} 
            className="section-wrapper scroll-mt-24"
            id={section.id}
            data-section-id={section.id}
          >
            <DocSectionRenderer section={section} />
            
            {/* Add separator between sections except for last */}
            {index < docsData.length - 1 && (
              <div className="mt-16 border-t border-white/[0.08]" />
            )}
          </div>
        ))}
      </div>
    </DocsLayout>
  );
};

export default Docs;