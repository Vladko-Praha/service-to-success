
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  rank?: string;
  isLoggedIn: boolean;
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
