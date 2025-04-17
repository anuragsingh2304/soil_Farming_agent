"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { mockDistributors, type Distributor } from "@/lib/mock-data"
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
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function DistributorManagement() {
  const { t } = useLanguage()
  const [distributors, setDistributors] = useState<Distributor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    supportedCrops: "",
    contact: "",
    region: "",
  })

  const [currentDistributorId, setCurrentDistributorId] = useState<string | null>(null)

  // Load mock distributors
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setDistributors([...mockDistributors])
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

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      supportedCrops: "",
      contact: "",
      region: "",
    })
    setCurrentDistributorId(null)
  }

  const handleAddDistributor = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newDistributor: Distributor = {
        id: `dist-${Date.now()}`,
        ...formData,
        createdAt: new Date(),
      }

      setDistributors((prev) => [newDistributor, ...prev])

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
    })
    setCurrentDistributorId(distributor.id)
    setIsEditDialogOpen(true)
  }

  const handleUpdateDistributor = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!currentDistributorId) return

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setDistributors((prev) =>
        prev.map((distributor) =>
          distributor.id === currentDistributorId ? { ...distributor, ...formData } : distributor,
        ),
      )

      resetForm()
      setIsEditDialogOpen(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeleteConfirm = (id: string) => {
    setCurrentDistributorId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteDistributor = async () => {
    if (!currentDistributorId) return

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setDistributors((prev) => prev.filter((distributor) => distributor.id !== currentDistributorId))
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
          <DialogContent>
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
              <div className="space-y-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t("address")}</Label>
                <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required />
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
              <div className="space-y-2">
                <Label htmlFor="contact">{t("phone")}</Label>
                <Input id="contact" name="contact" value={formData.contact} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">{t("region")}</Label>
                <Input id="region" name="region" value={formData.region} onChange={handleInputChange} required />
              </div>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("address")}</TableHead>
                  <TableHead>{t("suitableCrops")}</TableHead>
                  <TableHead>{t("phone")}</TableHead>
                  <TableHead>{t("region")}</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {distributors.map((distributor) => (
                  <TableRow key={distributor.id}>
                    <TableCell className="font-medium">{distributor.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{distributor.address}</TableCell>
                    <TableCell>{distributor.supportedCrops}</TableCell>
                    <TableCell>{distributor.contact}</TableCell>
                    <TableCell>{distributor.region}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEditDistributor(distributor)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteConfirm(distributor.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
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
            <div className="space-y-2">
              <Label htmlFor="edit-name">{t("name")}</Label>
              <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} required />
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
            <div className="space-y-2">
              <Label htmlFor="edit-contact">{t("phone")}</Label>
              <Input id="edit-contact" name="contact" value={formData.contact} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-region">{t("region")}</Label>
              <Input id="edit-region" name="region" value={formData.region} onChange={handleInputChange} required />
            </div>
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
