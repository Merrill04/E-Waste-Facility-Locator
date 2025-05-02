export interface Facility {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  operatingHours: string;
  coordinates: [number, number];
  types: string[];
}

export const facilities: Facility[] = [
  {
    id: 1,
    name: "Eco Recycling Ltd",
    address: "Plot No. 1, MIDC Industrial Area",
    city: "Mumbai",
    state: "Maharashtra",
    contact: "+91-22-2345-6789",
    operatingHours: "9:00 AM - 6:00 PM",
    coordinates: [72.8777, 19.0760],
    types: ["Electronics", "Batteries", "Mobile Phones"]
  },
  {
    id: 2,
    name: "Green Earth Recycling",
    address: "Sector 62, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    contact: "+91-120-2345-6789",
    operatingHours: "10:00 AM - 7:00 PM",
    coordinates: [77.3690, 28.6273],
    types: ["Computers", "Printers", "Monitors"]
  },
  {
    id: 3,
    name: "E-Waste Solutions",
    address: "Electronic City Phase 1",
    city: "Bangalore",
    state: "Karnataka",
    contact: "+91-80-2345-6789",
    operatingHours: "9:30 AM - 6:30 PM",
    coordinates: [77.6726, 12.9716],
    types: ["Mobile Phones", "Tablets", "Laptops"]
  },
  {
    id: 4,
    name: "Recycle India",
    address: "Okhla Industrial Area",
    city: "Delhi",
    state: "Delhi",
    contact: "+91-11-2345-6789",
    operatingHours: "10:00 AM - 7:00 PM",
    coordinates: [77.2772, 28.5272],
    types: ["All Types of E-Waste"]
  },
  {
    id: 5,
    name: "Eco Tech Recycling",
    address: "HITEC City",
    city: "Hyderabad",
    state: "Telangana",
    contact: "+91-40-2345-6789",
    operatingHours: "9:00 AM - 6:00 PM",
    coordinates: [78.3744, 17.4474],
    types: ["Computers", "Mobile Phones", "Batteries"]
  },
  {
    id: 6,
    name: "Green Recycling Solutions",
    address: "Salt Lake Sector V",
    city: "Kolkata",
    state: "West Bengal",
    contact: "+91-33-2345-6789",
    operatingHours: "10:00 AM - 7:00 PM",
    coordinates: [88.4335, 22.5726],
    types: ["All Types of E-Waste"]
  }
]; 