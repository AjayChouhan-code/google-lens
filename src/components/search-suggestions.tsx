"use client";
import { useEffect, useState } from "react";
import { Search, TrendingUp } from "lucide-react";
interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
}
export function SearchSuggestions({ query, onSelect }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        // Show trending searches when no query
        setSuggestions([
          "Latest news",
          "Weather forecast",
          "Popular movies 2024",
          "Tech trends",
          "Sports updates",
        ]);
        return;
      }
      // Simulate API call for suggestions
      const mockSuggestions = [
        `${query} news`,
        `${query} definition`,
        `${query} meaning`,
        `${query} examples`,
        `${query} near me`,
      ];
      setSuggestions(mockSuggestions);
    };
    fetchSuggestions();
  }, [query]);
  return (
    <div className="absolute w-full -mt-[1px] bg-[#303134] rounded-b-lg border border-[#5F6368] border-t-0 overflow-hidden search-suggestions">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#3C4043] text-left"
          onClick={() => onSelect(suggestion)}
        >
          {query ? (
            <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
          ) : (
            <TrendingUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
          )}
          <span>{suggestion}</span>
        </button>
      ))}
      <div className="flex justify-center gap-2 py-4 px-2 border-t border-[#3C4043]">
        <button
          onClick={() => onSelect(query || suggestions[0])}
          className="h-9 px-4 bg-gray-200 text-[14px] text-[#020305] border-none rounded focus:outline-none focus:ring-1 focus:ring-[#8AB4F8]"
        >
          Google Search
        </button>
        <button className="h-9 px-4 bg-[#303134] hover:bg-[#3C4043] text-[14px] text-[#E8EAED] border border-[#5F6368] rounded focus:outline-none focus:ring-1 focus:ring-[#8AB4F8]">
          Im Feeling Lucky
        </button>
      </div>
    </div>
  );
}
