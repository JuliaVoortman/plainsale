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
      select: {
        background: true,
      },
    });

    return NextResponse.json(dealRoom?.background || { color: '#ffffff', pattern: 'none' });
  } catch (error) {
    console.error("[BACKGROUND_GET]", error);
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

    const background = await req.json();

    const dealRoom = await prisma.dealRoom.update({
      where: {
        id: params.dealRoomId,
        organizationId: session.user.organizationId,
      },
      data: {
        background,
      },
    });

    return NextResponse.json(dealRoom);
  } catch (error) {
    console.error("[BACKGROUND_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
