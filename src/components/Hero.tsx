import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Users, TrendingUp, Building2 } from "lucide-react";

const Hero = () => {
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-left lg:text-left">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="font-playfair">Real Estate</span>
                <span className="block text-accent font-playfair mt-2">
                  Without Borders
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">
                Professional real estate services for entrepreneurs immigrating to the US and Canada. 
                <span className="block mt-3 text-accent font-medium">
                  Backed by Grupo Sineva's 20+ years of expertise.
                </span>
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Globe className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="text-white font-medium">Immigration-Focused</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Users className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="text-white font-medium">Expert Guidance</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <TrendingUp className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="text-white font-medium">Proven Results</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Building2 className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="text-white font-medium">Full Service</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 shadow-button font-medium"
              >
                View Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 font-medium"
              >
                Book Consultation
              </Button>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 font-playfair text-center">
                Trusted by International Clients
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent font-playfair">1,200+</div>
                  <div className="text-white/80 text-sm mt-1">Properties Matched</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent font-playfair">800+</div>
                  <div className="text-white/80 text-sm mt-1">Businesses Acquired</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent font-playfair">95%</div>
                  <div className="text-white/80 text-sm mt-1">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent font-playfair">15+</div>
                  <div className="text-white/80 text-sm mt-1">Countries Served</div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="text-center space-y-4">
              <p className="text-white/60 text-sm">Trusted by entrepreneurs from</p>
              <div className="flex flex-wrap justify-center gap-4 text-white/40 text-xs">
                <span>Mexico • Colombia • Brazil • Argentina</span>
                <span>India • China • Europe • Middle East</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;