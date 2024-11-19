"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface ResourceUploadProps {
  dealRoomId: string;
}

export function ResourceUpload({ dealRoomId }: ResourceUploadProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Get presigned URL
      const urlRes = await fetch(`/api/deal-rooms/${dealRoomId}/resources/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      const { url, fields } = await urlRes.json();

      // Upload to S3
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadRes = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      // Create resource record
      await fetch(`/api/deal-rooms/${dealRoomId}/resources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: file.name,
          type: file.type.split("/")[1].toUpperCase(),
          url: `${url}/${fields.key}`,
        }),
      });

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload file",
      });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Card className="bg-gradient-to-br from-orange-100 to-yellow-100 border-none">
      <CardHeader>
        <CardTitle className="text-primary">Upload Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col items-center justify-center space-y-2 rounded-xl border-2 border-dashed border-primary/20 bg-white/50 p-8">
            <div className="flex items-center justify-center text-primary">
              <Label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-semibold hover:text-primary/80"
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
                />
              </Label>
            </div>
            <div className="text-sm text-primary/60">
              PDF, PPTX, XLSX up to 10MB
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}