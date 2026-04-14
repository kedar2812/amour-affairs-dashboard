// src/data/mockData.ts

// --- INTERFACES --- //

export type EventType = "Wedding" | "Pre-Wedding" | "Corporate" | "Portrait" | "Maternity" | "Engagement" | "Family" | "Other";
export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";
export type LeadStage = "New Inquiry" | "Contacted" | "Consultation Scheduled" | "Proposal Sent" | "Won" | "Lost";
export type LeadSource = "Instagram" | "WhatsApp" | "Google" | "Referral" | "Website";
export type ClientType = "Wedding" | "Corporate" | "Individual";
export type PaymentStatus = "Paid" | "Partially Paid" | "Pending" | "Overdue";
export type TeamRole = "Lead Photographer" | "Photographer" | "Videographer" | "Photo Editor" | "Cinematographer" | "Drone Operator";
export type TeamStatusEnum = "On Shoot" | "Available" | "Editing" | "On Leave";

export interface Booking {
  id: string; // e.g. #BK-1042
  clientId: string;
  clientName: string;
  eventType: EventType;
  date: string; // ISO string or specific format e.g. "2025-04-16T09:00:00"
  endDate: string;
  venue: string;
  city: string;
  packageId: string;
  packageName: string;
  teamAssignedIds: string[];
  amount: number;
  status: BookingStatus;
  notes?: string;
  timeline: {
    inquiry: string | null;
    consultation: string | null;
    confirmed: string | null;
    shoot: string | null;
    editing: string | null;
    delivered: string | null;
  };
  payment: {
    total: number;
    paid: number;
    due: number;
  };
}

export interface Lead {
  id: string; // e.g. #LD-804
  clientName: string;
  phone: string;
  email: string;
  instagram?: string;
  eventType: EventType;
  eventDate: string; // Estimated date
  budgetRange: string; // e.g. "₹80,000 – ₹1,20,000"
  source: LeadSource;
  stage: LeadStage;
  assignedToId: string;
  lastActivity: string;
  movedToStageAt: string; // ISO date for computing "days in stage"
  notes: { date: string; content: string; authorId: string }[];
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  whatsapp: string;
  instagram?: string;
  city: string;
  type: ClientType;
  totalBookings: number;
  totalSpend: number;
  lastShootDate: string;
  rating: number; // 1-5
  tags: string[]; // e.g. ["VIP", "Repeat Client", "Referrer"]
}

export interface TeamMember {
  id: string;
  name: string;
  role: TeamRole;
  status: TeamStatusEnum;
  currentAssignment?: string;
  skills: string[];
  upcomingShootsCount: number;
  phone: string;
  email: string;
  avatarInitials: string;
  joinDate: string;
  bio: string;
  equipment: string[];
  rating: number; // 1-5
  onTimeDeliveryRate: number; // Percentage
  monthEarnings: number;
}

export interface Package {
  id: string;
  name: string;
  category: EventType;
  price: number;
  description: string;
  inclusions: string[];
  addons: { name: string; price: number }[];
  popularity: number; // Percentage
  bookingsCount: number;
  isActive: boolean;
  requiredRoles: TeamRole[];
}

export interface Invoice {
  id: string; // #INV-2045
  clientId: string;
  clientName: string;
  bookingId: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  amountPaid: number;
  status: PaymentStatus;
  items?: { description: string; amount: number }[];
}

export interface Transaction {
  id: string;
  date: string;
  clientId: string;
  clientName: string;
  bookingId: string;
  method: "UPI" | "Bank Transfer" | "Cash" | "Card";
  amount: number;
  notes?: string;
}

// --- MOCK DATA --- //

