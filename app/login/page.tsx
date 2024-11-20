import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Login - DealRoom",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Zap className="h-6 w-6 text-[#FEB249]" />
            <span className="font-bold text-xl">DealRoom</span>
          </Link>
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link 
              href="/register" 
              className="font-medium text-[#002447] hover:text-[#002447]/80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Gradient Background */}
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#002447] to-[#FEB249]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop')] mix-blend-overlay opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center text-white p-12">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-4">
              Streamline Your Deal Management
            </h2>
            <p className="text-lg text-white/80">
              Securely manage and share resources with your team and clients in one centralized platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}