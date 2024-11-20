import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { EarlyAccessForm } from "@/components/marketing/early-access-form";

export const metadata: Metadata = {
  title: "Plainsale - AI-Powered Deal Management",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-[#FEB249]" />
              <span className="font-bold text-2xl text-[#002447]">plainsale</span>
            </Link>
            <Link href="/login">
              <Button 
                className="h-10 px-6 bg-white text-[#002447] font-semibold border-2 border-[#002447] transition-all duration-200 hover:bg-[#FEB249] hover:border-[#FEB249] hover:text-[#002447]"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#002447] leading-tight mb-8">
              Close deals faster with AI-powered deal rooms - everything you need to sell smarter, all in one place.
            </h1>
            
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-12">
              <p>
                Streamline your sales process by bringing teams and prospects together in a single space, powered by AI insights that help you focus on what matters: winning the deal.
              </p>
              
              <p>
                Track progress, share updates, and make decisions faster with tools designed to eliminate bottlenecks and keep everyone on the same page.
              </p>
              
              <p>
                If you're working on complex enterprise sales or SaaS deals, this is your secret weapon to get to 'yes' quicker.
              </p>
            </div>
            
            <EarlyAccessForm />
          </div>
        </div>
      </main>
    </div>
  );
}