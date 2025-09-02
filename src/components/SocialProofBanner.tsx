import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TrendingUp, Users, MapPin, Clock, DollarSign, Award } from 'lucide-react';

interface RecentActivity {
  id: string;
  type: 'sale' | 'inquiry' | 'consultation' | 'investment';
  message: string;
  timestamp: string;
  location?: string;
  amount?: string;
  urgent?: boolean;
}

const recentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'sale',
    message: 'Maria R. just purchased a $2.8M office complex in Houston',
    timestamp: '12 minutes ago',
    location: 'Houston, TX',
    amount: '$2.8M',
    urgent: true
  },
  {
    id: '2',
    type: 'consultation',
    message: 'James C. scheduled an E-2 visa consultation',
    timestamp: '34 minutes ago',
    location: 'Austin, TX'
  },
  {
    id: '3',
    type: 'inquiry',
    message: '3 new investors from UAE inquired about Dallas properties',
    timestamp: '1 hour ago',
    location: 'Dallas, TX',
    urgent: true
  },
  {
    id: '4',
    type: 'investment',
    message: 'Sophie D. completed EB-5 investment documentation',
    timestamp: '2 hours ago',
    location: 'Houston, TX',
    amount: '$1.25M'
  },
  {
    id: '5',
    type: 'sale',
    message: 'Ahmed A. acquired manufacturing business for EB-5',
    timestamp: '4 hours ago',
    location: 'San Antonio, TX',
    amount: '$1.85M'
  }
];

const liveStats = [
  {
    icon: Users,
    label: 'Active Consultations Today',
    value: '47' as string | number,
    trend: '+12%'
  },
  {
    icon: TrendingUp,
    label: 'Properties Viewed This Week',
    value: '2341' as string | number,
    trend: '+24%'
  },
  {
    icon: DollarSign,
    label: 'Investments This Month',
    value: '$18.7M' as string | number,
    trend: '+31%'
  },
  {
    icon: Award,
    label: 'Success Rate',
    value: '98%' as string | number,
    trend: 'consistent'
  }
];

const SocialProofBanner = () => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [liveNumbers, setLiveNumbers] = useState(liveStats);
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.5 });

  // Rotate through recent activities
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivityIndex(prev => (prev + 1) % recentActivities.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Simulate live number updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveNumbers(prev => prev.map(stat => ({
        ...stat,
        value: typeof stat.value === 'string' && stat.value.includes('$') 
          ? stat.value // Keep monetary values as strings
          : typeof stat.value === 'string' && stat.value.includes('%')
          ? stat.value // Keep percentage values as strings  
          : typeof stat.value === 'number'
          ? stat.value + Math.floor(Math.random() * 3)
          : parseInt(stat.value.toString()) + Math.floor(Math.random() * 3)
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const currentActivity = recentActivities[currentActivityIndex];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale': return DollarSign;
      case 'inquiry': return Users;
      case 'consultation': return Clock;
      case 'investment': return TrendingUp;
      default: return Users;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'sale': return 'text-green-600 bg-green-100';
      case 'inquiry': return 'text-blue-600 bg-blue-100';
      case 'consultation': return 'text-purple-600 bg-purple-100';
      case 'investment': return 'text-accent bg-accent/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  return (
    <section 
      ref={elementRef}
      className="py-8 bg-gradient-to-r from-muted/20 to-background border-y border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Activity Ticker */}
        <div className={`mb-8 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge 
                    className={`${getActivityColor(currentActivity.type)} flex items-center space-x-2`}
                  >
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium uppercase">Live Activity</span>
                  </Badge>
                  
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const IconComponent = getActivityIcon(currentActivity.type);
                      return <IconComponent className="w-5 h-5 text-accent" />;
                    })()}
                    
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {currentActivity.message}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{currentActivity.timestamp}</span>
                        </span>
                        {currentActivity.location && (
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{currentActivity.location}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {currentActivity.amount && (
                  <div className="hidden sm:block text-right">
                    <div className="text-lg font-bold text-accent">
                      {currentActivity.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Investment Value
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Statistics Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          {liveNumbers.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={index}
                className="bg-card/60 backdrop-blur-sm border border-border/30 hover:shadow-sm transition-all duration-300 group"
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                    <IconComponent className="w-5 h-5 text-accent" />
                  </div>
                  
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-2">
                    {stat.label}
                  </div>
                  
                  {stat.trend !== 'consistent' && (
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-green-100 text-green-700"
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </Badge>
                  )}
                  
                  {stat.trend === 'consistent' && (
                    <Badge variant="secondary" className="text-xs">
                      Consistent
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className={`mt-6 text-center transition-all duration-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Real-time activity</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-accent" />
              <span>Licensed professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-accent" />
              <span>500+ successful investors</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>15+ markets served</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBanner;