import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase,
  TrendingUp,
  Users,
  Globe,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Shield,
  Zap,
  Target,
  Building2,
  Search
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InteractiveCard from "@/components/InteractiveCard";
import AnimatedCounter from "@/components/AnimatedCounter";

const BusinessBrokerage = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  const businessTypes = [
    {
      category: "Technology & Software",
      businesses: ["SaaS Companies", "Software Development", "IT Consulting", "E-commerce Platforms"],
      avgPrice: "$500K - $2M",
      visaTypes: ["E-2", "L-1"]
    },
    {
      category: "Healthcare Services", 
      businesses: ["Medical Practices", "Dental Clinics", "Physical Therapy", "Home Healthcare"],
      avgPrice: "$300K - $1.5M",
      visaTypes: ["E-2", "EB-5"]
    },
    {
      category: "Manufacturing",
      businesses: ["Food Processing", "Auto Parts", "Electronics", "Packaging"],
      avgPrice: "$1M - $5M",
      visaTypes: ["E-2", "EB-5"]
    },
    {
      category: "Retail & Franchise",
      businesses: ["Restaurant Chains", "Retail Stores", "Gas Stations", "Convenience Stores"],
      avgPrice: "$200K - $1M",
      visaTypes: ["E-2"]
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Initial Consultation",
      description: "We assess your investment goals, visa requirements, and business preferences to create a customized search strategy.",
      duration: "1-2 weeks"
    },
    {
      step: 2,
      title: "Business Matching",
      description: "Our AI-powered platform identifies businesses that match your criteria, budget, and immigration requirements.",
      duration: "2-4 weeks"
    },
    {
      step: 3,
      title: "Due Diligence",
      description: "Comprehensive financial analysis, legal review, and operational assessment of shortlisted businesses.",
      duration: "3-6 weeks"
    },
    {
      step: 4,
      title: "Negotiation & Closing",
      description: "Expert negotiation, contract finalization, and seamless transition support with immigration coordination.",
      duration: "4-8 weeks"
    }
  ];

  const successMetrics = [
    { number: 450, label: "Businesses Sold", suffix: "+" },
    { number: 89, label: "Success Rate", suffix: "%" },
    { number: 50, label: "Average ROI", suffix: "%" },
    { number: 24, label: "Countries Served", suffix: "+" }
  ];

  const features = [
    {
      icon: Search,
      title: "Smart Matching Algorithm",
      description: "AI-powered system matches buyers with sellers based on industry, location, size, and visa requirements."
    },
    {
      icon: Shield,
      title: "Comprehensive Due Diligence",
      description: "Thorough financial, legal, and operational analysis to ensure you make informed investment decisions."
    },
    {
      icon: Globe,
      title: "Immigration Compliance",
      description: "All business opportunities are pre-screened for E-2, EB-5, and other visa program requirements."
    },
    {
      icon: Users,
      title: "Expert Support Team",
      description: "Dedicated team of business brokers, immigration specialists, and transaction coordinators."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={headerRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
              headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Left Content */}
            <div className="space-y-8">
              <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium w-fit">
                BUSINESS BROKERAGE
              </Badge>
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair leading-tight">
                  Tinder for Businesses
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Revolutionary AI-powered platform connecting international entrepreneurs 
                  with profitable US businesses. Streamlined matching, comprehensive due diligence, 
                  and immigration visa compliance - all in one solution.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-button">
                  Browse Businesses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Start Matching Process
                </Button>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 space-y-8">
              <h3 className="text-2xl font-bold text-white font-playfair text-center">
                Our Track Record
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {successMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-accent font-playfair">
                      <AnimatedCounter end={metric.number} suffix={metric.suffix} duration={2500} delay={index * 200} />
                    </div>
                    <div className="text-white/80 text-sm mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              How Our Process Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From initial consultation to business ownership - we guide you through every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <InteractiveCard 
                key={step.step}
                delay={index * 150}
                className="text-center relative overflow-hidden"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto">
                    {step.step}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {step.duration}
                    </Badge>
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-primary"></div>
                )}
              </InteractiveCard>
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
              Diverse portfolio of profitable businesses across multiple industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessTypes.map((type, index) => (
              <InteractiveCard 
                key={index}
                delay={index * 100}
                className="group"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {type.category}
                    </h3>
                    <Badge className="bg-accent text-accent-foreground">
                      {type.avgPrice}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {type.businesses.map((business, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-muted-foreground">{business}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      Visa Types: {type.visaTypes.join(', ')}
                    </div>
                    <Button variant="outline" size="sm">
                      View Listings
                    </Button>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Why Choose Our Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced technology meets expert guidance for seamless business acquisitions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white space-y-6">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto">
              <Briefcase className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair">
              Ready to Find Your Perfect Business?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Join hundreds of successful international entrepreneurs who found their 
              ideal US business through our platform. Start your matching process today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-button">
                Start Business Search
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessBrokerage;