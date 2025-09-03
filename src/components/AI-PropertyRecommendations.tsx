import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PropertyCard } from '@/components/PropertyCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, TrendingUp, Heart, MapPin, DollarSign, Home, Calculator, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  property_type: string;
  images: string[];
  created_at: string;
}

interface AIRecommendation {
  property: Property;
  score: number;
  reasons: string[];
  category: 'budget_match' | 'location_preference' | 'similar_views' | 'trending';
}

export const AIPropertyRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personalized');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadRecommendations();
    }
  }, [user]);

  const loadRecommendations = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get user preferences and viewing history
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Get user's saved properties for preference analysis
      const { data: savedProperties } = await supabase
        .from('property_favorites')
        .select('property_id')
        .eq('user_id', user.id);

      // Get all properties
      const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'active')
        .limit(20);

      if (error) throw error;

      // Generate AI recommendations based on user behavior
      const aiRecommendations = generateAIRecommendations(properties || [], profile, savedProperties || []);
      setRecommendations(aiRecommendations);

    } catch (error) {
      console.error('Error loading recommendations:', error);
      toast.error('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  const generateAIRecommendations = (
    properties: any[],
    profile: any,
    savedProperties: any[]
  ): AIRecommendation[] => {
    const recommendations: AIRecommendation[] = [];
    const savedPropertyIds = new Set(savedProperties.map(sp => sp.property_id));

    properties.forEach(property => {
      const score = calculateRecommendationScore(property, profile, savedProperties);
      const reasons = generateReasons(property, profile, score);
      const category = determineCategory(property, profile, score);

      recommendations.push({
        property: {
          id: property.id,
          title: property.title,
          price: property.price,
          location: `${property.city}, ${property.state}`,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          square_feet: property.square_feet,
          property_type: property.property_type,
          images: property.images || ['/placeholder.svg'],
          created_at: property.created_at
        },
        score,
        reasons,
        category
      });
    });

    return recommendations
      .filter(rec => !savedPropertyIds.has(rec.property.id))
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  };

  const calculateRecommendationScore = (property: any, profile: any, savedProperties: any[]): number => {
    let score = 0;

    // Price range matching
    if (profile?.budget_min && profile?.budget_max) {
      if (property.price >= profile.budget_min && property.price <= profile.budget_max) {
        score += 30;
      } else if (Math.abs(property.price - ((profile.budget_min + profile.budget_max) / 2)) < 50000) {
        score += 15;
      }
    }

    // Location preferences
    if (profile?.preferred_locations?.includes(property.city)) {
      score += 25;
    }

    // Property type preferences
    if (profile?.preferred_property_types?.includes(property.property_type)) {
      score += 20;
    }

    // Size preferences
    if (profile?.min_bedrooms && property.bedrooms >= profile.min_bedrooms) {
      score += 10;
    }

    // Trending properties (recently listed)
    const daysSinceListed = Math.floor((Date.now() - new Date(property.created_at).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceListed <= 7) {
      score += 15;
    }

    // Random factor for diversity
    score += Math.random() * 10;

    return Math.min(Math.max(score, 0), 100);
  };

  const generateReasons = (property: any, profile: any, score: number): string[] => {
    const reasons: string[] = [];

    if (score >= 70) {
      reasons.push('Excellent match for your preferences');
    } else if (score >= 50) {
      reasons.push('Good fit based on your search history');
    }

    if (property.price <= (profile?.budget_max || Infinity)) {
      reasons.push('Within your budget range');
    }

    if (property.bedrooms >= (profile?.min_bedrooms || 0)) {
      reasons.push('Meets your space requirements');
    }

    const daysSinceListed = Math.floor((Date.now() - new Date(property.created_at).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceListed <= 3) {
      reasons.push('Newly listed property');
    }

    if (property.property_type === 'house') {
      reasons.push('Popular property type');
    }

    return reasons.slice(0, 3);
  };

  const determineCategory = (property: any, profile: any, score: number): AIRecommendation['category'] => {
    if (score >= 80) return 'budget_match';
    if (score >= 60) return 'location_preference';
    
    const daysSinceListed = Math.floor((Date.now() - new Date(property.created_at).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceListed <= 7) return 'trending';
    
    return 'similar_views';
  };

  const getCategoryIcon = (category: AIRecommendation['category']) => {
    switch (category) {
      case 'budget_match': return <DollarSign className="h-4 w-4" />;
      case 'location_preference': return <MapPin className="h-4 w-4" />;
      case 'trending': return <TrendingUp className="h-4 w-4" />;
      case 'similar_views': return <Heart className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = (category: AIRecommendation['category']) => {
    switch (category) {
      case 'budget_match': return 'Budget Match';
      case 'location_preference': return 'Location Match';
      case 'trending': return 'Trending';
      case 'similar_views': return 'Similar to Liked';
    }
  };

  const getCategoryColor = (category: AIRecommendation['category']) => {
    switch (category) {
      case 'budget_match': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'location_preference': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'trending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'similar_views': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    }
  };

  const filterByCategory = (category: string) => {
    if (category === 'all') return recommendations;
    return recommendations.filter(rec => rec.category === category);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">AI-Powered Recommendations</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personalized">All</TabsTrigger>
          <TabsTrigger value="budget_match">Budget</TabsTrigger>
          <TabsTrigger value="location_preference">Location</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="similar_views">Similar</TabsTrigger>
        </TabsList>

        <TabsContent value="personalized" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 9).map((rec) => (
              <Card key={rec.property.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <PropertyCard property={rec.property} />
                  <div className="absolute top-2 left-2">
                    <Badge className={`${getCategoryColor(rec.category)} flex items-center gap-1`}>
                      {getCategoryIcon(rec.category)}
                      {getCategoryLabel(rec.category)}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {Math.round(rec.score)}%
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 pt-2">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Why we recommend this:</p>
                    <ul className="text-xs space-y-1">
                      {rec.reasons.map((reason, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full"></div>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {['budget_match', 'location_preference', 'trending', 'similar_views'].map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterByCategory(category).slice(0, 9).map((rec) => (
                <Card key={rec.property.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <PropertyCard property={rec.property} />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {Math.round(rec.score)}%
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4 pt-2">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">Why we recommend this:</p>
                      <ul className="text-xs space-y-1">
                        {rec.reasons.map((reason, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {recommendations.length === 0 && (
        <Card className="p-8 text-center">
          <CardContent>
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Recommendations Available</h3>
            <p className="text-muted-foreground mb-4">
              Complete your profile and save some properties to get personalized recommendations.
            </p>
            <Button onClick={() => window.location.href = '/properties'}>
              Browse Properties
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};