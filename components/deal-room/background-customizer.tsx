"use client";

import { useAtom } from 'jotai';
import { viewModeAtom, dealRoomBackgroundAtom } from '@/lib/atoms';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface BackgroundCustomizerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BackgroundCustomizer({ open, onOpenChange }: BackgroundCustomizerProps) {
  const [viewMode] = useAtom(viewModeAtom);
  const [background, setBackground] = useAtom(dealRoomBackgroundAtom);

  if (viewMode !== 'internal') return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Background</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Background Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={background.color}
                onChange={(e) => setBackground({ ...background, color: e.target.value })}
                className="w-20 h-10 p-1"
              />
              <Input
                type="text"
                value={background.color}
                onChange={(e) => setBackground({ ...background, color: e.target.value })}
                className="font-mono flex-1"
                placeholder="#000000"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Pattern</Label>
            <RadioGroup
              value={background.pattern || "none"}
              onValueChange={(value) => 
                setBackground({ ...background, pattern: value === "none" ? undefined : value })
              }
              className="grid gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none">None</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dots" id="dots" />
                <Label htmlFor="dots">Dot Matrix</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="waves" id="waves" />
                <Label htmlFor="waves">Waves</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="circuit" id="circuit" />
                <Label htmlFor="circuit">Circuit Board</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => onOpenChange(false)}
          >
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