export const teamMembers: TeamMember[] = [
  {
    id: "TM-001", name: "Kedar Gurav", role: "Lead Photographer", status: "Available",
    skills: ["Wedding", "Portrait", "Commercial"], upcomingShootsCount: 4,
    phone: "+91 98765 43210", email: "kedar@amouraffairs.in", avatarInitials: "KG",
    joinDate: "2020-01-15", bio: "Founder & Lead Creative with 10 years shooting luxury weddings.",
    equipment: ["Sony A7RV", "Sony 24-70mm GM II", "Profoto A10"], rating: 4.9, onTimeDeliveryRate: 98, monthEarnings: 150000
  },
  {
    id: "TM-002", name: "Rajat Kulkarni", role: "Photographer", status: "On Shoot",
    currentAssignment: "JW Marriott Hinjawadi Wedding", skills: ["Wedding", "Candid", "Event"], upcomingShootsCount: 6,
    phone: "+91 87654 32109", email: "rajat@amouraffairs.in", avatarInitials: "RK",
    joinDate: "2021-06-01", bio: "Master of candid moments. Specializes in Maharashtrian weddings.",
    equipment: ["Sony A7IV", "Sony 35mm f/1.4 GM"], rating: 4.7, onTimeDeliveryRate: 95, monthEarnings: 65000
  },
  {
    id: "TM-003", name: "Nikhil Thapar", role: "Photo Editor", status: "Editing",
    currentAssignment: "Editing Ritz-Carlton Gala", skills: ["Color Grading", "Retouching", "Lightroom"], upcomingShootsCount: 0,
    phone: "+91 76543 21098", email: "nikhil@amouraffairs.in", avatarInitials: "NT",
    joinDate: "2022-03-10", bio: "Fast and precise editor. Maintains the signature warm Amour Affairs tone.",
    equipment: ["Mac Studio M2", "Eizo ColorEdge 27", "Wacom Intuos"], rating: 4.8, onTimeDeliveryRate: 99, monthEarnings: 55000
  },
  {
    id: "TM-004", name: "Sunil Mehta", role: "Cinematographer", status: "On Leave",
    skills: ["Wedding Films", "Documentary", "Gimbal"], upcomingShootsCount: 2,
    phone: "+91 65432 10987", email: "sunil@amouraffairs.in", avatarInitials: "SM",
    joinDate: "2022-08-20", bio: "Cinematic storyteller with an eye for dramatic lighting.",
    equipment: ["FX3", "DJI RS3 Pro", "Sirui Anamorphic Set"], rating: 4.9, onTimeDeliveryRate: 92, monthEarnings: 85000
  },
  {
    id: "TM-005", name: "Priya Desai", role: "Photographer", status: "Available",
    skills: ["Pre-Wedding", "Maternity", "Portrait"], upcomingShootsCount: 5,
    phone: "+91 99887 76655", email: "priya@amouraffairs.in", avatarInitials: "PD",
    joinDate: "2023-01-10", bio: "Specializes in intimate portraits and pre-wedding conceptual shoots.",
    equipment: ["Canon R6 Mark II", "RF 85mm f/1.2"], rating: 4.8, onTimeDeliveryRate: 96, monthEarnings: 60000
  },
  {
    id: "TM-006", name: "Arjun Nair", role: "Drone Operator", status: "On Shoot",
    currentAssignment: "Lavasa Pre-Wedding", skills: ["Aerial Videography", "FPV", "Landscape"], upcomingShootsCount: 3,
    phone: "+91 88776 65544", email: "arjun@amouraffairs.in", avatarInitials: "AN",
    joinDate: "2023-05-15", bio: "Licensed drone pilot pushing the limits of aerial cinematography.",
    equipment: ["DJI Mavic 3 Cine", "DJI FPV"], rating: 4.6, onTimeDeliveryRate: 100, monthEarnings: 45000
  },
  {
    id: "TM-007", name: "Sneha Joshi", role: "Photo Editor", status: "Available",
    skills: ["Album Design", "Retouching"], upcomingShootsCount: 0,
    phone: "+91 77665 54433", email: "sneha@amouraffairs.in", avatarInitials: "SJ",
    joinDate: "2024-02-01", bio: "Detail-oriented album designer and editor.",
    equipment: ["M2 MacBook Pro 16", "BenQ 27 in"], rating: 4.7, onTimeDeliveryRate: 94, monthEarnings: 40000
  },
  {
    id: "TM-008", name: "Vikram Rao", role: "Videographer", status: "Available",
    skills: ["Event Coverage", "Highlights"], upcomingShootsCount: 4,
    phone: "+91 66554 43322", email: "vikram@amouraffairs.in", avatarInitials: "VR",
    joinDate: "2024-04-10", bio: "Reliable robust event shooter.",
    equipment: ["Sony A7SIII", "24-105mm G"], rating: 4.5, onTimeDeliveryRate: 93, monthEarnings: 50000
  }
];

