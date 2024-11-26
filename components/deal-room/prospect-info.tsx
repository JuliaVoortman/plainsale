"use client";

import { Calendar, Mail, User } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useAtom } from 'jotai';
import { viewModeAtom } from '@/lib/atoms';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Stakeholder {
  name: string;
  email: string;
  role: string;
}

interface Deadline {
  id: string;
  title: string;
  date: Date;
}

interface ProspectInfoProps {
  name: string;
  driver?: string;
  createdAt: Date;
  stakeholders?: Stakeholder[];
  deadlines?: Deadline[];
  onUpdateDriver?: (driver: string) => Promise<void>;
  onUpdateStakeholders?: (stakeholders: Stakeholder[]) => Promise<void>;
  onUpdateDeadlines?: (deadlines: Deadline[]) => Promise<void>;
}

export function ProspectInfo({ 
  name, 
  driver = "Seeking to modernize their sales process and improve deal room collaboration",
  createdAt,
  stakeholders = [],
  deadlines = [],
  onUpdateDriver,
  onUpdateStakeholders,
  onUpdateDeadlines
}: ProspectInfoProps) {
  const [viewMode] = useAtom(viewModeAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState(driver);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#002447]">{name}</h2>
          <Badge variant="outline" className="text-[#002447]/60 text-xs">
            Opened {formatDistanceToNow(createdAt, { addSuffix: true })}
          </Badge>
        </div>
        
        {!isEditing ? (
          <p 
            className={cn(
              "text-[#002447]/60 text-sm",
              viewMode === 'internal' && "cursor-pointer hover:text-[#002447]"
            )}
            onClick={() => viewMode === 'internal' && setIsEditing(true)}
          >
            <span className="text-[#002447]/40">Project driver: </span>
            {driver}
          </p>
        ) : (
          <div className="flex gap-2">
            <Input
              value={editedDriver}
              onChange={(e) => setEditedDriver(e.target.value)}
              className="flex-1 text-sm"
              placeholder="Enter project driver..."
            />
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditedDriver(driver);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={async () => {
                  if (onUpdateDriver) {
                    await onUpdateDriver(editedDriver);
                  }
                  setIsEditing(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {/* Stakeholders */}
        <div className="bg-white rounded-lg border p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-[#002447]">Project Stakeholders</h3>
            {viewMode === 'internal' && (
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Add Stakeholder
              </Button>
            )}
          </div>
          {stakeholders.length > 0 ? (
            <div className="space-y-2">
              {stakeholders.map((stakeholder, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-[#002447] font-medium">{stakeholder.name}</p>
                    <p className="text-sm text-[#002447]/60">{stakeholder.role}</p>
                    <a 
                      href={`mailto:${stakeholder.email}`}
                      className="text-sm text-[#002447]/60 hover:text-[#002447] flex items-center gap-1"
                    >
                      <Mail className="h-3 w-3" />
                      {stakeholder.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#002447]/60">No stakeholders added yet</p>
          )}
        </div>

        {/* Key Dates */}
        <div className="bg-white rounded-lg border p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-[#002447]">Key Dates</h3>
            {viewMode === 'internal' && (
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Add Deadline
              </Button>
            )}
          </div>
          {deadlines.length > 0 ? (
            <div className="space-y-2">
              {deadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-[#002447] font-medium">{deadline.title}</p>
                    <p className="text-sm text-[#002447]/60">
                      {format(deadline.date, 'MMM d, yyyy')}
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-[#53D3D1]/10 text-[#002447] border-[#53D3D1]">
                    {formatDistanceToNow(deadline.date, { addSuffix: true })}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#002447]/60">No deadlines set</p>
          )}
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="bg-white rounded-lg border p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-[#002447]">Upcoming Meetings</h3>
          <Button 
            variant="outline" 
            size="sm"
            className="gap-2 text-xs border-2 border-[#002447] text-[#002447] hover:bg-[#002447]/5"
          >
            <Calendar className="h-3 w-3" />
            Schedule Meeting
          </Button>
        </div>
        <p className="text-sm text-[#002447]/60">No upcoming meetings scheduled</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 border-2 border-[#002447] text-[#002447] hover:bg-[#002447]/5"
        >
          View Proposal
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 border-2 border-[#002447]/20 text-[#002447]/40 hover:bg-[#002447]/5"
          disabled
        >
          Sign Contract
        </Button>
      </div>
    </div>
  );
}