
import { useState } from "react";
import { Apple, Mail, Shield } from "lucide-react";
import { GoogleLogo } from "./icons/GoogleLogo";
import { useToast } from "@/hooks/use-toast";

type AuthProviderProps = {
  onEmailSignup: () => void;
  currentStep: number;
};

const AuthProviders = ({ onEmailSignup, currentStep }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGoogleSignup = async () => {
    setIsLoading("google");
    try {
      // Implementation will be added once connected to a backend
      toast({
        title: "Google Sign-in",
        description: "Google authentication will be implemented with backend integration.",
      });
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "There was an error signing in with Google.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleAppleSignup = async () => {
    setIsLoading("apple");
    try {
      // Implementation will be added once connected to a backend
      toast({
        title: "Apple Sign-in",
        description: "Apple authentication will be implemented with backend integration.",
      });
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "There was an error signing in with Apple.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="font-heading text-lg font-medium text-military-navy">
          Choose how to sign up
        </h3>
        <p className="text-sm text-military-navy/70">
          Secure options to create your account
        </p>
      </div>

      <button
        onClick={handleGoogleSignup}
        disabled={isLoading !== null}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-70"
      >
        {isLoading === "google" ? (
          <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-military-navy"></div>
        ) : (
          <GoogleLogo className="h-5 w-5" />
        )}
        <span>Continue with Google</span>
      </button>

      <button
        onClick={handleAppleSignup}
        disabled={isLoading !== null}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black/90 disabled:opacity-70"
      >
        {isLoading === "apple" ? (
          <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-white"></div>
        ) : (
          <Apple className="h-5 w-5" />
        )}
        <span>Continue with Apple</span>
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-military-beige px-2 text-gray-500">Or</span>
        </div>
      </div>

      <button
        onClick={onEmailSignup}
        disabled={isLoading !== null}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-military-navy px-4 py-2 text-sm font-medium text-military-sand shadow-sm hover:bg-military-navy/90 disabled:opacity-70"
      >
        <Mail className="h-5 w-5" />
        <span>Continue with Email</span>
      </button>

      {currentStep === 0 && (
        <div className="mt-4 flex items-center justify-center text-xs text-military-navy/70">
          <Shield className="mr-1 h-4 w-4 text-military-olive" />
          <span>Secure two-factor authentication available</span>
        </div>
      )}
    </div>
  );
};

export default AuthProviders;
