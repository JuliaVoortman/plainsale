import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { DealRoomHeader } from "@/components/deal-room/deal-room-header";
import { ResourceGrid } from "@/components/resources/resource-grid";
import { ResourceUpload } from "@/components/resources/resource-upload";
import { ActivityTimeline } from "@/components/activity/activity-timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface DealRoomPageProps {
  params: {
    dealRoomId: string;
  };
}

export async function generateMetadata({ params }: DealRoomPageProps): Promise<Metadata> {
  const dealRoom = await prisma.dealRoom.findUnique({
    where: { id: params.dealRoomId },
  });

  return {
    title: `${dealRoom?.name || 'Deal Room'} - Plainsale`,
    description: dealRoom?.description,
  };
}

export default async function DealRoomPage({ params }: DealRoomPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    notFound();
  }

  const dealRoom = await prisma.dealRoom.findUnique({
    where: { 
      id: params.dealRoomId,
      organizationId: session.user.organizationId,
    },
    include: {
      resources: {
        orderBy: { createdAt: 'desc' },
      },
      activities: {
        include: {
          user: true,
          resource: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 25,
      },
      members: true,
    },
  });

  if (!dealRoom) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <DealRoomHeader dealRoom={dealRoom} />
      
      <Tabs defaultValue="internal" className="space-y-6">
        <div className="sticky top-[65px] z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container flex h-14 max-w-screen-2xl items-center">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1">
              <TabsTrigger value="internal" className="text-[#002447]">Internal View</TabsTrigger>
              <TabsTrigger value="customer" className="text-[#002447]">Customer View</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="internal" className="space-y-6">
          <div className="container grid gap-6 md:grid-cols-7">
            <div className="md:col-span-5">
              <ResourceGrid resources={dealRoom.resources} />
            </div>
            <div className="md:col-span-2 space-y-6">
              <ResourceUpload dealRoomId={dealRoom.id} />
              <Card className="p-6">
                <h3 className="font-semibold text-[#002447] mb-4 flex items-center gap-2">
                  Recent Activity
                </h3>
                <ActivityTimeline 
                  activities={dealRoom.activities} 
                  dealRoomId={dealRoom.id}
                />
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customer">
          <div className="container max-w-5xl mx-auto">
            <ResourceGrid 
              resources={dealRoom.resources} 
              isCustomerView={true}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}