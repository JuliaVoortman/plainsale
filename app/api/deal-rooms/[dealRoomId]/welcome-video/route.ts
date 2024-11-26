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

    const { videoUrl } = await req.json();

    // In a real app, you'd store the video URL in the user's profile
    // For now, we'll just create a timeline event
    await createTimelineEvent({
      type: "MILESTONE_REACHED",
      title: "Welcome video updated",
      dealRoomId: params.dealRoomId,
      userId: session.user.id,
      metadata: {
        videoUrl,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[WELCOME_VIDEO_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}