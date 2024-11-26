"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAtom } from 'jotai';
import { viewModeAtom } from '@/lib/atoms';

export function TimelineFilters() {
  const [viewMode] = useAtom(viewModeAtom);

  if (viewMode !== 'internal') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-internal" className="text-[#002447]">Show Internal Events</Label>
          <Switch id="show-internal" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-resources" className="text-[#002447]">Resource Events</Label>
          <Switch id="show-resources" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-members" className="text-[#002447]">Member Events</Label>
          <Switch id="show-members" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-status" className="text-[#002447]">Status Changes</Label>
          <Switch id="show-status" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-comments" className="text-[#002447]">Comments</Label>
          <Switch id="show-comments" defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}