
import { ArrowRight, Shield, Target, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCounter from './AnimatedCounter';

const CallToAction = () => {
  return (
    <section id="enlist" className="py-24 relative bg-military-navy overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
          backgroundRepeat: "repeat"
        }}
      ></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-military-sand sm:text-5xl">
            READY TO DEPLOY YOUR BUSINESS MISSION?
          </h2>
          <p className="mt-6 text-lg text-military-sand/80">
            Join our elite program designed specifically for veterans and transform your military experience into business success
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex items-center justify-center">
                <div className="rounded-lg bg-military-olive/20 p-3">
                  <Shield className="h-8 w-8 text-military-olive" />
                </div>
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-military-sand">
                MISSION-READY TRAINING
              </h3>
              <p className="mt-2 text-military-sand/80">
                Structured program that translates military experience into business skills
              </p>
            </div>

            <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex items-center justify-center">
                <div className="rounded-lg bg-military-olive/20 p-3">
                  <Target className="h-8 w-8 text-military-olive" />
                </div>
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-military-sand">
                STRATEGIC OUTCOMES
              </h3>
              <p className="mt-2 text-military-sand/80">
                Clear business objectives with measurable results and accountability
              </p>
            </div>

            <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex items-center justify-center">
                <div className="rounded-lg bg-military-olive/20 p-3">
                  <Users className="h-8 w-8 text-military-olive" />
                </div>
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-military-sand">
                VETERAN COMMUNITY
              </h3>
              <p className="mt-2 text-military-sand/80">
                Connect with fellow veterans who understand your journey and challenges
              </p>
            </div>

            <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex items-center justify-center">
                <div className="rounded-lg bg-military-olive/20 p-3">
                  <Award className="h-8 w-8 text-military-olive" />
                </div>
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-military-sand">
                PROVEN LEADERSHIP
              </h3>
              <p className="mt-2 text-military-sand/80">
                Led by veterans who've successfully transitioned to business ownership
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <AnimatedCounter end={450} suffix="+" />
              <p className="mt-2 text-sm text-military-sand/80">VETERANS TRAINED</p>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter end={87} suffix="%" />
              <p className="mt-2 text-sm text-military-sand/80">SUCCESS RATE</p>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter end={12} />
              <p className="mt-2 text-sm text-military-sand/80">WEEK PROGRAM</p>
            </div>
          </div>

          <div className="mt-16">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-md bg-military-olive px-8 py-4 font-medium text-military-sand shadow-md transition-all hover:bg-military-olive/90 hover:shadow-lg"
            >
              <span className="text-lg">BEGIN YOUR MISSION</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 text-sm text-military-sand/60">
              Next cohort starting soon — Limited spots available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
