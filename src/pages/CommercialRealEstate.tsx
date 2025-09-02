import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  TrendingUp, 
  Shield, 
  Target,
  MapPin,
  DollarSign,
  CheckCircle, 
  ArrowRight,
  BarChart3,
  Users,
  Calculator,
  FileText
} from "lucide-react";
import RelatedServices from "@/components/RelatedServices";
import CrossPageCTA from "@/components/CrossPageCTA";
import { Link } from "react-router-dom";

const CommercialRealEstate = () => {
  const services = [
    {
      icon: Target,
      title: "Investment Analysis",
      description: "Comprehensive market research and investment opportunity identification",
      features: [
        "Market trend analysis",
        "ROI projections",
        "Risk assessment",
        "Comparable sales analysis"
      ]
    },
    {
      icon: Building,
      title: "Property Acquisition",
      description: "Full-service commercial property acquisition and transaction management",
      features: [
        "Property sourcing",
        "Negotiation support", 
        "Due diligence coordination",
        "Closing management"
      ]
    },
    {
      icon: Calculator,
      title: "Financial Modeling",
      description: "Detailed financial analysis and investment structure optimization",
      features: [
        "Cash flow projections",
        "Financing options analysis",
        "Tax optimization strategies",
        "Exit strategy planning"
      ]
    },
    {
      icon: Shield,
      title: "Visa Compliance",
      description: "Ensure investments meet EB-5 and E-2 visa requirements",
      features: [
        "EB-5 compliance review",
        "Job creation analysis", 
        "Investment amount verification",
        "Documentation preparation"
      ]
    }
  ];

  const propertyTypes = [
    {
      type: "Office Buildings",
      description: "Class A and B office properties in prime business districts",
      investment: "$1M - $20M",
      cap_rate: "6-8%",
      visa_suitability: "EB-5",
      features: ["Multi-tenant buildings", "Corporate headquarters", "Medical office buildings", "Flex office spaces"]
    },
    {
      type: "Retail Properties",
      description: "High-traffic retail locations and shopping centers",
      investment: "$500K - $15M", 
      cap_rate: "7-9%",
      visa_suitability: "E-2, EB-5",
      features: ["Strip centers", "Anchored retail", "Standalone retail", "Mixed-use developments"]
    },
    {
      type: "Industrial & Warehouse",
      description: "Distribution centers, manufacturing facilities, and logistics hubs",
      investment: "$2M - $50M",
      cap_rate: "6-7%", 
      visa_suitability: "EB-5",
      features: ["Distribution centers", "Manufacturing facilities", "Cold storage", "Flex industrial"]
    },
    {
      type: "Multifamily",
      description: "Apartment complexes and residential investment properties",
      investment: "$3M - $100M",
      cap_rate: "5-7%",
      visa_suitability: "EB-5", 
      features: ["Garden style apartments", "Mid-rise complexes", "Student housing", "Senior living"]
    }
  ];

  const markets = [
    {
      city: "Dallas-Fort Worth",
      description: "Largest commercial real estate market in Texas",
      growth: "+12.5% annually",
      highlights: ["Corporate relocations", "Population growth", "Infrastructure development"]
    },
    {
      city: "Houston",
      description: "Energy capital with diverse commercial opportunities", 
      growth: "+8.2% annually",
      highlights: ["Energy sector hub", "Port of Houston", "Medical center expansion"]
    },
    {
      city: "Austin",
      description: "Technology hub with rapid commercial development",
      growth: "+15.8% annually",
      highlights: ["Tech company growth", "University of Texas", "Live music district"]
    },
    {
      city: "San Antonio", 
      description: "Military and healthcare-driven commercial market",
      growth: "+9.1% annually",
      highlights: ["Military bases", "Healthcare systems", "Tourism industry"]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Investment Goals Assessment",
      description: "Define investment objectives, risk tolerance, and visa requirements"
    },
    {
      step: "02",
      title: "Market Analysis & Property Selection", 
      description: "Comprehensive market research and property identification"
    },
    {
      step: "03",
      title: "Financial Due Diligence",
      description: "Detailed financial analysis, inspections, and legal review"
    },
    {
      step: "04", 
      title: "Negotiation & Acquisition",
      description: "Professional negotiation and transaction closing support"
    },
    {
      step: "05",
      title: "Asset Management & Optimization",
      description: "Ongoing property management and investment optimization"
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
              COMMERCIAL REAL ESTATE
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair">
              Investment-Grade Properties
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Specialized in commercial properties that align with immigration investment requirements. 
              From office buildings to industrial facilities, we focus on assets that generate strong returns while meeting visa criteria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="shadow-button" asChild>
                <Link to="/properties">
                  View Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/contact">
                  Investment Consultation
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
              Commercial Investment Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive support for commercial real estate investments
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
              Diverse commercial real estate opportunities across key asset classes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {propertyTypes.map((property, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">{property.type}</CardTitle>
                  <CardDescription className="text-base">{property.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Investment</div>
                        <div className="font-semibold text-foreground">{property.investment}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Cap Rate</div>
                        <div className="font-semibold text-green-600">{property.cap_rate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Visa Match</div>
                        <div className="font-semibold text-accent">{property.visa_suitability}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Property Features</div>
                      <div className="flex flex-wrap gap-1">
                        {property.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
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

      {/* Key Markets */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Key Markets
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strategic locations with strong commercial real estate fundamentals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {markets.map((market, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 shadow-card text-center">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{market.city}</CardTitle>
                  <CardDescription>{market.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Annual Growth</div>
                      <div className="text-2xl font-bold text-green-600">{market.growth}</div>
                    </div>
                    <ul className="space-y-1 text-sm">
                      {market.highlights.map((highlight, idx) => (
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

      {/* Process Timeline */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Investment Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Structured approach to commercial real estate investment
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
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">$1.2B</div>
              <div className="text-muted-foreground">Assets Managed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">250+</div>
              <div className="text-muted-foreground">Properties Sold</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">8.5%</div>
              <div className="text-muted-foreground">Average Cap Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-muted-foreground">Investor Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices 
        currentService="Commercial Real Estate"
        maxItems={3} 
        showTitle={true}
        variant="default"
      />

      {/* CTA Section */}
      <CrossPageCTA
        title="Ready to Invest in Commercial Real Estate?"
        description="Explore investment-grade commercial properties that provide strong returns while meeting immigration visa requirements."
        primaryAction={{ text: "View Properties", href: "/properties" }}
        secondaryAction={{ text: "Investment Analysis", href: "/contact" }}
        variant="gradient"
        showContactOptions={true}
      />

      <Footer />
    </div>
  );
};

export default CommercialRealEstate;