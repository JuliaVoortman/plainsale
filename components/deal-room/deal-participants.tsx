"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Mail, MoreVertical, Send, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

interface DealParticipantsProps {
  dealRoomId: string;
}

export function DealParticipants({ dealRoomId }: DealParticipantsProps) {
  // In a real app, this would come from your API
  const teamMembers = [
    {
      id: '1',
      name: 'Julia Voortman',
      email: 'julia@plainsale.com',
      role: 'Account Executive',
      image: 'https://github.com/juliavoortman.png',
      lastAccess: new Date()
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah@plainsale.com',
      role: 'Sales Engineer',
      lastAccess: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    }
  ];

  const prospectContacts = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@silktide.com',
      role: 'CTO',
      lastAccess: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      id: '2',
      name: 'David Jones',
      email: 'david@silktide.com',
      role: 'Engineering Lead',
      lastAccess: undefined // Never accessed
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Team Members */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Sales Team</CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Team Member
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.image} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#002447]">{member.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {member.role}
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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-red-600">
                      Remove member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prospect Contacts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Prospect Contacts</CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Contact
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prospectContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#002447]">{contact.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {contact.role}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-sm text-[#002447]/60 hover:text-[#002447] flex items-center gap-1"
                    >
                      <Mail className="h-3 w-3" />
                      {contact.email}
                    </a>
                    {contact.lastAccess && (
                      <span className="text-xs text-[#002447]/60 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last access {formatDistanceToNow(contact.lastAccess, { addSuffix: true })}
                      </span>
                    )}
                  </div>
                </div>

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
                    <DropdownMenuItem className="text-red-600">
                      Remove contact
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}