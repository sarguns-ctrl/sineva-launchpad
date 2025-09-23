import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Bed, Bath, Square, DollarSign, Zap, Heart, Eye, Share2, Calendar, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProperties, type Property } from '@/hooks/useProperties';
import { useToast } from '@/hooks/use-toast';

interface EnhancedSearchFilters {
  search: string;
  priceRange: number[];
  propertyType: string;
  listingType: string;
  bedrooms: string;
  bathrooms: string;
  sizeRange: number[];
  location: string;
  features: string[];
  visaEligible: string;
  sortBy: string;
  viewType: 'grid' | 'list' | 'map';
}

interface PropertySuggestion {
  id: string;
  text: string;
  type: 'location' | 'property' | 'feature';
  icon: React.ComponentType<any>;
}

export const EnhancedPropertySearch: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [savedSearches, setSavedSearches] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<EnhancedSearchFilters>({
    search: '',
    priceRange: [100000, 5000000],
    propertyType: '',
    listingType: '',
    bedrooms: '',
    bathrooms: '',
    sizeRange: [500, 10000],
    location: '',
    features: [],
    visaEligible: '',
    sortBy: 'relevance',
    viewType: 'grid'
  });

  const [suggestions, setSuggestions] = useState<PropertySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { properties, loading } = useProperties({
    propertyType: filters.propertyType,
    listingType: filters.listingType,
    search: filters.search,
    priceRange: filters.priceRange,
    sizeRange: filters.sizeRange,
    bedrooms: filters.bedrooms && filters.bedrooms !== 'any' ? parseInt(filters.bedrooms) : undefined,
    bathrooms: filters.bathrooms && filters.bathrooms !== 'any' ? parseFloat(filters.bathrooms) : undefined,
    sortBy: filters.sortBy,
    featured: filters.sortBy === 'featured' ? true : undefined
  });

  // AI-powered search suggestions
  const generateSuggestions = (searchTerm: string) => {
    if (searchTerm.length < 2) return [];
    
    const mockSuggestions: PropertySuggestion[] = [
      { id: '1', text: 'Houston Downtown', type: 'location', icon: MapPin },
      { id: '2', text: 'Luxury Condos', type: 'property', icon: Square },
      { id: '3', text: 'Pool & Spa', type: 'feature', icon: Zap },
      { id: '4', text: 'Austin Tech District', type: 'location', icon: MapPin },
      { id: '5', text: 'Commercial Office', type: 'property', icon: Square },
      { id: '6', text: 'Parking Included', type: 'feature', icon: Zap }
    ];

    return mockSuggestions.filter(s => 
      s.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    if (filters.search) {
      const newSuggestions = generateSuggestions(filters.search);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [filters.search]);

  // Enhanced filtering with multiple criteria
  const filteredProperties = useMemo(() => {
    // Since filtering is now handled by the hook, we just return all properties
    return properties;
  }, [properties]);

  // Sort properties - since sorting is handled by the hook, we return filtered properties
  const sortedProperties = useMemo(() => {
    return filteredProperties;
  }, [filteredProperties]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
    toast({
      title: favorites.includes(propertyId) ? "Removed from favorites" : "Added to favorites",
      description: "Property has been updated in your favorites list"
    });
  };

  const saveCurrentSearch = () => {
    const searchData = {
      id: Date.now().toString(),
      name: filters.search || `Search ${savedSearches.length + 1}`,
      filters,
      resultsCount: sortedProperties.length,
      createdAt: new Date().toISOString()
    };
    
    setSavedSearches(prev => [...prev, searchData]);
    toast({
      title: "Search Saved",
      description: "You'll receive notifications when new properties match your criteria"
    });
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Search Header */}
      <Card className="border-0 shadow-elegant bg-gradient-to-r from-card to-card/80 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Search className="h-4 w-4 text-white" />
              </div>
              Smart Property Search
              <Badge className="bg-accent/20 text-accent border-accent/30">
                AI-Powered
              </Badge>
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={saveCurrentSearch}
                disabled={sortedProperties.length === 0}
              >
                <Heart className="h-4 w-4 mr-2" />
                Save Search
              </Button>
              
              <Tabs value={filters.viewType} onValueChange={(value: any) => setFilters(prev => ({ ...prev, viewType: value }))}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Smart Search Input */}
          <div className="relative">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Try 'Houston luxury condos with pool' or 'E-2 visa eligible businesses'..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-12 h-14 text-base bg-muted/30 border-0 focus:bg-background transition-all"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Badge variant="secondary" className="text-xs">
                    {sortedProperties.length} found
                  </Badge>
                </div>
              </div>
              
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ? "default" : "outline"}
                size="lg"
                className="h-14 px-6"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced {showFilters ? "✓" : ""}
              </Button>
            </div>

            {/* AI Suggestions */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 z-50 mt-2"
                >
                  <Card className="shadow-elegant border-0">
                    <CardContent className="p-2">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => {
                            setFilters(prev => ({ ...prev, search: suggestion.text }));
                            setShowSuggestions(false);
                          }}
                          className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          <suggestion.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{suggestion.text}</span>
                          <Badge variant="outline" className="text-xs ml-auto">
                            {suggestion.type}
                          </Badge>
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Under $1M', action: () => setFilters(prev => ({ ...prev, priceRange: [0, 1000000] })) },
              { label: '$1M - $3M', action: () => setFilters(prev => ({ ...prev, priceRange: [1000000, 3000000] })) },
              { label: 'Luxury ($3M+)', action: () => setFilters(prev => ({ ...prev, priceRange: [3000000, 50000000] })) },
              { label: 'E-2 Eligible', action: () => setFilters(prev => ({ ...prev, visaEligible: 'E-2' })) },
              { label: 'EB-5 Eligible', action: () => setFilters(prev => ({ ...prev, visaEligible: 'EB-5' })) },
              { label: 'Featured Only', action: () => setFilters(prev => ({ ...prev, sortBy: 'featured' })) }
            ].map((filter, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={filter.action}
                className="text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="border-t border-border/50 pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Price Range</label>
                  <div className="px-4 py-3 bg-muted/30 rounded-lg">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                      max={10000000}
                      min={50000}
                      step={50000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>{formatPrice(filters.priceRange[0])}</span>
                      <span>{formatPrice(filters.priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Property Type</label>
                  <Select value={filters.propertyType} onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
                    <SelectTrigger className="bg-muted/30 border-0">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Bedrooms</label>
                  <Select value={filters.bedrooms} onValueChange={(value) => setFilters(prev => ({ ...prev, bedrooms: value }))}>
                    <SelectTrigger className="bg-muted/30 border-0">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="1">1+ Beds</SelectItem>
                      <SelectItem value="2">2+ Beds</SelectItem>
                      <SelectItem value="3">3+ Beds</SelectItem>
                      <SelectItem value="4">4+ Beds</SelectItem>
                      <SelectItem value="5">5+ Beds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                    <SelectTrigger className="bg-muted/30 border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Most Relevant</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="featured">Featured First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            {sortedProperties.length} Properties Found
          </h2>
          {filters.search && (
            <Badge variant="secondary">
              for "{filters.search}"
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Tour
          </Button>
        </div>
      </div>

      {/* Properties Grid/List */}
      <Tabs value={filters.viewType} className="w-full">
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <div className="text-muted-foreground">Loading properties...</div>
              </div>
            ) : sortedProperties.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-muted-foreground">No properties found matching your criteria.</div>
              </div>
            ) : (
              sortedProperties.map((property, index) => (
                <Card key={property.id} className="group hover:shadow-elegant transition-all duration-500 border-0 shadow-card overflow-hidden cursor-pointer">
                  {/* Property Image */}
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                    
                    {/* Property badges */}
                    <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                      {property.is_featured && (
                        <Badge className="bg-accent text-accent-foreground font-medium">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                        {property.status}
                      </Badge>
                    </div>

                    {/* Action buttons */}
                    <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleFavorite(property.id)}
                        className="w-8 h-8 p-0 bg-background/90 backdrop-blur-sm"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(property.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-3 left-3 z-20">
                      <Badge className="bg-background/90 backdrop-blur-sm text-foreground text-lg font-bold px-3 py-1">
                        {formatPrice(property.price)}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{property.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{property.city}, {property.state}</span>
                      </div>
                    </div>

                    {/* Property details */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {property.bedrooms && (
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          <span>{property.bedrooms}</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          <span>{property.bathrooms}</span>
                        </div>
                      )}
                      {property.size_sqft && (
                        <div className="flex items-center gap-1">
                          <Square className="w-4 h-4" />
                          <span>{property.size_sqft?.toLocaleString()} sqft</span>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => navigate(`/properties/${property.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Tour Scheduled",
                            description: "We'll contact you to confirm the appointment"
                          });
                        }}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Tour
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground">Loading properties...</div>
              </div>
            ) : sortedProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground">No properties found matching your criteria.</div>
              </div>
            ) : (
              sortedProperties.map((property) => (
                <Card key={property.id} className="hover:shadow-elegant transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-32 h-32 bg-muted rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-xl">{property.title}</h3>
                            <p className="text-muted-foreground">{property.city}, {property.state}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{formatPrice(property.price)}</div>
                            <div className="text-sm text-muted-foreground">{property.property_type}</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{property.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {property.bedrooms && (
                            <div className="flex items-center gap-1">
                              <Bed className="w-4 h-4" />
                              <span>{property.bedrooms} beds</span>
                            </div>
                          )}
                          {property.bathrooms && (
                            <div className="flex items-center gap-1">
                              <Bath className="w-4 h-4" />
                              <span>{property.bathrooms} baths</span>
                            </div>
                          )}
                          {property.size_sqft && (
                            <div className="flex items-center gap-1">
                              <Square className="w-4 h-4" />
                              <span>{property.size_sqft?.toLocaleString()} sqft</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="map">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-muted-foreground">Map view coming soon...</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};