export const clients: Client[] = [
  { id: "CL-01", name: "Aditi & Rohan", phone: "+91 98765 11111", email: "aditi.r@example.com", whatsapp: "+91 98765 11111", city: "Pune", type: "Wedding", totalBookings: 2, totalSpend: 250000, lastShootDate: "2025-02-15", rating: 5, tags: ["Repeat Client", "VIP"] },
  { id: "CL-02", name: "Neha Sharma", phone: "+91 98765 22222", email: "neha.s@example.com", whatsapp: "+91 98765 22222", city: "Mumbai", type: "Individual", totalBookings: 1, totalSpend: 45000, lastShootDate: "2025-03-10", rating: 4.5, tags: ["Referrer"] },
  { id: "CL-03", name: "TechNova Solutions", phone: "+91 98765 33333", email: "events@technova.in", whatsapp: "+91 98765 33333", city: "Pune", type: "Corporate", totalBookings: 4, totalSpend: 320000, lastShootDate: "2025-04-05", rating: 4.8, tags: ["VIP", "Repeat Client"] },
  { id: "CL-04", name: "Kunal & Shruti", phone: "+91 98765 44444", email: "kunal.s@example.com", whatsapp: "+91 98765 44444", city: "Pune", type: "Wedding", totalBookings: 1, totalSpend: 150000, lastShootDate: "2025-01-20", rating: 5, tags: [] },
  { id: "CL-05", name: "Pooja Hegde", phone: "+91 98765 55555", email: "pooja.h@example.com", whatsapp: "+91 98765 55555", city: "Pune", type: "Individual", totalBookings: 2, totalSpend: 35000, lastShootDate: "2024-11-12", rating: 4.2, tags: [] },
  { id: "CL-06", name: "Nexus Corp", phone: "+91 98765 66666", email: "marketing@nexus.in", whatsapp: "+91 98765 66666", city: "Bengaluru", type: "Corporate", totalBookings: 3, totalSpend: 180000, lastShootDate: "2024-12-05", rating: 4.7, tags: ["Repeat Client"] },
  { id: "CL-07", name: "Siddharth & Priya", phone: "+91 98765 77777", email: "sid.p@example.com", whatsapp: "+91 98765 77777", city: "Nashik", type: "Wedding", totalBookings: 1, totalSpend: 120000, lastShootDate: "2025-05-18", rating: 0, tags: [] },
  { id: "CL-08", name: "Rahul Deshmukh", phone: "+91 98765 88888", email: "rahul.d@example.com", whatsapp: "+91 98765 88888", city: "Pune", type: "Individual", totalBookings: 1, totalSpend: 15000, lastShootDate: "2024-09-22", rating: 4.9, tags: [] },
  { id: "CL-09", name: "Vibrant Events", phone: "+91 98765 99999", email: "hello@vibrantevents.in", whatsapp: "+91 98765 99999", city: "Pune", type: "Corporate", totalBookings: 6, totalSpend: 450000, lastShootDate: "2025-04-10", rating: 5, tags: ["VIP", "Repeat Client", "Referrer"] },
  { id: "CL-10", name: "Ananya & Kartik", phone: "+91 98765 00000", email: "ananya.k@example.com", whatsapp: "+91 98765 00000", city: "Pune", type: "Wedding", totalBookings: 2, totalSpend: 280000, lastShootDate: "2025-06-12", rating: 0, tags: ["VIP"] },
  { id: "CL-11", name: "Global Motors", phone: "+91 98711 11111", email: "pr@globalmotors.in", whatsapp: "+91 98711 11111", city: "Pune", type: "Corporate", totalBookings: 2, totalSpend: 220000, lastShootDate: "2024-10-30", rating: 4.6, tags: ["Repeat Client"] },
  { id: "CL-12", name: "Tanvi Joshi", phone: "+91 98722 22222", email: "tanvi.j@example.com", whatsapp: "+91 98722 22222", city: "Mumbai", type: "Individual", totalBookings: 1, totalSpend: 25000, lastShootDate: "2025-08-05", rating: 0, tags: [] },
  { id: "CL-13", name: "Meera & Varun", phone: "+91 98733 33333", email: "meera.v@example.com", whatsapp: "+91 98733 33333", city: "Pune", type: "Wedding", totalBookings: 1, totalSpend: 195000, lastShootDate: "2024-12-18", rating: 4.8, tags: [] },
  { id: "CL-14", name: "Elevate Tech", phone: "+91 98744 44444", email: "admin@elevatetech.in", whatsapp: "+91 98744 44444", city: "Pune", type: "Corporate", totalBookings: 1, totalSpend: 85000, lastShootDate: "2025-01-10", rating: 4.4, tags: [] },
  { id: "CL-15", name: "Smita Patel", phone: "+91 98755 55555", email: "smita.p@example.com", whatsapp: "+91 98755 55555", city: "Pune", type: "Individual", totalBookings: 3, totalSpend: 65000, lastShootDate: "2025-02-28", rating: 5, tags: ["Repeat Client"] },
  { id: "CL-16", name: "Isha & Sameer", phone: "+91 98766 66666", email: "isha.s@example.com", whatsapp: "+91 98766 66666", city: "Lonavala", type: "Wedding", totalBookings: 1, totalSpend: 310000, lastShootDate: "2025-07-20", rating: 0, tags: ["VIP"] },
  { id: "CL-17", name: "Kavya & Arjun", phone: "+91 98777 77777", email: "kavya.a@example.com", whatsapp: "+91 98777 77777", city: "Pune", type: "Wedding", totalBookings: 1, totalSpend: 140000, lastShootDate: "2024-11-25", rating: 4.7, tags: [] },
  { id: "CL-18", name: "Priya & Yash", phone: "+91 98788 88888", email: "priya.y@example.com", whatsapp: "+91 98788 88888", city: "Pune", type: "Wedding", totalBookings: 1, totalSpend: 175000, lastShootDate: "2025-09-10", rating: 0, tags: [] }
];

