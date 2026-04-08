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
import { CounterTest } from './components/CounterTest';
import SignupPage from './pages/SignupPage';

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
        {/* Redux Test Component */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CounterTest />
        </div>
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
      <Route path="/admin/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
