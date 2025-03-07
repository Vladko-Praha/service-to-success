
import { CheckCircle, Lock, Unlock, Clock, Award, Headphones, BookOpen, PenTool } from "lucide-react";

const TrainingModules = () => {
  return (
    <section id="training" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">PHASE 1: DIGITAL DEPLOYMENT BOOTCAMP</h2>
        <p className="section-subtitle">
          Intensive 6-week training to establish your online business foundation
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Training Content */}
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-military-navy mb-6">
              MISSION MODULES
            </h3>

            {/* Module 1 */}
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-heading text-lg font-bold text-military-navy">
                  Business Intelligence Gathering
                </h4>
                <p className="mt-1 text-military-navy/70">
                  Market research techniques, competitor analysis, and identifying profitable niches aligned with your skills.
                </p>
              </div>
            </div>

            {/* Module 2 */}
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-heading text-lg font-bold text-military-navy">
                  Strategic Business Planning
                </h4>
                <p className="mt-1 text-military-navy/70">
                  Creating your mission statement, business model selection, and developing your unique value proposition.
                </p>
              </div>
            </div>

            {/* Module 3 */}
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-heading text-lg font-bold text-military-navy">
                  Digital Asset Development
                </h4>
                <p className="mt-1 text-military-navy/70">
                  Building your online presence with websites, landing pages, and essential digital tools and platforms.
                </p>
              </div>
            </div>

            {/* Module 4 */}
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-heading text-lg font-bold text-military-navy">
                  Tactical Marketing Operations
                </h4>
                <p className="mt-1 text-military-navy/70">
                  Customer acquisition strategies, content marketing, and effective paid advertising campaigns.
                </p>
              </div>
            </div>

            {/* Module 5 */}
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-military-olive" />
              <div>
                <h4 className="font-heading text-lg font-bold text-military-navy">
                  Supply Chain & Logistics
                </h4>
                <p className="mt-1 text-military-navy/70">
                  Product sourcing, inventory management, fulfillment solutions, and service delivery systems.
                </p>
              </div>
            </div>

            {/* Module 6 */}
            <div className="flex items-start space-x-3">
              <Lock className="h-6 w-6 flex-shrink-0 text-military-navy/40" />
              <div>
                <h4 className="font-heading text-lg font-bold text-military-navy/40">
                  Initial Revenue Operations
                </h4>
                <p className="mt-1 text-military-navy/40">
                  Launching your first offer, pricing strategies, and establishing reliable income streams.
                </p>
              </div>
            </div>
          </div>

          {/* Program Details */}
          <div className="mt-10 md:mt-0">
            <div className="rounded-lg border border-military-tan bg-military-sand p-8">
              <h3 className="font-heading text-2xl font-bold text-military-navy mb-6">
                BOOTCAMP INTEL
              </h3>

              <div className="space-y-6">
                {/* Detail 1 */}
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 flex-shrink-0 text-military-olive" />
                  <div>
                    <h4 className="font-heading text-base font-bold text-military-navy">
                      6-Week Intensive Program
                    </h4>
                    <p className="mt-1 text-sm text-military-navy/70">
                      10-15 hours per week commitment
                    </p>
                  </div>
                </div>

                {/* Detail 2 */}
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 flex-shrink-0 text-military-olive" />
                  <div>
                    <h4 className="font-heading text-base font-bold text-military-navy">
                      Certification Included
                    </h4>
                    <p className="mt-1 text-sm text-military-navy/70">
                      Earn a Digital Business Operator certification
                    </p>
                  </div>
                </div>

                {/* Detail 3 */}
                <div className="flex items-start space-x-3">
                  <Headphones className="h-5 w-5 flex-shrink-0 text-military-olive" />
                  <div>
                    <h4 className="font-heading text-base font-bold text-military-navy">
                      Live Support Sessions
                    </h4>
                    <p className="mt-1 text-sm text-military-navy/70">
                      Weekly group calls and priority help desk access
                    </p>
                  </div>
                </div>

                {/* Detail 4 */}
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-5 w-5 flex-shrink-0 text-military-olive" />
                  <div>
                    <h4 className="font-heading text-base font-bold text-military-navy">
                      Comprehensive Resources
                    </h4>
                    <p className="mt-1 text-sm text-military-navy/70">
                      Templates, checklists, and standard operating procedures
                    </p>
                  </div>
                </div>

                {/* Detail 5 */}
                <div className="flex items-start space-x-3">
                  <PenTool className="h-5 w-5 flex-shrink-0 text-military-olive" />
                  <div>
                    <h4 className="font-heading text-base font-bold text-military-navy">
                      Hands-On Projects
                    </h4>
                    <p className="mt-1 text-sm text-military-navy/70">
                      Build your actual business as you learn
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#enlist"
                  className="block w-full rounded-md bg-military-navy py-3 text-center font-medium text-military-sand shadow-sm transition-colors hover:bg-military-navy/90"
                >
                  REQUEST ENROLLMENT
                </a>
                <p className="mt-4 text-center text-sm text-military-navy/70">
                  Next cohort starts June 15, 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="section-title">PHASE 2: STRATEGIC BUSINESS OPERATIONS</h2>
          <p className="section-subtitle">
            Advanced 6-week program for scaling and optimizing your business
          </p>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Advanced Module 1 */}
            <div className="combat-card-dark">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-military-olive/20 px-3 py-1 text-xs font-medium text-military-sand">
                MODULE 1
              </div>
              <h3 className="mb-4 font-heading text-xl font-bold text-military-sand">
                ADVANCED MARKET INTELLIGENCE
              </h3>
              <ul className="space-y-3 text-sm text-military-sand/80">
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Predictive market trend analysis</span>
                </li>
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Customer behavior modeling</span>
                </li>
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Competitive advantage strategies</span>
                </li>
                <li className="flex items-start">
                  <Lock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-sand/40" />
                  <span className="text-military-sand/40">Advanced analytics implementation</span>
                </li>
              </ul>
            </div>

            {/* Advanced Module 2 */}
            <div className="combat-card-dark">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-military-olive/20 px-3 py-1 text-xs font-medium text-military-sand">
                MODULE 2
              </div>
              <h3 className="mb-4 font-heading text-xl font-bold text-military-sand">
                SCALING & AUTOMATION
              </h3>
              <ul className="space-y-3 text-sm text-military-sand/80">
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Business process automation</span>
                </li>
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Team building and management</span>
                </li>
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Systems for sustainable growth</span>
                </li>
                <li className="flex items-start">
                  <Lock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-sand/40" />
                  <span className="text-military-sand/40">Outsourcing and delegation mastery</span>
                </li>
              </ul>
            </div>

            {/* Advanced Module 3 */}
            <div className="combat-card-dark">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-military-olive/20 px-3 py-1 text-xs font-medium text-military-sand">
                MODULE 3
              </div>
              <h3 className="mb-4 font-heading text-xl font-bold text-military-sand">
                BUSINESS RESILIENCE
              </h3>
              <ul className="space-y-3 text-sm text-military-sand/80">
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Crisis management planning</span>
                </li>
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Multiple income stream development</span>
                </li>
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Risk assessment and mitigation</span>
                </li>
                <li className="flex items-start">
                  <Lock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-sand/40" />
                  <span className="text-military-sand/40">Business continuity planning</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Second row */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Advanced Module 4 */}
            <div className="combat-card-dark">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-military-olive/20 px-3 py-1 text-xs font-medium text-military-sand">
                MODULE 4
              </div>
              <h3 className="mb-4 font-heading text-xl font-bold text-military-sand">
                ADVANCED MARKETING OPERATIONS
              </h3>
              <ul className="space-y-3 text-sm text-military-sand/80">
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Conversion optimization tactics</span>
                </li>
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Advanced customer segmentation</span>
                </li>
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Multichannel marketing strategies</span>
                </li>
                <li className="flex items-start">
                  <Lock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-sand/40" />
                  <span className="text-military-sand/40">Brand development and positioning</span>
                </li>
              </ul>
            </div>

            {/* Advanced Module 5 */}
            <div className="combat-card-dark">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-military-olive/20 px-3 py-1 text-xs font-medium text-military-sand">
                MODULE 5
              </div>
              <h3 className="mb-4 font-heading text-xl font-bold text-military-sand">
                FINANCIAL OPERATIONS
              </h3>
              <ul className="space-y-3 text-sm text-military-sand/80">
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Profit maximization strategies</span>
                </li>
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Cash flow management</span>
                </li>
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Strategic investment planning</span>
                </li>
                <li className="flex items-start">
                  <Lock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-sand/40" />
                  <span className="text-military-sand/40">Tax optimization techniques</span>
                </li>
              </ul>
            </div>

            {/* Advanced Module 6 */}
            <div className="combat-card-dark">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-military-olive/20 px-3 py-1 text-xs font-medium text-military-sand">
                MODULE 6
              </div>
              <h3 className="mb-4 font-heading text-xl font-bold text-military-sand">
                STRATEGIC GROWTH PLANNING
              </h3>
              <ul className="space-y-3 text-sm text-military-sand/80">
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Long-term business vision development</span>
                </li>
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Asset and intellectual property protection</span>
                </li>
                <li className="flex items-start">
                  <Unlock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-olive" />
                  <span>Exit strategy and succession planning</span>
                </li>
                <li className="flex items-start">
                  <Lock className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-military-sand/40" />
                  <span className="text-military-sand/40">Market expansion opportunities</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="#enlist"
              className="rounded-md bg-military-olive px-6 py-3 font-medium text-military-sand shadow-sm transition-colors hover:bg-military-olive/90 inline-flex items-center gap-2"
            >
              <span>DEPLOY WITH FULL PROGRAM ACCESS</span>
              <Award className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingModules;
