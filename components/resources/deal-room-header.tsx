"use client";

import { DealRoom } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Settings } from "lucide-react";

interface DealRoomHeaderProps {
  dealRoom: DealRoom;
}

export function DealRoomHeader({ dealRoom }: DealRoomHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold tracking-tight">{dealRoom.name}</h2>
          <Badge variant={dealRoom.status === "ACTIVE" ? "default" : "secondary"}>
            {dealRoom.status.toLowerCase()}
          </Badge>
        </div>
        <p className="text-muted-foreground">{dealRoom.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}