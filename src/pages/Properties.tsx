import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProperties } from "@/hooks/useProperties";
import { 
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  Building2,
  Home,
  Briefcase,
  Star,
  Heart,
  ArrowRight,
  TrendingUp,
  Users,
  Globe,
  CheckCircle,
  Calendar,
  Camera,
  Phone,
  Mail
} from "lucide-react";
import RelatedServices from "@/components/RelatedServices";
import CrossPageCTA from "@/components/CrossPageCTA";
import { useState } from "react";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { properties, loading, totalCount } = useProperties({ 
    type: activeFilter, 
    search: searchTerm 
  });

  const propertyTypes = [
    { id: "all", label: "All Properties", count: totalCount || 0 },
    { id: "commercial", label: "Commercial", count: properties.filter(p => p.property_type === 'commercial').length },
    { id: "residential", label: "Residential", count: properties.filter(p => p.property_type === 'residential').length }, 
    { id: "business", label: "Businesses", count: properties.filter(p => p.property_type === 'business').length }
  ];

  const featuredProperties = [
    {
      id: 1,
      title: "Downtown Office Complex",
      type: "commercial",
      location: "Houston, TX",
      price: 2850000,
      size: "12,500 sq ft",
      image: "/api/placeholder/400/250",
      badge: "Investment Grade",
      features: ["Prime downtown location", "Fully leased", "Strong ROI"],
      visaEligible: ["E-2", "EB-5"],
      rating: 4.8,
      views: 324
    },
    {
      id: 2,
      title: "River Oaks Estate",
      type: "residential", 
      location: "River Oaks, Houston, TX",
      price: 1250000,
      beds: 5,
      baths: 4,
      size: "4,200 sq ft",
      image: "/api/placeholder/400/250",
      badge: "Luxury",
      features: ["Gated community", "Pool & spa", "Premium finishes"],
      visaEligible: ["Investment Property"],
      rating: 4.9,
      views: 189
    },
    {
      id: 3,
      title: "Tech Consulting Firm",
      type: "business",
      location: "Austin, TX", 
      price: 750000,
      employees: "15-20",
      revenue: "$1.2M",
      image: "/api/placeholder/400/250",
      badge: "E-2 Ready",
      features: ["Established client base", "Scalable model", "Remote-friendly"],
      visaEligible: ["E-2", "L-1"],
      rating: 4.7,
      views: 267
    },
    {
      id: 4,
      title: "Retail Shopping Center",
      type: "commercial",
      location: "Dallas, TX",
      price: 3200000,
      size: "18,000 sq ft", 
      image: "/api/placeholder/400/250",
      badge: "High Yield",
      features: ["Multiple tenants", "Long-term leases", "Growing area"],
      visaEligible: ["EB-5", "E-2"],
      rating: 4.6,
      views: 412
    },
    {
      id: 5,
      title: "Manufacturing Business",
      type: "business",
      location: "San Antonio, TX",
      price: 1850000,
      employees: "35-40",
      revenue: "$3.8M",
      image: "/api/placeholder/400/250", 
      badge: "Established",
      features: ["20+ year history", "Consistent growth", "Key contracts"],
      visaEligible: ["E-2", "EB-5"],
      rating: 4.8,
      views: 156
    },
    {
      id: 6,
      title: "Luxury Penthouse",
      type: "residential",
      location: "Downtown Austin, TX", 
      price: 890000,
      beds: 3,
      baths: 3,
      size: "2,800 sq ft",
      image: "/api/placeholder/400/250",
      badge: "City Views",
      features: ["Panoramic views", "Modern design", "Concierge service"],
      visaEligible: ["Personal Residence"],
      rating: 4.9,
      views: 298
    }
  ];

  const marketInsights = [
    {
      title: "Texas Commercial Market", 
      trend: "up",
      change: "+12.8%",
      description: "Year-over-year growth in commercial property values"
    },
    {
      title: "Business Acquisitions",
      trend: "up", 
      change: "+24.3%", 
      description: "Increase in E-2 visa business purchases"
    },
    {
      title: "International Buyers",
      trend: "up",
      change: "+18.5%",
      description: "Growth in foreign real estate investment"
    }
  ];

  const filterTypes = [
    { label: "Price Range", options: ["Under $500K", "$500K - $1M", "$1M - $2M", "$2M+"] },
    { label: "Property Type", options: ["Office", "Retail", "Industrial", "Mixed-Use"] },
    { label: "Visa Eligible", options: ["E-2", "EB-5", "L-1", "Investment Property"] },
    { label: "Location", options: ["Houston", "Austin", "Dallas", "San Antonio"] }
  ];

  const filteredProperties = featuredProperties.filter(property => {
    if (activeFilter === "all") return true;
    return property.type === activeFilter;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium">
              PROPERTY LISTINGS
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair">
              Investment-Grade Properties
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Discover premium real estate opportunities specifically curated for international 
              investors and immigration visa requirements across Texas and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by location, property type, or business name..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Button */}
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
            </Button>
          </div>

          {/* Property Type Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <Button
                key={type.id}
                variant={activeFilter === type.id ? "default" : "outline"}
                onClick={() => setActiveFilter(type.id)}
                className="flex items-center space-x-2"
              >
                <span>{type.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {type.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights Bar */}
      <section className="py-6 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketInsights.map((insight, index) => (
              <div key={index} className="flex items-center space-x-3 bg-background rounded-lg p-4 shadow-sm">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground">{insight.title}</span>
                    <Badge className="bg-green-100 text-green-700 text-xs">{insight.change}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground font-playfair">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span>Loading Properties...</span>
                </div>
              ) : (
                `Featured Properties (${properties.length})`
              )}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Sort by:</span>
              <Button variant="ghost" size="sm">Price</Button>
              <Button variant="ghost" size="sm">Date Listed</Button>
              <Button variant="ghost" size="sm">Rating</Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden animate-pulse">
                  <div className="h-64 bg-muted"></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Properties Found</h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? `No properties match your search for "${searchTerm}"` 
                  : "No properties available in this category"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
              <Card key={property.id} className="group hover:shadow-elegant transition-all duration-300 border-0 shadow-card overflow-hidden">
                {/* Property Image */}
                <div className="relative h-64 bg-muted overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-20"></div>
                  
                  {/* Badges */}
                  <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">
                    {property.category}
                  </Badge>
                  
                  {/* Favorite Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  {/* Property Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      {property.property_type === 'business' ? (
                        <Briefcase className="h-8 w-8 text-primary" />
                      ) : property.property_type === 'commercial' ? (
                        <Building2 className="h-8 w-8 text-primary" />
                      ) : (
                        <Home className="h-8 w-8 text-primary" />
                      )}
                    </div>
                  </div>

                  {/* View Count & Rating */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                      <Camera className="h-3 w-3 text-white" />
                      <span className="text-xs text-white">{property.views_count} views</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-white">{property.rating}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Property Header */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {property.title}
                      </h3>
                      <span className="text-2xl font-bold text-primary font-playfair flex-shrink-0 ml-2">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                    
                     <div className="flex items-center space-x-1 text-muted-foreground">
                       <MapPin className="h-4 w-4" />
                       <span className="text-sm">{property.city}, {property.state}</span>
                     </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    {property.bedrooms && (
                      <div className="flex items-center space-x-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.bedrooms} bed</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center space-x-1">
                        <Bath className="h-4 w-4" />
                        <span>{property.bathrooms} bath</span>
                      </div>
                    )}
                    {property.size_sqft && (
                      <div className="flex items-center space-x-1">
                        <Square className="h-4 w-4" />
                        <span>{property.size_sqft.toLocaleString()} sq ft</span>
                      </div>
                    )}
                    {property.employee_count && (
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{property.employee_count} employees</span>
                      </div>
                    )}
                    {property.annual_revenue && (
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${(property.annual_revenue / 1000000).toFixed(1)}M revenue</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <ul className="space-y-1">
                      {property.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {property.features.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{property.features.length - 2} more features
                      </span>
                    )}
                  </div>

                  {/* Visa Eligibility */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Visa Eligible:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {property.visa_eligible.map((visa, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {visa}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      className="flex-1 shadow-button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Navigating to:', `/property/${property.id}`);
                        navigate(`/property/${property.id}`);
                      }}
                    >
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          )}

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="shadow-button">
              Load More Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Related Services Sidebar */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-bold text-foreground font-playfair mb-8">
                Why Choose Our Properties?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Visa Compliant</h3>
                  <p className="text-sm text-muted-foreground">All properties meet immigration investment requirements</p>
                </Card>
                <Card className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Investment Grade</h3>
                  <p className="text-sm text-muted-foreground">Carefully selected for strong ROI potential</p>
                </Card>
                <Card className="p-6 text-center">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">International Support</h3>
                  <p className="text-sm text-muted-foreground">Specialized guidance for foreign investors</p>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <RelatedServices 
                currentService="Properties"
                maxItems={4} 
                showTitle={true}
                variant="compact"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CrossPageCTA
        title="Need Help Finding the Perfect Property?"
        description="Our expert team can help you navigate the complex world of immigration-compliant real estate investments. Get personalized recommendations based on your specific visa and investment goals."
        primaryAction={{ text: "Schedule Property Consultation", href: "/contact" }}
        secondaryAction={{ text: "Learn About Our Process", href: "/services" }}
        variant="gradient"
        showContactOptions={true}
      />

      <Footer />
    </div>
  );
};

export default Properties;