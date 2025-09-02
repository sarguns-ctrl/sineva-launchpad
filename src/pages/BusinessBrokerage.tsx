import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Users, 
  Target, 
  TrendingUp, 
  Shield, 
  Globe,
  CheckCircle, 
  ArrowRight,
  DollarSign,
  FileText,
  Handshake,
  BarChart3
} from "lucide-react";
import RelatedServices from "@/components/RelatedServices";
import CrossPageCTA from "@/components/CrossPageCTA";
import { Link } from "react-router-dom";

const BusinessBrokerage = () => {
  const services = [
    {
      icon: Target,
      title: "Business Matching",
      description: "AI-powered algorithm matches international entrepreneurs with profitable US businesses",
      features: [
        "Advanced matching algorithms",
        "Industry expertise analysis",
        "Investment capacity assessment",
        "Immigration goal alignment"
      ]
    },
    {
      icon: BarChart3,
      title: "Business Valuation",
      description: "Comprehensive financial analysis and market-based valuation services",
      features: [
        "Financial statement analysis",
        "Market comparable research",
        "Cash flow projections",
        "Risk assessment reports"
      ]
    },
    {
      icon: FileText,
      title: "Due Diligence",
      description: "Thorough verification and analysis of business operations and financials",
      features: [
        "Financial record verification",
        "Legal compliance review",
        "Operational assessment",
        "Market position analysis"
      ]
    },
    {
      icon: Shield,
      title: "Immigration Compliance",
      description: "Ensure business acquisitions meet E-2 and EB-5 visa requirements",
      features: [
        "E-2 visa qualification review",
        "EB-5 compliance assessment",
        "Investment structure guidance",
        "Documentation preparation"
      ]
    }
  ];

  const businessTypes = [
    {
      category: "Technology",
      industries: ["Software Development", "IT Services", "E-commerce", "Digital Marketing"],
      investment: "$100K - $2M",
      roi: "15-25% annually",
      visaMatch: "E-2, EB-5"
    },
    {
      category: "Healthcare",
      industries: ["Medical Practices", "Dental Clinics", "Senior Care", "Medical Equipment"],
      investment: "$200K - $5M",
      roi: "12-20% annually", 
      visaMatch: "EB-5"
    },
    {
      category: "Food & Beverage",
      industries: ["Restaurants", "Food Manufacturing", "Catering", "Specialty Foods"],
      investment: "$150K - $1.5M",
      roi: "10-18% annually",
      visaMatch: "E-2"
    },
    {
      category: "Manufacturing",
      industries: ["Light Manufacturing", "Assembly", "Distribution", "Import/Export"],
      investment: "$300K - $10M",
      roi: "12-22% annually",
      visaMatch: "E-2, EB-5"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "Assess your goals, experience, and investment capacity"
    },
    {
      step: "02", 
      title: "Business Matching",
      description: "AI-powered platform identifies suitable business opportunities"
    },
    {
      step: "03",
      title: "Due Diligence",
      description: "Comprehensive analysis of financials, operations, and compliance"
    },
    {
      step: "04",
      title: "Negotiation & Closing",
      description: "Professional support through purchase negotiations and closing"
    },
    {
      step: "05",
      title: "Post-Acquisition Support",
      description: "Ongoing mentorship and operational guidance"
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
              BUSINESS BROKERAGE
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair">
              Smart Business Matching Platform
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Our revolutionary "Tinder for Businesses" connects international entrepreneurs with profitable US businesses. 
              Advanced algorithms match you with opportunities that align with your expertise and immigration goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="shadow-button" asChild>
                <Link to="/businesses">
                  Browse Businesses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/contact">
                  Schedule Consultation
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
              Comprehensive Business Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              End-to-end support from initial matching to successful business ownership
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

      {/* Business Categories */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Business Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Diverse opportunities across high-growth industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessTypes.map((type, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">{type.category}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {type.industries.map((industry, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Investment Range</div>
                        <div className="font-semibold text-foreground">{type.investment}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Expected ROI</div>
                        <div className="font-semibold text-green-600">{type.roi}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Visa Match</div>
                      <div className="font-semibold text-accent">{type.visaMatch}</div>
                    </div>
                  </div>
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
              Structured approach to successful business acquisition
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
              <div className="text-muted-foreground">Businesses Matched</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">$2.5B</div>
              <div className="text-muted-foreground">Transaction Volume</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">30+</div>
              <div className="text-muted-foreground">Industries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices 
        currentService="Business Brokerage"
        maxItems={3} 
        showTitle={true}
        variant="default"
      />

      {/* CTA Section */}
      <CrossPageCTA
        title="Ready to Find Your Perfect Business Match?"
        description="Let our AI-powered platform connect you with profitable US businesses that align with your investment goals and immigration requirements."
        primaryAction={{ text: "Start Business Search", href: "/businesses" }}
        secondaryAction={{ text: "Schedule Consultation", href: "/contact" }}
        variant="gradient"
        showContactOptions={true}
      />

      <Footer />
    </div>
  );
};

export default BusinessBrokerage;