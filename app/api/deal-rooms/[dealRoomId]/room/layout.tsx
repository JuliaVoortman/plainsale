"use client";

import { ViewModeProvider } from "@/components/providers/view-mode-provider";
import { DealRoomHeader } from "@/components/deal-room/deal-room-header";
import { DealRoomNavigation } from "@/components/deal-room/deal-room-navigation";
import { useEffect, useState } from "react";
import { DealRoom } from "@prisma/client";
import { Loader2 } from "lucide-react";

interface DealRoomLayoutProps {
  children: React.ReactNode;
  params: { dealRoomId: string };
}

export default function DealRoomLayout({ children, params }: DealRoomLayoutProps) {
  const [dealRoom, setDealRoom] = useState<DealRoom | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDealRoom() {
      try {
        const response = await fetch(`/api/deal-rooms/${params.dealRoomId}`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        setDealRoom(data);
      } catch (error) {
        console.error("Failed to fetch deal room:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDealRoom();
  }, [params.dealRoomId]);

  if (isLoading) {
    return (
      <div className="flex-1 bg-white flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#002447]/40" />
      </div>
    );
  }

  if (!dealRoom) {
    return null;
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