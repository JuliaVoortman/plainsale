import { TimelineFeed } from "@/components/timeline/timeline-feed";
import { TimelineFilters } from "@/components/timeline/timeline-filters";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

interface TimelinePageProps {
  params: {
    dealRoomId: string;
  };
}

export default async function TimelinePage({ params }: TimelinePageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    notFound();
  }

  const events = await prisma.timelineEvent.findMany({
    where: {
      dealRoomId: params.dealRoomId,
    },
    include: {
      user: true,
      resource: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 25,
  });

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