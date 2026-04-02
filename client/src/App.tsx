import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/portfolio/Navbar';
import { Hero } from './components/portfolio/Hero';
import { About } from './components/portfolio/About';
import { Experience } from './components/portfolio/Experience';
import { Skills } from './components/portfolio/Skills';
import { Projects } from './components/portfolio/Projects';
import { Education } from './components/portfolio/Education';
import { Contact } from './components/portfolio/Contact';
import { Footer } from './components/portfolio/Footer';
import { AdminApp } from './components/admin/AdminApp';

function PortfolioApp() {
  return (
    <div className="min-h-screen bg-space-darker text-text-primary selection:bg-neon-cyan selection:text-space-darker transition-colors duration-300">
      <div className="bg-stars" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioApp />} />
      <Route path="/admin" element={<AdminApp />} />
    </Routes>
  );
}

export default App;
