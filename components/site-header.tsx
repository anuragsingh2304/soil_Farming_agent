import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sprout } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Sprout className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl hidden sm:inline-block">Soil Farming Agent</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <MainNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
