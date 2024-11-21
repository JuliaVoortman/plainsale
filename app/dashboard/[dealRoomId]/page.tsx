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
import { CalendarDays, FileText, Mail, Timer } from "lucide-react";

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
    <div className="flex-1 bg-white">
      <DealRoomHeader dealRoom={dealRoom} />
      
      <Tabs defaultValue="internal" className="space-y-6">
        <div className="sticky top-[65px] z-40 bg-white border-b">
          <div className="container mx-auto px-4">
            <TabsList className="h-14">
              <TabsTrigger value="internal" className="text-[#002447]">Internal View</TabsTrigger>
              <TabsTrigger value="customer" className="text-[#002447]">Customer View</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="internal">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="timeline" className="space-y-6">
              <TabsList className="w-full justify-start border-b rounded-none p-0 h-12">
                <TabsTrigger value="timeline" className="data-[state=active]:border-b-2 data-[state=active]:border-[#002447] rounded-none">
                  <Timer className="mr-2 h-4 w-4" />
                  Timeline
                </TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:border-b-2 data-[state=active]:border-[#002447] rounded-none">
                  <FileText className="mr-2 h-4 w-4" />
                  Resources
                </TabsTrigger>
                <TabsTrigger value="meetings" className="data-[state=active]:border-b-2 data-[state=active]:border-[#002447] rounded-none">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Meetings
                </TabsTrigger>
                <TabsTrigger value="emails" className="data-[state=active]:border-b-2 data-[state=active]:border-[#002447] rounded-none">
                  <Mail className="mr-2 h-4 w-4" />
                  Emails
                </TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="mt-6">
                <ActivityTimeline 
                  activities={dealRoom.activities} 
                  dealRoomId={dealRoom.id}
                />
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <div className="grid gap-6 md:grid-cols-7">
                  <div className="md:col-span-5">
                    <ResourceGrid resources={dealRoom.resources} />
                  </div>
                  <div className="md:col-span-2">
                    <ResourceUpload dealRoomId={dealRoom.id} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="meetings" className="mt-6">
                <Card className="p-6">
                  <p className="text-center text-[#002447]/60">
                    Meeting scheduling coming soon
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="emails" className="mt-6">
                <Card className="p-6">
                  <p className="text-center text-[#002447]/60">
                    Email integration coming soon
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>

        <TabsContent value="customer">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="resources" className="space-y-6">
              <TabsList className="w-full justify-start border-b rounded-none p-0 h-12">
                <TabsTrigger value="resources" className="data-[state=active]:border-b-2 data-[state=active]:border-[#002447] rounded-none">
                  <FileText className="mr-2 h-4 w-4" />
                  Resources
                </TabsTrigger>
                <TabsTrigger value="meetings" className="data-[state=active]:border-b-2 data-[state=active]:border-[#002447] rounded-none">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Meetings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="resources" className="mt-6">
                <ResourceGrid 
                  resources={dealRoom.resources} 
                  isCustomerView={true}
                />
              </TabsContent>

              <TabsContent value="meetings" className="mt-6">
                <Card className="p-6">
                  <p className="text-center text-[#002447]/60">
                    Meeting scheduling coming soon
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}