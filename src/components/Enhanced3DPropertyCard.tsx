import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Share2, 
  Eye, 
  Calendar,
  Star,
  Zap,
  ArrowRight,
  Info,
  Phone,
  Mail
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

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
  images?: string[];
  featured?: boolean;
  description?: string;
  amenities?: string[];
  agent?: {
    name: string;
    avatar?: string;
    phone?: string;
    email?: string;
  };
  stats?: {
    views: number;
    saves: number;
    days_on_market: number;
  };
}

interface Enhanced3DPropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
  onContact?: (id: string) => void;
  isFavorited?: boolean;
}

export const Enhanced3DPropertyCard: React.FC<Enhanced3DPropertyCardProps> = ({
  property,
  onFavorite,
  onShare,
  onContact,
  isFavorited = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <motion.div
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all duration-500 bg-card/80 backdrop-blur-sm">
        {/* Property Image Section */}
        <div className="relative h-64 overflow-hidden">
          {/* Background image with parallax effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-primary"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              opacity: isHovered ? 0.8 : 0.6
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Image carousel indicators */}
          {property.images && property.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === imageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setImageIndex(index)}
                />
              ))}
            </div>
          )}

          {/* Property badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {property.featured && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Badge className="bg-accent text-accent-foreground font-medium shadow-lg">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </motion.div>
            )}
            
            <Badge 
              variant="secondary" 
              className="bg-background/90 backdrop-blur-sm shadow-lg"
            >
              {property.listing_type}
            </Badge>

            {property.stats?.days_on_market && property.stats.days_on_market < 7 && (
              <Badge className="bg-green-500 text-white shadow-lg animate-pulse">
                <Zap className="w-3 h-3 mr-1" />
                New
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0.7, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Button
                size="sm"
                variant="secondary"
                className="w-10 h-10 p-0 bg-background/90 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite?.(property.id);
                }}
              >
                <motion.div
                  animate={{ scale: isFavorited ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      isFavorited ? 'fill-red-500 text-red-500' : ''
                    }`} 
                  />
                </motion.div>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0.7, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                size="sm"
                variant="secondary"
                className="w-10 h-10 p-0 bg-background/90 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare?.(property.id);
                }}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0.7, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                size="sm"
                variant="secondary"
                className="w-10 h-10 p-0 bg-background/90 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground shadow-lg"
                onClick={() => setShowDetails(!showDetails)}
              >
                <Info className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* Price overlay */}
          <motion.div
            className="absolute bottom-4 left-4 z-20"
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              y: isHovered ? -5 : 0
            }}
          >
            <div className="bg-background/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
              <div className="text-2xl font-bold text-primary">
                {formatPrice(property.price)}
              </div>
              {property.square_feet && (
                <div className="text-xs text-muted-foreground">
                  ${Math.round(property.price / property.square_feet)}/sqft
                </div>
              )}
            </div>
          </motion.div>

          {/* Stats overlay */}
          {property.stats && (
            <motion.div
              className="absolute bottom-4 right-4 z-20"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-background/95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {formatNumber(property.stats.views)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {formatNumber(property.stats.saves)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Placeholder for property image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
              <Square className="h-10 w-10 text-primary" />
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          {/* Main property info */}
          <div className="p-6 space-y-4">
            <div>
              <motion.h3 
                className="font-semibold text-lg group-hover:text-accent transition-colors line-clamp-1 cursor-pointer"
                animate={{ x: isHovered ? 5 : 0 }}
              >
                {property.title}
              </motion.h3>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.address}</span>
              </div>
            </div>

            {/* Property details */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                  <span>{formatNumber(property.square_feet)} sqft</span>
                </div>
              )}
            </div>

            {/* Property type and amenities */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                {property.property_type}
              </Badge>
              {property.amenities?.slice(0, 2).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {property.amenities && property.amenities.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{property.amenities.length - 2} more
                </Badge>
              )}
            </div>
          </div>

          {/* Agent info */}
          {property.agent && (
            <>
              <Separator />
              <div className="p-6 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={property.agent.avatar} />
                      <AvatarFallback>
                        {property.agent.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{property.agent.name}</div>
                      <div className="text-xs text-muted-foreground">Listing Agent</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {property.agent.phone && (
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Phone className="w-4 h-4" />
                      </Button>
                    )}
                    {property.agent.email && (
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Mail className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Action buttons */}
          <div className="p-6 pt-4 flex gap-3">
            <Button 
              className="flex-1 shadow-button"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              variant="outline"
              size="sm" 
              className="px-4"
              onClick={() => onContact?.(property.id)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Tour
            </Button>
          </div>
        </CardContent>

        {/* Expandable details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-border/50"
            >
              <div className="p-6 space-y-4 bg-muted/20">
                {property.description && (
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {property.description}
                    </p>
                  </div>
                )}

                {property.amenities && (
                  <div>
                    <h4 className="font-medium mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-1">
                      {property.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {property.stats && (
                  <div>
                    <h4 className="font-medium mb-2">Market Info</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm font-medium">{formatNumber(property.stats.views)}</div>
                        <div className="text-xs text-muted-foreground">Views</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{formatNumber(property.stats.saves)}</div>
                        <div className="text-xs text-muted-foreground">Saves</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{property.stats.days_on_market}</div>
                        <div className="text-xs text-muted-foreground">Days</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};