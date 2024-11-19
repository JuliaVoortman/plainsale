import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ResourceList } from "@/components/resources/resource-list";
import { ResourceUpload } from "@/components/resources/resource-upload";
import { DealRoomHeader } from "@/components/resources/deal-room-header";

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
  const dealRoom = await prisma.dealRoom.findUnique({
    where: { id: params.dealRoomId },
    include: {
      resources: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!dealRoom) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <DealRoomHeader dealRoom={dealRoom} />
      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-5">
          <ResourceList resources={dealRoom.resources} />
        </div>
        <div className="col-span-2">
          <ResourceUpload dealRoomId={dealRoom.id} />
        </div>
      </div>
    </div>
  );
}