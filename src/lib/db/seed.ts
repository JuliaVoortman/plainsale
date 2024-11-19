import { db } from '@/lib/db';
import { organizations, users, dealRooms, resources } from './schema';
import { v4 as uuidv4 } from 'uuid';

// Demo organization ID
const DEMO_ORG_ID = '11111111-1111-1111-1111-111111111111';
const DEMO_USER_ID = '22222222-2222-2222-2222-222222222222';
const DEMO_DEAL_ROOM_ID = '33333333-3333-3333-3333-333333333333';

export async function seedDemoData() {
  // Create demo organization
  await db.insert(organizations).values({
    id: DEMO_ORG_ID,
    name: 'Demo Organization',
    slug: 'demo-org',
    settings: { theme: 'light' }
  });

  // Create demo user
  await db.insert(users).values({
    id: DEMO_USER_ID,
    email: 'demo@example.com',
    name: 'Demo User',
    orgId: DEMO_ORG_ID,
    role: 'admin'
  });

  // Create demo deal room
  await db.insert(dealRooms).values({
    id: DEMO_DEAL_ROOM_ID,
    name: 'Sample Deal Room',
    orgId: DEMO_ORG_ID,
    ownerId: DEMO_USER_ID
  });

  // Add sample resources
  await db.insert(resources).values([
    {
      id: uuidv4(),
      name: 'Product Overview.pdf',
      type: 'application/pdf',
      url: 'https://example.com/sample.pdf',
      dealRoomId: DEMO_DEAL_ROOM_ID
    },
    {
      id: uuidv4(),
      name: 'Sales Deck.pptx',
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      url: 'https://example.com/deck.pptx',
      dealRoomId: DEMO_DEAL_ROOM_ID
    }
  ]);
}