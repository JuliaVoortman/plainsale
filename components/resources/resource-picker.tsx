"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Resource } from "@prisma/client";
import { FileIcon, Image } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ResourcePickerProps {
  onSelect: (resourceUrl: string) => void;
  acceptedTypes?: string[];
}

export function ResourcePicker({ onSelect, acceptedTypes }: ResourcePickerProps) {
  const params = useParams();
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch resources when component mounts
  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch(`/api/deal-rooms/${params.dealRoomId}/resources`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        setResources(data.resources.filter((r: Resource) => 
          !acceptedTypes || acceptedTypes.includes(r.contentType || '')
        ));
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResources();
  }, [params.dealRoomId, acceptedTypes]);

  if (isLoading) {
    return <div className="h-96 flex items-center justify-center">Loading...</div>;
  }

  if (resources.length === 0) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-muted-foreground">
        <Image className="h-8 w-8 mb-2 opacity-50" />
        <p>No images available</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-96">
      <div className="grid grid-cols-4 gap-4 p-4">
        {resources.map((resource) => (
          <Card
            key={resource.id}
            className={cn(
              "relative group cursor-pointer overflow-hidden transition-all hover:ring-2 hover:ring-[#002447]",
              "aspect-square flex items-center justify-center"
            )}
            onClick={() => onSelect(resource.url)}
          >
            {resource.contentType?.startsWith('image/') ? (
              <img
                src={resource.url}
                alt={resource.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FileIcon className="h-8 w-8 text-muted-foreground" />
            )}
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}