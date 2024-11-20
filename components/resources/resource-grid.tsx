"use client";

import { Resource } from "@prisma/client";
import { Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "./resource-card";
import { ResourceList } from "./resource-list";
import { useState } from "react";

interface ResourceGridProps {
  resources: Resource[];
  isCustomerView?: boolean;
}

export function ResourceGrid({ resources, isCustomerView }: ResourceGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-4">
      {!isCustomerView && (
        <div className="flex justify-end">
          <div className="flex items-center gap-2 bg-secondary/10 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-white shadow-sm" : ""}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-white shadow-sm" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource}
              isCustomerView={isCustomerView}
            />
          ))}
        </div>
      ) : (
        <ResourceList 
          resources={resources}
          isCustomerView={isCustomerView}
        />
      )}
    </div>
  );
}