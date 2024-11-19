import { db } from '@/lib/db';
import { dealRooms, resources, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function getDealRoom(id: string) {
  const [dealRoom] = await db.select()
    .from(dealRooms)
    .where(eq(dealRooms.id, id))
    .leftJoin(users, eq(dealRooms.ownerId, users.id))
    .leftJoin(resources, eq(resources.dealRoomId, dealRooms.id));
    
  if (!dealRoom) return null;
  
  return dealRoom;
}