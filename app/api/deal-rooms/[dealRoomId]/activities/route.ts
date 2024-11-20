import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const ITEMS_PER_PAGE = 25;

export async function GET(
  req: Request,
  { params }: { params: { dealRoomId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");

    const activities = await prisma.activity.findMany({
      take: ITEMS_PER_PAGE,
      ...(cursor
        ? {
            skip: 1, // Skip the cursor
            cursor: {
              id: cursor,
            },
          }
        : {}),
      where: {
        dealRoomId: params.dealRoomId,
      },
      include: {
        user: true,
        resource: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ activities });
  } catch (error) {
    console.error("[ACTIVITIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}