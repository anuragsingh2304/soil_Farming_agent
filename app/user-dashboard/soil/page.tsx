"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { mockSoilTypes, type SoilType } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("soilDetails")}</h1>
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

      <Card>
        <CardHeader>
          <CardTitle>Soil Types</CardTitle>
          <CardDescription>Detailed information about different soil types</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredSoilTypes.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">No soil types found matching your search.</div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredSoilTypes.map((soil) => (
                <AccordionItem key={soil.id} value={soil.id}>
                  <AccordionTrigger className="hover:bg-muted/50 px-4 py-2 rounded-md">
                    <div className="flex items-center gap-2 text-left">
                      <span className="font-medium">{soil.type}</span>
                      <Badge variant="outline" className="ml-2">
                        {soil.region}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-1">{t("characteristics")}</h4>
                        <p className="text-sm">{soil.characteristics}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t("suitableCrops")}</h4>
                        <div className="flex flex-wrap gap-2">
                          {soil.suitableCrops.split(",").map((crop, index) => (
                            <Badge key={index} variant="secondary">
                              {crop.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t("region")}</h4>
                        <p className="text-sm">{soil.region}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
