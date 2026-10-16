"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { convertImagesToPdf } from "@/lib/image-to-pdf-engine";

export interface SelectedImage {
  id: string;
  url: string;
}

export default function useImageToPdf() {
  const [images, setImages] = useState<SelectedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Revoke the previous PDF URL when it changes or the hook unmounts.
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const files = Array.from(input.files || []);

    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
    }));

    setImages((previous) => [...previous, ...newImages]);
    setPdfUrl(null);

    // Allow the same file to be selected again.
    input.value = "";
  };

  const removeImage = (id: string) => {
    setImages((previous) => {
      const imageToRemove = previous.find((image) => image.id === id);

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }

      return previous.filter((image) => image.id !== id);
    });

    setPdfUrl(null);
  };

  const clearAll = () => {
    images.forEach((image) => URL.revokeObjectURL(image.url));

    setImages([]);
    setPdfUrl(null);
  };

  const handleConvert = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);

    try {
      const blob = await convertImagesToPdf(images.map((image) => image.url));

      setPdfUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("Conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const editImages = () => {
    setPdfUrl(null);
  };

  return {
    images,
    isProcessing,
    pdfUrl,
    handleUpload,
    removeImage,
    clearAll,
    handleConvert,
    editImages,
  };
}
