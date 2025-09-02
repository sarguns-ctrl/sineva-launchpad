import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CrossPageCTA from "@/components/CrossPageCTA";
import { 
  Globe,
  Users,
  Award,
  MapPin,
  Building2,
  Target,
  Heart,
  Shield,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  Briefcase,
  Home,
  Phone,
  Mail,
  Linkedin
} from "lucide-react";

const About = () => {
  const companyStats = [
    { number: "20+", label: "Years Experience", icon: Calendar },
    { number: "15+", label: "Countries Served", icon: Globe },
    { number: "2,000+", label: "Successful Transactions", icon: Award },
    { number: "95%", label: "Client Satisfaction", icon: Star }
  ];

  const leadership = [
    {
      name: "Carlos Sineva",
      role: "Founder & CEO",
      experience: "20+ years",
      specialization: "Immigration Law & Business Strategy",
      description: "Visionary leader who founded Grupo Sineva with a mission to help entrepreneurs build lives without borders. Expert in E-2, EB-5, and business immigration.",
      credentials: ["J.D. Immigration Law", "MBA International Business"],
      linkedinUrl: "#"
    },
    {
      name: "Maria Elena Rodriguez",
      role: "VP of Real Estate Operations", 
      experience: "15+ years",
      specialization: "Commercial Real Estate & Investment Analysis",
      description: "Leading expert in investment-grade real estate for immigration purposes. Specializes in EB-5 and E-2 compliant property investments.",
      credentials: ["CCIM Certification", "CRE Designation"],
      linkedinUrl: "#"
    },
    {
      name: "James Thompson",
      role: "Head of Agent Development",
      experience: "12+ years", 
      specialization: "Sales Training & International Markets",
      description: "Builds and develops our world-class agent network. Expert in international client relations and cross-cultural real estate transactions.",
      credentials: ["GRI Certification", "International Real Estate Specialist"],
      linkedinUrl: "#"
    },
    {
      name: "Dr. Ana Patricia Silva",
      role: "Chief Strategy Officer",
      experience: "18+ years",
      specialization: "Market Research & Business Intelligence",
      description: "Leads our market research and strategic planning initiatives. PhD in Economics with focus on international investment patterns.",
      credentials: ["PhD Economics", "CFA Charter"],
      linkedinUrl: "#"
    }
  ];

  const globalPresence = [
    {
      region: "United States",
      cities: ["Houston, TX", "Austin, TX", "Dallas, TX", "Miami, FL"],
      focus: "Primary operations and client services",
      team: "50+ professionals"
    },
    {
      region: "Canada", 
      cities: ["Toronto, ON", "Vancouver, BC", "Montreal, QC"],
      focus: "Canadian immigration and real estate",
      team: "15+ professionals"
    },
    {
      region: "Latin America",
      cities: ["Mexico City, MX", "Bogotá, CO", "São Paulo, BR"],
      focus: "Client origination and support",
      team: "25+ professionals"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Integrity First",
      description: "We operate with complete transparency and ethical standards in every transaction and client relationship."
    },
    {
      icon: Globe,
      title: "Global Perspective", 
      description: "Our international experience allows us to understand and serve clients from diverse cultural and business backgrounds."
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "We focus on delivering measurable outcomes that align with our clients' immigration and investment goals."
    },
    {
      icon: Heart,
      title: "Client-Centric",
      description: "Every decision we make prioritizes our clients' success and long-term satisfaction."
    }
  ];

  const achievements = [
    "Top 1% Real Estate Brokerage for International Clients (2023)",
    "Excellence in Immigration-Focused Real Estate Services Award",
    "Certified EB-5 Regional Center Partner", 
    "Licensed Real Estate Brokerage in Texas, Florida, and California",
    "Member: International Real Estate Federation (FIABCI)",
    "Accredited Business Intermediary (ABI) Certification"
  ];

  const clientTestimonials = [
    {
      name: "Roberto & Carmen Martinez",
      country: "Mexico", 
      visaType: "E-2 Visa",
      quote: "Sineva Brokerage helped us find the perfect restaurant business in Houston. Their team understood our visa requirements and guided us through every step. We're now successful business owners and proud Texas residents.",
      investment: "$450K Restaurant Purchase"
    },
    {
      name: "Dr. Chen Wei",
      country: "China",
      visaType: "EB-5 Visa",
      quote: "The commercial real estate investment recommended by Sineva not only met all EB-5 requirements but has exceeded our ROI expectations. Their market analysis was spot-on.",
      investment: "$800K Commercial Property"
    },
    {
      name: "Sofia & Alessandro Rossi", 
      country: "Italy",
      visaType: "L-1 Visa",
      quote: "Moving our family and expanding our business to the US seemed overwhelming until we found Sineva. They made the impossible possible with their expertise and personal attention.",
      investment: "$1.2M Manufacturing Business"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium w-fit">
                ABOUT SINEVA BROKERAGE
              </Badge>
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair leading-tight">
                  Building Lives
                  <span className="block text-accent">Without Borders</span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  For over two decades, we've been the bridge between international 
                  entrepreneurs and their American dreams. As the real estate division 
                  of Grupo Sineva, we combine immigration expertise with investment-grade 
                  real estate solutions.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 font-playfair text-center">
                Our Impact
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {companyStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-8 w-8 text-accent mx-auto mb-2" />
                    <div className="text-3xl font-bold text-accent font-playfair">{stat.number}</div>
                    <div className="text-white/80 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-foreground font-playfair mb-4">
                  Our Story
                </h2>
                <div className="w-24 h-1 bg-accent rounded"></div>
              </div>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2004 by Carlos Sineva, Grupo Sineva began with a simple yet powerful 
                  vision: to help international entrepreneurs and their families build successful 
                  lives in North America through strategic business and real estate investments.
                </p>
                
                <p>
                  What started as a boutique immigration law firm has evolved into a comprehensive 
                  ecosystem of services, with Sineva Brokerage representing the pinnacle of our 
                  real estate expertise. We've successfully guided over 2,000 families through 
                  the complex intersection of immigration law and real estate investment.
                </p>
                
                <p>
                  Today, we operate across 15+ countries with deep expertise in US and Canadian 
                  markets. Our unique position as both immigration specialists and real estate 
                  professionals allows us to serve clients in ways that traditional brokerages simply cannot.
                </p>
              </div>

              <Button size="lg" className="shadow-button">
                Learn About Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <Card className="shadow-card border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To revolutionize international real estate investment by providing 
                    immigration-compliant solutions that create lasting value for our clients 
                    and their families.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be the world's most trusted partner for international entrepreneurs 
                    seeking to build their American dream through strategic real estate investments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-foreground font-playfair">
              Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the experienced professionals who guide our mission and drive our success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{leader.name}</CardTitle>
                      <div className="text-primary font-medium mb-2">{leader.role}</div>
                      <div className="text-sm text-muted-foreground mb-2">{leader.experience} • {leader.specialization}</div>
                      <div className="flex flex-wrap gap-1">
                        {leader.credentials.map((credential, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {credential}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {leader.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Linkedin className="h-4 w-4 mr-2" />
                    Connect on LinkedIn
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-foreground font-playfair">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide every interaction and decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <value.icon className="h-10 w-10 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-foreground font-playfair">
              Global Presence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Serving clients worldwide with local expertise in key markets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {globalPresence.map((region, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300 border-0 shadow-sm">
                <CardHeader>
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl font-playfair">{region.region}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-foreground mb-2">Key Cities</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {region.cities.map((city, idx) => (
                        <div key={idx} className="flex items-center justify-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{city}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Badge className="bg-primary/10 text-primary">{region.team}</Badge>
                    <p className="text-xs text-muted-foreground">{region.focus}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Credentials */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-foreground font-playfair">
              Achievements & Credentials
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Recognition and certifications that validate our expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 bg-muted/50 rounded-lg p-4">
                <Award className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-foreground font-playfair">
              Client Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real families who achieved their American dream with our help
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientTestimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <div className="text-sm text-muted-foreground">From {testimonial.country}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className="bg-accent text-accent-foreground text-xs">{testimonial.visaType}</Badge>
                    <Badge variant="secondary" className="text-xs">{testimonial.investment}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <blockquote className="text-muted-foreground italic leading-relaxed text-sm">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white space-y-6">
            <Building2 className="h-16 w-16 mx-auto text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold font-playfair">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Join thousands of successful international investors who chose Sineva Brokerage 
              as their trusted partner in building their American dream.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-button">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Page CTA */}
      <CrossPageCTA
        title="Experience the Sineva Difference"
        description="Ready to work with the most trusted name in international real estate? Let's discuss how our comprehensive services can help you achieve your goals."
        primaryAction={{ text: "Explore Our Services", href: "/services" }}
        secondaryAction={{ text: "View Properties", href: "/properties" }}
        variant="default"
        showContactOptions={true}
      />

      <Footer />
    </div>
  );
};

export default About;