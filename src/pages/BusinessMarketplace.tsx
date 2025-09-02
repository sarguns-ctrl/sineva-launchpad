import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useBusinesses, useBusinessCategories } from '@/hooks/useBusinesses';
import { useAuth } from '@/hooks/useAuth';
import { 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Search,
  Filter,
  Heart,
  Plus,
  Building2,
  Calendar,
  Star
} from 'lucide-react';

const BusinessMarketplace = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [priceRange, setPriceRange] = useState('');
  
  // Parse price range into min/max values
  const getPriceRangeValues = (range: string) => {
    if (!range) return {};
    const [min, max] = range.split('-').map(Number);
    return { minPrice: min, maxPrice: max };
  };
  
  const { businesses, loading, error } = useBusinesses({
    category: selectedCategory || undefined,
    location: selectedState || undefined,
    industry: searchTerm || undefined,
    ...getPriceRangeValues(priceRange)
  });
  
  const { categories } = useBusinessCategories();

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  const priceRanges = [
    { label: 'Under $100K', value: '0-100000' },
    { label: '$100K - $500K', value: '100000-500000' },
    { label: '$500K - $1M', value: '500000-1000000' },
    { label: '$1M - $5M', value: '1000000-5000000' },
    { label: '$5M+', value: '5000000-999999999' }
  ];

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <div className="grid md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-playfair">
              Business Marketplace
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover profitable US businesses for sale. Perfect opportunities for international investors and entrepreneurs.
            </p>
            
            {user && (
              <div className="pt-4">
                <Button asChild className="shadow-button">
                  <Link to="/list-business">
                    <Plus className="w-4 h-4 mr-2" />
                    List Your Business
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search businesses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:w-auto">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    {usStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Prices</SelectItem>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {businesses.length} business{businesses.length !== 1 ? 'es' : ''} found
          </p>
        </div>

        {/* Business Grid */}
        {businesses.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No businesses found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse all available businesses.
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
              setSelectedState('');
              setPriceRange('');
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <Card key={business.id} className="group hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {business.featured && (
                        <Badge className="mb-2 bg-yellow-100 text-yellow-800">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {business.business_name}
                      </CardTitle>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {business.location_city}, {business.location_state}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(business.asking_price)}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {business.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {business.industry}
                    </Badge>
                    {business.visa_eligible && (
                      <Badge variant="outline" className="text-xs">
                        Visa Eligible
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {business.annual_revenue && (
                      <div>
                        <div className="text-muted-foreground">Revenue</div>
                        <div className="font-medium">{formatPrice(business.annual_revenue)}</div>
                      </div>
                    )}
                    
                    {business.years_established && (
                      <div>
                        <div className="text-muted-foreground">Established</div>
                        <div className="font-medium">{business.years_established} years</div>
                      </div>
                    )}
                    
                    {business.number_of_employees && (
                      <div>
                        <div className="text-muted-foreground">Employees</div>
                        <div className="font-medium">{business.number_of_employees}</div>
                      </div>
                    )}
                    
                    {business.roi_percentage && (
                      <div>
                        <div className="text-muted-foreground">ROI</div>
                        <div className="font-medium text-green-600">{business.roi_percentage}%</div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button asChild className="flex-1">
                      <Link to={`/business/${business.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More / Pagination could go here */}
      </div>

      <Footer />
    </div>
  );
};

export default BusinessMarketplace;