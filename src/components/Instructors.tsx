
import { Medal, Briefcase } from 'lucide-react';

const Instructors = () => {
  return (
    <section className="py-24 bg-military-navy">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-military-sand">
          YOUR COMMANDING OFFICERS
        </h2>
        <p className="section-subtitle text-military-sand/80">
          Led by veterans who've successfully transitioned to business leaders
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Instructor 1 */}
          <div className="combat-card-dark overflow-hidden">
            <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&fit=crop"
                alt="Colonel James Wilson"
                className="h-56 w-56 rounded-md object-cover border-2 border-military-olive mb-6 md:mb-0"
              />
              
              <div>
                <div className="mb-2 flex items-center space-x-2">
                  <Medal className="h-5 w-5 text-military-olive" />
                  <span className="text-sm font-medium text-military-olive">
                    Army Veteran • Special Forces
                  </span>
                </div>
                
                <h3 className="font-heading text-2xl font-bold text-military-sand">
                  Colonel James Wilson
                </h3>
                
                <p className="mb-4 text-sm font-medium text-military-sand/80">
                  Program Director & Lead Instructor
                </p>
                
                <div className="mb-4 space-y-2 text-military-sand/80">
                  <p>
                    20+ years of military leadership experience with 4 combat deployments and extensive strategic operations background.
                  </p>
                  <p>
                    After transitioning to civilian life, James built a 7-figure e-commerce business and has helped over 200 veterans start successful online ventures.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-military-olive" />
                  <span className="text-sm text-military-sand/80">
                    Founder of VetBiz Enterprises • MBA, Harvard Business School
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Instructor 2 */}
          <div className="combat-card-dark overflow-hidden">
            <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&fit=crop"
                alt="Major Rebecca Chen"
                className="h-56 w-56 rounded-md object-cover border-2 border-military-olive mb-6 md:mb-0"
              />
              
              <div>
                <div className="mb-2 flex items-center space-x-2">
                  <Medal className="h-5 w-5 text-military-olive" />
                  <span className="text-sm font-medium text-military-olive">
                    Air Force Veteran • Intelligence Officer
                  </span>
                </div>
                
                <h3 className="font-heading text-2xl font-bold text-military-sand">
                  Major Rebecca Chen
                </h3>
                
                <p className="mb-4 text-sm font-medium text-military-sand/80">
                  Marketing & Strategy Specialist
                </p>
                
                <div className="mb-4 space-y-2 text-military-sand/80">
                  <p>
                    12 years of military intelligence experience with extensive background in data analysis and strategic planning.
                  </p>
                  <p>
                    Rebecca leveraged her analytical skills to build a successful digital marketing agency serving over 50 clients. She specializes in market research and customer acquisition.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-military-olive" />
                  <span className="text-sm text-military-sand/80">
                    CEO of DigitalOps Solutions • MS, Digital Marketing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructors;
