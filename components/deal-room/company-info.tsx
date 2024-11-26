import { useState } from "react";
import { Building2, Globe, Paintbrush, Upload } from "lucide-react";
import { useAtom } from 'jotai';
import { viewModeAtom, companyBrandingAtom } from '@/lib/atoms';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CompanyGallery } from "./company-gallery";
import { ResourcePicker } from "@/components/resources/resource-picker";

interface CompanyInfoProps {
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  onUpdateDescription?: (description: string) => Promise<void>;
  onUpdateLogo?: (logo: string) => Promise<void>;
  onUpdateBranding?: (color: string) => Promise<void>;
}

export function CompanyInfo({ 
  name, 
  logo, 
  description, 
  website,
  onUpdateDescription,
  onUpdateLogo,
  onUpdateBranding
}: CompanyInfoProps) {
  const { toast } = useToast();
  const [viewMode] = useAtom(viewModeAtom);
  const [branding, setBranding] = useAtom(companyBrandingAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [isBrandingOpen, setIsBrandingOpen] = useState(false);
  const [isLogoPickerOpen, setIsLogoPickerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempColor, setTempColor] = useState(branding);

  const cardStyle = {
    backgroundColor: branding,
  };

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

  async function handleSaveBranding() {
    if (!onUpdateBranding) return;
    
    setIsLoading(true);
    try {
      await onUpdateBranding(tempColor);
      setBranding(tempColor);
      toast({
        title: "Success",
        description: "Company branding updated",
      });
      setIsBrandingOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update branding",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogoSelect(resourceUrl: string) {
    if (!onUpdateLogo) return;
    
    setIsLoading(true);
    try {
      await onUpdateLogo(resourceUrl);
      toast({
        title: "Success",
        description: "Company logo updated",
      });
      setIsLogoPickerOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update logo",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card 
        className="relative group overflow-hidden transition-all duration-200"
        style={cardStyle}
      >
        {viewMode === 'internal' && (
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200"
            onClick={() => setIsBrandingOpen(true)}
          >
            <Paintbrush className="h-4 w-4" />
          </Button>
        )}
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div 
              className={cn(
                "h-16 w-32 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-200",
                viewMode === 'internal' && "cursor-pointer hover:bg-white group/logo"
              )}
              onClick={() => viewMode === 'internal' && setIsLogoPickerOpen(true)}
            >
              {logo ? (
                <img 
                  src={logo} 
                  alt={name} 
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="relative flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-[#002447]/40" />
                  {viewMode === 'internal' && (
                    <Upload className="h-4 w-4 text-[#002447]/60 absolute -bottom-2 -right-2 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200" />
                  )}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#002447]">{name}</h3>
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
                "mt-4 text-sm text-[#002447]/80 bg-white/10 rounded-lg p-3 backdrop-blur-sm transition-all duration-200",
                viewMode === 'internal' && "cursor-pointer hover:bg-[#002447]/5"
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
                className="min-h-[100px] bg-white/90 border-0 resize-none text-[#002447]"
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

      <div className="w-full max-w-3xl mx-auto">
        <CompanyGallery />
      </div>

      <Dialog open={isBrandingOpen} onOpenChange={setIsBrandingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Company Card Background</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={tempColor}
                  onChange={(e) => setTempColor(e.target.value)}
                  className="w-20 h-10 p-1"
                />
                <Input
                  type="text"
                  value={tempColor}
                  onChange={(e) => setTempColor(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setTempColor(branding);
                setIsBrandingOpen(false);
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveBranding}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isLogoPickerOpen} onOpenChange={setIsLogoPickerOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Choose Company Logo</DialogTitle>
          </DialogHeader>
          <ResourcePicker
            onSelect={handleLogoSelect}
            acceptedTypes={['image/jpeg', 'image/png', 'image/svg+xml']}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}