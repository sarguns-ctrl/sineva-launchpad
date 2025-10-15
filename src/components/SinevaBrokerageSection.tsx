import { Badge } from "./ui/badge";
import { CheckCircle, MapPin, FileText, Search, DollarSign, Handshake, ArrowRight, Shield } from 'lucide-react';
import modernWorkspaceTeam from '@/assets/modern-workspace-team.jpg';
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const SinevaBrokerageSection = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  const mainServices = [
    { icon: Search, title: "Find the Right Business", description: "Match your budget, visa needs & lifestyle" },
    { icon: MapPin, title: "Perfect Location", description: "Safe neighborhoods, good schools, great community" },
    { icon: FileText, title: "Handle Paperwork", description: "NDAs & LOIs explained simply" },
    { icon: CheckCircle, title: "Due Diligence", description: "Verify financials & business legitimacy" },
    { icon: DollarSign, title: "Financing Solutions", description: "Seller financing & funding guidance" },
    { icon: Handshake, title: "Smooth Closing", description: "Coordinated support from start to keys" }
  ];

  return (
    <section ref={elementRef} className="relative py-24 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <Badge className="bg-accent/10 text-accent px-6 py-3 text-sm font-medium border border-accent/40 mb-6">
              <Shield className="w-4 h-4 mr-2 inline" />
              Sineva Brokerage
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-foreground mb-6 leading-tight">
              Your First
              <br />
              <span className="text-accent bg-gradient-accent bg-clip-text text-transparent">
                U.S. Business
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 font-satoshi">
              We make buying a business simple, safe, and practical for international investors.
            </p>

            <Button asChild size="lg" className="group">
              <Link to="/businesses">
                Browse Businesses
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <div className="absolute inset-0 bg-gradient-accent rounded-3xl blur-2xl opacity-20 animate-pulse" />
            <img 
              src={modernWorkspaceTeam} 
              alt="Professional Business Team Collaboration" 
              className="relative rounded-3xl shadow-elegant w-full h-[400px] object-cover hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-lg font-clash font-semibold text-foreground mb-2">
                  {service.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SinevaBrokerageSection;