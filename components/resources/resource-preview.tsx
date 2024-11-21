"use client";

import { useEffect, useRef, useState } from "react";
import { Resource } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface ResourcePreviewProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
}

export function ResourcePreview({ resource, isOpen, onClose }: ResourcePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const contentType = resource.contentType || resource.type;
  const isImage = contentType?.startsWith('image/');
  const isVideo = contentType?.startsWith('video/');
  const isPDF = contentType === 'application/pdf';

  useEffect(() => {
    if (!isOpen || !resource.url || !isPDF) return;

    async function loadPDF() {
      try {
        setIsLoading(true);
        setError(null);

        const loadingTask = pdfjsLib.getDocument(resource.url);
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);

        const page = await pdf.getPage(currentPage);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const viewport = page.getViewport({ scale: 1.5 });
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

      } catch (err) {
        setError("Failed to load PDF preview");
        console.error("PDF preview error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (isPDF) {
      loadPDF();
    } else {
      setIsLoading(false);
    }
  }, [isOpen, resource.url, isPDF, currentPage]);

  function handleDownload() {
    window.open(resource.url, "_blank");
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{resource.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {isLoading ? (
            <div className="flex h-[600px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="flex h-[600px] flex-col items-center justify-center space-y-4">
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Instead
              </Button>
            </div>
          ) : isPDF ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
                    disabled={currentPage >= numPages}
                  >
                    Next
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {numPages}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="flex justify-center overflow-auto">
                <canvas ref={canvasRef} className="max-h-[600px]" />
              </div>
            </div>
          ) : isImage ? (
            <div className="space-y-4">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src={resource.url}
                  alt={resource.name}
                  fill
                  className="rounded-md object-contain"
                />
              </AspectRatio>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          ) : isVideo ? (
            <div className="space-y-4">
              <AspectRatio ratio={16 / 9}>
                <video
                  src={resource.url}
                  controls
                  className="h-full w-full rounded-md"
                >
                  Your browser does not support the video tag.
                </video>
              </AspectRatio>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-[600px] flex-col items-center justify-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Preview not available for this file type
              </p>
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download File
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}