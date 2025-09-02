import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useMarketData } from "@/hooks/useMarketData";
import AnimatedCounter from "./AnimatedCounter";
import MagneticButton from "./MagneticButton";
import DualSearchBar from "./DualSearchBar";
import InteractivePropertyFinder from "./InteractivePropertyFinder";
import { Badge } from "./ui/badge";
import { Building, Users, MapPin, ArrowRight, Play, TrendingUp, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { marketData, loading } = useMarketData();

  return (
    <section 
      ref={elementRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Royal background with majestic gradient mesh */}
      <div className="absolute inset-0 bg-gradient-royal opacity-95" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      {/* Majestic geometric accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse shadow-gold" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent/12 rounded-full blur-2xl animate-pulse shadow-accent" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-primary/8 rounded-full blur-3xl shadow-royal" />
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Royal badge with premium indicator */}
          <div className="inline-block mb-8">
            <Badge className="bg-secondary/20 text-secondary-foreground px-8 py-4 text-sm font-space font-semibold border border-secondary/40 backdrop-blur-md hover:bg-secondary/25 hover:shadow-gold transition-all duration-500 group cursor-default shadow-gold">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 bg-secondary rounded-full animate-glow shadow-sm"></span>
                <span>👑 Royal Estate Collection • Exclusive Properties</span>
                <TrendingUp className="w-4 h-4 group-hover:scale-125 transition-transform text-secondary" />
              </div>
            </Badge>
          </div>
          
          {/* Majestic headline with royal typography */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-clash font-bold text-primary-foreground mb-8 leading-[0.85] drop-shadow-2xl">
            Royal Estate
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent drop-shadow-lg">
              Collection
            </span>
          </h1>
          
          {/* Royal value proposition with prestige proof */}
          <div className="space-y-4 mb-12">
            <p className="text-xl sm:text-2xl text-primary-foreground/90 max-w-4xl mx-auto font-satoshi leading-relaxed drop-shadow-lg">
              Experience unparalleled luxury with North America's most prestigious real estate advisors.
              <br className="hidden sm:block" />
              <span className="text-secondary font-semibold drop-shadow-sm">25+ years of royal excellence</span> in every exclusive transaction.
            </p>
            
            {/* Royal prestige proof */}
            <div className="flex items-center justify-center space-x-8 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
                <Award className="w-4 h-4 text-secondary" />
                <span>Royal Certified Advisors</span>
              </div>
              <div className="flex items-center space-x-2 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
                <Users className="w-4 h-4 text-secondary" />
                <span>1000+ Elite Clients</span>
              </div>
              <div className="flex items-center space-x-2 backdrop-blur-sm bg-white/10 px-3 py-2 rounded-full">
                <Globe className="w-4 h-4 text-secondary" />
                <span>25+ Exclusive Markets</span>
              </div>
            </div>
          </div>

          {/* Enhanced CTA section with hover effects */}
          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transition-all duration-1000 ${
              isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <MagneticButton 
              variant="default" 
              size="lg"
              className="bg-gradient-secondary text-primary shadow-gold hover:shadow-2xl group relative overflow-hidden border border-secondary/30"
              asChild
            >
              <Link to="/properties">
                <Building className="w-5 h-5" />
                Explore Royal Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </MagneticButton>
            
            <MagneticButton 
              variant="outline" 
              size="lg"
              className="border-primary-foreground/40 hover:bg-primary-foreground/10 backdrop-blur-md text-primary-foreground hover:text-secondary group shadow-royal"
            >
              <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Royal Experience
            </MagneticButton>
          </div>

          {/* Interactive Property Finder */}
          <div 
            className={`mb-16 transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '600ms' }}
          >
            <InteractivePropertyFinder />
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