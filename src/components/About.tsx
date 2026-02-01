import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-space-darker relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 mb-16 lg:mb-0"
          >
            <div className="relative group">
              <div className="aspect-square rounded-full glass p-1 border-neon-cyan/20 group-hover:border-neon-cyan/50 transition-all duration-700 shadow-glow-cyan">
                <div className="w-full h-full rounded-full bg-space-darker flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/profilepic.png" 
                    alt="Aman Sharma" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                  />
                </div>
              </div>
              
              <motion.div 
                initial={{ rotate: -10, scale: 0.8 }}
                whileInView={{ rotate: 5, scale: 1 }}
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-cyan-blue rounded-full flex flex-col items-center justify-center text-space-darker p-4 shadow-glow-cyan rotate-3 border-4 border-space-darker"
              >
                <span className="text-3xl font-black">6+</span>
                <span className="text-[9px] font-black uppercase tracking-wider text-center mt-1">Years Production Engineering</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h2 className="text-sm font-bold text-neon-cyan tracking-[0.4em] uppercase mb-6">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-black text-text-primary mb-8 tracking-tight">
              High-Performance <span className="text-gradient">Mobile Engineering</span>
            </h3>
            <p className="text-lg text-text-secondary mb-10 leading-relaxed font-medium">
              {resumeData.professionalSummary}
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-square p-6 glass rounded-2xl border-white/5 flex flex-col justify-center">
                <h4 className="text-xs font-black text-neon-sky uppercase tracking-[0.2em] mb-3">Location</h4>
                <p className="text-text-primary font-bold text-sm leading-tight">{resumeData.location}</p>
              </div>
              <div className="aspect-square p-6 glass rounded-2xl border-white/5 flex flex-col justify-center">
                <h4 className="text-xs font-black text-neon-sky uppercase tracking-[0.2em] mb-3">Email</h4>
                <p className="text-text-primary font-bold text-sm leading-tight break-all">{resumeData.email}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
