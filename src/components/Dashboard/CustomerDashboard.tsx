import React, { useState } from 'react';
import { 
  Calendar, 
  CreditCard, 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle, 
  XCircle,
  Heart,
  Search,
  Filter,
  Bell
} from 'lucide-react';
import { mockBookings, mockServices } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const userBookings = mockBookings.filter(booking => booking.userId === user?.id);
  const recentBookings = userBookings.slice(0, 3);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  const paymentStatusColors = {
    pending: 'bg-orange-100 text-orange-800',
    paid: 'bg-green-100 text-green-800',
    refunded: 'bg-gray-100 text-gray-800',
  };

  const getServiceById = (serviceId: string) => {
    return mockServices.find(service => service.id === serviceId);
  };

  const stats = [
    {
      title: 'Total Bookings',
      value: userBookings.length.toString(),
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Completed',
      value: userBookings.filter(b => b.status === 'completed').length.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Spent',
      value: `$${userBookings.reduce((sum, booking) => sum + booking.totalAmount, 0).toLocaleString()}`,
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Favorites',
      value: '8',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'bookings', name: 'My Bookings' },
    { id: 'favorites', name: 'Favorites' },
    { id: 'profile', name: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">Manage your bookings and explore new services</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200">
                New Booking
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentBookings.map((booking) => {
                  const service = getServiceById(booking.serviceId);
                  if (!service) return null;

                  return (
                    <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <img
                        src={service.images[0]}
                        alt={service.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{service.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {service.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {booking.startDate.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[booking.status]}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <p className="text-sm text-gray-900 font-medium mt-1">
                          ${booking.totalAmount}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {recentBookings.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-600 mb-4">Start exploring our services to make your first booking</p>
                  <button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200">
                    Explore Services
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">All Bookings</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {userBookings.map((booking) => {
                  const service = getServiceById(booking.serviceId);
                  if (!service) return null;

                  return (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start space-x-4">
                        <img
                          src={service.images[0]}
                          alt={service.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                {service.location}
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Calendar className="w-4 h-4 mr-1" />
                                {booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${statusColors[booking.status]}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                              <p className="text-lg font-bold text-gray-900 mt-2">
                                ${booking.totalAmount}
                              </p>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${paymentStatusColors[booking.paymentStatus]}`}>
                                {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          {booking.notes && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600">{booking.notes}</p>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              Booked on {booking.createdAt.toLocaleDateString()}
                            </div>
                            <div className="flex items-center space-x-3">
                              {booking.status === 'completed' && (
                                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                                  Write Review
                                </button>
                              )}
                              {booking.status === 'pending' && (
                                <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                                  Cancel
                                </button>
                              )}
                              <button className="text-gray-600 hover:text-gray-700 font-medium text-sm">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {userBookings.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings found</h3>
                  <p className="text-gray-600 mb-6">You haven't made any bookings yet. Start exploring our services!</p>
                  <button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200">
                    Browse Services
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other tabs can be implemented similarly */}
        {activeTab === 'favorites' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Favorite Services</h2>
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h3>
              <p className="text-gray-600">Start adding services to your favorites to see them here</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
            <div className="max-w-2xl">
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <img
                    src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                    alt={user?.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                    <button className="mt-2 text-primary-600 hover:text-primary-700 font-medium text-sm">
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={user?.phone || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Language
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;