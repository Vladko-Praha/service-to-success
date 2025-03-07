
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-military-navy pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1 - About */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-military-olive" />
              <span className="font-heading text-xl font-bold text-military-sand">
                MISSION: <span className="text-military-olive">ENTREPRENEUR</span>
              </span>
            </div>
            <p className="mt-4 text-military-sand/70">
              A specialized program helping veterans transition from military service to successful online business ownership.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="#" 
                className="rounded-full bg-military-sand/10 p-2 text-military-sand/70 transition-colors hover:bg-military-sand/20 hover:text-military-sand"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="rounded-full bg-military-sand/10 p-2 text-military-sand/70 transition-colors hover:bg-military-sand/20 hover:text-military-sand"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="rounded-full bg-military-sand/10 p-2 text-military-sand/70 transition-colors hover:bg-military-sand/20 hover:text-military-sand"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="rounded-full bg-military-sand/10 p-2 text-military-sand/70 transition-colors hover:bg-military-sand/20 hover:text-military-sand"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-lg font-bold text-military-sand">
              QUICK LINKS
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#mission" className="text-military-sand/70 transition-colors hover:text-military-olive">
                  Mission Briefing
                </a>
              </li>
              <li>
                <a href="#training" className="text-military-sand/70 transition-colors hover:text-military-olive">
                  Training Phases
                </a>
              </li>
              <li>
                <a href="#success-stories" className="text-military-sand/70 transition-colors hover:text-military-olive">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#deployment" className="text-military-sand/70 transition-colors hover:text-military-olive">
                  Deployment Options
                </a>
              </li>
              <li>
                <a href="#faq" className="text-military-sand/70 transition-colors hover:text-military-olive">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-military-sand/70 transition-colors hover:text-military-olive">
                  VA Benefits Information
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-lg font-bold text-military-sand">
              CONTACT HQ
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <Mail className="mr-2 mt-1 h-5 w-5 text-military-olive" />
                <span className="text-military-sand/70">
                  info@missionentrepreneur.com
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 mt-1 h-5 w-5 text-military-olive" />
                <span className="text-military-sand/70">
                  (800) 555-MISSION
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 h-5 w-5 text-military-olive" />
                <span className="text-military-sand/70">
                  1234 Veterans Way<br />
                  San Diego, CA 92101
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-lg font-bold text-military-sand">
              FIELD REPORTS
            </h3>
            <p className="mt-2 text-military-sand/70">
              Subscribe to receive updates, veteran success stories, and business tips.
            </p>
            <form className="mt-4">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-md border border-military-sand/20 bg-military-navy/50 px-4 py-2 text-military-sand placeholder-military-sand/50 focus:border-military-olive focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-md bg-military-olive px-4 py-2 font-medium text-military-sand transition-colors hover:bg-military-olive/90"
                >
                  SUBSCRIBE
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-military-sand/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-military-sand/50">
              &copy; 2024 Mission: Entrepreneur. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-military-sand/50 hover:text-military-sand">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-military-sand/50 hover:text-military-sand">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-military-sand/50 hover:text-military-sand">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
