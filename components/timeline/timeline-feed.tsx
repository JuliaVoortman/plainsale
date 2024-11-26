"use client";

import { useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { TimelineEvent, User, Resource } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { TimelineEventIcon } from "./timeline-event-icon";
import { TimelineEventContent } from "./timeline-event-content";
import { useAtom } from 'jotai';
import { viewModeAtom } from '@/lib/atoms';

type TimelineEventWithRelations = TimelineEvent & {
  user: User;
  resource?: Resource | null;
};

interface TimelineFeedProps {
  initialEvents: TimelineEventWithRelations[];
  dealRoomId: string;
}

export function TimelineFeed({ initialEvents, dealRoomId }: TimelineFeedProps) {
  const [viewMode] = useAtom(viewModeAtom);
  const [events, setEvents] = useState<TimelineEventWithRelations[]>(initialEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  async function loadMoreEvents() {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const lastEvent = events[events.length - 1];
      const cursor = lastEvent?.id;

      const response = await fetch(
        `/api/deal-rooms/${dealRoomId}/timeline?cursor=${cursor}${viewMode === 'customer' ? '&customer=true' : ''}`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error();

      const data = await response.json();
      if (data.events.length === 0) {
        setHasMore(false);
        return;
      }

      setEvents((prev) => [...prev, ...data.events]);
    } catch (error) {
      console.error("Failed to load more events:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreEvents();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [events]);

  if (events.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-[#002447]/60">
          No timeline events yet
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => {
        const userInitials = event.user.name
          ?.split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        return (
          <Card key={event.id} className="p-4">
            <div className="flex gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={event.user.image || ""} alt={event.user.name || ""} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#002447]">
                    {event.user.name}
                  </span>
                  <TimelineEventIcon type={event.type} />
                  <TimelineEventContent event={event} />
                </div>
                <p className="text-sm text-[#002447]/60">
                  {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}
                </p>
                {event.description && (
                  <p className="text-sm text-[#002447]/80 mt-2">{event.description}</p>
                )}
              </div>
            </div>
          </Card>
        );
      })}

      <div ref={loadMoreRef} className="py-4 text-center">
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[#002447]/40" />
          </div>
        )}
        {!hasMore && events.length > 0 && (
          <p className="text-sm text-[#002447]/60">No more events</p>
        )}
      </div>
    </div>
  );
}