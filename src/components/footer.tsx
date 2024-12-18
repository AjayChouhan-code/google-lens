import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#171717] text-[#ffffff] text-sm">
      <div className="px-8 py-3 border-b border-[#3c4043]">
        <span>India</span>
      </div>
      <div className="px-8 py-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-7">
            <Link href="/advertising" className="hover:underline">
              Advertising
            </Link>
            <Link href="/business" className="hover:underline">
              Business
            </Link>
            <Link href="/how-search-works" className="hover:underline">
              How Search works
            </Link>
          </div>
          <div className="flex items-center gap-7">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/settings" className="hover:underline">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

