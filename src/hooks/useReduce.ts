"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import * as pdfjs from "pdfjs-dist";

import { runReduction } from "@/lib/reduce-engine";

export interface ReduceResult {
  blob: Blob;
  url: string;
  finalSizeKB: number;
  savedPercent: number;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

export default function useReduce() {
  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReduceResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setError(null);
    setResult(null);

    if (selectedFile.type === "application/pdf") {
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await pdfjs.getDocument({
          data: arrayBuffer,
        }).promise;

        if (pdf.numPages > 2) {
          setError("QuickReduce currently supports only 1 or 2 page PDFs.");
          return;
        }
      } catch (err) {
        console.log(err);
        setError("Failed to read PDF structure. The file might be corrupted.");
        return;
      }
    }

    setFile(selectedFile);
  };

  const onReduce = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const reducedBlob = await runReduction(file, target);
      const url = URL.createObjectURL(reducedBlob);

      const saved = Math.max(
        0,
        ((file.size - reducedBlob.size) / file.size) * 100,
      );

      const finalSizeKB = Number((reducedBlob.size / 1024).toFixed(1));

      setResult({
        blob: reducedBlob,
        url,
        finalSizeKB,
        savedPercent: Math.round(saved),
      });
    } catch (err) {
      console.log(err);
      setError("Optimization failed. Try a slightly higher target size.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!result || !file) return;

    const link = document.createElement("a");
    link.href = result.url;
    link.download = `reduced_${file.name}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }

    setFile(null);
    setResult(null);
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    file,
    target,
    setTarget,
    isProcessing,
    error,
    setError,
    result,
    fileInputRef,
    handleFileUpload,
    onReduce,
    downloadFile,
    reset,
  };
}
