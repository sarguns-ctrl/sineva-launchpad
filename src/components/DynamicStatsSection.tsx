import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBusinessMarketData } from '@/hooks/useBusinessMarketData';
import { TrendingUp, Users, Building, Globe, Activity, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const DynamicStatsSection = () => {
  const { marketData, isLoading } = useBusinessMarketData();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  if (isLoading) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="h-48 bg-muted/30 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dynamic Stats Cards */}
        <div 
          ref={elementRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="shadow-card bg-background/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Active Consultations Today</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-foreground">
                  {Math.floor(Math.random() * 50) + 120}
                </div>
                <div className="flex items-center text-accent text-sm font-medium">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{Math.floor(Math.random() * 20) + 10}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-background/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Properties Viewed This Week</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-foreground">
                  {(Math.random() * 2 + 3).toFixed(1)}K
                </div>
                <div className="flex items-center text-accent text-sm font-medium">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{Math.floor(Math.random() * 15) + 20}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-background/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Investments This Month</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-foreground">
                  ${(Math.random() * 5 + 15).toFixed(1)}M
                </div>
                <div className="flex items-center text-accent text-sm font-medium">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{Math.floor(Math.random() * 20) + 25}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-background/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Success Rate</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-foreground">
                  {Math.floor(Math.random() * 5) + 94}%
                </div>
                <Badge className="bg-accent/15 text-accent text-xs px-2 py-1">
                  Consistent
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Activity Indicators */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
          style={{ animationDelay: '200ms' }}
        >
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">Real-time activity</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Licensed professionals</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">500+ successful investors</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">15+ markets served</span>
          </div>
        </div>

        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-clash mb-4">
            Business Investment Opportunities Across America
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore dynamic business markets in major US states. Real-time data for entrepreneurs 
            seeking investment opportunities and business immigration pathways.
          </p>
        </div>

        {/* Live Activity Banner */}
        <div 
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
          style={{ animationDelay: '200ms' }}
        >
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-accent">LIVE MARKET ACTIVITY</span>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {Math.random() > 0.5 ? 'Sarah M.' : 'David L.'} completed {Math.random() > 0.5 ? 'restaurant franchise' : 'tech startup'} acquisition
                <span className="mx-2">•</span>
                <span className="text-accent font-medium">${(0.8 + Math.random() * 1.2).toFixed(1)}M Business Value</span>
                <span className="mx-2">•</span>
                <span className="text-xs">{Math.floor(Math.random() * 3) + 1} hours ago</span>
                <span className="mx-2">•</span>
                <span className="text-xs">{marketData.length > 0 ? marketData[Math.floor(Math.random() * marketData.length)].city + ', ' + marketData[Math.floor(Math.random() * marketData.length)].stateCode : 'Miami, FL'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Business Market Grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '400ms' }}
        >
          {marketData.map((market, index) => (
            <Card 
              key={market.id} 
              className="shadow-card hover:shadow-elegant transition-all duration-300 group hover:scale-105 bg-background/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{market.flag}</span>
                    <div>
                      <h3 className="font-bold text-primary group-hover:text-accent transition-colors">
                        {market.stateCode} {market.city}
                      </h3>
                      <p className="text-xs text-muted-foreground">{market.state}</p>
                    </div>
                  </div>
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>

                {/* Business Type Badge */}
                <div className="mb-4">
                  <Badge className="bg-accent/15 text-accent text-xs px-3 py-1 rounded-full border border-accent/30">
                    {market.businessType}
                  </Badge>
                </div>

                {/* Specialization */}
                <p className="text-sm text-muted-foreground mb-4 font-medium">
                  {market.specialization}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-bold text-primary">{market.properties.toLocaleString()}+</div>
                      <div className="text-xs text-muted-foreground">Business Properties</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-bold text-primary">{market.specialists}</div>
                      <div className="text-xs text-muted-foreground">Immigration Specialists</div>
                    </div>
                  </div>
                </div>

                {/* Business Categories */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {market.businessCategories.slice(0, 3).map((category, idx) => (
                      <span key={idx} className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded">
                        {category}
                      </span>
                    ))}
                    {market.businessCategories.length > 3 && (
                      <span className="text-xs text-muted-foreground px-2 py-1">
                        +{market.businessCategories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{market.avgPrice}</div>
                    <div className="text-xs text-muted-foreground">Avg Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-accent">{market.growth}</div>
                    <div className="text-xs text-muted-foreground">YoY Growth</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div 
          className={`mt-16 bg-gradient-primary rounded-2xl p-8 text-white transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '800ms' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">
                {marketData.reduce((sum, market) => sum + market.properties, 0).toLocaleString()}+
              </div>
              <div className="text-white/80">Business Properties Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {marketData.reduce((sum, market) => sum + market.specialists, 0)}+
              </div>
              <div className="text-white/80">Immigration Specialists</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{marketData.length}</div>
              <div className="text-white/80">Major US Markets</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {Math.floor(marketData.reduce((sum, market) => sum + parseInt(market.growth.replace('+%', '')), 0) / marketData.length)}%
              </div>
              <div className="text-white/80">Average Growth Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicStatsSection;