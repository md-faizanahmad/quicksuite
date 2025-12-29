import { PDFDocument } from "pdf-lib";

/** * HELPER: Image Compression Engine
 * Uses Canvas API to recursively reduce quality/size.
 */
async function compressImage(file: File, targetKB: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  let quality = 0.9;
  let scale = 1.0;
  let result: Blob | null = null;

  // Attempt up to 6 passes to hit the target
  for (let i = 0; i < 6; i++) {
    canvas.width = bitmap.width * scale;
    canvas.height = bitmap.height * scale;
    ctx?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    result = await new Promise((r) =>
      canvas.toBlob((b) => r(b), "image/jpeg", quality)
    );

    // If we hit the target, stop.
    if (result && result.size / 1024 <= targetKB) break;

    // Otherwise, get more aggressive
    quality -= 0.15;
    scale -= 0.1;
  }
  return result || file;
}

/** * HELPER: PDF Structural Engine
 * Strips metadata and packs objects.
 */
/** * HELPER: PDF Structural Engine
 * Strips metadata and packs objects.
 */
async function compressPDF(file: File): Promise<Blob> {
  const buffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer);

  // Strip heavy metadata
  pdfDoc.setTitle("");
  pdfDoc.setAuthor("");
  pdfDoc.setSubject("");
  pdfDoc.setProducer("");
  pdfDoc.setCreator("");

  const bytes = await pdfDoc.save({
    useObjectStreams: true,
    updateFieldAppearances: false,
  });

  // FIX: Explicitly cast to Uint8Array to satisfy the BlobPart requirement
  // This resolves the 'SharedArrayBuffer' incompatibility error
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}

/** * MAIN EXPORT: The Coordinator
 * Detects type and runs the correct logic.
 */
export async function runReduction(
  file: File,
  targetKB: number
): Promise<Blob> {
  try {
    if (file.type.startsWith("image/")) {
      return await compressImage(file, targetKB);
    }
    if (file.type === "application/pdf") {
      return await compressPDF(file);
    }
    return file;
  } catch (error) {
    console.error("Reduction Engine Error:", error);
    throw error; // Let the UI handle the error state
  }
}
