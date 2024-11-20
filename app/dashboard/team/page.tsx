import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { TeamList } from "@/components/team/team-list";
import { InviteTeamMember } from "@/components/team/invite-team-member";

export const metadata: Metadata = {
  title: "Team Management - DealRoom",
  description: "Manage your team members and roles",
};

export default async function TeamPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.organizationId) {
    redirect("/login");
  }

  const users = await prisma.user.findMany({
    where: {
      organizationId: session.user.organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team</h2>
          <p className="text-muted-foreground">
            Manage your team members and their roles
          </p>
        </div>
        <InviteTeamMember />
      </div>
      <TeamList users={users} currentUserId={session.user.id} />
    </div>
  );
}