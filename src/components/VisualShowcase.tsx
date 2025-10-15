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
      className="relative py-32 bg-gradient-to-b from-secondary/40 via-background to-muted/30 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-accent/[0.07] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-primary/[0.05] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '9s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <Badge className="bg-accent/10 text-accent px-6 py-2.5 text-sm font-semibold border border-accent/30 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            Curated Collection
          </Badge>
          
          <h2 className="text-5xl md:text-7xl font-bold text-foreground font-clash mb-6 leading-tight">
            Premium Investment
            <br />
            <span className="mt-2 inline-block bg-gradient-accent bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover exceptional properties & businesses across North America's most prestigious markets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Large Featured Image */}
          <div 
            className={`lg:row-span-2 group relative overflow-hidden rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-700 border border-border/40 hover:border-accent/30 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <div className="relative h-full min-h-[500px]">
              <img 
                src={officeBuildingModern}
                alt="Modern premium office building for commercial investments"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/98 via-card/50 to-transparent" />
              
              {/* Floating stats badge */}
              <div className="absolute top-6 right-6">
                <div className="bg-background/95 backdrop-blur-xl border border-border/60 rounded-2xl px-5 py-3 shadow-card">
                  <div className="text-sm text-muted-foreground font-medium">Starting at</div>
                  <div className="text-2xl font-bold text-accent font-clash">$2.5M</div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl p-8 shadow-elegant">
                  <Badge className="bg-accent text-accent-foreground mb-4 border-0 px-4 py-1.5 font-semibold shadow-accent">
                    Featured Investment
                  </Badge>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-clash leading-tight">
                    Premium Business Districts
                  </h3>
                  <p className="text-muted-foreground mb-7 text-lg leading-relaxed">
                    High-growth commercial opportunities in top metropolitan markets
                  </p>
                  <Button asChild size="lg" className="group/btn shadow-accent hover:shadow-glow">
                    <Link to="/businesses">
                      Explore Investment Options
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Turn-Key Business */}
          <div 
            className={`group relative overflow-hidden rounded-2xl shadow-card hover:shadow-elegant transition-all duration-700 border border-border/40 hover:border-accent/30 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="relative h-[240px]">
              <img 
                src={teamMeetingRoom}
                alt="Turn-key business solutions with complete setup"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/98 via-card/65 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="bg-accent/15 text-accent border border-accent/30 mb-3 font-semibold shadow-sm">
                  Ready to Operate
                </Badge>
                <h3 className="text-xl font-bold text-foreground mb-2 font-clash">Turn-Key Businesses</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Complete operational infrastructure included</p>
                <Button asChild size="sm" className="group/btn shadow-sm hover:shadow-accent">
                  <Link to="/businesses">
                    Browse Options
                    <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Market Insights */}
          <div 
            className={`group relative overflow-hidden rounded-2xl shadow-card hover:shadow-elegant transition-all duration-700 border border-border/40 hover:border-primary/30 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '400ms' }}
          >
            <div className="relative h-[240px]">
              <img 
                src={businessGrowth}
                alt="Business growth and investment opportunities"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/98 via-card/65 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="bg-primary/15 text-primary-foreground border border-primary/30 mb-3 font-semibold shadow-sm">
                  Growth Analytics
                </Badge>
                <h3 className="text-xl font-bold text-foreground mb-2 font-clash">Market Insights</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Real-time data and performance tracking</p>
                <Button asChild variant="outline" size="sm" className="group/btn border-border/60 hover:bg-accent/5 hover:border-accent/40 hover:text-accent shadow-sm">
                  <Link to="/market-insights">
                    View Analytics
                    <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
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