export const packages: Package[] = [
  { id: "PKG-01", name: "Wedding Premium", category: "Wedding", price: 150000, description: "Comprehensive coverage for luxury weddings.", inclusions: ["2 Photographers", "1 Videographer", "1 Drone Operator", "12-hour coverage", "500+ edited photos", "Cinematic highlights reel", "Online gallery", "Premium Album"], addons: [{ name: "Extra Hour", price: 10000 }, { name: "Same Day Edit", price: 25000 }], popularity: 45, bookingsCount: 42, isActive: true, requiredRoles: ["Lead Photographer", "Photographer", "Videographer", "Drone Operator", "Photo Editor"] },
  { id: "PKG-02", name: "Pre-Wedding Deluxe", category: "Pre-Wedding", price: 65000, description: "Cinematic pre-wedding shoot at a premium location.", inclusions: ["1 Photographer", "1 Cinematographer", "1 Drone Operator", "8-hour coverage", "200+ edited photos", "3 min cinematic teaser"], addons: [{ name: "MUA & Styling", price: 15000 }], popularity: 20, bookingsCount: 28, isActive: true, requiredRoles: ["Photographer", "Cinematographer", "Drone Operator", "Photo Editor"] },
  { id: "PKG-03", name: "Corporate Standard", category: "Corporate", price: 35000, description: "Professional coverage for corporate events and conferences.", inclusions: ["1 Photographer", "1 Videographer", "6-hour coverage", "Standard edited photos", "Raw video dump"], addons: [{ name: "Highlight Video", price: 15000 }], popularity: 15, bookingsCount: 35, isActive: true, requiredRoles: ["Photographer", "Videographer", "Photo Editor"] },
  { id: "PKG-04", name: "Wedding Basic", category: "Wedding", price: 95000, description: "Essential coverage for intimate weddings.", inclusions: ["2 Photographers", "8-hour coverage", "300+ edited photos", "Standard Album"], addons: [{ name: "Videographer", price: 30000 }], popularity: 10, bookingsCount: 18, isActive: true, requiredRoles: ["Photographer", "Photographer", "Photo Editor"] },
  { id: "PKG-05", name: "Portrait Session", category: "Portrait", price: 15000, description: "Premium solo portrait or portfolio session.", inclusions: ["1 Photographer", "2-hour coverage", "15 retouched photos", "Studio or outdoor"], addons: [{ name: "Extra Retouched Photo", price: 1000 }], popularity: 5, bookingsCount: 40, isActive: true, requiredRoles: ["Photographer", "Photo Editor"] },
  { id: "PKG-06", name: "Maternity Shoot", category: "Maternity", price: 18000, description: "Beautifully captured maternity memories.", inclusions: ["1 Photographer", "3-hour coverage", "25 retouched photos", "2 outfit changes"], addons: [{ name: "MUA", price: 8000 }], popularity: 5, bookingsCount: 22, isActive: true, requiredRoles: ["Photographer", "Photo Editor"] }
];

