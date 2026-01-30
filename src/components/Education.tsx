import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { GraduationCap as GradIcon, Award as AwardIcon } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section className="py-24 bg-space-darker relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Education */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 bg-space-card/80 border border-neon-cyan/30 text-neon-cyan rounded-2xl shadow-glow-cyan">
                <GradIcon size={28} />
              </div>
              <h3 className="text-3xl font-black text-text-primary tracking-tight">Education</h3>
            </div>
            <div className="space-y-10">
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-10 border-l border-neon-cyan/20 group"
                >
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-space-darker border border-neon-cyan group-hover:bg-neon-cyan transition-colors" />
                  <h4 className="text-xl font-bold text-text-primary mb-1">{edu.degree}</h4>
                  <p className="text-neon-sky font-black text-sm uppercase tracking-wider mb-3">{edu.institution}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-text-secondary font-bold px-3 py-1 bg-space-card/50 rounded-lg border border-white/5">Class of {edu.year}</span>
                    <span className="text-xs px-3 py-1 bg-neon-cyan/10 rounded-lg text-neon-cyan border border-neon-cyan/20 font-black">GPA: {edu.gpa}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 bg-space-card/80 border border-flame/30 text-flame rounded-2xl shadow-glow-orange">
                <AwardIcon size={28} />
              </div>
              <h3 className="text-3xl font-black text-text-primary tracking-tight">Certifications</h3>
            </div>
            <div className="space-y-6">
              {resumeData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl glass glass-hover border-white/5 flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 flex-shrink-0 bg-space-darker rounded-xl border border-neon-cyan/20 flex items-center justify-center shadow-glow-cyan group-hover:border-neon-cyan transition-all">
                    <AwardIcon size={24} className="text-neon-cyan" />
                  </div>
                  <p className="text-lg font-bold text-text-primary leading-tight group-hover:text-neon-cyan transition-colors">
                    {cert.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
