import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Building2, TrendingUp, DollarSign } from "lucide-react";

const NewProperties = () => {
  return (
    <>
      <SEOHead 
        title="New Properties - Sineva Grupo | Latest Real Estate Listings"
        description="Explore our newest property listings and find your perfect home or investment opportunity."
      />

      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary/95 to-secondary overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                Discover New Properties
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
                Browse our latest listings and find your dream property today
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <Building2 className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Premium Listings</h3>
                <p className="text-white/80 text-sm">Exclusive properties curated for you</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <TrendingUp className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Market Insights</h3>
                <p className="text-white/80 text-sm">Real-time market data and trends</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <DollarSign className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Best Value</h3>
                <p className="text-white/80 text-sm">Competitive pricing on all listings</p>
              </div>
            </div>
          </div>
        </section>

        {/* Property Listings iframe */}
        <section className="relative py-8 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-card rounded-xl shadow-elegant border border-border/50 overflow-hidden">
              <iframe 
                id='NEOiframe' 
                style={{ width: '100%', height: '200vh', border: 'none' }}
                title="Property Listings"
                className="w-full"
              ></iframe>
              <script 
                async 
                src="https://assets.newestateonly.com/iframe-loader/load.js" 
                data-neokey="68dff2439343be62004ce407" 
                data-neolang="en"
              ></script>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose Sineva Grupo?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              With years of experience in the real estate market, we provide comprehensive services 
              to help you find, evaluate, and secure the perfect property for your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-card rounded-lg p-6 shadow-lg border border-border/50 min-w-[200px]">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Properties Listed</div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-lg border border-border/50 min-w-[200px]">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-muted-foreground">Happy Clients</div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-lg border border-border/50 min-w-[200px]">
                <div className="text-4xl font-bold text-primary mb-2">25+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default NewProperties;
