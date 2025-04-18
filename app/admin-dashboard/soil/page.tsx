"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { mockSoilTypes, type SoilType } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { ImageUpload } from "@/components/image-upload"
import Image from "next/image"

export default function SoilManagement() {
  const { t } = useLanguage()
  const [soilTypes, setSoilTypes] = useState<SoilType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    type: "",
    characteristics: "",
    suitableCrops: "",
    region: "",
    image: "",
    ph: "",
    nutrientContent: "",
    waterRetention: "",
    cultivation: "",
  })

  const [currentSoilId, setCurrentSoilId] = useState<string | null>(null)

  // Load mock soil types
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setSoilTypes([...mockSoilTypes])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
    }))
  }

  const resetForm = () => {
    setFormData({
      type: "",
      characteristics: "",
      suitableCrops: "",
      region: "",
      image: "",
      ph: "",
      nutrientContent: "",
      waterRetention: "",
      cultivation: "",
    })
    setCurrentSoilId(null)
  }

  const handleAddSoil = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newSoil: SoilType = {
        id: `soil-${Date.now()}`,
        ...formData,
        createdAt: new Date(),
      }

      setSoilTypes((prev) => [newSoil, ...prev])

      resetForm()
      setIsAddDialogOpen(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditSoil = (soil: SoilType) => {
    setFormData({
      type: soil.type,
      characteristics: soil.characteristics,
      suitableCrops: soil.suitableCrops,
      region: soil.region,
      image: soil.image || "",
      ph: soil.ph || "",
      nutrientContent: soil.nutrientContent || "",
      waterRetention: soil.waterRetention || "",
      cultivation: soil.cultivation || "",
    })
    setCurrentSoilId(soil.id)
    setIsEditDialogOpen(true)
  }

  const handleUpdateSoil = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!currentSoilId) return

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setSoilTypes((prev) => prev.map((soil) => (soil.id === currentSoilId ? { ...soil, ...formData } : soil)))

      resetForm()
      setIsEditDialogOpen(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteConfirm = (id: string) => {
    setCurrentSoilId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteSoil = async () => {
    if (!currentSoilId) return

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setSoilTypes((prev) => prev.filter((soil) => soil.id !== currentSoilId))
      setIsDeleteDialogOpen(false)
      setCurrentSoilId(null)
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t("soilDetails")}</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Soil Type
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Soil Type</DialogTitle>
              <DialogDescription>Enter the details for the new soil type</DialogDescription>
            </DialogHeader>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleAddSoil} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">{t("soilType")}</Label>
                  <Input id="type" name="type" value={formData.type} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">{t("region")}</Label>
                  <Input id="region" name="region" value={formData.region} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="characteristics">{t("characteristics")}</Label>
                <Textarea
                  id="characteristics"
                  name="characteristics"
                  value={formData.characteristics}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="suitableCrops">{t("suitableCrops")}</Label>
                  <Input
                    id="suitableCrops"
                    name="suitableCrops"
                    value={formData.suitableCrops}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ph">pH Level</Label>
                  <Input id="ph" name="ph" value={formData.ph} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nutrientContent">Nutrient Content</Label>
                <Textarea
                  id="nutrientContent"
                  name="nutrientContent"
                  value={formData.nutrientContent}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="waterRetention">Water Retention</Label>
                  <Input
                    id="waterRetention"
                    name="waterRetention"
                    value={formData.waterRetention}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cultivation">Cultivation Practices</Label>
                  <Input
                    id="cultivation"
                    name="cultivation"
                    value={formData.cultivation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <ImageUpload currentImage={formData.image} onImageChange={handleImageChange} label="Soil Image" />

              <DialogFooter>
                <Button type="submit">Add Soil Type</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Soil Types</CardTitle>
          <CardDescription>Manage soil types and their characteristics</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          {soilTypes.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">No soil types found. Add your first soil type.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>{t("soilType")}</TableHead>
                    <TableHead className="hidden md:table-cell">{t("characteristics")}</TableHead>
                    <TableHead>{t("suitableCrops")}</TableHead>
                    <TableHead className="hidden sm:table-cell">{t("region")}</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {soilTypes.map((soil) => (
                    <TableRow key={soil.id}>
                      <TableCell>
                        {soil.image ? (
                          <div className="relative h-12 w-12 rounded-md overflow-hidden">
                            <Image
                              src={soil.image || "/placeholder.svg"}
                              alt={soil.type}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{soil.type}</TableCell>
                      <TableCell className="max-w-xs truncate hidden md:table-cell">{soil.characteristics}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{soil.suitableCrops}</TableCell>
                      <TableCell className="hidden sm:table-cell">{soil.region}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditSoil(soil)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteConfirm(soil.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Soil Type</DialogTitle>
            <DialogDescription>Update the details for this soil type</DialogDescription>
          </DialogHeader>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleUpdateSoil} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-type">{t("soilType")}</Label>
                <Input id="edit-type" name="type" value={formData.type} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-region">{t("region")}</Label>
                <Input id="edit-region" name="region" value={formData.region} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-characteristics">{t("characteristics")}</Label>
              <Textarea
                id="edit-characteristics"
                name="characteristics"
                value={formData.characteristics}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-suitableCrops">{t("suitableCrops")}</Label>
                <Input
                  id="edit-suitableCrops"
                  name="suitableCrops"
                  value={formData.suitableCrops}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-ph">pH Level</Label>
                <Input id="edit-ph" name="ph" value={formData.ph} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-nutrientContent">Nutrient Content</Label>
              <Textarea
                id="edit-nutrientContent"
                name="nutrientContent"
                value={formData.nutrientContent}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-waterRetention">Water Retention</Label>
                <Input
                  id="edit-waterRetention"
                  name="waterRetention"
                  value={formData.waterRetention}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-cultivation">Cultivation Practices</Label>
                <Input
                  id="edit-cultivation"
                  name="cultivation"
                  value={formData.cultivation}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <ImageUpload currentImage={formData.image} onImageChange={handleImageChange} label="Soil Image" />

            <DialogFooter>
              <Button type="submit">Update Soil Type</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this soil type? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSoil}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
