"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { ResultsModal } from "./results-modal";
import { GoogleLogo } from "./GoogleLogo";
import { Header } from "./header";
import { Footer } from "./footer";

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImageSearchModal({ isOpen, onClose }: ImageSearchModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      await handleFiles(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      await handleFiles(files[0]);
    }
  };

  const handleFiles = async (file: File) => {
    setIsUploading(true);
    setUploadedFile(file);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);
    setShowResults(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-800 flex flex-col items-center">
      <div className="w-screen">
        <Header />
      </div>
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="flex h-screen flex-col items-center justify-center gap-10">
          <div className="">
            <GoogleLogo className="w-[272px] text-white mb-8" />
          </div>
          <div className="relative w-full max-w-[650px] bg-neutral-700 rounded-3xl">
            <div className="flex justify-center items-center px-4 pt-5">
              <h2 className="text-[18px] text-white">
                Search any image with Google Lens
              </h2>
              <button
                onClick={onClose}
                className="text-[#9aa0a6] hover:text-white transition-colors absolute right-5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 m-6 bg-zinc-800 border rounded-xl border-dashed border-slate-600">
              {isUploading ? (
                <div className="h-[200px] flex flex-col items-center justify-center">
                  <div className="w-6 h-6 border-2 border-[#8ab4f8] border-t-transparent rounded-full animate-spin mb-2" />
                  <p className="text-[#8ab4f8] text-sm">Uploading...</p>
                </div>
              ) : (
              
                <div
                  className={`relative h-[150px] rounded-lg`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12  flex items-center justify-center">
                        <img src="./Googlesvg.svg" />
                      </div>
                      <div className="flex items-center gap-1 text-base">
                        <span className="text-[#bdc1c6]">
                          Drag an image here or
                        </span>
                        <button
                          className="text-[#8ab4f8] hover:underline focus:outline-none underline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          upload a file
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 my-4">
                <div className="h-[1px] flex-1 bg-[#5f6368]" />
                <span className="text-[#9aa0a6] text-sm">OR</span>
                <div className="h-[1px] flex-1 bg-[#5f6368]" />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 h-12 px-6 bg-[#303134] border border-[#5f6368] focus:border-[#8ab4f8] focus:outline-none text-white text-sm rounded-3xl placeholder:text-[#9aa0a6]"
                  placeholder="Paste image link"
                />
                <Button className="h-12 px-6 bg-[#303134] text-[#8ab4f8] hover:bg-[#3c4043] rounded-3xl text-sm font-medium border border-[#5f6368]">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer/>
      </div>
      

      {showResults && uploadedFile && (
        <ResultsModal
          isOpen={showResults}
          onClose={() => {
            setShowResults(false);
            onClose();
          }}
          imageFile={uploadedFile}
        />
      )}
    </div>
  );
}
