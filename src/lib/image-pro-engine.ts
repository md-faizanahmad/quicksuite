import { removeBackground, Config } from "@imgly/background-removal";

export async function processBackgroundRemoval(
  imageSource: ImageData | ArrayBuffer | Uint8Array | Blob | URL | string,
  onProgress?: (task: string, progress: number) => void
): Promise<Blob> {
  // Use a clean relative path for the public folder
  const config: Config = {
    // Ensuring the path points to where your models are copied
    publicPath: `${window.location.origin}/workers/imgly/`,

    // REMOVED "no-cors" - it blocks the reading of the binary model files
    fetchArgs: {
      mode: "same-origin",
    },

    output: {
      format: "image/png",
      quality: 0.8,
    },

    progress: (task: string, current: number, total: number) => {
      if (onProgress) {
        // Task titles are often technical (e.g., 'sd' or 'isnet'), let's clean them
        const friendlyTask = task.includes("model")
          ? "Loading AI Model"
          : "Processing Image";
        const percentage = Math.round((current / total) * 100) || 0;
        onProgress(friendlyTask, percentage);
      }
    },
  };

  try {
    return await removeBackground(imageSource, config);
  } catch (error) {
    console.error("AI Background Removal Error:", error);
    throw error;
  }
}
