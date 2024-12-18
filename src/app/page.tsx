import { Header } from '@/components/header'
import { SearchBar } from '@/components/search-bar'
import { Footer } from '@/components/footer'
import {GoogleLogo} from "@/components/GoogleLogo"


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-[584px] flex flex-col items-center gap-8">
            <GoogleLogo className="w-[272px] text-white mb-8" />
          <SearchBar />
        </div>
      </main>
      <Footer />
    </div>
  )
}

