
import { ArrowRight, Shield, Target } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-military-navy">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/lovable-uploads/35fa7b07-94a4-420e-ad93-037dcb16e6a2.png')",
          backgroundPosition: "center 25%",
          filter: "brightness(0.4)"
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className={`max-w-4xl transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-military-olive/20 px-4 py-1.5 text-sm font-medium text-military-sand mb-8">
            <Shield className="h-4 w-4" />
            <span>VETERANS' EXCLUSIVE BUSINESS TRAINING PROGRAM</span>
          </div>

          <h1 className="font-heading text-4xl font-bold tracking-tight text-military-sand sm:text-6xl md:text-7xl">
            FROM BATTLEFIELD TO BUSINESS: <br />
            <span className="text-military-olive">YOUR NEXT MISSION AWAITS</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-military-sand/90 sm:text-xl">
            Leverage your military skills and discipline to build a successful online business. 
            Strategic training, tactical support, and a battle-tested community.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#enlist"
              className="group btn-secondary flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              <span>MISSION BRIEFING</span>
            </a>
            
            <a
              href="#deployment"
              className="group btn-primary flex items-center gap-2"
            >
              <span>ENLIST NOW</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-military-sand/80">SCROLL DOWN</span>
          <svg
            className="mt-2 h-5 w-5 text-military-sand/80"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
