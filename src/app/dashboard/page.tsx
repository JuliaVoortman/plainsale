import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { db } from '@/lib/db';
import { dealRooms } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export default async function DashboardPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  const userDealRooms = await db.select()
    .from(dealRooms)
    .where(eq(dealRooms.orgId, session.user.orgId));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Deal Rooms</h2>
            <Link href="/deal-rooms/new" passHref>
              <Button variant="primary">
                Create New Deal Room
              </Button>
            </Link>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {userDealRooms.map((dealRoom) => (
                <li key={dealRoom.id}>
                  <Link href={`/d/${dealRoom.id}`}>
                    <div className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {dealRoom.name}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              Created {new Date(dealRoom.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
              {userDealRooms.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No deal rooms yet. Create your first one to get started!
                </div>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}