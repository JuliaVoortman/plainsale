"use client";

import { Resource } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { Download, Eye, FileIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResourcePreview } from "./resource-preview";

interface ResourceCardProps {
  resource: Resource;
  isCustomerView?: boolean;
}

export function ResourceCard({ resource, isCustomerView }: ResourceCardProps) {
  const [showPreview, setShowPreview] = useState(false);

  function handleDownload() {
    window.open(resource.url, "_blank");
  }

  return (
    <>
      <Card className={`group transition-all hover:shadow-lg ${
        isCustomerView ? 'bg-white' : 'hover:border-[#FEB249]'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileIcon className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="secondary">
              {resource.type.toLowerCase()}
            </Badge>
          </div>
          <CardTitle className="line-clamp-1">{resource.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Added {formatDistanceToNow(new Date(resource.createdAt), { addSuffix: true })}
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </CardFooter>
      </Card>

      <ResourcePreview
        resource={resource}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </>
  );
}