"use client";

import { DealRoom, User } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Share2, 
  Settings, 
  MoreVertical, 
  Archive, 
  CheckCircle2, 
  XCircle,
  Users
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ShareDealRoom } from "./share-deal-room";
import { cn } from "@/lib/utils";

interface DealRoomHeaderProps {
  dealRoom: DealRoom & {
    members: User[];
  };
}

export function DealRoomHeader({ dealRoom }: DealRoomHeaderProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleStatusChange(status: 'ACTIVE' | 'CLOSED' | 'ARCHIVED') {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/deal-rooms/${dealRoom.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Success",
        description: "Deal room status updated",
      });

      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="border-b bg-white">
      <div className="container py-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#002447]">{dealRoom.name}</h1>
              <Badge 
                variant="outline" 
                className={cn(
                  "ml-2",
                  dealRoom.status === "ACTIVE" && "bg-[#53D3D1]/10 text-[#002447] border-[#53D3D1]",
                  dealRoom.status === "CLOSED" && "bg-[#FEB249]/10 text-[#002447] border-[#FEB249]",
                  dealRoom.status === "ARCHIVED" && "bg-gray-100 text-gray-600 border-gray-300"
                )}
              >
                {dealRoom.status.toLowerCase()}
              </Badge>
            </div>
            {dealRoom.description && (
              <p className="text-[#002447]/60 max-w-2xl">{dealRoom.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-[#002447] border-[#002447] hover:bg-[#002447]/5"
              onClick={() => setIsShareOpen(true)}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              className="text-[#002447] border-[#002447] hover:bg-[#002447]/5"
            >
              <Users className="mr-2 h-4 w-4" />
              Members ({dealRoom.members.length})
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-[#002447] border-[#002447] hover:bg-[#002447]/5"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleStatusChange('ACTIVE')}
                  disabled={dealRoom.status === 'ACTIVE' || isLoading}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark as Active
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange('CLOSED')}
                  disabled={dealRoom.status === 'CLOSED' || isLoading}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Mark as Closed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange('ARCHIVED')}
                  disabled={dealRoom.status === 'ARCHIVED' || isLoading}
                >
                  <Archive className="mr-2 h-4 w-4" />
                  Archive Deal Room
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <ShareDealRoom
        dealRoom={dealRoom}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}