import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Star, MapPin, Bed, Bath, Home, TrendingUp, Heart, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface PropertyRecommendation {
  id: string;
  property: {
    id: string;
    title: string;
    price: number;
    address: string;
    city: string;
    state: string;
    bedrooms?: number;
    bathrooms?: number;
    square_feet?: number;
    property_type: string;
    images: any[];
  };
  recommendation_score: number;
  recommendation_reasons: string[];
  algorithm_version: string;
  created_at: string;
}

interface UserPreferences {
  maxBudget?: number;
  preferredBedrooms?: number;
  preferredBathrooms?: number;
  preferredPropertyTypes?: string[];
  preferredLocations?: string[];
  searchHistory?: any[];
  favoriteProperties?: any[];
}

export const AIPropertyRecommendations: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [recommendations, setRecommendations] = useState<PropertyRecommendation[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({});
  const [loading, setLoading] = useState(true);
  const [generatingRecommendations, setGeneratingRecommendations] = useState(false);

  useEffect(() => {
    if (user) {
      loadRecommendations();
      analyzeUserPreferences();
    }
  }, [user]);

  const loadRecommendations = async () => {
    try {
      // Mock recommendations since we're building the system
      const mockRecommendations: PropertyRecommendation[] = [
        {
          id: '1',
          property: {
            id: 'prop1',
            title: 'Modern Downtown Condo',
            price: 485000,
            address: '123 Main Street',
            city: 'Downtown',
            state: 'CA',
            bedrooms: 2,
            bathrooms: 2,
            square_feet: 1200,
            property_type: 'residential',
            images: []
          },
          recommendation_score: 0.92,
          recommendation_reasons: [
            'Matches your budget range ($400k-$500k)',
            'Located in your preferred area (Downtown)',
            'Similar to properties you\'ve viewed recently',
            'Good investment potential based on market trends'
          ],
          algorithm_version: '2.1',
          created_at: '2024-01-18T10:00:00Z'
        },
        {
          id: '2',
          property: {
            id: 'prop2',
            title: 'Family Home in Suburbs',
            price: 425000,
            address: '456 Oak Avenue',
            city: 'Suburbia',
            state: 'CA',
            bedrooms: 3,
            bathrooms: 2.5,
            square_feet: 1800,
            property_type: 'residential',
            images: []
          },
          recommendation_score: 0.87,
          recommendation_reasons: [
            'Matches your preferred bedroom count (3BR)',
            'Great for families with excellent school ratings',
            'Similar price range to your saved searches',
            'Low crime area based on your safety preferences'
          ],
          algorithm_version: '2.1',
          created_at: '2024-01-18T10:00:00Z'
        },
        {
          id: '3',
          property: {
            id: 'prop3',
            title: 'Luxury Townhouse',
            price: 520000,
            address: '789 Pine Street',
            city: 'Uptown',
            state: 'CA',
            bedrooms: 3,
            bathrooms: 3,
            square_feet: 2100,
            property_type: 'residential',
            images: []
          },
          recommendation_score: 0.81,
          recommendation_reasons: [
            'Premium features matching your luxury searches',
            'High appreciation potential in this neighborhood',
            'Modern amenities you\'ve shown interest in',
            'Close to your work location preferences'
          ],
          algorithm_version: '2.1',
          created_at: '2024-01-18T10:00:00Z'
        }
      ];
      
      setRecommendations(mockRecommendations);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load recommendations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzeUserPreferences = async () => {
    try {
      // Mock user preferences analysis
      const mockPreferences: UserPreferences = {
        maxBudget: 500000,
        preferredBedrooms: 3,
        preferredBathrooms: 2,
        preferredPropertyTypes: ['residential'],
        preferredLocations: ['Downtown', 'Suburbia'],
        searchHistory: [
          { query: 'modern condo downtown', date: '2024-01-15' },
          { query: '3 bedroom family home', date: '2024-01-14' },
          { query: 'luxury townhouse', date: '2024-01-13' }
        ],
        favoriteProperties: [
          { title: 'Waterfront Condo', price: 475000 },
          { title: 'Garden Villa', price: 450000 }
        ]
      };
      
      setUserPreferences(mockPreferences);
    } catch (error: any) {
      console.error('Failed to analyze user preferences:', error);
    }
  };

  const generateNewRecommendations = async () => {
    setGeneratingRecommendations(true);
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Success",
        description: "New recommendations generated based on your latest activity"
      });
      
      // Reload recommendations
      loadRecommendations();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to generate new recommendations",
        variant: "destructive"
      });
    } finally {
      setGeneratingRecommendations(false);
    }
  };

  const addToFavorites = async (propertyId: string) => {
    try {
      // In a real implementation, this would save to user_favorites table
      toast({
        title: "Success",
        description: "Property added to favorites"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add to favorites",
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600';
    if (score >= 0.8) return 'text-blue-600';
    if (score >= 0.7) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading AI recommendations...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8" />
            AI Property Recommendations
          </h1>
          <p className="text-muted-foreground">Personalized property suggestions powered by machine learning</p>
        </div>
        
        <Button 
          onClick={generateNewRecommendations} 
          disabled={generatingRecommendations}
        >
          <Brain className="h-4 w-4 mr-2" />
          {generatingRecommendations ? 'Generating...' : 'Refresh Recommendations'}
        </Button>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="preferences">Your Preferences</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations">
          {/* Recommendation Score Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recommendation Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {recommendations.filter(r => r.recommendation_score >= 0.9).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Excellent Matches (90%+)</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {recommendations.filter(r => r.recommendation_score >= 0.8 && r.recommendation_score < 0.9).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Good Matches (80-89%)</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {(recommendations.reduce((sum, r) => sum + r.recommendation_score, 0) / recommendations.length * 100).toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Average Match Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Recommendations */}
          <div className="space-y-6">
            {recommendations.map((recommendation) => (
              <Card key={recommendation.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Property Image */}
                    <div className="w-80 h-64 bg-muted flex items-center justify-center">
                      <Home className="h-16 w-16 text-muted-foreground" />
                    </div>
                    
                    {/* Property Details */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{recommendation.property.title}</h3>
                            <div className="flex items-center gap-1">
                              <Star className={`h-4 w-4 ${getScoreColor(recommendation.recommendation_score)}`} />
                              <span className={`font-semibold ${getScoreColor(recommendation.recommendation_score)}`}>
                                {(recommendation.recommendation_score * 100).toFixed(0)}% Match
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-2xl font-bold text-primary mb-2">
                            {formatPrice(recommendation.property.price)}
                          </p>
                          
                          <div className="flex items-center text-muted-foreground mb-4">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{recommendation.property.address}, {recommendation.property.city}, {recommendation.property.state}</span>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                            {recommendation.property.bedrooms && (
                              <div className="flex items-center">
                                <Bed className="h-4 w-4 mr-1" />
                                {recommendation.property.bedrooms} bed
                              </div>
                            )}
                            {recommendation.property.bathrooms && (
                              <div className="flex items-center">
                                <Bath className="h-4 w-4 mr-1" />
                                {recommendation.property.bathrooms} bath
                              </div>
                            )}
                            {recommendation.property.square_feet && (
                              <div className="flex items-center">
                                <Home className="h-4 w-4 mr-1" />
                                {recommendation.property.square_feet.toLocaleString()} sqft
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button size="sm" onClick={() => navigate(`/property/${recommendation.property.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => addToFavorites(recommendation.property.id)}>
                            <Heart className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      </div>
                      
                      {/* AI Recommendation Reasons */}
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Why we recommended this property:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {recommendation.recommendation_reasons.map((reason, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {recommendations.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No recommendations yet</h3>
                <p className="text-muted-foreground mb-6">
                  Browse some properties and save your favorites to help our AI learn your preferences
                </p>
                <Button onClick={() => navigate('/search')}>
                  Start Browsing Properties
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preferences">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Analyzed Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Your Preferences (AI Analysis)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Budget Range</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on your searches: Up to {formatPrice(userPreferences.maxBudget || 0)}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Property Preferences</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Bedrooms: {userPreferences.preferredBedrooms}+ preferred</p>
                    <p>Bathrooms: {userPreferences.preferredBathrooms}+ preferred</p>
                    <p>Type: {userPreferences.preferredPropertyTypes?.join(', ')}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Location Preferences</h4>
                  <div className="flex flex-wrap gap-2">
                    {userPreferences.preferredLocations?.map((location, index) => (
                      <Badge key={index} variant="secondary">{location}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Search Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userPreferences.searchHistory?.map((search, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{search.query}</span>
                      <span className="text-xs text-muted-foreground">{search.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Favorite Properties Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Favorite Properties Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userPreferences.favoriteProperties?.map((property, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{property.title}</span>
                      <span className="text-sm font-semibold">{formatPrice(property.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>AI Insight:</strong> Your favorites show a preference for properties in the $450k-$500k range with modern amenities.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recommendation Accuracy */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendation Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Match Accuracy</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>User Satisfaction</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on your interactions and feedback on previous recommendations
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Trends in Your Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Downtown</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +5.2%
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Suburbia</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +3.8%
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Uptown</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +4.1%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-1">High Growth Potential</h4>
                    <p className="text-sm text-green-700">
                      Properties in Downtown area showing 15% higher appreciation than market average
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-1">Rental Income</h4>
                    <p className="text-sm text-blue-700">
                      Condos in your price range averaging $2,800/month rental income
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};