import { ServerClient } from 'postmark';
import { z } from 'zod';

const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  templateAlias: z.string(),
  templateModel: z.record(z.any())
});

export class EmailService {
  private static instance: EmailService;
  private client: ServerClient;

  private constructor() {
    this.client = client;
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendDealRoomInvitation({
    to,
    dealRoomName,
    inviterName,
    inviteLink
  }: {
    to: string;
    dealRoomName: string;
    inviterName: string;
    inviteLink: string;
  }) {
    await this.sendTemplatedEmail({
      to,
      subject: `You've been invited to ${dealRoomName}`,
      templateAlias: 'deal-room-invitation',
      templateModel: {
        dealRoomName,
        inviterName,
        inviteLink,
        productName: process.env.NEXT_PUBLIC_APP_NAME
      }
    });
  }

  async sendAccountVerification({
    to,
    verificationLink
  }: {
    to: string;
    verificationLink: string;
  }) {
    await this.sendTemplatedEmail({
      to,
      subject: 'Verify your account',
      templateAlias: 'account-verification',
      templateModel: {
        verificationLink,
        productName: process.env.NEXT_PUBLIC_APP_NAME
      }
    });
  }

  private async sendTemplatedEmail(data: z.infer<typeof emailSchema>) {
    const validated = emailSchema.parse(data);
    
    await this.client.sendEmailWithTemplate({
      From: process.env.POSTMARK_FROM_EMAIL!,
      To: validated.to,
      TemplateAlias: validated.templateAlias,
      TemplateModel: validated.templateModel
    });
  }
}