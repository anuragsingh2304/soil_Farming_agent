"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { mockSoilTypes, type SoilType } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Droplet, Leaf, Mountain, FlaskRoundIcon as Flask, Sprout } from "lucide-react"
import Image from "next/image"

export default function SoilDetailPage() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const [soil, setSoil] = useState<SoilType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        const soilId = params.id as string
        const foundSoil = mockSoilTypes.find((s) => s.id === soilId)

        if (foundSoil) {
          setSoil(foundSoil)
        } else {
          setError("Soil type not found")
        }
      } catch (err) {
        setError("Error loading soil data")
      } finally {
        setLoading(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !soil) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-destructive mb-4">{error || "Soil type not found"}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{soil.type}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
          <Image src={soil.image || "/placeholder.svg"} alt={soil.type} fill className="object-cover" />
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Mountain className="h-4 w-4 text-muted-foreground" />
                {t("region")}
              </h3>
              <p>{soil.region}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Flask className="h-4 w-4 text-muted-foreground" />
                pH Level
              </h3>
              <p>{soil.ph}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Droplet className="h-4 w-4 text-muted-foreground" />
                Water Retention
              </h3>
              <p>{soil.waterRetention}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">{t("characteristics")}</h3>
          <p>{soil.characteristics}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Leaf className="h-4 w-4 text-muted-foreground" />
            Nutrient Content
          </h3>
          <p>{soil.nutrientContent}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Sprout className="h-4 w-4 text-muted-foreground" />
            {t("suitableCrops")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {soil.suitableCrops.split(",").map((crop, index) => (
              <Badge key={index} variant="secondary">
                {crop.trim()}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Cultivation Practices</h3>
          <p>{soil.cultivation}</p>
        </CardContent>
      </Card>
    </div>
  )
}
