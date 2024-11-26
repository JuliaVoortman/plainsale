"use client";

import { useAtom } from 'jotai';
import { viewModeAtom } from '@/lib/atoms';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Edit, 
  FileEdit, 
  Lock, 
  MessageSquare, 
  Settings, 
  Share2, 
  Upload, 
  UserPlus 
} from "lucide-react";

export function InternalControls() {
  const [viewMode] = useAtom(viewModeAtom);

  if (viewMode !== 'internal') {
    return null;
  }

  return (
    <Card className="border-t-0 rounded-t-none bg-[#002447]/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Details
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Update Logo
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <FileEdit className="h-4 w-4" />
              Edit Checklist
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Team Member
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Internal Notes
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share Settings
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Lock className="h-4 w-4" />
              Access Control
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Room Settings
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}