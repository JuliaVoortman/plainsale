"use client";

import { usePathname } from "next/navigation";
import { MainNav } from "./main-nav";
import { User } from "next-auth";

interface NavWrapperProps {
  user: User | null;
}

const publicPages = ['/', '/login', '/register'];

export function NavWrapper({ user }: NavWrapperProps) {
  const pathname = usePathname();
  const isPublicPage = publicPages.includes(pathname);

  if (!user || isPublicPage) {
    return null;
  }

  return <MainNav user={user} />;
}