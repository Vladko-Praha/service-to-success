
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Shield, ChevronRight, CheckCircle, XCircle, Clock, DollarSign } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthProviders from "../components/AuthProviders";
import TwoFactorSetup from "../components/TwoFactorSetup";

const Register = () => {
  const [authStep, setAuthStep] = useState(0); // 0: auth options, 1: form step 1, 2: form step 2, 3: 2FA setup
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    militaryBranch: "",
    yearsOfService: "",
    skillsets: "",
    businessGoals: "",
    timeCommitment: "",
    investmentReady: false,
    heardFrom: "",
    twoFactorEnabled: false,
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.militaryBranch) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // If 2FA should be set up
    if (formData.twoFactorEnabled) {
      setAuthStep(3); // Move to 2FA setup
      return;
    }

    // Form submission would go here - integrate with backend later
    toast({
      title: "Application Received",
      description: "Thank you for your interest. We'll review your application and contact you soon.",
    });
    
    // Redirect to home after successful submission
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleTwoFactorComplete = () => {
    setFormData(prev => ({ ...prev, twoFactorEnabled: true }));
    
    toast({
      title: "Application Received",
      description: "Your application with enhanced security has been submitted.",
    });
    
    // Redirect to home after successful submission
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleTwoFactorSkip = () => {
    setFormData(prev => ({ ...prev, twoFactorEnabled: false }));
    
    toast({
      title: "Application Received",
      description: "Thank you for your interest. We'll review your application and contact you soon.",
    });
    
    // Redirect to home after successful submission
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-tactical-pattern py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-military-sand sm:text-5xl md:text-6xl">
                JOIN THE ELITE RANKS
              </h1>
              <p className="mt-6 text-xl text-military-sand/80">
                Apply for our veteran entrepreneur training program and deploy your business mission
              </p>
            </div>
          </div>
        </section>

        {/* Selection Criteria Section */}
        <section className="py-16 bg-military-sand">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="section-title">MISSION REQUIREMENTS</h2>
              <p className="section-subtitle">
                While our program is exclusively for veterans, we maintain rigorous selection standards to ensure mission success.
              </p>

              <div className="mt-12 space-y-8">
                <div className="flex gap-6 items-start rounded-md border border-military-olive/30 bg-military-beige p-6">
                  <div className="rounded-full bg-military-olive/10 p-3">
                    <CheckCircle className="h-8 w-8 text-military-olive" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-military-navy">COMMITMENT TO EXCELLENCE</h3>
                    <p className="mt-2 text-military-navy/80">
                      We seek veterans who bring the same dedication to their business as they did to their service. 
                      This program requires discipline, focus, and willingness to adapt and overcome obstacles.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start rounded-md border border-military-olive/30 bg-military-beige p-6">
                  <div className="rounded-full bg-military-olive/10 p-3">
                    <Clock className="h-8 w-8 text-military-olive" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-military-navy">TIME ALLOCATION</h3>
                    <p className="mt-2 text-military-navy/80">
                      Participants must commit a minimum of 15-20 hours weekly to training, execution, and implementation. 
                      This mission requires consistent effort over the 12-week program duration.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start rounded-md border border-military-olive/30 bg-military-beige p-6">
                  <div className="rounded-full bg-military-olive/10 p-3">
                    <DollarSign className="h-8 w-8 text-military-olive" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-military-navy">RESOURCE INVESTMENT</h3>
                    <p className="mt-2 text-military-navy/80">
                      Success requires proper equipment. A minimum investment of $500 is necessary for essential 
                      business tools, software, and platform subscriptions that will form the foundation of your operation.
                    </p>
                    <ul className="mt-4 ml-6 list-disc text-military-navy/80">
                      <li>Website hosting and domain registration</li>
                      <li>Marketing automation software</li>
                      <li>Business formation costs</li>
                      <li>Essential productivity tools</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-6 items-start rounded-md border border-military-olive/30 bg-military-beige p-6">
                  <div className="rounded-full bg-military-olive/10 p-3">
                    <XCircle className="h-8 w-8 text-military-red" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-military-navy">NOT A FIT FOR</h3>
                    <p className="mt-2 text-military-navy/80">
                      This program is not suited for those seeking:
                    </p>
                    <ul className="mt-4 ml-6 list-disc text-military-navy/80">
                      <li>A passive income solution with minimal effort</li>
                      <li>Quick results without strategic implementation</li>
                      <li>Theoretical knowledge without practical application</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-military-beige">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="section-title">APPLICATION FORM</h2>
              <p className="section-subtitle">
                Complete the following form to be considered for our next cohort
              </p>

              <div className="mt-12 bg-white p-8 rounded-lg shadow-md border border-military-tan">
                {authStep === 0 && (
                  <AuthProviders 
                    onEmailSignup={() => setAuthStep(1)}
                    currentStep={authStep}
                  />
                )}

                {(authStep === 1 || authStep === 2) && (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {authStep === 1 && (
                      <div className="space-y-6">
                        <h3 className="font-heading text-xl font-bold text-military-navy border-b border-military-tan pb-2">
                          Personal Information
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-military-navy">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-military-tan bg-military-sand p-2 shadow-sm focus:border-military-olive focus:outline-none focus:ring-1 focus:ring-military-olive"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-military-navy">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-military-tan bg-military-sand p-2 shadow-sm focus:border-military-olive focus:outline-none focus:ring-1 focus:ring-military-olive"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-military-navy">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-military-tan bg-military-sand p-2 shadow-sm focus:border-military-olive focus:outline-none focus:ring-1 focus:ring-military-olive"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div>
                            <label htmlFor="militaryBranch" className="block text-sm font-medium text-military-navy">
                              Military Branch *
                            </label>
                            <select
                              id="militaryBranch"
                              name="militaryBranch"
                              value={formData.militaryBranch}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-military-tan bg-military-sand p-2 shadow-sm focus:border-military-olive focus:outline-none focus:ring-1 focus:ring-military-olive"
                              required
                            >
                              <option value="">Select branch</option>
                              <option value="Army">Army</option>
                              <option value="Navy">Navy</option>
                              <option value="Air Force">Air Force</option>
                              <option value="Marines">Marines</option>
                              <option value="Coast Guard">Coast Guard</option>
                              <option value="Space Force">Space Force</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="yearsOfService" className="block text-sm font-medium text-military-navy">
                              Years of Service
                            </label>
                            <input
                              type="text"
                              id="yearsOfService"
                              name="yearsOfService"
                              value={formData.yearsOfService}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-military-tan bg-military-sand p-2 shadow-sm focus:border-military-olive focus:outline-none focus:ring-1 focus:ring-military-olive"
                            />
                          </div>
                        </div>

                        <div className="flex items-start pt-2">
                          <div className="flex h-5 items-center">
                            <input
                              id="twoFactorEnabled"
                              name="twoFactorEnabled"
                              type="checkbox"
                              checked={formData.twoFactorEnabled}
                              onChange={handleChange}
                              className="h-4 w-4 rounded border-military-tan text-military-olive focus:ring-military-olive"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="twoFactorEnabled" className="font-medium text-military-navy">
                              Enable two-factor authentication for my account
                            </label>
                            <p className="text-military-navy/70">
                              Recommended for extra security
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setAuthStep(2)}
                            className="flex items-center gap-2 rounded-md bg-military-navy px-6 py-2 text-sm font-medium text-military-sand shadow-sm transition-all hover:bg-military-navy/90"
                          >
                            <span>Next</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {authStep === 2 && (
                      <div className="space-y-6">
                        <h3 className="font-heading text-xl font-bold text-military-navy border-b border-military-tan pb-2">
                          Mission Details
                        </h3>
                        
                        <div>
                          <label htmlFor="skillsets" className="block text-sm font-medium text-military-navy">
                            What skills or experience do you bring from your military service?
                          </label>
                          <textarea
                            id="skillsets"
                            name="skillsets"
                            value={formData.skillsets}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full rounded-md border border-military-tan bg-military-sand p-2 shadow-sm focus:border-military-olive focus:outline-none focus:ring-1 focus:ring-military-olive"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="businessGoals" className="block text-sm font-medium text-military-navy">
                            What type of online business are you interested in building?
                          </label>
                          <textarea
                            id="businessGoals"
                            name="businessGoals"
                            value={formData.businessGoals}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full rounded-md border border-military-tan bg-military-sand p-2 shadow-sm focus:border-military-olive focus:outline-none focus:ring-1 focus:ring-military-olive"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="timeCommitment" className="block text-sm font-medium text-military-navy">
                            How many hours per week can you commit to building your business?
                          </label>
                          <select
                            id="timeCommitment"
                            name="timeCommitment"
                            value={formData.timeCommitment}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-military-tan bg-military-sand p-2 shadow-sm focus:border-military-olive focus:outline-none focus:ring-1 focus:ring-military-olive"
                          >
                            <option value="">Select time commitment</option>
                            <option value="5-10 hours">5-10 hours</option>
                            <option value="10-15 hours">10-15 hours</option>
                            <option value="15-20 hours">15-20 hours</option>
                            <option value="20+ hours">20+ hours</option>
                          </select>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="investmentReady"
                              name="investmentReady"
                              type="checkbox"
                              checked={formData.investmentReady}
                              onChange={handleChange}
                              className="h-4 w-4 rounded border-military-tan text-military-olive focus:ring-military-olive"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="investmentReady" className="font-medium text-military-navy">
                              I understand that this program requires a minimum investment of $500 in business tools
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="heardFrom" className="block text-sm font-medium text-military-navy">
                            How did you hear about this program?
                          </label>
                          <input
                            type="text"
                            id="heardFrom"
                            name="heardFrom"
                            value={formData.heardFrom}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-military-tan bg-military-sand p-2 shadow-sm focus:border-military-olive focus:outline-none focus:ring-1 focus:ring-military-olive"
                          />
                        </div>

                        <div className="pt-4 flex justify-between">
                          <button
                            type="button"
                            onClick={() => setAuthStep(1)}
                            className="flex items-center gap-2 rounded-md border border-military-navy bg-transparent px-6 py-2 text-sm font-medium text-military-navy shadow-sm transition-all hover:bg-military-navy/10"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="flex items-center gap-2 rounded-md bg-military-olive px-6 py-2 text-sm font-medium text-military-sand shadow-sm transition-all hover:bg-military-olive/90"
                          >
                            <Shield className="h-4 w-4" />
                            <span>Submit Application</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                )}

                {authStep === 3 && (
                  <TwoFactorSetup 
                    onComplete={handleTwoFactorComplete} 
                    onSkip={handleTwoFactorSkip} 
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
