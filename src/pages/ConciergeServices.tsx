import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, FileText, CreditCard, Users, Home, CheckCircle, ArrowRight, Star, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ConciergeServices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleViewPackages = () => {
    // Scroll to packages section
    document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScheduleConsultation = () => {
    navigate('/contact');
  };

  const handleChoosePackage = (packageName: string, price: string) => {
    setSelectedPackage(packageName);
    toast({
      title: "Package Selected",
      description: `You've selected the ${packageName} package (${price}). Our team will contact you within 24 hours to get started.`,
    });
  };

  const handleStartJourney = () => {
    navigate('/contact');
  };
  const services = [
    {
      icon: FileText,
      title: "Visa Assistance",
      description: "Complete support for E-2, L-1, EB-5, and other business immigration visas",
      features: ["Document preparation", "Legal coordination", "Timeline management", "Status updates"]
    },
    {
      icon: Users,
      title: "Business Setup",
      description: "Full business establishment services from incorporation to operational launch",
      features: ["Entity formation", "Tax registration", "Banking setup", "Compliance guidance"]
    },
    {
      icon: CreditCard,
      title: "Banking Solutions",
      description: "Facilitate banking relationships and financial services for international clients",
      features: ["Account opening", "Credit establishment", "Investment accounts", "International transfers"]
    },
    {
      icon: Home,
      title: "Lifestyle Integration",
      description: "Complete settlement support to help you establish your new life seamlessly",
      features: ["School enrollment", "Healthcare access", "Community connections", "Cultural orientation"]
    }
  ];

  const packages = [
    {
      name: "Essential",
      price: "$5,000",
      description: "Basic setup and settlement support",
      features: [
        "Visa documentation review",
        "Basic business setup guidance", 
        "Banking introductions",
        "School district information",
        "Community orientation"
      ]
    },
    {
      name: "Premium", 
      price: "$15,000",
      description: "Comprehensive relocation and business support",
      features: [
        "Full visa assistance",
        "Complete business incorporation",
        "Banking relationship management",
        "Property search coordination",
        "Family integration services",
        "Legal and tax consultations"
      ]
    },
    {
      name: "Executive",
      price: "$25,000", 
      description: "White-glove service for high-net-worth clients",
      features: [
        "Dedicated concierge manager",
        "Priority visa processing",
        "Premium business services",
        "Private banking access",
        "Luxury property concierge",
        "24/7 support hotline",
        "First-year ongoing support"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Carlos Rodriguez",
      business: "Tech Startup",
      country: "Mexico → Austin",
      quote: "Their concierge service made our E-2 visa process seamless. From business setup to finding the perfect home, they handled everything."
    },
    {
      name: "Sophie Chen", 
      business: "Manufacturing",
      country: "Singapore → Los Angeles", 
      quote: "The attention to detail was incredible. They even helped us find the right schools for our children and connected us with the local community."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold font-playfair">
              Concierge Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Complete support from business acquisition to US settlement and beyond. 
              White-glove service for entrepreneurs and professionals making the transition to new markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={handleViewPackages}>
                View Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary" onClick={handleScheduleConsultation}>
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Comprehensive Concierge Support
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From visa assistance to lifestyle integration, we provide end-to-end support for your relocation and business establishment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-2xl group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span className="text-card-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section id="packages-section" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Concierge Packages
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the level of support that matches your needs and timeline for relocation and business establishment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`shadow-card hover:shadow-elegant transition-all duration-300 group ${index === 1 ? 'border-2 border-primary' : ''}`}>
                <CardHeader className="text-center">
                  {index === 1 && (
                    <div className="bg-primary text-primary-foreground text-sm font-semibold py-1 px-3 rounded-full inline-block mb-4">
                      Most Popular
                    </div>
                  )}
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                    {pkg.name}
                  </CardTitle>
                  <div className="text-4xl font-bold text-primary mt-4">{pkg.price}</div>
                  <p className="text-muted-foreground mt-2">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="text-card-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-6 ${index === 1 ? 'bg-primary hover:bg-primary/90' : ''}`} variant={index === 1 ? 'default' : 'outline'} onClick={() => handleChoosePackage(pkg.name, pkg.price)}>
                    Choose {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Client Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real stories from entrepreneurs who successfully relocated and established their businesses with our concierge support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                    <div className="text-sm text-accent">{testimonial.country}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Our Concierge Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A systematic approach to ensure your transition is smooth, efficient, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {[
              { phase: "Discovery", duration: "Week 1-2", desc: "Assess your needs and create a custom plan" },
              { phase: "Documentation", duration: "Week 3-6", desc: "Prepare and submit all required documentation" },
              { phase: "Setup", duration: "Week 7-10", desc: "Business incorporation and banking establishment" },
              { phase: "Property", duration: "Week 11-14", desc: "Property search and acquisition support" },
              { phase: "Integration", duration: "Week 15-18", desc: "Lifestyle setup and community integration" },
              { phase: "Support", duration: "Ongoing", desc: "Continued support and optimization" }
            ].map((item, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">{item.phase}</h3>
                  <div className="text-xs text-accent mb-2">{item.duration}</div>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair mb-6">
            Ready for White-Glove Service?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let our concierge team handle every detail of your relocation and business establishment. 
            Focus on your business while we take care of everything else.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-button hover:scale-105 transition-all duration-300" onClick={handleStartJourney}>
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary hover:bg-primary hover:text-primary-foreground" onClick={handleScheduleConsultation}>
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConciergeServices;