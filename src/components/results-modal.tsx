"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, Menu } from "lucide-react";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageFile: File;
}
const mockResults = [
  { id: 1, title: "Progress Chart", percentage: 64, color: "#00A3BF" },
  { id: 2, title: "Performance Graph", percentage: 45, color: "#0077CC" },
  { id: 3, title: "Efficiency Meter", percentage: 89, color: "#00A3BF" },
  { id: 4, title: "Productivity Index", percentage: 35, color: "#4285F4" },
  { id: 5, title: "Success Rate", percentage: 72, color: "#34A853" },
  { id: 6, title: "Goal Completion", percentage: 58, color: "#EA4335" },
  { id: 7, title: "Task Distribution", percentage: 81, color: "#FBBC05" },
  { id: 8, title: "Time Management", percentage: 67, color: "#FF6D01" },
];
export function ResultsModal({ isOpen, imageFile }: ResultsModalProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [cropArea, setCropArea] = useState({
    x: 20,
    y: 20,
    width: 60,
    height: 60,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(mockResults);
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);
  const fetchResults = async () => {
    if (!imageRef.current) return;
    setIsProcessing(true);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imageRef.current;
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = cropArea.width * scaleX;
    canvas.height = cropArea.height * scaleY;
    ctx.drawImage(
      img,
      cropArea.x * scaleX,
      cropArea.y * scaleY,
      cropArea.width * scaleX,
      cropArea.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );
    // Simulate API call with the cropped image
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Generate new mock results
    const newResults = mockResults.map((result) => ({
      ...result,
      percentage: Math.floor(Math.random() * 100),
    }));
    setResults(newResults);
    setIsProcessing(false);
  };
  useEffect(() => {
    if (activeHandle === null) {
      fetchResults();
    }
  }, [cropArea, activeHandle]);
  const handleMouseDown = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    setActiveHandle(handle);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!activeHandle) return;
    const container = imageContainerRef.current;
    if (!container) return;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setCropArea((prev) => {
      const newArea = { ...prev };
      switch (activeHandle) {
        case "nw":
          newArea.x = Math.min(x, prev.x + prev.width - 10);
          newArea.y = Math.min(y, prev.y + prev.height - 10);
          newArea.width = prev.x + prev.width - newArea.x;
          newArea.height = prev.y + prev.height - newArea.y;
          break;
        case "ne":
          newArea.y = Math.min(y, prev.y + prev.height - 10);
          newArea.width = Math.max(10, x - prev.x);
          newArea.height = prev.y + prev.height - newArea.y;
          break;
        case "sw":
          newArea.x = Math.min(x, prev.x + prev.width - 10);
          newArea.width = prev.x + prev.width - newArea.x;
          newArea.height = Math.max(10, y - prev.y);
          break;
        case "se":
          newArea.width = Math.max(10, x - prev.x);
          newArea.height = Math.max(10, y - prev.y);
          break;
      }
      return newArea;
    });
  };
  const handleMouseUp = () => {
    setActiveHandle(null);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* White Header */}
      <header className="flex items-center justify-between px-6 py-2 border-b">
        <div className="flex items-center gap-4">
          <Link href="/">
            <img src="/googlelogo.png" alt="Google" className="h-8" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-600 gap-2">
            <Upload className="h-5 w-5" />
            Upload
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Menu className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-500 text-white">
              A
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Left side - Dark theme */}
        <div className="w-1/2 bg-[#202124] p-6 flex flex-col">
          <div className="flex justify-center items-center mb-4">
            <Button
              variant="secondary"
              className=" bg-[#303134] justify-center items-center rounded-3xl"
            >
              <img src="./globesearch.png" height="30" width="30" />
              Find Image Source
            </Button>
          </div>
          <div
            className="flex-1 relative bg-[#303134] rounded-lg overflow-hidden"
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {imageUrl && (
              <div className="relative w-full h-full">
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Uploaded image"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[90%] max-h-[90%] w-auto h-auto object-contain"
                  style={{ margin: "auto" }}
                />
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-black/50"
                    style={{
                      clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0,
                        ${cropArea.x}% ${cropArea.y}%,
                        ${cropArea.x}% ${cropArea.y + cropArea.height}%,
                        ${cropArea.x + cropArea.width}% ${
                        cropArea.y + cropArea.height
                      }%,
                        ${cropArea.x + cropArea.width}% ${cropArea.y}%,
                        ${cropArea.x}% ${cropArea.y}%)`,
                    }}
                  />
                  <div
                    className="absolute border-2 border-transparent "
                    style={{
                      left: `${cropArea.x}%`,
                      top: `${cropArea.y}%`,
                      width: `${cropArea.width}%`,
                      height: `${cropArea.height}%`,
                    }}
                  >
                    {/* Corner handles */}
                    <div
                      className="absolute -left-1 -top-1 w-2 h-2 bg-white cursor-nw-resize"
                      onMouseDown={(e) => handleMouseDown(e, "nw")}
                    />
                    <div
                      className="absolute -right-1 -top-1 w-2 h-2 bg-white cursor-ne-resize"
                      onMouseDown={(e) => handleMouseDown(e, "ne")}
                    />
                    <div
                      className="absolute -left-1 -bottom-1 w-2 h-2 bg-white cursor-sw-resize"
                      onMouseDown={(e) => handleMouseDown(e, "sw")}
                    />
                    <div
                      className="absolute -right-1 -bottom-1 w-2 h-2 bg-white cursor-se-resize"
                      onMouseDown={(e) => handleMouseDown(e, "se")}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Action Buttons */}
          <div className="mt-6 flex gap-0 justify-center w-max m-auto rounded-3xl bg-[#303134]">
            <Button
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100 rounded-3xl"
            >
              Search
            </Button>
            <Button
              variant="ghost"
              className="bg-[transparent] text-gray-300 hover:bg-[#404144] border-none rounded-none "
            >
              Text
            </Button>
            <Button
              variant="ghost"
              className="bg-[transparent] text-gray-300 hover:bg-[#404144] rounded-none "
            >
              Translate
            </Button>
          </div>
        </div>
        {/* Right side - Light theme */}
        <div className="w-1/2 bg-white p-6 relative">
          <div
            className="flex-1 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 144px)" }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Visual matches
            </h2>
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-4" />
                <p className="text-gray-600">Analyzing image...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="bg-gray-50 p-6 rounded-lg flex flex-col items-center"
                  >
                    <CircularProgress
                      percentage={result.percentage}
                      color={result.color}
                    />
                    <p className="mt-4 text-sm font-medium text-gray-900">
                      {result.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Feedback Section - Fixed position */}
          <div className="absolute bottom-0 right-0 left-0 p-4 bg-white border-t">
            <div className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="text-gray-600"
                >
                  <path
                    fill="currentColor"
                    d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"
                  />
                </svg>
                Did you find these results useful?
              </div>
              <div className="flex gap-4">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Yes
                </button>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
