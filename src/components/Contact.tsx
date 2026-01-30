import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { Mail, Phone, MapPin, Send, CheckCircle2, X } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey?.trim()) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey.trim(),
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Portfolio Contact Form"
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 bg-space-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-neon-cyan tracking-[0.3em] uppercase mb-4">Get In Touch</h2>
          <h3 className="text-4xl md:text-5xl font-black text-text-primary">Let's Connect</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="glass p-8 rounded-3xl border-neon-cyan/10">
              <h4 className="text-2xl font-bold text-text-primary mb-10">Mission Control</h4>
              
              <div className="space-y-8">
                <div className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-space-card/80 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan shadow-glow-cyan group-hover:border-neon-cyan transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary font-black uppercase tracking-widest mb-1">Email</p>
                    <a href={`mailto:${resumeData.email}`} className="text-lg text-text-primary font-bold hover:text-neon-cyan transition-colors">
                      {resumeData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-space-card/80 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan shadow-glow-cyan group-hover:border-neon-cyan transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary font-black uppercase tracking-widest mb-1">Phone</p>
                    <a href={`tel:${resumeData.phone}`} className="text-lg text-text-primary font-bold hover:text-neon-cyan transition-colors">
                      +91 {resumeData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-space-card/80 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan shadow-glow-cyan group-hover:border-neon-cyan transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary font-black uppercase tracking-widest mb-1">Location</p>
                    <p className="text-lg text-text-primary font-bold">
                      {resumeData.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-white/5">
                <h5 className="font-bold text-text-primary mb-6">Digital Channels</h5>
                <div className="flex gap-4">
                   <a href={resumeData.linkedIn} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-gradient-cyan-blue text-space-darker rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-glow-cyan">
                     LinkedIn
                   </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full glass p-8 rounded-3xl border-neon-cyan/20 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-neon-cyan/10 border border-neon-cyan flex items-center justify-center text-neon-cyan shadow-glow-cyan">
                  <CheckCircle2 size={40} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-text-primary mb-2">Message Transmitted</h4>
                  <p className="text-text-secondary">Mission control has received your transmission. We will respond shortly.</p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-neon-cyan font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full glass p-8 rounded-3xl border-red-500/20 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <X size={40} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-text-primary mb-2">Transmission Failed</h4>
                  <p className="text-text-secondary">There was an issue sending your message. Please check your connection or try again later.</p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-red-500 font-bold hover:underline"
                >
                  Retry Submission
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border-neon-cyan/10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-text-secondary uppercase tracking-widest mb-3">Name</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-space-darker/50 border border-white/10 text-text-primary focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder:text-text-secondary/30" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-text-secondary uppercase tracking-widest mb-3">Email</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-space-darker/50 border border-white/10 text-text-primary focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder:text-text-secondary/30" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-text-secondary uppercase tracking-widest mb-3">Subject</label>
                  <input 
                    required
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-space-darker/50 border border-white/10 text-text-primary focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder:text-text-secondary/30" 
                    placeholder="Project Inquiry" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-text-secondary uppercase tracking-widest mb-3">Message</label>
                  <textarea 
                    required
                    rows={5} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-space-darker/50 border border-white/10 text-text-primary focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all placeholder:text-text-secondary/30 resize-none" 
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button 
                  disabled={status === 'loading'}
                  type="submit" 
                  className="w-full py-5 bg-gradient-cyan-blue text-space-darker font-black uppercase tracking-[0.2em] rounded-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center gap-3"
                >
                  {status === 'loading' ? 'Transmitting...' : 'Initiate Contact'} 
                  <Send size={20} className={status === 'loading' ? 'animate-pulse' : ''} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
