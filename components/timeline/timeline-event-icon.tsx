import {
  CalendarCheck,
  FileText,
  Mail,
  MessageSquare,
  Milestone,
  PlayCircle,
  Star,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

const eventIcons: Record<string, LucideIcon> = {
  DEAL_CREATED: Star,
  STATUS_CHANGE: Star,
  RESOURCE_ADDED: FileText,
  RESOURCE_REMOVED: FileText,
  MEMBER_ADDED: UserPlus,
  MEMBER_REMOVED: Users,
  MEETING_SCHEDULED: CalendarCheck,
  MEETING_COMPLETED: PlayCircle,
  EMAIL_SENT: Mail,
  EMAIL_RECEIVED: Mail,
  NOTE_ADDED: MessageSquare,
  MILESTONE_REACHED: Milestone,
  TASK_COMPLETED: Star,
};

interface TimelineEventIconProps {
  type: string;
  className?: string;
}

export function TimelineEventIcon({ type, className }: TimelineEventIconProps) {
  const Icon = eventIcons[type] || Star;
  return <Icon className={`h-4 w-4 text-[#002447] ${className}`} />;
}