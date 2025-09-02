import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useMarketData } from "@/hooks/useMarketData";
import AnimatedCounter from "./AnimatedCounter";
import MagneticButton from "./MagneticButton";
import DualSearchBar from "./DualSearchBar";
import { Badge } from "./ui/badge";
import { Building, Users, MapPin, ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { marketData, loading } = useMarketData();

  return (
    <section 
      ref={elementRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Simplified background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/10" />
      
      {/* Subtle geometric accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Enhanced badge with real-time indicator */}
          <div className="inline-block mb-8">
            <Badge className="bg-accent/10 text-accent px-6 py-3 text-sm font-space font-medium border border-accent/20 backdrop-blur-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-glow mr-3"></span>
              Premium Real Estate • International Investors
            </Badge>
          </div>
          
          {/* Powerful headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-clash font-bold text-primary mb-6 leading-[0.9]">
            Premium Real Estate
            <br />
            <span className="text-accent">Made Simple</span>
          </h1>
          
          {/* Clear value proposition */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 font-satoshi leading-relaxed">
            Connect with North America's most trusted real estate professionals. 
            <br className="hidden sm:block" />
            <span className="text-primary font-medium">20+ years of expertise</span> backing every transaction.
          </p>

          {/* Clean CTA section */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 ${
              isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <MagneticButton 
              variant="accent" 
              size="lg"
              className="shadow-accent group"
            >
              <Building className="w-5 h-5" />
              Browse Properties
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            
            <MagneticButton 
              variant="outline" 
              size="lg"
              className="border-primary/20 hover:bg-primary/5"
            >
              <Play className="w-4 h-4" />
              Watch Our Story
            </MagneticButton>
          </div>

          {/* Search bar */}
          <div 
            className={`mb-16 transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '600ms' }}
          >
            <DualSearchBar />
          </div>

          {/* Dynamic Statistics with real data */}
          <div 
            className={`grid grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '900ms' }}
          >
            {loading ? (
              // Loading placeholders
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl sm:text-4xl font-clash font-bold mb-2">
                    <div className="h-10 bg-muted/30 rounded animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-muted/20 rounded animate-pulse"></div>
                </div>
              ))
            ) : marketData.length > 0 ? (
              // Dynamic market data
              marketData.slice(0, 3).map((metric, index) => (
                <div key={metric.id} className="text-center group">
                  <div className="text-3xl sm:text-4xl font-clash font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    <AnimatedCounter 
                      end={metric.metric_value} 
                      suffix={metric.metric_suffix}
                      delay={index * 200}
                      duration={2000}
                    />
                  </div>
                  <p className="text-muted-foreground font-satoshi text-sm sm:text-base capitalize">
                    {metric.metric_name.replace(/_/g, ' ')}
                  </p>
                </div>
              ))
            ) : (
              // Fallback static data
              <>
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-clash font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    <AnimatedCounter end={2500} duration={2000} />+
                  </div>
                  <p className="text-muted-foreground font-satoshi text-sm sm:text-base">Properties Sold</p>
                </div>
                
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-clash font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    <AnimatedCounter end={95} duration={2000} />%
                  </div>
                  <p className="text-muted-foreground font-satoshi text-sm sm:text-base">Client Satisfaction</p>
                </div>
                
                <div className="text-center group">
                  <div className="text-3xl sm:text-4xl font-clash font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    <AnimatedCounter end={150} duration={2000} />+
                  </div>
                  <p className="text-muted-foreground font-satoshi text-sm sm:text-base">Markets Served</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;