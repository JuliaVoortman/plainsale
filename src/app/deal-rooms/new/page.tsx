import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { CreateDealRoomForm } from '@/components/deal-room/CreateDealRoomForm';

export default async function NewDealRoomPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Deal Room</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <CreateDealRoomForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}