import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

class ConnectionManager {
  private static instance: ConnectionManager;
  private connections: Map<string, ReturnType<typeof drizzle>>;
  private defaultClient: ReturnType<typeof drizzle>;

  private constructor() {
    this.connections = new Map();
    this.defaultClient = drizzle(sql, { schema });
  }

  static getInstance(): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }
    return ConnectionManager.instance;
  }

  getConnection(orgId: string): ReturnType<typeof drizzle> {
    // For now, we're using a single connection with RLS
    // In the future, we can implement schema-based isolation here
    return this.defaultClient;
  }
}