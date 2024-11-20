"use client";

import { useState } from "react";
import Link from "next/link";
import { DealRoom } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, FileText, Users } from "lucide-react";

interface DealRoomListProps {
  initialDealRooms: DealRoom[];
}

export function DealRoomList({ initialDealRooms }: DealRoomListProps) {
  const [dealRooms] = useState<DealRoom[]>(initialDealRooms);

  if (dealRooms.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-[#002447] to-[#53D3D1] border-none">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Building2 className="h-16 w-16 text-white mb-4" />
          <p className="text-xl font-semibold text-white mb-2">
            No deal rooms yet
          </p>
          <p className="text-white/80">
            Create your first deal room to get started
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {dealRooms.map((dealRoom) => (
        <Link href={`/dashboard/${dealRoom.id}`} key={dealRoom.id}>
          <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:scale-105 cursor-pointer border-2 border-transparent hover:border-[#FEB249]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#002447]/5 to-[#53D3D1]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl group-hover:text-[#002447] transition-colors">
                  {dealRoom.name}
                </CardTitle>
                <Badge variant={dealRoom.status === "ACTIVE" ? "default" : "secondary"}>
                  {dealRoom.status.toLowerCase()}
                </Badge>
              </div>
              <CardDescription className="text-base">
                {dealRoom.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>0 files</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>0 members</span>
                </div>
                <div className="flex-1 text-right">
                  {formatDistanceToNow(new Date(dealRoom.createdAt), { addSuffix: true })}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}