"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Layers, Users, ClipboardList, LogOut, Menu, X, ChevronRight, Sprout } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"

interface SidebarProps {
  isAdmin?: boolean
}

export function DashboardSidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { logout, user } = useAuth()
  const [open, setOpen] = useState(false)

  const adminRoutes = [
    {
      href: "/admin-dashboard",
      label: t("dashboard"),
      icon: LayoutDashboard,
      active: pathname === "/admin-dashboard",
    },
    {
      href: "/admin-dashboard/soil",
      label: t("soilDetails"),
      icon: Layers,
      active: pathname === "/admin-dashboard/soil",
    },
    {
      href: "/admin-dashboard/distributors",
      label: t("distributorDetails"),
      icon: Users,
      active: pathname === "/admin-dashboard/distributors",
    },
    {
      href: "/admin-dashboard/logs",
      label: t("viewLogs"),
      icon: ClipboardList,
      active: pathname === "/admin-dashboard/logs",
    },
  ]

  const userRoutes = [
    {
      href: "/user-dashboard",
      label: t("dashboard"),
      icon: LayoutDashboard,
      active: pathname === "/user-dashboard",
    },
    {
      href: "/user-dashboard/soil",
      label: t("soilDetails"),
      icon: Sprout,
      active: pathname === "/user-dashboard/soil",
    },
    {
      href: "/user-dashboard/distributors",
      label: t("distributorDetails"),
      icon: Users,
      active: pathname === "/user-dashboard/distributors",
    },
  ]

  const routes = isAdmin ? adminRoutes : userRoutes

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="space-y-1 py-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              route.active
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
            {route.active && <ChevronRight className="ml-auto h-4 w-4" />}
          </Link>
        ))}
      </div>

      <div className="mt-auto border-t py-4">
        <div className="px-3 mb-6 flex items-center justify-between">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          {t("logout")}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <div className="md:hidden flex items-center h-16 px-4 border-b bg-background">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 border-r">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                <span className="font-semibold">{isAdmin ? "Admin Portal" : "User Portal"}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="px-2">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex-1 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            <span className="font-medium">{isAdmin ? "Admin Portal" : "User Portal"}</span>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r h-screen bg-background">
        <div className="p-6 border-b flex items-center gap-2">
          <Sprout className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-semibold">{isAdmin ? "Admin Portal" : "User Portal"}</h2>
        </div>
        <div className="flex-1 px-3 py-2 overflow-auto">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}
