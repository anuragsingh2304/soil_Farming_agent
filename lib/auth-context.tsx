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
      // call to the backend for login
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
    
      // For UI testing, allow any email containing "user" to log in
      if (response.ok) {
        const testUser = {
          uid: data.user.id,
          email: data.user.email,
          name: data.user.name,
          isAdmin: data.user.isAdmin,
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
      setLoading(true);
  
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      // Check if user is actually an Admin
      if (!data.user.isAdmin) {
        throw new Error('Access denied. Not an admin.');
      }
  
      const testAdmin = {
        uid: data.user.id,
        email: data.user.email,
        name: data.user.name,
        isAdmin: data.user.isAdmin,
      };
  
      setUser(testAdmin);
      
      try {
        localStorage.setItem("currentUser", JSON.stringify(testAdmin));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
  
      router.push("/admin-dashboard");
      return;
      // Only redirect if admin verified
    } catch (error: any) {
      console.error("Admin login error:", error.message);
      throw error;
    } finally {
      setLoading(false);
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
        isAdmin: false,
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
