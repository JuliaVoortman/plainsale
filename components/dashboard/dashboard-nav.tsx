"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, FolderOpen, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/dashboard/user-nav";
import { User } from "next-auth";

interface DashboardNavProps {
  user: User;
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname();
  
  const navigation = [
    { name: "Deal Rooms", href: "/dashboard", icon: FolderOpen },
    { name: "Team", href: "/team", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-[#FEB249]" />
            <span className="font-bold text-2xl text-[#002447]">
              plainsale
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-[#002447] text-white" 
                      : "text-[#002447]/60 hover:bg-[#002447]/5 hover:text-[#002447]"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <UserNav user={user} />
      </div>
    </header>
  );
}