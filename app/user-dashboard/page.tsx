"use client"

import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, Users } from "lucide-react"
import Link from "next/link"

export default function UserDashboard() {
  const { t } = useLanguage()
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">User Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user?.name || user?.email}</p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Link href="/user-dashboard/soil" className="block w-full">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("soilDetails")}</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">View Soil Information</div>
              <p className="text-xs text-muted-foreground">Browse soil types and their characteristics</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/user-dashboard/distributors" className="block w-full">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("distributorDetails")}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">Find Distributors</div>
              <p className="text-xs text-muted-foreground">Find distributors by region or crop type</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
