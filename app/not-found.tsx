"use client"

import { useLanguage } from "@/lib/language-context"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-plant-dark">404</h1>
          <h2 className="text-2xl font-semibold">{t("pageNotFound")}</h2>
          <p className="text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
          <Link href="/">
            <Button>{t("backToHome")}</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
