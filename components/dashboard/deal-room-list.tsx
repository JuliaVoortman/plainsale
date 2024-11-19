"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DealRoom } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function DealRoomList() {
  const [dealRooms, setDealRooms] = useState<DealRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDealRooms() {
      try {
        const response = await fetch("/api/deal-rooms");
        const data = await response.json();
        setDealRooms(data);
      } catch (error) {
        console.error("Failed to fetch deal rooms:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDealRooms();
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="group relative overflow-hidden transition-all hover:shadow-xl">
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (dealRooms.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-orange-100 to-yellow-100 border-none">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-xl font-semibold text-primary mb-2">
            No deal rooms found
          </p>
          <p className="text-muted-foreground">
            Create your first deal room to get started
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {dealRooms.map((dealRoom) => (
        <Link href={`/dashboard/${dealRoom.id}`} key={dealRoom.id}>
          <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:scale-105 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {dealRoom.name}
                </CardTitle>
                <Badge variant={dealRoom.status === "ACTIVE" ? "default" : "secondary"}>
                  {dealRoom.status.toLowerCase()}
                </Badge>
              </div>
              <CardDescription className="text-base">
                {dealRoom.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Created {formatDistanceToNow(new Date(dealRoom.createdAt), { addSuffix: true })}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}