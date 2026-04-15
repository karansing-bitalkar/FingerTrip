export interface User {
  id: string;
  name: string;
  email: string;
  role: 'traveler' | 'vendor' | 'admin';
  avatar?: string;
  phone?: string;
  location?: string;
  joinedDate?: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
  popular?: boolean;
}

export interface Package {
  id: string;
  title: string;
  destination: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  rating: number;
  reviews: number;
  vendor: string;
  vendorLogo?: string;
  description: string;
  itinerary: string[];
  includes: string[];
  discount?: number;
  trending?: boolean;
  category: string;
}

export interface Booking {
  id: string;
  packageTitle: string;
  destination: string;
  image: string;
  date: string;
  travelers: number;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  vendor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  comment: string;
  package: string;
  date: string;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  location: string;
  packages: number;
  rating: number;
  reviews: number;
  verified: boolean;
  specialties: string[];
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: string;
}
