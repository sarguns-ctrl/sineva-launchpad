import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface OnboardingStep {
  id: string;
  step_name: string;
  step_order: number;
  is_completed: boolean;
  completed_at: string | null;
}

interface ProfileCompletionData {
  hasProfile: boolean;
  hasEmployeeProfile: boolean;
  profileCompleteness: number;
  missingFields: string[];
  requiredSteps: OnboardingStep[];
}

export const useOnboarding = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([]);
  const [profileCompletion, setProfileCompletion] = useState<ProfileCompletionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  useEffect(() => {
    if (user) {
      loadOnboardingData();
    }
  }, [user]);

  const loadOnboardingData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Load onboarding steps
      const { data: stepsData, error: stepsError } = await supabase
        .from('onboarding_steps')
        .select('*')
        .eq('user_id', user.id)
        .order('step_order');

      if (stepsError) throw stepsError;

      setOnboardingSteps(stepsData || []);

      // Check profile completion
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const { data: employeeData } = await supabase
        .from('employee_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Calculate profile completeness
      const profileFields = ['full_name', 'email'];
      const employeeFields = ['full_name', 'email', 'position', 'department_id'];
      
      const missingProfileFields = profileFields.filter(field => !profileData?.[field]);
      const missingEmployeeFields = employeeData ? 
        employeeFields.filter(field => !employeeData[field]) : employeeFields;

      const totalFields = profileFields.length + (employeeData ? employeeFields.length : 0);
      const completedFields = totalFields - (missingProfileFields.length + (employeeData ? missingEmployeeFields.length : 0));
      const completeness = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;

      setProfileCompletion({
        hasProfile: !!profileData,
        hasEmployeeProfile: !!employeeData,
        profileCompleteness: completeness,
        missingFields: [...missingProfileFields, ...missingEmployeeFields],
        requiredSteps: stepsData?.filter(step => !step.is_completed) || []
      });

      // Check if onboarding is complete
      const allStepsCompleted = (stepsData || []).every(step => step.is_completed);
      const profileComplete = completeness >= 80; // 80% completion threshold
      setIsOnboardingComplete(allStepsCompleted && profileComplete);

    } catch (error: any) {
      console.error('Error loading onboarding data:', error);
      toast({
        title: "Error",
        description: "Failed to load onboarding information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const completeStep = async (stepId: string) => {
    try {
      const { error } = await supabase
        .from('onboarding_steps')
        .update({ 
          is_completed: true, 
          completed_at: new Date().toISOString() 
        })
        .eq('id', stepId);

      if (error) throw error;

      // Update local state
      setOnboardingSteps(steps => 
        steps.map(step => 
          step.id === stepId 
            ? { ...step, is_completed: true, completed_at: new Date().toISOString() }
            : step
        )
      );

      // Check if this was the last step
      const updatedSteps = onboardingSteps.map(step => 
        step.id === stepId ? { ...step, is_completed: true } : step
      );
      
      if (updatedSteps.every(step => step.is_completed)) {
        toast({
          title: "Onboarding Complete! 🎉",
          description: "Welcome to the platform! You're all set up."
        });
        setIsOnboardingComplete(true);
      } else {
        toast({
          title: "Step Completed",
          description: "Great progress! Keep going to complete your onboarding."
        });
      }

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to complete step",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (profileData: any) => {
    if (!user) return { success: false, error: 'No user' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('user_id', user.id);

      if (error) throw error;

      // Reload onboarding data to recalculate completion
      await loadOnboardingData();

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully"
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const createDefaultOnboardingSteps = async () => {
    if (!user) return;

    const defaultSteps = [
      { step_name: 'Welcome & Profile Setup', step_order: 1 },
      { step_name: 'Email Verification', step_order: 2 },
      { step_name: 'Role Assignment', step_order: 3 },
      { step_name: 'Platform Tour', step_order: 4 },
      { step_name: 'First Login Complete', step_order: 5 }
    ];

    try {
      const { error } = await supabase
        .from('onboarding_steps')
        .insert(
          defaultSteps.map(step => ({
            user_id: user.id,
            ...step
          }))
        );

      if (error) throw error;

      await loadOnboardingData();
    } catch (error: any) {
      console.error('Error creating default onboarding steps:', error);
    }
  };

  const getNextStep = (): OnboardingStep | null => {
    return onboardingSteps.find(step => !step.is_completed) || null;
  };

  const getCompletionPercentage = (): number => {
    if (onboardingSteps.length === 0) return 0;
    const completedSteps = onboardingSteps.filter(step => step.is_completed).length;
    return Math.round((completedSteps / onboardingSteps.length) * 100);
  };

  return {
    onboardingSteps,
    profileCompletion,
    loading,
    isOnboardingComplete,
    completeStep,
    updateProfile,
    createDefaultOnboardingSteps,
    getNextStep,
    getCompletionPercentage,
    refetch: loadOnboardingData
  };
};