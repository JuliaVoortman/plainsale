import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { role } = await req.json();

    // Prevent changing own role
    if (params.userId === session.user.id) {
      return new NextResponse("Cannot change own role", { status: 400 });
    }

    const user = await prisma.user.update({
      where: {
        id: params.userId,
        organizationId: session.user.organizationId,
      },
      data: { role },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[TEAM_ROLE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}