"use client";

import { useState } from 'react';
import { DocumentIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/Button';

interface ResourceListProps {
  dealRoomId: string;
}

export function ResourceList({ dealRoomId }: ResourceListProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [resources, setResources] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files) => {
      setIsUploading(true);
      // Implement file upload logic here
      setIsUploading(false);
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Resources</h2>
        <Button variant="primary" onClick={() => {}}>
          Add Resource
        </Button>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop files here, or click to select files
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource: any) => (
          <div
            key={resource.id}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <DocumentIcon className="h-6 w-6 text-gray-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {resource.name}
              </p>
              <p className="truncate text-sm text-gray-500">
                Added {new Date(resource.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}