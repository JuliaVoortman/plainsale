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
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-[#FEB249]" />
              <span className="font-bold text-xl">DealRoom</span>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="font-medium">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#002447] hover:bg-[#002447]/90 text-white font-medium">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="gradient-bg py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-[64rem] mx-auto text-center">
              <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Close Deals Faster with
                <span className="block text-[#FEB249]">Secure Deal Management</span>
              </h1>
              <p className="max-w-[42rem] mx-auto leading-normal text-white/80 sm:text-xl sm:leading-8 mb-8">
                Streamline your sales process with our enterprise-grade deal room platform. 
                Share resources securely and accelerate your pipeline.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto bg-[#FEB249] hover:bg-[#FEB249]/90 text-[#002447] font-semibold">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="feature-card">
              <div className="relative z-10">
                <Shield className="h-12 w-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise Security</h3>
                <p className="text-white/80">
                  Bank-grade security with role-based access control and audit logging.
                </p>
              </div>
            </div>

            <div className="feature-card orange">
              <div className="relative z-10">
                <Users className="h-12 w-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Team Collaboration</h3>
                <p className="text-white/80">
                  Work together seamlessly with real-time updates and shared resources.
                </p>
              </div>
            </div>

            <div className="feature-card blue">
              <div className="relative z-10">
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

      <footer className="border-t py-8 bg-[#002447] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
              <p className="text-center text-sm leading-loose md:text-left">
                Built with ❤️ for enterprise sales teams
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}