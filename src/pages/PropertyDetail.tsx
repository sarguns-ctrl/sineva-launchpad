import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Heart,
  Share2,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle,
  Star,
  Building2,
  Home,
  Briefcase,
  Globe,
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  Loader2
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AnimatedCounter from "@/components/AnimatedCounter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('properties')
          .select(`
            *,
            agent:employee_profiles(id, full_name, email, position)
          `)
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;

        if (!data) {
          setError(true);
          toast({
            title: "Property Not Found",
            description: "The property you're looking for doesn't exist.",
            variant: "destructive",
          });
          return;
        }

        setProperty(data);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError(true);
        toast({
          title: "Error",
          description: "Failed to load property details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Loading property details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-bold text-foreground">Property Not Found</h2>
            <p className="text-muted-foreground">The property you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/properties')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const {
    title,
    property_type,
    city,
    state,
    address,
    price,
    square_feet,
    bedrooms,
    bathrooms,
    year_built,
    description,
    property_features,
    images,
    listing_type,
    status,
    featured,
    virtual_tour_url,
    annual_revenue,
    employee_count,
    agent
  } = property;

  const fullAddress = `${address}, ${city}, ${state}`;
  const visaEligible = ["E-2", "EB-5"]; // Could come from property data
  const features = property_features || [];
  const propertyImages = images || [];
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyIcon = (type: string) => {
    const lowerType = type?.toLowerCase();
    if (lowerType === 'business') return Briefcase;
    if (lowerType === 'commercial') return Building2;
    return Home;
  };

  const PropertyIcon = getPropertyIcon(property_type);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-4 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" size="sm" onClick={() => navigate('/properties')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
            <Badge className="bg-accent text-accent-foreground">
              {featured ? 'Featured' : listing_type === 'sale' ? 'For Sale' : 'For Rent'}
            </Badge>
            {status && (
              <Badge variant={status === 'active' ? 'default' : 'secondary'}>
                {status}
              </Badge>
            )}
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-muted-foreground">4.8 (127 views)</span>
            </div>
          </div>
          
          <div 
            ref={headerRef}
            className={`transition-all duration-1000 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Property Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <PropertyIcon className="h-5 w-5" />
                    <span className="capitalize">{property_type} Property</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
                    {title}
                  </h1>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{fullAddress}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {square_feet && (
                    <div className="flex items-center space-x-2">
                      <Square className="h-4 w-4" />
                      <span>{square_feet.toLocaleString()} sq ft</span>
                    </div>
                  )}
                  {bedrooms && (
                    <div className="flex items-center space-x-2">
                      <Bed className="h-4 w-4" />
                      <span>{bedrooms} beds</span>
                    </div>
                  )}
                  {bathrooms && (
                    <div className="flex items-center space-x-2">
                      <Bath className="h-4 w-4" />
                      <span>{bathrooms} baths</span>
                    </div>
                  )}
                  {year_built && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Built {year_built}</span>
                    </div>
                  )}
                  {annual_revenue && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span>{formatCurrency(annual_revenue)} revenue</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Actions */}
              <div className="space-y-6">
                <Card className="p-6 shadow-elegant">
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-primary font-playfair">
                      <AnimatedCounter end={price} prefix="$" />
                    </div>
                    <div className="space-y-2">
                      <Button size="lg" className="w-full shadow-button">
                        Schedule Viewing
                      </Button>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Heart className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Visa Eligibility */}
                <Card className="p-6 shadow-card">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    Visa Eligible
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {visaEligible.map((visa, idx) => (
                      <Badge key={idx} variant="secondary">
                        {visa}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Gallery */}
      <section className="pt-4 pb-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {propertyImages.length > 0 ? (
              propertyImages.map((image: string, index: number) => (
                <div key={index} className="aspect-video rounded-lg relative overflow-hidden group cursor-pointer">
                  <img 
                    src={image} 
                    alt={`${title} - Image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-primary hidden items-center justify-center"
                  >
                    <PropertyIcon className="h-12 w-12 text-white/30" />
                  </div>
                  {index === 0 && virtual_tour_url && (
                    <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                      Virtual Tour Available
                    </Badge>
                  )}
                </div>
              ))
            ) : (
              <div className="aspect-video bg-gradient-primary rounded-lg flex items-center justify-center col-span-full">
                <PropertyIcon className="h-12 w-12 text-white/30" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-playfair">Property Description</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {description || 'No description available for this property.'}
                </p>
              </div>

              {/* Key Features */}
              {features.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 font-playfair">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Details */}
              <div>
                <h3 className="text-2xl font-bold mb-6 font-playfair">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {square_feet && (
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <span className="text-muted-foreground">Square Footage</span>
                      <span className="font-semibold">{square_feet.toLocaleString()} sq ft</span>
                    </div>
                  )}
                  {bedrooms && (
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <span className="text-muted-foreground">Bedrooms</span>
                      <span className="font-semibold">{bedrooms}</span>
                    </div>
                  )}
                  {bathrooms && (
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <span className="text-muted-foreground">Bathrooms</span>
                      <span className="font-semibold">{bathrooms}</span>
                    </div>
                  )}
                  {year_built && (
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <span className="text-muted-foreground">Year Built</span>
                      <span className="font-semibold">{year_built}</span>
                    </div>
                  )}
                  {annual_revenue && (
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <span className="text-muted-foreground">Annual Revenue</span>
                      <span className="font-semibold">{formatCurrency(annual_revenue)}</span>
                    </div>
                  )}
                  {employee_count && (
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <span className="text-muted-foreground">Employees</span>
                      <span className="font-semibold">{employee_count}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Agent Contact */}
              {agent && (
                <Card className="p-6 shadow-elegant">
                  <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{agent.full_name || 'Grupo Sineva Agent'}</div>
                        <div className="text-sm text-muted-foreground">{agent.position || 'Real Estate Specialist'}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>+1 (832) 289-6124</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-primary" />
                        <span>{agent.email || 'contact@sinevagrupo.com'}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full" onClick={() => window.open('tel:+18322896124')}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Agent
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => window.open(`mailto:${agent.email || 'contact@sinevagrupo.com'}`)}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Contact Info Card */}
              {!agent && (
                <Card className="p-6 shadow-elegant">
                  <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>+1 (832) 289-6124</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-primary" />
                        <span>contact@sinevagrupo.com</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>5718 Westheimer Rd, Suite 1000, Houston, TX 77057</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full" onClick={() => window.open('tel:+18322896124')}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Us
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => window.open('mailto:contact@sinevagrupo.com')}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Quick Stats */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold mb-4">Property Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property ID</span>
                    <span className="font-medium text-xs">#{id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium capitalize">{status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Listing Type</span>
                    <span className="font-medium capitalize">{listing_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Type</span>
                    <span className="font-medium capitalize">{property_type}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyDetail;