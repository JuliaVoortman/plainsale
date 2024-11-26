"use client";

import { useState } from "react";
import { useAtom } from 'jotai';
import { viewModeAtom, dealRoomBackgroundAtom } from '@/lib/atoms';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Paintbrush } from "lucide-react";

interface BackgroundCustomizerProps {
  dealRoomId: string;
}

export function BackgroundCustomizer({ dealRoomId }: BackgroundCustomizerProps) {
  const { toast } = useToast();
  const [viewMode] = useAtom(viewModeAtom);
  const [background, setBackground] = useAtom(dealRoomBackgroundAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempColor, setTempColor] = useState(background);

  if (viewMode !== 'internal') {
    return null;
  }

  async function handleSave() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/deal-rooms/${dealRoomId}/background`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color: tempColor }),
      });

      if (!response.ok) throw new Error();

      setBackground(tempColor);
      toast({
        title: "Success",
        description: "Background color updated successfully",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update background color",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200"
        >
          <Paintbrush className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customize Background</DialogTitle>
          <DialogDescription>
            Change the background color of this deal room
          </DialogDescription>
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
              setTempColor(background);
              setIsOpen(false);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}