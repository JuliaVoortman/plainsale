"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface ResourceUploadProps {
  dealRoomId: string;
}

const ALLOWED_FILE_TYPES = {
  // Documents
  'application/pdf': 'PDF',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
  // Images
  'image/jpeg': 'JPEG',
  'image/png': 'PNG',
  'image/gif': 'GIF',
  'image/webp': 'WEBP',
  // Videos
  'video/mp4': 'MP4',
  'video/quicktime': 'MOV',
  'video/webm': 'WEBM',
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function ResourceUpload({ dealRoomId }: ResourceUploadProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  function validateFile(file: File) {
    if (!ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES]) {
      throw new Error("File type not supported");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size exceeds 50MB limit");
    }

    return true;
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateFile(file);
      setIsUploading(true);
      setUploadProgress(0);

      // Get presigned URL
      const urlRes = await fetch(`/api/deal-rooms/${dealRoomId}/resources/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!urlRes.ok) throw new Error("Failed to get upload URL");

      const { url, fields } = await urlRes.json();

      // Upload to S3 with progress tracking
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      });

      await new Promise((resolve, reject) => {
        xhr.open("POST", url, true);
        xhr.onload = () => {
          if (xhr.status === 204 || xhr.status === 200) {
            resolve(null);
          } else {
            reject(new Error("Upload failed"));
          }
        };
        xhr.onerror = () => reject(new Error("Upload failed"));
        xhr.send(formData);
      });

      // Create resource record
      const resourceRes = await fetch(`/api/deal-rooms/${dealRoomId}/resources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: file.name,
          type: ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES],
          url: `${url}/${fields.key}`,
          contentType: file.type,
        }),
      });

      if (!resourceRes.ok) throw new Error("Failed to create resource");

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      router.refresh();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload file",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }

  const allowedExtensions = Object.values(ALLOWED_FILE_TYPES).join(', ');

  return (
    <Card className="bg-gradient-to-br from-orange-100 to-yellow-100 border-none">
      <CardHeader>
        <CardTitle className="text-[#002447]">Upload Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col items-center justify-center space-y-2 rounded-xl border-2 border-dashed border-[#002447]/20 bg-white/50 p-8">
            <div className="flex items-center justify-center text-[#002447]">
              <Label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-semibold hover:text-[#002447]/80"
              >
                <FileUp className="mx-auto h-16 w-16" />
                <span className="mt-4 block text-lg">
                  {isUploading ? "Uploading..." : "Click to upload"}
                </span>
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={onFileChange}
                  disabled={isUploading}
                  accept={Object.keys(ALLOWED_FILE_TYPES).join(',')}
                />
              </Label>
            </div>
            <div className="text-sm text-[#002447]/60 text-center">
              <p>Supported formats: {allowedExtensions}</p>
              <p className="mt-1">Maximum file size: 50MB</p>
            </div>
            {isUploading && (
              <div className="w-full mt-4 space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-center text-[#002447]/60">
                  {uploadProgress}% uploaded
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}