import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { DealRoomList } from "@/components/dashboard/deal-room-list";
import { CreateDealRoomButton } from "@/components/dashboard/create-deal-room-button";

export const metadata: Metadata = {
  title: "Dashboard - Plainsale",
  description: "Manage your deal rooms",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.organizationId) {
    redirect("/login");
  }

  const dealRooms = await prisma.dealRoom.findMany({
    where: {
      organizationId: session.user.organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#002447]">
            Deal Rooms
          </h2>
          <p className="text-[#002447]/60">
            Manage and track your active deals
          </p>
        </div>
        <CreateDealRoomButton />
      </div>
      <div className="mt-8">
        <DealRoomList initialDealRooms={dealRooms} />
      </div>
    </div>
  );
}