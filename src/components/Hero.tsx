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
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Enhanced badge with real-time indicator - enhanced for video background */}
          <div className="inline-block mb-8">
            <Badge className="bg-background/80 text-accent px-6 py-3 text-sm font-space font-medium border border-accent/40 backdrop-blur-md hover:bg-background/90 transition-all duration-300 group cursor-default shadow-lg">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-accent rounded-full animate-glow"></span>
                <span>Premium Business • International Investors</span>
                <TrendingUp className="w-3 h-3 group-hover:scale-110 transition-transform" />
              </div>
            </Badge>
          </div>
          
          {/* Powerful headline with enhanced typography - enhanced for video background */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-clash font-bold text-foreground mb-8 leading-[0.85] drop-shadow-lg">
            Premium Business
            <br />
            <span className="text-accent bg-gradient-accent bg-clip-text text-transparent drop-shadow-sm">
              Investments
            </span>
          </h1>
          
          {/* Enhanced value proposition with social proof - enhanced for video background */}
          <div className="space-y-4 mb-12">
            <p className="text-xl sm:text-2xl text-foreground/90 max-w-4xl mx-auto font-satoshi leading-relaxed drop-shadow-sm">
              Connect with North America's most trusted business investment professionals.
              <br className="hidden sm:block" />
              <span className="text-foreground font-medium">20+ years of expertise</span> in business acquisitions & visa programs.
            </p>
            
            {/* Live social proof - enhanced for video background */}
            <div className="flex items-center justify-center space-x-6 text-sm text-foreground/80 bg-background/30 backdrop-blur-sm rounded-full px-6 py-3 border border-foreground/10">
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
              className="border-foreground/30 hover:bg-background/20 backdrop-blur-md group shadow-lg text-foreground"
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
                <div key={metric.id} className="text-center group px-6 py-8 bg-background/20 backdrop-blur-sm rounded-lg border border-foreground/10">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-foreground mb-4 group-hover:text-accent transition-colors drop-shadow-md">
                    <AnimatedCounter 
                      end={metric.metric_value} 
                      suffix={metric.metric_suffix}
                      delay={index * 200}
                      duration={2000}
                    />
                  </div>
                  <p className="text-foreground/80 font-satoshi text-base sm:text-lg capitalize">
                    {metric.metric_name.replace(/_/g, ' ')}
                  </p>
                </div>
              ))
            ) : (
              // Fallback static data that changes each visit
              <>
                <div className="text-center group px-6 py-8 bg-background/20 backdrop-blur-sm rounded-lg border border-foreground/10">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-foreground mb-4 group-hover:text-accent transition-colors drop-shadow-md">
                    <AnimatedCounter end={staticStats.propertiesSold} duration={2000} />+
                  </div>
                  <p className="text-foreground/80 font-satoshi text-base sm:text-lg">Businesses Sold</p>
                </div>
                
                <div className="text-center group px-6 py-8 bg-background/20 backdrop-blur-sm rounded-lg border border-foreground/10">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-foreground mb-4 group-hover:text-accent transition-colors drop-shadow-md">
                    <AnimatedCounter end={staticStats.totalRevenue} duration={2000} />M+
                  </div>
                  <p className="text-foreground/80 font-satoshi text-base sm:text-lg">Total Revenue</p>
                </div>
                
                <div className="text-center group px-6 py-8 bg-background/20 backdrop-blur-sm rounded-lg border border-foreground/10">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-foreground mb-4 group-hover:text-accent transition-colors drop-shadow-md">
                    <AnimatedCounter end={staticStats.activeAgents} duration={2000} />+
                  </div>
                  <p className="text-foreground/80 font-satoshi text-base sm:text-lg">Active Agents</p>
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