
import { useState, useEffect } from 'react';
import { Menu, X, Shield, Medal } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-military-navy/95 shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-military-olive" />
          <span className="font-heading text-xl font-bold text-military-sand">
            MISSION: <span className="text-military-olive">ENTREPRENEUR</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a 
            href="#mission" 
            className="text-sm font-medium text-military-sand hover:text-military-tan transition-colors"
          >
            MISSION BRIEFING
          </a>
          <a 
            href="#training" 
            className="text-sm font-medium text-military-sand hover:text-military-tan transition-colors"
          >
            TRAINING PHASES
          </a>
          <a 
            href="#success-stories" 
            className="text-sm font-medium text-military-sand hover:text-military-tan transition-colors"
          >
            VETERAN SUCCESS
          </a>
          <a 
            href="#deployment" 
            className="text-sm font-medium text-military-sand hover:text-military-tan transition-colors"
          >
            DEPLOYMENT OPTIONS
          </a>
          <a 
            href="#faq" 
            className="text-sm font-medium text-military-sand hover:text-military-tan transition-colors"
          >
            INTEL CENTER
          </a>
          <a 
            href="#enlist" 
            className="flex items-center gap-1 rounded-md bg-military-olive px-4 py-2 text-sm font-medium text-military-sand shadow-sm transition-all hover:bg-military-olive/90"
          >
            <Medal className="h-4 w-4" />
            <span>ENLIST NOW</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-military-sand" />
          ) : (
            <Menu className="h-6 w-6 text-military-sand" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col bg-military-navy/95 p-4 md:hidden animate-fade-in">
          <div className="flex flex-col space-y-4 p-4">
            <a 
              href="#mission" 
              className="border-b border-military-olive/20 py-3 text-base font-medium text-military-sand"
              onClick={() => setIsMenuOpen(false)}
            >
              MISSION BRIEFING
            </a>
            <a 
              href="#training" 
              className="border-b border-military-olive/20 py-3 text-base font-medium text-military-sand"
              onClick={() => setIsMenuOpen(false)}
            >
              TRAINING PHASES
            </a>
            <a 
              href="#success-stories" 
              className="border-b border-military-olive/20 py-3 text-base font-medium text-military-sand"
              onClick={() => setIsMenuOpen(false)}
            >
              VETERAN SUCCESS
            </a>
            <a 
              href="#deployment" 
              className="border-b border-military-olive/20 py-3 text-base font-medium text-military-sand"
              onClick={() => setIsMenuOpen(false)}
            >
              DEPLOYMENT OPTIONS
            </a>
            <a 
              href="#faq" 
              className="border-b border-military-olive/20 py-3 text-base font-medium text-military-sand"
              onClick={() => setIsMenuOpen(false)}
            >
              INTEL CENTER
            </a>
            <a 
              href="#enlist" 
              className="mt-4 flex justify-center rounded-md bg-military-olive px-4 py-3 text-center text-base font-medium text-military-sand shadow-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              ENLIST NOW
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
