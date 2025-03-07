
import { CheckCircle, ShieldCheck } from 'lucide-react';

const DeploymentOptions = () => {
  return (
    <section id="deployment" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">CHOOSE YOUR DEPLOYMENT OPTION</h2>
        <p className="section-subtitle">
          Select the training program that aligns with your mission objectives
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Basic Training Plan */}
          <div className="rounded-lg border-2 border-military-tan bg-military-sand p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl font-bold text-military-navy">
                DIGITAL DEPLOYMENT BOOTCAMP
              </h3>
              <div className="rounded-full bg-military-olive/10 px-3 py-1 text-sm font-medium text-military-olive">
                PHASE 1
              </div>
            </div>

            <div className="mt-4 flex items-baseline text-military-navy">
              <span className="font-heading text-4xl font-bold">$997</span>
              <span className="ml-1 text-lg text-military-navy/70">one-time</span>
            </div>

            <p className="mt-4 text-military-navy/80">
              Complete 6-week program to establish your online business foundation with essential digital marketing and operations training.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-navy/80">6 core training modules (30+ video lessons)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-navy/80">Weekly group coaching calls</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-navy/80">Business planning templates & resources</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-navy/80">Private community access (3 months)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-navy/80">Digital Business Operator certification</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-navy/80">Email support for 90 days</span>
              </li>
            </ul>

            <div className="mt-8">
              <a
                href="#enlist"
                className="block w-full rounded-md bg-military-olive py-3 text-center font-medium text-military-sand shadow-sm transition-colors hover:bg-military-olive/90"
              >
                ENLIST NOW
              </a>
            </div>

            <p className="mt-4 text-center text-sm text-military-navy/60">
              30-day money-back guarantee
            </p>
          </div>

          {/* Advanced Training Plan */}
          <div className="relative rounded-lg border-2 border-military-navy bg-military-navy p-8">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-military-red px-4 py-1 text-sm font-medium text-military-sand">
              RECOMMENDED
            </div>

            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl font-bold text-military-sand">
                STRATEGIC BUSINESS OPERATIONS
              </h3>
              <div className="rounded-full bg-military-olive/20 px-3 py-1 text-sm font-medium text-military-sand">
                FULL PROGRAM
              </div>
            </div>

            <div className="mt-4 flex items-baseline text-military-sand">
              <span className="font-heading text-4xl font-bold">$1,997</span>
              <span className="ml-1 text-lg text-military-sand/70">one-time</span>
            </div>

            <p className="mt-4 text-military-sand/80">
              Complete 12-week comprehensive program covering both foundational and advanced business strategies for long-term success.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start">
                <ShieldCheck className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-sand/80">Everything in Phase 1 Bootcamp</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-sand/80">6 advanced training modules (30+ videos)</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-sand/80">Two 1-on-1 strategy sessions</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-sand/80">Advanced business scaling templates</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-sand/80">Private community access (lifetime)</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-sand/80">Strategic Business Commander certification</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-sand/80">Priority email & chat support for 12 months</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-military-olive" />
                <span className="text-military-sand/80">Monthly group mastermind calls for 6 months</span>
              </li>
            </ul>

            <div className="mt-8">
              <a
                href="#enlist"
                className="block w-full rounded-md bg-military-red py-3 text-center font-medium text-military-sand shadow-sm transition-colors hover:bg-military-red/90"
              >
                DEPLOY NOW
              </a>
            </div>

            <p className="mt-4 text-center text-sm text-military-sand/60">
              30-day money-back guarantee
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-military-olive bg-military-olive/10 p-8">
          <h3 className="mb-6 text-center font-heading text-2xl font-bold text-military-navy">
            VETERANS ADMINISTRATION BENEFITS
          </h3>
          <p className="text-center text-military-navy/80">
            This program may be eligible for VA education benefits or VR&E (Vocational Rehabilitation and Employment) support. 
            Our veteran liaison team can assist with the necessary documentation for your benefits application.
          </p>
          <div className="mt-8 text-center">
            <a
              href="#enlist"
              className="inline-block rounded-md border border-military-navy bg-transparent px-6 py-3 font-medium text-military-navy shadow-sm transition-colors hover:bg-military-navy/5"
            >
              INQUIRE ABOUT VA BENEFITS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentOptions;
