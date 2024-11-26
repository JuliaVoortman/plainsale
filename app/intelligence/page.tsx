import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Intelligence - Plainsale",
  description: "AI-powered insights and analytics",
};

export default async function IntelligencePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.organizationId) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#002447]">Intelligence</h2>
          <p className="text-[#002447]/60">
            AI-powered insights and analytics for your sales pipeline
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Platform Intelligence</h3>
            <p className="text-muted-foreground">
              AI-powered insights and analytics coming soon...
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}