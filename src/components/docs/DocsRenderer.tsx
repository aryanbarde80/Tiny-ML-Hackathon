import React from 'react';
import { motion } from 'framer-motion';
import { 
  Fish, Zap, Shield, TrendingUp, CheckCircle, XCircle, 
  Clock, BarChart3, BookOpen, Link2, ExternalLink, 
  Globe, DollarSign, AlertCircle, Users, Code, Database,
  Github, Linkedin, Mail, Star, GitBranch 
} from 'lucide-react';
import { DocSection } from '../../data/docs';


interface DocSectionRendererProps {
  section: DocSection;
}

const iconMap: Record<string, any> = {
  'zap': Zap,
  'shield': Shield,
  'trending-up': TrendingUp,
  'fish': Fish,
  'check': CheckCircle,
  'x': XCircle,
  'clock': Clock,
  'bar-chart': BarChart3,
  'book': BookOpen,
  'link': Link2,
  'external': ExternalLink,
  'globe': Globe,
  'dollar': DollarSign,
  'alert': AlertCircle,
  'users': Users,
  'code': Code,
  'database': Database,
  'github': Github,
  'linkedin': Linkedin,
  'mail': Mail,
  'star': Star,
  'git-branch': GitBranch
};

const colorMap: Record<string, string> = {
  'yellow': 'text-yellow-400',
  'green': 'text-green-400',
  'blue': 'text-blue-400',
  'indigo': 'text-indigo-400',
  'red': 'text-red-400',
  'purple': 'text-purple-400'
};

const bgColorMap: Record<string, string> = {
  'yellow': 'bg-yellow-500/10 border-yellow-500/20',
  'green': 'bg-green-500/10 border-green-500/20',
  'blue': 'bg-blue-500/10 border-blue-500/20',
  'indigo': 'bg-indigo-500/10 border-indigo-500/20',
  'red': 'bg-red-500/10 border-red-500/20',
  'purple': 'bg-purple-500/10 border-purple-500/20'
};

