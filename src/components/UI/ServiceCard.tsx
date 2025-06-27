import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart } from 'lucide-react';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onFavorite,
  isFavorited = false 
}) => {
  const categoryColors = {
    hotel: 'bg-blue-100 text-blue-800',
    food: 'bg-green-100 text-green-800',
    venue: 'bg-purple-100 text-purple-800',
    car_rental: 'bg-orange-100 text-orange-800',
  };

  const categoryLabels = {
    hotel: 'Hotel',
    food: 'Restaurant',
    venue: 'Event Venue',
    car_rental: 'Car Rental',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative">
        <img
          src={service.images[0]}
          alt={service.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[service.category]}`}>
            {categoryLabels[service.category]}
          </span>
        </div>
        {onFavorite && (
          <button
            onClick={() => onFavorite(service.id)}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
          >
            <Heart 
              className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
            {service.title}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{service.rating}</span>
            <span className="text-sm text-gray-500">({service.reviews})</span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {service.location}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {service.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {service.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{service.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${service.price}
            </span>
            <span className="text-gray-500 text-sm">
              {service.category === 'hotel' ? ' /night' : 
               service.category === 'car_rental' ? ' /day' : 
               service.category === 'venue' ? ' /event' : ' /person'}
            </span>
          </div>
          <Link
            to={`/service/${service.id}`}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;