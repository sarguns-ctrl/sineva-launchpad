import { useState, useEffect } from 'react';

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

// Sample property data
const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Downtown Office Complex',
    description: 'Prime commercial property in the heart of downtown Houston with excellent investment potential.',
    property_type: 'commercial',
    category: 'Investment Grade',
    price: 2850000,
    address: '1200 Main Street',
    city: 'Houston',
    state: 'TX',
    zip_code: '77002',
    country: 'USA',
    size_sqft: 12500,
    features: ['Prime downtown location', 'Fully leased', 'Strong ROI'],
    amenities: ['Parking garage', 'Security', '24/7 access'],
    images: ['/api/placeholder/400/250'],
    status: 'active',
    visa_eligible: ['E-2', 'EB-5'],
    investment_highlights: ['High occupancy rate', 'Growing downtown area', 'Long-term leases'],
    roi_potential: 8.5,
    views_count: 324,
    favorites_count: 45,
    is_featured: true,
    listing_date: '2024-01-15',
    rating: 4.8
  },
  {
    id: '2',
    title: 'River Oaks Estate',
    description: 'Luxury residential estate in prestigious River Oaks neighborhood.',
    property_type: 'residential',
    category: 'Luxury',
    price: 1250000,
    address: '2500 River Oaks Boulevard',
    city: 'Houston',
    state: 'TX',
    zip_code: '77019',
    country: 'USA',
    size_sqft: 4200,
    bedrooms: 5,
    bathrooms: 4.5,
    year_built: 2018,
    features: ['Gated community', 'Pool & spa', 'Premium finishes'],
    amenities: ['Swimming pool', 'Home gym', 'Wine cellar', 'Chef\'s kitchen'],
    images: ['/api/placeholder/400/250'],
    status: 'active',
    visa_eligible: ['Investment Property'],
    views_count: 189,
    favorites_count: 67,
    is_featured: true,
    listing_date: '2024-01-20',
    rating: 4.9
  },
  {
    id: '3',
    title: 'Tech Consulting Firm',
    description: 'Established technology consulting business with strong client base.',
    property_type: 'business',
    category: 'E-2 Ready',
    price: 750000,
    address: '301 Congress Avenue',
    city: 'Austin',
    state: 'TX',
    zip_code: '78701',
    country: 'USA',
    business_type: 'Technology Consulting',
    industry: 'Technology',
    annual_revenue: 1200000,
    employee_count: '15-20',
    years_established: 8,
    features: ['Established client base', 'Scalable model', 'Remote-friendly'],
    amenities: ['Modern office', 'Cloud infrastructure', 'Trained staff'],
    images: ['/api/placeholder/400/250'],
    status: 'active',
    visa_eligible: ['E-2', 'L-1'],
    investment_highlights: ['Recurring revenue model', 'Growing market', 'Experienced team'],
    views_count: 267,
    favorites_count: 32,
    is_featured: true,
    listing_date: '2024-01-10',
    rating: 4.7
  },
  {
    id: '4',
    title: 'Retail Shopping Center',
    description: 'Multi-tenant retail property with strong foot traffic and stable income.',
    property_type: 'commercial',
    category: 'High Yield',
    price: 3200000,
    address: '4500 Northwest Highway',
    city: 'Dallas',
    state: 'TX',
    zip_code: '75220',
    country: 'USA',
    size_sqft: 18000,
    features: ['Multiple tenants', 'Long-term leases', 'Growing area'],
    amenities: ['Ample parking', 'High visibility', 'Anchor tenant'],
    images: ['/api/placeholder/400/250'],
    status: 'active',
    visa_eligible: ['EB-5', 'E-2'],
    investment_highlights: ['Stable cash flow', 'Prime location', 'Expansion potential'],
    roi_potential: 9.2,
    rental_income: 25000,
    views_count: 412,
    favorites_count: 58,
    is_featured: false,
    listing_date: '2024-01-08',
    rating: 4.6
  },
  {
    id: '5',
    title: 'Manufacturing Business',
    description: '20+ year established manufacturing business with consistent growth.',
    property_type: 'business',
    category: 'Established',
    price: 1850000,
    address: '8200 Industrial Drive',
    city: 'San Antonio',
    state: 'TX',
    zip_code: '78218',
    country: 'USA',
    business_type: 'Manufacturing',
    industry: 'Industrial',
    annual_revenue: 3800000,
    employee_count: '35-40',
    years_established: 22,
    features: ['20+ year history', 'Consistent growth', 'Key contracts'],
    amenities: ['Modern facility', 'Automated systems', 'Skilled workforce'],
    images: ['/api/placeholder/400/250'],
    status: 'active',
    visa_eligible: ['E-2', 'EB-5'],
    investment_highlights: ['Long-term contracts', 'Growing demand', 'Established operations'],
    views_count: 156,
    favorites_count: 41,
    is_featured: false,
    listing_date: '2024-01-05',
    rating: 4.8
  },
  {
    id: '6',
    title: 'Luxury Penthouse',
    description: 'Stunning penthouse with panoramic city views in downtown Austin.',
    property_type: 'residential',
    category: 'City Views',
    price: 890000,
    address: '200 Congress Avenue, PH1',
    city: 'Austin',
    state: 'TX',
    zip_code: '78701',
    country: 'USA',
    size_sqft: 2800,
    bedrooms: 3,
    bathrooms: 3,
    year_built: 2020,
    features: ['Panoramic views', 'Modern design', 'Concierge service'],
    amenities: ['Rooftop terrace', 'Smart home', 'Premium appliances'],
    images: ['/api/placeholder/400/250'],
    status: 'active',
    visa_eligible: ['Personal Residence'],
    views_count: 298,
    favorites_count: 89,
    is_featured: true,
    listing_date: '2024-01-12',
    rating: 4.9
  }
];

export const useProperties = (filters?: { type?: string; search?: string }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredProperties = [...sampleProperties];
      
      // Apply filters
      if (filters?.type && filters.type !== 'all') {
        filteredProperties = filteredProperties.filter(
          property => property.property_type === filters.type
        );
      }
      
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProperties = filteredProperties.filter(
          property => 
            property.title.toLowerCase().includes(searchLower) ||
            property.city.toLowerCase().includes(searchLower) ||
            property.description?.toLowerCase().includes(searchLower)
        );
      }
      
      setProperties(filteredProperties);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters?.type, filters?.search]);

  return { 
    properties, 
    loading, 
    error, 
    refetch: fetchProperties,
    totalCount: properties.length 
  };
};