import { useState } from 'react';
import { DocumentIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/Button';
import { ResourceCard } from './ResourceCard';

interface Props {
  dealRoomId: string;
}

export function ResourceList({ dealRoomId }: Props) {
  const [uploading, setUploading] = useState(false);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files) => {
      setUploading(true);
      // Upload implementation
      setUploading(false);
    }
  });

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Resources</h2>
        <Button variant="outline" onClick={() => {}}>
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
        <div className="flex justify-center mb-4 space-x-4">
          <DocumentIcon className="h-8 w-8 text-gray-400" />
          <PhotoIcon className="h-8 w-8 text-gray-400" />
          <VideoCameraIcon className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-sm text-gray-600">
          {isDragActive
            ? "Drop the files here..."
            : "Drag 'n' drop files here, or click to select files"}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Resource cards will be mapped here */}
      </div>
    </section>
  );
}