"use client";

import { QueuedFile } from "@/hooks/usePdfMerge";
import { AnimatePresence, Reorder } from "framer-motion";
import { FileText, GripVertical, Plus, X } from "lucide-react";

interface MergeFileListProps {
  files: QueuedFile[];
  onReorder: (files: QueuedFile[]) => void;
  onRemove: (id: string) => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function MergeFileList({
  files,
  onReorder,
  onRemove,
  onUpload,
  disabled = false,
}: MergeFileListProps) {
  if (files.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-foreground">Merge order</h2>
          <p className="mt-1 text-sm text-foreground/55">
            Drag files to arrange the final document.
          </p>
        </div>

        <span className="w-fit rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground/65">
          {files.length} {files.length === 1 ? "file" : "files"}
        </span>
      </div>

      <Reorder.Group
        axis="y"
        values={files}
        onReorder={onReorder}
        className="divide-y divide-border"
      >
        <AnimatePresence initial={false}>
          {files.map((file, index) => (
            <Reorder.Item
              key={file.id}
              value={file}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center gap-3 overflow-hidden px-4 py-3 sm:px-5"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-background text-xs font-medium text-foreground/55">
                {index + 1}
              </span>

              <GripVertical
                size={18}
                className="shrink-0 cursor-grab text-foreground/30 active:cursor-grabbing"
              />

              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                <FileText size={19} />
              </span>

              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-sm font-medium text-foreground"
                  title={file.name}
                >
                  {file.name}
                </p>
                <p className="mt-1 text-xs text-foreground/50">{file.size}</p>
              </div>

              <button
                type="button"
                onClick={() => onRemove(file.id)}
                disabled={disabled}
                aria-label={`Remove ${file.name}`}
                title="Remove file"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg text-foreground/45 transition-colors hover:bg-background hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <X size={17} />
              </button>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      <label className="flex cursor-pointer items-center justify-center gap-2 border-t border-border px-5 py-3 text-sm font-medium text-foreground/65 transition-colors hover:bg-background hover:text-primary">
        <Plus size={16} />
        Add more PDFs
        <input
          type="file"
          multiple
          accept=".pdf,application/pdf"
          onChange={onUpload}
          disabled={disabled}
          className="sr-only"
        />
      </label>
    </section>
  );
}
