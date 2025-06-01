
import React from 'react';
import { Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-card border-t border-dark-surface py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-text-primary font-display font-bold text-xl">Portfolio</p>
            <p className="text-text-secondary text-sm mt-1">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/GiuseppeRistaino" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-highlight transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/giuseppe-ristaino-0b435b157/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-highlight transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://www.instagram.com/vre.xas/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-highlight transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            
            <button 
              onClick={scrollToTop}
              className="ml-4 p-2 rounded-full bg-dark-surface hover:bg-highlight/10 text-text-secondary hover:text-highlight transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
