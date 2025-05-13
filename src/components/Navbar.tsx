
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark-bg/90 backdrop-blur-md py-4 shadow-md' : 'py-6'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-display font-bold highlight-gradient">Portfolio</a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection('about')} className="nav-link">Chi Sono</button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">Progetti</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contatti</button>
          <Button
            onClick={() => scrollToSection('contact')}
            className="ml-4 bg-highlight hover:bg-highlight-dark"
          >
            Contattami
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-text-primary p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-surface absolute top-full left-0 right-0 py-4 px-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => scrollToSection('about')} 
              className="nav-link py-3 text-left"
            >
              Chi Sono
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="nav-link py-3 text-left"
            >
              Progetti
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="nav-link py-3 text-left"
            >
              Contatti
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="mt-2 w-full bg-highlight hover:bg-highlight-dark"
            >
              Contattami
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
