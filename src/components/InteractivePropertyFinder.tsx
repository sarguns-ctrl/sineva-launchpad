import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { useProperties, type Property } from '@/hooks/useProperties';
import { Search, MapPin, DollarSign, Building2, Home, Briefcase, Filter, ArrowRight } from 'lucide-react';

interface PropertyFilters {
  search: string;
  type: string;
  priceRange: number[];
  location: string;
  visaEligible: string;
}

const InteractivePropertyFinder = () => {
  const [filters, setFilters] = useState<PropertyFilters>({
    search: '',
    type: 'all',
    priceRange: [500000, 5000000],
    location: 'all',
    visaEligible: 'all'
  });

  const [showResults, setShowResults] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { properties, loading } = useProperties({ 
    type: filters.type === 'all' ? undefined : filters.type,
    search: filters.search 
  });

  // Filter properties based on additional criteria
  const filteredProperties = properties.filter(property => {
    const matchesPrice = property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
    const matchesLocation = filters.location === 'all' || property.city.toLowerCase().includes(filters.location.toLowerCase());
    const matchesVisa = filters.visaEligible === 'all' || property.visa_eligible.includes(filters.visaEligible);
    
    return matchesPrice && matchesLocation && matchesVisa;
  });

  const handleSearch = () => {
    setShowResults(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case 'business': return Briefcase;
      case 'commercial': return Building2;
      case 'residential': return Home;
      default: return Building2;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Interface */}
      <Card className="bg-card/95 backdrop-blur-xl border-0 shadow-elegant">
        <CardContent className="p-6 space-y-6">
          {/* Quick Search */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by location, property type, or keywords..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                size="lg"
                className="h-12 px-6"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Quick Property Type Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Properties', icon: Building2 },
                { id: 'residential', label: 'Residential', icon: Home },
                { id: 'commercial', label: 'Commercial', icon: Building2 },
                { id: 'business', label: 'Business', icon: Briefcase }
              ].map((type) => {
                const IconComponent = type.icon;
                return (
                  <Button
                    key={type.id}
                    variant={filters.type === type.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, type: type.id }))}
                    className="flex items-center space-x-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{type.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Price Range</label>
                <div className="px-3 py-2 bg-muted/30 rounded-lg">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                    max={10000000}
                    min={100000}
                    step={50000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{formatPrice(filters.priceRange[0])}</span>
                    <span>{formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location</label>
                <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="houston">Houston, TX</SelectItem>
                    <SelectItem value="austin">Austin, TX</SelectItem>
                    <SelectItem value="dallas">Dallas, TX</SelectItem>
                    <SelectItem value="san antonio">San Antonio, TX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Visa Eligible</label>
                <Select value={filters.visaEligible} onValueChange={(value) => setFilters(prev => ({ ...prev, visaEligible: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All visa types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Visa Types</SelectItem>
                    <SelectItem value="E-2">E-2 Treaty Investor</SelectItem>
                    <SelectItem value="EB-5">EB-5 Investor</SelectItem>
                    <SelectItem value="L-1">L-1 Intracompany</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Search Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSearch}
              size="lg"
              className="bg-gradient-primary shadow-accent px-8"
            >
              <Search className="w-4 h-4 mr-2" />
              Find Properties ({filteredProperties.length})
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {showResults && (
        <Card className="bg-card/95 backdrop-blur-xl border-0 shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-primary">
                Found {filteredProperties.length} Properties
              </h3>
              <Badge variant="secondary" className="text-sm">
                Updated live
              </Badge>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                      <div className="h-6 bg-muted rounded w-1/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Properties Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or contact us for custom property searches.
                </p>
                <Button variant="outline">
                  Contact Our Experts
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProperties.slice(0, 6).map((property) => {
                  const IconComponent = getPropertyIcon(property.property_type);
                  return (
                    <Card key={property.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-accent" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                                {property.title}
                              </h4>
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{property.city}, {property.state}</span>
                              </div>
                            </div>
                          </div>
                          {property.category && (
                            <Badge variant="secondary" className="text-xs">
                              {property.category}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold text-primary">
                            {formatPrice(property.price)}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {property.visa_eligible.slice(0, 2).map((visa, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {visa}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            {property.size_sqft && (
                              <span>{property.size_sqft.toLocaleString()} sq ft</span>
                            )}
                            {property.bedrooms && (
                              <span>{property.bedrooms} bed</span>
                            )}
                            {property.employee_count && (
                              <span>{property.employee_count} employees</span>
                            )}
                          </div>
                          <Button size="sm" variant="ghost" className="text-xs h-7 px-2">
                            View Details
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {filteredProperties.length > 6 && (
              <div className="text-center mt-6">
                <Button variant="outline" size="lg">
                  View All {filteredProperties.length} Properties
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractivePropertyFinder;