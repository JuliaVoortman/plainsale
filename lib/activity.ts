import { prisma } from "@/lib/prisma";
import { ActivityType } from "@prisma/client";

interface CreateActivityProps {
  type: ActivityType;
  dealRoomId: string;
  userId: string;
  resourceId?: string;
  metadata?: any;
}

export async function createActivity({
  type,
  dealRoomId,
  userId,
  resourceId,
  metadata,
}: CreateActivityProps) {
  return prisma.activity.create({
    data: {
      type,
      dealRoomId,
      userId,
      resourceId,
      metadata,
    },
    include: {
      user: true,
      resource: true,
    },
  });
}