import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, Shield, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DealRoom - Secure Enterprise Deal Management',
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">DealRoom</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="font-medium">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="font-medium shadow-lg hover:shadow-xl transition-all">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="gradient-bg py-20 md:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center">
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
              Close Deals Faster with
              <span className="block text-yellow-300">Secure Deal Management</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-white/80 sm:text-xl sm:leading-8">
              Streamline your sales process with our enterprise-grade deal room platform. 
              Share resources securely and accelerate your pipeline.
            </p>
            <div className="space-x-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container py-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl bg-primary p-8 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-orange-500 opacity-90"></div>
              <div className="relative z-10 h-full flex flex-col">
                <Shield className="h-12 w-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise Security</h3>
                <p className="text-white/80">
                  Bank-grade security with role-based access control and audit logging.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-orange-500 p-8 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 opacity-90"></div>
              <div className="relative z-10 h-full flex flex-col">
                <Users className="h-12 w-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Team Collaboration</h3>
                <p className="text-white/80">
                  Work together seamlessly with real-time updates and shared resources.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-yellow-500 p-8 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-primary opacity-90"></div>
              <div className="relative z-10 h-full flex flex-col">
                <Building2 className="h-12 w-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Custom Branding</h3>
                <p className="text-white/80">
                  Personalize your deal rooms with your company's branding and colors.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-gray-50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with ❤️ for enterprise sales teams
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}