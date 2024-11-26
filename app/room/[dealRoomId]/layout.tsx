"use client";

import { ViewModeProvider } from "@/components/providers/view-mode-provider";
import { DealRoomHeader } from "@/components/deal-room/deal-room-header";
import { DealRoomNavigation } from "@/components/deal-room/deal-room-navigation";
import { useEffect, useState } from "react";
import { DealRoom } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { CompanyInfo } from "@/components/deal-room/company-info";
import { SalesRepInfo } from "@/components/deal-room/sales-rep-info";

interface DealRoomLayoutProps {
  children: React.ReactNode;
  params: { dealRoomId: string };
}

export default function DealRoomLayout({ children, params }: DealRoomLayoutProps) {
  const { data: session } = useSession();
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

  if (!dealRoom || !session?.user) {
    return null;
  }

  const sellerCompany = {
    name: "Plainsale",
    logo: "/plainsale-logo.svg",
    description: "AI-powered deal room platform helping sales teams close deals faster with intelligent insights and streamlined collaboration.",
    website: "https://plainsale.com",
  };

  const salesRep = {
    name: "Julia Voortman",
    email: "julia@plainsale.com",
    phone: "+1 (555) 123-4567",
    image: "https://github.com/juliavoortman.png",
  };

  return (
    <ViewModeProvider>
      <div className="flex-1 bg-white">
        <DealRoomHeader dealRoom={dealRoom} />
        <div className="container mx-auto px-4 py-6">
          <div className="grid gap-6 md:grid-cols-7 mb-6">
            <div className="md:col-span-5">
              <CompanyInfo {...sellerCompany} />
            </div>
            <div className="md:col-span-2">
              <SalesRepInfo {...salesRep} />
            </div>
          </div>
        </div>
        <DealRoomNavigation dealRoomId={dealRoom.id} />
        {children}
      </div>
    </ViewModeProvider>
  );
}