"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface DealRoomAccessFormProps {
  dealRoomId: string;
}

export function DealRoomAccessForm({ dealRoomId }: DealRoomAccessFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/deal-rooms/${dealRoomId}/access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error();

      setShowSuccess(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to verify access. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (showSuccess) {
    return (
      <Alert>
        <AlertDescription>
          <p className="mb-4">
            If you have access to this deal room, you will receive a magic link via email.
            Please check your inbox and click the link to access the deal room.
          </p>
          <p className="text-sm text-[#002447]/60">
            Can&apos;t find the email? Check your spam folder or try again with a different email address.
          </p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          className="input-field"
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 bg-[#FEB249] hover:bg-[#FEB249]/90 text-[#002447] font-semibold border-2 border-[#002447]" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Continue"
        )}
      </Button>
    </form>
  );
}