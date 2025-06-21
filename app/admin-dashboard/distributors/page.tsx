"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { type Distributor, indianStates, indianCities } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Store } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { ImageUpload } from "@/components/image-upload"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DistributorManagement() {
  const { t } = useLanguage()
  const [distributors, setDistributors] = useState<Distributor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [availableCities, setAvailableCities] = useState<string[]>([])

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    supportedCrops: "",
    contact: "",
    region: "",
    state: "",
    city: "",
    image: "",
  })

  const [currentDistributorId, setCurrentDistributorId] = useState<string | null>(null)

  useEffect(() => {
    const fetchDistributors = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/distributors`)
        if (!res.ok) {
          throw new Error("Failed to fetch distributors")
        }
        const data = await res.json()
        setDistributors(data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch distributors")
      } finally {
        setLoading(false)
      }
    }
    fetchDistributors()
  }, [])

  useEffect(() => {
    if (formData.state) {
      setAvailableCities(indianCities[formData.state] || [])
    } else {
      setAvailableCities([])
    }
  }, [formData.state])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
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
      name: "",
      address: "",
      supportedCrops: "",
      contact: "",
      region: "",
      state: "",
      city: "",
      image: "",
    })
    setCurrentDistributorId(null)
  }

  const handleAddDistributor = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/distributors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      // Refresh list
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/distributors`)
      const data = await res.json()
      setDistributors(data)
      resetForm()
      setIsAddDialogOpen(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleEditDistributor = (distributor: Distributor) => {
    setFormData({
      name: distributor.name,
      address: distributor.address,
      supportedCrops: distributor.supportedCrops,
      contact: distributor.contact,
      region: distributor.region,
      state: distributor.state || "",
      city: distributor.city || "",
      image: distributor.image || "",
    })
    setCurrentDistributorId(distributor._id)
    setIsEditDialogOpen(true)
  }

  const handleUpdateDistributor = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!currentDistributorId) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/distributors/${currentDistributorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/distributors`)
      const data = await res.json()
      setDistributors(data)
      resetForm()
      setIsEditDialogOpen(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteConfirm = (_id: string) => {
    setCurrentDistributorId(_id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteDistributor = async () => {
    if (!currentDistributorId) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/distributors/${currentDistributorId}`, {
        method: "DELETE",
      })
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/distributors`)
      const data = await res.json()
      setDistributors(data)
      setIsDeleteDialogOpen(false)
      setCurrentDistributorId(null)
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t("distributorDetails")}</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Distributor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Distributor</DialogTitle>
              <DialogDescription>Enter the details for the new distributor</DialogDescription>
            </DialogHeader>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleAddDistributor} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("name")}</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">{t("phone")}</Label>
                  <Input id="contact" name="contact" value={formData.contact} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t("address")}</Label>
                <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">{t("region")}</Label>
                  <Input id="region" name="region" value={formData.region} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => handleSelectChange("city", value)}
                    disabled={!formData.state || availableCities.length === 0}
                  >
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportedCrops">{t("suitableCrops")}</Label>
                <Input
                  id="supportedCrops"
                  name="supportedCrops"
                  value={formData.supportedCrops}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <ImageUpload currentImage={formData.image} onImageChange={handleImageChange} label="Shop Image" />

              <DialogFooter>
                <Button type="submit">Add Distributor</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distributors</CardTitle>
          <CardDescription>Manage distributors and their information</CardDescription>
        </CardHeader>
        <CardContent>
          {distributors.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No distributors found. Add your first distributor.
            </div>
          ) : (
            <div className="space-y-4">
              {distributors.map((distributor) => (
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
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{distributor.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {distributor.city}, {distributor.state}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditDistributor(distributor)}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteConfirm(distributor._id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium">{t("address")}</h4>
                          <p className="text-sm text-muted-foreground">{distributor.address}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{t("phone")}</h4>
                          <p className="text-sm text-muted-foreground">{distributor.contact}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium">{t("suitableCrops")}</h4>
                        <p className="text-sm text-muted-foreground">{distributor.supportedCrops}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Distributor</DialogTitle>
            <DialogDescription>Update the details for this distributor</DialogDescription>
          </DialogHeader>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleUpdateDistributor} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">{t("name")}</Label>
                <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contact">{t("phone")}</Label>
                <Input
                  id="edit-contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-address">{t("address")}</Label>
              <Textarea
                id="edit-address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-region">{t("region")}</Label>
                <Input id="edit-region" name="region" value={formData.region} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-state">State</Label>
                <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                  <SelectTrigger id="edit-state">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-city">City</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => handleSelectChange("city", value)}
                  disabled={!formData.state || availableCities.length === 0}
                >
                  <SelectTrigger id="edit-city">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-supportedCrops">{t("suitableCrops")}</Label>
              <Input
                id="edit-supportedCrops"
                name="supportedCrops"
                value={formData.supportedCrops}
                onChange={handleInputChange}
                required
              />
            </div>

            <ImageUpload currentImage={formData.image} onImageChange={handleImageChange} label="Shop Image" />

            <DialogFooter>
              <Button type="submit">Update Distributor</Button>
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
              Are you sure you want to delete this distributor? This action cannot be undone.
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
            <Button variant="destructive" onClick={handleDeleteDistributor}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
