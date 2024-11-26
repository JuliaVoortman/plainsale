import { ResourceGrid } from "@/components/resources/resource-grid";
import { ResourceUpload } from "@/components/resources/resource-upload";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

interface ResourcesPageProps {
  params: {
    dealRoomId: string;
  };
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    notFound();
  }

  const resources = await prisma.resource.findMany({
    where: {
      dealRoomId: params.dealRoomId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="container mx-auto px-4">
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5">
          <ResourceGrid resources={resources} />
        </div>
        <div className="md:col-span-2">
          <ResourceUpload dealRoomId={params.dealRoomId} />
        </div>
      </div>
    </div>
  );
}