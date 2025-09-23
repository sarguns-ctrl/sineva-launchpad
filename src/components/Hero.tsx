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
      {/* Enhanced background with subtle gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/10" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      
      {/* Dynamic geometric accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Enhanced badge with real-time indicator */}
          <div className="inline-block mb-8">
            <Badge className="bg-accent/15 text-accent px-6 py-3 text-sm font-space font-medium border border-accent/30 backdrop-blur-sm hover:bg-accent/20 transition-all duration-300 group cursor-default">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-accent rounded-full animate-glow"></span>
                <span>Premium Real Estate • International Investors</span>
                <TrendingUp className="w-3 h-3 group-hover:scale-110 transition-transform" />
              </div>
            </Badge>
          </div>
          
          {/* Powerful headline with enhanced typography */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-clash font-bold text-primary mb-8 leading-[0.85]">
            Premium Business
            <br />
            <span className="text-accent bg-gradient-accent bg-clip-text text-transparent">
              Investments
            </span>
          </h1>
          
          {/* Enhanced value proposition with social proof */}
          <div className="space-y-4 mb-12">
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto font-satoshi leading-relaxed">
              Connect with North America's most trusted business investment professionals.
              <br className="hidden sm:block" />
              <span className="text-primary font-medium">20+ years of expertise</span> in business acquisitions & visa programs.
            </p>
            
            {/* Live social proof */}
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-accent" />
                <span>Licensed Professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-accent" />
                <span>{staticStats.successfulInvestors}+ Successful Investors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-accent" />
                <span>{staticStats.countriesServed}+ Countries Served</span>
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
              variant="accent" 
              size="lg"
              className="shadow-accent group relative overflow-hidden"
              asChild
            >
              <Link to="/businesses">
                <Building className="w-5 h-5" />
                Browse Businesses
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </MagneticButton>
            
            <MagneticButton 
              variant="outline" 
              size="lg"
              className="border-primary/30 hover:bg-primary/10 backdrop-blur-sm group"
            >
              <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Watch Our Story
            </MagneticButton>
          </div>

          {/* Interactive Business Finder */}
          <div 
            className={`mb-16 transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '600ms' }}
          >
            <InteractiveBusinessFinder />
          </div>

          {/* Dynamic Statistics with real data */}
          <div 
            className={`grid grid-cols-3 gap-12 md:gap-16 max-w-5xl mx-auto py-12 transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '900ms' }}
          >
            {loading ? (
              // Loading placeholders
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="text-center group px-6 py-8">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold mb-4">
                    <div className="h-12 bg-muted/30 rounded animate-pulse"></div>
                  </div>
                  <div className="h-5 bg-muted/20 rounded animate-pulse"></div>
                </div>
              ))
            ) : marketData.length > 0 ? (
              // Dynamic market data
              marketData.slice(0, 3).map((metric, index) => (
                <div key={metric.id} className="text-center group px-6 py-8">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                    <AnimatedCounter 
                      end={metric.metric_value} 
                      suffix={metric.metric_suffix}
                      delay={index * 200}
                      duration={2000}
                    />
                  </div>
                  <p className="text-muted-foreground font-satoshi text-base sm:text-lg capitalize">
                    {metric.metric_name.replace(/_/g, ' ')}
                  </p>
                </div>
              ))
            ) : (
              // Fallback static data that changes each visit
              <>
                <div className="text-center group px-6 py-8">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                    <AnimatedCounter end={staticStats.propertiesSold} duration={2000} />+
                  </div>
                  <p className="text-muted-foreground font-satoshi text-base sm:text-lg">Businesses Sold</p>
                </div>
                
                <div className="text-center group px-6 py-8">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                    <AnimatedCounter end={staticStats.totalRevenue} duration={2000} />M+
                  </div>
                  <p className="text-muted-foreground font-satoshi text-base sm:text-lg">Total Revenue</p>
                </div>
                
                <div className="text-center group px-6 py-8">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                    <AnimatedCounter end={staticStats.activeAgents} duration={2000} />+
                  </div>
                  <p className="text-muted-foreground font-satoshi text-base sm:text-lg">Active Agents</p>
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