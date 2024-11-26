"use client";

import Link from "next/link";
import { useAtom } from 'jotai';
import { viewModeAtom } from '@/lib/atoms';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  CalendarDays,
  FileText,
  Home,
  Mail,
  MessageSquare,
  Timer,
  Users
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface DealRoomNavigationProps {
  dealRoomId: string;
}

export function DealRoomNavigation({ dealRoomId }: DealRoomNavigationProps) {
  const [viewMode] = useAtom(viewModeAtom);
  const pathname = usePathname();

  const internalNavigation = [
    { 
      label: "Overview", 
      icon: Home, 
      href: `/room/${dealRoomId}`
    },
    { 
      label: "Timeline", 
      icon: Timer, 
      href: `/room/${dealRoomId}/timeline` 
    },
    { 
      label: "Resources", 
      icon: FileText, 
      href: `/room/${dealRoomId}/resources` 
    },
    { 
      label: "Team", 
      icon: Users, 
      href: `/room/${dealRoomId}/team` 
    },
    { 
      label: "Meetings", 
      icon: CalendarDays, 
      href: `/room/${dealRoomId}/meetings` 
    },
    { 
      label: "Messages", 
      icon: MessageSquare, 
      href: `/room/${dealRoomId}/messages` 
    },
    { 
      label: "Emails", 
      icon: Mail, 
      href: `/room/${dealRoomId}/emails` 
    },
  ];

  const customerNavigation = [
    { 
      label: "Overview", 
      icon: Home, 
      href: `/room/${dealRoomId}`
    },
    { 
      label: "Resources", 
      icon: FileText, 
      href: `/room/${dealRoomId}/resources` 
    },
    { 
      label: "Meetings", 
      icon: CalendarDays, 
      href: `/room/${dealRoomId}/meetings` 
    },
    { 
      label: "Messages", 
      icon: MessageSquare, 
      href: `/room/${dealRoomId}/messages` 
    },
  ];

  const navigation = viewMode === 'internal' ? internalNavigation : customerNavigation;

  return (
    <Card className="border-t-0 rounded-t-none bg-[#002447]/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-12 gap-2">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="contents">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2",
                  pathname === item.href && "bg-white shadow-sm"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}