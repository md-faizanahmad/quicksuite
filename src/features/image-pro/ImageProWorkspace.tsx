"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Download,
  Loader2,
  ImageIcon,
  RefreshCcw,
  Crop as CropIcon,
} from "lucide-react";
import { processBackgroundRemoval } from "@/lib/image-pro-engine";
import Image from "next/image";
import Cropper, { Area } from "react-easy-crop";

export default function ImageProWorkspace() {
  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState<{ file: File; preview: string } | null>(
    null
  );
  const [result, setResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState("");

  // Cropper States
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setImage({ file: f, preview: URL.createObjectURL(f) });
      setResult(null);
    }
  };

  const applyCrop = async () => {
    if (!image || !croppedAreaPixels) return;
    const img = new window.Image();
    img.src = image.preview;
    await new Promise((res) => (img.onload = res));

    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    const croppedUrl = canvas.toDataURL("image/png");
    setImage({ ...image, preview: croppedUrl });
    setCropping(false);
  };

  const onRemoveBG = async () => {
    if (!image) return;
    setIsProcessing(true);
    try {
      const apiResult = await processBackgroundRemoval(
        image.preview,
        (task, p) => {
          setCurrentTask(task);
          setProgress(p);
        }
      );
      setResult(apiResult); // Result is the Base64 from API
    } catch (e) {
      alert("Processing failed. Check internet/API.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-32 w-full">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">
          Image<span className="text-primary">Pro</span>
        </h1>
        <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase rounded-full">
          ⚡ AI Background Remover
        </span>
      </header>

      {!image ? (
        <div className="relative border-2 border-dashed border-border rounded-[2.5rem] p-16 text-center bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-all group">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <ImageIcon
            className="mx-auto mb-4 opacity-20 group-hover:scale-110 transition-all"
            size={48}
          />
          <p className="font-black uppercase italic tracking-tight">
            Upload Image
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-card border border-border flex items-center justify-center p-4">
            {result && (
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "conic-gradient(#888 25%, #eee 0 50%, #888 0 75%, #eee 0)",
                  backgroundSize: "20px 20px",
                }}
              />
            )}

            <div className="relative w-full h-full">
              <Image
                src={result || image.preview}
                fill
                className="object-contain z-10"
                alt="Preview"
                unoptimized
              />
            </div>

            {isProcessing && (
              <div className="absolute inset-0 z-20 bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
                <Loader2 className="animate-spin text-primary mb-4" size={48} />
                <p className="font-black uppercase text-sm mb-1">
                  {currentTask}
                </p>
                <p className="text-4xl font-black text-primary">{progress}%</p>
              </div>
            )}

            <button
              onClick={() => setImage(null)}
              className="absolute top-6 right-6 z-30 p-2 bg-foreground/10 rounded-full hover:bg-red-500 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {!result ? (
              <>
                <button
                  onClick={() => setCropping(true)}
                  className="flex-1 py-4 bg-foreground/[0.05] border border-border font-black rounded-2xl flex items-center justify-center gap-2"
                >
                  <CropIcon size={18} /> CROP
                </button>
                <button
                  onClick={onRemoveBG}
                  disabled={isProcessing}
                  className="flex-[2] py-4 bg-primary text-black font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                >
                  <Sparkles size={18} fill="black" /> REMOVE BACKGROUND
                </button>
              </>
            ) : (
              <a
                href={result}
                download="removed-bg.png"
                className="w-full py-5 bg-primary text-black font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                <Download size={20} /> DOWNLOAD PNG
              </a>
            )}
          </div>
        </motion.div>
      )}

      {/* Cropper Modal */}
      <AnimatePresence>
        {cropping && image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <div className="bg-card border border-border p-6 rounded-[2.5rem] w-full max-w-lg space-y-6">
              <h3 className="font-black uppercase italic italic">
                Adjust Focus
              </h3>
              <div className="relative w-full h-80 bg-black rounded-2xl overflow-hidden">
                <Cropper
                  image={image.preview}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setCropping(false)}
                  className="flex-1 py-3 bg-foreground/5 rounded-xl font-bold"
                >
                  CANCEL
                </button>
                <button
                  onClick={applyCrop}
                  className="flex-1 py-3 bg-primary text-black rounded-xl font-black"
                >
                  APPLY CROP
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
