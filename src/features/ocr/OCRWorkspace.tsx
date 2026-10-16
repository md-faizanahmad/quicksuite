"use client";

import useOCR from "@/hooks/useOCR";
import OCRUploadPanel from "./OCRUploadPanel";
import OCRResultPanel from "./OCRResultPanel";

export default function OCRWorkspace() {
  const {
    isProcessing,
    progress,
    extractedText,
    copied,
    fileInputRef,
    handleFileUpload,
    copyToClipboard,
    downloadAsTxt,
    reset,
  } = useOCR();

  return (
    <div className="mx-auto w-full max-w-4xl">
      {!extractedText && (
        <OCRUploadPanel
          fileInputRef={fileInputRef}
          isProcessing={isProcessing}
          progress={progress}
          onFileUpload={handleFileUpload}
        />
      )}

      {extractedText && !isProcessing && (
        <OCRResultPanel
          extractedText={extractedText}
          copied={copied}
          onCopy={copyToClipboard}
          onDownload={downloadAsTxt}
          onReset={reset}
        />
      )}
    </div>
  );
}
