import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface Property {
  id: string;
  title: string;
  description?: string;
  property_type: 'residential' | 'commercial' | 'business' | 'land';
  category?: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip_code?: string;
  country: string;
  size_sqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  year_built?: number;
  features: string[];
  amenities: string[];
  images: string[];
  virtual_tour_url?: string;
  status: 'active' | 'pending' | 'sold' | 'inactive';
  visa_eligible: string[];
  investment_highlights?: string[];
  roi_potential?: number;
  rental_income?: number;
  views_count: number;
  favorites_count: number;
  is_featured: boolean;
  listing_date: string;
  rating: number;
  // Business specific fields
  business_type?: string;
  industry?: string;
  annual_revenue?: number;
  employee_count?: string;
  years_established?: number;
}

interface PropertyFilters {
  type?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  priceMin?: number;
  priceMax?: number;
  location?: string;
  city?: string;
  state?: string;
  bedrooms?: number;
  bathrooms?: number;
  featured?: boolean;
  status?: string;
  listingType?: string;
  priceRange?: number[];
  sizeRange?: number[];
  propertyType?: string;
  sortBy?: string;
}

export const useProperties = (filters?: PropertyFilters) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('properties')
        .select(`
          *,
          agent:employee_profiles(id, full_name, email)
        `);

      // Apply status filter - default to active properties
      if (filters?.status) {
        query = query.eq('status', filters.status);
      } else {
        query = query.in('status', ['active', 'pending']);
      }

      // Apply property type filters
      if (filters?.type && filters.type !== 'all' && filters.type !== '') {
        query = query.eq('property_type', filters.type);
      }
      
      if (filters?.propertyType && filters.propertyType !== 'all' && filters.propertyType !== '') {
        query = query.eq('property_type', filters.propertyType);
      }

      // Apply listing type filter
      if (filters?.listingType && filters.listingType !== 'any' && filters.listingType !== '') {
        query = query.eq('listing_type', filters.listingType);
      }

      // Apply featured filter
      if (filters?.featured) {
        query = query.eq('featured', true);
      }

      // Apply price range filters
      if (filters?.priceRange && filters.priceRange.length === 2) {
        query = query.gte('price', filters.priceRange[0]).lte('price', filters.priceRange[1]);
      } else {
        if (filters?.minPrice || filters?.priceMin) {
          query = query.gte('price', filters.minPrice || filters.priceMin);
        }
        if (filters?.maxPrice || filters?.priceMax) {
          query = query.lte('price', filters.maxPrice || filters.priceMax);
        }
      }

      // Apply size range filter
      if (filters?.sizeRange && filters.sizeRange.length === 2) {
        query = query.gte('square_feet', filters.sizeRange[0]).lte('square_feet', filters.sizeRange[1]);
      }

      // Apply location filters
      if (filters?.location) {
        query = query.or(`city.ilike.%${filters.location}%,state.ilike.%${filters.location}%`);
      }
      
      if (filters?.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }

      if (filters?.state) {
        query = query.ilike('state', `%${filters.state}%`);
      }

      // Apply bedroom/bathroom filters
      if (filters?.bedrooms && filters.bedrooms > 0) {
        query = query.gte('bedrooms', filters.bedrooms);
      }

      if (filters?.bathrooms && filters.bathrooms > 0) {
        query = query.gte('bathrooms', filters.bathrooms);
      }

      // Apply search filter
      if (filters?.search && filters.search.trim()) {
        query = query.or(`
          title.ilike.%${filters.search}%,
          description.ilike.%${filters.search}%,
          city.ilike.%${filters.search}%,
          address.ilike.%${filters.search}%,
          property_type.ilike.%${filters.search}%
        `);
      }

      // Apply sorting
      const sortBy = filters?.sortBy || 'created_at';
      switch (sortBy) {
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'featured':
          query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error: queryError } = await query.limit(50);

      if (queryError) throw queryError;

      // Transform data to match our Property interface
      const transformedProperties: Property[] = (data || []).map(property => {
        // Safely extract arrays from JSON fields
        const features = Array.isArray(property.property_features) ? 
          property.property_features.map(f => String(f)) : [];
        const images = Array.isArray(property.images) ? 
          property.images.map(img => String(img)) : [];

        return {
          id: property.id,
          title: property.title,
          description: property.description || '',
          property_type: property.property_type as Property['property_type'],
          category: property.listing_type || 'Standard',
          price: Number(property.price),
          address: property.address,
          city: property.city,
          state: property.state,
          zip_code: property.zip_code || '',
          country: 'USA',
          size_sqft: property.square_feet || 0,
          bedrooms: property.bedrooms || 0,
          bathrooms: Number(property.bathrooms) || 0,
          year_built: property.year_built || 0,
          features,
          amenities: features,
          images,
          virtual_tour_url: property.virtual_tour_url || '',
          status: property.status as Property['status'],
          visa_eligible: property.listing_type === 'Investment' ? ['E-2', 'EB-5'] : [],
          investment_highlights: features.slice(0, 3),
          roi_potential: property.listing_type === 'Investment' ? Math.random() * 15 + 5 : 0,
          rental_income: property.listing_type === 'Rental' ? property.price * 0.001 : 0,
          views_count: Math.floor(Math.random() * 1000),
          favorites_count: Math.floor(Math.random() * 50),
          is_featured: property.featured || false,
          listing_date: property.created_at,
          rating: 4.0 + Math.random() * 1 // Random rating between 4-5
        };
      });

      setProperties(transformedProperties);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch properties';
      setError(errorMessage);
      console.error('Error fetching properties:', err);
      
      // Show error toast
      toast({
        title: "Error loading properties",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (propertyId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Must be logged in');

      const { error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          property_id: propertyId
        });

      if (error) throw error;

      toast({
        title: "Added to favorites",
        description: "Property added to your favorites list"
      });

      return { success: true };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return { success: false, error: err.message };
    }
  };

  const removeFromFavorites = async (propertyId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Must be logged in');

      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('property_id', propertyId);

      if (error) throw error;

      toast({
        title: "Removed from favorites",
        description: "Property removed from your favorites list"
      });

      return { success: true };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return { success: false, error: err.message };
    }
  };

  const scheduleViewing = async (propertyId: string, viewingData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Must be logged in');

      const { error } = await supabase
        .from('appointments')
        .insert({
          client_id: user.id,
          property_id: propertyId,
          appointment_type: 'viewing',
          scheduled_at: viewingData.scheduledAt,
          notes: viewingData.notes
        });

      if (error) throw error;

      toast({
        title: "Viewing scheduled",
        description: "Your property viewing has been scheduled successfully"
      });

      return { success: true };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [
    filters?.type,
    filters?.propertyType,
    filters?.listingType,
    filters?.search, 
    filters?.minPrice, 
    filters?.maxPrice,
    filters?.priceRange,
    filters?.sizeRange,
    filters?.city, 
    filters?.state,
    filters?.bedrooms,
    filters?.bathrooms,
    filters?.featured,
    filters?.status,
    filters?.sortBy
  ]);

  return { 
    properties, 
    loading, 
    error, 
    refetch: fetchProperties,
    totalCount: properties.length,
    addToFavorites,
    removeFromFavorites,
    scheduleViewing
  };
};