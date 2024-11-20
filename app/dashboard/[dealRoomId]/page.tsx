import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { DealRoomHeader } from "@/components/resources/deal-room-header";
import { ResourceGrid } from "@/components/resources/resource-grid";
import { ResourceUpload } from "@/components/resources/resource-upload";
import { ActivityTimeline } from "@/components/activity/activity-timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    title: `${dealRoom?.name || 'Deal Room'} - DealRoom`,
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
    },
  });

  if (!dealRoom) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <DealRoomHeader dealRoom={dealRoom} />
      
      <Tabs defaultValue="internal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="internal">Internal View</TabsTrigger>
          <TabsTrigger value="customer">Customer View</TabsTrigger>
        </TabsList>

        <TabsContent value="internal" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-7">
            <div className="md:col-span-5">
              <ResourceGrid resources={dealRoom.resources} />
            </div>
            <div className="md:col-span-2 space-y-4">
              <ResourceUpload dealRoomId={dealRoom.id} />
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <ActivityTimeline 
                  activities={dealRoom.activities} 
                  dealRoomId={dealRoom.id}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customer">
          <div className="max-w-5xl mx-auto">
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