export const bookings: Booking[] = [
  // --- MAY 2025 (Current Month) ---
  { id: "#BK-2001", clientId: "CL-01", clientName: "Aditi & Rohan", eventType: "Wedding", date: "2025-05-15T09:00:00", endDate: "2025-05-15T21:00:00", venue: "The Ritz-Carlton", city: "Pune", packageId: "PKG-01", packageName: "Wedding Premium", teamAssignedIds: ["TM-001", "TM-002", "TM-004", "TM-006"], amount: 150000, status: "Confirmed", timeline: { inquiry: "2025-01-10", consultation: "2025-01-15", confirmed: "2025-01-20", shoot: null, editing: null, delivered: null }, payment: { total: 150000, paid: 75000, due: 75000 } },
  { id: "#BK-2002", clientId: "CL-03", clientName: "TechNova Solutions", eventType: "Corporate", date: "2025-05-18T10:00:00", endDate: "2025-05-18T18:00:00", venue: "JW Marriott Hinjawadi", city: "Pune", packageId: "PKG-03", packageName: "Corporate Standard", teamAssignedIds: ["TM-002", "TM-008"], amount: 50000, status: "Confirmed", timeline: { inquiry: "2025-02-05", consultation: null, confirmed: "2025-02-12", shoot: null, editing: null, delivered: null }, payment: { total: 50000, paid: 25000, due: 25000 } },
  { id: "#BK-2003", clientId: "CL-10", clientName: "Ananya & Kartik", eventType: "Pre-Wedding", date: "2025-05-12T06:00:00", endDate: "2025-05-12T14:00:00", venue: "Lavasa City", city: "Lavasa", packageId: "PKG-02", packageName: "Pre-Wedding Deluxe", teamAssignedIds: ["TM-001", "TM-004", "TM-006"], amount: 65000, status: "Completed", timeline: { inquiry: "2025-03-01", consultation: "2025-03-05", confirmed: "2025-03-10", shoot: "2025-05-12", editing: "2025-05-13", delivered: null }, payment: { total: 65000, paid: 65000, due: 0 } },
  { id: "#BK-2004", clientId: "CL-05", clientName: "Pooja Hegde", eventType: "Portrait", date: "2025-05-25T15:00:00", endDate: "2025-05-25T17:00:00", venue: "Studio A", city: "Pune", packageId: "PKG-05", packageName: "Portrait Session", teamAssignedIds: ["TM-005"], amount: 15000, status: "Confirmed", timeline: { inquiry: "2025-04-10", consultation: null, confirmed: "2025-04-12", shoot: null, editing: null, delivered: null }, payment: { total: 15000, paid: 5000, due: 10000 } },
  
  // --- APRIL 2025 ---
  { id: "#BK-1950", clientId: "CL-02", clientName: "Neha Sharma", eventType: "Portrait", date: "2025-04-10T10:00:00", endDate: "2025-04-10T12:00:00", venue: "Empress Garden", city: "Pune", packageId: "PKG-05", packageName: "Portrait Session", teamAssignedIds: ["TM-005"], amount: 18000, status: "Completed", timeline: { inquiry: "2025-03-15", consultation: null, confirmed: "2025-03-20", shoot: "2025-04-10", editing: "2025-04-11", delivered: "2025-04-20" }, payment: { total: 18000, paid: 18000, due: 0 } },
  { id: "#BK-1951", clientId: "CL-04", clientName: "Kunal & Shruti", eventType: "Wedding", date: "2025-04-22T08:00:00", endDate: "2025-04-22T22:00:00", venue: "Conrad Pune", city: "Pune", packageId: "PKG-04", packageName: "Wedding Basic", teamAssignedIds: ["TM-001", "TM-007"], amount: 95000, status: "Completed", timeline: { inquiry: "2024-12-01", consultation: "2024-12-10", confirmed: "2024-12-15", shoot: "2025-04-22", editing: "2025-04-23", delivered: null }, payment: { total: 95000, paid: 95000, due: 0 } },
  
  // --- MARCH 2025 ---
  { id: "#BK-1900", clientId: "CL-06", clientName: "Nexus Corp", eventType: "Corporate", date: "2025-03-15T09:00:00", endDate: "2025-03-15T17:00:00", venue: "Sheraton Grand", city: "Pune", packageId: "PKG-03", packageName: "Corporate Standard", teamAssignedIds: ["TM-002", "TM-008"], amount: 45000, status: "Completed", timeline: { inquiry: "2025-02-10", consultation: null, confirmed: "2025-02-15", shoot: "2025-03-15", editing: "2025-03-16", delivered: "2025-03-25" }, payment: { total: 45000, paid: 45000, due: 0 } },
  
  // --- FULL 2024 RECORDS (Historical) ---
  { id: "#BK-0901", clientId: "CL-11", clientName: "Global Motors", eventType: "Corporate", date: "2024-10-15T10:00:00", endDate: "2024-10-15T18:00:00", venue: "Hyatt Regency", city: "Pune", packageId: "PKG-03", packageName: "Corporate Standard", teamAssignedIds: ["TM-002"], amount: 55000, status: "Completed", timeline: { inquiry: "2024-09-01", consultation: null, confirmed: "2024-09-10", shoot: "2024-10-15", editing: "2024-10-16", delivered: "2024-10-30" }, payment: { total: 55000, paid: 55000, due: 0 } },
  { id: "#BK-0902", clientId: "CL-01", clientName: "Aditi & Rohan", eventType: "Pre-Wedding", date: "2024-11-20T06:00:00", endDate: "2024-11-20T14:00:00", venue: "Lonavala", city: "Lonavala", packageId: "PKG-02", packageName: "Pre-Wedding Deluxe", teamAssignedIds: ["TM-005", "TM-006"], amount: 65000, status: "Completed", timeline: { inquiry: "2024-08-01", consultation: "2024-08-10", confirmed: "2024-08-15", shoot: "2024-11-20", editing: "2024-11-21", delivered: "2024-12-05" }, payment: { total: 65000, paid: 65000, due: 0 } },
  { id: "#BK-0903", clientId: "CL-13", clientName: "Meera & Varun", eventType: "Wedding", date: "2024-12-18T10:00:00", endDate: "2024-12-18T23:00:00", venue: "Blue Diamond", city: "Pune", packageId: "PKG-01", packageName: "Wedding Premium", teamAssignedIds: ["TM-001", "TM-002", "TM-004"], amount: 180000, status: "Completed", timeline: { inquiry: "2024-05-10", consultation: "2024-05-20", confirmed: "2024-06-01", shoot: "2024-12-18", editing: "2024-12-19", delivered: "2025-01-15" }, payment: { total: 180000, paid: 180000, due: 0 } },
  { id: "#BK-0904", clientId: "CL-15", clientName: "Smita Patel", eventType: "Portrait", date: "2024-09-12T11:00:00", endDate: "2024-09-12T13:00:00", venue: "Studio A", city: "Pune", packageId: "PKG-05", packageName: "Portrait Session", teamAssignedIds: ["TM-005"], amount: 12000, status: "Completed", timeline: { inquiry: "2024-08-20", consultation: null, confirmed: "2024-08-25", shoot: "2024-09-12", editing: "2024-09-13", delivered: "2024-09-20" }, payment: { total: 12000, paid: 12000, due: 0 } },
  { id: "#BK-0905", clientId: "CL-08", clientName: "Rahul Deshmukh", eventType: "Portrait", date: "2024-08-05T10:00:00", endDate: "2024-08-05T12:00:00", venue: "Pune University", city: "Pune", packageId: "PKG-05", packageName: "Portrait Session", teamAssignedIds: ["TM-005"], amount: 15000, status: "Completed", timeline: { inquiry: "2024-07-20", consultation: null, confirmed: "2024-07-25", shoot: "2024-08-05", editing: "2024-08-06", delivered: "2024-08-15" }, payment: { total: 15000, paid: 15000, due: 0 } },
  
  // Future Bookings
  { id: "#BK-2050", clientId: "CL-17", clientName: "Kavya & Arjun", eventType: "Wedding", date: "2025-11-25T09:00:00", endDate: "2025-11-25T21:00:00", venue: "The Westin", city: "Pune", packageId: "PKG-01", packageName: "Wedding Premium", teamAssignedIds: ["TM-001", "TM-002"], amount: 165000, status: "Confirmed", timeline: { inquiry: "2025-05-01", consultation: "2025-05-05", confirmed: "2025-05-10", shoot: null, editing: null, delivered: null }, payment: { total: 165000, paid: 50000, due: 115000 } }
];

