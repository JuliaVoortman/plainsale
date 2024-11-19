import { prisma } from '@/lib/prisma';

export async function getDealRoom(id: string) {
  return prisma.dealRoom.findUnique({
    where: { id },
    include: {
      owner: true,
      members: true,
      resources: true
    }
  });
}