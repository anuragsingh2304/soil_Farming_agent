"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { mockLogs, type Log } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function LogsPage() {
  const { t } = useLanguage()
  const [logs, setLogs] = useState<Log[]>([])
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Load mock logs
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setLogs([...mockLogs])
      setFilteredLogs([...mockLogs])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter logs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredLogs(logs)
    } else {
      const term = searchTerm.toLowerCase()
      const filtered = logs.filter(
        (log) =>
          log.action.toLowerCase().includes(term) ||
          (log.email && log.email.toLowerCase().includes(term)) ||
          (log.soilType && log.soilType.toLowerCase().includes(term)) ||
          (log.distributorName && log.distributorName.toLowerCase().includes(term)),
      )
      setFilteredLogs(filtered)
    }
  }, [searchTerm, logs])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("viewLogs")}</h1>
        <p className="text-muted-foreground">View all system activity and user actions</p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search logs..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>Recent system activity and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">No logs found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.action}</TableCell>
                    <TableCell>
                      {log.soilType && `Soil: ${log.soilType}`}
                      {log.distributorName && `Distributor: ${log.distributorName}`}
                    </TableCell>
                    <TableCell>{log.email || "System"}</TableCell>
                    <TableCell>
                      {log.timestamp.toLocaleDateString()} {log.timestamp.toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