// Add helper to generate dates relative to virtual today (May 15, 2025)
const VIRTUAL_TODAY = new Date("2025-05-15");
const dateRel = (days: number) => {
  const d = new Date(VIRTUAL_TODAY);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

export const leads: Lead[] = [
  { id: "#LD-1001", clientName: "Vikrant & Rhea", phone: "+91 99988 77766", email: "vikrant.rhea@email.com", eventType: "Wedding", eventDate: "2025-11-20T00:00:00", budgetRange: "₹1,50,000 – ₹2,00,000", source: "Instagram", stage: "New Inquiry", assignedToId: "TM-001", lastActivity: dateRel(-1), movedToStageAt: dateRel(-1), notes: [{ date: dateRel(-1), content: "Received DM on Insta requesting premium packages.", authorId: "TM-001" }] },
  { id: "#LD-1002", clientName: "TCS Pune", phone: "+91 88877 66655", email: "events.pune@tcs.com", eventType: "Corporate", eventDate: "2025-06-15T00:00:00", budgetRange: "₹50,000 – ₹80,000", source: "Website", stage: "Contacted", assignedToId: "TM-002", lastActivity: dateRel(-3), movedToStageAt: dateRel(-7), notes: [{ date: dateRel(-3), content: "Sent email requesting requirements call.", authorId: "TM-002" }] },
  { id: "#LD-1003", clientName: "Akash & Megha", phone: "+91 77766 55544", email: "akash.m@email.com", eventType: "Wedding", eventDate: "2025-12-05T00:00:00", budgetRange: "₹1,00,000 – ₹1,20,000", source: "WhatsApp", stage: "Won", assignedToId: "TM-001", lastActivity: dateRel(-2), movedToStageAt: dateRel(-2), notes: [{ date: dateRel(-2), content: "Confirmed booking after Zoom call.", authorId: "TM-001" }] },
  { id: "#LD-1004", clientName: "Poonam Joshi", phone: "+91 66655 44433", email: "poonam.j@email.com", eventType: "Maternity", eventDate: "2025-08-25T00:00:00", budgetRange: "₹15,000 – ₹25,000", source: "Referral", stage: "Proposal Sent", assignedToId: "TM-005", lastActivity: dateRel(-1), movedToStageAt: dateRel(-12), notes: [{ date: dateRel(-1), content: "Quote sent last week.", authorId: "TM-005" }] },
  { id: "#LD-1005", clientName: "SunTech Innovations", phone: "+91 55544 33322", email: "admin@suntech.in", eventType: "Corporate", eventDate: "2025-06-10T00:00:00", budgetRange: "₹40,000 – ₹60,000", source: "Google", stage: "Won", assignedToId: "TM-002", lastActivity: dateRel(-5), movedToStageAt: dateRel(-5), notes: [{ date: dateRel(-5), content: "Booked standard package.", authorId: "TM-002" }] },
  { id: "#LD-1006", clientName: "Rohan Kapoor", phone: "+91 33322 11100", email: "rohan.k@email.com", eventType: "Portrait", eventDate: "2025-05-30T00:00:00", budgetRange: "₹10,000 – ₹20,000", source: "Google", stage: "New Inquiry", assignedToId: "TM-005", lastActivity: dateRel(0), movedToStageAt: dateRel(0), notes: [{ date: dateRel(0), content: "Looking for actor portfolio shots.", authorId: "TM-005" }] },
  { id: "#LD-1007", clientName: "Maya & Sameer", phone: "+91 22211 00099", email: "maya.s@email.com", eventType: "Wedding", eventDate: "2025-10-18T00:00:00", budgetRange: "₹2,00,000 – ₹3,00,000", source: "Instagram", stage: "Won", assignedToId: "TM-001", lastActivity: dateRel(-6), movedToStageAt: dateRel(-11), notes: [{ date: dateRel(-6), content: "Deposit received.", authorId: "TM-001" }] }
];

export const invoices: Invoice[] = [
  { id: "#INV-3001", clientId: "CL-01", clientName: "Aditi & Rohan", bookingId: "#BK-2001", issueDate: "2025-01-20", dueDate: "2025-05-10", amount: 150000, amountPaid: 75000, status: "Partially Paid" },
  { id: "#INV-3002", clientId: "CL-03", clientName: "TechNova Solutions", bookingId: "#BK-2002", issueDate: "2025-02-12", dueDate: "2025-05-12", amount: 50000, amountPaid: 25000, status: "Partially Paid" },
  { id: "#INV-3003", clientId: "CL-06", clientName: "Nexus Corp", bookingId: "#BK-1900", issueDate: "2025-02-15", dueDate: "2025-03-15", amount: 45000, amountPaid: 45000, status: "Paid" },
  { id: "#INV-3004", clientId: "CL-01", clientName: "Aditi & Rohan", bookingId: "#BK-0902", issueDate: "2024-08-15", dueDate: "2024-09-15", amount: 65000, amountPaid: 65000, status: "Paid" },
  { id: "#INV-3005", clientId: "CL-13", clientName: "Meera & Varun", bookingId: "#BK-0903", issueDate: "2024-06-05", dueDate: "2024-07-05", amount: 180000, amountPaid: 180000, status: "Paid" }
];

export const transactions: Transaction[] = [
  { id: "TXN-1001", date: "2025-01-20T10:30:00", clientId: "CL-01", clientName: "Aditi & Rohan", bookingId: "#BK-2001", method: "Bank Transfer", amount: 75000, notes: "Advance Payment 50%" },
  { id: "TXN-1002", date: "2025-02-12T14:15:00", clientId: "CL-03", clientName: "TechNova Solutions", bookingId: "#BK-2002", method: "UPI", amount: 25000, notes: "Booking confirmation advance" },
  { id: "TXN-1003", date: "2024-08-15T09:45:00", clientId: "CL-01", clientName: "Aditi & Rohan", bookingId: "#BK-0902", method: "Bank Transfer", amount: 65000, notes: "Full payment for Pre-Wedding" },
  { id: "TXN-1004", date: "2024-06-05T16:20:00", clientId: "CL-13", clientName: "Meera & Varun", bookingId: "#BK-0903", method: "Bank Transfer", amount: 180000, notes: "Full payment for Wedding" }
];
