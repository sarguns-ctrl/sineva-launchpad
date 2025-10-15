import officeBuildingModern from '@/assets/office-building-modern.jpg';
import teamMeetingRoom from '@/assets/team-meeting-room.jpg';
import businessGrowth from '@/assets/business-growth.jpg';
import dataAnalytics from '@/assets/data-analytics.jpg';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const VisualShowcase = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      ref={elementRef}
      className="relative py-24 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <Badge className="bg-accent/10 text-accent px-6 py-3 text-sm font-medium border border-accent/40 mb-6">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            Curated Collection
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground font-clash mb-6 leading-tight">
            Premium Investment
            <br />
            <span className="text-accent bg-gradient-accent bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover exceptional properties & businesses across North America's most prestigious markets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Large Featured Image */}
          <div 
            className={`lg:row-span-2 group relative overflow-hidden rounded-3xl shadow-card hover:shadow-elegant transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <div className="relative h-full min-h-[500px]">
              <img 
                src={officeBuildingModern}
                alt="Modern premium office building for commercial investments"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
              
              {/* Floating stats badge */}
              <div className="absolute top-6 right-6">
                <div className="bg-background/90 backdrop-blur-md border border-border rounded-2xl px-4 py-3 shadow-card">
                  <div className="text-sm text-muted-foreground">Starting at</div>
                  <div className="text-2xl font-bold text-accent font-clash">$2.5M</div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-card/90 backdrop-blur-md border border-border rounded-2xl p-8 shadow-elegant">
                  <Badge className="bg-accent text-accent-foreground mb-4 border-0">
                    Featured Investment
                  </Badge>
                  <h3 className="text-3xl font-bold text-foreground mb-3 font-clash">
                    Premium Business Districts
                  </h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    High-growth commercial opportunities in top metropolitan markets
                  </p>
                  <Button asChild size="lg" className="group/btn shadow-accent">
                    <Link to="/businesses">
                      Explore Investment Options
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Turn-Key Business */}
          <div 
            className={`group relative overflow-hidden rounded-3xl shadow-card hover:shadow-elegant transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="relative h-[240px]">
              <img 
                src={teamMeetingRoom}
                alt="Turn-key business solutions with complete setup"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="bg-accent/20 text-accent border border-accent/40 mb-3">
                  Ready to Operate
                </Badge>
                <h3 className="text-xl font-bold text-foreground mb-2 font-clash">Turn-Key Businesses</h3>
                <p className="text-sm text-muted-foreground mb-4">Complete operational infrastructure included</p>
                <Button asChild size="sm" className="group/btn">
                  <Link to="/businesses">
                    Browse Options
                    <ArrowRight className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Luxury Living */}
          <div 
            className={`group relative overflow-hidden rounded-3xl shadow-card hover:shadow-elegant transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '400ms' }}
          >
            <div className="relative h-[240px]">
              <img 
                src={businessGrowth}
                alt="Business growth and investment opportunities"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="bg-primary/20 text-primary-foreground border border-primary/40 mb-3">
                  Growth Analytics
                </Badge>
                <h3 className="text-xl font-bold text-foreground mb-2 font-clash">Market Insights</h3>
                <p className="text-sm text-muted-foreground mb-4">Real-time data and performance tracking</p>
                <Button asChild variant="outline" size="sm" className="group/btn border-foreground/20 hover:bg-card/50">
                  <Link to="/market-insights">
                    View Analytics
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
