import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";

// Use a reliable CDN for the worker to avoid local pathing errors in Next.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

async function compressImage(
  file: File | Blob,
  targetKB: number
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return file as Blob;

  let quality = 0.7;
  let scale = 1.0;
  let resultBlob: Blob | null = null;

  // Binary search-like approach to hit target
  for (let i = 0; i < 5; i++) {
    canvas.width = bitmap.width * scale;
    canvas.height = bitmap.height * scale;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", quality)
    );

    if (blob) {
      resultBlob = blob;
      if (blob.size / 1024 <= targetKB) break;
    }

    quality -= 0.15;
    scale -= 0.15;
  }

  return resultBlob || (file as Blob);
}

async function compressPDF(file: File, targetKB: number): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const finalDoc = await PDFDocument.create();

  // Distribute KB budget across pages
  const targetBytesPerPage = (targetKB * 1024) / pdf.numPages;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    // Scale down resolution if target is very low
    const scale = targetKB < 60 ? 1.0 : 1.5;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) continue;

    canvas.width = viewport.width;
    canvas.height = viewport.height;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport }).promise;

    // Start with low quality to hit aggressive targets
    let quality = 0.4;
    let pageImageBlob: Blob | null = null;

    // Internal loop to ensure the page image hits its portion of the KB budget
    for (let attempt = 0; attempt < 3; attempt++) {
      pageImageBlob = await new Promise<Blob | null>((res) =>
        canvas.toBlob(res, "image/jpeg", quality)
      );
      if (!pageImageBlob || pageImageBlob.size <= targetBytesPerPage) break;
      quality -= 0.1;
    }

    if (pageImageBlob) {
      const imgBytes = await pageImageBlob.arrayBuffer();
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
  return new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
}

export async function runReduction(
  file: File,
  targetKB: number
): Promise<Blob> {
  if (file.type.startsWith("image/")) {
    return compressImage(file, targetKB);
  }
  if (file.type === "application/pdf") {
    return compressPDF(file, targetKB);
  }
  return file;
}
