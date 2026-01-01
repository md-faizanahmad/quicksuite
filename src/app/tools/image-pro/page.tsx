import ImageProWorkspace from "@/features/image-pro/ImageProWorkspace";

export const metadata = {
  title: "QuickImage Pro | AI Background Removal",
  description: "Remove image backgrounds locally and securely in your browser.",
};

export default function ImageProPage() {
  return (
    <main className="pt-32 pb-20">
      <ImageProWorkspace />
    </main>
  );
}
