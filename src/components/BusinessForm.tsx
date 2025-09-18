import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useBusinessCategories } from '@/hooks/useBusinesses';
import { Building2, DollarSign, Users, Upload, X, Image } from 'lucide-react';

interface Business {
  id?: string;
  business_name: string;
  category_id?: string;
  industry: string;
  location_city: string;
  location_state: string;
  description: string;
  asking_price: number;
  annual_revenue?: number;
  annual_profit?: number;
  years_established?: number;
  number_of_employees?: number;
  visa_eligible: boolean;
  visa_types?: string[];
  roi_percentage?: number;
  assets_included?: string[];
  inventory_included: boolean;
  training_provided: boolean;
  financing_available: boolean;
  reason_for_selling?: string;
  images?: string[];
  status?: string;
}

interface BusinessFormProps {
  business?: Business | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({ business, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<Business>({
    business_name: business?.business_name || '',
    category_id: business?.category_id || '',
    industry: business?.industry || '',
    location_city: business?.location_city || '',
    location_state: business?.location_state || '',
    description: business?.description || '',
    asking_price: business?.asking_price || 0,
    annual_revenue: business?.annual_revenue || undefined,
    annual_profit: business?.annual_profit || undefined,
    years_established: business?.years_established || undefined,
    number_of_employees: business?.number_of_employees || undefined,
    visa_eligible: business?.visa_eligible || false,
    visa_types: business?.visa_types || [],
    roi_percentage: business?.roi_percentage || undefined,
    assets_included: business?.assets_included || [],
    inventory_included: business?.inventory_included || false,
    training_provided: business?.training_provided || false,
    financing_available: business?.financing_available || false,
    reason_for_selling: business?.reason_for_selling || '',
    images: business?.images || [],
  });

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { categories } = useBusinessCategories();

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (files: FileList) => {
    setUploading(true);
    const uploadedImages = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select only image files",
          variant: "destructive",
        });
        continue;
      }

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `business-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);

        uploadedImages.push(publicUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Error",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
      }
    }

    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...uploadedImages],
    }));
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleArrayFieldChange = (field: 'visa_types' | 'assets_included', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const businessData = {
        seller_id: user.id,
        business_name: formData.business_name,
        category_id: formData.category_id || null,
        industry: formData.industry,
        location_city: formData.location_city,
        location_state: formData.location_state,
        description: formData.description,
        asking_price: formData.asking_price,
        annual_revenue: formData.annual_revenue || null,
        annual_profit: formData.annual_profit || null,
        years_established: formData.years_established || null,
        number_of_employees: formData.number_of_employees || null,
        visa_eligible: formData.visa_eligible,
        visa_types: formData.visa_types,
        roi_percentage: formData.roi_percentage || null,
        assets_included: formData.assets_included,
        inventory_included: formData.inventory_included,
        training_provided: formData.training_provided,
        financing_available: formData.financing_available,
        reason_for_selling: formData.reason_for_selling || null,
        images: formData.images || [],
        status: business ? formData.status : 'pending',
      };

      let error;
      if (business) {
        const { error: updateError } = await supabase
          .from('businesses')
          .update(businessData)
          .eq('id', business.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('businesses')
          .insert(businessData);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: business ? "Business updated successfully" : "Business listed successfully",
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error saving business:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business_name">Business Name *</Label>
              <Input
                id="business_name"
                value={formData.business_name}
                onChange={(e) => handleInputChange('business_name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="category_id">Category</Label>
              <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="location_city">City *</Label>
              <Input
                id="location_city"
                value={formData.location_city}
                onChange={(e) => handleInputChange('location_city', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="location_state">State *</Label>
              <Select value={formData.location_state} onValueChange={(value) => handleInputChange('location_state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {usStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              required
            />
          </div>
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
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="asking_price">Asking Price (USD) *</Label>
              <Input
                id="asking_price"
                type="number"
                value={formData.asking_price}
                onChange={(e) => handleInputChange('asking_price', Number(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="annual_revenue">Annual Revenue (USD)</Label>
              <Input
                id="annual_revenue"
                type="number"
                value={formData.annual_revenue || ''}
                onChange={(e) => handleInputChange('annual_revenue', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div>
              <Label htmlFor="annual_profit">Annual Profit (USD)</Label>
              <Input
                id="annual_profit"
                type="number"
                value={formData.annual_profit || ''}
                onChange={(e) => handleInputChange('annual_profit', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="roi_percentage">Expected ROI (%)</Label>
              <Input
                id="roi_percentage"
                type="number"
                value={formData.roi_percentage || ''}
                onChange={(e) => handleInputChange('roi_percentage', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div>
              <Label htmlFor="reason_for_selling">Reason for Selling</Label>
              <Input
                id="reason_for_selling"
                value={formData.reason_for_selling || ''}
                onChange={(e) => handleInputChange('reason_for_selling', e.target.value)}
                placeholder="e.g., Retirement, New venture"
              />
            </div>
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
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="years_established">Years Established</Label>
              <Input
                id="years_established"
                type="number"
                value={formData.years_established || ''}
                onChange={(e) => handleInputChange('years_established', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div>
              <Label htmlFor="number_of_employees">Number of Employees</Label>
              <Input
                id="number_of_employees"
                type="number"
                value={formData.number_of_employees || ''}
                onChange={(e) => handleInputChange('number_of_employees', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="assets_included">Assets Included (comma-separated)</Label>
            <Input
              id="assets_included"
              value={formData.assets_included?.join(', ') || ''}
              onChange={(e) => handleArrayFieldChange('assets_included', e.target.value)}
              placeholder="Equipment, Furniture, Inventory"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inventory_included"
                  checked={formData.inventory_included}
                  onCheckedChange={(checked) => handleInputChange('inventory_included', checked)}
                />
                <Label htmlFor="inventory_included">Inventory Included</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="training_provided"
                  checked={formData.training_provided}
                  onCheckedChange={(checked) => handleInputChange('training_provided', checked)}
                />
                <Label htmlFor="training_provided">Training Provided</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="financing_available"
                  checked={formData.financing_available}
                  onCheckedChange={(checked) => handleInputChange('financing_available', checked)}
                />
                <Label htmlFor="financing_available">Financing Available</Label>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="visa_eligible"
                  checked={formData.visa_eligible}
                  onCheckedChange={(checked) => handleInputChange('visa_eligible', checked)}
                />
                <Label htmlFor="visa_eligible">Visa Eligible</Label>
              </div>
              {formData.visa_eligible && (
                <div>
                  <Label htmlFor="visa_types">Visa Types (comma-separated)</Label>
                  <Input
                    id="visa_types"
                    value={formData.visa_types?.join(', ') || ''}
                    onChange={(e) => handleArrayFieldChange('visa_types', e.target.value)}
                    placeholder="E-2, EB-5, L-1"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Images */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Business Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Images'}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Select multiple images (JPG, PNG, GIF)
            </p>
          </div>

          {formData.images && formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Business ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : business ? 'Update Business' : 'Save Business'}
        </Button>
      </div>
    </form>
  );
};