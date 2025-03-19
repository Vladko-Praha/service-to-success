
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AuthProviders from "./AuthProviders";
import EmailLogin from "./EmailLogin";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authStep, setAuthStep] = useState(0);
  const { toast } = useToast();

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
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-military-olive hover:bg-military-olive/90">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
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
