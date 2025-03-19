
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, Users, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type CommunicationHeadquartersProps = {
  onAction?: (action: string) => void;
};

const CommunicationHeadquarters = ({ onAction = () => {} }: CommunicationHeadquartersProps) => {
  const { toast } = useToast();
  const [newAnnouncementOpen, setNewAnnouncementOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [moderateDialogOpen, setModerateDialogOpen] = useState(false);
  
  const handleNewAnnouncement = () => {
    setNewAnnouncementOpen(true);
  };

  const handleSendAnnouncement = () => {
    toast({
      title: "Announcement Created",
      description: "Your announcement has been created and scheduled for delivery.",
    });
    setNewAnnouncementOpen(false);
    onAction("Created new announcement");
  };

  const handleMessageGroup = (groupName: string) => {
    setSelectedGroup(groupName);
    setMessageDialogOpen(true);
  };

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedGroup}.`,
    });
    setMessageDialogOpen(false);
    onAction(`Sent message to ${selectedGroup}`);
  };

  const handleViewAnnouncement = (announcement: string) => {
    setSelectedAnnouncement(announcement);
    setViewDialogOpen(true);
  };

  const handleEditAnnouncement = (announcement: string) => {
    setSelectedAnnouncement(announcement);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    toast({
      title: "Announcement Updated",
      description: "Your announcement has been updated successfully.",
    });
    setEditDialogOpen(false);
    onAction(`Edited announcement: ${selectedAnnouncement}`);
  };

  const handleModerate = (forum: string) => {
    setSelectedAnnouncement(forum);
    setModerateDialogOpen(true);
  };

  const handleSaveModeration = () => {
    toast({
      title: "Moderation Complete",
      description: "The forum has been moderated successfully.",
    });
    setModerateDialogOpen(false);
    onAction(`Moderated forum: ${selectedAnnouncement}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-military-navy">
          Communication Headquarters
        </h2>
        <Button 
          className="bg-military-navy hover:bg-military-navy/90"
          onClick={handleNewAnnouncement}
        >
          <Bell className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-military-olive" />
              Announcements
            </CardTitle>
            <CardDescription>Program-wide communication management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3 bg-military-navy/5">
                <p className="font-medium">Cohort #8 Midpoint Review Schedule</p>
                <p className="text-sm text-muted-foreground">Sent 2 days ago to Cohort #8</p>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-xs text-military-olive">Opened by 28/32 participants</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewAnnouncement("Cohort #8 Midpoint Review Schedule")}
                  >
                    View
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-3">
                <p className="font-medium">Guest Speaker Series: Veteran Entrepreneurs</p>
                <p className="text-sm text-muted-foreground">Scheduled to send tomorrow at 09:00</p>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">All active participants</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditAnnouncement("Guest Speaker Series: Veteran Entrepreneurs")}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-3">
                <p className="font-medium">Financial Planning Module Updates</p>
                <p className="text-sm text-muted-foreground">Draft - Not scheduled</p>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Target: Cohort #8</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditAnnouncement("Financial Planning Module Updates")}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-military-olive" />
              Direct Messaging
            </CardTitle>
            <CardDescription>Individual and group communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="h-10 w-10 rounded-full bg-military-navy flex items-center justify-center">
                  <Users className="h-5 w-5 text-military-sand" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">At-Risk Participants</p>
                  <p className="text-sm text-muted-foreground">5 members</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleMessageGroup("At-Risk Participants")}
                >
                  Message
                </Button>
              </div>
              
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="h-10 w-10 rounded-full bg-military-navy flex items-center justify-center">
                  <Users className="h-5 w-5 text-military-sand" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Mentors & Instructors</p>
                  <p className="text-sm text-muted-foreground">12 members</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleMessageGroup("Mentors & Instructors")}
                >
                  Message
                </Button>
              </div>
              
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="h-10 w-10 rounded-full bg-military-navy flex items-center justify-center">
                  <Users className="h-5 w-5 text-military-sand" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Cohort #8 - Team Alpha</p>
                  <p className="text-sm text-muted-foreground">8 members</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleMessageGroup("Cohort #8 - Team Alpha")}
                >
                  Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Forum Moderation</CardTitle>
          <CardDescription>Monitor and manage participant discussions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">Business Plan Feedback</p>
                  <span className="rounded-full bg-military-red px-2 py-0.5 text-xs text-white">Requires Review</span>
                </div>
                <p className="text-sm text-muted-foreground">32 posts, 5 flagged for review</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => handleModerate("Business Plan Feedback")}
              >
                Moderate
              </Button>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">Marketing Strategy Discussion</p>
                <p className="text-sm text-muted-foreground">48 posts, no issues</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => handleViewAnnouncement("Marketing Strategy Discussion")}
              >
                View
              </Button>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">Veteran Success Stories</p>
                <p className="text-sm text-muted-foreground">24 posts, no issues</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => handleViewAnnouncement("Veteran Success Stories")}
              >
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Announcement Dialog */}
      <Dialog open={newAnnouncementOpen} onOpenChange={setNewAnnouncementOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Announcement</DialogTitle>
            <DialogDescription>
              Create a new announcement to send to program participants.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Announcement Title</label>
              <Input id="title" placeholder="Enter title..." />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea 
                id="message" 
                placeholder="Enter announcement content..."
                className="min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="audience" className="text-sm font-medium">Target Audience</label>
              <Input id="audience" placeholder="e.g., All Participants, Cohort #8, etc." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewAnnouncementOpen(false)}>Cancel</Button>
            <Button 
              className="bg-military-navy hover:bg-military-navy/90"
              onClick={handleSendAnnouncement}
            >
              Create Announcement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Group Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Message to {selectedGroup}</DialogTitle>
            <DialogDescription>
              Send a direct message to all members of this group.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <Input id="subject" placeholder="Enter message subject..." />
            </div>
            <div className="space-y-2">
              <label htmlFor="groupMessage" className="text-sm font-medium">Message</label>
              <Textarea 
                id="groupMessage" 
                placeholder="Enter your message..."
                className="min-h-[150px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-military-navy hover:bg-military-navy/90"
              onClick={handleSendMessage}
            >
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Announcement/Forum Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedAnnouncement}</DialogTitle>
            <DialogDescription>
              Viewing details and metrics.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg border p-3">
              <h3 className="font-medium mb-2">Content</h3>
              <p className="text-sm">
                This is the content of the {selectedAnnouncement}. In a real application, 
                this would display the actual content and details of the announcement or forum thread.
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <h3 className="font-medium mb-2">Metrics & Engagement</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Delivery Status:</p>
                  <p>Delivered</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Open Rate:</p>
                  <p>87.5% (28/32)</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Click Rate:</p>
                  <p>62.5% (20/32)</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Responses:</p>
                  <p>12</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Announcement Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
            <DialogDescription>
              Make changes to the "{selectedAnnouncement}" announcement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="editTitle" className="text-sm font-medium">Announcement Title</label>
              <Input id="editTitle" defaultValue={selectedAnnouncement} />
            </div>
            <div className="space-y-2">
              <label htmlFor="editMessage" className="text-sm font-medium">Message</label>
              <Textarea 
                id="editMessage" 
                defaultValue="This is sample content for the announcement. In a real application, this would be loaded from a database."
                className="min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="editAudience" className="text-sm font-medium">Target Audience</label>
              <Input id="editAudience" defaultValue="All active participants" />
            </div>
            <div className="space-y-2">
              <label htmlFor="scheduledDate" className="text-sm font-medium">Scheduled Date</label>
              <Input id="scheduledDate" type="datetime-local" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-military-navy hover:bg-military-navy/90"
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Moderate Forum Dialog */}
      <Dialog open={moderateDialogOpen} onOpenChange={setModerateDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Moderate: {selectedAnnouncement}</DialogTitle>
            <DialogDescription>
              Review and moderate flagged posts in this forum.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg border p-3 bg-red-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
                </div>
                <span className="rounded-full bg-military-red px-2 py-0.5 text-xs text-white">Flagged</span>
              </div>
              <p className="text-sm mb-2">
                This is a flagged post that contains inappropriate content that needs moderation.
                In a real application, this would be actual user content.
              </p>
              <div className="flex space-x-2 justify-end">
                <Button variant="outline" size="sm">Approve</Button>
                <Button variant="destructive" size="sm">Remove</Button>
              </div>
            </div>
            
            <div className="rounded-lg border p-3 bg-red-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-xs text-muted-foreground">Posted 3 days ago</p>
                </div>
                <span className="rounded-full bg-military-red px-2 py-0.5 text-xs text-white">Flagged</span>
              </div>
              <p className="text-sm mb-2">
                Another flagged post example that might contain content against community guidelines.
              </p>
              <div className="flex space-x-2 justify-end">
                <Button variant="outline" size="sm">Approve</Button>
                <Button variant="destructive" size="sm">Remove</Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModerateDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-military-navy hover:bg-military-navy/90"
              onClick={handleSaveModeration}
            >
              Complete Moderation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunicationHeadquarters;
