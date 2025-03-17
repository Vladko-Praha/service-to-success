
import { Campaign, EmailTemplate, Segment } from "./types";

// Mock data for campaigns
export const campaigns: Campaign[] = [
  { 
    id: 1, 
    name: "Welcome to Veteran Ops", 
    status: "active", 
    type: "automation", 
    sent: 320, 
    opened: 258, 
    clicked: 186, 
    lastSent: "2023-08-15" 
  },
  { 
    id: 2, 
    name: "Mission Briefing: August Edition", 
    status: "draft", 
    type: "campaign", 
    sent: 0, 
    opened: 0, 
    clicked: 0, 
    lastSent: "-" 
  },
  { 
    id: 3, 
    name: "Business Training Resources", 
    status: "completed", 
    type: "campaign", 
    sent: 156, 
    opened: 132, 
    clicked: 98, 
    lastSent: "2023-08-10" 
  },
  { 
    id: 4, 
    name: "Graduation Countdown", 
    status: "active", 
    type: "automation", 
    sent: 64, 
    opened: 58, 
    clicked: 42, 
    lastSent: "2023-08-14" 
  },
  { 
    id: 5, 
    name: "Job Placement Opportunities", 
    status: "scheduled", 
    type: "campaign", 
    sent: 0, 
    opened: 0, 
    clicked: 0, 
    lastSent: "Scheduled for 2023-08-20" 
  },
];

// Mock data for segments
export const segments: Segment[] = [
  { id: 1, name: "All Participants", count: 498, description: "All active program participants" },
  { id: 2, name: "Cohort #8", count: 124, description: "Current cohort participants" },
  { id: 3, name: "Progress > 75%", count: 186, description: "Participants with over 75% program completion" },
  { id: 4, name: "Business Plan Submitted", count: 142, description: "Participants who submitted business plans" },
  { id: 5, name: "Inactive > 14 Days", count: 28, description: "Participants inactive for more than 14 days" },
];

// Mock data for templates
export const templates: EmailTemplate[] = [
  { id: 1, name: "Mission Briefing", category: "Newsletter", lastUsed: "2023-08-12" },
  { id: 2, name: "Welcome Sequence", category: "Automation", lastUsed: "2023-08-15" },
  { id: 3, name: "Resource Announcement", category: "Announcement", lastUsed: "2023-07-28" },
  { id: 4, name: "Graduation Countdown", category: "Automation", lastUsed: "2023-08-14" },
  { id: 5, name: "Feedback Request", category: "Engagement", lastUsed: "2023-08-05" },
];
