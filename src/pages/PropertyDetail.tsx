import { useParams } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Heart,
  Share2,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle,
  Star,
  Building2,
  Home,
  Briefcase,
  Globe,
  DollarSign,
  Users,
  TrendingUp,
  Shield
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AnimatedCounter from "@/components/AnimatedCounter";

const PropertyDetail = () => {
  const { id } = useParams();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  // Mock property data - in real app this would come from API/database
  const property = {
    id: id || "1",
    title: "Downtown Office Complex",
    type: "commercial",
    location: "Houston, TX",
    fullAddress: "1401 McKinney Street, Houston, TX 77010",
    price: 2850000,
    size: "12,500 sq ft",
    yearBuilt: 2018,
    badge: "Investment Grade",
    description: "Premium downtown office complex in the heart of Houston's business district. This investment-grade property offers exceptional returns with fully leased spaces and long-term tenant agreements. Perfect for international investors seeking E-2 or EB-5 visa compliance.",
    features: [
      "Prime downtown location with excellent visibility",
      "Fully leased with stable rental income",
      "Modern Class A office building",
      "On-site parking garage with 150 spaces",
      "Energy-efficient HVAC and lighting systems",
      "24/7 security and concierge services",
      "Walking distance to metro stations",
      "Proximity to major corporate headquarters"
    ],
    visaEligible: ["E-2", "EB-5"],
    financials: {
      capRate: "7.2%",
      grossRent: "$425,000",
      noi: "$385,000",
      roi: "12.8%"
    },
    amenities: [
      "High-speed fiber internet",
      "Conference rooms and meeting spaces",
      "Executive lounge",
      "Fitness center",
      "On-site restaurant and café",
      "Rooftop garden terrace"
    ],
    tenants: [
      { name: "Tech Solutions Inc.", space: "4,200 sq ft", lease: "8 years remaining" },
      { name: "Financial Advisory Group", space: "3,800 sq ft", lease: "5 years remaining" },
      { name: "Law Offices of Smith & Associates", space: "2,900 sq ft", lease: "6 years remaining" },
      { name: "Consulting Partners LLC", space: "1,600 sq ft", lease: "3 years remaining" }
    ],
    agent: {
      name: "Maria Rodriguez",
      title: "Senior Commercial Specialist",
      phone: "+1 (713) 555-0123",
      email: "maria.rodriguez@sinevabrokerage.com",
      languages: ["English", "Spanish", "Portuguese"]
    },
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600", 
      "/api/placeholder/800/600",
      "/api/placeholder/800/600"
    ],
    virtualTour: "https://example.com/virtual-tour",
    documents: [
      "Property Information Package",
      "Financial Statements (3 years)",
      "Tenant Lease Summaries",
      "Property Management Reports",
      "Environmental Assessment"
    ]
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyIcon = (type: string) => {
    switch(type) {
      case 'business': return Briefcase;
      case 'commercial': return Building2;
      default: return Home;
    }
  };

  const PropertyIcon = getPropertyIcon(property.type);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
            <Badge className="bg-accent text-accent-foreground">
              {property.badge}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-muted-foreground">4.8 (127 views)</span>
            </div>
          </div>
          
          <div 
            ref={headerRef}
            className={`transition-all duration-1000 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Property Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <PropertyIcon className="h-5 w-5" />
                    <span className="capitalize">{property.type} Property</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
                    {property.title}
                  </h1>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{property.fullAddress}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Square className="h-4 w-4" />
                    <span>{property.size}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Built {property.yearBuilt}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>{property.financials.capRate} Cap Rate</span>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="space-y-6">
                <Card className="p-6 shadow-elegant">
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-primary font-playfair">
                      <AnimatedCounter end={property.price} prefix="$" />
                    </div>
                    <div className="space-y-2">
                      <Button size="lg" className="w-full shadow-button">
                        Schedule Viewing
                      </Button>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Heart className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Visa Eligibility */}
                <Card className="p-6 shadow-card">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    Visa Eligible
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {property.visaEligible.map((visa, idx) => (
                      <Badge key={idx} variant="secondary">
                        {visa}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Gallery */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {property.images.map((image, index) => (
              <div key={index} className="aspect-video bg-gradient-primary rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                <PropertyIcon className="h-12 w-12 text-white/30" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                {index === 0 && (
                  <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                    Virtual Tour Available
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-playfair">Property Description</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-2xl font-bold mb-6 font-playfair">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Overview */}
              <div>
                <h3 className="text-2xl font-bold mb-6 font-playfair">Financial Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary font-playfair">{property.financials.capRate}</div>
                    <div className="text-sm text-muted-foreground">Cap Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary font-playfair">{property.financials.grossRent}</div>
                    <div className="text-sm text-muted-foreground">Annual Gross Rent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary font-playfair">{property.financials.noi}</div>
                    <div className="text-sm text-muted-foreground">Net Operating Income</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary font-playfair">{property.financials.roi}</div>
                    <div className="text-sm text-muted-foreground">ROI Projection</div>
                  </div>
                </div>
              </div>

              {/* Tenant Information */}
              <div>
                <h3 className="text-2xl font-bold mb-6 font-playfair">Current Tenants</h3>
                <div className="space-y-4">
                  {property.tenants.map((tenant, idx) => (
                    <Card key={idx} className="p-4 shadow-card">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{tenant.name}</h4>
                          <p className="text-sm text-muted-foreground">{tenant.space}</p>
                        </div>
                        <Badge variant="secondary">
                          {tenant.lease}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Agent Contact */}
              <Card className="p-6 shadow-elegant">
                <h3 className="text-xl font-bold mb-4">Your Agent</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{property.agent.name}</div>
                      <div className="text-sm text-muted-foreground">{property.agent.title}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{property.agent.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{property.agent.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Globe className="h-4 w-4 text-primary" />
                      <span>{property.agent.languages.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Agent
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Documents */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold mb-4">Available Documents</h3>
                <div className="space-y-2">
                  {property.documents.map((doc, idx) => (
                    <Button key={idx} variant="ghost" className="w-full justify-start text-sm">
                      <Shield className="h-4 w-4 mr-2" />
                      {doc}
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold mb-4">Property Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property ID</span>
                    <span className="font-medium">#{property.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Listed</span>
                    <span className="font-medium">30 days ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Views</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Inquiries</span>
                    <span className="font-medium">23</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyDetail;