import { Automation, Campaign, EmailTemplate, Segment, Attachment, SOPLink } from "./types";

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

// Mock attachments for templates
const mockAttachments: Attachment[] = [
  { id: 1, name: "welcome-guide.pdf", fileSize: "1.2 MB", fileType: "PDF", url: "/documents/welcome-guide.pdf" },
  { id: 2, name: "business-plan-template.docx", fileSize: "450 KB", fileType: "DOCX", url: "/documents/business-plan-template.docx" },
  { id: 3, name: "resource-handbook.pdf", fileSize: "3.5 MB", fileType: "PDF", url: "/documents/resource-handbook.pdf" },
  { id: 4, name: "checklist.pdf", fileSize: "280 KB", fileType: "PDF", url: "/documents/checklist.pdf" },
];

// Mock SOP links
const mockSOPLinks: SOPLink[] = [
  { id: 1, title: "Onboarding Procedures", description: "Standard operating procedures for onboarding new participants", url: "/sop/onboarding" },
  { id: 2, title: "Business Plan Template", description: "Official template for creating a business plan", url: "/sop/business-plan" },
  { id: 3, title: "Graduation Requirements", description: "Checklist of graduation requirements", url: "/sop/graduation" },
];

// Mock data for templates
export const templates: EmailTemplate[] = [
  { 
    id: 1, 
    name: "Mission Briefing", 
    category: "Newsletter", 
    lastUsed: "2023-08-12",
    content: "<p>Dear Veteran,</p><p>Here's your weekly mission briefing with updates on what's happening in the program.</p><p>Regards,<br>Veteran Ops Command</p>",
    attachments: [mockAttachments[2]]
  },
  { 
    id: 2, 
    name: "Welcome Sequence", 
    category: "Automation", 
    lastUsed: "2023-08-15",
    content: "<p>Welcome to Veteran Ops!</p><p>We're excited to have you join our program. Here's what you need to know to get started...</p><p>Stay strong,<br>Veteran Ops Team</p>",
    attachments: [mockAttachments[0]],
    sopLinks: [mockSOPLinks[0], mockSOPLinks[1]]
  },
  { 
    id: 3, 
    name: "Resource Announcement", 
    category: "Announcement", 
    lastUsed: "2023-07-28",
    content: "<p>New resources available!</p><p>We've just added new training materials to help you on your journey. Check them out in your dashboard.</p><p>Best,<br>Veteran Ops Resource Team</p>",
    sopLinks: [mockSOPLinks[2]]
  },
  { 
    id: 4, 
    name: "Graduation Countdown", 
    category: "Automation", 
    lastUsed: "2023-08-14",
    content: "<p>Graduation is approaching!</p><p>You're almost at the finish line. Here's what you need to prepare for your graduation.</p><p>Congratulations,<br>Veteran Ops Graduation Committee</p>",
    attachments: [mockAttachments[3]],
    sopLinks: [mockSOPLinks[2]]
  },
  { 
    id: 5, 
    name: "Feedback Request", 
    category: "Engagement", 
    lastUsed: "2023-08-05",
    content: "<p>We value your feedback!</p><p>Please take a moment to share your thoughts on your experience with the program so far.</p><p>Thank you,<br>Veteran Ops Team</p>"
  },
];

// Mock data for automations
export const automations: Automation[] = [
  {
    id: 1,
    name: "Welcome Sequence",
    status: "active",
    trigger: "New participant registration",
    emailCount: 4,
    duration: 14,
    sent: 320,
    opened: 258,
    clicked: 186,
    steps: [
      { id: 1, order: 1, delayDays: 0, emailName: "Welcome Email" },
      { id: 2, order: 2, delayDays: 3, emailName: "Getting Started Guide" },
      { id: 3, order: 3, delayDays: 7, emailName: "First Check-in" },
      { id: 4, order: 4, delayDays: 14, emailName: "Resources Overview" }
    ]
  },
  {
    id: 2,
    name: "Graduation Countdown",
    status: "active",
    trigger: "30 days before graduation",
    emailCount: 5,
    duration: 30,
    sent: 64,
    opened: 58,
    clicked: 42,
    steps: [
      { id: 1, order: 1, delayDays: 0, emailName: "Graduation Announcement" },
      { id: 2, order: 2, delayDays: 7, emailName: "Preparation Guidelines" },
      { id: 3, order: 3, delayDays: 14, emailName: "Final Requirements" },
      { id: 4, order: 4, delayDays: 21, emailName: "Ceremony Details" },
      { id: 5, order: 5, delayDays: 30, emailName: "Congratulations" }
    ]
  },
  {
    id: 3,
    name: "Inactive Recovery",
    status: "draft",
    trigger: "No login for 14 days",
    emailCount: 3,
    duration: 10,
    steps: [
      { id: 1, order: 1, delayDays: 0, emailName: "We Miss You" },
      { id: 2, order: 2, delayDays: 5, emailName: "Re-engagement Offer" },
      { id: 3, order: 3, delayDays: 10, emailName: "Final Check-in" }
    ]
  }
];
