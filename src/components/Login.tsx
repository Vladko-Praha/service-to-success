
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AuthProviders from "./AuthProviders";
import EmailLogin from "./EmailLogin";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authStep, setAuthStep] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailSignup = () => {
    setAuthStep(1);
  };

  const handleBack = () => {
    setAuthStep(0);
  };

  const handleLogin = () => {
    setIsOpen(false);
    setAuthStep(0);
    toast({
      title: "Login successful",
      description: "You have been logged in successfully.",
    });
    // Redirect to dashboard after successful login
    navigate("/dashboard");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-military-olive hover:bg-military-olive/90">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-lg font-medium text-military-navy">
          Account Access
        </DialogTitle>
        <DialogDescription className="text-sm text-military-navy/70">
          Sign in to access your training dashboard
        </DialogDescription>
        {authStep === 0 ? (
          <AuthProviders onEmailSignup={handleEmailSignup} currentStep={authStep} />
        ) : (
          <EmailLogin onBack={handleBack} onLogin={handleLogin} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Login;
