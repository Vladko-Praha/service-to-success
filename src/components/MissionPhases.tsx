
import { Target, Lightbulb, Users } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const MissionPhases = () => {
  return (
    <section id="mission" className="py-24 bg-military-sand">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          THE CIVILIAN MISSION: A NEW KIND OF BATTLEFIELD
        </h2>
        <p className="section-subtitle">
          We've structured our program using military principles to help you navigate the business world
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Mission Card 1 */}
          <div className="mission-card group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-military-olive/10 text-military-olive">
              <Target className="h-7 w-7" />
            </div>
            <h3 className="mb-3 font-heading text-xl font-bold text-military-navy">
              STRATEGIC PLANNING
            </h3>
            <p className="text-military-navy/80">
              Apply military precision to identify market opportunities and
              develop a robust business strategy with clear objectives and key
              performance indicators.
            </p>
          </div>

          {/* Mission Card 2 */}
          <div className="mission-card group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-military-olive/10 text-military-olive">
              <Lightbulb className="h-7 w-7" />
            </div>
            <h3 className="mb-3 font-heading text-xl font-bold text-military-navy">
              TACTICAL EXECUTION
            </h3>
            <p className="text-military-navy/80">
              Learn to execute with discipline and adaptability, using proven
              frameworks to build your online business efficiently and
              overcome obstacles.
            </p>
          </div>

          {/* Mission Card 3 */}
          <div className="mission-card group">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-military-olive/10 text-military-olive">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="mb-3 font-heading text-xl font-bold text-military-navy">
              UNIT COHESION
            </h3>
            <p className="text-military-navy/80">
              Join a supportive community of fellow veterans who understand
              your journey. Network, collaborate, and grow together with
              peer mentorship and accountability.
            </p>
          </div>
        </div>

        <div className="mt-24 rounded-lg bg-military-navy p-10">
          <h3 className="mb-10 text-center font-heading text-3xl font-bold text-military-sand">
            TWO-PHASE DEPLOYMENT STRATEGY
          </h3>

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Left side - Timeline */}
            <div className="relative">
              <div className="relative mx-auto h-[400px] w-1 bg-military-olive">
                {/* Phase 1 */}
                <div className="absolute -left-2.5 top-0 h-6 w-6 rounded-full border-4 border-military-sand bg-military-olive"></div>
                <div className="absolute -left-36 top-0 text-right font-heading text-xl font-bold text-military-sand">
                  PHASE 1
                </div>

                {/* Phase 2 */}
                <div className="absolute -left-2.5 bottom-0 h-6 w-6 rounded-full border-4 border-military-sand bg-military-olive"></div>
                <div className="absolute -left-36 bottom-0 text-right font-heading text-xl font-bold text-military-sand">
                  PHASE 2
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-10">
              {/* Phase 1 */}
              <div className="phase-card">
                <div className="mission-tag">WEEKS 1-6</div>
                <h4 className="mt-3 font-heading text-2xl font-bold text-military-sand">
                  DIGITAL DEPLOYMENT BOOTCAMP
                </h4>
                <p className="mt-2 text-military-sand/80">
                  Master the fundamentals of online business with intensive
                  training in digital marketing, e-commerce operations, and
                  business model development. Build your initial operating base.
                </p>
              </div>

              {/* Phase 2 */}
              <div className="phase-card">
                <div className="mission-tag">WEEKS 7-12</div>
                <h4 className="mt-3 font-heading text-2xl font-bold text-military-sand">
                  STRATEGIC BUSINESS OPERATIONS
                </h4>
                <p className="mt-2 text-military-sand/80">
                  Advance to specialized training in scaling, automation, and
                  long-term growth strategies. Develop your command and control
                  systems for sustainable business success.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-1 gap-8 rounded-lg bg-military-olive p-10 text-military-sand sm:grid-cols-2 md:grid-cols-4">
          <div className="text-center">
            <AnimatedCounter end={87} suffix="%" />
            <p className="mt-2 text-sm">SUCCESS RATE</p>
          </div>
          <div className="text-center">
            <AnimatedCounter end={1250} prefix="$" suffix="+" />
            <p className="mt-2 text-sm">AVG MONTHLY INCOME</p>
          </div>
          <div className="text-center">
            <AnimatedCounter end={450} suffix="+" />
            <p className="mt-2 text-sm">GRADUATES</p>
          </div>
          <div className="text-center">
            <AnimatedCounter end={24} suffix="/7" />
            <p className="mt-2 text-sm">SUPPORT</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionPhases;
