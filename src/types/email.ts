<content>export interface EmailMessage {
  id: string;
  subject: string;
  from: string;
  to: string;
  content: string;
  date: Date;
  attachments?: Array<{
    filename: string;
    contentType: string;
    size: number;
    url: string;
  }>;
}

export interface EmailFilter {
  fromEmail?: string;
  domain?: string;
  dateFrom?: Date;
  dateTo?: Date;
  subject?: string;
}</content>