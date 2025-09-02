-- Phase 6: Advanced Platform Features Database Schema

-- Analytics and reporting tables
CREATE TABLE public.property_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  inquiries INTEGER DEFAULT 0,
  favorites INTEGER DEFAULT 0,
  virtual_tours INTEGER DEFAULT 0,
  contact_agent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(property_id, date)
);

-- User activity tracking
CREATE TABLE public.user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- 'search', 'view_property', 'favorite', 'message', 'appointment'
  activity_data JSONB,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- System notifications and alerts
CREATE TABLE public.system_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_type TEXT NOT NULL, -- 'system_alert', 'maintenance', 'feature_update'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  target_audience TEXT DEFAULT 'all', -- 'all', 'agents', 'users', 'admins'
  priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'critical'
  start_date TIMESTAMPTZ DEFAULT now(),
  end_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Lead management and tracking
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  agent_id UUID REFERENCES public.employee_profiles(id),
  property_id UUID REFERENCES public.properties(id),
  lead_source TEXT NOT NULL, -- 'website', 'referral', 'social_media', 'advertisement'
  lead_status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'lost'
  contact_info JSONB NOT NULL, -- name, email, phone, preferences
  notes TEXT,
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  last_contact_at TIMESTAMPTZ,
  conversion_date TIMESTAMPTZ,
  estimated_value DECIMAL(12,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Email campaigns and automation
CREATE TABLE public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_name TEXT NOT NULL,
  campaign_type TEXT NOT NULL, -- 'newsletter', 'property_alert', 'follow_up', 'promotional'
  subject_line TEXT NOT NULL,
  email_content TEXT NOT NULL,
  target_criteria JSONB, -- filtering criteria for recipients
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft', -- 'draft', 'scheduled', 'sending', 'sent', 'failed'
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Email campaign recipients and tracking
CREATE TABLE public.email_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  email_address TEXT NOT NULL,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  bounced BOOLEAN DEFAULT false,
  bounce_reason TEXT
);

-- Property recommendations and AI insights
CREATE TABLE public.property_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  recommendation_score DECIMAL(3,2), -- 0.00 to 1.00
  recommendation_reasons JSONB, -- array of reasons for recommendation
  algorithm_version TEXT DEFAULT '1.0',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Market insights and trends
CREATE TABLE public.market_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL, -- city, state, or zip code
  insight_type TEXT NOT NULL, -- 'price_trend', 'inventory_level', 'market_forecast'
  time_period TEXT NOT NULL, -- 'monthly', 'quarterly', 'yearly'
  data_points JSONB NOT NULL, -- chart data, statistics, etc.
  insight_summary TEXT,
  data_source TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- System settings and configuration
CREATE TABLE public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  setting_type TEXT NOT NULL, -- 'string', 'number', 'boolean', 'json'
  description TEXT,
  is_public BOOLEAN DEFAULT false, -- whether setting is visible to non-admins
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Agent commissions and performance tracking
CREATE TABLE public.agent_commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.employee_profiles(id),
  property_id UUID REFERENCES public.properties(id),
  client_id UUID REFERENCES auth.users(id),
  transaction_type TEXT NOT NULL, -- 'sale', 'lease', 'rental'
  sale_price DECIMAL(12,2) NOT NULL,
  commission_rate DECIMAL(5,4) NOT NULL, -- percentage as decimal (e.g., 0.0250 for 2.50%)
  commission_amount DECIMAL(12,2) NOT NULL,
  transaction_date DATE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'paid'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Property comparison history
CREATE TABLE public.property_comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_ids UUID[] NOT NULL,
  comparison_criteria JSONB, -- selected comparison fields
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.property_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_comparisons ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Property analytics - viewable by property agents and admins
CREATE POLICY "Agents can view their property analytics" ON public.property_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.properties p 
      JOIN public.employee_profiles ep ON p.agent_id = ep.id
      WHERE p.id = property_analytics.property_id AND ep.user_id = auth.uid()
    ) OR
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
  );

-- User activity - users can view their own activity, admins can view all
CREATE POLICY "Users can view their own activity" ON public.user_activity
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all user activity" ON public.user_activity
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert user activity" ON public.user_activity
  FOR INSERT WITH CHECK (true);

-- System notifications - everyone can view active notifications
CREATE POLICY "Everyone can view active system notifications" ON public.system_notifications
  FOR SELECT USING (is_active = true AND (start_date <= now()) AND (end_date IS NULL OR end_date >= now()));

-- Leads - agents can manage their leads, admins can manage all
CREATE POLICY "Agents can manage their leads" ON public.leads
  FOR ALL USING (
    agent_id IN (SELECT id FROM public.employee_profiles WHERE user_id = auth.uid()) OR
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
  );

-- Email campaigns - only admins and HR can manage
CREATE POLICY "Admin can manage email campaigns" ON public.email_campaigns
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- Property recommendations - users can view their own recommendations
CREATE POLICY "Users can view their recommendations" ON public.property_recommendations
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can manage recommendations" ON public.property_recommendations
  FOR ALL WITH CHECK (true);

-- Market insights - everyone can view
CREATE POLICY "Everyone can view market insights" ON public.market_insights
  FOR SELECT USING (true);

-- System settings - public settings viewable by all, all settings by admins
CREATE POLICY "Public settings viewable by all" ON public.system_settings
  FOR SELECT USING (is_public = true);

CREATE POLICY "Admins can manage all settings" ON public.system_settings
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Agent commissions - agents can view their own, admins can manage all
CREATE POLICY "Agents can view their commissions" ON public.agent_commissions
  FOR SELECT USING (
    agent_id IN (SELECT id FROM public.employee_profiles WHERE user_id = auth.uid()) OR
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
  );

CREATE POLICY "Admins can manage commissions" ON public.agent_commissions
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- Property comparisons - users can manage their own comparisons
CREATE POLICY "Users can manage their comparisons" ON public.property_comparisons
  FOR ALL USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_property_analytics_property_date ON public.property_analytics(property_id, date);
CREATE INDEX idx_user_activity_user_type ON public.user_activity(user_id, activity_type);
CREATE INDEX idx_user_activity_created_at ON public.user_activity(created_at);
CREATE INDEX idx_leads_agent_status ON public.leads(agent_id, lead_status);
CREATE INDEX idx_leads_created_at ON public.leads(created_at);
CREATE INDEX idx_email_recipients_campaign ON public.email_recipients(campaign_id);
CREATE INDEX idx_property_recommendations_user ON public.property_recommendations(user_id, recommendation_score);
CREATE INDEX idx_market_insights_location_type ON public.market_insights(location, insight_type);
CREATE INDEX idx_agent_commissions_agent_date ON public.agent_commissions(agent_id, transaction_date);

-- Update triggers
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_campaigns_updated_at
  BEFORE UPDATE ON public.email_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_market_insights_updated_at
  BEFORE UPDATE ON public.market_insights
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at
  BEFORE UPDATE ON public.system_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agent_commissions_updated_at
  BEFORE UPDATE ON public.agent_commissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default system settings
INSERT INTO public.system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('platform_name', '"Premium Real Estate Platform"', 'string', 'Platform display name', true),
('contact_email', '"support@platform.com"', 'string', 'Contact email for support', true),
('maintenance_mode', 'false', 'boolean', 'Enable maintenance mode', false),
('max_property_images', '20', 'number', 'Maximum images per property', false),
('commission_rate_default', '0.025', 'number', 'Default commission rate (2.5%)', false),
('email_notifications_enabled', 'true', 'boolean', 'Enable email notifications', false);