import React, { useState } from 'react';
import { 
  Plus, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Users, 
  Star, 
  Eye, 
  Edit, 
  Trash2,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { mockServices, mockBookings } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const VendorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock vendor data - in real app, this would come from API
  const vendorServices = mockServices.filter(service => service.vendorId === user?.id);
  const vendorBookings = mockBookings.filter(booking => booking.vendorId === user?.id);

  const totalRevenue = vendorBookings.reduce((sum, booking) => 
    booking.paymentStatus === 'paid' ? sum + booking.totalAmount : sum, 0
  );

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active Listings',
      value: vendorServices.filter(s => s.isActive).length.toString(),
      change: '+2',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Bookings',
      value: vendorBookings.length.toString(),
      change: '+8.3%',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  const recentBookings = vendorBookings.slice(0, 5);

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'listings', name: 'My Listings' },
    { id: 'bookings', name: 'Bookings' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'profile', name: 'Business Profile' },
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Vendor Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage your services and bookings</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
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
                        <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200">
                    <Plus className="w-5 h-5 text-primary-600" />
                    <span className="text-primary-600 font-medium">Add New Service</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <BarChart3 className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600 font-medium">View Analytics</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600 font-medium">Manage Calendar</span>
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Booking Rate</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Customer Rating</span>
                      <span className="font-medium">4.8/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-medium">{'< 2h'}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">New Bookings</span>
                    <span className="text-2xl font-bold text-primary-600">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Revenue</span>
                    <span className="text-2xl font-bold text-green-600">$8,420</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">New Reviews</span>
                    <span className="text-2xl font-bold text-yellow-600">12</span>
                  </div>
                </div>
              </div>
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
                  const service = vendorServices.find(s => s.id === booking.serviceId);
                  if (!service) return null;

                  return (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <img
                          src={service.images[0]}
                          alt={service.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{service.title}</h3>
                          <p className="text-sm text-gray-500">
                            {booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[booking.status]}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <span className="font-medium text-gray-900">${booking.totalAmount}</span>
                        <div className="flex items-center space-x-2">
                          {booking.status === 'pending' && (
                            <>
                              <button className="text-green-600 hover:text-green-700">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-700">
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
              <button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {vendorServices.map((service) => (
                <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={service.images[0]}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">{service.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-gray-900">
                          ${service.price}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {service.category === 'hotel' ? ' /night' : 
                           service.category === 'car_rental' ? ' /day' : 
                           service.category === 'venue' ? ' /event' : ' /person'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${service.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="text-sm text-gray-600">
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">All Bookings</h2>
            {/* Booking management interface would go here */}
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Booking management interface coming soon</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics</h2>
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Analytics dashboard coming soon</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Profile</h2>
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Business profile management coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;