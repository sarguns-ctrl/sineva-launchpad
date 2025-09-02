import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Users, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              World-Class
              <span className="block bg-gradient-secondary bg-clip-text text-transparent">
                Real Estate Brokerage
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Your one-stop solution for businesses, commercial, and residential properties. 
              <span className="block mt-2">By Grupo Sineva - Serving US, Canada & Latin America</span>
            </p>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Globe className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Global Reach</h3>
              <p className="text-white/80 text-sm">International presence across North America and Latin America</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Users className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Expert Agents</h3>
              <p className="text-white/80 text-sm">Personalized websites, marketing support, and guaranteed income</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <TrendingUp className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Business Marketplace</h3>
              <p className="text-white/80 text-sm">Tinder for businesses - smart matching for buyers and sellers</p>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              Browse Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
            >
              Join as Agent
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-16 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">1000+</div>
              <div className="text-white/80 text-sm mt-1">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <div className="text-white/80 text-sm mt-1">Businesses Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">200+</div>
              <div className="text-white/80 text-sm mt-1">Expert Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">3</div>
              <div className="text-white/80 text-sm mt-1">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;