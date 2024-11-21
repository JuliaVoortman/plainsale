import { ServerClient } from "postmark";

// Initialize Postmark client if API token is available
const postmark = process.env.POSTMARK_API_TOKEN 
  ? new ServerClient(process.env.POSTMARK_API_TOKEN)
  : null;

interface SendEmailProps {
  to: string;
  subject: string;
  htmlBody: string;
}

export async function sendEmail({ to, subject, htmlBody }: SendEmailProps) {
  if (!postmark) {
    console.error("Postmark client not initialized");
    return;
  }

  try {
    await postmark.sendEmail({
      From: process.env.POSTMARK_FROM_EMAIL!,
      To: to,
      Subject: subject,
      HtmlBody: htmlBody,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}