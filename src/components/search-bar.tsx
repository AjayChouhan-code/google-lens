'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageSearchModal } from '@/components/image-search-modal'
import { useRouter } from 'next/navigation'
import { VoiceModal } from '@/components/voice-modal'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([
          'Latest news',
          'Weather forecast',
          'Popular movies 2024',
          'Tech trends',
          'Sports updates',
        ])
        return
      }

      // Simulate API call for suggestions
      const mockSuggestions = [
        `${query} news`,
        `${query} definition`,
        `${query} meaning`,
        `${query} examples`,
        `${query} near me`,
      ]
      setSuggestions(mockSuggestions)
    }
    fetchSuggestions()
  }, [query])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="w-full" ref={searchRef}>
      <div
        className={`relative bg-[#303134] ${
          showSuggestions ? 'rounded-2xl' : 'rounded-full'
        } border-none focus-within:border-[transparent]`}
      >
        <div className="relative flex items-center mx-3">
          <div className="absolute left-0">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className={`w-full h-12 pl-8 pr-32 bg-transparent border-none focus:outline-none text-white ${
              showSuggestions ? 'rounded-t-2xl' : 'rounded-full'
            }`}
            placeholder="Search Google or type a URL"
          />
          <div className="absolute right-0 flex items-center gap-0">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
              onClick={() => setIsVoiceModalOpen(true)}
            >
              <img src="/mic.png" alt="Microphone Icon" width={30} height={30} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
              onClick={() => setIsImageModalOpen(true)}
            >
              <img src="/camera.png" alt="Camera Icon" width={30} height={30} />
            </Button>
          </div>
        </div>

        {showSuggestions && (
          <>
            <div className="py-3 text-sm text-[#9aa0a6] border-t-[1px] border-slate-400 mx-3">
              Trending searches
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#3c4043] text-left text-[#e8eaed]"
                onClick={() => handleSearch(suggestion)}
              >
                <TrendingUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm">{suggestion}</span>
              </button>
            ))}
            <div className="flex justify-center gap-2 py-4 px-2 border-none">
              <Button
                onClick={() => handleSearch(query || suggestions[0])}
                className="h-9 px-4 bg-[#303134] hover:bg-[#3c4043] text-white border border-[#5f6368] rounded focus:outline-none focus:ring-1 focus:ring-[#8ab4f8]"
              >
                Google Search 
              </Button>
              <Button className="h-9 px-4 bg-[#303134] hover:bg-[#3c4043] text-[14px] text-[#e8eaed] border border-[#5f6368] rounded focus:outline-none focus:ring-1 focus:ring-[#8ab4f8]">
                I'm Feeling Lucky
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Conditionally render the outer buttons */}
      {!showSuggestions && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="secondary"
            className="bg-[#303134] hover:bg-[#3c4043] text-white"
            onClick={() => handleSearch(query)}
          >
            Google Search
          </Button>
          <Button
            variant="secondary"
            className="bg-[#303134] hover:bg-[#3c4043] text-white"
          >
            I'm Feeling Lucky
          </Button>
        </div>
      )}

      {/* Google Offered In Line */}
      <div className="text-center mt-6 text-sm text-[#bdc1c6]">
        <span>Google offered in: </span>
        <a href="#" className="text-blue-300 hover:underline mx-1">
          हिन्दी
        </a>
        <a href="#" className="text-blue-300 hover:underline mx-1">
          বাংলা
        </a>
        <a href="#" className="text-blue-300 hover:underline mx-1">
          తెలుగు
        </a>
        <a href="#" className="text-blue-300 hover:underline mx-1">
          मराठी
        </a>
        <a href="#" className="text-blue-300 hover:underline mx-1">
          தமிழ்
        </a>
        <a href="#" className="text-blue-300 hover:underline mx-1">
          ગુજરાતી
        </a>
        <a href="#" className="text-blue-300 hover:underline mx-1">
          ಕನ್ನಡ
        </a>
        <a href="#" className="text-blue-300 hover:underline mx-1">
          മലയാളം
        </a>
        <a href="#" className="text-blue-300 hover:underline mx-1">
          ਪੰਜਾਬੀ
        </a>
      </div>


  { 
     isImageModalOpen &&  <ImageSearchModal
     isOpen={isImageModalOpen}
     onClose={() => setIsImageModalOpen(false)}
   />
    
  }    
     
      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
    </div>
  )
}
