'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { ResultsModal } from '@/components/results-modal'

// Mock data for similar products
const mockResults = [
  {
    id: 1,
    title: 'Beige Zip-Up Jacket',
    price: '$79.99',
    store: 'Fashion Store',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 2,
    title: 'Classic Fleece Jacket',
    price: '$89.99',
    store: 'Outdoor Gear',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 3,
    title: 'Casual Bomber Jacket',
    price: '$99.99',
    store: 'Urban Outfitters',
    image: '/placeholder.svg?height=200&width=200',
  },
  // Add more mock results...
]

export function ImageResults() {
  const [isLoading, setIsLoading] = useState(true)
  const [showResultsModal, setShowResultsModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleResultClick = (image: string) => {
    fetch(image)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })
        setSelectedImage(file)
        setShowResultsModal(true)
      })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Sparkles className="h-8 w-8 text-[#8ab4f8] sparkle" />
      </div>
    )
  }

  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockResults.map((result) => (
          <div
            key={result.id}
            className="group relative overflow-hidden rounded-lg bg-[#303134] hover:bg-[#3c4043] transition-colors cursor-pointer"
            onClick={() => handleResultClick(result.image)}
          >
            <div className="aspect-square relative">
              <Image
                src={result.image}
                alt={result.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-sm mb-1">{result.title}</h3>
              <p className="text-[#8ab4f8] text-sm">{result.price}</p>
              <p className="text-gray-400 text-xs">{result.store}</p>
            </div>
          </div>
        ))}
      </div>
      {showResultsModal && selectedImage && (
        <ResultsModal
          isOpen={showResultsModal}
          onClose={() => setShowResultsModal(false)}
          imageFile={selectedImage}
        />
      )}
    </div>
  )
}

