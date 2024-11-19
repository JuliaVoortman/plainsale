import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password, organizationName, organizationDomain } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    // Check if organization domain already exists
    const existingOrg = await prisma.organization.findUnique({
      where: { domain: organizationDomain },
    });

    if (existingOrg) {
      return new NextResponse("Organization already exists", { status: 400 });
    }

    // Create organization and user in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Create organization
      const organization = await prisma.organization.create({
        data: {
          name: organizationName,
          domain: organizationDomain,
        },
      });

      // Hash password
      const hashedPassword = await hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          organizationId: organization.id,
          role: "ADMIN", // First user is admin
        },
      });

      return { organization, user };
    });

    return NextResponse.json({
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}