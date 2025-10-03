import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, DollarSign, Users, Calendar, CheckCircle } from 'lucide-react';
import { Business } from '@/hooks/useBusinesses';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface BusinessCardProps {
  business: Business;
  onFavorite?: (businessId: string, isFavorite: boolean) => Promise<void>;
  isFavorite?: boolean;
}

export const BusinessCard = ({ business, onFavorite, isFavorite }: BusinessCardProps) => {
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to save favorites',
        variant: 'destructive',
      });
      return;
    }

    if (!onFavorite) return;

    try {
      setIsAddingToFavorites(true);
      await onFavorite(business.id, !isFavorite);
      toast({
        title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
        description: isFavorite ? 'Business removed from your favorites' : 'Business saved to your favorites',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update favorites',
        variant: 'destructive',
      });
    } finally {
      setIsAddingToFavorites(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatRevenue = (revenue: number | null) => {
    if (!revenue) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(revenue);
  };

  const handleCardClick = () => {
    navigate(`/business/${business.id}`);
  };

  // Get the first image from the business images array
  const businessImage = business.images && Array.isArray(business.images) && business.images.length > 0 
    ? business.images[0] 
    : null;

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-border/50 hover:border-primary/20 overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Business Image */}
      {businessImage && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={businessImage} 
            alt={business.business_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Featured Badge */}
          {business.featured && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
          
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            disabled={isAddingToFavorites}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white"
          >
            <Heart 
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
            />
          </Button>
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {business.business_name}
              </h3>
              {!businessImage && business.featured && (
                <Badge variant="secondary" className="text-xs">
                  Featured
                </Badge>
              )}
              {business.visa_eligible && (
                <Badge variant="outline" className="text-xs">
                  Visa Eligible
                </Badge>
              )}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {business.location_city}, {business.location_state}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <span className="px-2 py-1 bg-secondary rounded-sm text-xs">
                {business.business_categories?.name || business.industry}
              </span>
            </div>
          </div>

          {!businessImage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteClick}
              disabled={isAddingToFavorites}
              className="ml-2"
            >
              <Heart 
                className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
              />
            </Button>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {business.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm">
            <DollarSign className="w-4 h-4 mr-1 text-primary" />
            <span className="text-muted-foreground">Price:</span>
            <span className="ml-1 font-medium">{formatPrice(business.asking_price)}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <DollarSign className="w-4 h-4 mr-1 text-green-600" />
            <span className="text-muted-foreground">Revenue:</span>
            <span className="ml-1 font-medium">{formatRevenue(business.annual_revenue)}</span>
          </div>
          
          {business.number_of_employees && (
            <div className="flex items-center text-sm">
              <Users className="w-4 h-4 mr-1 text-blue-600" />
              <span className="text-muted-foreground">Staff:</span>
              <span className="ml-1 font-medium">{business.number_of_employees}</span>
            </div>
          )}
          
          {business.years_established && (
            <div className="flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-1 text-purple-600" />
              <span className="text-muted-foreground">Est:</span>
              <span className="ml-1 font-medium">{business.years_established} years</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {business.training_provided && (
            <Badge variant="outline" className="text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              Training
            </Badge>
          )}
          {business.financing_available && (
            <Badge variant="outline" className="text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              Financing
            </Badge>
          )}
          {business.roi_percentage && (
            <Badge variant="outline" className="text-xs">
              ROI: {business.roi_percentage}%
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 pt-0">
        <Button 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/business/${business.id}`);
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};