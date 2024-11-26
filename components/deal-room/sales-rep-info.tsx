"use client";

import { Mail, Phone, PlayCircle, User2 } from "lucide-react";
import { useAtom } from 'jotai';
import { viewModeAtom } from '@/lib/atoms';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SalesRepInfoProps {
  name: string;
  email: string;
  phone: string;
  image?: string;
  welcomeVideo?: string;
  onUpdateVideo?: (video: string) => Promise<void>;
}

export function SalesRepInfo({
  name,
  email,
  phone,
  image,
  welcomeVideo,
  onUpdateVideo
}: SalesRepInfoProps) {
  const [viewMode] = useAtom(viewModeAtom);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-[#002447]/10">
                <AvatarImage src={image} />
                <AvatarFallback className="bg-[#002447]/5">
                  <User2 className="h-4 w-4 text-[#002447]/40" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-[#002447] text-sm">{name}</h3>
                <p className="text-xs text-[#002447]/60">Account Executive</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 text-xs">
            <a 
              href={`mailto:${email}`} 
              className="flex items-center gap-1 text-[#002447]/60 hover:text-[#002447]"
            >
              <Mail className="h-3 w-3" />
              {email}
            </a>
            <a 
              href={`tel:${phone}`} 
              className="flex items-center gap-1 text-[#002447]/60 hover:text-[#002447]"
            >
              <Phone className="h-3 w-3" />
              {phone}
            </a>
          </div>

          {viewMode === 'internal' && (
            <>
              {welcomeVideo ? (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-[#002447]/5">
                  <video 
                    src={welcomeVideo}
                    poster={image}
                    controls
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-video rounded-lg bg-[#002447]/5 flex items-center justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 text-xs"
                    onClick={() => {
                      // Implement video upload
                    }}
                  >
                    <PlayCircle className="h-3 w-3" />
                    Add Welcome Video
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}