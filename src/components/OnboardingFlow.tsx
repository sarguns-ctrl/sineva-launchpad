import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  User, 
  Mail, 
  Building2,
  MapPin,
  Briefcase,
  Star,
  Target,
  Rocket
} from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useRole } from '@/hooks/useRole';
import { useAuth } from '@/hooks/useAuth';

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { userRole } = useRole();
  const { 
    onboardingSteps, 
    profileCompletion, 
    completeStep, 
    updateProfile,
    getCompletionPercentage 
  } = useOnboarding();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.full_name || '',
    bio: '',
    phone: '',
    location: '',
    interests: '',
    goals: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStepComplete = async () => {
    const currentStep = onboardingSteps[currentStepIndex];
    if (!currentStep) return;

    // Update profile data if we're on profile step
    if (currentStep.step_name.includes('Profile')) {
      await updateProfile(formData);
    }

    await completeStep(currentStep.id);

    // Move to next step or close if last step
    if (currentStepIndex < onboardingSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    if (currentStepIndex < onboardingSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const currentStep = onboardingSteps[currentStepIndex];
  const progress = getCompletionPercentage();

  if (!isOpen || !currentStep) return null;

  const renderStepContent = () => {
    switch (currentStep.step_name) {
      case 'Welcome & Profile Setup':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome to Sineva Brokerage! 🎉</h2>
              <p className="text-muted-foreground">Let's get your profile set up to personalize your experience.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="full_name"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a bit about yourself..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="City, State"
                      className="pl-10"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Email Verification':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
              <p className="text-muted-foreground mb-4">
                We sent a verification email to <strong>{user?.email}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Please check your email and click the verification link to continue.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 Don't see the email? Check your spam folder or request a new verification email.
              </p>
            </div>
          </div>
        );

      case 'Role Assignment':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Role</h2>
              <p className="text-muted-foreground mb-4">
                You've been assigned the role of <Badge variant="secondary" className="mx-1 capitalize">{userRole}</Badge>
              </p>
              <p className="text-sm text-muted-foreground">
                This determines your access level and available features on the platform.
              </p>
            </div>
            
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">What you can do:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {userRole === 'admin' && (
                  <>
                    <li>• Manage all users and system settings</li>
                    <li>• Access comprehensive analytics</li>
                    <li>• Configure platform features</li>
                  </>
                )}
                {userRole === 'agent' && (
                  <>
                    <li>• Manage property listings</li>
                    <li>• Track leads and commissions</li>
                    <li>• Communicate with clients</li>
                  </>
                )}
                {userRole === 'user' && (
                  <>
                    <li>• Browse and search properties</li>
                    <li>• Save favorites and searches</li>
                    <li>• Schedule property viewings</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        );

      case 'Platform Tour':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Platform Features</h2>
              <p className="text-muted-foreground mb-6">
                Let's explore what you can do on our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="text-left">
                <CardContent className="p-4">
                  <Building2 className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Property Search</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced filters and AI-powered recommendations
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardContent className="p-4">
                  <Target className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Investment Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Mortgage calculator and market insights
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'First Login Complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">You're All Set! 🚀</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to Sineva Brokerage! Your account is now ready to use.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="goals">Your Investment Goals (Optional)</Label>
                <Textarea
                  id="goals"
                  placeholder="What are you looking to achieve with real estate investment?"
                  value={formData.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <h2 className="text-xl font-bold">{currentStep.step_name}</h2>
            <p className="text-muted-foreground mt-2">Complete this onboarding step</p>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-2xl"
          >
            <Card className="bg-card/95 backdrop-blur-xl border-0 shadow-elegant">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">
                    Step {currentStepIndex + 1} of {onboardingSteps.length}
                  </Badge>
                  <Badge variant="secondary">{progress}% Complete</Badge>
                </div>
                <Progress value={progress} className="mb-4" />
              </CardHeader>

              <CardContent>
                <motion.div
                  key={currentStepIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>

                <div className="flex items-center justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStepIndex === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={handleSkip}>
                      Skip
                    </Button>
                    <Button onClick={handleStepComplete}>
                      {currentStepIndex === onboardingSteps.length - 1 ? 'Complete' : 'Continue'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingFlow;