import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganizationSettings } from "@/components/settings/organization-settings";
import { BrandingSettings } from "@/components/settings/branding-settings";
import { SecuritySettings } from "@/components/settings/security-settings";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Settings - Plainsale",
  description: "Manage your organization settings",
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.organizationId) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-[#002447]">Settings</h2>
        <p className="text-[#002447]/60">
          Manage your organization preferences and settings
        </p>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="organization" className="space-y-8">
          <TabsList>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="organization" className="space-y-4">
            <OrganizationSettings />
          </TabsContent>
          <TabsContent value="branding" className="space-y-4">
            <BrandingSettings />
          </TabsContent>
          <TabsContent value="security" className="space-y-4">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}