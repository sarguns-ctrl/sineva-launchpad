import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Building, Users, Globe } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MarketStatsSection = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  const marketData = [
    {
      city: 'Miami, FL',
      properties: '1,200+',
      agents: '25',
      avgPrice: '$850K',
      growth: '+12%',
      flag: '🇺🇸',
      speciality: 'Business Immigration Hub'
    },
    {
      city: 'Toronto, ON',
      properties: '800+',
      agents: '18',
      avgPrice: '$920K CAD',
      growth: '+15%',
      flag: '🇨🇦',
      speciality: 'Startup Visa Program'
    },
    {
      city: 'Austin, TX',
      properties: '600+',
      agents: '22',
      avgPrice: '$650K',
      growth: '+18%',
      flag: '🇺🇸',
      speciality: 'Tech Entrepreneur Hub'
    },
    {
      city: 'Mexico City, MX',
      properties: '400+',
      agents: '15',
      avgPrice: '$380K',
      growth: '+22%',
      flag: '🇲🇽',
      speciality: 'USMCA Business Bridge'
    },
    {
      city: 'Los Angeles, CA',
      properties: '950+',
      agents: '28',
      avgPrice: '$1.2M',
      growth: '+8%',
      flag: '🇺🇸',
      speciality: 'EB-5 Investment Center'
    },
    {
      city: 'Vancouver, BC',
      properties: '500+',
      agents: '16',
      avgPrice: '$1.1M CAD',
      growth: '+10%',
      flag: '🇨🇦',
      speciality: 'Investor Immigration'
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={elementRef}
          className={`text-center space-y-4 mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
            What's Happening in Your Target Markets
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time market data for entrepreneurs and investors looking to expand their business 
            and establish residence in key international markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketData.map((market, index) => (
            <Card 
              key={index} 
              className="shadow-card hover:shadow-elegant transition-all duration-300 group hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{market.flag}</span>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {market.city}
                    </h3>
                  </div>
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-accent font-medium bg-accent/10 px-3 py-1 rounded-full text-center">
                    {market.speciality}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-semibold text-foreground">{market.properties}</div>
                        <div className="text-muted-foreground text-xs">Properties</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-semibold text-foreground">{market.agents}</div>
                        <div className="text-muted-foreground text-xs">Specialists</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">{market.avgPrice}</div>
                      <div className="text-xs text-muted-foreground">Avg Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">{market.growth}</div>
                      <div className="text-xs text-muted-foreground">YoY Growth</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats Summary */}
        <div className="mt-16 bg-gradient-primary rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-white/80">Business Properties Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-white/80">Immigration Specialists</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25</div>
              <div className="text-white/80">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$2.5B+</div>
              <div className="text-white/80">Transactions Completed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketStatsSection;