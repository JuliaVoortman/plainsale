"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Success!",
        description: "Thanks for your interest. We'll be in touch soon.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-center gap-3">
      <div className="flex items-center gap-3 flex-1">
        <span className="text-[#002447] font-medium whitespace-nowrap">Email address:</span>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="h-12 px-8 bg-[#FEB249] hover:bg-[#FEB249]/90 text-[#002447] font-semibold border-2 border-[#002447]"
      >
        {isLoading ? "Submitting..." : "Get Early Access"}
      </Button>
    </form>
  );
}