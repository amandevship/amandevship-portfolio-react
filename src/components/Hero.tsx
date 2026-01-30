import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { ArrowRight, Download, Rocket } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden relative">
      {/* Hero Banner Image */}
      <div className="absolute top-0 left-0 w-full h-[400px] md:h-[600px] z-0 overflow-hidden">
        <motion.img 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.5 }}
          src="/images/profile_banner.png" 
          alt="Hero Banner" 
          className="w-full h-full object-cover mask-linear-b" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-darker/50 to-space-darker"></div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Logo in Hero */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-neon-cyan/20 shadow-glow-cyan mb-8 mx-auto"
          >
            <img src="/images/profile.png" alt="Profile" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-space-card/50 border border-neon-cyan/30 text-neon-cyan text-sm font-semibold mb-8 shadow-glow-cyan"
          >
            <Rocket size={14} className="text-flame" />
            {resumeData.title}
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">
            <span className="text-text-primary">Hi, I'm </span>
            <span className="text-gradient drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              {resumeData.name}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl leading-relaxed mx-auto">
            Building and scaling high-performance <span className="text-text-primary font-bold">React Native</span> applications for over {resumeData.totalExperience}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center px-10 py-4 rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-electric text-space-darker font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
          >
            Launch Portfolio <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </a>
          <a
            href="/aman_sharma_resume.pdf"
            download="Aman_Sharma_Resume.pdf"
            className="inline-flex items-center px-10 py-4 rounded-2xl border border-neon-cyan/30 text-text-primary font-bold hover:bg-neon-cyan/5 hover:border-neon-cyan transition-all glass"
          >
            Download CV <Download className="ml-2" size={20} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-24 flex flex-wrap justify-center gap-x-16 gap-y-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        >
          {['TO THE NEW', 'CarDekho', 'NMG', 'Affle'].map((comp) => (
            <span key={comp} className="text-lg font-black tracking-widest text-text-secondary hover:text-neon-cyan transition-colors cursor-default">
              {comp}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
