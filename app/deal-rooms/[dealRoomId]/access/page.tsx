import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { DealRoomAccessForm } from "@/components/deal-room/deal-room-access-form";

interface DealRoomAccessPageProps {
  params: {
    dealRoomId: string;
  };
}

export const metadata: Metadata = {
  title: "Access Deal Room - Plainsale",
  description: "Enter your email to access the deal room",
};

export default async function DealRoomAccessPage({ params }: DealRoomAccessPageProps) {
  const session = await getServerSession(authOptions);
  
  // If user is authenticated, check if they have access
  if (session?.user) {
    const hasAccess = await prisma.dealRoomRole.findFirst({
      where: {
        userId: session.user.id,
        dealRoomId: params.dealRoomId,
      },
    });

    if (hasAccess) {
      redirect(`/deal-rooms/${params.dealRoomId}`);
    }
  }

  const dealRoom = await prisma.dealRoom.findUnique({
    where: { id: params.dealRoomId },
    select: { name: true, organization: { select: { name: true } } },
  });

  if (!dealRoom) {
    redirect("/404");
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-[#002447]">
              Access Deal Room
            </h1>
            <p className="text-sm text-[#002447]/60">
              Enter your email to access {dealRoom.name} from {dealRoom.organization.name}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border-2 border-[#002447]/10">
            <DealRoomAccessForm dealRoomId={params.dealRoomId} />
          </div>
        </div>
      </div>
    </div>
  );
}