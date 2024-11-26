"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UpcomingMeetings() {
  return (
    <div className="pt-4 border-t">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-[#002447]">Upcoming Meetings</h3>
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2 text-xs border-2 border-[#002447] text-[#002447] hover:bg-[#002447]/5"
        >
          <Calendar className="h-3 w-3" />
          Book a Call
        </Button>
      </div>
      <p className="text-sm text-[#002447]/60">No upcoming meetings scheduled</p>
    </div>
  );
}