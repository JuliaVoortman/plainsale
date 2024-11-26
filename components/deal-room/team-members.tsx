"use client";

import { User } from "@prisma/client";
import { useAtom } from 'jotai';
import { viewModeAtom } from '@/lib/atoms';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  MoreVertical, 
  Shield, 
  User as UserIcon,
  UserPlus 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TeamMembersProps {
  members: User[];
  dealRoomId: string;
}

export function TeamMembers({ members, dealRoomId }: TeamMembersProps) {
  const [viewMode] = useAtom(viewModeAtom);

  const teamMembers = [
    {
      id: '1',
      name: 'Julia Voortman',
      email: 'julia@plainsale.com',
      role: 'ADMIN',
      image: 'https://github.com/juliavoortman.png'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@plainsale.com',
      role: 'USER',
      image: null
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@plainsale.com',
      role: 'USER',
      image: null
    },
    ...members
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Sales Team</CardTitle>
        {viewMode === 'internal' && (
          <Button variant="outline" size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member) => {
            const initials = member.name
              ?.split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase();

            return (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.image || ''} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#002447]">{member.name}</span>
                      <Badge 
                        variant="outline" 
                        className="flex items-center gap-1 border-[#53D3D1] bg-[#53D3D1]/10"
                      >
                        {member.role === 'ADMIN' ? (
                          <Shield className="h-3 w-3 text-[#002447]" />
                        ) : (
                          <UserIcon className="h-3 w-3 text-[#002447]" />
                        )}
                        <span className="text-[#002447]">
                          {member.role.toLowerCase()}
                        </span>
                      </Badge>
                    </div>
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-sm text-[#002447]/60 hover:text-[#002447] flex items-center gap-1"
                    >
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </a>
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
                      <DropdownMenuItem>
                        {member.role === 'ADMIN' ? 'Remove admin' : 'Make admin'}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Remove member
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
