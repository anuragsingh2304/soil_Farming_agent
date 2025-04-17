"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "hi"

type Translations = {
  [key: string]: {
    en: string
    hi: string
  }
}

// Common translations used across the app
const translations: Translations = {
  // Navigation
  home: {
    en: "Home",
    hi: "होम",
  },
  login: {
    en: "Login",
    hi: "लॉगिन",
  },
  register: {
    en: "Register",
    hi: "रजिस्टर",
  },
  logout: {
    en: "Logout",
    hi: "लॉगआउट",
  },
  adminLogin: {
    en: "Admin Login",
    hi: "एडमिन लॉगिन",
  },
  userLogin: {
    en: "User Login",
    hi: "यूजर लॉगिन",
  },

  // Dashboard
  dashboard: {
    en: "Dashboard",
    hi: "डैशबोर्ड",
  },
  soilDetails: {
    en: "Soil Details",
    hi: "मिट्टी का विवरण",
  },
  distributorDetails: {
    en: "Distributor Details",
    hi: "वितरक विवरण",
  },
  viewLogs: {
    en: "View Logs",
    hi: "लॉग देखें",
  },

  // Form Fields
  email: {
    en: "Email",
    hi: "ईमेल",
  },
  password: {
    en: "Password",
    hi: "पासवर्ड",
  },
  name: {
    en: "Name",
    hi: "नाम",
  },
  address: {
    en: "Address",
    hi: "पता",
  },
  phone: {
    en: "Phone",
    hi: "फोन",
  },
  soilType: {
    en: "Soil Type",
    hi: "मिट्टी का प्रकार",
  },
  characteristics: {
    en: "Characteristics",
    hi: "विशेषताएं",
  },
  suitableCrops: {
    en: "Suitable Crops",
    hi: "उपयुक्त फसलें",
  },
  region: {
    en: "Region",
    hi: "क्षेत्र",
  },

  // Buttons
  submit: {
    en: "Submit",
    hi: "सबमिट",
  },
  cancel: {
    en: "Cancel",
    hi: "रद्द करें",
  },
  add: {
    en: "Add",
    hi: "जोड़ें",
  },
  edit: {
    en: "Edit",
    hi: "संपादित करें",
  },
  delete: {
    en: "Delete",
    hi: "हटाएं",
  },
  view: {
    en: "View",
    hi: "देखें",
  },

  // Home page
  welcomeTitle: {
    en: "Welcome to Soil Farming Agent",
    hi: "सॉइल फार्मिंग एजेंट में आपका स्वागत है",
  },
  welcomeDescription: {
    en: "Your one-stop portal for soil information and farming resources",
    hi: "मिट्टी की जानकारी और कृषि संसाधनों के लिए आपका वन-स्टॉप पोर्टल",
  },
  loginAsAdmin: {
    en: "Login as Admin",
    hi: "एडमिन के रूप में लॉगिन करें",
  },
  loginAsUser: {
    en: "Login as User",
    hi: "यूजर के रूप में लॉगिन करें",
  },

  // 404 page
  pageNotFound: {
    en: "Page Not Found",
    hi: "पेज नहीं मिला",
  },
  backToHome: {
    en: "Back to Home",
    hi: "होम पेज पर वापस जाएं",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load language preference from localStorage on client side
  useEffect(() => {
    if (isClient) {
      try {
        const savedLanguage = localStorage.getItem("language") as Language
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
          setLanguage(savedLanguage)
        }
      } catch (error) {
        console.error("Error loading language from localStorage:", error)
      }
    }
  }, [isClient])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem("language", language)
      } catch (error) {
        console.error("Error saving language to localStorage:", error)
      }
    }
  }, [language, isClient])

  // Translation function
  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    console.warn(`Translation missing for key: ${key}`)
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
