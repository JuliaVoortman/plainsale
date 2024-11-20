"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Shield, User as UserIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TeamListProps {
  users: User[];
  currentUserId: string;
}

export function TeamList({ users, currentUserId }: TeamListProps) {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleRoleChange(userId: string, newRole: "ADMIN" | "USER") {
    try {
      const response = await fetch(`/api/team/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Success",
        description: "User role updated successfully",
      });

      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user role",
      });
    }
  }

  async function handleDeleteUser() {
    if (!selectedUser) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/team/${selectedUser.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Success",
        description: "Team member removed successfully",
      });

      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove team member",
      });
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
    }
  }

  return (
    <>
      <div className="rounded-md border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const userInitials = user.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();

              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || ""} alt={user.name || ""} />
                        <AvatarFallback>{userInitials}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-[#002447]">{user.name}</span>
                        <span className="text-sm text-[#002447]/60">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="flex w-fit items-center gap-1 border-[#53D3D1] bg-[#53D3D1]/10"
                    >
                      {user.role === "ADMIN" ? (
                        <Shield className="h-3 w-3 text-[#002447]" />
                      ) : (
                        <UserIcon className="h-3 w-3 text-[#002447]" />
                      )}
                      <span className="text-[#002447]">
                        {user.role.toLowerCase()}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#002447]/60">
                    {formatDistanceToNow(new Date(user.createdAt), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    {user.id !== currentUserId && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-[#002447]/5"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleRoleChange(
                                user.id,
                                user.role === "ADMIN" ? "USER" : "ADMIN"
                              )
                            }
                          >
                            {user.role === "ADMIN"
                              ? "Remove admin"
                              : "Make admin"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            Remove user
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove team member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {selectedUser?.name} from the team?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={isLoading}
              className="bg-red-600 focus:ring-red-600"
            >
              {isLoading ? "Removing..." : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}