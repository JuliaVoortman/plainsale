import { useState } from 'react';
import { ClockIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

interface TimelineEvent {
  id: string;
  type: 'note' | 'upload' | 'email' | 'meeting';
  title: string;
  description: string;
  timestamp: Date;
  user: {
    name: string;
    avatar?: string;
  };
}

interface Props {
  dealRoomId: string;
}

export function Timeline({ dealRoomId }: Props) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <ClockIcon className="h-5 w-5 mr-2 text-gray-500" />
          Timeline
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={() => {}}
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Event
        </Button>
      </div>

      <div className="space-y-4">
        {events.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No events yet. Add your first event to start tracking deal progress.
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex items-start space-x-3 border-l-2 border-blue-500 pl-4"
            >
              {event.user.avatar ? (
                <img
                  src={event.user.avatar}
                  alt={event.user.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {event.user.name[0]}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                <p className="text-sm text-gray-500">{event.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {event.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}