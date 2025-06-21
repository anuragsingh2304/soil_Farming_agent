"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { mockDistributors, type Distributor, indianStates, indianCities } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Phone, Wheat, Store } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function DistributorInformation() {
  const { t } = useLanguage()
  const [distributors, setDistributors] = useState<Distributor[]>([])
  const [filteredDistributors, setFilteredDistributors] = useState<Distributor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [regionFilter, setRegionFilter] = useState<string>("")
  const [cropFilter, setCropFilter] = useState<string>("")
  const [stateFilter, setStateFilter] = useState<string>("")
  const [cityFilter, setCityFilter] = useState<string>("")
  const [regions, setRegions] = useState<string[]>([])
  const [crops, setCrops] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/distributors`,{
          credentials: "include"
        });
        const data = await response.json();

        setDistributors(data);
        setFilteredDistributors(data);

        const regionsSet = new Set<string>();
        const cropsSet = new Set<string>();

        data.forEach((distributor: Distributor) => {
          regionsSet.add(distributor.region);
          distributor.supportedCrops.split(",").forEach((crop) => {
            cropsSet.add(crop.trim());
          });
        });

        setRegions(Array.from(regionsSet).sort());
        setCrops(Array.from(cropsSet).sort());
      } catch (error) {
        console.error("Error fetching distributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  useEffect(() => {
    if (stateFilter) {
      setAvailableCities(indianCities[stateFilter] || [])
      setCityFilter("")
    } else {
      setAvailableCities([])
      setCityFilter("")
    }
  }, [stateFilter])


  useEffect(() => {
    let filtered = distributors

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (distributor) =>
          distributor.name.toLowerCase().includes(term) ||
          distributor.address.toLowerCase().includes(term) ||
          distributor.supportedCrops.toLowerCase().includes(term) ||
          distributor.region.toLowerCase().includes(term),
      )
    }

    if (regionFilter && regionFilter !== "all") {
      filtered = filtered.filter((distributor) => distributor.region === regionFilter)
    }

    if (cropFilter && cropFilter !== "all") {
      filtered = filtered.filter((distributor) =>
        distributor.supportedCrops.toLowerCase().includes(cropFilter.toLowerCase()),
      )
    }

    if (stateFilter) {
      filtered = filtered.filter((distributor) => distributor.state === stateFilter)

      if (cityFilter) {
        filtered = filtered.filter((distributor) => distributor.city === cityFilter)
      }
    }

    setFilteredDistributors(filtered)
  }, [searchTerm, regionFilter, cropFilter, stateFilter, cityFilter, distributors])

  const resetFilters = () => {
    setSearchTerm("")
    setRegionFilter("")
    setCropFilter("")
    setStateFilter("")
    setCityFilter("")
  }

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
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t("distributorDetails")}</h1>
        <p className="text-muted-foreground">Find distributors by region or crop type</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search distributors..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger>
              <SelectValue placeholder={`Filter by ${t("region")}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={cropFilter} onValueChange={setCropFilter}>
            <SelectTrigger>
              <SelectValue placeholder={`Filter by ${t("suitableCrops")}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              {crops.map((crop) => (
                <SelectItem key={crop} value={crop}>
                  {crop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={cityFilter} onValueChange={setCityFilter} disabled={!stateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {availableCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(searchTerm || regionFilter || cropFilter || stateFilter || cityFilter) && (
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {filteredDistributors.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No distributors found matching your criteria.
            <button onClick={resetFilters} className="block mx-auto mt-2 text-primary hover:underline">
              Reset filters
            </button>
          </div>
        ) : (
          filteredDistributors.map((distributor) => (
            <Card key={distributor._id} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="relative h-48 md:h-full">
                  {distributor.image ? (
                    <Image
                      src={distributor.image || "/placeholder.svg"}
                      alt={distributor.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <Store className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="md:col-span-2 p-4">
                  <h3 className="font-semibold text-lg">{distributor.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />
                    {distributor.city}, {distributor.state}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="text-sm font-medium mb-1">{t("address")}</div>
                      <div className="text-sm text-muted-foreground">{distributor.address}</div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">{t("phone")}</div>
                      <div className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {distributor.contact}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium mb-1 flex items-center gap-1">
                      <Wheat className="h-3 w-3" />
                      {t("suitableCrops")}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {distributor.supportedCrops.split(",").map((crop, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {crop.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
