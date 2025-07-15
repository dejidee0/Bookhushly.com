'use client'

import { CATEGORIES } from '@/lib/constants'

export default function ServiceDetailClient({ serviceId }) {
  // Mock service data - in real app, fetch from database
  const service = {
    id: serviceId,
    title: "Luxury Hotel Suite - Premium Accommodation",
    description: "Experience the finest hospitality with our luxury hotel suite featuring world-class amenities, stunning city views, and exceptional service. Perfect for business travelers, tourists, and special occasions.",
    category: "hotels",
    price: 75000,
    location: "Victoria Island, Lagos",
    capacity: 4,
    duration: "Per night",
    rating: 4.8,
    reviewCount: 127,
    availability: "available",
    features: [
      "24/7 Room Service",
      "High-Speed WiFi",
      "Air Conditioning",
      "City View",
      "Mini Bar",
      "Flat Screen TV",
      "Private Bathroom",
      "Concierge Service"
    ],
    requirements: [
      "Valid ID required at check-in",
      "Credit card for incidentals",
      "No smoking policy",
      "Quiet hours: 10 PM - 7 AM"
    ],
    cancellation_policy: "Free cancellation up to 24 hours before check-in. 50% refund for cancellations within 24 hours.",
    vendor: {
      id: "vendor-1",
      business_name: "Grand Lagos Hotels",
      name: "Adebayo Johnson",
      email: "info@grandlagoshotels.com",
      phone: "+234 901 234 5678",
      website: "www.grandlagoshotels.com",
      approved: true,
      rating: 4.9,
      totalBookings: 1250
    },
    media_urls: [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800"
    ]
  }

  const category = CATEGORIES.find(cat => cat.value === service.category)

  return (
    <div className="container py-8">
      <div className="mb-6">
        <a 
          href="/services" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Services
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Info */}
          <div className="border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {category?.label}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    ✓ Verified
                  </span>
                </div>
                <h1 className="text-2xl font-bold">{service.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    📍 {service.location}
                  </div>
                  <div className="flex items-center">
                    ⭐ {service.rating} ({service.reviewCount} reviews)
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  👥 <span className="text-sm">Up to {service.capacity} guests</span>
                </div>
                <div className="flex items-center space-x-2">
                  🕒 <span className="text-sm">{service.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  🛡️ <span className="text-sm">Verified Service</span>
                </div>
              </div>

              <hr />

              <div>
                <h3 className="font-semibold mb-3">Features & Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      ✅ <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr />

              <div>
                <h3 className="font-semibold mb-3">Requirements</h3>
                <ul className="space-y-1">
                  {service.requirements.map((requirement, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="mr-2">•</span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              <hr />

              <div>
                <h3 className="font-semibold mb-2">Cancellation Policy</h3>
                <p className="text-sm text-gray-600">{service.cancellation_policy}</p>
              </div>
            </div>
          </div>

          {/* Vendor Info */}
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">About the Vendor</h3>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-lg font-bold">
                {service.vendor.business_name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold">{service.vendor.business_name}</h4>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    ✓ Verified
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    ⭐ {service.vendor.rating} rating
                  </div>
                  <span>•</span>
                  <span>{service.vendor.totalBookings} bookings</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    📞 <span>{service.vendor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    ✉️ <span>{service.vendor.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    🌐 <span>{service.vendor.website}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="space-y-6">
          <div className="border rounded-lg p-6 sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold">₦{service.price.toLocaleString()}</div>
                <div className="text-sm text-gray-600">{service.duration}</div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                service.availability === 'available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {service.availability === 'available' ? 'Available' : 'Busy'}
              </span>
            </div>

            <div className="space-y-4">
              <a 
                href={`/book/${service.id}`}
                className={`w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md ${
                  service.availability === 'available'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                📅 {service.availability === 'available' ? 'Book Now' : 'Currently Unavailable'}
              </a>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Free cancellation up to 24 hours
                </p>
              </div>

              <hr />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Service fee</span>
                  <span>₦{service.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Platform fee</span>
                  <span>₦{(service.price * 0.05).toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₦{(service.price * 1.05).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Need Help?</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-start px-4 py-2 border rounded-md hover:bg-gray-50">
                📞 Call Vendor
              </button>
              <button className="w-full flex items-center justify-start px-4 py-2 border rounded-md hover:bg-gray-50">
                ✉️ Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}