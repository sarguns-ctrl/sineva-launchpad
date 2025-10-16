import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useOptimizedMarketData } from "@/hooks/useOptimizedMarketData";
import AnimatedCounter from "./AnimatedCounter";
import MagneticButton from "./MagneticButton";
import DualSearchBar from "./DualSearchBar";
import InteractiveBusinessFinder from "./InteractiveBusinessFinder";
import { Badge } from "./ui/badge";
import { Building, Users, MapPin, ArrowRight, Play, TrendingUp, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

const Hero = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { data: marketData = [], isLoading: loading, error } = useOptimizedMarketData();

  // Static values to prevent continuous changes
  const staticStats = useMemo(() => ({
    successfulInvestors: 542,
    countriesServed: 23,
    propertiesSold: 2456,
    totalRevenue: 21,
    activeAgents: 127
  }), []);

  return (
    <section 
      ref={elementRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://gruposineva.com/wp-content/uploads/2025/09/iStock-1215766635.mp4" type="video/mp4" />
        </video>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-transparent to-primary/20" />
      </div>
      
      {/* Enhanced geometric accents - adjusted for video background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Enhanced badge with real-time indicator - enhanced for video background */}
          <div className="inline-block mb-4 sm:mb-8">
            <Badge className="bg-background/80 text-accent px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-space font-medium border border-accent/40 backdrop-blur-md hover:bg-background/90 transition-all duration-300 group cursor-default shadow-lg">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="w-2 h-2 bg-accent rounded-full animate-glow"></span>
                <span className="hidden sm:inline">Premium Business • International Investors</span>
                <span className="sm:hidden">Premium Business</span>
                <TrendingUp className="w-3 h-3 group-hover:scale-110 transition-transform" />
              </div>
            </Badge>
          </div>
          
          {/* Powerful headline with enhanced typography - enhanced for video background */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-clash font-bold text-foreground mb-4 sm:mb-8 leading-tight sm:leading-[0.85] drop-shadow-lg px-2">
            Premium Business
            <br />
            <span className="text-accent bg-gradient-accent bg-clip-text text-transparent drop-shadow-sm">
              Investments
            </span>
          </h1>
          
          {/* Enhanced value proposition with social proof - enhanced for video background */}
          <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-2">
            <p className="text-base sm:text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto font-satoshi leading-relaxed drop-shadow-sm">
              North America's most trusted investment professionals
              <br className="hidden sm:block" />
              <span className="text-foreground font-medium">20+ years expertise</span> • Business acquisitions • Visa programs
            </p>
            
            {/* Live social proof - enhanced for video background */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-foreground/80 bg-background/30 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-foreground/10 max-w-2xl mx-auto">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                <span className="hidden sm:inline">Licensed</span>
                <span className="sm:hidden">Lic.</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                <span>{staticStats.successfulInvestors}+ Investors</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                <span>{staticStats.countriesServed}+ Countries</span>
              </div>
            </div>
          </div>

          {/* Enhanced CTA section with hover effects */}
          <div 
            className={`flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-stretch sm:items-center mb-8 sm:mb-16 px-4 transition-all duration-1000 ${
              isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <MagneticButton 
              variant="accent" 
              size="lg"
              className="shadow-accent group relative overflow-hidden w-full sm:w-auto"
              asChild
            >
              <Link to="/businesses" className="flex items-center justify-center gap-2">
                <Building className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Browse Businesses</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </MagneticButton>
            
            <MagneticButton 
              variant="outline" 
              size="lg"
              className="border-foreground/30 hover:bg-background/20 backdrop-blur-md group shadow-lg text-foreground w-full sm:w-auto"
            >
              <Play className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm sm:text-base">Watch Our Story</span>
            </MagneticButton>
          </div>

          {/* Interactive Business Finder */}
          <div 
            className={`mb-8 sm:mb-16 px-2 transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '600ms' }}
          >
            <InteractiveBusinessFinder />
          </div>

          {/* Dynamic Statistics with real data */}
          <div 
            className={`grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto py-6 sm:py-12 px-2 transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '900ms' }}
          >
            {loading ? (
              // Loading placeholders
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="text-center group px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
                  <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-clash font-bold mb-2 sm:mb-4">
                    <div className="h-8 sm:h-12 bg-muted/30 rounded animate-pulse"></div>
                  </div>
                  <div className="h-4 sm:h-5 bg-muted/20 rounded animate-pulse"></div>
                </div>
              ))
            ) : marketData.length > 0 ? (
              // Dynamic market data
              marketData.slice(0, 3).map((metric, index) => (
                <div key={metric.id} className="text-center group px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 bg-background/20 backdrop-blur-sm rounded-lg border border-foreground/10">
                  <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-clash font-bold text-foreground mb-2 sm:mb-4 group-hover:text-accent transition-colors drop-shadow-md">
                    <AnimatedCounter 
                      end={metric.metric_value} 
                      suffix={metric.metric_suffix}
                      delay={index * 200}
                      duration={2000}
                    />
                  </div>
                  <p className="text-foreground/80 font-satoshi text-xs sm:text-sm md:text-base lg:text-lg capitalize leading-tight">
                    {metric.metric_name.replace(/_/g, ' ')}
                  </p>
                </div>
              ))
            ) : (
              // Fallback static data that changes each visit
              <>
                <div className="text-center group px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 bg-background/20 backdrop-blur-sm rounded-lg border border-foreground/10">
                  <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-clash font-bold text-foreground mb-2 sm:mb-4 group-hover:text-accent transition-colors drop-shadow-md">
                    <AnimatedCounter end={staticStats.propertiesSold} duration={2000} />+
                  </div>
                  <p className="text-foreground/80 font-satoshi text-xs sm:text-sm md:text-base lg:text-lg leading-tight">Businesses Sold</p>
                </div>
                
                <div className="text-center group px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 bg-background/20 backdrop-blur-sm rounded-lg border border-foreground/10">
                  <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-clash font-bold text-foreground mb-2 sm:mb-4 group-hover:text-accent transition-colors drop-shadow-md">
                    <AnimatedCounter end={staticStats.totalRevenue} duration={2000} />M+
                  </div>
                  <p className="text-foreground/80 font-satoshi text-xs sm:text-sm md:text-base lg:text-lg leading-tight">Total Revenue</p>
                </div>
                
                <div className="text-center group px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 bg-background/20 backdrop-blur-sm rounded-lg border border-foreground/10">
                  <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-clash font-bold text-foreground mb-2 sm:mb-4 group-hover:text-accent transition-colors drop-shadow-md">
                    <AnimatedCounter end={staticStats.activeAgents} duration={2000} />+
                  </div>
                  <p className="text-foreground/80 font-satoshi text-xs sm:text-sm md:text-base lg:text-lg leading-tight">Active Agents</p>
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