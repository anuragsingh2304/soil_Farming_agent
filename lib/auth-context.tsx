"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User } from "./mock-data"

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  adminLogin: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Simulate loading auth state on mount
  useEffect(() => {
    // Check if user is stored in localStorage
    try {
      const storedUser = localStorage.getItem("currentUser")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error)
    }
  }, [])

  // Regular user login - simplified for UI testing
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // For UI testing, allow any email containing "user" to log in
      if (email.includes("user")) {
        const testUser = {
          uid: "user-test",
          email: email,
          name: "Test User",
          role: "user" as const,
        }

        setUser(testUser)
        try {
          localStorage.setItem("currentUser", JSON.stringify(testUser))
        } catch (error) {
          console.error("Error saving to localStorage:", error)
        }

        router.push("/user-dashboard")
        return
      }

      throw new Error("Invalid email or password")
    } catch (error: any) {
      console.error("Login error:", error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Admin login - simplified for UI testing
  const adminLogin = async (email: string, password: string) => {
    try {
      setLoading(true)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // For UI testing, allow any email containing "admin" to log in
      if (email.includes("admin")) {
        const testAdmin = {
          uid: "admin-test",
          email: email,
          name: "Test Admin",
          role: "admin" as const,
        }

        setUser(testAdmin)
        try {
          localStorage.setItem("currentUser", JSON.stringify(testAdmin))
        } catch (error) {
          console.error("Error saving to localStorage:", error)
        }

        router.push("/admin-dashboard")
        return
      }

      throw new Error("Invalid admin credentials")
    } catch (error: any) {
      console.error("Admin login error:", error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // User registration - simplified for UI testing
  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newUser: User = {
        uid: `user-${Date.now()}`,
        email,
        name,
        role: "user",
      }

      setUser(newUser)
      try {
        localStorage.setItem("currentUser", JSON.stringify(newUser))
      } catch (error) {
        console.error("Error saving to localStorage:", error)
      }

      router.push("/user-dashboard")
    } catch (error: any) {
      console.error("Registration error:", error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout - simplified for UI testing
  const logout = async () => {
    try {
      setLoading(true)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      setUser(null)
      try {
        localStorage.removeItem("currentUser")
      } catch (error) {
        console.error("Error removing from localStorage:", error)
      }

      router.push("/")
    } catch (error: any) {
      console.error("Logout error:", error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, adminLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
