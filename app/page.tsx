"use client"

import { useLanguage } from "@/lib/language-context"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Layers, Users } from "lucide-react"
import { Sprout } from "lucide-react"

export default function Home() {
  const { t, isInitializing} = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-plant-light">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-plant-dark">
                  {t("welcomeTitle")}
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t("welcomeDescription")}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/admin-login">
                  <Button size="lg" className="bg-plant-dark hover:bg-plant text-white">
                    {t("loginAsAdmin")}
                  </Button>
                </Link>
                <Link href="/user-login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-plant-dark text-plant-dark hover:bg-plant-light"
                  >
                    {t("loginAsUser")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-soil flex items-center justify-center">
                  <Layers className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{t("soilDetails")}</h3>
                  <p className="text-muted-foreground">
                    Access detailed information about different soil types and their characteristics.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-wheat flex items-center justify-center">
                  <Sprout className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Crop Information</h3>
                  <p className="text-muted-foreground">
                    Learn about suitable crops for different soil types and regions.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="h-16 w-16 rounded-full bg-plant flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{t("distributorDetails")}</h3>
                  <p className="text-muted-foreground">
                    Find distributors in your region for seeds, fertilizers, and other farming needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Soil Farming Agent. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
