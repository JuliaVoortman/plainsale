import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { db } from '@/lib/db';
import { dealRooms } from '@/lib/db/schema';

export async function POST(request: Request) {
  const session = await getSession();
  
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { name } = await request.json();

    const [dealRoom] = await db.insert(dealRooms)
      .values({
        name,
        orgId: session.user.orgId,
        ownerId: session.user.id,
      })
      .returning();

    return NextResponse.json(dealRoom);
  } catch (error) {
    console.error('Error creating deal room:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}