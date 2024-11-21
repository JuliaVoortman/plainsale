import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { validateProspectAccess } from "@/lib/access-control";
import { sendEmail } from "@/lib/email";

export async function POST(
  request: NextRequest,
  context: { params: { dealRoomId: string } }
) {
  try {
    const { email } = await request.json();

    // Check if email has access
    const hasAccess = await validateProspectAccess(context.params.dealRoomId, email);
    
    if (!hasAccess) {
      // Return success even if no access to prevent email enumeration
      return NextResponse.json({ success: true });
    }

    // Generate access token
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.dealRoomAccess.update({
      where: {
        dealRoomId_email: {
          dealRoomId: context.params.dealRoomId,
          email,
        },
      },
      data: {
        token,
        expiresAt,
      },
    });

    const dealRoom = await prisma.dealRoom.findUnique({
      where: { id: context.params.dealRoomId },
      include: { organization: true },
    });

    // Send magic link email
    await sendEmail({
      to: email,
      subject: `Access ${dealRoom?.name} Deal Room`,
      htmlBody: `
        <p>Click the link below to access the deal room:</p>
        <p><a href="${process.env.NEXTAUTH_URL}/deal-rooms/${context.params.dealRoomId}?access_token=${token}">
          Access Deal Room
        </a></p>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DEAL_ROOM_ACCESS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}