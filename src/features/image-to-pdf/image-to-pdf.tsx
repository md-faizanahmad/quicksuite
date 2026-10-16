"use client";

import { useState } from "react";
import ImagePreviewPanel from "./ImagePreviewPanel";
import ImageToPdfResultModal from "./ImageToPdfResultModal";
import useImageToPdf from "@/hooks/useImageToPdf";

export default function ImageToPdfPage() {
  const {
    images,
    isProcessing,
    pdfUrl,
    handleUpload,
    removeImage,
    clearAll,
    handleConvert,
    editImages,
  } = useImageToPdf();

  const [isResultModalDismissed, setIsResultModalDismissed] = useState(false);

  const isResultModalOpen = Boolean(pdfUrl) && !isResultModalDismissed;

  const handleConvertMore = () => {
    setIsResultModalDismissed(false);
    editImages();
  };

  return (
    <div className="w-full px-4 py-8 sm:px-6 sm:py-12">
      <ImagePreviewPanel
        images={images}
        isProcessing={isProcessing}
        pdfReady={Boolean(pdfUrl)}
        onUpload={handleUpload}
        onRemove={removeImage}
        onClearAll={() => {
          setIsResultModalDismissed(false);
          clearAll();
        }}
        onConvert={handleConvert}
        onViewResult={() => setIsResultModalDismissed(false)}
      />

      {isResultModalOpen && pdfUrl && (
        <ImageToPdfResultModal
          pdfUrl={pdfUrl}
          imageCount={images.length}
          onConvertMore={handleConvertMore}
          onClose={() => setIsResultModalDismissed(true)}
        />
      )}
    </div>
  );
}
