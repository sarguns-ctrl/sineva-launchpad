import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { X, Gift, Clock, ArrowRight, CheckCircle, Star } from 'lucide-react';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitIntentPopup = ({ isOpen, onClose }: ExitIntentPopupProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add to newsletter/leads
      const { error } = await supabase
        .from('inquiries' as any)
        .insert({
          inquiry_type: 'consultation',
          subject: 'Free Investment Guide Request',
          message: `Name: ${name}\nEmail: ${email}\nSource: Exit Intent Popup\nRequested: Free Investment Guide`,
          contact_preference: 'email',
          priority: 'medium'
        });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "Your free investment guide is on its way to your inbox.",
      });

      // Auto close after success
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail('');
        setName('');
      }, 3000);

    } catch (error) {
      console.error('Error submitting email:', error);
      toast({
        title: "Error",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 rounded-xl border-0 shadow-2xl bg-card/95 backdrop-blur-xl">
        {isSuccess ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <DialogTitle className="text-2xl font-bold text-primary mb-2">
                Thank You!
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Your free investment guide is being sent to {email}
              </DialogDescription>
            </div>

            <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
              <p className="text-sm text-accent font-medium mb-2">
                What you'll receive:
              </p>
              <ul className="text-sm text-left space-y-1">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Complete investment guide (PDF)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Market analysis reports</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Visa requirement checklists</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-accent text-accent-foreground animate-pulse">
                  <Gift className="w-3 h-3 mr-1" />
                  Limited Time Offer
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 rounded-full hover:bg-muted"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center">
                <DialogTitle className="text-2xl font-bold text-primary mb-3">
                  Wait! Don't Miss Out
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Get our <span className="font-semibold text-accent">FREE Complete Investment Guide</span> for international investors
                </DialogDescription>
              </div>

              {/* Urgency Timer */}
              <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-4 border border-accent/20">
                <div className="flex items-center justify-center space-x-2 text-accent mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">This offer expires soon!</span>
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-sm font-bold text-foreground">
                    $497 Value - Yours FREE
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span>50+ Pages</span>
                    </span>
                    <span>•</span>
                    <span>Expert Insights</span>
                    <span>•</span>
                    <span>Step-by-Step Guide</span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="popup-name" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="popup-name"
                  type="text"
                  placeholder="Enter your first name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="popup-email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="popup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-primary shadow-accent text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Guide...
                  </>
                ) : (
                  <>
                    Get My FREE Guide Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  No spam. Unsubscribe anytime. Your privacy is protected.
                </p>
              </div>
            </form>

            {/* What's Included Preview */}
            <div className="mt-6 bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-3 text-center">
                What's Inside Your Free Guide:
              </p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Complete E-2 & EB-5 visa requirements</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Top investment markets analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Due diligence checklists</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>ROI calculation tools</span>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Hook to detect exit intent
export const useExitIntent = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top and hasn't been shown before
      if (e.clientY <= 0 && !hasShown) {
        // Add small delay to prevent accidental triggers
        timeout = setTimeout(() => {
          setShowExitIntent(true);
          setHasShown(true);
        }, 100);
      }
    };

    const handleMouseEnter = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };

    // Also trigger after user has been on page for a while (backup)
    const inactivityTimeout = setTimeout(() => {
      if (!hasShown) {
        setShowExitIntent(true);
        setHasShown(true);
      }
    }, 45000); // Show after 45 seconds of activity

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(timeout);
      clearTimeout(inactivityTimeout);
    };
  }, [hasShown]);

  const closeExitIntent = () => {
    setShowExitIntent(false);
  };

  return { showExitIntent, closeExitIntent };
};

export default ExitIntentPopup;