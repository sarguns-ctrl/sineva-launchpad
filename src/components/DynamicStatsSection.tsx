import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDynamicStats } from '@/hooks/useDynamicStats';
import { TrendingUp, Users, Building, Globe, Activity } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const DynamicStatsSection = () => {
  const { stats, isLoading, activityIndicators } = useDynamicStats();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  const getIcon = (statId: string) => {
    switch (statId) {
      case 'consultations':
        return <Users className="w-5 h-5 text-accent" />;
      case 'properties':
        return <Building className="w-5 h-5 text-accent" />;
      case 'investments':
        return <TrendingUp className="w-5 h-5 text-accent" />;
      case 'success':
        return <Activity className="w-5 h-5 text-accent" />;
      default:
        return <TrendingUp className="w-5 h-5 text-accent" />;
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="h-24 bg-muted/30 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Activity Banner */}
        <div 
          ref={elementRef}
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-accent">LIVE ACTIVITY</span>
            </div>
            <div className="text-center mt-2">
              <p className="text-sm text-muted-foreground">
                {Math.random() > 0.5 ? 'Sophie D.' : 'Michael R.'} completed EB-5 investment documentation
                <span className="mx-2">•</span>
                <span className="text-accent font-medium">${(1.2 + Math.random() * 0.8).toFixed(2)}M Investment Value</span>
                <span className="mx-2">•</span>
                <span className="text-xs">{Math.floor(Math.random() * 5) + 1} hours ago</span>
                <span className="mx-2">•</span>
                <span className="text-xs">{Math.random() > 0.5 ? 'Houston, TX' : 'Miami, FL'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Stats Grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '300ms' }}
        >
          {stats.map((stat, index) => (
            <Card 
              key={stat.id} 
              className="shadow-card hover:shadow-elegant transition-all duration-300 group hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  {getIcon(stat.id)}
                  <Badge 
                    variant={stat.changeType === 'positive' ? 'default' : 'secondary'}
                    className={`text-xs ${
                      stat.changeType === 'positive' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary group-hover:text-accent transition-colors">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Activity Indicators */}
        <div 
          className={`flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground transition-all duration-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '600ms' }}
        >
          {activityIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-xs">{indicator.icon}</span>
              <span>{indicator.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicStatsSection;