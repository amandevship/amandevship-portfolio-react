import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = (href: string) => {
    setIsOpen(false);
    // Defer scroll so menu close + re-render don't cancel it on mobile tap
    const scrollToSection = () => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = href;
      }
    };
    requestAnimationFrame(() => setTimeout(scrollToSection, 50));
  };

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-space-darker/80 backdrop-blur-lg border-b border-border-cyan py-3 shadow-glow-cyan'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <a href="#home" className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-neon-cyan/30 group-hover:border-neon-cyan transition-all shadow-glow-cyan">
                <img src="/images/profile.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-3xl font-black text-gradient tracking-tighter">Aman Sharma</span>
            </a>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-text-secondary hover:text-neon-cyan transition-colors font-medium group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan shadow-glow-cyan transition-all group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-space-card/50 border border-border-cyan text-neon-cyan hover:bg-space-card transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-space-card/50 border border-border-cyan text-neon-cyan"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-space-darker border-t border-white/5"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleMobileNavClick(link.href)}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-text-secondary hover:text-neon-cyan hover:bg-white/5 rounded-xl transition-all touch-manipulation cursor-pointer"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
