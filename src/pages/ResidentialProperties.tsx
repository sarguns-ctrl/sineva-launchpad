import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Key, Shield, Globe, CheckCircle, ArrowRight, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ResidentialProperties = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBrowseHomes = () => {
    navigate('/properties');
  };

  const handleRelocationConsultation = () => {
    navigate('/contact');
  };

  const handleSearchProperties = () => {
    navigate('/properties');
  };

  const handleScheduleHomeTour = () => {
    navigate('/contact');
  };

  const handleShareStory = () => {
    toast({
      title: "Thank You!",
      description: "We'd love to hear your story. Our team will reach out to schedule an interview.",
    });
  };
  const serviceTypes = [
    {
      icon: Home,
      title: "Luxury Homes",
      description: "Exceptional properties in prestigious neighborhoods",
      features: ["Premium locations", "Unique architecture", "High-end finishes", "Private amenities"]
    },
    {
      icon: Key,
      title: "Investment Properties",
      description: "Cash-flowing rental properties and appreciation opportunities",
      features: ["Rental income", "Tax advantages", "Market appreciation", "Professional management"]
    },
    {
      icon: Shield,
      title: "Relocation Services",
      description: "Complete support for international moves and visa holders",
      features: ["Visa assistance", "School districts", "Community integration", "Legal guidance"]
    },
    {
      icon: Globe,
      title: "Property Management",
      description: "Full-service management for international property owners",
      features: ["Tenant screening", "Maintenance coordination", "Financial reporting", "24/7 support"]
    }
  ];

  const locations = [
    {
      city: "Miami, FL",
      properties: "1,200+",
      avgPrice: "$850K",
      growth: "+12%"
    },
    {
      city: "Los Angeles, CA", 
      properties: "800+",
      avgPrice: "$1.2M",
      growth: "+8%"
    },
    {
      city: "Toronto, ON",
      properties: "600+", 
      avgPrice: "$920K",
      growth: "+15%"
    },
    {
      city: "Mexico City, MX",
      properties: "400+",
      avgPrice: "$380K", 
      growth: "+18%"
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
              Residential Properties
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Luxury homes and residential properties across our international markets. 
              Specialized services for entrepreneurs and professionals relocating with their business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={handleBrowseHomes}>
                Browse Homes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary" onClick={handleRelocationConsultation}>
                Relocation Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Residential Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From luxury home purchases to complete relocation support, we provide comprehensive residential real estate services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceTypes.map((service, index) => (
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

      {/* Market Locations */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Our Market Locations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We serve key markets across North America and Latin America with deep local expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-6">
                  <MapPin className="h-8 w-8 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{location.city}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Properties:</span>
                      <span className="font-semibold">{location.properties}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Price:</span>
                      <span className="font-semibold">{location.avgPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Growth:</span>
                      <span className="font-semibold text-accent">{location.growth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Relocation Specialist Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
                Relocation Specialists
              </h2>
              <p className="text-xl text-muted-foreground">
                Moving to a new country for business? We specialize in helping entrepreneurs and professionals 
                find the perfect home while navigating visa requirements and business setup.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-accent" />
                    <span className="font-semibold">Visa Holder Expertise</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-accent" />
                    <span className="font-semibold">School District Guidance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-accent" />
                    <span className="font-semibold">Community Integration</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-accent" />
                    <span className="font-semibold">Legal Documentation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-accent" />
                    <span className="font-semibold">Banking Connections</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-accent" />
                    <span className="font-semibold">Lifestyle Setup</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-primary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Success Stories</h3>
              <div className="space-y-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/90 mb-2">
                    "They helped us find the perfect home near excellent schools while handling all our E-2 visa documentation."
                  </p>
                  <div className="text-sm text-white/70">- Maria & Carlos, Mexico → Miami</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white/90 mb-2">
                    "From business setup to home purchase, they guided us through every step of our Canadian expansion."
                  </p>
                  <div className="text-sm text-white/70">- James & Sarah, UK → Toronto</div>
                </div>
              </div>
              <Button className="w-full mt-6 bg-white text-primary hover:bg-white/90" onClick={handleShareStory}>
                Share Your Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair mb-6">
            Find Your Dream Home
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Whether you're relocating for business or investing in residential real estate, we're here to help you find the perfect property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-button hover:scale-105 transition-all duration-300" onClick={handleSearchProperties}>
              Search Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary hover:bg-primary hover:text-primary-foreground" onClick={handleScheduleHomeTour}>
              Schedule Home Tour
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResidentialProperties;