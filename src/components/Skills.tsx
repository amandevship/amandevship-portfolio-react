import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-space-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-neon-cyan tracking-[0.3em] uppercase mb-4">Technical Prowess</h2>
          <h3 className="text-4xl md:text-5xl font-black text-text-primary">Expertise & Tools</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumeData.skills.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl glass glass-hover border-neon-cyan/10"
            >
              <h4 className="text-xl font-bold text-text-primary mb-8 border-b border-white/5 pb-4 flex items-center justify-between">
                {group.category}
                <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-glow-cyan" />
              </h4>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 sm:px-4 py-2 bg-space-card/50 rounded-xl text-xs sm:text-sm font-bold text-text-secondary border border-neon-cyan/20 hover:border-flame hover:text-flame transition-all duration-300 cursor-default group flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neon-cyan group-hover:bg-flame transition-colors flex-shrink-0" />
                    <span className="leading-tight">{skill}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
