
import React, { useState } from "react";
import { Mail, Users, Zap, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Import components
import CampaignList from "./email-campaign/CampaignList";
import CampaignForm from "./email-campaign/CampaignForm";
import TemplateList from "./email-campaign/TemplateList";
import TemplateForm from "./email-campaign/TemplateForm";
import AutomationList from "./email-campaign/AutomationList";
import AudienceList from "./email-campaign/AudienceList";

// Import data and types
import { campaigns, segments, templates } from "./email-campaign/data";
import { Campaign, EmailFormValues, EmailTemplate, TemplateFormValues } from "./email-campaign/types";

const EmailCampaignHQ = () => {
  const [activeView, setActiveView] = useState("campaigns");
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [campaignData, setCampaignData] = useState<Campaign[]>(campaigns);
  const [templateData, setTemplateData] = useState<EmailTemplate[]>(templates);
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<EmailTemplate | undefined>(undefined);
  const { toast } = useToast();

  // Campaign handlers
  const handleCreateCampaign = () => {
    setShowNewCampaign(true);
  };

  const handleCampaignSubmit = (data: EmailFormValues) => {
    console.log("Campaign data:", data);
    
    // Create a new campaign
    const newCampaign: Campaign = {
      id: Math.max(...campaignData.map(c => c.id)) + 1,
      name: data.name,
      status: "draft",
      type: "campaign",
      sent: 0,
      opened: 0,
      clicked: 0,
      lastSent: "-"
    };
    
    setCampaignData([newCampaign, ...campaignData]);
    
    toast({
      title: "Campaign created",
      description: `${data.name} has been created and saved as a draft.`,
    });
    
    setShowNewCampaign(false);
  };

  const handleCancelCampaign = () => {
    setShowNewCampaign(false);
  };

  const handleEditCampaign = (id: number) => {
    toast({
      title: "Edit Campaign",
      description: `Opening editor for campaign ${id}`,
    });
  };

  const handleDeleteCampaign = (id: number) => {
    // Filter out the deleted campaign
    const updatedCampaigns = campaignData.filter(campaign => campaign.id !== id);
    setCampaignData(updatedCampaigns);
    
    toast({
      title: "Campaign deleted",
      description: "The campaign has been deleted successfully.",
    });
  };

  const handleCopyCampaign = (id: number) => {
    // Find the campaign to copy
    const campaignToCopy = campaignData.find(campaign => campaign.id === id);
    
    if (campaignToCopy) {
      // Create a new campaign with a copy of the original
      const newCampaign: Campaign = {
        ...campaignToCopy,
        id: Math.max(...campaignData.map(c => c.id)) + 1,
        name: `${campaignToCopy.name} (Copy)`,
        status: "draft",
        sent: 0,
        opened: 0,
        clicked: 0,
        lastSent: "-"
      };
      
      setCampaignData([newCampaign, ...campaignData]);
      
      toast({
        title: "Campaign duplicated",
        description: `${campaignToCopy.name} has been duplicated.`,
      });
    }
  };

  const handleViewAnalytics = (id: number) => {
    toast({
      title: "Campaign Analytics",
      description: `Viewing analytics for campaign ${id}`,
    });
  };

  // Template handlers
  const handleCreateTemplate = () => {
    setCurrentTemplate(undefined);
    setShowTemplateForm(true);
  };

  const handleEditTemplate = (id: number) => {
    const templateToEdit = templateData.find(template => template.id === id);
    if (templateToEdit) {
      setCurrentTemplate(templateToEdit);
      setShowTemplateForm(true);
    }
  };

  const handleTemplateFormSubmit = (data: TemplateFormValues) => {
    if (currentTemplate) {
      // Update existing template
      const updatedTemplates = templateData.map(template => 
        template.id === currentTemplate.id 
          ? { ...template, ...data, lastUsed: new Date().toISOString().split('T')[0] }
          : template
      );
      setTemplateData(updatedTemplates);
      
      toast({
        title: "Template updated",
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      // Create new template
      const newTemplate: EmailTemplate = {
        id: Math.max(...templateData.map(t => t.id)) + 1,
        name: data.name,
        category: data.category,
        lastUsed: "Never",
        content: data.content
      };
      
      setTemplateData([...templateData, newTemplate]);
      
      toast({
        title: "Template created",
        description: `${data.name} has been created successfully.`,
      });
    }
    
    setShowTemplateForm(false);
    setCurrentTemplate(undefined);
  };

  const handleCancelTemplateForm = () => {
    setShowTemplateForm(false);
    setCurrentTemplate(undefined);
  };

  const handleCopyTemplate = (id: number) => {
    const templateToCopy = templateData.find(template => template.id === id);
    
    if (templateToCopy) {
      const newTemplate: EmailTemplate = {
        ...templateToCopy,
        id: Math.max(...templateData.map(t => t.id)) + 1,
        name: `${templateToCopy.name} (Copy)`,
        lastUsed: "Never"
      };
      
      setTemplateData([...templateData, newTemplate]);
      
      toast({
        title: "Template duplicated",
        description: `${templateToCopy.name} has been duplicated.`,
      });
    }
  };

  const handleDeleteTemplate = (id: number) => {
    const updatedTemplates = templateData.filter(template => template.id !== id);
    setTemplateData(updatedTemplates);
    
    toast({
      title: "Template deleted",
      description: "The template has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Email Campaign Headquarters
        </h2>
        <Button 
          className="bg-military-navy hover:bg-military-navy/90"
          onClick={() => setShowNewCampaign(true)}
        >
          <Mail className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>
      
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid grid-cols-4 bg-military-beige/30">
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand">
            <Mail className="mr-2 h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="automation" className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand">
            <Zap className="mr-2 h-4 w-4" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="audiences" className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand">
            <Users className="mr-2 h-4 w-4" />
            Audiences
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-military-navy data-[state=active]:text-military-sand">
            <FileText className="mr-2 h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>
      
        {/* Campaigns Tab */}
        <TabsContent value="campaigns">
          {!showNewCampaign ? (
            <CampaignList
              campaigns={campaignData}
              onCreateCampaign={handleCreateCampaign}
              onEditCampaign={handleEditCampaign}
              onDeleteCampaign={handleDeleteCampaign}
              onCopyCampaign={handleCopyCampaign}
              onViewAnalytics={handleViewAnalytics}
            />
          ) : (
            <CampaignForm
              templates={templateData}
              segments={segments}
              onSubmit={handleCampaignSubmit}
              onCancel={handleCancelCampaign}
            />
          )}
        </TabsContent>
      
        {/* Automation Tab */}
        <TabsContent value="automation">
          <AutomationList />
        </TabsContent>
        
        {/* Audiences Tab */}
        <TabsContent value="audiences">
          <AudienceList segments={segments} />
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates">
          {!showTemplateForm ? (
            <TemplateList
              templates={templateData}
              onCreateTemplate={handleCreateTemplate}
              onEditTemplate={handleEditTemplate}
              onCopyTemplate={handleCopyTemplate}
              onDeleteTemplate={handleDeleteTemplate}
            />
          ) : (
            <TemplateForm
              template={currentTemplate}
              onSubmit={handleTemplateFormSubmit}
              onCancel={handleCancelTemplateForm}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailCampaignHQ;
