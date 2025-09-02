import React from 'react';
import { X, MapPin, Bed, Bath, Square, Calendar, DollarSign, Users, Building2, Home, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  year_built?: number;
  property_type: string;
  listing_type: string;
  images: string[];
  property_features?: string[];
  visa_eligible?: string[];
  annual_revenue?: number;
  employee_count?: string;
  rating?: number;
}

interface PropertyComparisonProps {
  properties: Property[];
  onRemoveProperty: (propertyId: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const PropertyComparison: React.FC<PropertyComparisonProps> = ({
  properties,
  onRemoveProperty,
  onClose,
  isOpen
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'business':
        return <Briefcase className="h-6 w-6" />;
      case 'commercial':
        return <Building2 className="h-6 w-6" />;
      default:
        return <Home className="h-6 w-6" />;
    }
  };

  const ComparisonRow = ({ label, values }: { label: string; values: (string | number | undefined)[] }) => (
    <div className="grid grid-cols-1 gap-4 py-3 border-b border-muted/30">
      <div className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
        {label}
      </div>
      <div className={`grid gap-4 ${properties.length === 2 ? 'grid-cols-2' : properties.length === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
        {values.map((value, index) => (
          <div key={index} className="text-sm">
            {value !== undefined && value !== null ? (
              <span className="text-foreground">{value}</span>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (properties.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Property Comparison ({properties.length})
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Compare up to 3 properties side by side to make informed decisions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Headers */}
          <div className={`grid gap-4 ${properties.length === 2 ? 'grid-cols-2' : properties.length === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
            {properties.map((property) => (
              <Card key={property.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 z-10 h-6 w-6 p-0"
                  onClick={() => onRemoveProperty(property.id)}
                >
                  <X className="h-3 w-3" />
                </Button>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {getPropertyIcon(property.property_type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{property.title}</CardTitle>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                        <MapPin className="h-3 w-3" />
                        {property.city}, {property.state}
                      </div>
                    </div>
                  </div>

                  {/* Property Image */}
                  <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-muted-foreground">
                        {getPropertyIcon(property.property_type)}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {property.listing_type}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Comparison Details */}
          <div className="space-y-1">
            <h3 className="font-semibold text-lg mb-4">Property Details</h3>

            <ComparisonRow
              label="Property Type"
              values={properties.map(p => p.property_type)}
            />

            <ComparisonRow
              label="Listing Type"
              values={properties.map(p => p.listing_type)}
            />

            <ComparisonRow
              label="Address"
              values={properties.map(p => p.address)}
            />

            <ComparisonRow
              label="Year Built"
              values={properties.map(p => p.year_built)}
            />

            {/* Residential specific fields */}
            {properties.some(p => p.bedrooms || p.bathrooms) && (
              <>
                <ComparisonRow
                  label="Bedrooms"
                  values={properties.map(p => p.bedrooms ? `${p.bedrooms} bed` : undefined)}
                />

                <ComparisonRow
                  label="Bathrooms"
                  values={properties.map(p => p.bathrooms ? `${p.bathrooms} bath` : undefined)}
                />
              </>
            )}

            <ComparisonRow
              label="Square Footage"
              values={properties.map(p => p.square_feet ? `${p.square_feet.toLocaleString()} sq ft` : undefined)}
            />

            {/* Business specific fields */}
            {properties.some(p => p.annual_revenue || p.employee_count) && (
              <>
                <ComparisonRow
                  label="Annual Revenue"
                  values={properties.map(p => p.annual_revenue ? `$${(p.annual_revenue / 1000000).toFixed(1)}M` : undefined)}
                />

                <ComparisonRow
                  label="Employee Count"
                  values={properties.map(p => p.employee_count)}
                />
              </>
            )}

            <ComparisonRow
              label="Rating"
              values={properties.map(p => p.rating ? `${p.rating}/5 stars` : undefined)}
            />
          </div>

          <Separator />

          {/* Features Comparison */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Features & Amenities</h3>
            
            <div className={`grid gap-4 ${properties.length === 2 ? 'grid-cols-2' : properties.length === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
              {properties.map((property) => (
                <div key={property.id} className="space-y-2">
                  <div className="font-medium text-sm">{property.title}</div>
                  <div className="flex flex-wrap gap-1">
                    {property.property_features && property.property_features.length > 0 ? (
                      property.property_features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">No features listed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Visa Eligibility */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Visa Eligibility</h3>
            
            <div className={`grid gap-4 ${properties.length === 2 ? 'grid-cols-2' : properties.length === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
              {properties.map((property) => (
                <div key={property.id} className="space-y-2">
                  <div className="font-medium text-sm">{property.title}</div>
                  <div className="flex flex-wrap gap-1">
                    {property.visa_eligible && property.visa_eligible.length > 0 ? (
                      property.visa_eligible.map((visa, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {visa}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">No visa info</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`grid gap-4 mt-6 ${properties.length === 2 ? 'grid-cols-2' : properties.length === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
            {properties.map((property) => (
              <div key={property.id} className="space-y-2">
                <Button className="w-full" size="sm">
                  View Details
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Schedule Viewing
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};