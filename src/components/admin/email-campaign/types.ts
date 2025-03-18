
export type Campaign = {
  id: number;
  name: string;
  status: "active" | "draft" | "completed" | "scheduled";
  type: "automation" | "campaign";
  sent: number;
  opened: number;
  clicked: number;
  lastSent: string;
};

export type Segment = {
  id: number;
  name: string;
  count: number;
  description: string;
};

export type EmailTemplate = {
  id: number;
  name: string;
  category: string;
  lastUsed: string;
  content?: string;
  attachments?: Attachment[];
  sopLinks?: SOPLink[];
};

export type Attachment = {
  id: number;
  name: string;
  fileSize: string;
  fileType: string;
  url: string;
};

export type SOPLink = {
  id: number;
  title: string;
  description: string;
  url: string;
};

export type EmailFormValues = {
  name: string;
  subject: string;
  fromName: string;
  fromEmail: string;
  segment: string;
  content?: string;
  scheduledDate?: string;
  templateId?: string;
  attachments?: Attachment[];
  sopLinks?: SOPLink[];
};

export type TemplateFormValues = {
  name: string;
  category: string;
  content: string;
  attachments?: Attachment[];
  sopLinks?: SOPLink[];
};

export type Automation = {
  id: number;
  name: string;
  status: "active" | "draft";
  trigger: string;
  emailCount: number;
  duration: number;
  sent?: number;
  opened?: number;
  clicked?: number;
  steps: AutomationStep[];
  tags?: string[];
};

export type AutomationStep = {
  id: number;
  order: number;
  delayDays: number;
  emailName: string;
};

export type AutomationFormValues = {
  name: string;
  trigger: string;
  status: "active" | "draft";
  steps: AutomationStepInput[];
  tags: string[];
};

export type AutomationStepInput = {
  delayDays: number;
  emailName: string;
};
