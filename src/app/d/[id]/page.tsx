import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { DealRoomHeader } from '@/components/deal-room/Header';
import { ResourceList } from '@/components/deal-room/ResourceList';
import { Timeline } from '@/components/deal-room/Timeline';
import { EmailTab } from '@/components/deal-room/EmailTab';
import { Notes } from '@/components/deal-room/Notes';
import { TabNavigation } from '@/components/deal-room/TabNavigation';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getDealRoom } from '@/lib/api/deal-rooms';

export default async function DealRoomPage({ params }: { params: { id: string } }) {
  const dealRoom = await getDealRoom(params.id);
  
  if (!dealRoom) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DealRoomHeader dealRoom={dealRoom} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <TabNavigation />
          
          <div className="p-6">
            <Suspense fallback={<LoadingSpinner />}>
              <ResourceList dealRoomId={dealRoom.id} />
            </Suspense>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <section className="space-y-6">
                <Suspense fallback={<LoadingSpinner />}>
                  <Timeline dealRoomId={dealRoom.id} />
                </Suspense>
                
                <Suspense fallback={<LoadingSpinner />}>
                  <EmailTab dealRoomId={dealRoom.id} />
                </Suspense>
              </section>

              <section>
                <Suspense fallback={<LoadingSpinner />}>
                  <Notes dealRoomId={dealRoom.id} />
                </Suspense>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}