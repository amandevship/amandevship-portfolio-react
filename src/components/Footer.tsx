import React from 'react';
import { resumeData } from '../data/resume';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-space-darker py-16 border-t border-neon-cyan/10 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h3 className="text-2xl font-black text-gradient mb-6 tracking-tighter">Aman Sharma</h3>
        <p className="text-text-secondary mb-10 max-w-md mx-auto font-medium">
          Senior Software Engineer specializing in building and scaling high-performance mobile applications.
        </p>
        
        <div className="flex justify-center space-x-8 mb-12">
          {[
            { Icon: Mail, href: `mailto:${resumeData.email}`, label: 'Email' },
            { Icon: Linkedin, href: resumeData.linkedIn, label: 'LinkedIn' },
            { Icon: Github, href: 'https://github.com/amandevship', label: 'GitHub' }
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-space-card/50 border border-white/5 text-text-secondary hover:text-neon-cyan hover:border-neon-cyan hover:shadow-glow-cyan transition-all duration-300"
              aria-label={label}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
        
        <div className="pt-8 border-t border-white/5">
          <p className="text-text-secondary/40 text-[10px] font-black uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Aman Sharma. Mission Control Verified.
          </p>
        </div>
      </div>
    </footer>
  );
};
