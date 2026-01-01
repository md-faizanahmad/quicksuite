import { PDFDocument } from "pdf-lib";
///////////////MERGE

/**
 * Merges multiple PDFs using pdf-lib.
 * 100% Client-side, zero watermarks, high performance.
 */
export async function mergePDFs(files: File[]): Promise<Blob> {
  // Create a new PDF document
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();

    // Load the individual PDF
    const pdf = await PDFDocument.load(arrayBuffer);

    // Copy all pages from the source PDF to the merged PDF
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  // Save the final PDF as a Uint8Array
  const pdfBytes = await mergedPdf.save();

  // Convert Uint8Array to ArrayBuffer
  // Modify the arrayBuffer conversion to ensure compatibility with BlobPart
  const arrayBuffer = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength
  ) as ArrayBuffer; // Explicitly cast to ArrayBuffer to avoid type issues

  return new Blob([arrayBuffer], { type: "application/pdf" });
}
