"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  Presentation,
  HomeIcon,
  PartyPopper,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const placeholderImages = [
  { icon: Building2, label: "Modern office space" },
  { icon: Users, label: "Our talented team" },
  { icon: Presentation, label: "Product demonstrations" },
  { icon: HomeIcon, label: "Meeting facilities" },
  { icon: PartyPopper, label: "Company culture" },
];

interface CompanyGalleryProps {
  images?: { url: string; alt: string }[];
}

export function CompanyGallery({ images }: CompanyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="relative px-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <div className="relative">
          <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
          
          <CarouselContent className="-ml-2">
            {placeholderImages.map((item, index) => {
              const Icon = item.icon;
              return (
                <CarouselItem key={index} className="pl-2 basis-1/4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div 
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-[#002447]/5 flex items-center justify-center group"
                        onClick={() => setSelectedIndex(index)}
                      >
                        <Icon className="h-8 w-8 text-[#002447]/40 group-hover:text-[#002447]/60 transition-colors" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <div className="aspect-video bg-[#002447]/5 rounded-lg flex flex-col items-center justify-center gap-4">
                        <Icon className="h-24 w-24 text-[#002447]/40" />
                        <p className="text-[#002447]/60 text-lg">{item.label}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
}
