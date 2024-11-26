import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { DealRoomOverview } from "@/components/deal-room/deal-room-overview";

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

  const sellerCompany = {
    name: "Plainsale",
    logo: "/plainsale-logo.svg",
    description: "AI-powered deal room platform helping sales teams close deals faster with intelligent insights and streamlined collaboration.",
    website: "https://plainsale.com",
  };

  const prospectCompany = {
    name: "Silktide",
    logo: "/silktide-logo.svg",
  };

  const salesRep = {
    name: "Julia Voortman",
    email: "julia@plainsale.com",
    phone: "+1 (555) 123-4567",
    image: "https://github.com/juliavoortman.png",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <DealRoomOverview
        sellerCompany={sellerCompany}
        prospectCompany={prospectCompany}
        salesRep={salesRep}
        createdAt={dealRoom.createdAt}
        dealRoomId={dealRoom.id}
      />
    </div>
  );
}