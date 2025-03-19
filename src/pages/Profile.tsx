
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, User, Briefcase, Shield, Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "./AdminDashboard"; // Import the supabase client

interface UserInfo {
  name: string;
  email: string;
  rank?: string;
  isLoggedIn: boolean;
  // Additional registration fields
  phone?: string;
  militaryBranch?: string;
  yearsOfService?: string;
  skillsets?: string;
  businessGoals?: string;
  timeCommitment?: string;
  investmentReady?: boolean;
  heardFrom?: string;
  twoFactorEnabled?: boolean;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      
      try {
        // First check if we have a Supabase session
        const { data: sessionData } = await supabase.auth.getSession();
        const currentUser = sessionData?.session?.user;
        
        if (currentUser) {
          // We have a logged-in Supabase user
          const userData: UserInfo = {
            name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User',
            email: currentUser.email || '',
            isLoggedIn: true,
            rank: currentUser.user_metadata?.rank,
            phone: currentUser.user_metadata?.phone,
            militaryBranch: currentUser.user_metadata?.militaryBranch,
            yearsOfService: currentUser.user_metadata?.yearsOfService,
            skillsets: currentUser.user_metadata?.skillsets,
            businessGoals: currentUser.user_metadata?.businessGoals,
            timeCommitment: currentUser.user_metadata?.timeCommitment,
            investmentReady: currentUser.user_metadata?.investmentReady,
            heardFrom: currentUser.user_metadata?.heardFrom,
            twoFactorEnabled: currentUser.user_metadata?.twoFactorEnabled
          };
          
          setUserInfo(userData);
          
          // Also check if this user is in the participants table
          const { data: participantData } = await supabase
            .from('participants')
            .select('*')
            .eq('email', currentUser.email)
            .maybeSingle();
            
          if (participantData) {
            // We found a participant record, we could enhance the profile with this data if needed
            console.log("Found participant record:", participantData);
          }
          
          setIsLoading(false);
          return;
        }
        
        // If no Supabase session, fall back to localStorage
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
          setIsLoading(false);
        } else {
          // No user data found, redirect to login
          toast({
            title: "Not logged in",
            description: "Please log in to view your profile",
            variant: "destructive"
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        
        // Fall back to localStorage on error
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        } else {
          toast({
            title: "Error loading profile",
            description: "Could not load your profile information",
            variant: "destructive"
          });
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-military-beige">
        <div className="w-8 h-8 border-4 border-military-navy/20 border-t-military-navy rounded-full animate-spin"></div>
        <span className="ml-2 text-military-navy">Loading profile...</span>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-military-beige">
        <h2 className="text-xl text-military-navy mb-4">Profile Not Found</h2>
        <Button onClick={() => navigate("/")} variant="default">Return to Login</Button>
      </div>
    );
  }

  // Helper function to handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-military-beige p-6">
      <Button 
        variant="outline" 
        className="mb-6" 
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </Button>
      
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-military-navy">Profile Information</CardTitle>
            <CardDescription>View and manage your profile details</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className="h-32 w-32 rounded-full bg-military-navy flex items-center justify-center">
                <span className="text-4xl text-military-sand font-bold">
                  {userInfo.name ? userInfo.name.split(' ').map(part => part[0]).join('') : '?'}
                </span>
              </div>
            </div>
            
            <Tabs defaultValue="personal" value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-8">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Personal</span>
                </TabsTrigger>
                <TabsTrigger value="military" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>Military</span>
                </TabsTrigger>
                <TabsTrigger value="business" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Business</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-military-navy border-b border-military-tan pb-2 mb-4">
                    Personal Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-500">Full Name</h3>
                      <div className="flex items-center">
                        <p className="text-lg font-medium">{userInfo.name}</p>
                        <Button size="icon" variant="ghost" className="ml-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-500">Email</h3>
                      <div className="flex items-center">
                        <p className="text-lg font-medium">{userInfo.email}</p>
                        <Button size="icon" variant="ghost" className="ml-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {userInfo.rank && (
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-500">Rank</h3>
                        <div className="flex items-center">
                          <p className="text-lg font-medium">{userInfo.rank}</p>
                          <Button size="icon" variant="ghost" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {userInfo.phone && (
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-500">Phone</h3>
                        <div className="flex items-center">
                          <p className="text-lg font-medium">{userInfo.phone}</p>
                          <Button size="icon" variant="ghost" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                {/* Security Information */}
                <div>
                  <h3 className="font-heading text-lg font-semibold text-military-navy border-b border-military-tan pb-2 mb-4">
                    Security Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-500">Two-Factor Authentication</h3>
                      <div className="flex items-center">
                        <p className="text-lg font-medium">
                          {userInfo.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </p>
                        <Button size="icon" variant="ghost" className="ml-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Military Background Tab */}
              <TabsContent value="military" className="space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-military-navy border-b border-military-tan pb-2 mb-4">
                    Military Background
                  </h3>
                  
                  <div className="space-y-4">
                    {userInfo.militaryBranch ? (
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-500">Military Branch</h3>
                        <div className="flex items-center">
                          <p className="text-lg font-medium">{userInfo.militaryBranch}</p>
                          <Button size="icon" variant="ghost" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-500">Military Branch</h3>
                        <div className="flex items-center">
                          <p className="text-lg font-medium text-gray-400">Not specified</p>
                          <Button size="icon" variant="ghost" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {userInfo.yearsOfService ? (
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-500">Years of Service</h3>
                        <div className="flex items-center">
                          <p className="text-lg font-medium">{userInfo.yearsOfService}</p>
                          <Button size="icon" variant="ghost" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-500">Years of Service</h3>
                        <div className="flex items-center">
                          <p className="text-lg font-medium text-gray-400">Not specified</p>
                          <Button size="icon" variant="ghost" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Business Information Tab */}
              <TabsContent value="business" className="space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-military-navy border-b border-military-tan pb-2 mb-4">
                    Business Information
                  </h3>
                  
                  <div className="space-y-4">
                    {userInfo.skillsets ? (
                      <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Skills & Experience</h3>
                        <div className="flex items-start justify-between">
                          <p className="text-base">{userInfo.skillsets}</p>
                          <Button size="icon" variant="ghost" className="ml-2 flex-shrink-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Skills & Experience</h3>
                        <div className="flex items-start justify-between">
                          <p className="text-base text-gray-400">Not specified</p>
                          <Button size="icon" variant="ghost" className="ml-2 flex-shrink-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {userInfo.businessGoals ? (
                      <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Business Goals</h3>
                        <div className="flex items-start justify-between">
                          <p className="text-base">{userInfo.businessGoals}</p>
                          <Button size="icon" variant="ghost" className="ml-2 flex-shrink-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Business Goals</h3>
                        <div className="flex items-start justify-between">
                          <p className="text-base text-gray-400">Not specified</p>
                          <Button size="icon" variant="ghost" className="ml-2 flex-shrink-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {userInfo.timeCommitment ? (
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-500">Time Commitment</h3>
                        <div className="flex items-center">
                          <p className="text-lg font-medium">{userInfo.timeCommitment}</p>
                          <Button size="icon" variant="ghost" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-500">Time Commitment</h3>
                        <div className="flex items-center">
                          <p className="text-lg font-medium text-gray-400">Not specified</p>
                          <Button size="icon" variant="ghost" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-500">Investment Ready</h3>
                      <div className="flex items-center">
                        <p className="text-lg font-medium">
                          {userInfo.investmentReady !== undefined ? (userInfo.investmentReady ? 'Yes' : 'No') : 'Not specified'}
                        </p>
                        <Button size="icon" variant="ghost" className="ml-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {userInfo.heardFrom ? (
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-500">Referral Source</h3>
                        <div className="flex items-center">
                          <p className="text-lg font-medium">{userInfo.heardFrom}</p>
                          <Button size="icon" variant="ghost" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-500">Referral Source</h3>
                        <div className="flex items-center">
                          <p className="text-lg font-medium text-gray-400">Not specified</p>
                          <Button size="icon" variant="ghost" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
