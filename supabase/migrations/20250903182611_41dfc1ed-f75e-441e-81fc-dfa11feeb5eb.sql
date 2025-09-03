-- Create system settings table
CREATE TABLE public.system_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL DEFAULT '{}',
  setting_type TEXT NOT NULL CHECK (setting_type IN ('string', 'number', 'boolean', 'json', 'array')),
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID NOT NULL
);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage system settings" 
ON public.system_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Everyone can view public settings" 
ON public.system_settings 
FOR SELECT 
USING (is_public = true);

-- Create analytics events table
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_name TEXT NOT NULL,
  user_id UUID,
  session_id TEXT,
  properties JSONB DEFAULT '{}',
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for analytics
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all analytics events" 
ON public.analytics_events 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

CREATE POLICY "System can insert analytics events" 
ON public.analytics_events 
FOR INSERT 
WITH CHECK (true);

-- Create business documents approval workflow
CREATE TABLE public.business_approvals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL,
  approval_type TEXT NOT NULL CHECK (approval_type IN ('listing', 'document', 'verification')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'requires_changes')),
  reviewer_id UUID,
  review_notes TEXT,
  approval_criteria JSONB DEFAULT '{}',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for business approvals
ALTER TABLE public.business_approvals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage business approvals" 
ON public.business_approvals 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

CREATE POLICY "Business owners can view their approvals" 
ON public.business_approvals 
FOR SELECT 
USING (business_id IN (SELECT id FROM businesses WHERE seller_id = auth.uid()));

-- Create webhook configurations table
CREATE TABLE public.webhook_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  event_types TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  secret_key TEXT,
  retry_count INTEGER NOT NULL DEFAULT 3,
  timeout_seconds INTEGER NOT NULL DEFAULT 30,
  last_triggered_at TIMESTAMP WITH TIME ZONE,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for webhooks
ALTER TABLE public.webhook_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage webhooks" 
ON public.webhook_configs 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create performance metrics view
CREATE VIEW public.property_performance AS
SELECT 
  p.id,
  p.title,
  p.price,
  p.status,
  p.created_at,
  COUNT(DISTINCT pf.user_id) as favorite_count,
  COUNT(DISTINCT a.id) as appointment_count,
  COUNT(DISTINCT l.id) as lead_count,
  AVG(CASE WHEN ac.commission_amount IS NOT NULL THEN ac.commission_amount END) as avg_commission
FROM properties p
LEFT JOIN property_favorites pf ON p.id = pf.property_id
LEFT JOIN appointments a ON p.id = a.property_id
LEFT JOIN leads l ON p.id = l.property_id
LEFT JOIN agent_commissions ac ON p.id = ac.property_id
GROUP BY p.id, p.title, p.price, p.status, p.created_at;

-- Create triggers for updated_at columns
CREATE TRIGGER update_system_settings_updated_at
  BEFORE UPDATE ON public.system_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_business_approvals_updated_at
  BEFORE UPDATE ON public.business_approvals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_webhook_configs_updated_at
  BEFORE UPDATE ON public.webhook_configs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default system settings
INSERT INTO public.system_settings (setting_key, setting_value, setting_type, description, category, is_public, updated_by) VALUES
('site_name', '"Grupo Sineva"', 'string', 'Website name displayed in headers', 'branding', true, (SELECT id FROM auth.users LIMIT 1)),
('support_email', '"support@gruposineva.com"', 'string', 'Primary support contact email', 'contact', true, (SELECT id FROM auth.users LIMIT 1)),
('max_file_size_mb', '10', 'number', 'Maximum file upload size in MB', 'uploads', false, (SELECT id FROM auth.users LIMIT 1)),
('enable_notifications', 'true', 'boolean', 'Enable system notifications', 'notifications', false, (SELECT id FROM auth.users LIMIT 1)),
('property_approval_required', 'true', 'boolean', 'Require admin approval for new properties', 'moderation', false, (SELECT id FROM auth.users LIMIT 1));