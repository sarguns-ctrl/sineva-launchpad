import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Lock } from 'lucide-react';

interface BusinessBuyerLeadFormProps {
  onSuccess?: () => void;
}

const BusinessBuyerLeadForm = ({ onSuccess }: BusinessBuyerLeadFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    investment_budget: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to be contacted to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('business-buyer-leads', {
        body: {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          investment_budget: formData.investment_budget,
        },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your information has been submitted. We'll contact you within 24 hours.",
      });

      if (onSuccess) {
        onSuccess();
      }

      // Redirect to thank you page
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold">Get Exclusive Texas Business Listings</h2>
        <p className="text-xl text-muted-foreground">
          Complete the form below and our team will send you tailored opportunities that match your investment goals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border-2">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name *</Label>
          <Input
            id="full_name"
            type="text"
            required
            value={formData.full_name}
            onChange={(e) => handleInputChange('full_name', e.target.value)}
            placeholder="John Smith"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="investment_budget">Investment Budget *</Label>
          <Select 
            value={formData.investment_budget} 
            onValueChange={(value) => handleInputChange('investment_budget', value)}
            required
          >
            <SelectTrigger id="investment_budget">
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100k-250k">$100K – $250K</SelectItem>
              <SelectItem value="250k-500k">$250K – $500K</SelectItem>
              <SelectItem value="500k+">$500K+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-start space-x-3 pt-4">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm leading-relaxed cursor-pointer"
          >
            I agree to be contacted by Sinevabrokerage in accordance with the Privacy Policy.
          </label>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting || !agreedToTerms}
        >
          {isSubmitting ? 'Submitting...' : '✅ Send Me Business Listings'}
        </Button>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4 border-t">
          <Lock className="w-4 h-4" />
          <p>Your information is 100% confidential. We never share your details publicly.</p>
        </div>
      </form>
    </div>
  );
};

export default BusinessBuyerLeadForm;