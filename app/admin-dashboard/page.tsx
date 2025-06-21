"use client"

import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, Users, } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { t } = useLanguage()
  const { user } = useAuth()

  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name || user?.email}</p>
      </div>

      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin-dashboard/soil" className="block w-full">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-2 px-3">
              <CardTitle className="text-sm font-medium">{t("soilDetails")}</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-3 pb-2 pt-0">
              <div className="text-xl md:text-2xl font-bold">Manage Soil Data</div>
              <p className="text-xs text-muted-foreground">Add, edit, and manage soil types and characteristics</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin-dashboard/distributors" className="block w-full">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-2 px-3">
              <CardTitle className="text-sm font-medium">{t("distributorDetails")}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-3 pb-2 pt-0">
              <div className="text-xl md:text-2xl font-bold">Manage Distributors</div>
              <p className="text-xs text-muted-foreground">Add, edit, and manage distributor information</p>
            </CardContent>
          </Card>
        </Link>

        
      </div>
    </div>
  )
}
