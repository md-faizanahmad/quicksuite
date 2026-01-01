import { PDFDocument } from "pdf-lib";

/**
 * PDF Reduction Logic
 * Focus: Rasterizing to hit small KB targets for 1-2 page docs.
 */

/**
 * Aggressively reduces PDF size by rendering pages to images.
 * Optimized for 1-2 page docs to hit 25KB/50KB targets.
 */
async function compressPDF(file: File, targetKB: number): Promise<Blob> {
  if (typeof window === "undefined") return file;

  // 1. Dynamic Import
  const pdfjsLib = await import("pdfjs-dist");

  // 2. Set worker to the .mjs path
  // Ensure your file in public is exactly: /public/workers/pdf.worker.min.mjs
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/workers/pdf.worker.min.mjs`;

  const originalBytes = file.size;
  const arrayBuffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  // Safety Constraint
  if (pdf.numPages > 2) {
    throw new Error(
      "PDF exceeds 2 pages. Use 1-2 pages for extreme reduction."
    );
  }

  const finalDoc = await PDFDocument.create();
  const targetBytes = targetKB * 1024;
  const targetPerPage = targetBytes / pdf.numPages;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    // Low targets need lower resolution (DPI)
    const scale = targetKB <= 30 ? 0.8 : 1.2;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) continue;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: ctx,
      viewport: viewport,
    }).promise;

    let quality = targetKB <= 30 ? 0.15 : 0.35;
    let imgBlob: Blob | null = null;

    // Quality Ladder
    for (let attempt = 0; attempt < 5; attempt++) {
      imgBlob = await new Promise<Blob | null>((res) =>
        canvas.toBlob(res, "image/jpeg", quality)
      );

      if (!imgBlob) break;
      if (imgBlob.size <= targetPerPage) break;
      quality -= 0.07;
    }

    if (imgBlob) {
      const imgBytes = await imgBlob.arrayBuffer();
      const image = await finalDoc.embedJpg(imgBytes);
      const pdfPage = finalDoc.addPage([image.width, image.height]);
      pdfPage.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }
  }

  const pdfBytes = await finalDoc.save({ useObjectStreams: true });

  // 2. The Fix: Double-cast to 'unknown' then 'BlobPart'
  // This tells TS: "I know what I'm doing, treat this as a valid part for the Blob"
  const resultBlob = new Blob([pdfBytes as unknown as BlobPart], {
    type: "application/pdf",
  });

  // 3. Return original if result is somehow larger (safety check)
  return resultBlob.size < originalBytes ? resultBlob : file;
}

/**
 * Entry point
 */

/**
 * Your existing Image logic (kept intact)
 */
async function compressImage(file: File, targetKB: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  let quality = 0.8;
  let scale = 1.0;
  let result: Blob | null = null;
  for (let i = 0; i < 6; i++) {
    canvas.width = bitmap.width * scale;
    canvas.height = bitmap.height * scale;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    result = await new Promise((r) =>
      canvas.toBlob((b) => r(b), "image/jpeg", quality)
    );
    if (result && result.size / 1024 <= targetKB) break;
    quality -= 0.15;
    scale -= 0.1;
  }
  return result || file;
}

export async function runReduction(
  file: File,
  targetKB: number
): Promise<Blob> {
  if (file.type.startsWith("image/")) return compressImage(file, targetKB);
  if (file.type === "application/pdf") return compressPDF(file, targetKB);
  return file;
}
