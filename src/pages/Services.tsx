import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Home, 
  Briefcase, 
  Globe, 
  HeartHandshake, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Users,
  MapPin,
  Clock,
  Shield,
  Award,
  Zap
} from "lucide-react";
import RelatedServices from "@/components/RelatedServices";
import CrossPageCTA from "@/components/CrossPageCTA";

const Services = () => {
  const mainServices = [
    {
      icon: Briefcase,
      title: "Business Brokerage",
      subtitle: "Smart Business Matching Platform",
      description: "Our revolutionary 'Tinder for Businesses' platform connects international entrepreneurs with profitable US businesses. Using advanced algorithms and deep market knowledge, we match buyers with sellers based on industry expertise, investment capacity, and immigration goals.",
      features: [
        "AI-powered business matching algorithm",
        "Comprehensive business valuations", 
        "Due diligence support and verification",
        "Immigration visa alignment (E-2, EB-5)",
        "Post-acquisition integration assistance",
        "Ongoing business mentorship programs"
      ],
      processSteps: [
        "Initial consultation and goal assessment",
        "Business matching based on criteria", 
        "Financial analysis and valuation review",
        "Legal due diligence coordination",
        "Closing and transition support"
      ],
      ctaText: "Explore Business Opportunities",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Building,
      title: "Commercial Real Estate",
      subtitle: "Investment-Grade Properties",
      description: "Specialized in commercial properties that align with immigration investment requirements. From office buildings to retail spaces, we focus on properties that generate strong returns while meeting visa criteria for international investors.",
      features: [
        "Investment-grade office buildings",
        "High-traffic retail locations", 
        "Industrial and warehouse facilities",
        "Mixed-use development opportunities",
        "Property management coordination",
        "Tax optimization strategies"
      ],
      processSteps: [
        "Investment goal and visa requirement analysis",
        "Market research and property identification",
        "Financial modeling and ROI projections", 
        "Property inspection and evaluation",
        "Closing and asset management setup"
      ],
      ctaText: "View Commercial Properties",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Home,
      title: "Residential Properties",
      subtitle: "Luxury Homes & Investment Properties",
      description: "Premium residential properties in key markets across Texas and beyond. Whether you're relocating for business or seeking investment opportunities, we specialize in properties that serve both lifestyle and financial goals.",
      features: [
        "Luxury single-family homes",
        "Executive condominiums and penthouses",
        "Investment rental properties",
        "Gated community properties",
        "International buyer programs",
        "Relocation support services"
      ],
      processSteps: [
        "Lifestyle and investment preference assessment",
        "Market analysis and property selection",
        "Property tours (virtual and in-person)",
        "Negotiation and contract management",
        "Move-in coordination and local integration"
      ],
      ctaText: "Browse Luxury Homes",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const specializedServices = [
    {
      icon: Globe,
      title: "International Services",
      description: "Cross-border expertise spanning US, Canada, and Latin America",
      highlights: ["Multi-jurisdiction expertise", "Currency exchange guidance", "Cross-border tax planning"]
    },
    {
      icon: HeartHandshake,
      title: "Concierge Services", 
      description: "Complete immigration and settlement support from Grupo Sineva",
      highlights: ["Visa application assistance", "Banking and credit setup", "School and healthcare coordination"]
    },
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description: "Strategic guidance for optimal ROI and immigration compliance",
      highlights: ["Market analysis and forecasting", "Portfolio diversification", "Risk assessment and mitigation"]
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "20+ Years Expertise",
      description: "Backed by Grupo Sineva's proven track record in immigration and business services"
    },
    {
      icon: Users,
      title: "1,000+ Success Stories", 
      description: "International clients successfully relocated and invested across North America"
    },
    {
      icon: Globe,
      title: "15+ Countries Served",
      description: "Global reach with deep understanding of international client needs"
    },
    {
      icon: Shield,
      title: "Guaranteed Compliance",
      description: "All transactions structured to meet immigration visa requirements"
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
              OUR SERVICES
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair">
              Comprehensive Real Estate Solutions
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Where business, immigration, and real estate expertise converge. 
              Specialized services for international entrepreneurs building their American dream.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {mainServices.map((service, index) => (
              <div key={index} className={`${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} flex flex-col lg:flex-row items-center gap-12`}>
                {/* Content */}
                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <div className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center`}>
                      <service.icon className={`h-8 w-8 ${service.color}`} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-foreground font-playfair mb-2">
                        {service.title}
                      </h2>
                      <p className="text-xl text-accent font-medium">{service.subtitle}</p>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Features */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Key Features</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Process */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Our Process</h4>
                      <ol className="space-y-3">
                        {service.processSteps.map((step, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium flex-shrink-0">
                              {idx + 1}
                            </div>
                            <span className="text-muted-foreground">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <Button size="lg" className="shadow-button">
                    {service.ctaText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <Card className="p-8 shadow-elegant border-0">
                    <div className="aspect-video bg-gradient-primary rounded-xl flex items-center justify-center">
                      <service.icon className="h-24 w-24 text-white/20" />
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Specialized Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Additional expertise that sets us apart in serving international clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specializedServices.map((service, index) => (
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
                    {service.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <Zap className="h-4 w-4 text-accent" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Why Choose Sineva Brokerage
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The trusted choice for international real estate investments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto">
                  <reason.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices 
        maxItems={3} 
        showTitle={true}
        variant="default"
      />

      {/* CTA Section */}
      <CrossPageCTA
        title="Ready to Start Your Journey?"
        description="Schedule a consultation with our experts to discuss your specific needs and create a customized plan for your real estate and immigration goals."
        primaryAction={{ text: "Schedule Free Consultation", href: "/contact" }}
        secondaryAction={{ text: "Download Service Guide", href: "/about" }}
        variant="gradient"
        showContactOptions={true}
      />

      <Footer />
    </div>
  );
};

export default Services;