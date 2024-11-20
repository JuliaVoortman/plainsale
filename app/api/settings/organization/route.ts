import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, domain } = await req.json();

    const organization = await prisma.organization.update({
      where: { id: session.user.organizationId },
      data: { name, domain },
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.error("[ORGANIZATION_SETTINGS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}