
import { useState } from "react";
import { ChevronLeft, Mail, Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

type EmailLoginProps = {
  onBack: () => void;
  onLogin: () => void;
};

const EmailLogin = ({ onBack, onLogin }: EmailLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // This would be replaced with actual authentication logic
      setTimeout(() => {
        // Simulate successful login and trigger the redirect
        onLogin();
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Invalid email or password.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack} 
          className="p-1 mr-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-military-navy" />
        </button>
        <h3 className="font-heading text-lg font-medium text-military-navy">
          Login with Email
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 rounded-md bg-military-navy px-4 py-2 text-sm font-medium text-military-sand shadow-sm hover:bg-military-navy/90 disabled:opacity-70"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-military-sand"></div>
          ) : (
            <Mail className="h-5 w-5" />
          )}
          <span>Login</span>
        </button>
      </form>
    </div>
  );
};

export default EmailLogin;
