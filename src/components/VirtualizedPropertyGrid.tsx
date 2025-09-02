import React, { useState, useEffect, useCallback } from 'react';
import { PropertyCard } from './PropertyCard';

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
  property_type: string;
  listing_type: string;
  images: string[];
  property_features?: string[];
  visa_eligible?: string[];
  featured?: boolean;
  rating?: number;
}

interface VirtualizedPropertyGridProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
  onFavoriteToggle: (propertyId: string) => void;
  onCompareToggle: (propertyId: string) => void;
  compareList: string[];
  favoritesList: string[];
  loading?: boolean;
}

export const VirtualizedPropertyGrid: React.FC<VirtualizedPropertyGridProps> = ({
  properties,
  onPropertyClick,
  onFavoriteToggle,
  onCompareToggle,
  compareList,
  favoritesList,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted h-64 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <span className="text-2xl">🏠</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
          <p className="text-sm">Try adjusting your search criteria or filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onClick={() => onPropertyClick(property)}
          onFavoriteToggle={() => onFavoriteToggle(property.id)}
          onCompareToggle={() => onCompareToggle(property.id)}
          isFavorited={favoritesList.includes(property.id)}
          isInCompareList={compareList.includes(property.id)}
          canAddToCompare={compareList.length < 3}
        />
      ))}
    </div>
  );
};