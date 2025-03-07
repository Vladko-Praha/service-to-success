
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Shield, Smartphone, Key } from 'lucide-react';

const TwoFactorSetup = ({ onComplete, onSkip }: { onComplete: () => void, onSkip: () => void }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate verification - would be connected to a backend service
    setTimeout(() => {
      if (verificationCode.length === 6) {
        toast({
          title: "2FA Activated",
          description: "Two-factor authentication has been set up for your account.",
        });
        onComplete();
      } else {
        toast({
          title: "Invalid Code",
          description: "Please enter a valid 6-digit verification code.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center mb-4">
        <div className="rounded-full bg-military-olive/20 p-6">
          <Shield className="h-12 w-12 text-military-olive" />
        </div>
      </div>

      <h3 className="font-heading text-xl font-bold text-military-navy text-center">
        Set Up Two-Factor Authentication
      </h3>
      
      <p className="text-military-navy/80 text-center">
        Add an extra layer of security to your account with 2FA
      </p>

      <div className="bg-military-olive/10 rounded-md p-4 flex items-start gap-3">
        <Smartphone className="h-5 w-5 text-military-olive mt-0.5" />
        <div>
          <h4 className="font-medium text-military-navy">Why use 2FA?</h4>
          <p className="text-sm text-military-navy/80">
            Two-factor authentication helps protect your account even if your password is compromised.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="verificationCode" className="block text-sm font-medium text-military-navy">
            Enter verification code
          </label>
          <p className="text-xs text-military-navy/70 mb-2">
            Enter the 6-digit code from your authenticator app
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-military-navy/50" />
              <input
                id="verificationCode"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                className="pl-10 block w-full rounded-md border border-military-tan bg-military-sand p-2 shadow-sm focus:border-military-olive focus:outline-none focus:ring-1 focus:ring-military-olive"
                placeholder="123456"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onSkip}
            className="flex-1 rounded-md border border-military-navy bg-transparent px-4 py-2 text-sm font-medium text-military-navy shadow-sm transition-all hover:bg-military-navy/10"
            disabled={isLoading}
          >
            Set up later
          </button>
          <button
            type="submit"
            className="flex-1 flex justify-center items-center gap-2 rounded-md bg-military-olive px-4 py-2 text-sm font-medium text-military-sand shadow-sm transition-all hover:bg-military-olive/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-military-sand"></div>
            ) : (
              <Shield className="h-4 w-4" />
            )}
            <span>Activate 2FA</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TwoFactorSetup;
