import { TimelineEvent } from "@prisma/client";

interface TimelineEventContentProps {
  event: TimelineEvent;
  isCustomerView?: boolean;
}

export function TimelineEventContent({ event, isCustomerView }: TimelineEventContentProps) {
  const metadata = event.metadata as any;

  function getEventContent() {
    if (isCustomerView && event.isInternal) {
      return <span className="text-[#002447]/80">performed an action</span>;
    }

    switch (event.type) {
      case "DEAL_CREATED":
        return <span className="text-[#002447]/80">created this deal room</span>;

      case "STATUS_CHANGE":
        return (
          <span className="text-[#002447]/80">
            changed the status to{" "}
            <span className="font-medium text-[#002447]">
              {metadata.newStatus.toLowerCase()}
            </span>
          </span>
        );

      case "RESOURCE_ADDED":
        return (
          <span className="text-[#002447]/80">
            added a new resource:{" "}
            <span className="font-medium text-[#002447]">{metadata.resourceName}</span>
          </span>
        );

      case "RESOURCE_REMOVED":
        return (
          <span className="text-[#002447]/80">
            removed the resource:{" "}
            <span className="font-medium text-[#002447]">{metadata.resourceName}</span>
          </span>
        );

      case "MEMBER_ADDED":
        return (
          <span className="text-[#002447]/80">
            added{" "}
            <span className="font-medium text-[#002447]">{metadata.memberName}</span>
            {" "}to the deal room
          </span>
        );

      case "MEMBER_REMOVED":
        return (
          <span className="text-[#002447]/80">
            removed{" "}
            <span className="font-medium text-[#002447]">{metadata.memberName}</span>
            {" "}from the deal room
          </span>
        );

      case "MEETING_SCHEDULED":
        return (
          <span className="text-[#002447]/80">
            scheduled a meeting for{" "}
            <span className="font-medium text-[#002447]">
              {new Date(metadata.scheduledFor).toLocaleDateString()}
            </span>
          </span>
        );

      case "MEETING_COMPLETED":
        return (
          <span className="text-[#002447]/80">
            completed a meeting{" "}
            {metadata.recordingUrl && "(recording available)"}
          </span>
        );

      case "EMAIL_SENT":
      case "EMAIL_RECEIVED":
        return (
          <span className="text-[#002447]/80">
            {event.type === "EMAIL_SENT" ? "sent" : "received"} an email:{" "}
            <span className="font-medium text-[#002447]">{metadata.subject}</span>
          </span>
        );

      case "NOTE_ADDED":
        return (
          <span className="text-[#002447]/80">
            added a note: {" "}
            <span className="font-medium text-[#002447]">{metadata.noteContent}</span>
          </span>
        );

      case "MILESTONE_REACHED":
        return (
          <span className="text-[#002447]/80">
            reached a milestone:{" "}
            <span className="font-medium text-[#002447]">{metadata.milestoneName}</span>
          </span>
        );

      case "TASK_COMPLETED":
        return (
          <span className="text-[#002447]/80">
            completed a task:{" "}
            <span className="font-medium text-[#002447]">{metadata.taskName}</span>
          </span>
        );

      default:
        return <span className="text-[#002447]/80">{event.title}</span>;
    }
  }

  return <div className="inline-flex items-center gap-1">{getEventContent()}</div>;
}