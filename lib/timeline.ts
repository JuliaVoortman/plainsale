import { prisma } from "@/lib/prisma";
import { TimelineEventType } from "@prisma/client";

interface CreateTimelineEventProps {
  type: TimelineEventType;
  title: string;
  description?: string;
  metadata?: any;
  isInternal?: boolean;
  dealRoomId: string;
  userId: string;
  resourceId?: string;
}

export async function createTimelineEvent({
  type,
  title,
  description,
  metadata,
  isInternal = false,
  dealRoomId,
  userId,
  resourceId,
}: CreateTimelineEventProps) {
  return prisma.timelineEvent.create({
    data: {
      type,
      title,
      description,
      metadata,
      isInternal,
      dealRoomId,
      userId,
      resourceId,
    },
    include: {
      user: true,
      resource: true,
    },
  });
}