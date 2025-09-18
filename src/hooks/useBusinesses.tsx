import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Business {
  id: string;
  seller_id: string;
  category_id: string;
  business_name: string;
  description: string;
  industry: string;
  location_city: string;
  location_state: string;
  asking_price: number;
  annual_revenue: number | null;
  annual_profit: number | null;
  years_established: number | null;
  number_of_employees: number | null;
  visa_eligible: boolean;
  visa_types: string[] | null;
  roi_percentage: number | null;
  assets_included: string[] | null;
  inventory_included: boolean;
  training_provided: boolean;
  financing_available: boolean;
  reason_for_selling: string | null;
  images: any;
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  business_categories?: {
    name: string;
    description: string;
  };
}

export interface BusinessFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  industry?: string;
  visaEligible?: boolean;
  minROI?: number;
  trainingProvided?: boolean;
  financingAvailable?: boolean;
}

export const useBusinesses = (filters?: BusinessFilters) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('businesses')
        .select(`
          *,
          business_categories (
            name,
            description
          )
        `)
        .eq('status', 'approved')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category_id', filters.category);
      }
      
      if (filters?.minPrice) {
        query = query.gte('asking_price', filters.minPrice);
      }
      
      if (filters?.maxPrice) {
        query = query.lte('asking_price', filters.maxPrice);
      }
      
      if (filters?.location) {
        query = query.or(`location_city.ilike.%${filters.location}%,location_state.ilike.%${filters.location}%`);
      }
      
      if (filters?.industry) {
        query = query.ilike('industry', `%${filters.industry}%`);
      }
      
      if (filters?.visaEligible) {
        query = query.eq('visa_eligible', true);
      }
      
      if (filters?.minROI) {
        query = query.gte('roi_percentage', filters.minROI);
      }
      
      if (filters?.trainingProvided) {
        query = query.eq('training_provided', true);
      }
      
      if (filters?.financingAvailable) {
        query = query.eq('financing_available', true);
      }

      const { data, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      setBusinesses(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error('Error fetching businesses:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch businesses');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (businessId: string) => {
    try {
      const { error } = await supabase
        .from('business_favorites')
        .insert({ business_id: businessId, user_id: (await supabase.auth.getUser()).data.user?.id });
      
      if (error) throw error;
    } catch (err) {
      console.error('Error adding to favorites:', err);
      throw err;
    }
  };

  const removeFromFavorites = async (businessId: string) => {
    try {
      const { error } = await supabase
        .from('business_favorites')
        .delete()
        .eq('business_id', businessId)
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
      
      if (error) throw error;
    } catch (err) {
      console.error('Error removing from favorites:', err);
      throw err;
    }
  };

  const submitInquiry = async (businessId: string, inquiryData: {
    message: string;
    investmentBudget?: number;
    visaRequirement?: string;
    name: string;
    email: string;
    phone?: string;
  }) => {
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Authentication required');

      const { error } = await supabase
        .from('business_inquiries')
        .insert({
          business_id: businessId,
          inquirer_id: user.id,
          inquirer_name: inquiryData.name,
          inquirer_email: inquiryData.email,
          inquirer_phone: inquiryData.phone,
          message: inquiryData.message,
          investment_budget: inquiryData.investmentBudget,
          visa_requirement: inquiryData.visaRequirement,
        });
      
      if (error) throw error;
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, [filters]);

  return {
    businesses,
    loading,
    error,
    totalCount,
    refetch: fetchBusinesses,
    addToFavorites,
    removeFromFavorites,
    submitInquiry,
  };
};

export const useBusinessCategories = () => {
  const [categories, setCategories] = useState<Array<{ id: string; name: string; description: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('business_categories')
          .select('*')
          .order('name');

        if (fetchError) throw fetchError;
        setCategories(data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};