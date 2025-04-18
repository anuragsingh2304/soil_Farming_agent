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
  image: string
  ph: string
  nutrientContent: string
  waterRetention: string
  cultivation: string
}

export interface Distributor {
  id: string
  name: string
  address: string
  supportedCrops: string
  contact: string
  region: string
  state: string
  city: string
  createdAt: Date
  image: string // Added image field
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
    characteristics:
      "Fertile, light-colored, high in minerals, found in river basins and deltas. These soils are formed by the deposition of sediments by rivers and are renewed annually.",
    suitableCrops: "Rice, Wheat, Sugarcane, Maize",
    region: "Indo-Gangetic Plains",
    createdAt: new Date("2023-01-15"),
    image: "/images/alluvial-soil.jpg",
    ph: "6.5-7.5",
    nutrientContent: "High in potash, phosphoric acid, lime and carbon compounds but low in nitrogen",
    waterRetention: "Good water retention capacity",
    cultivation: "Suitable for intensive agriculture with proper irrigation",
  },
  {
    id: "soil-2",
    type: "Black Soil",
    characteristics:
      "Rich in clay, retains moisture, self-ploughing during dry season, high calcium carbonate content. Also known as Regur soil, it has a high capacity to hold moisture.",
    suitableCrops: "Cotton, Sugarcane, Tobacco, Wheat",
    region: "Deccan Plateau",
    createdAt: new Date("2023-01-20"),
    image: "/images/black-soil.jpg",
    ph: "7.5-8.5",
    nutrientContent: "Rich in calcium carbonate, magnesium, potash but poor in phosphorus, nitrogen and organic matter",
    waterRetention: "Excellent water retention capacity",
    cultivation: "Develops cracks in summer which helps in aeration",
  },
  {
    id: "soil-3",
    type: "Red Soil",
    characteristics:
      "Red color due to iron oxide, porous, low fertility, low moisture retention. These soils are formed due to weathering of ancient crystalline and metamorphic rocks.",
    suitableCrops: "Groundnut, Potato, Millets, Pulses",
    region: "Eastern and Southern Plateaus",
    createdAt: new Date("2023-02-05"),
    image: "/images/red-soil.jpg",
    ph: "6.0-6.5",
    nutrientContent: "Poor in nitrogen, phosphorus, and humus but rich in potash",
    waterRetention: "Low water retention capacity",
    cultivation: "Responds well to proper irrigation and fertilizers",
  },
  {
    id: "soil-4",
    type: "Laterite Soil",
    characteristics:
      "Acidic, poor in organic matter, rich in iron and aluminum oxides. These soils are formed under conditions of high temperature and heavy rainfall with alternate wet and dry periods.",
    suitableCrops: "Tea, Coffee, Rubber, Coconut",
    region: "Western Ghats, Eastern Ghats",
    createdAt: new Date("2023-02-10"),
    image: "/images/laterite-soil.jpg",
    ph: "5.0-6.0",
    nutrientContent: "Poor in nitrogen, phosphorus, potash, calcium and humus",
    waterRetention: "Poor water retention capacity",
    cultivation: "Requires heavy application of fertilizers and irrigation",
  },
  {
    id: "soil-5",
    type: "Desert Soil",
    characteristics:
      "Sandy texture, low organic matter, high salt content, low moisture retention. These soils are found in arid regions with high temperature and low rainfall.",
    suitableCrops: "Millet, Barley, Maize, Pulses",
    region: "Rajasthan, Gujarat",
    createdAt: new Date("2023-03-01"),
    image: "/images/desert-soil.jpg",
    ph: "8.0-8.8",
    nutrientContent: "Low in organic matter and nitrogen, high in soluble salts",
    waterRetention: "Very poor water retention capacity",
    cultivation: "Requires proper irrigation and soil management practices",
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
    state: "Delhi",
    city: "New Delhi",
    createdAt: new Date("2023-01-10"),
    image: "/images/shop-1.jpg",
  },
  {
    id: "dist-2",
    name: "Green Harvest Distributors",
    address: "456 Agriculture Lane, Mumbai, India",
    supportedCrops: "Cotton, Sugarcane, Pulses",
    contact: "+91 87654 32109",
    region: "West India",
    state: "Maharashtra",
    city: "Mumbai",
    createdAt: new Date("2023-01-25"),
    image: "/images/shop-2.jpg",
  },
  {
    id: "dist-3",
    name: "Farmland Supplies",
    address: "789 Crop Street, Chennai, India",
    supportedCrops: "Rice, Millets, Groundnut",
    contact: "+91 76543 21098",
    region: "South India",
    state: "Tamil Nadu",
    city: "Chennai",
    createdAt: new Date("2023-02-15"),
    image: "/images/shop-3.jpg",
  },
  {
    id: "dist-4",
    name: "Eastern Agri Services",
    address: "321 Harvest Road, Kolkata, India",
    supportedCrops: "Tea, Rice, Jute",
    contact: "+91 65432 10987",
    region: "East India",
    state: "West Bengal",
    city: "Kolkata",
    createdAt: new Date("2023-03-05"),
    image: "/images/shop-4.jpg",
  },
  {
    id: "dist-5",
    name: "Central Farm Suppliers",
    address: "654 Seed Avenue, Bhopal, India",
    supportedCrops: "Wheat, Soybean, Pulses",
    contact: "+91 54321 09876",
    region: "Central India",
    state: "Madhya Pradesh",
    city: "Bhopal",
    createdAt: new Date("2023-03-20"),
    image: "/images/shop-5.jpg",
  },
  {
    id: "dist-6",
    name: "Punjab Agro Traders",
    address: "78 Wheat Street, Ludhiana, India",
    supportedCrops: "Wheat, Rice, Maize",
    contact: "+91 98765 12345",
    region: "North India",
    state: "Punjab",
    city: "Ludhiana",
    createdAt: new Date("2023-04-05"),
    image: "/images/shop-6.jpg",
  },
  {
    id: "dist-7",
    name: "Gujarat Farm Solutions",
    address: "45 Cotton Road, Ahmedabad, India",
    supportedCrops: "Cotton, Groundnut, Wheat",
    contact: "+91 87654 23456",
    region: "West India",
    state: "Gujarat",
    city: "Ahmedabad",
    createdAt: new Date("2023-04-15"),
    image: "/images/shop-7.jpg",
  },
  {
    id: "dist-8",
    name: "Karnataka Agri Supplies",
    address: "23 Coffee Lane, Bangalore, India",
    supportedCrops: "Coffee, Rice, Millets",
    contact: "+91 76543 34567",
    region: "South India",
    state: "Karnataka",
    city: "Bangalore",
    createdAt: new Date("2023-05-01"),
    image: "/images/shop-8.jpg",
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

// Indian states and cities
export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

export const indianCities: { [key: string]: string[] } = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
  Delhi: ["New Delhi", "Delhi NCR"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
}