const DocSectionRenderer: React.FC<DocSectionRendererProps> = ({ section }) => {
  const content = section.content as any;

  const renderAbstract = () => (
    <div className="prose prose-invert max-w-none">
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        {content.mainText}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {content.metrics?.map((metric: any, i: number) => {
          const Icon = iconMap[metric.icon] || Fish;
          return (
            <div key={i} className={`p-4 rounded-lg border ${bgColorMap[metric.color]} bg-opacity-50`}>
              <Icon className={`${colorMap[metric.color]} mb-2`} size={20} />
              <div className="text-2xl font-bold text-white">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </div>
          );
        })}
      </div>

      <p className="text-gray-300 leading-relaxed mb-4">
        {content.secondaryText}
      </p>

      <div className="mt-6 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
        <p className="text-sm text-indigo-300">
          <span className="font-semibold">Keywords:</span> {content.keywords?.join(', ')}
        </p>
      </div>
    </div>
  );

  const renderIntroduction = () => (
    <div className="space-y-8">
      {content.sections?.map((section: any, idx: number) => (
        <div key={idx}>
          <h3 className="text-xl font-semibold mb-4 text-indigo-400">
            {section.title}
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            {section.text}
          </p>
          
          {section.stats && (
            <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] mb-4">
              <div className="space-y-3">
                {section.stats.map((stat: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{stat.label}</span>
                      <span className="text-white font-medium">{stat.value}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${stat.color}-500 rounded-full`}
                        style={{ width: stat.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.opportunity && (
            <div className="p-6 rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-indigo-400" />
                The Opportunity
              </h4>
              <p className="text-3xl font-bold text-indigo-400 mb-2">{section.opportunity.market}</p>
              <p className="text-sm text-gray-400 mb-4">market by {section.opportunity.year}</p>
              <div className="flex items-center gap-2 text-green-400">
                <span className="text-sm">Growing at {section.opportunity.cagr} CAGR</span>
                <TrendingUp size={16} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderResults = () => (
    <div className="space-y-8">
      {/* Test Environment */}
      <div className="p-4 rounded-lg border border-white/[0.08] bg-white/[0.02]">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Test Environment</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {content.environment?.map((item: any, i: number) => (
            <div key={i}>
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              <p className="text-sm text-white font-mono">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Rates Table */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-indigo-400">Performance Metrics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/[0.08] rounded-lg">
            <thead className="bg-white/[0.02]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Task Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Success Rate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Avg Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Std Dev</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Max Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08]">
              {content.taskCategories?.map((category: any, i: number) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-sm text-gray-300">{category.name}</td>
                  <td className="px-4 py-3"><span className="text-green-400 font-medium">{category.successRate}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-300">{category.avgTime}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{category.stdDev}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{category.maxTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Error Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02]">
          <h4 className="text-sm font-semibold text-gray-400 mb-4">Error Breakdown</h4>
          <div className="space-y-3">
            {content.errorBreakdown?.map((error: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{error.cause}</span>
                  <span className="text-white font-medium">{error.count}</span>
                </div>
                <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                  <div className="h-full bg-red-500/50 rounded-full" style={{ width: error.percentage }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02]">
          <h4 className="text-sm font-semibold text-gray-400 mb-4">Recovery Success Rate</h4>
          <div className="space-y-4">
            {content.recoveryRates?.map((recovery: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{recovery.method}</span>
                  <span className="text-green-400 font-medium">{recovery.rate}</span>
                </div>
                <div className="w-full h-2 bg-white/[0.08] rounded-full overflow-hidden">
                  <div className="h-full bg-green-500/50 rounded-full" style={{ width: recovery.rate }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-6 rounded-xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent">
        <div className="flex items-start gap-4">
          <CheckCircle size={24} className="text-green-400 shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Overall Performance</h4>
            <p className="text-3xl font-bold text-green-400 mb-2">{content.overall?.successRate}</p>
            <p className="text-sm text-gray-400">
              Success rate across 1000+ trials with average completion time of{' '}
              <span className="text-white">{content.overall?.avgTime}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.members?.map((member: any, idx: number) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="p-6 rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-transparent"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-indigo-400">{member.role}</p>
              </div>
              <div className="flex gap-2">
                {member.github && (
                  <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors">
                    <Github size={18} className="text-gray-400" />
                  </a>
                )}
                {member.linkedin && (
                  <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors">
                    <Linkedin size={18} className="text-gray-400" />
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors">
                    <Mail size={18} className="text-gray-400" />
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                  <Code size={14} />
                  Key Contributions
                </h4>
                <ul className="space-y-2">
                  {member.contributions?.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-indigo-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {member.stats?.map((stat: any, i: number) => (
                    <div key={i}>
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Collaboration Metrics */}
      <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02]">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Users size={18} className="text-indigo-400" />
          Collaboration Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {content.collaboration?.map((metric: any, i: number) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              <p className="text-xs text-gray-500">{metric.metric}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReferences = () => (
    <div className="space-y-8">
      {/* Academic Research */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-indigo-400 flex items-center gap-2">
          <BookOpen size={18} />
          Academic Research
        </h3>
        <div className="space-y-3">
          {content.academic?.map((ref: any, i: number) => (
            <div key={i} className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <p className="text-sm text-gray-300">
                <span className="text-white font-medium">{ref.authors}</span> ({ref.year}).{' '}
                <span className="text-indigo-400">"{ref.title}"</span>. {ref.venue}.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Documentation */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-indigo-400 flex items-center gap-2">
          <Link2 size={18} />
          Technical Documentation
        </h3>
        <div className="space-y-3">
          {content.technical?.map((ref: any, i: number) => (
            <div key={i} className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
              <div className="flex items-start justify-between">
                <p className="text-sm text-gray-300">
                  <span className="text-white font-medium">{ref.title}</span>.{' '}
                  <span className="text-gray-500">{ref.url}</span> ({ref.year})
                </p>
                <ExternalLink size={14} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderByType = () => {
    switch (content.type) {
      case 'abstract':
        return renderAbstract();
      case 'introduction':
        return renderIntroduction();
      case 'results':
        return renderResults();
      case 'team':
        return renderTeam();
      case 'references':
        return renderReferences();
      default:
        return (
          <div className="text-gray-400">
            <pre>{JSON.stringify(content, null, 2)}</pre>
          </div>
        );
    }
  };

  return (
    <section
      id={section.id}
      data-section-id={section.id}
      className="scroll-mt-20 mb-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={`${section.level === 1 ? 'text-3xl' : 'text-2xl'} font-bold mb-6 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent`}>
          {section.title}
        </h2>

        {renderByType()}
      </motion.div>
    </section>
  );
};

export default DocSectionRenderer;