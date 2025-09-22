import { Star, CheckCircle, Camera, Globe, Users, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AgentPackages = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePackageAction = (packageName: string, price: string) => {
    if (price === 'Included') {
      navigate('/join-team');
    } else {
      toast({
        title: "Package Upgrade",
        description: `You've selected the ${packageName} package (${price}). Our team will contact you to complete the upgrade.`,
      });
    }
  };

  const handleContactSales = () => {
    navigate('/contact');
  };
  const packages = [
    {
      name: "Starter",
      price: "Included",
      description: "Perfect for new agents getting started",
      features: [
        "Basic CRM access",
        "Standard marketing templates",
        "Email support",
        "Basic training materials",
        "Lead notification system",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$99/month",
      description: "Enhanced tools for growing agents",
      features: [
        "Advanced CRM with automation",
        "Custom marketing materials",
        "Priority support",
        "Advanced training programs",
        "Social media management",
        "Website builder",
        "Lead scoring system",
        "Video messaging tools"
      ],
      popular: true
    },
    {
      name: "Elite",
      price: "$199/month",
      description: "Premium package for top producers",
      features: [
        "Enterprise CRM features",
        "Personal brand development",
        "Dedicated account manager",
        "Executive coaching",
        "Professional photography",
        "Virtual tour creation",
        "Advanced analytics",
        "AI-powered insights",
        "Custom mobile app",
        "International marketing"
      ],
      popular: false
    }
  ];

  const services = [
    {
      icon: Camera,
      title: "Professional Photography",
      description: "High-quality property photography and virtual tours"
    },
    {
      icon: Globe,
      title: "Digital Marketing",
      description: "Social media, email campaigns, and online advertising"
    },
    {
      icon: Users,
      title: "Lead Generation",
      description: "Qualified leads delivered directly to your CRM"
    },
    {
      icon: Smartphone,
      title: "Mobile Technology",
      description: "Cutting-edge mobile apps and tools for on-the-go productivity"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground">Agent Tools</Badge>
            <h1 className="text-4xl md:text-5xl font-clash font-bold mb-6">
              Agent Service Packages
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Choose the package that fits your business needs. From starter tools to enterprise solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Choose Your Package</h2>
            <p className="text-lg text-muted-foreground">
              All packages include our core platform features with optional upgrades.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-accent shadow-accent' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-accent mb-2">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mr-3 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}`}
                    variant={pkg.popular ? 'default' : 'outline'}
                    onClick={() => handlePackageAction(pkg.name, pkg.price)}
                  >
                    {pkg.price === 'Included' ? 'Get Started' : 'Upgrade Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Additional Services</h2>
            <p className="text-lg text-muted-foreground">
              Optional add-ons to enhance your real estate business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.title} className="text-center">
                <CardHeader>
                  <service.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-clash font-bold text-primary mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our agent packages include cutting-edge technology, comprehensive training, and ongoing support to help you build a thriving real estate business.
              </p>
              
              <div className="space-y-4">
                {[
                  "Advanced CRM with lead management",
                  "Automated marketing campaigns", 
                  "Real-time market analytics",
                  "Mobile-first technology platform",
                  "24/7 technical support",
                  "Continuous platform updates"
                ].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-secondary rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Need a Custom Solution?</h3>
              <p className="text-muted-foreground mb-6">
                We offer tailored packages for teams and high-volume producers.
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleContactSales}>
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AgentPackages;