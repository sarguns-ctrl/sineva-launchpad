import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { useBusinesses, type Business } from '@/hooks/useBusinesses';
import { Search, MapPin, DollarSign, Building2, Briefcase, Store, Filter, ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LazyImage } from './LazyImage';

interface BusinessFilters {
  search: string;
  industry: string;
  priceRange: number[];
  location: string;
  visaEligible: string;
  roiRange: number[];
}

const InteractiveBusinessFinder = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<BusinessFilters>({
    search: '',
    industry: '',
    priceRange: [100000, 2000000],
    location: 'all',
    visaEligible: 'all',
    roiRange: [10, 50]
  });

  const [showResults, setShowResults] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Memoize filters to prevent infinite loops
  const memoizedFilters = useMemo(() => ({
    industry: filters.industry || undefined,
    minPrice: filters.priceRange[0],
    maxPrice: filters.priceRange[1],
    location: filters.location === 'all' ? undefined : filters.location,
    visaEligible: filters.visaEligible === 'true' ? true : filters.visaEligible === 'false' ? false : undefined,
    minROI: filters.roiRange[0]
  }), [
    filters.industry,
    filters.priceRange[0],
    filters.priceRange[1],
    filters.location,
    filters.visaEligible,
    filters.roiRange[0]
  ]);

  const { businesses: allBusinesses, loading } = useBusinesses(memoizedFilters);

  const businesses = useMemo(() => {
    console.log('All businesses:', allBusinesses);
    if (!filters.search) return allBusinesses;
    
    return allBusinesses.filter(business =>
      business.business_name.toLowerCase().includes(filters.search.toLowerCase()) ||
      business.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      business.industry.toLowerCase().includes(filters.search.toLowerCase()) ||
      business.location_city.toLowerCase().includes(filters.search.toLowerCase()) ||
      business.location_state.toLowerCase().includes(filters.search.toLowerCase())
    );
  }, [allBusinesses, filters.search]);

  const handleSearch = () => {
    console.log('Find Businesses button clicked');
    console.log('Current filters:', filters);
    console.log('Businesses found:', businesses.length);
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

  const getBusinessIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'restaurant': 
      case 'food': return Store;
      case 'retail': return Building2;
      case 'technology': return Briefcase;
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
                  placeholder="Search by location, business type, or keywords..."
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

            {/* Quick Industry Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: '', label: 'All Businesses', icon: Building2 },
                { id: 'Restaurant', label: 'Restaurant', icon: Store },
                { id: 'Technology', label: 'Technology', icon: Briefcase },
                { id: 'Software', label: 'Software', icon: Briefcase },
                { id: 'Entertainment', label: 'Entertainment', icon: Building2 }
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={filters.industry === item.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, industry: item.id }))}
                    className="flex items-center space-x-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border/50">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Price Range</label>
                <div className="px-3 py-2 bg-muted/30 rounded-lg">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                    max={5000000}
                    min={50000}
                    step={25000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{formatPrice(filters.priceRange[0])}</span>
                    <span>{formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ROI Range (%)</label>
                <div className="px-3 py-2 bg-muted/30 rounded-lg">
                  <Slider
                    value={filters.roiRange}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, roiRange: value }))}
                    max={100}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{filters.roiRange[0]}%</span>
                    <span>{filters.roiRange[1]}%</span>
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
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="TN">Tennessee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Visa Sponsorship</label>
                <Select value={filters.visaEligible} onValueChange={(value) => setFilters(prev => ({ ...prev, visaEligible: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All businesses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Businesses</SelectItem>
                    <SelectItem value="true">Visa Eligible Only</SelectItem>
                    <SelectItem value="false">No Visa Required</SelectItem>
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
              Find Businesses ({businesses.length})
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
                Found {businesses.length} Businesses
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
            ) : businesses.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Businesses Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or contact us for custom business searches.
                </p>
                <Button variant="outline">
                  Contact Our Experts
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businesses.slice(0, 6).map((business) => {
                  const IconComponent = getBusinessIcon(business.industry);
                  return (
                    <Card key={business.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardContent className="p-0">
                        {/* Business Image */}
                        <div className="relative h-32 overflow-hidden rounded-t-lg">
                          {business.images && business.images.length > 0 ? (
                            <LazyImage
                              src={business.images[0] || '/api/placeholder/400/200'}
                              alt={business.business_name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              fallback={
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                  <IconComponent className="h-8 w-8 text-muted-foreground" />
                                </div>
                              }
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <IconComponent className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary" className="text-xs bg-white/90 text-gray-900">
                              {business.industry}
                            </Badge>
                          </div>
                          {business.visa_eligible && (
                            <div className="absolute top-2 right-2">
                              <Badge className="text-xs bg-accent/90 text-white">
                                Visa Eligible
                              </Badge>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                                {business.business_name}
                              </h4>
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                                <MapPin className="w-3 h-3" />
                                <span>{business.location_city}, {business.location_state}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-3">
                            <div className="text-lg font-bold text-primary">
                              {formatPrice(business.asking_price)}
                            </div>
                            {business.roi_percentage && (
                              <div className="flex items-center space-x-1 text-sm text-accent">
                                <TrendingUp className="w-3 h-3" />
                                <span>{business.roi_percentage}% ROI</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-3 text-xs">
                              {business.annual_revenue && (
                                <span>Rev: {formatPrice(business.annual_revenue)}</span>
                              )}
                              {business.number_of_employees && (
                                <span>{business.number_of_employees} employees</span>
                              )}
                              {business.years_established && (
                                <span>{business.years_established}+ years</span>
                              )}
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-xs h-7 px-2 hover:bg-accent hover:text-accent-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/business/${business.id}`);
                              }}
                            >
                              View Details
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {businesses.length > 6 && (
              <div className="text-center mt-6">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/businesses')}
                >
                  View All {businesses.length} Businesses
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

export default InteractiveBusinessFinder;