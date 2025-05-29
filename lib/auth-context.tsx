"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User } from "./mock-data"

type AuthContextType = {
  user: User | null
  loading: boolean
  isInitializing: boolean // Add state to track initial load from storage
  login: (email: string, password: string) => Promise<void>
  adminLogin: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false) // Keep for action loading
  const [isInitializing, setIsInitializing] = useState(true) // New state for initial load
  const router = useRouter()

  // Load auth state from localStorage on mount (client side)
  useEffect(() => {
    // Check if user is stored in localStorage
    try {
      const currentUser = async ()=> {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user`, {
          credentials: "include"
        });

        if(!res.ok) {
          setUser(null)
          router.push('/user-login')
        }
        const Data = await res.json()
        setUser(Data)
      }
      currentUser()
    } catch (error) {
      console.error("Error getting user:", error);
    } finally {
      setIsInitializing(false);
    }
  }, [])


  // Regular user login - simplified for UI testing
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
    
      // Assuming backend returns user data on success
      const loggedInUser = {
        uid: data.user.id,
        email: data.user.email,
        name: data.user.name,
        isAdmin: data.user.isAdmin,
      }

      // Update state - useEffect will handle saving to localStorage
        setUser(loggedInUser) // Corrected variable name
        router.push("/user-dashboard")
        return
      // Removed the unconditional throw new Error("Invalid email or password") as backend response handles this
    } catch (error: any) {
      console.error("Login error:", error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const adminLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
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
      
  
      router.push("/admin-dashboard");
      return;
    } catch (error: any) {
      console.error("Admin login error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/register`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password, name }),
         credentials: "include"
       });

       const data = await response.json();

       if (!response.ok) {
         throw new Error(data.message || 'Registration failed');
       }

      const newUser: User = data.user; 
      setUser(newUser)

      router.push("/user-dashboard")
    } catch (error: any) {
      console.error("Registration error:", error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }
  const logout = async () => {
    try {
      setLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/logout`,{
        credentials: "include"
      })
      setUser(null)

      router.push("/")
    } catch (error: any) {
      console.error("Logout error:", error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, isInitializing, login, adminLogin, register, logout }}>
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
