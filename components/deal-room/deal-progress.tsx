"use client";

import { CheckCircle2 } from "lucide-react";
import { useAtom } from 'jotai';
import { viewModeAtom } from '@/lib/atoms';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProcessStep {
  id: string;
  title: string;
  completed: boolean;
}

interface DealProgressProps {
  steps: ProcessStep[];
  onUpdateStep?: (stepId: string, completed: boolean) => Promise<void>;
}

export function DealProgress({ steps, onUpdateStep }: DealProgressProps) {
  const [viewMode] = useAtom(viewModeAtom);
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#002447]/60">Deal Progress</span>
        <span className="text-[#002447]">{completedSteps} of {steps.length} steps completed</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="grid gap-2">
        {steps.map((step) => (
          <div 
            key={step.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg transition-colors",
              step.completed ? "bg-[#53D3D1]/10" : "bg-[#002447]/5",
              viewMode === 'internal' && "cursor-pointer hover:bg-[#002447]/10"
            )}
            onClick={() => {
              if (viewMode === 'internal' && onUpdateStep) {
                onUpdateStep(step.id, !step.completed);
              }
            }}
          >
            <CheckCircle2 
              className={cn(
                "h-5 w-5 shrink-0 transition-colors",
                step.completed ? "text-[#002447]" : "text-[#002447]/40"
              )}
            />
            <span className={cn(
              "text-sm",
              step.completed ? "text-[#002447]" : "text-[#002447]/60"
            )}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-2">
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