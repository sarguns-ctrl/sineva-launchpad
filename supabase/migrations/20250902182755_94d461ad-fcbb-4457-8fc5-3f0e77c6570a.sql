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

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_email_recipients_campaign_id ON public.email_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_recipients_user_id ON public.email_recipients(user_id);

-- Add foreign key constraint (check if not exists first)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_email_recipients_campaign_id'
    ) THEN
        ALTER TABLE public.email_recipients 
        ADD CONSTRAINT fk_email_recipients_campaign_id 
        FOREIGN KEY (campaign_id) REFERENCES public.email_campaigns(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add email format validation constraint
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'check_email_format'
    ) THEN
        ALTER TABLE public.email_recipients 
        ADD CONSTRAINT check_email_format 
        CHECK (email_address ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
    END IF;
END $$;

-- Create missing indexes for better role-based queries performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_employee_profiles_user_id ON public.employee_profiles(user_id);

-- Add updated_at column if missing and trigger
DO $$
BEGIN
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'email_recipients' AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE public.email_recipients ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();
    END IF;
END $$;

-- Add trigger for updated_at
DROP TRIGGER IF EXISTS update_email_recipients_updated_at ON public.email_recipients;
CREATE TRIGGER update_email_recipients_updated_at
BEFORE UPDATE ON public.email_recipients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Ensure user_roles table has proper unique constraint
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'unique_user_role'
    ) THEN
        ALTER TABLE public.user_roles 
        ADD CONSTRAINT unique_user_role 
        UNIQUE (user_id, role);
    END IF;
END $$;