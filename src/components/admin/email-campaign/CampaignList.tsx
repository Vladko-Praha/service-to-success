
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Plus, Edit, Copy, BarChart3, Trash2, Mail, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Campaign } from "./types";
import { useToast } from "@/hooks/use-toast";

interface CampaignListProps {
  campaigns: Campaign[];
  onCreateCampaign: () => void;
  onEditCampaign: (id: number) => void;
  onDeleteCampaign: (id: number) => void;
  onCopyCampaign: (id: number) => void;
  onViewAnalytics: (id: number) => void;
}

const CampaignList = ({
  campaigns,
  onCreateCampaign,
  onEditCampaign,
  onDeleteCampaign,
  onCopyCampaign,
  onViewAnalytics
}: CampaignListProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCampaigns = React.useMemo(() => {
    return campaigns.filter(campaign => 
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [campaigns, searchQuery]);

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800 border-green-300",
      draft: "bg-gray-100 text-gray-800 border-gray-300",
      completed: "bg-blue-100 text-blue-800 border-blue-300",
      scheduled: "bg-yellow-100 text-yellow-800 border-yellow-300",
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full border ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Email Campaigns</CardTitle>
        <CardDescription>Manage your email marketing campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search campaigns..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                toast({
                  title: "Filter Feature",
                  description: "Campaign filtering will be available soon.",
                });
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem onClick={onCreateCampaign}>
                  <Mail className="mr-2 h-4 w-4" />
                  New Campaign
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Automation creation will be available in the next update.",
                  });
                }}>
                  <Zap className="mr-2 h-4 w-4" />
                  New Automation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow className="bg-military-beige/20 hover:bg-military-beige/30">
              <TableHead>Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead>Opened</TableHead>
              <TableHead>Clicked</TableHead>
              <TableHead>Last Sent</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-military-beige/10">
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell className="capitalize">{campaign.type}</TableCell>
                  <TableCell>{campaign.sent}</TableCell>
                  <TableCell>{campaign.opened}</TableCell>
                  <TableCell>{campaign.clicked}</TableCell>
                  <TableCell>{campaign.lastSent}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => onEditCampaign(campaign.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => onCopyCampaign(campaign.id)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => onViewAnalytics(campaign.id)}
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => onDeleteCampaign(campaign.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                  No campaigns found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CampaignList;
