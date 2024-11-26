import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { ProspectInfo } from "@/components/deal-room/prospect-info";

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
  
  if (!session?.user?.organizationId) {
    redirect("/login");
  }

  const dealRoom = await prisma.dealRoom.findUnique({
    where: { 
      id: params.dealRoomId,
      organizationId: session.user.organizationId,
    },
    include: {
      members: true,
    },
  });

  if (!dealRoom) {
    redirect("/dashboard");
  }

  const prospectCompany = {
    name: "Silktide",
    logo: "/silktide-logo.svg",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-7">
          <ProspectInfo 
            name={prospectCompany.name}
            createdAt={dealRoom.createdAt}
            stakeholders={[
              {
                name: "John Smith",
                email: "john@silktide.com",
                role: "CTO"
              }
            ]}
            deadlines={[
              {
                id: "1",
                title: "Contract Review",
                date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}