import React, { useMemo } from 'react';
import { MapPin, Bed, Bath, Square, Heart, GitCompare, Star, Calendar, DollarSign, Users, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
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
    listing_type: string;
    images: string[];
    property_features?: string[];
    visa_eligible?: string[];
    featured?: boolean;
    rating?: number;
    year_built?: number;
    annual_revenue?: number;
    employee_count?: string;
  };
  onClick: () => void;
  onFavoriteToggle: () => void;
  onCompareToggle: () => void;
  isFavorited: boolean;
  isInCompareList: boolean;
  canAddToCompare: boolean;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onClick,
  onFavoriteToggle,
  onCompareToggle,
  isFavorited,
  isInCompareList,
  canAddToCompare,
  className
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Static view count to prevent continuous changes
  const viewCount = useMemo(() => {
    return 150 + (property.id.charCodeAt(0) % 350); // Deterministic based on property ID
  }, [property.id]);

  const getTypeIcon = () => {
    switch (property.property_type.toLowerCase()) {
      case 'commercial':
        return '🏢';
      case 'business':
        return '💼';
      case 'land':
        return '🌱';
      default:
        return '🏠';
    }
  };

  // Get the first image from the property images array  
  const propertyImage = property.images && Array.isArray(property.images) && property.images.length > 0 
    ? property.images[0] 
    : null;

  return (
    <Card className={cn('group hover:shadow-lg transition-all duration-300 cursor-pointer', className)}>
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        {propertyImage ? (
          <img
            src={propertyImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="w-full h-full bg-muted items-center justify-center text-4xl"
          style={{ display: propertyImage ? 'none' : 'flex' }}
        >
          {getTypeIcon()}
        </div>

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {property.featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium">
              ⭐ Featured
            </Badge>
          )}
          <Badge variant="secondary" className="bg-white/90 text-gray-900">
            {property.property_type}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 w-8 p-0 bg-white/90 hover:bg-white transition-colors',
              isFavorited && 'text-red-500'
            )}
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle();
            }}
          >
            <Heart className={cn('h-4 w-4', isFavorited && 'fill-current')} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-8 w-8 p-0 bg-white/90 hover:bg-white transition-colors',
              isInCompareList && 'text-blue-500',
              !canAddToCompare && !isInCompareList && 'opacity-50 cursor-not-allowed'
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (canAddToCompare || isInCompareList) {
                onCompareToggle();
              }
            }}
            disabled={!canAddToCompare && !isInCompareList}
          >
            <GitCompare className={cn('h-4 w-4', isInCompareList && 'fill-current')} />
          </Button>
        </div>

        {/* Rating & Views */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between">
          {property.rating && (
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-xs">{property.rating}</span>
            </div>
          )}
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
            <Eye className="h-3 w-3 text-white" />
            <span className="text-white text-xs">
              {viewCount} views
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-3" onClick={onClick}>
        {/* Header */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(property.price)}
            </div>
            <Badge variant="outline" className="text-xs">
              {property.listing_type}
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4" />
            <span>{property.city}, {property.state}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.square_feet && (
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{property.square_feet.toLocaleString()} sq ft</span>
            </div>
          )}
          {property.year_built && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{property.year_built}</span>
            </div>
          )}
          {property.annual_revenue && (
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>${(property.annual_revenue / 1000000).toFixed(1)}M</span>
            </div>
          )}
          {property.employee_count && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{property.employee_count}</span>
            </div>
          )}
        </div>

        {/* Features */}
        {property.property_features && property.property_features.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Key Features
            </div>
            <div className="flex flex-wrap gap-1">
              {property.property_features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {property.property_features.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{property.property_features.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Visa Eligibility */}
        {property.visa_eligible && property.visa_eligible.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Visa Eligible
            </div>
            <div className="flex flex-wrap gap-1">
              {property.visa_eligible.map((visa, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {visa}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <Button className="w-full" onClick={onClick}>
            View Details
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Schedule Tour
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Contact Agent
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};