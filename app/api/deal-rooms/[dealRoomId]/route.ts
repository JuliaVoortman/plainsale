import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { dealRoomId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dealRoom = await prisma.dealRoom.findUnique({
      where: { 
        id: params.dealRoomId,
        organizationId: session.user.organizationId,
      },
      include: {
        members: true,
        organization: true,
        createdBy: true,
        resources: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        activities: {
          include: {
            user: true,
            resource: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 25
        }
      },
    });

    if (!dealRoom) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(dealRoom);
  } catch (error) {
    console.error("[DEAL_ROOM_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { dealRoomId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, description, status } = await req.json();

    const dealRoom = await prisma.dealRoom.update({
      where: {
        id: params.dealRoomId,
        organizationId: session.user.organizationId,
      },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(status && { status }),
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(dealRoom);
  } catch (error) {
    console.error("[DEAL_ROOM_PATCH]", error);
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

    await prisma.dealRoom.delete({
      where: {
        id: params.dealRoomId,
        organizationId: session.user.organizationId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DEAL_ROOM_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}