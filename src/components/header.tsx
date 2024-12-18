import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Grid } from "lucide-react";
export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <Link href="/about" className="text-sm hover:underline">
          About
        </Link>
        <Link href="/store" className="text-sm hover:underline">
          Store
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/gmail" className="text-sm hover:underline">
          Gmail
        </Link>
        <Link href="/images" className="text-sm hover:underline">
          Images
        </Link>
        <Button variant="ghost" size="icon" className="hover:bg-gray-800">
          <Grid className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
