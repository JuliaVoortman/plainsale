"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Resource, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import {
  FileUp,
  Trash2,
  UserPlus,
  UserMinus,
  RefreshCw,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type ActivityWithRelations = Activity & {
  user: User;
  resource?: Resource | null;
};

interface ActivityTimelineProps {
  activities: ActivityWithRelations[];
  dealRoomId: string;
}

export function ActivityTimeline({ activities: initialActivities, dealRoomId }: ActivityTimelineProps) {
  const [activities, setActivities] = useState<ActivityWithRelations[]>(initialActivities);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  async function loadMoreActivities() {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const lastActivity = activities[activities.length - 1];
      const cursor = lastActivity?.id;

      const response = await fetch(
        `/api/deal-rooms/${dealRoomId}/activities?cursor=${cursor}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch activities");

      const data = await response.json();
      if (data.activities.length === 0) {
        setHasMore(false);
        return;
      }

      setActivities((prev) => [...prev, ...data.activities]);
    } catch (error) {
      console.error("Failed to load more activities:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreActivities();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [activities]);

  function getActivityIcon(type: string) {
    switch (type) {
      case "RESOURCE_UPLOAD":
        return <FileUp className="h-4 w-4" />;
      case "RESOURCE_DELETE":
        return <Trash2 className="h-4 w-4" />;
      case "MEMBER_ADD":
        return <UserPlus className="h-4 w-4" />;
      case "MEMBER_REMOVE":
        return <UserMinus className="h-4 w-4" />;
      case "STATUS_CHANGE":
        return <RefreshCw className="h-4 w-4" />;
      case "COMMENT_ADD":
      case "COMMENT_DELETE":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return null;
    }
  }

  function getActivityMessage(activity: ActivityWithRelations) {
    const metadata = activity.metadata as any;
    switch (activity.type) {
      case "RESOURCE_UPLOAD":
        return `uploaded ${activity.resource?.name}`;
      case "RESOURCE_DELETE":
        return `deleted ${metadata?.resourceName}`;
      case "MEMBER_ADD":
        return `added ${metadata?.memberName} to the deal room`;
      case "MEMBER_REMOVE":
        return `removed ${metadata?.memberName} from the deal room`;
      case "STATUS_CHANGE":
        return `changed status to ${metadata?.newStatus.toLowerCase()}`;
      case "COMMENT_ADD":
        return `commented: "${metadata?.content}"`;
      case "COMMENT_DELETE":
        return `deleted a comment`;
      default:
        return "performed an action";
    }
  }

  if (activities.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-4">
        No activity yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const userInitials = activity.user.name
          ?.split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        return (
          <div key={activity.id} className="flex items-start gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.user.image || ""} alt={activity.user.name || ""} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">
                  {activity.user.name}
                </p>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {getActivityIcon(activity.type)}
                  <p className="text-sm">{getActivityMessage(activity)}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      })}

      <div ref={loadMoreRef} className="py-4 text-center">
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        {!hasMore && activities.length > 0 && (
          <p className="text-sm text-muted-foreground">No more activities</p>
        )}
      </div>
    </div>
  );
}