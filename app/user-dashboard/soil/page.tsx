"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { mockSoilTypes, type SoilType } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function SoilInformation() {
  const { t } = useLanguage()
  const [soilTypes, setSoilTypes] = useState<SoilType[]>([])
  const [filteredSoilTypes, setFilteredSoilTypes] = useState<SoilType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Load mock soil types
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setSoilTypes([...mockSoilTypes])
      setFilteredSoilTypes([...mockSoilTypes])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter soil types based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSoilTypes(soilTypes)
    } else {
      const term = searchTerm.toLowerCase()
      const filtered = soilTypes.filter(
        (soil) =>
          soil.type.toLowerCase().includes(term) ||
          soil.characteristics.toLowerCase().includes(term) ||
          soil.suitableCrops.toLowerCase().includes(term) ||
          soil.region.toLowerCase().includes(term),
      )
      setFilteredSoilTypes(filtered)
    }
  }, [searchTerm, soilTypes])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t("soilDetails")}</h1>
        <p className="text-muted-foreground">Browse soil types and their characteristics</p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search soil types, crops, or regions..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredSoilTypes.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">No soil types found matching your search.</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSoilTypes.map((soil) => (
            <Link href={`/user-dashboard/soil/${soil.id}`} key={soil.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="relative h-48 w-full">
                  <Image src={soil.image || "/placeholder.svg"} alt={soil.type} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{soil.type}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {soil.suitableCrops
                      .split(",")
                      .slice(0, 3)
                      .map((crop, index) => (
                        <Badge key={index} variant="secondary">
                          {crop.trim()}
                        </Badge>
                      ))}
                    {soil.suitableCrops.split(",").length > 3 && (
                      <Badge variant="outline">+{soil.suitableCrops.split(",").length - 3}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{soil.characteristics}</p>
                  <div className="mt-2 text-xs font-medium text-muted-foreground">{soil.region}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
