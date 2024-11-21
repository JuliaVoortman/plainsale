import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { validateAccess } from "@/lib/access-control";
import { sendEmail } from "@/lib/email";

export async function POST(
  req: Request,
  { params }: { params: { dealRoomId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate user has permission to invite
    const hasAccess = await validateAccess(params.dealRoomId, "ADMIN");
    if (!hasAccess) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { email, type } = await req.json();

    // Create or update access record
    const access = await prisma.dealRoomAccess.upsert({
      where: {
        dealRoomId_email: {
          dealRoomId: params.dealRoomId,
          email,
        },
      },
      update: {
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
      create: {
        email,
        type,
        dealRoomId: params.dealRoomId,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    const dealRoom = await prisma.dealRoom.findUnique({
      where: { id: params.dealRoomId },
      include: { organization: true },
    });

    // Send invitation email
    await sendEmail({
      to: email,
      subject: `You've been invited to ${dealRoom?.name}`,
      htmlBody: `
        <p>You've been invited to access a deal room from ${dealRoom?.organization.name}.</p>
        <p>Click the link below to access the deal room:</p>
        <p><a href="${process.env.NEXTAUTH_URL}/deal-rooms/${params.dealRoomId}/access">
          Access Deal Room
        </a></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DEAL_ROOM_INVITE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}