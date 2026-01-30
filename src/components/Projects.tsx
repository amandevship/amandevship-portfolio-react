import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../data/resume';
import { ExternalLink, Smartphone } from 'lucide-react';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const allTech = ['All', 'React Native'];

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return resumeData.projects;
    return resumeData.projects.filter(p => p.techStack.includes(filter));
  }, [filter]);

  return (
    <section id="projects" className="py-24 bg-space-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-neon-cyan tracking-[0.3em] uppercase mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-5xl font-black text-text-primary mb-12">Featured Projects</h3>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allTech.map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border ${
                  filter === tech
                    ? 'bg-space-card border-flame text-flame shadow-glow-orange scale-105'
                    : 'bg-space-card/40 border-neon-cyan/20 text-text-secondary hover:border-neon-cyan/50 hover:text-neon-cyan'
                } glass`}
              >
                {filter === tech && <span className="inline-block w-1.5 h-1.5 rounded-full bg-flame mr-2 shadow-[0_0_5px_#FB923C]" />}
                {tech}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative flex flex-col h-full rounded-3xl transition-all duration-500 hover:-translate-y-2 glass glass-hover"
              >
                <div className="aspect-video bg-space-darker/50 flex items-center justify-center p-8 rounded-t-3xl border-b border-white/5 overflow-hidden group-hover:bg-neon-cyan/5 transition-colors">
                   <Smartphone size={64} className="text-neon-cyan/20 group-hover:text-neon-cyan group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_10px_rgba(34,211,238,0)] group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold text-text-primary group-hover:text-neon-cyan transition-colors">
                      {project.title}
                    </h4>
                    <span className="text-[10px] font-black text-neon-cyan border border-neon-cyan/30 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                      {project.platform}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary text-sm mb-8 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-[10px] font-bold px-3 py-1 rounded-lg bg-space-darker/80 text-neon-sky border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href="#"
                    className="inline-flex items-center text-neon-cyan font-black text-xs uppercase tracking-widest hover:text-neon-sky transition-colors group/link"
                  >
                    View Mission Details 
                    <ExternalLink size={14} className="ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity shadow-glow-cyan" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
