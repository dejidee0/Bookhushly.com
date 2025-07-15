'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Search, 
  MapPin, 
  Star, 
  Users, 
  Clock,
  Filter,
  Grid,
  List
} from 'lucide-react'
import { CATEGORIES } from '@/lib/constants'

// Services content component
function ServicesContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Services</h1>
        <p className="text-muted-foreground">
          Discover quality hospitality, logistics, and security services across Nigeria and Africa
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services, locations, or vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="lagos">Lagos</SelectItem>
              <SelectItem value="abuja">Abuja</SelectItem>
              <SelectItem value="kano">Kano</SelectItem>
              <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
              <SelectItem value="ibadan">Ibadan</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 24 of 156 services
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button variant="ghost" size="sm">
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Service Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Sample Service Cards */}
        {Array.from({ length: 12 }).map((_, index) => {
          const category = CATEGORIES[index % CATEGORIES.length]
          return (
          <Card key={index} className="hover:shadow-lg transition-shadow group cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg relative overflow-hidden flex items-center justify-center">
              <div className="text-6xl opacity-50">{category.icon}</div>
              <Badge className="absolute top-2 left-2 bg-blue-600">
                {category.label}
              </Badge>
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium flex items-center">
                <Star className="h-3 w-3 text-yellow-500 mr-1 fill-current" />
                4.{8 + (index % 2)}
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
                  {index % 4 === 0 && "Luxury Hotel Suite"}
                  {index % 4 === 1 && "Event Security Service"}
                  {index % 4 === 2 && "Catering & Restaurant"}
                  {index % 4 === 3 && "Logistics & Delivery"}
                </CardTitle>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {index % 3 === 0 && "Victoria Island, Lagos"}
                {index % 3 === 1 && "Wuse 2, Abuja"}
                {index % 3 === 2 && "GRA, Port Harcourt"}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="line-clamp-2 mb-3">
                Professional {CATEGORIES[index % CATEGORIES.length].label.toLowerCase()} service with excellent quality and customer satisfaction guaranteed.
              </CardDescription>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-3 w-3 mr-1" />
                  Up to {20 + (index * 10)} people
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {index % 2 === 0 ? "2-4 hours" : "Full day"}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold">₦{(50000 + (index * 25000)).toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {index % 2 === 0 ? "/day" : "/event"}
                  </span>
                </div>
                <Button size="sm" asChild>
                  <Link href={`/services/${index + 1}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )})}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <Button variant="outline" size="lg">
          Load More Services
        </Button>
      </div>
    </div>
  )
}

// Loading component
function ServicesLoading() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index}>
            <Skeleton className="aspect-video rounded-t-lg" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesLoading />}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-yellow-400 text-black">
              Premium Services
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Discover Quality Services
            </h1>
            <p className="text-xl text-blue-100">
              Browse through our curated selection of verified hospitality, logistics, and security services across Africa
            </p>
          </div>
        </div>
      </section>
      
      <ServicesContent />
    </Suspense>
  )
}