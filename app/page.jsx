import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Star,
  Search,
  Shield,
  Clock,
  Users,
  ArrowRight,
  Play,
  CheckCircle,
  Globe,
  Award,
  TrendingUp,
  MapPin,
  Calendar,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Smart Discovery",
      description:
        "AI-powered search to find the perfect service provider for your specific needs across Africa.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Verified Excellence",
      description:
        "Every vendor undergoes rigorous KYC verification ensuring premium quality and reliability.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Instant Booking",
      description:
        "Book services instantly with real-time availability and immediate confirmation.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Trusted Reviews",
      description:
        "Make informed decisions with authentic reviews from verified customers.",
    },
  ];

  const stats = [
    {
      value: "2,500+",
      label: "Service Providers",
      icon: <Users className="h-6 w-6" />,
    },
    {
      value: "50,000+",
      label: "Happy Customers",
      icon: <Star className="h-6 w-6" />,
    },
    {
      value: "100+",
      label: "Cities Covered",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      value: "99.8%",
      label: "Success Rate",
      icon: <Award className="h-6 w-6" />,
    },
  ];

  const testimonials = [
    {
      name: "Adebayo Johnson",
      role: "Business Executive",
      company: "Lagos",
      content:
        "Bookhushly transformed how we book corporate events. The quality of vendors is exceptional!",
      rating: 5,
      avatar: "AJ",
    },
    {
      name: "Fatima Abdullahi",
      role: "Event Planner",
      company: "Abuja",
      content:
        "The platform's verification process gives me confidence. Every vendor delivers exactly as promised.",
      rating: 5,
      avatar: "FA",
    },
    {
      name: "Chidi Okafor",
      role: "Hotel Manager",
      company: "Port Harcourt",
      content:
        "As a vendor, Bookhushly has significantly increased our bookings and customer reach.",
      rating: 5,
      avatar: "CO",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section with Search */}
      <section className="relative min-h-screen text-white overflow-hidden">
        {/* Background Image using Next/Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/book2.jpg" // 🔁 replace with your actual image filename in /public
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />{" "}
          {/* Overlay to improve text contrast */}
        </div>

        {/* Optional SVG Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 -z-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Animated Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10 py-20 flex items-center min-h-screen">
          <div className="w-full max-w-4xl mx-auto text-center">
            {/* Heading */}
            <div className="mb-12">
              <Badge className="mb-6 bg-yellow-400 text-black border-0 px-6 py-2 text-sm font-semibold">
                🌍 Your Complete
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-white">Hospitality</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300 bg-clip-text text-transparent">
                  Platform
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
                Experience seamless hospitality services with verified providers
                across Nigeria and Africa.
              </p>
            </div>

            {/* Search Interface */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search services..."
                    className="pl-12 h-14 text-lg border-0 bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Location"
                    className="pl-12 h-14 text-lg border-0 bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="mm/dd/yyyy"
                    type="date"
                    className="pl-12 h-14 text-lg border-0 bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                <Button
                  size="lg"
                  className="h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold"
                >
                  Search
                </Button>
              </div>

              {/* Category Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant="outline"
                  className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700 px-6 py-3"
                  asChild
                >
                  <Link href="/services">
                    <Search className="h-4 w-4 mr-2" />
                    All Services
                  </Link>
                </Button>

                {CATEGORIES.map((category) => (
                  <Button
                    key={category.value}
                    variant="outline"
                    className="bg-white text-gray-700 border-gray-200 hover:bg-gray-50 px-6 py-3"
                    asChild
                  >
                    <Link href={`/services?category=${category.value}`}>
                      <span className="mr-2">{category.icon}</span>
                      {category.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <div className="text-yellow-400 mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm lg:text-base text-blue-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trusted by Leading African Businesses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers and verified service
              providers across the continent
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {/* Mock company logos */}
            <div className="text-center">
              <div className="h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-bold text-lg">COMPANY</span>
              </div>
            </div>
            <div className="text-center">
              <div className="h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-bold text-lg">BRAND</span>
              </div>
            </div>
            <div className="text-center">
              <div className="h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-bold text-lg">CORP</span>
              </div>
            </div>
            <div className="text-center">
              <div className="h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-bold text-lg">GROUP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              Featured Services
            </Badge>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Popular Service Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our most booked services across Nigeria and Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.map((category, index) => (
              <Card
                key={category.value}
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-white to-gray-50 overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-blue-50 flex items-center justify-center relative">
                  <div className="text-8xl opacity-30 group-hover:opacity-50 transition-opacity">
                    {category.icon}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-700">
                      {(index + 1) * 150}+ providers
                    </Badge>
                  </div>
                </div>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {category.label}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Professional {category.label.toLowerCase()} services across
                    Africa
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      4.8+ average rating
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:bg-blue-600 group-hover:text-white transition-colors w-full"
                    asChild
                  >
                    <Link href={`/services?category=${category.value}`}>
                      Explore {category.label}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-400 text-black">
              Why Choose Bookhushly?
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              Built for African Excellence
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We provide a secure, reliable platform that connects you with the
              finest service providers across the continent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-blue-100">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              Customer Stories
            </Badge>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What Our Community Says
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real experiences from customers and vendors who trust Bookhushly
              for their service needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Experience African Excellence?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and verified service
              providers on Africa's leading service platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/register">
                  <Users className="mr-2 h-5 w-5" />
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg backdrop-blur-sm bg-white/10 transition-all duration-300"
                asChild
              >
                <Link href="/services">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Services
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-sm text-blue-200">Growing Fast</div>
              </div>
              <div>
                <Shield className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-sm text-blue-200">100% Secure</div>
              </div>
              <div>
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-sm text-blue-200">Verified Quality</div>
              </div>
              <div>
                <Globe className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-sm text-blue-200">Africa-Wide</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
