import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, TrendingUp, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface MarketLocation {
  id: string;
  country: string;
  city: string;
  flag: string;
  specialization: string;
  properties: number;
  specialists: number;
  avgPrice: string;
  growth: string;
  growthValue: number;
}

const MarketLocationCards = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const marketLocations: MarketLocation[] = [
    {
      id: '1',
      country: 'US',
      city: 'Miami, FL',
      flag: '🇺🇸',
      specialization: 'Business Immigration Hub',
      properties: 1200,
      specialists: 25,
      avgPrice: '$850K',
      growth: '+12%',
      growthValue: 12
    },
    {
      id: '2', 
      country: 'CA',
      city: 'Toronto, ON',
      flag: '🇨🇦',
      specialization: 'Startup Visa Program',
      properties: 800,
      specialists: 18,
      avgPrice: '$920K CAD',
      growth: '+15%',
      growthValue: 15
    },
    {
      id: '3',
      country: 'US',
      city: 'Austin, TX',
      flag: '🇺🇸',
      specialization: 'Tech Entrepreneur Hub',
      properties: 600,
      specialists: 22,
      avgPrice: '$650K',
      growth: '+18%',
      growthValue: 18
    },
    {
      id: '4',
      country: 'MX',
      city: 'Mexico City, MX',
      flag: '🇲🇽',
      specialization: 'USMCA Business Bridge',
      properties: 400,
      specialists: 15,
      avgPrice: '$380K',
      growth: '+22%',
      growthValue: 22
    },
    {
      id: '5',
      country: 'US',
      city: 'Los Angeles, CA',
      flag: '🇺🇸',
      specialization: 'EB-5 Investment Center',
      properties: 950,
      specialists: 28,
      avgPrice: '$1.2M',
      growth: '+8%',
      growthValue: 8
    },
    {
      id: '6',
      country: 'CA',
      city: 'Vancouver, BC',
      flag: '🇨🇦',
      specialization: 'Investor Immigration',
      properties: 500,
      specialists: 16,
      avgPrice: '$1.1M CAD',
      growth: '+10%',
      growthValue: 10
    }
  ];

  const getGrowthColor = (growth: number) => {
    if (growth >= 15) return 'text-green-600';
    if (growth >= 10) return 'text-green-500';
    return 'text-orange-500';
  };

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-accent/15 text-accent mb-4">
            <TrendingUp className="w-3 h-3 mr-1" />
            Live Market Data
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary font-clash mb-4">
            Investment Opportunities by Market
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore specialized business immigration programs across North America. 
            Real-time data for strategic investment decisions.
          </p>
        </div>

        {/* Market Location Grid */}
        <div 
          ref={elementRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          {marketLocations.map((location, index) => (
            <Card 
              key={location.id}
              className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-background/90 backdrop-blur-sm border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Header with Flag and Location */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{location.flag}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                          {location.country}
                        </span>
                        <h3 className="font-bold text-primary group-hover:text-accent transition-colors">
                          {location.city}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <TrendingUp className="h-4 w-4 text-accent" />
                </div>

                {/* Specialization Badge */}
                <div className="mb-4">
                  <Badge className="bg-accent/10 text-accent text-xs px-3 py-1.5 rounded-full border border-accent/20">
                    {location.specialization}
                  </Badge>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-bold text-primary">{location.properties.toLocaleString()}+</div>
                      <div className="text-xs text-muted-foreground">Properties</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-bold text-primary">{location.specialists}</div>
                      <div className="text-xs text-muted-foreground">Specialists</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <div className="text-left">
                    <div className="text-lg font-bold text-primary">{location.avgPrice}</div>
                    <div className="text-xs text-muted-foreground">Avg Price</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getGrowthColor(location.growthValue)}`}>
                      {location.growth}
                    </div>
                    <div className="text-xs text-muted-foreground">YoY Growth</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to explore investment opportunities in these markets?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium">
              View All Markets
            </button>
            <button className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketLocationCards;