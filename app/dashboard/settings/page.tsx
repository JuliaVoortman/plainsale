import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganizationSettings } from "@/components/settings/organization-settings";
import { BrandingSettings } from "@/components/settings/branding-settings";
import { SecuritySettings } from "@/components/settings/security-settings";

export const metadata: Metadata = {
  title: "Settings - DealRoom",
  description: "Manage your organization settings",
};

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your organization preferences and settings
        </p>
      </div>

      <Tabs defaultValue="organization" className="space-y-4">
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
  );
}