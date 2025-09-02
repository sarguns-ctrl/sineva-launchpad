import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useRole, UserRole } from '@/hooks/useRole';
import { useOnboarding } from '@/hooks/useOnboarding';
import OnboardingFlow from './OnboardingFlow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  requireEmailVerification?: boolean;
  requireOnboarding?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requireEmailVerification = false,
  requireOnboarding = false
}) => {
  const { user, loading: authLoading, resendVerification } = useAuth();
  const { userRole, hasRole, loading: roleLoading } = useRole();
  const { isOnboardingComplete, loading: onboardingLoading } = useOnboarding();
  const location = useLocation();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = React.useState(false);

  // Show loading while checking auth state
  if (authLoading || roleLoading || onboardingLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <div className="w-8 h-8 bg-primary/20 rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check email verification
  if (requireEmailVerification && !user.email_confirmed_at) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
            <CardTitle>Email Verification Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Please verify your email address to continue.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your email at <strong>{user.email}</strong> for a verification link.
            </p>
            <Button onClick={() => resendVerification()} variant="outline">
              Resend Verification Email
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check role requirements
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-muted-foreground">
              Required role: <strong>{Array.isArray(requiredRole) ? requiredRole.join(' or ') : requiredRole}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Your role: <strong>{userRole || 'Not assigned'}</strong>
            </p>
            <Button onClick={() => navigate(-1)} variant="outline">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check onboarding requirements
  if (requireOnboarding && !isOnboardingComplete) {
    return (
      <>
        <OnboardingFlow 
          isOpen={showOnboarding || !isOnboardingComplete}
          onClose={() => {
            setShowOnboarding(false);
            // Optionally redirect after onboarding
          }}
        />
        {!showOnboarding && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle>Complete Your Setup</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Please complete your account setup to continue.
                </p>
                <Button onClick={() => setShowOnboarding(true)}>
                  Continue Setup
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
};