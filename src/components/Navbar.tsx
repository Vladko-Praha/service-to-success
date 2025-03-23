
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Medal, BookOpen } from 'lucide-react';
import Login from './Login';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-military-navy/95 shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-military-olive" />
          <span className="font-heading text-xl font-bold text-military-sand">
            MISSION: <span className="text-military-olive">ENTREPRENEUR</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {location.pathname === '/' ? (
            <>
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
              
              {/* Knowledge Base Icon */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full p-2 hover:bg-military-navy/50 text-military-sand">
                    <BookOpen className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Knowledge Base</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/training">Training Materials</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Business Resources</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>FAQ & Guides</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Login />
            </>
          ) : null}
          
          <Link 
            to="/register" 
            className="flex items-center gap-1 rounded-md bg-military-olive px-4 py-2 text-sm font-medium text-military-sand shadow-sm transition-all hover:bg-military-olive/90"
          >
            <Medal className="h-4 w-4" />
            <span>ENLIST NOW</span>
          </Link>
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
            {location.pathname === '/' ? (
              <>
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
                <div className="py-3">
                  <Login />
                </div>
              </>
            ) : (
              <Link 
                to="/"
                className="border-b border-military-olive/20 py-3 text-base font-medium text-military-sand"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
            )}
            
            <Link 
              to="/register" 
              className="mt-4 flex justify-center rounded-md bg-military-olive px-4 py-3 text-center text-base font-medium text-military-sand shadow-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              ENLIST NOW
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
