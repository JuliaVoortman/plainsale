import { Prisma } from '@prisma/client';
import { getSession } from '@/lib/auth/session';

type Context = {
  orgId?: string;
  skipTenant?: boolean;
};

export function createPrismaMiddleware() {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>
  ) => {
    const context = params.args?.context as Context | undefined;
    
    // Skip middleware if explicitly requested
    if (context?.skipTenant) {
      return next(params);
    }

    const session = await getSession();
    const orgId = context?.orgId || session?.organization?.id;

    if (!orgId) {
      throw new Error('Organization ID is required');
    }

    // Models that require tenant isolation
    const tenantModels = ['User', 'DealRoom', 'Resource', 'Timeline'];

    if (tenantModels.includes(params.model || '')) {
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        // Add tenant filter to unique queries
        params.args.where = {
          ...params.args.where,
          orgId,
        };
      } else if (params.action === 'findMany') {
        // Add tenant filter to list queries
        params.args.where = {
          ...params.args.where,
          orgId,
        };
      } else if (params.action === 'create') {
        // Ensure tenant ID on creation
        params.args.data = {
          ...params.args.data,
          orgId,
        };
      } else if (params.action === 'update' || params.action === 'delete') {
        // Ensure updates/deletes only affect tenant's data
        params.args.where = {
          ...params.args.where,
          orgId,
        };
      }
    }

    return next(params);
  };
}