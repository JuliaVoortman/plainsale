import { prisma } from "@/lib/prisma";

type ActivityType = 
  | "RESOURCE_UPLOAD"
  | "RESOURCE_DELETE"
  | "MEMBER_ADD"
  | "MEMBER_REMOVE"
  | "STATUS_CHANGE"
  | "COMMENT_ADD"
  | "COMMENT_DELETE";

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