import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

export const db = drizzle(sql, { schema });

export type Organization = typeof schema.organizations.$inferSelect;
export type User = typeof schema.users.$inferSelect;
export type DealRoom = typeof schema.dealRooms.$inferSelect;
export type Resource = typeof schema.resources.$inferSelect;