import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Users, TrendingUp, Building2 } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import DualSearchBar from "@/components/DualSearchBar";

const Hero = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center space-y-8 transition-all duration-1000 ${heroVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
          {/* Hero Content */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium">
              Business Immigration + Real Estate Specialists
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-playfair leading-tight">
              Find a Business & Home to<br />
              <span className="text-accent">Suit Your Immigration Goals</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              The only platform combining business brokerage with immigration-focused real estate. 
              More than agents — we are your allies in building your American dream.
            </p>
          </div>
          
          {/* Dual Search Bar */}
          <div className="mt-12">
            <DualSearchBar />
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16">
            {[
              { icon: Globe, text: "25+ Countries", value: "Global Reach", delay: "delay-100" },
              { icon: Users, text: "150+ Specialists", value: "Expert Team", delay: "delay-200" },
              { icon: TrendingUp, text: "$2.5B+ Transactions", value: "Proven Results", delay: "delay-300" },
              { icon: Building2, text: "5,000+ Properties", value: "Full Portfolio", delay: "delay-500" }
            ].map(({ icon: Icon, text, value, delay }, index) => (
              <div 
                key={text}
                className={`text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 transition-all duration-700 hover:bg-white/20 hover:scale-105 hover:shadow-lg group ${heroVisible ? `animate-fade-in ${delay}` : 'opacity-0 translate-y-5'}`}
              >
                <Icon className="h-8 w-8 text-accent mx-auto mb-2 group-hover:animate-bounce-gentle" />
                <div className="text-2xl font-bold text-white font-playfair">{text}</div>
                <div className="text-white/80 text-sm">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;