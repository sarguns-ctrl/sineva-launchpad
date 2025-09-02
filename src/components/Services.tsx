import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Home, Briefcase, Globe, HeartHandshake, TrendingUp } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Briefcase,
      title: "Business Brokerage",
      description: "Tinder for businesses - smart matching platform connecting buyers and sellers worldwide",
      features: ["Business valuation", "Smart matching algorithm", "International reach", "Due diligence support"],
      color: "text-blue-600"
    },
    {
      icon: Building,
      title: "Commercial Real Estate",
      description: "Premium commercial properties for investment, development, and business operations",
      features: ["Office buildings", "Retail spaces", "Industrial properties", "Investment analysis"],
      color: "text-green-600"
    },
    {
      icon: Home,
      title: "Residential Properties",
      description: "Luxury homes and residential properties across our international markets",
      features: ["Luxury homes", "Investment properties", "Relocation services", "Property management"],
      color: "text-purple-600"
    },
    {
      icon: Globe,
      title: "International Services",
      description: "Cross-border transactions and international property investments",
      features: ["US market access", "Canadian properties", "Latin America expansion", "Currency guidance"],
      color: "text-orange-600"
    },
    {
      icon: HeartHandshake,
      title: "Concierge Services",
      description: "Complete support from business acquisition to US settlement and beyond",
      features: ["Visa assistance", "Business setup", "Banking solutions", "Lifestyle integration"],
      color: "text-red-600"
    },
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description: "Expert guidance on real estate and business investment opportunities",
      features: ["Market analysis", "ROI projections", "Risk assessment", "Portfolio diversification"],
      color: "text-indigo-600"
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Where Business, Immigration & Real Estate Come Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Specialized real estate services for entrepreneurs and professionals immigrating 
            with their business to the U.S. and Canada. More than agents - we are your allies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Whether you're looking to invest in real estate or need our specialized 
              immigration-focused services, we're here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-button">
                View Properties
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;