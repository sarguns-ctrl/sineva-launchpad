-- Fix critical RLS policy missing for email_recipients table
-- This table should only be accessible by admins and HR for managing email campaigns

-- Add RLS policies for email_recipients table
CREATE POLICY "Admins and HR can manage email recipients" 
ON public.email_recipients 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- Create policy for email campaign system to insert recipients automatically
CREATE POLICY "System can manage email recipients for campaigns" 
ON public.email_recipients 
FOR INSERT 
WITH CHECK (true);

-- Ensure proper foreign key constraints and indexes for better security and performance
-- Add index on campaign_id for better query performance
CREATE INDEX IF NOT EXISTS idx_email_recipients_campaign_id ON public.email_recipients(campaign_id);

-- Add index on user_id for better query performance  
CREATE INDEX IF NOT EXISTS idx_email_recipients_user_id ON public.email_recipients(user_id);

-- Ensure email_campaigns table has proper foreign key to email_recipients
ALTER TABLE public.email_recipients 
ADD CONSTRAINT IF NOT EXISTS fk_email_recipients_campaign_id 
FOREIGN KEY (campaign_id) REFERENCES public.email_campaigns(id) ON DELETE CASCADE;

-- Add constraint to ensure email format is valid
ALTER TABLE public.email_recipients 
ADD CONSTRAINT IF NOT EXISTS check_email_format 
CHECK (email_address ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Create missing indexes for better role-based queries performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_employee_profiles_user_id ON public.employee_profiles(user_id);

-- Add updated_at trigger for email_recipients for consistency
CREATE TRIGGER IF NOT EXISTS update_email_recipients_updated_at
BEFORE UPDATE ON public.email_recipients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Ensure user_roles table has proper constraints to prevent duplicate role assignments
ALTER TABLE public.user_roles 
ADD CONSTRAINT IF NOT EXISTS unique_user_role 
UNIQUE (user_id, role);

-- Add constraint to ensure assigned_by is valid user (referential integrity)
ALTER TABLE public.user_roles 
ADD CONSTRAINT IF NOT EXISTS fk_user_roles_assigned_by 
FOREIGN KEY (assigned_by) REFERENCES auth.users(id);

-- Update existing users without roles to have 'user' role by default
INSERT INTO public.user_roles (user_id, role, assigned_by, assigned_at)
SELECT 
    au.id, 
    'user'::app_role, 
    au.id, -- self-assigned for existing users
    now()
FROM auth.users au
LEFT JOIN public.user_roles ur ON au.id = ur.user_id
WHERE ur.user_id IS NULL
ON CONFLICT (user_id, role) DO NOTHING;