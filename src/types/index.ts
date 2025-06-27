export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'vendor' | 'admin';
  avatar?: string;
  phone?: string;
  createdAt: Date;
  isVerified: boolean;
}

export interface Vendor extends User {
  businessName: string;
  businessType: 'hotel' | 'restaurant' | 'venue' | 'car_rental';
  kycStatus: 'pending' | 'approved' | 'rejected';
  subscriptionPlan: 'basic' | 'premium' | 'enterprise';
  rating: number;
  totalBookings: number;
  revenue: number;
}

export interface Service {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  category: 'hotel' | 'food' | 'venue' | 'car_rental';
  price: number;
  location: string;
  images: string[];
  amenities: string[];
  rating: number;
  reviews: number;
  isActive: boolean;
  createdAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  vendorId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
  notes?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  signup: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
}