"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.isAdmin !== true)) {
      router.push("/admin-login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || user.isAdmin !== true) {
    return null
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <DashboardSidebar isAdmin={true} />
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <main className="flex-1 overflow-auto p-2 bg-background w-full">{children}</main>
      </div>
    </div>
  )
}
