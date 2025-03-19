
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
}

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Get user info from localStorage on component mount
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      // Redirect to login if not logged in
      navigate("/");
    }
  }, [navigate]);

  if (!userInfo) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

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
                  {userInfo.name.split(' ').map(part => part[0]).join('')}
                </span>
              </div>
            </div>
            
            {/* Basic Information */}
            <div>
              <h3 className="font-heading text-lg font-semibold text-military-navy border-b border-military-tan pb-2 mb-4">
                Basic Information
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
            
            {/* Military Background */}
            {(userInfo.militaryBranch || userInfo.yearsOfService) && (
              <div>
                <h3 className="font-heading text-lg font-semibold text-military-navy border-b border-military-tan pb-2 mb-4">
                  Military Background
                </h3>
                
                <div className="space-y-4">
                  {userInfo.militaryBranch && (
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-500">Military Branch</h3>
                      <div className="flex items-center">
                        <p className="text-lg font-medium">{userInfo.militaryBranch}</p>
                        <Button size="icon" variant="ghost" className="ml-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {userInfo.yearsOfService && (
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-500">Years of Service</h3>
                      <div className="flex items-center">
                        <p className="text-lg font-medium">{userInfo.yearsOfService}</p>
                        <Button size="icon" variant="ghost" className="ml-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {(userInfo.militaryBranch || userInfo.yearsOfService) && <Separator />}
            
            {/* Business Information */}
            {(userInfo.skillsets || userInfo.businessGoals || userInfo.timeCommitment || userInfo.investmentReady !== undefined) && (
              <div>
                <h3 className="font-heading text-lg font-semibold text-military-navy border-b border-military-tan pb-2 mb-4">
                  Business Information
                </h3>
                
                <div className="space-y-4">
                  {userInfo.skillsets && (
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold text-gray-500 mb-2">Skills & Experience</h3>
                      <div className="flex items-start justify-between">
                        <p className="text-base">{userInfo.skillsets}</p>
                        <Button size="icon" variant="ghost" className="ml-2 flex-shrink-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {userInfo.businessGoals && (
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold text-gray-500 mb-2">Business Goals</h3>
                      <div className="flex items-start justify-between">
                        <p className="text-base">{userInfo.businessGoals}</p>
                        <Button size="icon" variant="ghost" className="ml-2 flex-shrink-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {userInfo.timeCommitment && (
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-500">Time Commitment</h3>
                      <div className="flex items-center">
                        <p className="text-lg font-medium">{userInfo.timeCommitment}</p>
                        <Button size="icon" variant="ghost" className="ml-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {userInfo.investmentReady !== undefined && (
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-500">Investment Ready</h3>
                      <div className="flex items-center">
                        <p className="text-lg font-medium">{userInfo.investmentReady ? 'Yes' : 'No'}</p>
                        <Button size="icon" variant="ghost" className="ml-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {userInfo.heardFrom && (
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-500">Referral Source</h3>
                      <div className="flex items-center">
                        <p className="text-lg font-medium">{userInfo.heardFrom}</p>
                        <Button size="icon" variant="ghost" className="ml-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
