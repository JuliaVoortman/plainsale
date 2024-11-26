"use client";

import { useState } from "react";
import { DealRoom, User } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Send,
  Settings,
  MoreVertical,
  Archive,
  CheckCircle2,
  XCircle,
  Users,
  Eye,
  Users2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ShareDealRoom } from "./share-deal-room";
import { cn } from "@/lib/utils";
import { useAtom } from 'jotai';
import { viewModeAtom } from '@/lib/atoms';

interface DealRoomHeaderProps {
  dealRoom: DealRoom & {
    members: User[];
  };
}

export function DealRoomHeader({ dealRoom }: DealRoomHeaderProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
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
      router.refresh();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-[#002447]">{dealRoom.name}</h1>
            <Badge 
              variant="outline" 
              className={cn(
                dealRoom.status === "ACTIVE" && "bg-[#53D3D1]/10 text-[#002447] border-[#53D3D1]",
                dealRoom.status === "CLOSED" && "bg-[#FEB249]/10 text-[#002447] border-[#FEB249]",
                dealRoom.status === "ARCHIVED" && "bg-gray-100 text-gray-600 border-gray-300"
              )}
            >
              {dealRoom.status.toLowerCase()}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#002447]/5 rounded-md p-1 h-9 flex">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-7 px-3",
                  viewMode === "internal" && "bg-[#FEB249] text-[#002447] shadow-none"
                )}
                onClick={() => setViewMode("internal")}
              >
                <Eye className="mr-2 h-4 w-4" />
                Internal
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-7 px-3",
                  viewMode === "customer" && "bg-[#FEB249] text-[#002447] shadow-none"
                )}
                onClick={() => setViewMode("customer")}
              >
                <Users2 className="mr-2 h-4 w-4" />
                Customer
              </Button>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              className="text-[#002447] border-[#002447] hover:bg-[#002447]/5"
              onClick={() => setIsShareOpen(true)}
            >
              <Send className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Invite</span>
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              className="text-[#002447] border-[#002447] hover:bg-[#002447]/5"
            >
              <Users className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Members</span>
              <span className="ml-1">({dealRoom.members?.length || 0})</span>
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