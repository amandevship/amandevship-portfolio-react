import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../data/resume';
import { ExternalLink, Smartphone, Apple, Store, Globe, Monitor, Server } from 'lucide-react';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const allTech = ['All', 'React Native (Mobile)', 'React (Web)', 'Node.js'];

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return resumeData.projects;
    if (filter === 'React Native (Mobile)') {
      return resumeData.projects.filter(p => p.techStack.includes('React Native'));
    }
    if (filter === 'React (Web)') {
      return resumeData.projects.filter(p => p.techStack.includes('React.js'));
    }
    if (filter === 'Node.js') {
      return resumeData.projects.filter(p => p.techStack.includes('Node.js') || p.techStack.includes('Express.js'));
    }
    return resumeData.projects.filter(p => p.techStack.includes(filter));
  }, [filter]);

  return (
    <section id="projects" className="py-24 bg-space-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-neon-cyan tracking-[0.3em] uppercase mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-5xl font-black text-text-primary mb-12">Featured Projects</h3>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allTech.map((tech) => {
              const getIcon = () => {
                switch (tech) {
                  case 'React Native (Mobile)':
                    return <Smartphone size={16} className="mr-2" />;
                  case 'React (Web)':
                    return <Monitor size={16} className="mr-2" />;
                  case 'Node.js':
                    return <Server size={16} className="mr-2" />;
                  default:
                    return null;
                }
              };

              return (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border flex items-center ${
                    filter === tech
                      ? 'bg-space-card border-flame text-flame shadow-glow-orange scale-105'
                      : 'bg-space-card/40 border-neon-cyan/20 text-text-secondary hover:border-neon-cyan/50 hover:text-neon-cyan'
                  } glass`}
                >
                  {filter === tech && <span className="inline-block w-1.5 h-1.5 rounded-full bg-flame mr-2 shadow-[0_0_5px_#FB923C]" />}
                  {getIcon()}
                  {tech}
                </button>
              );
            })}
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
                  
                  <div className="flex flex-wrap gap-4">
                    {(() => {
                      const appUrls = project.appStoreUrls ?? (project.appStoreUrl ? [project.appStoreUrl] : []);
                      if (appUrls.length === 0) {
                        return (
                          <span
                            className="inline-flex items-center text-text-secondary/50 font-black text-xs uppercase tracking-widest cursor-default"
                            aria-label="App Store link not available"
                          >
                            <Apple size={14} className="mr-2" />
                            App Store
                          </span>
                        );
                      }

                      return appUrls.map((url, i) => (
                        <a
                          key={`${url}-${i}`}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-neon-cyan font-black text-xs uppercase tracking-widest hover:text-neon-sky transition-colors group/link"
                        >
                          <Apple size={14} className="mr-2" />
                          {appUrls.length > 1 ? `App Store ${i + 1}` : 'App Store'}
                          <ExternalLink
                            size={12}
                            className="ml-1.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                          />
                        </a>
                      ));
                    })()}

                    {(() => {
                      const playUrls = project.playStoreUrls ?? (project.playStoreUrl ? [project.playStoreUrl] : []);
                      if (playUrls.length === 0) {
                        return (
                          <span
                            className="inline-flex items-center text-text-secondary/50 font-black text-xs uppercase tracking-widest cursor-default"
                            aria-label="Play Store link not available"
                          >
                            <Store size={14} className="mr-2" />
                            Play Store
                          </span>
                        );
                      }

                      return playUrls.map((url, i) => (
                        <a
                          key={`${url}-${i}`}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-neon-cyan font-black text-xs uppercase tracking-widest hover:text-neon-sky transition-colors group/link"
                        >
                          <Store size={14} className="mr-2" />
                          {playUrls.length > 1 ? `Play Store ${i + 1}` : 'Play Store'}
                          <ExternalLink
                            size={12}
                            className="ml-1.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                          />
                        </a>
                      ));
                    })()}

                    {project.webAppUrls?.length ? (
                      project.webAppUrls.map((url, i) => (
                        project.webAppDisabled ? (
                          <span
                            key={`${url}-${i}`}
                            className="inline-flex items-center text-text-secondary/50 font-black text-xs uppercase tracking-widest cursor-default"
                            aria-label="Web App link disabled"
                          >
                            <Globe size={14} className="mr-2" />
                            {project.webAppUrls!.length > 1 ? `Web App ${i + 1}` : 'Web App'}
                          </span>
                        ) : (
                          <a
                            key={`${url}-${i}`}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-neon-cyan font-black text-xs uppercase tracking-widest hover:text-neon-sky transition-colors group/link"
                          >
                            <Globe size={14} className="mr-2" />
                            {project.webAppUrls!.length > 1 ? `Web App ${i + 1}` : 'Web App'}
                            <ExternalLink size={12} className="ml-1.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        )
                      ))
                    ) : null}
                  </div>
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
