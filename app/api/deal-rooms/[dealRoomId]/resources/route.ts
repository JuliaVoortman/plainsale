import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createTimelineEvent } from "@/lib/timeline";

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

    // Create timeline event
    await createTimelineEvent({
      type: "RESOURCE_ADDED",
      title: "Resource added",
      description: `Added ${name}`,
      metadata: {
        resourceName: name,
        resourceType: type,
        actionUrl: url,
      },
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

export async function DELETE(
  req: Request,
  { params }: { params: { dealRoomId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { resourceId, resourceName } = await req.json();

    await prisma.resource.delete({
      where: {
        id: resourceId,
        dealRoomId: params.dealRoomId,
      },
    });

    // Create timeline event
    await createTimelineEvent({
      type: "RESOURCE_REMOVED",
      title: "Resource removed",
      description: `Removed ${resourceName}`,
      metadata: {
        resourceName,
        resourceId,
      },
      dealRoomId: params.dealRoomId,
      userId: session.user.id,
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[RESOURCES_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}