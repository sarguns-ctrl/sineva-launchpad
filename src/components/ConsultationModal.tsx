import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketLocation?: string;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  marketLocation
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: '',
    investmentRange: '',
    message: ''
  });

  const consultationTypes = [
    'Market Analysis',
    'Investment Opportunities', 
    'Visa Program Guidance',
    'Property Selection',
    'Legal Requirements',
    'Financial Planning'
  ];

  const investmentRanges = [
    'Under $500K',
    '$500K - $1M',
    '$1M - $2M',
    '$2M - $5M',
    'Over $5M'
  ];

  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Here you would typically send the data to your backend
    console.log('Consultation request:', {
      ...formData,
      marketLocation,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Consultation Scheduled!",
      description: `We'll contact you within 24 hours to confirm your ${formData.consultationType.toLowerCase()} consultation for ${marketLocation || 'your selected market'}.`,
    });

    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      consultationType: '',
      investmentRange: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Calendar className="w-5 h-5 text-primary" />
            Schedule Market Consultation
            {marketLocation && (
              <span className="text-muted-foreground">- {marketLocation}</span>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Consultation Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Preferred Date *
              </Label>
              <Input
                id="preferredDate"
                type="date"
                required
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="preferredTime" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Preferred Time *
              </Label>
              <Select 
                value={formData.preferredTime}
                onValueChange={(value) => handleInputChange('preferredTime', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="consultationType" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Consultation Type *
              </Label>
              <Select 
                value={formData.consultationType}
                onValueChange={(value) => handleInputChange('consultationType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select consultation type" />
                </SelectTrigger>
                <SelectContent>
                  {consultationTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="investmentRange" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Investment Range
              </Label>
              <Select 
                value={formData.investmentRange}
                onValueChange={(value) => handleInputChange('investmentRange', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select investment range" />
                </SelectTrigger>
                <SelectContent>
                  {investmentRanges.map(range => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell us about your investment goals, timeline, or any specific questions you have..."
              rows={4}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Scheduling...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Consultation
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;