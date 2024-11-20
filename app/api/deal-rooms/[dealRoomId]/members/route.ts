import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createActivity } from "@/lib/activity";

export async function POST(
  req: Request,
  { params }: { params: { dealRoomId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userId } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    const dealRoom = await prisma.dealRoom.update({
      where: {
        id: params.dealRoomId,
        organizationId: session.user.organizationId,
      },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });

    // Log activity
    await createActivity({
      type: "MEMBER_ADD",
      dealRoomId: params.dealRoomId,
      userId: session.user.id,
      metadata: {
        memberName: user?.name,
        memberId: userId,
      },
    });

    return NextResponse.json(dealRoom);
  } catch (error) {
    console.error("[DEAL_ROOM_MEMBERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { dealRoomId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userId } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    const dealRoom = await prisma.dealRoom.update({
      where: {
        id: params.dealRoomId,
        organizationId: session.user.organizationId,
      },
      data: {
        members: {
          disconnect: { id: userId },
        },
      },
    });

    // Log activity
    await createActivity({
      type: "MEMBER_REMOVE",
      dealRoomId: params.dealRoomId,
      userId: session.user.id,
      metadata: {
        memberName: user?.name,
        memberId: userId,
      },
    });

    return NextResponse.json(dealRoom);
  } catch (error) {
    console.error("[DEAL_ROOM_MEMBERS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}