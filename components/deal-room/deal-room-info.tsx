"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CompanyInfo } from "./company-info";
import { SalesRepInfo } from "./sales-rep-info";
import { ProspectInfo } from "./prospect-info";
import { useToast } from "@/components/ui/use-toast";

interface DealRoomInfoProps {
  sellerCompany: {
    name: string;
    logo?: string;
    description?: string;
    website?: string;
  };
  prospectCompany: {
    name: string;
    logo?: string;
  };
  salesRep: {
    name: string;
    email: string;
    phone: string;
    image?: string;
    welcomeVideo?: string;
  };
  createdAt: Date;
  dealRoomId: string;
}

export function DealRoomInfo({ 
  sellerCompany,
  prospectCompany,
  salesRep,
  createdAt,
  dealRoomId
}: DealRoomInfoProps) {
  const { toast } = useToast();

  async function handleUpdateDescription(description: string) {
    const response = await fetch(`/api/deal-rooms/${dealRoomId}/company`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      throw new Error('Failed to update description');
    }
  }

  async function handleUpdateBranding(color: string) {
    const response = await fetch(`/api/deal-rooms/${dealRoomId}/company`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color }),
    });

    if (!response.ok) {
      throw new Error('Failed to update branding');
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-12">
      {/* Seller Company & Sales Rep Info */}
      <div className="md:col-span-4 space-y-4">
        <CompanyInfo 
          {...sellerCompany} 
          onUpdateDescription={handleUpdateDescription}
          onUpdateBranding={handleUpdateBranding}
        />
        <SalesRepInfo 
          {...salesRep}
        />
      </div>

      {/* Prospect Info */}
      <Card className="md:col-span-8">
        <CardContent className="p-4">
          <ProspectInfo 
            name={prospectCompany.name}
            createdAt={createdAt}
            stakeholders={[
              {
                name: "John Smith",
                email: "john@silktide.com",
                role: "CTO"
              }
            ]}
            deadlines={[
              {
                id: "1",
                title: "Contract Review",
                date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}