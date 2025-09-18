import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, X, SlidersHorizontal, MapPin, Heart, GitCompare, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface AdvancedFilters {
  location: string;
  propertyType: string;
  listingType: string;
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  squareFeetRange: [number, number];
  yearBuiltRange: [number, number];
  amenities: string[];
  visaEligible: string[];
  sortBy: string;
  showFeaturedOnly: boolean;
  keywords: string;
}

interface AdvancedPropertySearchProps {
  onFiltersChange: (filters: AdvancedFilters) => void;
  onCompareToggle: (propertyId: string) => void;
  compareList: string[];
  resultsCount: number;
}

const AMENITIES_OPTIONS = [
  'Pool', 'Gym', 'Parking', 'Balcony', 'Garden', 'Security', 'Elevator', 'AC',
  'Furnished', 'Pet Friendly', 'Laundry', 'Storage', 'High Speed Internet', 'Concierge'
];

const VISA_OPTIONS = ['E-2', 'EB-5', 'L-1', 'Investment Property', 'Personal Residence'];

const SORT_OPTIONS = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'sqft_desc', label: 'Largest First' },
  { value: 'rating', label: 'Highest Rated' }
];

export const AdvancedPropertySearch: React.FC<AdvancedPropertySearchProps> = ({
  onFiltersChange,
  onCompareToggle,
  compareList,
  resultsCount
}) => {
  const [filters, setFilters] = useState<AdvancedFilters>({
    location: '',
    propertyType: 'any',
    listingType: 'any',
    priceRange: [0, 10000000],
    bedrooms: 'any',
    bathrooms: 'any',
    squareFeetRange: [0, 10000],
    yearBuiltRange: [1900, 2024],
    amenities: [],
    visaEligible: [],
    sortBy: 'newest',
    showFeaturedOnly: false,
    keywords: ''
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (filters.location) count++;
    if (filters.propertyType && filters.propertyType !== 'any') count++;
    if (filters.listingType && filters.listingType !== 'any') count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000000) count++;
    if (filters.bedrooms && filters.bedrooms !== 'any') count++;
    if (filters.bathrooms && filters.bathrooms !== 'any') count++;
    if (filters.squareFeetRange[0] > 0 || filters.squareFeetRange[1] < 10000) count++;
    if (filters.yearBuiltRange[0] > 1900 || filters.yearBuiltRange[1] < 2024) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.visaEligible.length > 0) count++;
    if (filters.showFeaturedOnly) count++;
    if (filters.keywords) count++;
    
    setActiveFiltersCount(count);
  }, [filters]);

  // Debounced filter change notification
  const debouncedFiltersChange = useCallback(
    debounce((newFilters: AdvancedFilters) => {
      onFiltersChange(newFilters);
    }, 300),
    [onFiltersChange]
  );

  useEffect(() => {
    debouncedFiltersChange(filters);
  }, [filters, debouncedFiltersChange]);

  const updateFilter = (key: keyof AdvancedFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      listingType: '',
      priceRange: [0, 10000000],
      bedrooms: '',
      bathrooms: '',
      squareFeetRange: [0, 10000],
      yearBuiltRange: [1900, 2024],
      amenities: [],
      visaEligible: [],
      sortBy: 'newest',
      showFeaturedOnly: false,
      keywords: ''
    });
  };

  const formatPrice = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Basic Filters */}
      <div className="space-y-4">
        <h3 className="font-semibold">Basic Filters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Property Type</Label>
            <Select value={filters.propertyType} onValueChange={(value) => updateFilter('propertyType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Type</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Listing Type</Label>
            <Select value={filters.listingType} onValueChange={(value) => updateFilter('listingType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any Listing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Listing</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="lease">For Lease</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Bedrooms</Label>
            <Select value={filters.bedrooms} onValueChange={(value) => updateFilter('bedrooms', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+ Bedroom</SelectItem>
                <SelectItem value="2">2+ Bedrooms</SelectItem>
                <SelectItem value="3">3+ Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
                <SelectItem value="5">5+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Bathrooms</Label>
            <Select value={filters.bathrooms} onValueChange={(value) => updateFilter('bathrooms', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+ Bathroom</SelectItem>
                <SelectItem value="1.5">1.5+ Bathrooms</SelectItem>
                <SelectItem value="2">2+ Bathrooms</SelectItem>
                <SelectItem value="2.5">2.5+ Bathrooms</SelectItem>
                <SelectItem value="3">3+ Bathrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-semibold">Price Range</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value)}
            max={10000000}
            step={50000}
            className="w-full"
          />
        </div>
      </div>

      <Separator />

      {/* Square Footage */}
      <div className="space-y-4">
        <h3 className="font-semibold">Square Footage</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.squareFeetRange[0].toLocaleString()} sq ft</span>
            <span>{filters.squareFeetRange[1].toLocaleString()} sq ft</span>
          </div>
          <Slider
            value={filters.squareFeetRange}
            onValueChange={(value) => updateFilter('squareFeetRange', value)}
            max={10000}
            step={100}
            className="w-full"
          />
        </div>
      </div>

      <Separator />

      {/* Year Built */}
      <div className="space-y-4">
        <h3 className="font-semibold">Year Built</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.yearBuiltRange[0]}</span>
            <span>{filters.yearBuiltRange[1]}</span>
          </div>
          <Slider
            value={filters.yearBuiltRange}
            onValueChange={(value) => updateFilter('yearBuiltRange', value)}
            min={1900}
            max={2024}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div className="space-y-4">
        <h3 className="font-semibold">Amenities</h3>
        <div className="grid grid-cols-2 gap-2">
          {AMENITIES_OPTIONS.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter('amenities', [...filters.amenities, amenity]);
                  } else {
                    updateFilter('amenities', filters.amenities.filter(a => a !== amenity));
                  }
                }}
              />
              <Label htmlFor={`amenity-${amenity}`} className="text-sm">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Visa Eligibility */}
      <div className="space-y-4">
        <h3 className="font-semibold">Visa Eligibility</h3>
        <div className="grid grid-cols-2 gap-2">
          {VISA_OPTIONS.map((visa) => (
            <div key={visa} className="flex items-center space-x-2">
              <Checkbox
                id={`visa-${visa}`}
                checked={filters.visaEligible.includes(visa)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter('visaEligible', [...filters.visaEligible, visa]);
                  } else {
                    updateFilter('visaEligible', filters.visaEligible.filter(v => v !== visa));
                  }
                }}
              />
              <Label htmlFor={`visa-${visa}`} className="text-sm">
                {visa}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Featured Only */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured-only"
          checked={filters.showFeaturedOnly}
          onCheckedChange={(checked) => updateFilter('showFeaturedOnly', checked)}
        />
        <Label htmlFor="featured-only" className="font-medium">
          Show Featured Properties Only
        </Label>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Location Search */}
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter location (city, state, zip code)"
                value={filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Keywords Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Keywords (luxury, waterfront, etc.)"
                value={filters.keywords}
                onChange={(e) => updateFilter('keywords', e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort By */}
            <div className="w-full lg:w-48">
              <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                <SelectTrigger>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filters Button */}
            <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden relative">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Property Filters</SheetTitle>
                  <SheetDescription>
                    Refine your search with advanced filters
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Filters Button */}
            <Button variant="outline" className="hidden lg:flex relative">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {filters.propertyType && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filters.propertyType}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter('propertyType', '')} />
                    </Badge>
                  )}
                  {filters.listingType && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filters.listingType}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter('listingType', '')} />
                    </Badge>
                  )}
                  {filters.bedrooms && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filters.bedrooms}+ bed
                      <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter('bedrooms', '')} />
                    </Badge>
                  )}
                  {filters.amenities.length > 0 && (
                    <Badge variant="secondary">
                      {filters.amenities.length} amenity filters
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Desktop Advanced Filters Panel */}
      <Card className="hidden lg:block">
        <CardContent className="p-6">
          <FilterContent />
        </CardContent>
      </Card>

      {/* Results Summary & Compare */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Found <span className="font-semibold text-foreground">{resultsCount.toLocaleString()}</span> properties
        </div>
        
        {compareList.length > 0 && (
          <Button variant="outline" className="flex items-center gap-2">
            <GitCompare className="h-4 w-4" />
            Compare ({compareList.length})
          </Button>
        )}
      </div>
    </div>
  );
};

// Simple debounce function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}