"use client";

import { useAtom } from 'jotai';
import { viewModeAtom } from '@/lib/atoms';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  MoreVertical, 
  Send,
  User as UserIcon,
  UserPlus 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DealParticipant {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
  lastAccess?: Date;
}

interface DealParticipantsProps {
  contacts: any[]; // Replace with proper type
  dealRoomId: string;
}

export function DealParticipants({ contacts, dealRoomId }: DealParticipantsProps) {
  const [viewMode] = useAtom(viewModeAtom);

  const participants: DealParticipant[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@silktide.com',
      role: 'CTO',
      lastAccess: new Date('2024-03-20T10:00:00')
    },
    {
      id: '2',
      name: 'Emma Wilson',
      email: 'emma@silktide.com',
      role: 'Product Manager',
      lastAccess: new Date('2024-03-19T15:30:00')
    },
    {
      id: '3',
      name: 'David Lee',
      email: 'david@silktide.com',
      role: 'Engineering Lead',
      lastAccess: null
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Deal Participants</CardTitle>
        {viewMode === 'internal' && (
          <Button variant="outline" size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Invite Participant
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {participants.map((participant) => {
            const initials = participant.name
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase();

            return (
              <div key={participant.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={participant.image || ''} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#002447]">{participant.name}</span>
                      <Badge 
                        variant="outline" 
                        className="text-xs text-[#002447]/60"
                      >
                        {participant.role}
                      </Badge>
                    </div>
                    <a 
                      href={`mailto:${participant.email}`}
                      className="text-sm text-[#002447]/60 hover:text-[#002447] flex items-center gap-1"
                    >
                      <Mail className="h-3 w-3" />
                      {participant.email}
                    </a>
                    {participant.lastAccess && (
                      <p className="text-xs text-[#002447]/40 mt-1">
                        Last accessed {new Date(participant.lastAccess).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {viewMode === 'internal' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Send className="h-4 w-4" />
                        Resend invite
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Mail className="h-4 w-4" />
                        Send email
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Remove participant
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
