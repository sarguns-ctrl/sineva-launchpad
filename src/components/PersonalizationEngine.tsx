import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Building2, MapPin, DollarSign, Zap } from 'lucide-react';

interface UserPreferences {
  investmentRange: [number, number];
  propertyTypes: string[];
  locations: string[];
  visaTypes: string[];
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

interface PersonalizedRecommendation {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  matchScore: number;
  reasons: string[];
}

const PersonalizationEngine = () => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { trackEvent, trackUserInteraction } = useAnalytics();

  // Check for existing user preferences
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    } else {
      // Show onboarding after a delay if no preferences
      setTimeout(() => setShowOnboarding(true), 3000);
    }
  }, []);

  // Generate recommendations based on preferences
  useEffect(() => {
    if (!userPreferences) return;

    const mockRecommendations: PersonalizedRecommendation[] = [
      {
        id: '1',
        title: 'Luxury Downtown Condo Complex',
        type: 'residential',
        location: 'Austin, TX',
        price: 2500000,
        matchScore: 95,
        reasons: ['Matches your investment range', 'High ROI potential', 'E-2 visa eligible']
      },
      {
        id: '2',
        title: 'Tech Startup Incubator',
        type: 'business',
        location: 'Houston, TX',
        price: 1800000,
        matchScore: 88,
        reasons: ['Growing market', 'Your preferred location', 'Moderate risk profile']
      },
      {
        id: '3',
        title: 'Commercial Office Building',
        type: 'commercial',
        location: 'Dallas, TX',
        price: 4200000,
        matchScore: 82,
        reasons: ['Stable rental income', 'Prime location', 'Conservative investment']
      }
    ];

    setRecommendations(mockRecommendations);
    trackEvent({
      name: 'personalized_recommendations_generated',
      properties: { 
        recommendation_count: mockRecommendations.length,
        avg_match_score: mockRecommendations.reduce((sum, rec) => sum + rec.matchScore, 0) / mockRecommendations.length
      }
    });
  }, [userPreferences, trackEvent]);

  const handleStartPersonalization = () => {
    setShowOnboarding(false);
    trackUserInteraction('personalization_started');
    // In a real app, this would open a comprehensive onboarding flow
    
    // Mock preferences for demo
    const mockPreferences: UserPreferences = {
      investmentRange: [1000000, 5000000],
      propertyTypes: ['commercial', 'residential'],
      locations: ['Austin', 'Houston', 'Dallas'],
      visaTypes: ['E-2', 'EB-5'],
      riskTolerance: 'moderate'
    };
    
    setUserPreferences(mockPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(mockPreferences));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (showOnboarding) {
    return (
      <Card className="bg-gradient-primary text-white border-0 shadow-elegant">
        <CardContent className="p-8 text-center">
          <Zap className="w-12 h-12 mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-bold mb-4">Get Personalized Recommendations</h3>
          <p className="text-white/90 mb-6 max-w-md mx-auto">
            Tell us about your investment goals and preferences to receive tailored property recommendations that match your criteria.
          </p>
          <Button 
            onClick={handleStartPersonalization}
            variant="secondary"
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            Personalize My Experience
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!userPreferences || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="bg-accent/15 text-accent mb-4">
            <Zap className="w-3 h-3 mr-1" />
            Personalized for You
          </Badge>
          <h2 className="text-4xl font-bold text-primary mb-4 font-clash">
            Recommended Properties
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your investment preferences and goals, here are properties that match your criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation, index) => (
            <Card 
              key={recommendation.id}
              className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-background/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge 
                    className="bg-accent/15 text-accent"
                  >
                    {recommendation.matchScore}% Match
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground capitalize">
                      {recommendation.type}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-primary group-hover:text-accent transition-colors mb-2">
                  {recommendation.title}
                </h3>

                <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{recommendation.location}</span>
                </div>

                <div className="text-2xl font-bold text-primary mb-4">
                  {formatPrice(recommendation.price)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-sm font-medium text-foreground">Why this matches:</div>
                  {recommendation.reasons.slice(0, 2).map((reason, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground flex items-center">
                      <div className="w-1 h-1 bg-accent rounded-full mr-2"></div>
                      {reason}
                    </div>
                  ))}
                </div>

                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => trackUserInteraction('personalized_property_clicked', recommendation.id)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => trackUserInteraction('view_all_personalized_clicked')}
          >
            View All Personalized Recommendations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PersonalizationEngine;