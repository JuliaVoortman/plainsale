import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Prevent self-deletion
    if (params.userId === session.user.id) {
      return new NextResponse("Cannot remove self", { status: 400 });
    }

    await prisma.user.delete({
      where: {
        id: params.userId,
        organizationId: session.user.organizationId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[TEAM_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}