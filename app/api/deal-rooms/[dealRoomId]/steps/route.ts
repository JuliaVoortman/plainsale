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

    const { stepId, completed } = await req.json();

    // In a real app, you'd store steps in the database
    // For now, we'll just create a timeline event
    await createTimelineEvent({
      type: completed ? "MILESTONE_REACHED" : "STATUS_CHANGE",
      title: completed ? "Step completed" : "Step unchecked",
      dealRoomId: params.dealRoomId,
      userId: session.user.id,
      metadata: {
        stepId,
        completed,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[STEPS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}