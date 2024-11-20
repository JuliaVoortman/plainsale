import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createActivity } from "@/lib/activity";

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

    // Log activity
    await createActivity({
      type: "STATUS_CHANGE",
      dealRoomId: params.dealRoomId,
      userId: session.user.id,
      metadata: {
        newStatus: status,
      },
    });

    return NextResponse.json(dealRoom);
  } catch (error) {
    console.error("[DEAL_ROOM_STATUS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}