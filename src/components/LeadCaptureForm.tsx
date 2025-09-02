import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Globe, Phone, Mail, ArrowRight, CheckCircle } from 'lucide-react';

interface LeadFormData {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  investment_budget: string;
  property_interest: string;
  visa_type: string;
  timeline: string;
  message: string;
}

interface LeadCaptureFormProps {
  variant?: 'hero' | 'sidebar' | 'popup';
  title?: string;
  description?: string;
  onSuccess?: () => void;
}

const LeadCaptureForm = ({ 
  variant = 'hero', 
  title,
  description,
  onSuccess 
}: LeadCaptureFormProps) => {
  const [formData, setFormData] = useState<LeadFormData>({
    full_name: '',
    email: '',
    phone: '',
    country: '',
    investment_budget: '',
    property_interest: '',
    visa_type: '',
    timeline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create inquiry in database
      const { error } = await supabase
        .from('inquiries' as any)
        .insert({
          inquiry_type: 'consultation',
          subject: `${formData.property_interest} Investment Inquiry`,
          message: `
Name: ${formData.full_name}
Email: ${formData.email}
Phone: ${formData.phone}
Country: ${formData.country}
Investment Budget: ${formData.investment_budget}
Property Interest: ${formData.property_interest}
Visa Type: ${formData.visa_type}
Timeline: ${formData.timeline}

Message:
${formData.message}
          `.trim(),
          contact_preference: 'email',
          priority: formData.investment_budget.includes('$2M+') ? 'high' : 'medium'
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Consultation Request Sent!",
        description: "We'll contact you within 24 hours to discuss your investment goals.",
      });

      onSuccess?.();
      
      // Reset form after delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          country: '',
          investment_budget: '',
          property_interest: '',
          visa_type: '',
          timeline: '',
          message: ''
        });
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card className={`${variant === 'hero' ? 'bg-card/80 backdrop-blur-xl' : ''} border-0 shadow-elegant`}>
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
            <p className="text-muted-foreground">
              Your consultation request has been received. Our expert team will contact you within 24 hours.
            </p>
          </div>
          <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
            <p className="text-sm text-accent font-medium">
              What happens next?
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Initial consultation call</li>
              <li>• Personalized investment strategy</li>
              <li>• Property recommendations</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formTitle = title || (
    variant === 'hero' ? 'Get Your Free Investment Consultation' :
    variant === 'sidebar' ? 'Schedule Consultation' :
    'Speak with Our Experts'
  );

  const formDescription = description || 
    'Connect with our international real estate specialists for personalized investment guidance.';

  return (
    <Card className={`${variant === 'hero' ? 'bg-card/80 backdrop-blur-xl' : ''} border-0 shadow-elegant`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-primary mb-2">
              {formTitle}
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              {formDescription}
            </p>
          </div>
          {variant === 'hero' && (
            <Badge className="bg-accent text-accent-foreground">
              Free Consultation
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                type="text"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country/Region *</Label>
              <Input
                id="country"
                type="text"
                placeholder="e.g., Mexico, China, UAE"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Investment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="investment_budget">Investment Budget *</Label>
              <Select 
                value={formData.investment_budget} 
                onValueChange={(value) => handleInputChange('investment_budget', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$500K-$1M">$500K - $1M</SelectItem>
                  <SelectItem value="$1M-$2M">$1M - $2M</SelectItem>
                  <SelectItem value="$2M-$5M">$2M - $5M</SelectItem>
                  <SelectItem value="$5M+">$5M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="property_interest">Property Interest *</Label>
              <Select 
                value={formData.property_interest} 
                onValueChange={(value) => handleInputChange('property_interest', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Commercial Real Estate">Commercial Real Estate</SelectItem>
                  <SelectItem value="Residential Investment">Residential Investment</SelectItem>
                  <SelectItem value="Business Acquisition">Business Acquisition</SelectItem>
                  <SelectItem value="Mixed Portfolio">Mixed Portfolio</SelectItem>
                  <SelectItem value="Not Sure">Not Sure Yet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visa_type">Visa/Immigration Interest</Label>
              <Select 
                value={formData.visa_type} 
                onValueChange={(value) => handleInputChange('visa_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="E-2 Treaty Investor">E-2 Treaty Investor</SelectItem>
                  <SelectItem value="EB-5 Investor">EB-5 Investor</SelectItem>
                  <SelectItem value="L-1 Intracompany Transfer">L-1 Intracompany Transfer</SelectItem>
                  <SelectItem value="Investment Only">Investment Only (No Visa)</SelectItem>
                  <SelectItem value="Not Sure">Not Sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Investment Timeline</Label>
              <Select 
                value={formData.timeline} 
                onValueChange={(value) => handleInputChange('timeline', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Immediate (1-3 months)">Immediate (1-3 months)</SelectItem>
                  <SelectItem value="Short-term (3-6 months)">Short-term (3-6 months)</SelectItem>
                  <SelectItem value="Medium-term (6-12 months)">Medium-term (6-12 months)</SelectItem>
                  <SelectItem value="Long-term (12+ months)">Long-term (12+ months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your investment goals, preferred locations, or any specific questions..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full shadow-button bg-gradient-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Request...
              </>
            ) : (
              <>
                Schedule Free Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              * Required fields. We respect your privacy and will never share your information.
            </p>
          </div>
        </form>

        {/* Contact Options */}
        <div className="border-t pt-6">
          <p className="text-sm text-muted-foreground text-center mb-4">
            Prefer to speak directly? Contact us:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <a 
              href="tel:+15551234567" 
              className="flex items-center justify-center space-x-2 text-sm text-primary hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </a>
            <a 
              href="mailto:invest@sineva.com" 
              className="flex items-center justify-center space-x-2 text-sm text-primary hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>invest@sineva.com</span>
            </a>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span>Available 24/7</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;