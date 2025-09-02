import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useBusinessCategories } from '@/hooks/useBusinesses';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Building2, DollarSign, Users, Upload } from 'lucide-react';

interface BusinessFormData {
  businessName: string;
  categoryId: string;
  industry: string;
  locationCity: string;
  locationState: string;
  description: string;
  askingPrice: string;
  annualRevenue: string;
  annualProfit: string;
  yearsEstablished: string;
  numberOfEmployees: string;
  visaEligible: boolean;
  visaTypes: string;
  roiPercentage: string;
  assetsIncluded: string;
  inventoryIncluded: boolean;
  trainingProvided: boolean;
  financingAvailable: boolean;
  reasonForSelling: string;
}

const ListBusiness = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { categories, loading: categoriesLoading } = useBusinessCategories();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BusinessFormData>({
    defaultValues: {
      businessName: '',
      categoryId: '',
      industry: '',
      locationCity: '',
      locationState: '',
      description: '',
      askingPrice: '',
      annualRevenue: '',
      annualProfit: '',
      yearsEstablished: '',
      numberOfEmployees: '',
      visaEligible: false,
      visaTypes: '',
      roiPercentage: '',
      assetsIncluded: '',
      inventoryIncluded: false,
      trainingProvided: false,
      financingAvailable: false,
      reasonForSelling: '',
    },
  });

  // Redirect if not authenticated
  if (!user) {
    navigate('/auth');
    return null;
  }

  const onSubmit = async (data: BusinessFormData) => {
    try {
      setIsSubmitting(true);

      const businessData = {
        seller_id: user.id,
        category_id: data.categoryId || null,
        business_name: data.businessName,
        description: data.description,
        industry: data.industry,
        location_city: data.locationCity,
        location_state: data.locationState,
        asking_price: Number(data.askingPrice),
        annual_revenue: data.annualRevenue ? Number(data.annualRevenue) : null,
        annual_profit: data.annualProfit ? Number(data.annualProfit) : null,
        years_established: data.yearsEstablished ? Number(data.yearsEstablished) : null,
        number_of_employees: data.numberOfEmployees ? Number(data.numberOfEmployees) : null,
        visa_eligible: data.visaEligible,
        visa_types: data.visaTypes ? data.visaTypes.split(',').map(v => v.trim()) : null,
        roi_percentage: data.roiPercentage ? Number(data.roiPercentage) : null,
        assets_included: data.assetsIncluded ? data.assetsIncluded.split(',').map(a => a.trim()) : null,
        inventory_included: data.inventoryIncluded,
        training_provided: data.trainingProvided,
        financing_available: data.financingAvailable,
        reason_for_selling: data.reasonForSelling || null,
        status: 'pending', // Admin approval required
      };

      const { error } = await supabase
        .from('businesses')
        .insert(businessData);

      if (error) throw error;

      toast({
        title: 'Business Listed Successfully',
        description: 'Your business has been submitted for review. We\'ll contact you within 24-48 hours.',
      });

      navigate('/businesses');
    } catch (error) {
      console.error('Error submitting business:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit business listing. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/businesses')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Businesses
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">List Your Business for Sale</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with qualified investors and international entrepreneurs looking for established U.S. businesses
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      rules={{ required: 'Business name is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter business name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Category</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="industry"
                      rules={{ required: 'Industry is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Restaurant, Retail, Technology" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="locationCity"
                        rules={{ required: 'City is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="locationState"
                        rules={{ required: 'State is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="State" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {usStates.map((state) => (
                                  <SelectItem key={state} value={state}>
                                    {state}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    rules={{ required: 'Description is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide a detailed description of your business, including key selling points, target market, competitive advantages, and growth opportunities..."
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Financial Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Financial Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="askingPrice"
                      rules={{ required: 'Asking price is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asking Price (USD) *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="500000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="annualRevenue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Revenue (USD)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="annualProfit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Profit (USD)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="200000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="roiPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected ROI (%)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="15" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reasonForSelling"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason for Selling</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Retirement, New venture, Relocation" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Business Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Business Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="yearsEstablished"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years Established</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="numberOfEmployees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Employees</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="25" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="assetsIncluded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assets Included (comma-separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="Equipment, Furniture, Inventory, Vehicles, Real Estate" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="inventoryIncluded"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Inventory Included
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="trainingProvided"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Training Provided
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="financingAvailable"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Financing Available
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="visaEligible"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              Visa Eligible (E-2, EB-5)
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {form.watch('visaEligible') && (
                    <FormField
                      control={form.control}
                      name="visaTypes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Eligible Visa Types (comma-separated)</FormLabel>
                          <FormControl>
                            <Input placeholder="E-2, EB-5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>

              {/* Submit */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Your business listing will be reviewed by our team within 24-48 hours. 
                      Once approved, it will be visible to qualified investors.
                    </p>
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Business Listing'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ListBusiness;