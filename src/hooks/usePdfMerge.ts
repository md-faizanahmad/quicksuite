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

  // Release the generated PDF URL when it changes or the hook unmounts.
  useEffect(() => {
    if (!mergedUrl) return;

    return () => {
      URL.revokeObjectURL(mergedUrl);
    };
  }, [mergedUrl]);

  const resetWorkspace = () => {
    setMergedUrl(null);
    setStatus("idle");
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const selectedFiles = input.files;

    if (!selectedFiles) return;

    const incoming = Array.from(selectedFiles);

    // Allow selecting the same file again after a previous selection.
    input.value = "";

    const error = validatePDFSelection(files.length, incoming);

    if (error) {
      alert(error);
      return;
    }

    const newEntries: QueuedFile[] = incoming.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    }));

    setFiles((previous) => [...previous, ...newEntries]);

    if (status === "completed") {
      resetWorkspace();
    }
  };

  const handleMerge = async () => {
    setStatus("processing");

    try {
      const blob = await mergePDFs(files.map((file) => file.file));
      const url = URL.createObjectURL(blob);

      setMergedUrl(url);
      setStatus("completed");
    } catch (error) {
      console.error("Merge Logic Error:", error);
      setStatus("idle");
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
