import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
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
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, description } = await req.json();

    const dealRoom = await prisma.dealRoom.create({
      data: {
        name,
        description,
        organizationId: session.user.organizationId,
        createdById: session.user.id,
        members: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return NextResponse.json(dealRoom);
  } catch (error) {
    console.error("[DEAL_ROOMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}