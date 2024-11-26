"use client";

import { TimelineFeed } from "@/components/timeline/timeline-feed";
import { TimelineFilters } from "@/components/timeline/timeline-filters";
import { useEffect, useState } from "react";
import { TimelineEvent, User, Resource } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type TimelineEventWithRelations = TimelineEvent & {
  user: User;
  resource?: Resource | null;
};

interface TimelinePageProps {
  params: {
    dealRoomId: string;
  };
}

export default function TimelinePage({ params }: TimelinePageProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<TimelineEventWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session?.user) {
      router.push('/login');
      return;
    }

    async function fetchEvents() {
      try {
        const response = await fetch(`/api/deal-rooms/${params.dealRoomId}/timeline`);
        if (!response.ok) {
          if (response.status === 404) {
            router.push('/dashboard');
            return;
          }
          throw new Error();
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Failed to fetch timeline events:", error);
        router.push('/dashboard');
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, [params.dealRoomId, router, session, status]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#002447]/40" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5">
          <TimelineFeed initialEvents={events} dealRoomId={params.dealRoomId} />
        </div>
        <div className="md:col-span-2">
          <TimelineFilters />
        </div>
      </div>
    </div>
  );
}