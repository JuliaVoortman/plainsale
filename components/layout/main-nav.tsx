import Link from "next/link";
import { User } from "next-auth";
import { Brain, FolderOpen, Settings, Users } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { UserNav } from "@/components/dashboard/user-nav";

interface MainNavProps {
  user: User;
}

export function MainNav({ user }: MainNavProps) {
  const navigation = [
    { name: "Deal Rooms", href: "/dashboard", icon: FolderOpen },
    { name: "Intelligence", href: "/intelligence", icon: Brain },
    { name: "Team", href: "/team", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#002447] relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <svg 
          className="absolute inset-0 w-full h-full" 
          preserveAspectRatio="none"
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF1493" stopOpacity="0.3">
                <animate
                  attributeName="stopColor"
                  values="#FF1493; #002447; #FF1493"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#002447" stopOpacity="0.3">
                <animate
                  attributeName="stopColor"
                  values="#002447; #FF1493; #002447"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <path 
            fill="url(#waveGradient)"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,144C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </svg>
      </div>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 relative z-10">
        <div className="flex items-center gap-8">
          <Link href="/dashboard">
            <Logo className="w-32 h-auto text-white [&_path]:fill-white transition-all duration-200 hover:opacity-90" />
          </Link>
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <UserNav user={user} />
      </div>
    </header>
  );
}