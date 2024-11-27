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

    // Assuming you want to update some other field instead of status
    const { description } = await req.json();

    const dealRoom = await prisma.dealRoom.update({
      where: {
        id: params.dealRoomId,
        organizationId: session.user.organizationId,
      },
      data: { description },
    });

    // Create timeline event
    await createTimelineEvent({
      type: "STATUS_CHANGE",
      title: "Description changed",
      description: `Deal room description changed to ${description}`,
      metadata: {
        newDescription: description,
        previousDescription: dealRoom.description,
      },
      dealRoomId: params.dealRoomId,
      userId: session.user.id,
      isInternal: true, // Description changes are internal events
    });

    return NextResponse.json(dealRoom);
  } catch (error) {
    console.error("[DEAL_ROOM_DESCRIPTION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}