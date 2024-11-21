import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createTimelineEvent } from "@/lib/timeline";

export async function PATCH(
  req: Request,
  { params }: { params: { dealRoomId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { status } = await req.json();

    const dealRoom = await prisma.dealRoom.update({
      where: {
        id: params.dealRoomId,
        organizationId: session.user.organizationId,
      },
      data: { status },
    });

    // Create timeline event
    await createTimelineEvent({
      type: "STATUS_CHANGE",
      title: "Status changed",
      description: `Deal room status changed to ${status.toLowerCase()}`,
      metadata: {
        newStatus: status,
        previousStatus: dealRoom.status,
      },
      dealRoomId: params.dealRoomId,
      userId: session.user.id,
      isInternal: true, // Status changes are internal events
    });

    return NextResponse.json(dealRoom);
  } catch (error) {
    console.error("[DEAL_ROOM_STATUS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}