import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Building2, Home, Briefcase } from "lucide-react";
import modernGlassOffice from "@/assets/modern-glass-office-building.jpg";
import startupTeamWorkspace from "@/assets/startup-team-workspace.jpg";
import luxuryModernDevelopment from "@/assets/luxury-modern-development.jpg";

const FeaturedOpportunities = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const opportunities = [
    {
      id: 1,
      image: modernGlassOffice,
      category: "Commercial",
      badge: "Trending",
      title: "Downtown Office Building",
      location: "Manhattan, New York",
      value: "$12.5M",
      roi: "8.2% ROI",
      icon: Building2,
      link: "/commercial-real-estate"
    },
    {
      id: 2,
      image: startupTeamWorkspace,
      category: "Business",
      badge: "Hot Deal",
      title: "Tech Startup Portfolio",
      location: "Austin, Texas",
      value: "$3.8M",
      roi: "E-2 Visa Eligible",
      icon: Briefcase,
      link: "/businesses"
    },
    {
      id: 3,
      image: luxuryModernDevelopment,
      category: "Investment",
      badge: "Premium",
      title: "Mixed-Use Development",
      location: "Miami, Florida",
      value: "$18.2M",
      roi: "EB-5 Program",
      icon: Home,
      link: "/investment-advisory"
    }
  ];

  return (
    <section 
      ref={elementRef}
      className="relative py-32 bg-gradient-to-b from-background via-secondary/50 to-background overflow-hidden"
    >
      {/* Background gradient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-accent/[0.08] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-accent opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <Badge className="bg-accent/10 text-accent px-6 py-2.5 text-sm font-semibold border border-accent/30 mb-6 shadow-sm">
            <TrendingUp className="w-4 h-4 mr-2 inline" />
            Featured Opportunities
          </Badge>
          
          <h2 className="text-5xl md:text-6xl font-bold text-foreground font-clash mb-6 leading-tight">
            Exclusive Investment
            <span className="block mt-2 bg-gradient-accent bg-clip-text text-transparent">Listings</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hand-picked premium opportunities across North America's most desirable markets
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {opportunities.map((opportunity, index) => {
            const IconComponent = opportunity.icon;
            return (
              <div
                key={opportunity.id}
                className={`group relative overflow-hidden rounded-2xl bg-card border border-border/60 hover:border-accent/30 hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 ${
                  isVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={opportunity.image}
                    alt={opportunity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-5 right-5">
                    <Badge className="bg-accent/95 text-accent-foreground border border-accent/30 shadow-accent px-4 py-1.5 font-semibold backdrop-blur-md">
                      {opportunity.badge}
                    </Badge>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-5 left-5">
                    <div className="w-14 h-14 bg-background/90 backdrop-blur-md rounded-2xl flex items-center justify-center border border-border/50 shadow-card">
                      <IconComponent className="w-7 h-7 text-accent" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="text-sm text-accent font-semibold mb-2 uppercase tracking-wide">
                    {opportunity.category}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 font-clash group-hover:text-accent transition-colors">
                    {opportunity.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {opportunity.location}
                  </p>
                  
                  <div className="flex items-center justify-between pt-5 border-t border-border/60">
                    <div>
                      <div className="text-3xl font-bold text-foreground font-clash">
                        {opportunity.value}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 font-medium">
                        {opportunity.roi}
                      </div>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="group/btn hover:bg-accent/10 hover:text-accent">
                      <Link to={opportunity.link}>
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '600ms' }}
        >
          <Button asChild size="lg" className="group">
            <Link to="/businesses">
              Explore All Opportunities
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;
