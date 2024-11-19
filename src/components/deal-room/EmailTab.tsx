import { useState } from 'react';
import { EnvelopeIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

interface Email {
  id: string;
  subject: string;
  from: {
    email: string;
    name: string;
  };
  to: {
    email: string;
    name: string;
  }[];
  snippet: string;
  receivedAt: Date;
  hasAttachments: boolean;
}

interface Props {
  dealRoomId: string;
}

export function EmailTab({ dealRoomId }: Props) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-500" />
          Emails
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={() => setIsFiltering(!isFiltering)}
        >
          <FunnelIcon className="h-4 w-4 mr-1" />
          Filter
        </Button>
      </div>

      {isFiltering && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Domain
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="60">Last 60 days</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {emails.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No emails found. Import emails to start tracking communication.
          </p>
        ) : (
          emails.map((email) => (
            <div
              key={email.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">
                  {email.subject}
                </h4>
                <span className="text-xs text-gray-500">
                  {email.receivedAt.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                From: {email.from.name} ({email.from.email})
              </p>
              <p className="text-sm text-gray-500 line-clamp-2">
                {email.snippet}
              </p>
              {email.hasAttachments && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    Has attachments
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}