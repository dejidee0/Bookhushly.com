import { Service, Booking, Vendor } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    vendorId: '2',
    title: 'Luxury Hotel Downtown',
    description: 'Experience luxury in the heart of the city with premium amenities and exceptional service.',
    category: 'hotel',
    price: 299,
    location: 'New York, NY',
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', '24/7 Room Service'],
    rating: 4.8,
    reviews: 156,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    vendorId: '2',
    title: 'Gourmet Restaurant',
    description: 'Award-winning cuisine crafted by world-class chefs using the finest ingredients.',
    category: 'food',
    price: 85,
    location: 'Los Angeles, CA',
    images: [
      'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Fine Dining', 'Wine Pairing', 'Private Dining', 'Valet Parking'],
    rating: 4.9,
    reviews: 203,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '3',
    vendorId: '2',
    title: 'Grand Event Venue',
    description: 'Perfect venue for weddings, corporate events, and special celebrations.',
    category: 'venue',
    price: 1500,
    location: 'Miami, FL',
    images: [
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Full Catering', 'AV Equipment', 'Valet Service', 'Bridal Suite'],
    rating: 4.7,
    reviews: 78,
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '4',
    vendorId: '2',
    title: 'Premium Car Rental',
    description: 'Luxury vehicles for business trips, vacations, and special occasions.',
    category: 'car_rental',
    price: 120,
    location: 'Chicago, IL',
    images: [
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/193999/pexels-photo-193999.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['GPS Navigation', 'Insurance Included', '24/7 Support', 'Fuel Service'],
    rating: 4.6,
    reviews: 124,
    isActive: true,
    createdAt: new Date(),
  },
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    serviceId: '1',
    vendorId: '2',
    status: 'confirmed',
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-02-17'),
    totalAmount: 598,
    paymentStatus: 'paid',
    createdAt: new Date(),
    notes: 'Late check-in requested',
  },
  {
    id: '2',
    userId: '1',
    serviceId: '2',
    vendorId: '2',
    status: 'pending',
    startDate: new Date('2024-02-20'),
    endDate: new Date('2024-02-20'),
    totalAmount: 170,
    paymentStatus: 'pending',
    createdAt: new Date(),
  },
];

export const mockVendors: Vendor[] = [
  {
    id: '2',
    email: 'vendor@bookhushly.com',
    name: 'Sarah Vendor',
    role: 'vendor',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+1234567891',
    createdAt: new Date(),
    isVerified: true,
    businessName: 'Premium Hospitality Group',
    businessType: 'hotel',
    kycStatus: 'approved',
    subscriptionPlan: 'premium',
    rating: 4.8,
    totalBookings: 156,
    revenue: 45600,
  },
];