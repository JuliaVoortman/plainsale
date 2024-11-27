import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { generateDealRoomId } from "@/lib/utils";
import { createTimelineEvent } from "@/lib/timeline";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const dealRooms = await prisma.dealRoom.findMany({
      where: {
        organizationId: session.user.organizationId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(dealRooms);
  } catch (error) {
    console.error("[DEAL_ROOMS_GET]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, description, status } = await req.json();

    if (!name || !description || !status) {
      return NextResponse.json({ message: "Name, description, and status are required" }, { status: 400 });
    }

    const dealRoom = await prisma.dealRoom.create({
      data: {
        id: generateDealRoomId(), // Use our custom ID generator
        name,
        description,
        status, // Add the status field
        organizationId: session.user.organizationId,
        createdById: session.user.id,
        members: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    // Create initial timeline event
    await createTimelineEvent({
      type: "DEAL_CREATED",
      title: "Deal room created",
      dealRoomId: dealRoom.id,
      userId: session.user.id,
    });

    return NextResponse.json(dealRoom);
  } catch (error) {
    console.error("[DEAL_ROOMS_POST]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}