"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { performOCR } from "@/lib/ocr-engine";

export default function useOCR() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState("");
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file) return;

    setIsProcessing(true);
    setExtractedText("");
    setProgress(0);

    try {
      const text = await performOCR(file, (percentage: number) => {
        setProgress(percentage);
      });

      setExtractedText(text);
    } catch (error) {
      console.error("OCR Error:", error);
      alert(
        "Failed to extract text. Please ensure the document is clear and readable.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Clipboard Error:", error);
      alert("Failed to copy text to clipboard.");
    }
  };

  const downloadAsTxt = () => {
    const file = new Blob([extractedText], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(file);
    const element = document.createElement("a");

    element.href = url;
    element.download = "quicksuite-ocr-result.txt";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setExtractedText("");
    setProgress(0);
    setCopied(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    isProcessing,
    progress,
    extractedText,
    copied,
    fileInputRef,
    handleFileUpload,
    copyToClipboard,
    downloadAsTxt,
    reset,
  };
}
