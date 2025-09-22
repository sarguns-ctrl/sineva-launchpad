import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Business } from '@/hooks/useBusinesses';
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp, 
  Shield, 
  CheckCircle,
  MessageSquare,
  Heart,
  Phone,
  Mail
} from 'lucide-react';

interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  investmentBudget: string;
  visaRequirement: string;
}

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);

  const form = useForm<InquiryFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      investmentBudget: '',
      visaRequirement: '',
    },
  });

  useEffect(() => {
    if (!id) return;
    
    const fetchBusiness = async () => {
      try {
        setLoading(true);
        
        const { data, error: fetchError } = await supabase
          .from('businesses')
          .select(`
            *,
            business_categories (
              name,
              description
            )
          `)
          .eq('id', id)
          .eq('status', 'approved')
          .single();

        if (fetchError) throw fetchError;
        
        setBusiness(data);

        // Check if business is in user's favorites
        if (user) {
          const { data: favoriteData } = await supabase
            .from('business_favorites')
            .select('id')
            .eq('business_id', id)
            .eq('user_id', user.id)
            .single();
          
          setIsFavorite(!!favoriteData);
        }
      } catch (err) {
        console.error('Error fetching business:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch business');
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id, user]);

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to save favorites',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (isFavorite) {
        await supabase
          .from('business_favorites')
          .delete()
          .eq('business_id', id)
          .eq('user_id', user.id);
        
        setIsFavorite(false);
        toast({
          title: 'Removed from favorites',
          description: 'Business removed from your favorites',
        });
      } else {
        await supabase
          .from('business_favorites')
          .insert({ business_id: id, user_id: user.id });
        
        setIsFavorite(true);
        toast({
          title: 'Added to favorites',
          description: 'Business saved to your favorites',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update favorites',
        variant: 'destructive',
      });
    }
  };

  const onSubmitInquiry = async (data: InquiryFormData) => {
    if (!user || !business) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to submit an inquiry',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmittingInquiry(true);
      
      const { data: response, error } = await supabase.functions.invoke('business-inquiry', {
        body: {
          businessId: business.id,
          inquirerName: data.name,
          inquirerEmail: data.email,
          inquirerPhone: data.phone,
          message: data.message,
          investmentBudget: data.investmentBudget ? Number(data.investmentBudget) : null,
          visaRequirement: data.visaRequirement || null,
          businessName: business.business_name,
        },
      });

      if (error) throw error;

      toast({
        title: 'Inquiry Submitted',
        description: 'Your inquiry has been sent and you will receive a confirmation email shortly',
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit inquiry',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Business Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || 'The requested business could not be found.'}
            </p>
            <Button onClick={() => navigate('/businesses')}>
              Back to Businesses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/businesses')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Businesses
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{business.business_name}</h1>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {business.location_city}, {business.location_state}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {business.business_categories?.name || business.industry}
                      </Badge>
                      {business.featured && (
                        <Badge variant="default">Featured</Badge>
                      )}
                      {business.visa_eligible && (
                        <Badge variant="outline">Visa Eligible</Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    onClick={handleFavoriteToggle}
                  >
                    <Heart 
                      className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                </div>

                <div className="text-3xl font-bold text-primary mb-4">
                  {formatPrice(business.asking_price)}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {business.description}
                </p>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {business.annual_revenue && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Revenue:</span>
                        <span className="font-medium">{formatPrice(business.annual_revenue)}</span>
                      </div>
                    )}
                    
                    {business.annual_profit && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Profit:</span>
                        <span className="font-medium">{formatPrice(business.annual_profit)}</span>
                      </div>
                    )}
                    
                    {business.years_established && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Years Established:</span>
                        <span className="font-medium">{business.years_established} years</span>
                      </div>
                    )}
                    
                    {business.number_of_employees && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Employees:</span>
                        <span className="font-medium">{business.number_of_employees}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {business.roi_percentage && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ROI:</span>
                        <span className="font-medium">{business.roi_percentage}%</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Training Provided:</span>
                      <span className="font-medium">
                        {business.training_provided ? 'Yes' : 'No'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Financing Available:</span>
                      <span className="font-medium">
                        {business.financing_available ? 'Yes' : 'No'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Inventory Included:</span>
                      <span className="font-medium">
                        {business.inventory_included ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                {business.assets_included && business.assets_included.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Assets Included:</h4>
                    <div className="flex flex-wrap gap-2">
                      {business.assets_included.map((asset, index) => (
                        <Badge key={index} variant="outline">
                          {asset}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {business.visa_types && business.visa_types.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Eligible Visa Types:</h4>
                    <div className="flex flex-wrap gap-2">
                      {business.visa_types.map((visa, index) => (
                        <Badge key={index} variant="secondary">
                          {visa}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {business.reason_for_selling && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Reason for Selling:</h4>
                    <p className="text-muted-foreground">{business.reason_for_selling}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Inquiry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Contact Business Owner</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmitInquiry)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="investmentBudget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Investment Budget (Optional)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="500000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="visaRequirement"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Visa Requirement (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="E-2, EB-5, etc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="I'm interested in learning more about this business..."
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isSubmittingInquiry}
                        >
                          {isSubmittingInquiry ? 'Sending...' : 'Send Inquiry'}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-sm">Asking Price</span>
                  </div>
                  <span className="font-medium">{formatPrice(business.asking_price)}</span>
                </div>
                
                {business.annual_revenue && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-sm">Revenue</span>
                    </div>
                    <span className="font-medium">{formatPrice(business.annual_revenue)}</span>
                  </div>
                )}
                
                {business.years_established && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-sm">Established</span>
                    </div>
                    <span className="font-medium">{business.years_established} years</span>
                  </div>
                )}
                
                {business.number_of_employees && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="text-sm">Employees</span>
                    </div>
                    <span className="font-medium">{business.number_of_employees}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BusinessDetail;