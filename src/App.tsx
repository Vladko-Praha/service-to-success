
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TrainingProvider } from "./context/TrainingContext";
import { UserProvider } from "./context/UserContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import TrainingCenter from "./pages/TrainingCenter";
import Communications from "./pages/Communications";
import LessonCreator from "./pages/LessonCreator";
import { supabase } from "./pages/AdminDashboard";
import { setupMediaTables, insertSampleMediaData } from "./services/media/setupMediaTables";

const queryClient = new QueryClient();

const App = () => {
  // Initialize Supabase tables on app start
  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        // Check if we can connect to Supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (!error) {
          console.log("Connected to Supabase, setting up media tables...");
          
          // Set up media tables and storage buckets
          const tablesResult = await setupMediaTables();
          
          if (tablesResult.success) {
            console.log("Media tables set up successfully");
            
            // Insert sample data
            const dataResult = await insertSampleMediaData();
            
            if (dataResult.success) {
              console.log("Sample media data inserted successfully");
            } else {
              console.error("Error inserting sample media data:", dataResult.error);
            }
          } else {
            console.error("Error setting up media tables:", tablesResult.error);
          }
        } else {
          console.error("Supabase connection error:", error);
          console.log("Using local storage fallback instead");
        }
      } catch (err) {
        console.error("Error initializing Supabase:", err);
      }
    };
    
    initializeSupabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <TrainingProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/training" element={<TrainingCenter />} />
                <Route path="/communications" element={<Communications />} />
                <Route path="/lesson-creator" element={<LessonCreator />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TrainingProvider>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
