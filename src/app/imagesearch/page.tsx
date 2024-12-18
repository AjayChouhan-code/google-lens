import { Header } from '@/components/header'
import { ImageResults } from '@/components/image-results'

export default function ImageSearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <ImageResults />
      </main>
    </div>
  )
}

