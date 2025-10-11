import heroPremium from '@/assets/hero-business-premium.jpg';
import commercialSkyline from '@/assets/commercial-skyline.jpg';
import luxuryResidential from '@/assets/luxury-residential.jpg';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const VisualShowcase = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      ref={elementRef}
      className="py-20 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-clash mb-4">
            Premium Investment
            <span className="text-accent"> Opportunities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover exceptional properties & businesses across North America
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Large Featured Image */}
          <div 
            className={`lg:row-span-2 group relative overflow-hidden rounded-3xl transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <div className="relative h-full min-h-[500px]">
              <img 
                src={heroPremium}
                alt="Premium Business Storefront"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-accent/10 backdrop-blur-md border border-accent/20 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2 font-clash">Premium Retail Spaces</h3>
                  <p className="text-muted-foreground mb-4">High-traffic locations in major cities</p>
                  <Button asChild className="group/btn">
                    <Link to="/businesses">
                      Explore Businesses
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Commercial */}
          <div 
            className={`group relative overflow-hidden rounded-3xl transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="relative h-[240px]">
              <img 
                src={commercialSkyline}
                alt="Commercial Real Estate"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 font-clash">Commercial Properties</h3>
                <p className="text-sm text-muted-foreground mb-3">Office & retail investments</p>
                <Button asChild variant="outline" size="sm" className="group/btn border-foreground/20">
                  <Link to="/commercial-real-estate">
                    View Properties
                    <ArrowRight className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Residential */}
          <div 
            className={`group relative overflow-hidden rounded-3xl transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '400ms' }}
          >
            <div className="relative h-[240px]">
              <img 
                src={luxuryResidential}
                alt="Luxury Residential"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 font-clash">Luxury Residences</h3>
                <p className="text-sm text-muted-foreground mb-3">Premium homes & estates</p>
                <Button asChild variant="outline" size="sm" className="group/btn border-foreground/20">
                  <Link to="/residential-properties">
                    Explore Homes
                    <ArrowRight className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualShowcase;
