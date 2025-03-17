
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
};

export type TemplateFormValues = {
  name: string;
  category: string;
  content: string;
};
