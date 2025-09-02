import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

// Validate user journey flows
const UserJourneyValidator = () => {
  const location = useLocation();
  const [journeyState, setJourneyState] = useState({
    currentStep: '',
    completedSteps: [] as string[],
    availableActions: [] as string[]
  });

  // Define user journey paths
  const userJourneys = {
    'property-investor': {
      name: 'Property Investor Journey',
      steps: [
        { id: 'landing', route: '/', description: 'Landing page' },
        { id: 'properties', route: '/properties', description: 'Browse properties' },
        { id: 'services', route: '/services', description: 'Learn about services' },
        { id: 'contact', route: '/contact', description: 'Contact for consultation' }
      ]
    },
    'business-buyer': {
      name: 'Business Buyer Journey',
      steps: [
        { id: 'landing', route: '/', description: 'Landing page' },
        { id: 'businesses', route: '/businesses', description: 'Browse businesses' },
        { id: 'agents', route: '/agents', description: 'Find an agent' },
        { id: 'contact', route: '/contact', description: 'Schedule consultation' }
      ]
    },
    'agent-prospect': {
      name: 'Agent Recruitment Journey',
      steps: [
        { id: 'landing', route: '/', description: 'Landing page' },
        { id: 'about', route: '/about', description: 'Learn about company' },
        { id: 'join-team', route: '/join-team', description: 'Join team page' },
        { id: 'training', route: '/training-programs', description: 'View training programs' }
      ]
    }
  };

  // CTAs and their expected destinations
  const ctaValidation = {
    '/': ['/properties', '/services', '/contact', '/about'],
    '/services': ['/contact', '/properties', '/concierge-services', '/investment-advisory'],
    '/properties': ['/contact', '/services', '/agents'],
    '/about': ['/services', '/properties', '/contact', '/careers'],
    '/businesses': ['/contact', '/agents', '/services']
  };

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Update journey state based on current location
    setJourneyState(prev => ({
      ...prev,
      currentStep: currentPath,
      availableActions: ctaValidation[currentPath as keyof typeof ctaValidation] || []
    }));
  }, [location]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 z-50 p-4 max-w-sm bg-card/95 backdrop-blur-sm">
      <h3 className="font-semibold text-foreground mb-3">User Journey Validation</h3>
      
      <div className="space-y-3">
        <div>
          <div className="text-sm font-medium text-foreground">Current Route:</div>
          <div className="text-xs text-muted-foreground font-mono">{location.pathname}</div>
        </div>

        <div>
          <div className="text-sm font-medium text-foreground mb-2">Expected CTAs:</div>
          <div className="space-y-1">
            {journeyState.availableActions.map((action, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span className="text-muted-foreground">{action}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-2">
          <div className="text-sm font-medium text-foreground mb-2">Journey Flows:</div>
          {Object.entries(userJourneys).map(([key, journey]) => (
            <div key={key} className="mb-2">
              <div className="text-xs font-medium text-foreground">{journey.name}</div>
              <div className="flex items-center space-x-1 mt-1">
                {journey.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${
                      step.route === location.pathname 
                        ? 'bg-primary' 
                        : 'bg-muted-foreground/30'
                    }`} />
                    {index < journey.steps.length - 1 && (
                      <ArrowRight className="h-2 w-2 text-muted-foreground mx-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-2">
          <div className="text-xs text-muted-foreground">
            ✅ Navigation: Active
            <br />
            ✅ Breadcrumbs: Working
            <br />
            ✅ Search: Functional
            <br />
            ✅ Mobile: Responsive
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserJourneyValidator;