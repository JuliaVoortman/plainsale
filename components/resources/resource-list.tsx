"use client";

import { Resource } from "@prisma/client";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileIcon } from "lucide-react";
import { ResourcePreview } from "./resource-preview";

interface ResourceListProps {
  resources: Resource[];
}

export function ResourceList({ resources }: ResourceListProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  if (resources.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-orange-100 to-yellow-100 border-none">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileIcon className="h-16 w-16 text-primary mb-4" />
          <p className="text-xl font-semibold text-primary mb-2">
            No resources yet
          </p>
          <p className="text-muted-foreground">
            Upload files to share with your team
          </p>
        </CardContent>
      </Card>
    );
  }

  function handleDownload(resource: Resource) {
    window.open(resource.url, "_blank");
  }

  return (
    <>
      <div className="space-y-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="group hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FileIcon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{resource.name}</CardTitle>
                </div>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  {resource.type.toLowerCase()}
                </Badge>
              </div>
              <CardDescription className="text-base pl-[52px]">
                Uploaded {formatDistanceToNow(new Date(resource.createdAt), { addSuffix: true })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 pl-[52px]">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedResource(resource)}
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleDownload(resource)}
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedResource && (
        <ResourcePreview
          resource={selectedResource}
          isOpen={!!selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}
    </>
  );
}