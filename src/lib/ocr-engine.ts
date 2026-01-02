import { createWorker } from "tesseract.js";
import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = "/workers/pdf.worker.min.mjs";

export async function performOCR(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  let fullText = "";

  if (file.type === "application/pdf") {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    const totalPages = pdf.numPages;

    const worker = await createWorker("eng", 1, {
      logger: (m) => {
        if (m.status === "recognizing text" && onProgress) {
          // This prevents the 1-100 loop by calculating global progress
          // We don't have the current page index here easily,
          // so we handle the specific page progress inside the loop below
        }
      },
    });

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (context) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;

        // Manual progress calculation for the loop
        const {
          data: { text },
        } = await worker.recognize(
          canvas,
          {},
          {
            // We use the jobId or just manual updates to avoid the logger jump
          }
        );

        fullText += `--- Page ${i} ---\n${text}\n\n`;

        // Update UI: (Finished Pages / Total) * 100
        if (onProgress) {
          onProgress(Math.round((i / totalPages) * 100));
        }
      }
    }
    await worker.terminate();
  } else {
    // For single images, the standard 1-100 is fine
    const worker = await createWorker("eng", 1, {
      logger: (m) => {
        if (m.status === "recognizing text" && onProgress) {
          onProgress(Math.round(m.progress * 100));
        }
      },
    });
    const imageUrl = URL.createObjectURL(file);
    const {
      data: { text },
    } = await worker.recognize(imageUrl);
    fullText = text;
    URL.revokeObjectURL(imageUrl);
    await worker.terminate();
  }

  return fullText;
}
