"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import { validatePDFSelection } from "@/lib/validation";
import { mergePDFs } from "@/lib/pdf-engine";

export interface QueuedFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

export type MergeStatus = "idle" | "processing" | "completed";

export default function usePdfMerge() {
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [status, setStatus] = useState<MergeStatus>("idle");
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);

  // Keep the download URL alive until the success dialog is dismissed.
  useEffect(() => {
    if (!mergedUrl) return;

    return () => {
      URL.revokeObjectURL(mergedUrl);
    };
  }, [mergedUrl]);

  const resetWorkspace = () => {
    setFiles([]);
    setMergedUrl(null);
    setStatus("idle");
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const selectedFiles = input.files;

    if (!selectedFiles) return;

    const incoming = Array.from(selectedFiles);
    input.value = "";

    const error = validatePDFSelection(files.length, incoming);

    if (error) {
      alert(error);
      return;
    }

    // If a previous merge completed, dismiss its result state
    // without removing the files being uploaded now.
    if (status === "completed") {
      setMergedUrl(null);
      setStatus("idle");
    }

    const newEntries: QueuedFile[] = incoming.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    }));

    setFiles((previous) => [...previous, ...newEntries]);
  };

  const handleMerge = async () => {
    if (files.length < 2 || status === "processing") return;

    setStatus("processing");

    try {
      const blob = await mergePDFs(files.map((file) => file.file));
      const url = URL.createObjectURL(blob);

      // Initiate the browser download.
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Keep the URL alive while the success dialog is open.
      setMergedUrl(url);

      // Clear the queue and show the success state.
      setFiles([]);
      setStatus("completed");
    } catch (error) {
      console.error("Merge Logic Error:", error);
      setStatus("idle");
      alert("Unable to merge these PDFs. Please try again.");
    }
  };

  const removeFile = (id: string) => {
    setFiles((previous) => previous.filter((file) => file.id !== id));
  };

  return {
    files,
    setFiles,
    status,
    mergedUrl,
    handleUpload,
    handleMerge,
    removeFile,
    resetWorkspace,
  };
}
