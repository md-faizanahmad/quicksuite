import { PDFDocument } from "pdf-lib";

/**
 * Converts any image format (WebP, JPG, PNG) to a PDF-compatible PNG ArrayBuffer
 */
async function getCompatibleImageData(url: string): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context failed");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        blob?.arrayBuffer().then(resolve);
      }, "image/png");
    };
    img.onerror = reject;
    img.src = url;
  });
}

export async function convertImagesToPdf(imageUrls: string[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  for (const url of imageUrls) {
    const imageBytes = await getCompatibleImageData(url);
    const image = await pdfDoc.embedPng(imageBytes);

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const pdfBytes = await pdfDoc.save();

  // FIX: Type cast to solve the SharedArrayBuffer / BlobPart error
  return new Blob([pdfBytes as unknown as BlobPart], {
    type: "application/pdf",
  });
}
