import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { BusinessFilters as BusinessFiltersType } from '@/hooks/useBusinesses';
import { useBusinessCategories } from '@/hooks/useBusinesses';
import { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface BusinessFiltersProps {
  filters: BusinessFiltersType;
  onFiltersChange: (filters: BusinessFiltersType) => void;
  onClearFilters: () => void;
}

export const BusinessFilters = ({ filters, onFiltersChange, onClearFilters }: BusinessFiltersProps) => {
  const { categories } = useBusinessCategories();
  const [priceRange, setPriceRange] = useState([
    filters.minPrice || 0,
    filters.maxPrice || 5000000
  ]);

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    onFiltersChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof BusinessFiltersType];
    return value !== undefined && value !== null && value !== '';
  });

  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </CardTitle>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={filters.category || ''}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, category: value || undefined })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range</Label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={5000000}
              min={0}
              step={25000}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City or State"
            value={filters.location || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, location: e.target.value || undefined })
            }
          />
        </div>

        {/* Industry Filter */}
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            placeholder="Search industry"
            value={filters.industry || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, industry: e.target.value || undefined })
            }
          />
        </div>

        {/* Visa Eligible */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="visa-eligible"
            checked={filters.visaEligible || false}
            onCheckedChange={(checked) =>
              onFiltersChange({ ...filters, visaEligible: checked as boolean || undefined })
            }
          />
          <Label htmlFor="visa-eligible" className="text-sm font-normal">
            Visa Eligible Only
          </Label>
        </div>

        {/* Training Provided */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="training"
            checked={filters.trainingProvided || false}
            onCheckedChange={(checked) =>
              onFiltersChange({ ...filters, trainingProvided: checked as boolean || undefined })
            }
          />
          <Label htmlFor="training" className="text-sm font-normal">
            Training Provided
          </Label>
        </div>

        {/* Financing Available */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="financing"
            checked={filters.financingAvailable || false}
            onCheckedChange={(checked) =>
              onFiltersChange({ ...filters, financingAvailable: checked as boolean || undefined })
            }
          />
          <Label htmlFor="financing" className="text-sm font-normal">
            Financing Available
          </Label>
        </div>

        {/* Minimum ROI */}
        <div className="space-y-2">
          <Label htmlFor="min-roi">Minimum ROI (%)</Label>
          <Input
            id="min-roi"
            type="number"
            placeholder="0"
            value={filters.minROI || ''}
            onChange={(e) =>
              onFiltersChange({ 
                ...filters, 
                minROI: e.target.value ? Number(e.target.value) : undefined 
              })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};