"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (imageUrl: string) => void
  label?: string
}

export function ImageUpload({ currentImage, onImageChange, label = "Image" }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // For demo purposes, we'll just create a local URL
    // In a real app, you would upload this to a server/storage
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    // In a real app, this would be the URL returned from your upload service
    // For now, we'll simulate by using placeholder images
    const mockUploadedUrl = `/images/${file.name.toLowerCase().replace(/\s+/g, "-")}`
    onImageChange(mockUploadedUrl)
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onImageChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="image-upload">{label}</Label>

      {previewUrl ? (
        <div className="relative w-full h-48 border rounded-md overflow-hidden">
          <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-muted/50">
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 2MB)</p>
        </div>
      )}

      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        className={previewUrl ? "hidden" : ""}
        onChange={handleFileChange}
        ref={fileInputRef}
      />
    </div>
  )
}
