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
  const basePath = `/room/${dealRoomId}`;

  const internalNavigation = [
    { 
      label: "Overview", 
      icon: Home, 
      href: basePath
    },
    { 
      label: "Timeline", 
      icon: Timer, 
      href: `${basePath}/timeline` 
    },
    { 
      label: "Resources", 
      icon: FileText, 
      href: `${basePath}/resources` 
    },
    { 
      label: "Team", 
      icon: Users, 
      href: `${basePath}/team` 
    },
    { 
      label: "Meetings", 
      icon: CalendarDays, 
      href: `${basePath}/meetings` 
    },
    { 
      label: "Messages", 
      icon: MessageSquare, 
      href: `${basePath}/messages` 
    },
    { 
      label: "Emails", 
      icon: Mail, 
      href: `${basePath}/emails` 
    },
  ];

  const customerNavigation = [
    { 
      label: "Overview", 
      icon: Home, 
      href: basePath
    },
    { 
      label: "Resources", 
      icon: FileText, 
      href: `${basePath}/resources` 
    },
    { 
      label: "Meetings", 
      icon: CalendarDays, 
      href: `${basePath}/meetings` 
    },
    { 
      label: "Messages", 
      icon: MessageSquare, 
      href: `${basePath}/messages` 
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