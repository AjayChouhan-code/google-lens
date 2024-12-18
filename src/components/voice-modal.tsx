'use client'

import { useState } from 'react'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Mic, X } from 'lucide-react'
import { GoogleLogo } from './GoogleLogo'

interface VoiceModalProps { 
  isOpen: boolean 
  onClose: () => void 
}

export function VoiceModal({ isOpen, onClose }: VoiceModalProps) {
  return (
    <div className={`fixed inset-0 z-50 bg-[#202124] flex flex-col items-center justify-start pt-16 ${isOpen ? 'block' : 'hidden'}`}>
     
  
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full hover:bg-gray-800"
      >
        <X className="h-4 w-4 text-gray-400" />
      </Button>

    
      <div className="flex  h-screen gap-96  items-center">
        <p className="text-[#e8eaed] text-6xl">Listening...</p>
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
            <Mic className="h-12 w-12 text-[#ea4335]" />
          </div>
                   <div className="absolute inset-0 animate-ping rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  )
}

