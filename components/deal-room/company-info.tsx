"use client";

import { useState } from "react";
import { Building2, Globe } from "lucide-react";
import { useAtom } from 'jotai';
import { viewModeAtom } from '@/lib/atoms';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CompanyGallery } from "./company-gallery";

interface CompanyInfoProps {
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  onUpdateDescription?: (description: string) => Promise<void>;
}

export function CompanyInfo({ 
  name, 
  logo, 
  description, 
  website,
  onUpdateDescription,
}: CompanyInfoProps) {
  const { toast } = useToast();
  const [viewMode] = useAtom(viewModeAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSaveDescription() {
    if (!onUpdateDescription) return;
    
    setIsLoading(true);
    try {
      await onUpdateDescription(editedDescription || '');
      toast({
        title: "Success",
        description: "Company description updated",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update description",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-32 rounded-lg bg-[#002447]/5 flex items-center justify-center p-4">
              {logo ? (
                <img 
                  src={logo} 
                  alt={name} 
                  className="h-full w-full object-contain"
                />
              ) : (
                <Building2 className="h-8 w-8 text-[#002447]/40" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-[#002447]">{name}</h3>
              {website && (
                <a 
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#002447]/60 hover:text-[#002447] flex items-center gap-1 mt-1 transition-colors duration-200"
                >
                  <Globe className="h-3 w-3" />
                  {website.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          </div>

          {description && !isEditing && (
            <div 
              className={cn(
                "mt-4 text-sm text-[#002447]/80 bg-[#002447]/5 rounded-lg p-3 transition-all duration-200",
                viewMode === 'internal' && "cursor-pointer hover:bg-[#002447]/10"
              )}
              onClick={() => viewMode === 'internal' && setIsEditing(true)}
            >
              {description}
            </div>
          )}

          {isEditing && (
            <div className="mt-4 space-y-2">
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="min-h-[100px] resize-none text-[#002447] border-[#002447]/20"
                placeholder="Enter company description..."
              />
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditedDescription(description);
                    setIsEditing(false);
                  }}
                  className="text-[#002447]/60 hover:text-[#002447] hover:bg-[#002447]/5"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveDescription}
                  className="bg-[#002447] text-white hover:bg-[#002447]/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <CompanyGallery />
    </div>
  );
}