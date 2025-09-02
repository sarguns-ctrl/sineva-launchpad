import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAnalytics } from '@/hooks/useAnalytics';
import { TrendingUp, Users, Target, Zap, ArrowRight, Star } from 'lucide-react';

interface ConversionFunnel {
  stage: string;
  users: number;
  conversionRate: number;
  dropoffReasons: string[];
}

interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  conversionRate: number;
  isActive: boolean;
  participants: number;
}

const ConversionOptimizer = () => {
  const [funnelData, setFunnelData] = useState<ConversionFunnel[]>([]);
  const [activeTests, setActiveTests] = useState<ABTestVariant[]>([]);
  const [showOptimizations, setShowOptimizations] = useState(false);
  const { trackEvent, trackConversion } = useAnalytics();

  // Initialize funnel data
  useEffect(() => {
    const mockFunnelData: ConversionFunnel[] = [
      {
        stage: 'Page Visit',
        users: 10000,
        conversionRate: 100,
        dropoffReasons: []
      },
      {
        stage: 'Property Search',
        users: 6500,
        conversionRate: 65,
        dropoffReasons: ['Slow loading', 'Complex interface', 'Limited filters']
      },
      {
        stage: 'Property View',
        users: 3200,
        conversionRate: 32,
        dropoffReasons: ['Insufficient details', 'Poor images', 'Missing pricing']
      },
      {
        stage: 'Lead Form',
        users: 800,
        conversionRate: 8,
        dropoffReasons: ['Too many fields', 'No trust indicators', 'Unclear value prop']
      },
      {
        stage: 'Consultation',
        users: 240,
        conversionRate: 2.4,
        dropoffReasons: ['Scheduling issues', 'No immediate response', 'Qualification concerns']
      },
      {
        stage: 'Investment',
        users: 48,
        conversionRate: 0.48,
        dropoffReasons: ['Financing challenges', 'Visa concerns', 'Market uncertainty']
      }
    ];

    const mockABTests: ABTestVariant[] = [
      {
        id: 'hero-cta-test',
        name: 'Hero CTA Button',
        description: 'Testing "Browse Properties" vs "Start Investment Journey"',
        conversionRate: 23.5,
        isActive: true,
        participants: 2500
      },
      {
        id: 'form-fields-test',
        name: 'Lead Form Optimization',
        description: 'Reduced form fields from 8 to 4',
        conversionRate: 34.2,
        isActive: true,
        participants: 1800
      },
      {
        id: 'social-proof-test',
        name: 'Social Proof Placement',
        description: 'Testing testimonials above vs below hero section',
        conversionRate: 18.7,
        isActive: false,
        participants: 3200
      }
    ];

    setFunnelData(mockFunnelData);
    setActiveTests(mockABTests);
  }, []);

  // Show optimizations after user interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOptimizations(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleOptimizationClick = (optimization: string) => {
    trackConversion('optimization_applied', 1);
    trackEvent({
      name: 'conversion_optimization_interaction',
      properties: {
        optimization_type: optimization,
        current_conversion_rate: funnelData[funnelData.length - 1]?.conversionRate || 0
      }
    });
  };

  const getStageColor = (conversionRate: number) => {
    if (conversionRate >= 50) return 'text-green-600';
    if (conversionRate >= 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'Page Visit': return Users;
      case 'Property Search': return Target;
      case 'Property View': return TrendingUp;
      case 'Lead Form': return Star;
      case 'Consultation': return Zap;
      case 'Investment': return TrendingUp;
      default: return Target;
    }
  };

  if (!showOptimizations) {
    return null;
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary mb-4">
            <TrendingUp className="w-3 h-3 mr-1" />
            Conversion Analytics
          </Badge>
          <h2 className="text-4xl font-bold text-primary mb-4 font-clash">
            Optimizing Your Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time conversion optimization ensures you get the best possible experience while we maximize successful investments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Conversion Funnel */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-primary mb-6">Investment Journey Funnel</h3>
              <div className="space-y-4">
                {funnelData.map((stage, index) => {
                  const IconComponent = getStageIcon(stage.stage);
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{stage.stage}</div>
                          <div className="text-sm text-muted-foreground">
                            {stage.users.toLocaleString()} users
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getStageColor(stage.conversionRate)}`}>
                          {stage.conversionRate}%
                        </div>
                        {index > 0 && (
                          <div className="text-xs text-muted-foreground">
                            -{((funnelData[index-1].users - stage.users) / funnelData[index-1].users * 100).toFixed(1)}% drop
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* A/B Tests */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-primary mb-6">Active Optimizations</h3>
              <div className="space-y-4">
                {activeTests.map((test) => (
                  <div key={test.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{test.name}</h4>
                      <Badge variant={test.isActive ? "default" : "secondary"}>
                        {test.isActive ? 'Active' : 'Completed'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {test.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Conversion: </span>
                        <span className="font-medium text-accent">{test.conversionRate}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Participants: </span>
                        <span className="font-medium">{test.participants.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Optimization Actions */}
        <Card className="bg-gradient-primary text-white border-0 shadow-elegant">
          <CardContent className="p-8">
            <div className="text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-4">Continuous Optimization Active</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                We're constantly testing and improving your experience. Our current optimizations have increased conversion rates by 34% this month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => handleOptimizationClick('personalization')}
                >
                  Enable Personalization
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => handleOptimizationClick('priority_support')}
                >
                  Get Priority Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ConversionOptimizer;