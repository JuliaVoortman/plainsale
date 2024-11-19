import { PrismaClient } from '@prisma/client';

class ConnectionManager {
  private static instance: ConnectionManager;
  private connections: Map<string, PrismaClient>;
  private defaultClient: PrismaClient;

  private constructor() {
    this.connections = new Map();
    this.defaultClient = new PrismaClient();
  }

  static getInstance(): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }
    return ConnectionManager.instance;
  }

  async getConnection(orgId: string): Promise<PrismaClient> {
    // For enterprise customers with dedicated schemas
    if (process.env.USE_DEDICATED_SCHEMAS === 'true') {
      if (!this.connections.has(orgId)) {
        const client = new PrismaClient({
          datasources: {
            db: {
              url: `${process.env.DATABASE_URL}?schema=${orgId}`
            }
          }
        });
        this.connections.set(orgId, client);
      }
      return this.connections.get(orgId)!;
    }

    // Default shared database with RLS
    return this.defaultClient;
  }

  async closeConnections() {
    await Promise.all([
      ...Array.from(this.connections.values()).map(client => client.$disconnect()),
      this.defaultClient.$disconnect()
    ]);
  }
}