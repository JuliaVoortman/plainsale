import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/ui/logo";

export const metadata: Metadata = {
  title: "Login - Plainsale",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="w-32 h-auto" />
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-[#002447]">
              Welcome back
            </h1>
            <p className="text-sm text-[#002447]/60">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border-2 border-[#002447]/10">
            <LoginForm />
          </div>

          <p className="text-center text-sm text-[#002447]/60">
            Don't have an account?{" "}
            <Link 
              href="/register" 
              className="font-medium text-[#002447] hover:text-[#002447]/80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}