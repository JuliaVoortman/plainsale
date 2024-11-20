import { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { Logo } from "@/components/ui/logo";

export const metadata: Metadata = {
  title: "Register - Plainsale",
  description: "Create your Plainsale account",
};

export default function RegisterPage() {
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
              Create an account
            </h1>
            <p className="text-sm text-[#002447]/60">
              Enter your details to get started with Plainsale
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border-2 border-[#002447]/10">
            <RegisterForm />
          </div>

          <p className="text-center text-sm text-[#002447]/60">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="font-medium text-[#002447] hover:text-[#002447]/80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}