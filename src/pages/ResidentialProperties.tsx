import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Heart, 
  Shield, 
  Users,
  MapPin,
  DollarSign,
  CheckCircle, 
  ArrowRight,
  Car,
  Wifi,
  Camera,
  Key
} from "lucide-react";
import RelatedServices from "@/components/RelatedServices";
import CrossPageCTA from "@/components/CrossPageCTA";
import { Link } from "react-router-dom";

const ResidentialProperties = () => {
  const services = [
    {
      icon: Home,
      title: "Luxury Home Sales",
      description: "Premium residential properties in exclusive neighborhoods and gated communities",
      features: [
        "Single-family luxury homes",
        "Executive estates", 
        "Waterfront properties",
        "Custom-built residences"
      ]
    },
    {
      icon: DollarSign,
      title: "Investment Properties",
      description: "High-yield rental properties and investment opportunities",
      features: [
        "Multi-family properties",
        "Short-term rental properties",
        "Luxury condominiums",
        "Vacation rental homes"
      ]
    },
    {
      icon: Users,
      title: "Relocation Services",
      description: "Complete support for international buyers relocating to the US",
      features: [
        "Area orientation tours",
        "School district guidance",
        "Temporary housing assistance",
        "Community integration support"
      ]
    },
    {
      icon: Shield,
      title: "International Buyer Programs",
      description: "Specialized services for foreign nationals and non-resident buyers",
      features: [
        "Foreign national financing",
        "ITIN application assistance",
        "Currency exchange coordination",
        "Legal and tax guidance"
      ]
    }
  ];

  const propertyTypes = [
    {
      type: "Luxury Single-Family Homes",
      description: "Premium homes in prestigious neighborhoods",
      price_range: "$800K - $10M+",
      features: ["Gated communities", "Private pools", "Home theaters", "Wine cellars", "Smart home technology"],
      locations: ["Highland Park", "University Park", "Plano", "Frisco", "Southlake"]
    },
    {
      type: "Executive Condominiums", 
      description: "High-rise luxury living in urban centers",
      price_range: "$400K - $5M",
      features: ["Concierge services", "Rooftop amenities", "Valet parking", "Fitness centers", "City skyline views"],
      locations: ["Downtown Dallas", "Uptown", "Deep Ellum", "Bishop Arts", "Knox Henderson"]
    },
    {
      type: "Waterfront Properties",
      description: "Exclusive homes on lakes and waterways", 
      price_range: "$1M - $15M",
      features: ["Private docks", "Boat houses", "Infinity pools", "Outdoor kitchens", "Panoramic water views"],
      locations: ["White Rock Lake", "Lake Ray Hubbard", "Grapevine Lake", "Lake Lewisville", "Cedar Creek Lake"]
    },
    {
      type: "Investment Properties",
      description: "High-yield rental and investment opportunities",
      price_range: "$200K - $2M",
      features: ["Turnkey rentals", "Property management", "High occupancy rates", "Cash flow positive", "Appreciation potential"],
      locations: ["Richardson", "Carrollton", "Irving", "Garland", "McKinney"]
    }
  ];

  const neighborhoods = [
    {
      name: "Highland Park",
      description: "Most prestigious residential area in Dallas",
      avg_price: "$2.8M",
      highlights: ["Top-rated schools", "Historic charm", "Celebrity residents", "Park Cities lifestyle"]
    },
    {
      name: "Plano",
      description: "Family-friendly suburb with excellent amenities",
      avg_price: "$650K", 
      highlights: ["Award-winning schools", "Corporate headquarters", "Shopping centers", "Recreation facilities"]
    },
    {
      name: "Frisco",
      description: "Fast-growing city with modern amenities",
      avg_price: "$720K",
      highlights: ["Sports complexes", "New developments", "Entertainment districts", "Master-planned communities"]
    },
    {
      name: "Southlake",
      description: "Upscale community with luxury lifestyle",
      avg_price: "$1.2M",
      highlights: ["Town Square", "Top schools", "Luxury shopping", "Country club living"]
    }
  ];

  const amenities = [
    {
      category: "Home Features",
      items: ["Gourmet kitchens", "Master suites", "Home offices", "Media rooms", "Wine storage", "Guest quarters"]
    },
    {
      category: "Outdoor Living",
      items: ["Swimming pools", "Outdoor kitchens", "Fire pits", "Landscaped gardens", "Tennis courts", "Guest houses"]
    },
    {
      category: "Smart Technology",
      items: ["Home automation", "Security systems", "Climate control", "Audio/visual systems", "Smart lighting", "EV charging"]
    },
    {
      category: "Community Amenities", 
      items: ["Golf courses", "Country clubs", "Fitness centers", "Parks & trails", "Tennis facilities", "Social clubs"]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Lifestyle Assessment",
      description: "Understand your preferences, budget, and lifestyle requirements"
    },
    {
      step: "02", 
      title: "Market Analysis & Property Selection",
      description: "Research neighborhoods and identify properties matching your criteria"
    },
    {
      step: "03",
      title: "Property Tours & Evaluation",
      description: "Arrange viewings and provide detailed property assessments"
    },
    {
      step: "04",
      title: "Negotiation & Contract Management", 
      description: "Professional negotiation and purchase contract coordination"
    },
    {
      step: "05",
      title: "Closing & Move-in Support",
      description: "Manage closing process and provide relocation assistance"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium">
              RESIDENTIAL PROPERTIES
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair">
              Luxury Homes & Investment Properties
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Premium residential properties in key markets across Texas and beyond. 
              Whether you're relocating for business or seeking investment opportunities, we specialize in properties that serve both lifestyle and financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="shadow-button" asChild>
                <Link to="/properties">
                  Browse Luxury Homes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/contact">
                  Schedule Tour
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Residential Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive residential real estate services for discerning clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <service.icon className="h-8 w-8 text-primary group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Property Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Diverse residential opportunities across luxury and investment segments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {propertyTypes.map((property, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">{property.type}</CardTitle>
                  <CardDescription className="text-base">{property.description}</CardDescription>
                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground">Price Range</div>
                    <div className="text-xl font-bold text-green-600">{property.price_range}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Key Features</div>
                      <div className="flex flex-wrap gap-1">
                        {property.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Popular Locations</div>
                      <div className="flex flex-wrap gap-1">
                        {property.locations.map((location, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {location}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Neighborhoods */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Featured Neighborhoods
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Exclusive communities with exceptional lifestyle amenities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {neighborhoods.map((neighborhood, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 shadow-card text-center">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{neighborhood.name}</CardTitle>
                  <CardDescription>{neighborhood.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Average Price</div>
                      <div className="text-2xl font-bold text-primary">{neighborhood.avg_price}</div>
                    </div>
                    <ul className="space-y-1 text-sm">
                      {neighborhood.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center justify-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Amenities */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Luxury Amenities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Premium features and amenities that define luxury living
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((category, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-primary">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <Heart className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Personalized approach to finding your perfect home
            </p>
          </div>

          <div className="relative">
            {process.map((item, index) => (
              <div key={index} className="flex items-start mb-12 last:mb-0">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-elegant">
                  {item.step}
                </div>
                <div className="ml-8 flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-lg text-muted-foreground">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="absolute left-10 w-0.5 h-12 bg-gradient-primary mt-20 -z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Homes Sold</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">$2.8M</div>
              <div className="text-muted-foreground">Average Sale Price</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">21</div>
              <div className="text-muted-foreground">Days on Market</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices 
        currentService="Residential Properties"
        maxItems={3} 
        showTitle={true}
        variant="default"
      />

      {/* CTA Section */}
      <CrossPageCTA
        title="Find Your Dream Home Today"
        description="Discover luxury residential properties that perfectly match your lifestyle and investment goals. Our expert team is ready to help you find the perfect home."
        primaryAction={{ text: "Browse Luxury Homes", href: "/properties" }}
        secondaryAction={{ text: "Schedule Private Tour", href: "/contact" }}
        variant="gradient"
        showContactOptions={true}
      />

      <Footer />
    </div>
  );
};

export default ResidentialProperties;