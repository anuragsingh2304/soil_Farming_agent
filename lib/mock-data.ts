// Mock data for testing UI without Firebase

export interface User {
  uid: string
  email: string
  name?: string
  role: "admin" | "user"
}

export interface SoilType {
  id: string
  type: string
  characteristics: string
  suitableCrops: string
  region: string
  createdAt: Date
}

export interface Distributor {
  id: string
  name: string
  address: string
  supportedCrops: string
  contact: string
  region: string
  createdAt: Date
}

export interface Log {
  id: string
  action: string
  timestamp: Date
  userId?: string
  email?: string
  soilType?: string
  distributorName?: string
  details?: string
}

// Mock users
export const mockUsers: User[] = [
  {
    uid: "admin-1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
  },
  {
    uid: "user-1",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
  },
  {
    uid: "test-admin",
    email: "test.admin@example.com",
    name: "Test Admin",
    role: "admin",
  },
  {
    uid: "test-user",
    email: "test.user@example.com",
    name: "Test User",
    role: "user",
  },
]

// Mock soil types
export const mockSoilTypes: SoilType[] = [
  {
    id: "soil-1",
    type: "Alluvial Soil",
    characteristics: "Fertile, light-colored, high in minerals, found in river basins and deltas.",
    suitableCrops: "Rice, Wheat, Sugarcane, Maize",
    region: "Indo-Gangetic Plains",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "soil-2",
    type: "Black Soil",
    characteristics:
      "Rich in clay, retains moisture, self-ploughing during dry season, high calcium carbonate content.",
    suitableCrops: "Cotton, Sugarcane, Tobacco, Wheat",
    region: "Deccan Plateau",
    createdAt: new Date("2023-01-20"),
  },
  {
    id: "soil-3",
    type: "Red Soil",
    characteristics: "Red color due to iron oxide, porous, low fertility, low moisture retention.",
    suitableCrops: "Groundnut, Potato, Millets, Pulses",
    region: "Eastern and Southern Plateaus",
    createdAt: new Date("2023-02-05"),
  },
  {
    id: "soil-4",
    type: "Laterite Soil",
    characteristics: "Acidic, poor in organic matter, rich in iron and aluminum oxides.",
    suitableCrops: "Tea, Coffee, Rubber, Coconut",
    region: "Western Ghats, Eastern Ghats",
    createdAt: new Date("2023-02-10"),
  },
  {
    id: "soil-5",
    type: "Desert Soil",
    characteristics: "Sandy texture, low organic matter, high salt content, low moisture retention.",
    suitableCrops: "Millet, Barley, Maize, Pulses",
    region: "Rajasthan, Gujarat",
    createdAt: new Date("2023-03-01"),
  },
]

// Mock distributors
export const mockDistributors: Distributor[] = [
  {
    id: "dist-1",
    name: "Agro Solutions Ltd.",
    address: "123 Farm Road, Delhi, India",
    supportedCrops: "Rice, Wheat, Maize",
    contact: "+91 98765 43210",
    region: "North India",
    createdAt: new Date("2023-01-10"),
  },
  {
    id: "dist-2",
    name: "Green Harvest Distributors",
    address: "456 Agriculture Lane, Mumbai, India",
    supportedCrops: "Cotton, Sugarcane, Pulses",
    contact: "+91 87654 32109",
    region: "West India",
    createdAt: new Date("2023-01-25"),
  },
  {
    id: "dist-3",
    name: "Farmland Supplies",
    address: "789 Crop Street, Chennai, India",
    supportedCrops: "Rice, Millets, Groundnut",
    contact: "+91 76543 21098",
    region: "South India",
    createdAt: new Date("2023-02-15"),
  },
  {
    id: "dist-4",
    name: "Eastern Agri Services",
    address: "321 Harvest Road, Kolkata, India",
    supportedCrops: "Tea, Rice, Jute",
    contact: "+91 65432 10987",
    region: "East India",
    createdAt: new Date("2023-03-05"),
  },
  {
    id: "dist-5",
    name: "Central Farm Suppliers",
    address: "654 Seed Avenue, Bhopal, India",
    supportedCrops: "Wheat, Soybean, Pulses",
    contact: "+91 54321 09876",
    region: "Central India",
    createdAt: new Date("2023-03-20"),
  },
]

// Mock logs
export const mockLogs: Log[] = [
  {
    id: "log-1",
    action: "User Login",
    timestamp: new Date("2023-04-01T09:30:00"),
    userId: "user-1",
    email: "user@example.com",
  },
  {
    id: "log-2",
    action: "Admin Login",
    timestamp: new Date("2023-04-01T10:15:00"),
    userId: "admin-1",
    email: "admin@example.com",
  },
  {
    id: "log-3",
    action: "Soil Added",
    timestamp: new Date("2023-04-01T11:00:00"),
    userId: "admin-1",
    email: "admin@example.com",
    soilType: "Alluvial Soil",
  },
  {
    id: "log-4",
    action: "Distributor Added",
    timestamp: new Date("2023-04-01T11:30:00"),
    userId: "admin-1",
    email: "admin@example.com",
    distributorName: "Agro Solutions Ltd.",
  },
  {
    id: "log-5",
    action: "User Registration",
    timestamp: new Date("2023-04-01T14:00:00"),
    email: "newuser@example.com",
  },
  {
    id: "log-6",
    action: "Soil Updated",
    timestamp: new Date("2023-04-02T09:45:00"),
    userId: "admin-1",
    email: "admin@example.com",
    soilType: "Black Soil",
  },
  {
    id: "log-7",
    action: "Distributor Updated",
    timestamp: new Date("2023-04-02T10:30:00"),
    userId: "admin-1",
    email: "admin@example.com",
    distributorName: "Green Harvest Distributors",
  },
  {
    id: "log-8",
    action: "User Logout",
    timestamp: new Date("2023-04-02T16:00:00"),
    userId: "user-1",
    email: "user@example.com",
  },
]
