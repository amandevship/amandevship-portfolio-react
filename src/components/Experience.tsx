import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { Briefcase } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-space-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-neon-cyan tracking-[0.3em] uppercase mb-4">Professional Journey</h2>
          <h3 className="text-4xl md:text-5xl font-black text-text-primary">Work Experience</h3>
        </div>

        <div className="relative border-l border-neon-cyan/20 ml-4 md:ml-12 space-y-16 pb-8">
          {resumeData.workExperience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-10 md:pl-16 group"
            >
              {/* Timeline Indicator */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-space-darker border-2 border-neon-cyan shadow-glow-cyan group-hover:bg-neon-cyan transition-colors" />
              
              <div className="glass glass-hover p-8 rounded-3xl transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                  <div>
                    <h4 className="text-2xl font-bold text-text-primary flex items-center gap-3 mb-2">
                      <Briefcase size={24} className="text-neon-cyan" />
                      {exp.role}
                    </h4>
                    <p className="text-xl font-black text-neon-sky">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <span className="px-4 py-1.5 bg-space-darker/50 border border-neon-cyan/20 rounded-xl text-sm font-bold text-neon-cyan shadow-glow-cyan mb-2">
                      {exp.period}
                    </span>
                    <p className="text-sm text-text-secondary font-medium">{exp.location}</p>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-text-secondary group/item">
                      <div className="mt-1.5 sm:mt-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-flame group-hover/item:scale-150 transition-transform shadow-glow-orange flex-shrink-0" />
                      <span className="group-hover/item:text-text-primary transition-colors leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
