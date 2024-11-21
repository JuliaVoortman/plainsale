import { AccessRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

interface AccessControl {
  canView: boolean;
  canEdit: boolean;
  canManage: boolean;
  canInvite: boolean;
}

export async function getDealRoomAccess(dealRoomId: string): Promise<AccessControl> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return {
      canView: false,
      canEdit: false,
      canManage: false,
      canInvite: false,
    };
  }

  // Check if user is org admin
  if (session.user.role === "ADMIN") {
    return {
      canView: true,
      canEdit: true,
      canManage: true,
      canInvite: true,
    };
  }

  // Get user's role for this deal room
  const userRole = await prisma.dealRoomRole.findUnique({
    where: {
      userId_dealRoomId: {
        userId: session.user.id,
        dealRoomId,
      },
    },
  });

  if (!userRole) {
    return {
      canView: false,
      canEdit: false,
      canManage: false,
      canInvite: false,
    };
  }

  switch (userRole.role) {
    case "OWNER":
      return {
        canView: true,
        canEdit: true,
        canManage: true,
        canInvite: true,
      };
    case "ADMIN":
      return {
        canView: true,
        canEdit: true,
        canManage: true,
        canInvite: true,
      };
    case "EDITOR":
      return {
        canView: true,
        canEdit: true,
        canManage: false,
        canInvite: false,
      };
    case "VIEWER":
      return {
        canView: true,
        canEdit: false,
        canManage: false,
        canInvite: false,
      };
    default:
      return {
        canView: false,
        canEdit: false,
        canManage: false,
        canInvite: false,
      };
  }
}

export async function validateAccess(
  dealRoomId: string,
  requiredRole: AccessRole
): Promise<boolean> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return false;
  }

  // Organization admins always have full access
  if (session.user.role === "ADMIN") {
    return true;
  }

  const userRole = await prisma.dealRoomRole.findUnique({
    where: {
      userId_dealRoomId: {
        userId: session.user.id,
        dealRoomId,
      },
    },
  });

  if (!userRole) {
    return false;
  }

  const roleHierarchy: { [key in AccessRole]: number } = {
    OWNER: 4,
    ADMIN: 3,
    EDITOR: 2,
    VIEWER: 1,
  };

  return roleHierarchy[userRole.role] >= roleHierarchy[requiredRole];
}

export async function validateProspectAccess(
  dealRoomId: string,
  email: string
): Promise<boolean> {
  const access = await prisma.dealRoomAccess.findFirst({
    where: {
      dealRoomId,
      email,
      type: "PROSPECT",
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  return !!access;
}