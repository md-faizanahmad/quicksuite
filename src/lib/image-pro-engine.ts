import axios from "axios";

export async function processBackgroundRemoval(
  imagePreview: string,
  onProgress?: (task: string, progress: number) => void
): Promise<string> {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  // Force absolute URL
  if (baseUrl && !baseUrl.startsWith("http")) {
    baseUrl = `https://${baseUrl}`;
  }

  const cleanBaseUrl = baseUrl.replace(/\/$/, "");
  const finalUrl = `${cleanBaseUrl}/v1/ai/remove-bg`;

  try {
    const res = await fetch(imagePreview);
    const blob = await res.blob();

    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    if (onProgress) onProgress("AI Engine Removing Background...", 60);

    // Optimized Axios call with timeout and specific headers
    const response = await axios.post(
      finalUrl,
      { imageBase64: base64.replace(/^data:image\/\w+;base64,/, "") },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 30000, // 30 seconds for AI processing
      }
    );

    return response.data.image;
  } catch (error: any) {
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timed out. The AI server took too long.");
    }
    if (!error.response) {
      // This is usually where "Network Error" lives (CORS or Server Down)
      throw new Error(
        "Network Error: Check if the API server is running and CORS is enabled."
      );
    }
    throw error;
  }
}
