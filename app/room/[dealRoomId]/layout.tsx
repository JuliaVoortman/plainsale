import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { ViewModeProvider } from "@/components/providers/view-mode-provider";
import { DealRoomHeader } from "@/components/deal-room/deal-room-header";
import { DealRoomNavigation } from "@/components/deal-room/deal-room-navigation";

interface DealRoomLayoutProps {
  children: React.ReactNode;
  params: { dealRoomId: string };
}

export default async function DealRoomLayout({ children, params }: DealRoomLayoutProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
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

  return (
    <ViewModeProvider>
      <div className="flex-1 bg-white">
        <DealRoomHeader dealRoom={dealRoom} />
        <DealRoomNavigation dealRoomId={dealRoom.id} />
        {children}
      </div>
    </ViewModeProvider>
  );
}