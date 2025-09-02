import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, Brain, MapPin, DollarSign, Home, Bed, Bath } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AISearchResult {
  id: string;
  title: string;
  price: number;
  city: string;
  state: string;
  address: string;
  property_type: string;
  listing_type: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  images: any[];
  aiScore?: number;
  aiReasoning?: string;
}

interface SearchCriteria {
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
  features?: string[];
  listingType?: string;
}

const AIPropertySearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AISearchResult[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({});
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a search query.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-property-search', {
        body: {
          query: query.trim(),
          maxResults: 12
        }
      });

      if (error) throw error;

      setResults(data.properties || []);
      setSearchCriteria(data.searchCriteria || {});
      setTotalResults(data.totalResults || 0);

      toast({
        title: "Search Complete",
        description: `Found ${data.totalResults} properties matching your criteria.`,
      });
    } catch (error) {
      console.error('Error searching properties:', error);
      toast({
        title: "Search Error",
        description: "Failed to search properties. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
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

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Powered Property Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Try: 'Find me a 3 bedroom house in Miami under $500k with a pool' or 'Modern condo downtown for investment'"
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isLoading || !query.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {/* Search Tips */}
          <div className="mt-4 text-sm text-muted-foreground">
            <p><strong>Try natural language:</strong></p>
            <div className="grid md:grid-cols-2 gap-2 mt-2">
              <p>• "Family home near schools under $400k"</p>
              <p>• "Investment property with high rental yield"</p>
              <p>• "Luxury condo with ocean view"</p>
              <p>• "Fixer-upper house in growing neighborhood"</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Criteria Display */}
      {Object.keys(searchCriteria).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Parsed Search Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {searchCriteria.propertyType && (
                <Badge variant="secondary">
                  <Home className="h-3 w-3 mr-1" />
                  {searchCriteria.propertyType}
                </Badge>
              )}
              {searchCriteria.location && (
                <Badge variant="secondary">
                  <MapPin className="h-3 w-3 mr-1" />
                  {searchCriteria.location}
                </Badge>
              )}
              {searchCriteria.minPrice && (
                <Badge variant="secondary">
                  <DollarSign className="h-3 w-3 mr-1" />
                  Min: {formatPrice(searchCriteria.minPrice)}
                </Badge>
              )}
              {searchCriteria.maxPrice && (
                <Badge variant="secondary">
                  <DollarSign className="h-3 w-3 mr-1" />
                  Max: {formatPrice(searchCriteria.maxPrice)}
                </Badge>
              )}
              {searchCriteria.bedrooms && (
                <Badge variant="secondary">
                  <Bed className="h-3 w-3 mr-1" />
                  {searchCriteria.bedrooms}+ bed
                </Badge>
              )}
              {searchCriteria.bathrooms && (
                <Badge variant="secondary">
                  <Bath className="h-3 w-3 mr-1" />
                  {searchCriteria.bathrooms}+ bath
                </Badge>
              )}
              {searchCriteria.listingType && (
                <Badge variant="secondary">
                  For {searchCriteria.listingType}
                </Badge>
              )}
              {searchCriteria.features?.map((feature, index) => (
                <Badge key={index} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Search Results ({totalResults} found)</span>
              <Badge variant="outline">AI Ranked</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative overflow-hidden rounded-t-lg">
                    {property.images?.[0] ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Home className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    {property.aiScore && (
                      <Badge className="absolute top-2 right-2" variant="secondary">
                        AI Score: {property.aiScore}%
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2 mb-2">{property.title}</h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-foreground">
                          {formatPrice(property.price)}
                        </span>
                        <Badge variant="outline">{property.listing_type}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{property.city}, {property.state}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          <span>{property.bathrooms}</span>
                        </div>
                        {property.square_feet && (
                          <span>{property.square_feet.toLocaleString()} sq ft</span>
                        )}
                      </div>
                      
                      {property.aiReasoning && (
                        <div className="mt-3 p-2 bg-muted rounded-md">
                          <p className="text-xs">
                            <strong>AI Analysis:</strong> {property.aiReasoning}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {!isLoading && query && results.length === 0 && totalResults === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or using different keywords.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setQuery('');
                setResults([]);
                setSearchCriteria({});
                setTotalResults(0);
              }}
            >
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIPropertySearch;