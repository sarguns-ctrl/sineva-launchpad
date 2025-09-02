import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Home, Briefcase, Globe, HeartHandshake, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InteractiveCard from "@/components/InteractiveCard";

const Services = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.3 });
  
  const services = [
    {
      icon: Briefcase,
      title: "Business Brokerage",
      description: "Tinder for businesses - smart matching platform connecting buyers and sellers worldwide",
      features: ["Business valuation", "Smart matching algorithm", "International reach", "Due diligence support"],
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Building,
      title: "Commercial Real Estate",
      description: "Premium commercial properties for investment, development, and business operations",
      features: ["Office buildings", "Retail spaces", "Industrial properties", "Investment analysis"],
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Home,
      title: "Residential Properties",
      description: "Luxury homes and residential properties across our international markets",
      features: ["Luxury homes", "Investment properties", "Relocation services", "Property management"],
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Globe,
      title: "International Services",
      description: "Cross-border transactions and international property investments",
      features: ["US market access", "Canadian properties", "Latin America expansion", "Currency guidance"],
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: HeartHandshake,
      title: "Concierge Services",
      description: "Complete support from business acquisition to US settlement and beyond",
      features: ["Visa assistance", "Business setup", "Banking solutions", "Lifestyle integration"],
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description: "Expert guidance on real estate and business investment opportunities",
      features: ["Market analysis", "ROI projections", "Risk assessment", "Portfolio diversification"],
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className={`text-center space-y-4 mb-16 transition-all duration-1000 ${
            headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
            Where Business, Immigration & Real Estate Come Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Specialized real estate services for entrepreneurs and professionals immigrating 
            with their business to the U.S. and Canada. More than agents - we are your allies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <InteractiveCard 
              key={index} 
              delay={index * 150}
              hoverScale={true}
              glowOnHover={true}
              className="border-0 shadow-card hover:shadow-elegant group"
            >
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 group-hover:animate-bounce-gentle`}>
                  <service.icon className={`h-7 w-7 ${service.color}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary"
                >
                  Learn More
                </Button>
              </div>
            </InteractiveCard>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          ref={ctaRef}
          className={`text-center mt-20 transition-all duration-1000 ${
            ctaVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white max-w-4xl mx-auto shadow-elegant hover:shadow-2xl transition-all duration-500 group">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-playfair group-hover:scale-105 transition-transform duration-300">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Whether you're looking to invest in real estate or need our specialized 
              immigration-focused services, we're here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 hover:scale-105 shadow-button transition-all duration-300 group/btn"
              >
                View Properties
                <span className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300"
              >
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