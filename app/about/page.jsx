import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Globe, 
  Shield, 
  Award,
  Heart,
  Target,
  Zap,
  CheckCircle
} from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trust & Security",
      description: "Every vendor undergoes thorough KYC verification to ensure quality and reliability."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community First",
      description: "Building strong connections between service providers and customers across Africa."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Innovation",
      description: "Leveraging technology to simplify service discovery and booking processes."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Excellence",
      description: "Committed to delivering exceptional experiences for both customers and vendors."
    }
  ]

  const stats = [
    { value: "500+", label: "Verified Vendors" },
    { value: "10,000+", label: "Happy Customers" },
    { value: "50+", label: "Cities Covered" },
    { value: "99%", label: "Success Rate" }
  ]

  const team = [
    {
      name: "Adebanjo Samson",
      role: "CEO & Founder",
      description: "Passionate about connecting African businesses with global opportunities."
    },
    {
      name: "Fatima Abdullahi",
      role: "CTO",
      description: "Tech enthusiast building scalable solutions for the African market."
    },
    {
      name: "Adedeji Ifedayo",
      role: "Head of ICT",
      description: "Ensuring smooth operations and exceptional experiences through technology."
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/85 to-blue-800/90"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              🇳🇬 Made in Nigeria, Built for Africa
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About Bookhushly
            </h1>
            <p className="text-xl text-white/90 mb-8">
              We're on a mission to connect Nigeria and Africa with quality hospitality, 
              logistics, and security services through technology and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To revolutionize how Africans discover, book, and experience quality services 
                by creating a trusted platform that empowers local businesses and delights customers.
              </p>
              <p className="text-muted-foreground mb-8">
                We believe that every African business deserves the opportunity to showcase their 
                services to a wider audience, and every customer deserves access to verified, 
                quality service providers in their area.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium">Customer-Centric</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-medium">Africa-Wide</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg shadow-2xl h-80 flex items-center justify-center">
                <div className="text-8xl opacity-30">🏢</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that reflect our commitment to connecting Africa through quality services
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Bookhushly
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 text-primary">
                    {value.icon}
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate Africans building the future of service discovery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground">
                How Bookhushly came to be
              </p>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                Bookhushly was born from a simple observation: finding quality, reliable services 
                in Nigeria and across Africa was unnecessarily difficult. Whether you needed a 
                hotel for a business trip, catering for an event, or security services for your 
                business, the process was fragmented, unreliable, and often frustrating.
              </p>
              <p className="text-muted-foreground mb-6">
                Our founders, having experienced these challenges firsthand, envisioned a platform 
                where customers could easily discover verified service providers, and where local 
                businesses could showcase their offerings to a broader audience.
              </p>
              <p className="text-muted-foreground mb-8">
                Today, Bookhushly serves thousands of customers and hundreds of verified vendors 
                across Nigeria, with plans to expand throughout Africa. We're not just a booking 
                platform – we're a community that celebrates African entrepreneurship and excellence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">KYC Verified Vendors</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">Secure Payment Processing</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm">24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're a customer looking for quality services or a business ready to grow, 
            we invite you to be part of the Bookhushly community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/register" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}