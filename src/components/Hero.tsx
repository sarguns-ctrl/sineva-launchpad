import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import AnimatedCounter from './AnimatedCounter';
import DualSearchBar from './DualSearchBar';
import { Building, Users, MapPin } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Hero = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      ref={elementRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-bounce-gentle" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-secondary/20 rounded-lg rotate-45 blur-lg animate-bounce-gentle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary/20 rounded-full blur-md animate-bounce-gentle" style={{ animationDelay: '2s' }} />
      </div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Revolutionary typography hierarchy */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="inline-block bg-accent/20 text-accent px-6 py-2 rounded-full text-sm font-clash font-medium tracking-wide backdrop-blur-sm border border-accent/30">
                Grupo Sineva Real Estate Division
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-clash font-bold text-primary leading-[0.9] tracking-tight">
              <span className="block">Real Estate</span>
              <span className="block text-transparent bg-gradient-accent bg-clip-text">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl font-satoshi text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Where <span className="text-accent font-medium">20+ years</span> of immigration expertise meets 
              <span className="text-primary font-medium"> cutting-edge</span> real estate innovation
            </p>
          </div>

          {/* Bento box search section */}
          <div 
            className={`mt-16 transition-all duration-1000 ${
              isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <DualSearchBar />
          </div>

          {/* Floating CTAs with magnetic effect */}
          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 transition-all duration-1000 ${
              isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'
            }`}
            style={{ animationDelay: '600ms' }}
          >
            <MagneticButton 
              variant="accent" 
              size="lg"
              className="shadow-accent hover:shadow-glow group"
            >
              <span className="group-hover:animate-bounce-gentle">🏡</span>
              Explore Properties
            </MagneticButton>
            
            <MagneticButton 
              variant="outline" 
              size="lg"
              className="border-primary/30 bg-card/50 backdrop-blur-sm hover:bg-primary hover:border-primary"
            >
              <Users className="w-5 h-5" />
              Meet Our Agents
            </MagneticButton>
          </div>
        </div>

        {/* Revolutionary stats section with asymmetric grid */}
        <div 
          className={`mt-24 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '900ms' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Asymmetric card layouts */}
            <div className="relative">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-500 hover:scale-105 border border-border/50">
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-accent rounded-full animate-glow" />
                <Building className="w-8 h-8 text-accent mb-4" />
                <div className="text-3xl font-clash font-bold text-primary mb-2">
                  <AnimatedCounter end={2500} duration={2000} />+
                </div>
                <p className="text-muted-foreground font-satoshi">Properties Sold</p>
              </div>
            </div>
            
            <div className="relative md:mt-8">
              <div className="bg-gradient-secondary rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-500 hover:scale-105">
                <Users className="w-8 h-8 text-secondary-foreground mb-4" />
                <div className="text-3xl font-clash font-bold text-secondary-foreground mb-2">
                  <AnimatedCounter end={95} duration={2000} />%
                </div>
                <p className="text-secondary-foreground/80 font-satoshi">Client Satisfaction</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-500 hover:scale-105 border border-primary/20">
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <div className="text-3xl font-clash font-bold text-primary mb-2">
                  <AnimatedCounter end={150} duration={2000} />+
                </div>
                <p className="text-muted-foreground font-satoshi">Markets Served</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;