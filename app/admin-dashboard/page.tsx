"use client"

import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, Users, ClipboardList } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { t } = useLanguage()
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name || user?.email}</p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin-dashboard/soil" className="block w-full">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("soilDetails")}</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">Manage Soil Data</div>
              <p className="text-xs text-muted-foreground">Add, edit, and manage soil types and characteristics</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin-dashboard/distributors" className="block w-full">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("distributorDetails")}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">Manage Distributors</div>
              <p className="text-xs text-muted-foreground">Add, edit, and manage distributor information</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin-dashboard/logs" className="block w-full">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("viewLogs")}</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">Activity Logs</div>
              <p className="text-xs text-muted-foreground">View all system activity and user actions</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
