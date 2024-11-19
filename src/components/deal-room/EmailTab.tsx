"use client";

import { useState } from 'react';
import { EnvelopeIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

interface EmailTabProps {
  dealRoomId: string;
}

export function EmailTab({ dealRoomId }: EmailTabProps) {
  const [emails, setEmails] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Emails</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFiltering(!isFiltering)}
        >
          <FunnelIcon className="h-4 w-4 mr-1" />
          Filter
        </Button>
      </div>

      <div className="flow-root">
        <ul className="-my-5 divide-y divide-gray-200">
          {emails.map((email: any) => (
            <li key={email.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {email.subject}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    From: {email.from}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {new Date(email.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}