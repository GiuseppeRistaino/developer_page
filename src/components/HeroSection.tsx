
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Gradient background elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-highlight/30 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-700/20 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-highlight font-medium mb-4">Sviluppatore & Designer</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
              Ciao, sono <span className="highlight-gradient">Giuseppe</span>, <br />
              in arte <span className="highlight-gradient">Vrexas</span><br />
              un umile sognatore
            </h1>
            <p className="text-text-secondary text-lg md:text-xl mb-8 max-w-xl">
              Sviluppatore e designer specializzato nella creazione di applicazioni 
              mobile e giochi.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={scrollToProjects} className="btn-primary flex items-center gap-2">
                Scopri i miei progetti <ArrowRight size={18} />
              </button>
              <a href="#contact" className="btn-outline">
                Contattami
              </a>
            </div>
          </div>

          <div className="flex-1 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 border-2 border-highlight/30 rounded-xl translate-x-4 translate-y-4"></div>
              <div className="bg-dark-surface p-1 rounded-xl overflow-hidden shadow-lg shadow-highlight/20">
                <div className="bg-dark-card rounded-lg p-2">
                  <div className="flex items-center gap-2 mb-4 px-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="text-xs text-text-secondary ml-2">portfolio.tsx</div>
                  </div>
                  <code className="text-sm font-mono text-text-primary block p-4">
                    <span className="text-blue-400">const</span> <span className="text-green-400">developer</span> = {'{'}
                    <br />
                    &nbsp;&nbsp;<span className="text-yellow-400">name</span>: <span className="text-orange-400">'Vrexas'</span>,
                    <br />
                    &nbsp;&nbsp;<span className="text-yellow-400">skills</span>: [<span className="text-orange-400">'Flutter'</span>, <span className="text-orange-400">'Unity'</span>, <span className="text-orange-400">'Java'</span>, <span className="text-orange-400">'UI/UX'</span>],
                    <br />
                    &nbsp;&nbsp;<span className="text-yellow-400">passion</span>: <span className="text-orange-400">'Building intuitive experiences'</span>
                    <br />
                    {'};'}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
