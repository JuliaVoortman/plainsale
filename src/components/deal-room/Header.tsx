import { UserGroupIcon, ShareIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { DealRoom } from '@prisma/client';

interface Props {
  dealRoom: DealRoom;
}

export function DealRoomHeader({ dealRoom }: Props) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{dealRoom.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Created on {new Date(dealRoom.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => {}}
              className="flex items-center"
            >
              <UserGroupIcon className="h-5 w-5 mr-2" />
              Invite Members
            </Button>

            <Button
              variant="primary"
              onClick={() => {}}
              className="flex items-center"
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              Share Deal Room
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}