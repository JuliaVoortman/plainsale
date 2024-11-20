"use client";

import { useState } from "react";
import { DealRoom } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Mail } from "lucide-react";

interface ShareDealRoomProps {
  dealRoom: DealRoom;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareDealRoom({ dealRoom, isOpen, onClose }: ShareDealRoomProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const shareUrl = `${window.location.origin}/deal-rooms/${dealRoom.id}`;

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/deal-rooms/${dealRoom.id}/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Success",
        description: "Invitation sent successfully",
      });

      setEmail("");
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send invitation",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Success",
      description: "Link copied to clipboard",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Deal Room</DialogTitle>
          <DialogDescription>
            Share this deal room with your team or clients
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Share link</Label>
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={shareUrl}
                className="bg-muted"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or invite via email
              </span>
            </div>
          </div>

          <form onSubmit={handleInvite} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !email}
                  className="bg-[#002447] hover:bg-[#002447]/90"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Invite
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}