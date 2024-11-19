"use client";

import { useState } from 'react';
import { ClockIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

interface TimelineProps {
  dealRoomId: string;
}

export function Timeline({ dealRoomId }: TimelineProps) {
  const [events, setEvents] = useState([]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Timeline</h3>
        <Button variant="outline" size="sm">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Event
        </Button>
      </div>

      <div className="flow-root">
        <ul className="-mb-8">
          {events.map((event: any, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== events.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                      <ClockIcon className="h-5 w-5 text-white" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">{event.description}</p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      {new Date(event.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}