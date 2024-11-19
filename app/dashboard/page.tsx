import { Metadata } from "next";
import { DealRoomList } from "@/components/dashboard/deal-room-list";
import { CreateDealRoomButton } from "@/components/dashboard/create-deal-room-button";

export const metadata: Metadata = {
  title: "Dashboard - DealRoom",
  description: "Manage your deal rooms",
};

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Deal Rooms</h2>
          <p className="text-muted-foreground">
            Manage and track your active deals
          </p>
        </div>
        <CreateDealRoomButton />
      </div>
      <DealRoomList />
    </div>
  );
}