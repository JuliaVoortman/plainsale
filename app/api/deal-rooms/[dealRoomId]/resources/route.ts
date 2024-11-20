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

    const { name, type, url } = await req.json();

    const resource = await prisma.resource.create({
      data: {
        name,
        type,
        url,
        dealRoomId: params.dealRoomId,
      },
    });

    // Log activity
    await createActivity({
      type: "RESOURCE_UPLOAD",
      dealRoomId: params.dealRoomId,
      userId: session.user.id,
      resourceId: resource.id,
    });

    return NextResponse.json(resource);
  } catch (error) {
    console.error("[RESOURCES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}