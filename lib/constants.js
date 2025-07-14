export const CATEGORIES = [
  { value: 'hotels', label: 'Hotels', icon: '🏨' },
  { value: 'food', label: 'Food & Restaurants', icon: '🍽️' },
  { value: 'events', label: 'Events', icon: '🎉' },
  { value: 'logistics', label: 'Logistics', icon: '🚚' },
  { value: 'security', label: 'Security', icon: '🛡️' }
]

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
}

export const USER_ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin'
}

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
}