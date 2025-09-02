import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Home, Briefcase, Globe, HeartHandshake, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface RelatedService {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  color: string;
  bgColor: string;
}

interface RelatedServicesProps {
  currentService?: string;
  maxItems?: number;
  showTitle?: boolean;
  variant?: 'default' | 'compact';
}

const RelatedServices = ({ 
  currentService, 
  maxItems = 3, 
  showTitle = true,
  variant = 'default'
}: RelatedServicesProps) => {
  const allServices: RelatedService[] = [
    {
      icon: Briefcase,
      title: "Business Brokerage",
      description: "Smart matching platform connecting buyers and sellers worldwide",
      href: "/businesses",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Building,
      title: "Commercial Real Estate",
      description: "Premium commercial properties for investment and development",
      href: "/commercial-real-estate",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Home,
      title: "Residential Properties",
      description: "Luxury homes and residential properties across our markets",
      href: "/residential-properties",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Globe,
      title: "International Services",
      description: "Cross-border transactions and international investments",
      href: "/international-services",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: HeartHandshake,
      title: "Concierge Services",
      description: "Complete support from acquisition to US settlement",
      href: "/concierge-services",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description: "Expert guidance on real estate and business investments",
      href: "/investment-advisory",
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  // Filter out current service and limit results
  const relatedServices = allServices
    .filter(service => service.title !== currentService)
    .slice(0, maxItems);

  if (relatedServices.length === 0) return null;

  if (variant === 'compact') {
    return (
      <div className="space-y-4">
        {showTitle && (
          <h3 className="text-lg font-semibold text-foreground">Related Services</h3>
        )}
        <div className="space-y-2">
          {relatedServices.slice(0, 4).map((service, index) => (
            <Link
              key={index}
              to={service.href}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 group"
            >
              <div className={`w-8 h-8 rounded-lg ${service.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`h-4 w-4 ${service.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-foreground group-hover:text-accent transition-colors">
                  {service.title}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {service.description}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Related Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how our comprehensive services work together to meet all your real estate needs
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedServices.map((service, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 shadow-card hover:scale-105">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  <Link to={service.href}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-elegant">
            <h3 className="text-2xl font-bold mb-4">
              Need Multiple Services?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our integrated approach ensures seamless coordination across all your real estate needs. 
              Let us create a custom solution that works for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-button"
                asChild
              >
                <Link to="/contact">
                  Get Custom Solution
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link to="/services">
                  View All Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;