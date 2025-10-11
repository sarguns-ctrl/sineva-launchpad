import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Home, Briefcase, Globe, HeartHandshake, TrendingUp, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InteractiveCard from "@/components/InteractiveCard";
import commercialSkyline from '@/assets/commercial-skyline.jpg';
import luxuryResidential from '@/assets/luxury-residential.jpg';
import investmentMeeting from '@/assets/investment-meeting.jpg';
import conciergeServices from '@/assets/concierge-services.jpg';

const Services = () => {
  const navigate = useNavigate();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.3 });
  
  const services = [
    {
      icon: Briefcase,
      title: "Business Brokerage",
      description: "Smart platform connecting buyers and sellers worldwide",
      route: "/businesses",
      image: investmentMeeting
    },
    {
      icon: Building,
      title: "Commercial Real Estate",
      description: "Premium commercial properties for investment & operations",
      route: "/commercial-real-estate",
      image: commercialSkyline
    },
    {
      icon: Home,
      title: "Residential Properties",
      description: "Luxury homes across international markets",
      route: "/residential-properties",
      image: luxuryResidential
    },
    {
      icon: Globe,
      title: "International Services",
      description: "Cross-border transactions & investments",
      route: "/international-services",
      image: investmentMeeting
    },
    {
      icon: HeartHandshake,
      title: "Concierge Services",
      description: "Complete support from acquisition to settlement",
      route: "/concierge-services",
      image: conciergeServices
    },
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description: "Expert guidance on opportunities & ROI",
      route: "/investment-advisory",
      image: commercialSkyline
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-clash">
            Business, Immigration & Real Estate
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your allies in international investment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-border hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              onClick={() => navigate(service.route)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                {/* Icon */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-card">
                <h3 className="text-xl font-bold text-foreground mb-2 font-clash group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-accent font-medium text-sm group-hover:translate-x-2 transition-transform">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          ref={ctaRef}
          className={`text-center mt-20 transition-all duration-1000 ${
            ctaVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-primary rounded-3xl p-12 text-primary-foreground max-w-4xl mx-auto shadow-elegant relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-clash">
                Ready to Start Your Journey?
              </h3>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Expert guidance every step of the way
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-background text-primary hover:scale-105 shadow-button transition-all duration-300"
                  asChild
                >
                  <Link to="/contact">
                    Schedule Consultation
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-background/30 text-primary-foreground hover:bg-background/20 hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link to="/businesses">
                    Browse Opportunities
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;