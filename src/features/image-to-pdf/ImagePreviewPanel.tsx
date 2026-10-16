"use client";

import { SelectedImage } from "@/hooks/useImageToPdf";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  FileOutput,
  ImageIcon,
  Loader2,
  Trash2,
  X,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

interface ImagePreviewPanelProps {
  images: SelectedImage[];
  isProcessing: boolean;
  pdfReady: boolean;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onConvert: () => void;
  onViewResult: () => void;
}

export default function ImagePreviewPanel({
  images,
  isProcessing,
  pdfReady,
  onUpload,
  onRemove,
  onClearAll,
  onConvert,
  onViewResult,
}: ImagePreviewPanelProps) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      {images.length > 0 && (
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-foreground/60">
            {images.length} {images.length === 1 ? "image" : "images"} selected
          </p>

          <button
            type="button"
            onClick={onClearAll}
            disabled={isProcessing}
            className="inline-flex min-h-10 items-center gap-2 border border-red-500/20 px-3 py-2 text-sm text-red-500 transition hover:bg-red-500/10 disabled:opacity-50"
          >
            <Trash2 size={15} />
            Clear all
          </button>
        </div>
      )}

      {images.length === 0 ? (
        <div className="relative flex min-h-64 flex-col items-center justify-center border border-dashed border-border bg-foreground/2 px-5 py-12 text-center transition hover:bg-foreground/4 sm:min-h-80">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onUpload}
            disabled={isProcessing}
            aria-label="Upload images"
            className="absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />

          <ImageIcon size={44} className="mb-4 text-foreground/35" />

          <h3 className="text-lg font-semibold text-foreground">
            Upload images
          </h3>

          <p className="mt-2 max-w-xs text-sm leading-6 text-foreground/60">
            Select photos or scanned documents to combine into one PDF.
          </p>

          <span className="mt-4 text-xs text-foreground/45">
            Multiple images supported
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
            <AnimatePresence>
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="relative aspect-3/4 overflow-hidden border border-border bg-card"
                >
                  <Image
                    src={image.url}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover"
                    alt={`Image ${index + 1} preview`}
                    unoptimized
                  />

                  <span className="absolute bottom-2 left-2 bg-black/65 px-2 py-1 text-xs text-white">
                    {index + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() => onRemove(image.id)}
                    disabled={isProcessing}
                    aria-label={`Remove image ${index + 1}`}
                    className="absolute right-2 top-2 z-20 flex size-8 items-center justify-center bg-black/65 text-white transition hover:bg-red-500 disabled:opacity-50"
                  >
                    <X size={15} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <label
              className={`relative flex aspect-3/4 flex-col items-center justify-center border border-dashed border-border transition hover:bg-foreground/3 ${
                isProcessing
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={onUpload}
                disabled={isProcessing}
                className="hidden"
                aria-label="Add more images"
              />

              <Plus size={24} className="text-foreground/55" />

              <span className="mt-2 text-xs font-medium text-foreground/65">
                Add images
              </span>
            </label>
          </div>

          {pdfReady ? (
            <button
              type="button"
              onClick={onViewResult}
              className="flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
            >
              <CheckCircle2 size={18} />
              View PDF result
            </button>
          ) : (
            <button
              type="button"
              onClick={onConvert}
              disabled={isProcessing || images.length === 0}
              className="flex min-h-12 w-full items-center justify-center gap-3 bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Converting {images.length} images...
                </>
              ) : (
                <>
                  <FileOutput size={19} />
                  Convert to PDF
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
