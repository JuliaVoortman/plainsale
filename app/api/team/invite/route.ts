import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { email, role } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    // Create invitation token
    const token = crypto.randomUUID();
    const organization = await prisma.organization.findUnique({
      where: { id: session.user.organizationId },
      select: { name: true },
    });

    // Store invitation
    const invitation = await prisma.invitation.create({
      data: {
        email,
        role,
        token,
        organizationId: session.user.organizationId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Send invitation email
    try {
      await sendEmail({
        to: email,
        subject: `Invitation to join ${organization?.name} on Plainsale`,
        htmlBody: `
          <p>You've been invited to join ${organization?.name} on Plainsale.</p>
          <p>Click the link below to accept the invitation:</p>
          <p><a href="${process.env.NEXTAUTH_URL}/invite/${token}">Accept Invitation</a></p>
          <p>This invitation will expire in 7 days.</p>
        `,
      });
    } catch (error) {
      console.error("Failed to send invitation email:", error);
      // Continue without email sending
    }

    return NextResponse.json({
      success: true,
      invitation: {
        id: invitation.id,
        email: invitation.email,
        token: invitation.token,
      },
    });
  } catch (error) {
    console.error("[TEAM_INVITE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}