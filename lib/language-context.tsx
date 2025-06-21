"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "hi"
// Define Translations type outside the component
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

  //soil names
  "Alluvial Soil": {
    en: "Alluvial Soil",
    hi: "जलोढ़ मिट्टी"
  },
  "Black Soil": {
    en: "Black Soil",
    hi: "काली मिट्टी"
  },
  "Red Soil": {
    en: "Red Soil",
    hi: "लाल मिट्टी"
  },
  "Laterite Soil": {
    en: "Laterite Soil",
    hi: "लेटराइट मिट्टी"
  },
  "Desert Soil": {
    en: "Desert Soil",
    hi: "रेगिस्तानी मिट्टी"
  },

  //crops names

  Rice:{
    hi: "चावल",
    en: "Rice"
  },
  Wheat:{
    hi: "गेहूं",
    en: "Wheat"
  },
  Sugarcane:{
    hi: "गन्ना",
    en: "Sugarcane"
  },
  Maize:{
    hi: "मक्का",
    en: "Maize"
  },
}

type LanguageContextType = {
  language: Language 
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isInitializing: boolean 
}

// Initialize with undefined to signify that the language hasn't been loaded from storage yet
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize language to a default or null/undefined until localStorage is checked
  const [language, setLanguageState] = useState<Language | undefined>(undefined)
  const [isInitializing, setIsInitializing] = useState(true) // State for initial load

  // Load language preference from localStorage on client side
  useEffect(() => {
      try {
        const savedLanguage = localStorage.getItem("language") as Language
        // Check if savedLanguage is one of the valid Language types
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
          setLanguageState(savedLanguage)
        } else {
          // Default to "en" if no language is saved or saved language is invalid
          setLanguageState("en")
        }
      } catch (error) {
        console.error("Error loading language from localStorage:", error)
        // Default to "en" in case of an error during loading
        setLanguageState("en")
      } finally {
        setIsInitializing(false) // Ensure isInitializing is set to false
      }
  }, []) // Empty dependency array to run once on mount

  // Save language preference to localStorage when it changes
  useEffect(() => {
    // Only save if language is not undefined (meaning it has been initialized)
    if (language !== undefined) {
      try {
        localStorage.setItem("language", language)
      } catch (error) {
        console.error("Error saving language to localStorage:", error)
      }
    }
  }, [language]) 


  const setLanguage = (lang: Language) => {
    setLanguageState(lang)

  }

  // Translation function
  const t = (key: string): string => {    
    const currentLang = language || "en"; 
    if (translations[key] && translations[key][currentLang]) {
      return translations[key][currentLang]
    }
    console.warn(`Translation missing for key: ${key}`)
    return key
  }


  const contextValue = {
    language: language || "en",
    setLanguage,
    t,
    isInitializing,
  };


  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  
  return context
}
