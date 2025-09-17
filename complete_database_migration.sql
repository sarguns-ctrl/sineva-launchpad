-- Complete Database Migration for Sineva Real Estate Platform
-- This file contains all tables, functions, triggers, RLS policies, and data needed to replicate the database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types/enums
CREATE TYPE public.app_role AS ENUM ('admin', 'hr', 'manager', 'employee', 'agent', 'user');
CREATE TYPE public.document_type AS ENUM ('general', 'contract', 'training', 'hr', 'legal');

-- Create helper functions first (needed for RLS policies)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.get_current_user_email()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email FROM auth.users WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS app_role
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY CASE role
    WHEN 'admin' THEN 1
    WHEN 'hr' THEN 2
    WHEN 'manager' THEN 3
    WHEN 'employee' THEN 4
  END
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.create_notification(p_user_id uuid, p_type text, p_title text, p_message text, p_metadata jsonb DEFAULT NULL::jsonb, p_action_url text DEFAULT NULL::text, p_priority text DEFAULT 'normal'::text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO public.notifications (
    user_id, type, title, message, metadata, action_url, priority
  ) VALUES (
    p_user_id, p_type, p_title, p_message, p_metadata, p_action_url, p_priority
  ) RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;

-- Core user tables
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  assigned_by uuid,
  assigned_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

CREATE TABLE public.employee_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  department_id uuid,
  position text,
  hire_date date,
  status text DEFAULT 'active',
  phone text,
  address text,
  emergency_contact jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Department and organizational structure
CREATE TABLE public.departments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Properties and real estate
CREATE TABLE public.properties (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id uuid,
  title text NOT NULL,
  description text,
  property_type text NOT NULL,
  listing_type text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  price numeric NOT NULL,
  bedrooms integer,
  bathrooms numeric,
  square_feet integer,
  lot_size numeric,
  year_built integer,
  property_features jsonb DEFAULT '[]'::jsonb,
  images jsonb DEFAULT '[]'::jsonb,
  virtual_tour_url text,
  status text DEFAULT 'active',
  featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.property_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  property_id uuid,
  viewed_at timestamp with time zone DEFAULT now(),
  view_duration integer,
  source text
);

CREATE TABLE public.property_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id uuid,
  date date NOT NULL,
  views integer DEFAULT 0,
  inquiries integer DEFAULT 0,
  favorites integer DEFAULT 0,
  virtual_tours integer DEFAULT 0,
  contact_agent integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.property_comparisons (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  property_ids uuid[] NOT NULL,
  comparison_criteria jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Business brokerage
CREATE TABLE public.business_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.businesses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id uuid NOT NULL,
  category_id uuid,
  business_name text NOT NULL,
  description text NOT NULL,
  industry text NOT NULL,
  location_city text NOT NULL,
  location_state text NOT NULL,
  asking_price numeric NOT NULL,
  annual_revenue numeric,
  annual_profit numeric,
  years_established integer,
  number_of_employees integer,
  visa_eligible boolean DEFAULT false,
  visa_types text[],
  roi_percentage numeric,
  training_provided boolean DEFAULT false,
  financing_available boolean DEFAULT false,
  inventory_included boolean DEFAULT false,
  assets_included text[],
  reason_for_selling text,
  images jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'pending',
  featured boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.business_favorites (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  business_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- CRM and client management
CREATE TABLE public.clients (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  agent_id uuid,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  country_of_origin text NOT NULL,
  current_location text,
  visa_type text NOT NULL,
  investment_type text,
  investment_amount numeric,
  family_members integer DEFAULT 1,
  timeline text,
  status text NOT NULL DEFAULT 'lead',
  stage text NOT NULL DEFAULT 'initial_contact',
  priority text NOT NULL DEFAULT 'medium',
  business_experience text,
  english_proficiency text,
  previous_visa_history text,
  notes text,
  lead_source text,
  assigned_at timestamp with time zone,
  last_contact_at timestamp with time zone,
  next_follow_up_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  agent_id uuid,
  property_id uuid,
  lead_source text NOT NULL,
  lead_status text DEFAULT 'new',
  priority text DEFAULT 'medium',
  contact_info jsonb NOT NULL,
  notes text,
  last_contact_at timestamp with time zone,
  conversion_date timestamp with time zone,
  estimated_value numeric,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Appointments and consultations
CREATE TABLE public.appointments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid,
  agent_id uuid,
  property_id uuid,
  appointment_type text NOT NULL,
  scheduled_at timestamp with time zone NOT NULL,
  duration integer DEFAULT 60,
  status text DEFAULT 'scheduled',
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.consultation_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid NOT NULL,
  agent_id uuid NOT NULL,
  session_type text NOT NULL,
  scheduled_at timestamp with time zone NOT NULL,
  duration integer DEFAULT 60,
  status text NOT NULL DEFAULT 'scheduled',
  meeting_notes text,
  next_steps text,
  action_items jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Commissions and financial
CREATE TABLE public.agent_commissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id uuid,
  property_id uuid,
  client_id uuid,
  transaction_type text NOT NULL,
  sale_price numeric NOT NULL,
  commission_rate numeric NOT NULL,
  commission_amount numeric NOT NULL,
  transaction_date date NOT NULL,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Training system
CREATE TABLE public.training_modules (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  content_type text NOT NULL,
  content_url text,
  module_order integer NOT NULL DEFAULT 1,
  estimated_duration integer DEFAULT 30,
  is_required boolean DEFAULT true,
  is_active boolean DEFAULT true,
  prerequisites text[],
  learning_objectives text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.training_submodules (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id uuid NOT NULL,
  title text NOT NULL,
  content text,
  sub_module_order integer NOT NULL DEFAULT 1,
  estimated_duration integer DEFAULT 15,
  is_required boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.training_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  module_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'not_started',
  progress_percentage integer DEFAULT 0,
  score integer,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  quiz_completed boolean NOT NULL DEFAULT false,
  quiz_passed boolean NOT NULL DEFAULT false,
  quiz_score integer,
  quiz_attempts integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.ai_training_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  module_id uuid NOT NULL,
  session_type text NOT NULL,
  prompt text,
  ai_response text,
  user_feedback integer,
  session_data jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.quiz_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  module_id uuid NOT NULL,
  questions_data jsonb NOT NULL,
  user_answers jsonb NOT NULL,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  percentage numeric NOT NULL,
  passed boolean NOT NULL DEFAULT false,
  attempt_number integer NOT NULL DEFAULT 1,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Document management
CREATE TABLE public.documents (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer,
  category text,
  tags text[],
  document_type document_type DEFAULT 'general',
  employee_id uuid,
  training_record_id uuid,
  is_training_material boolean DEFAULT false,
  uploaded_by uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.employee_documents_new (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer,
  category text,
  tags text[],
  document_type text DEFAULT 'general',
  is_training_material boolean DEFAULT false,
  training_record_id uuid,
  uploaded_by uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Content management
CREATE TABLE public.blog_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  status text DEFAULT 'draft',
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.post_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid NOT NULL,
  platform text NOT NULL,
  impressions integer DEFAULT 0,
  likes integer DEFAULT 0,
  comments integer DEFAULT 0,
  shares integer DEFAULT 0,
  clicks integer DEFAULT 0,
  engagement_rate numeric DEFAULT 0,
  reach integer DEFAULT 0,
  last_updated timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Knowledge base and help
CREATE TABLE public.knowledge_base (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  category text,
  tags text[],
  is_published boolean DEFAULT false,
  created_by uuid NOT NULL,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- HR and job management
CREATE TABLE public.job_postings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  department_id uuid,
  portal text NOT NULL,
  position text NOT NULL,
  location text,
  job_type text DEFAULT 'full_time',
  salary_min numeric,
  salary_max numeric,
  status text DEFAULT 'draft',
  posted_date timestamp with time zone,
  expires_date timestamp with time zone,
  created_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.employee_invitations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  full_name text NOT NULL,
  position text,
  department_id uuid,
  temporary_password text NOT NULL,
  invited_by uuid NOT NULL,
  is_used boolean DEFAULT false,
  expires_at timestamp with time zone DEFAULT (now() + interval '7 days'),
  created_at timestamp with time zone DEFAULT now()
);

-- Communication and notifications
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  metadata jsonb,
  action_url text,
  priority text DEFAULT 'normal',
  is_read boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.notification_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_name text NOT NULL,
  email_subject text NOT NULL,
  email_body text NOT NULL,
  push_title text,
  push_body text,
  variables jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.system_notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  notification_type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  target_audience text DEFAULT 'all',
  priority text DEFAULT 'normal',
  start_date timestamp with time zone DEFAULT now(),
  end_date timestamp with time zone,
  is_active boolean DEFAULT true,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now()
);

-- Email campaigns
CREATE TABLE public.email_campaigns (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  status text DEFAULT 'draft',
  scheduled_at timestamp with time zone,
  sent_at timestamp with time zone,
  created_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.email_recipients (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id uuid,
  user_id uuid,
  email_address text NOT NULL,
  sent_at timestamp with time zone,
  delivered_at timestamp with time zone,
  opened_at timestamp with time zone,
  clicked_at timestamp with time zone,
  unsubscribed_at timestamp with time zone,
  bounced boolean DEFAULT false,
  bounce_reason text,
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.subscribers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  email text NOT NULL,
  is_active boolean DEFAULT true,
  subscribed_at timestamp with time zone DEFAULT now(),
  unsubscribed_at timestamp with time zone
);

-- Immigration services
CREATE TABLE public.immigration_services (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name text NOT NULL,
  service_type text NOT NULL,
  description text NOT NULL,
  country_focus text[],
  processing_time text,
  requirements jsonb NOT NULL DEFAULT '[]'::jsonb,
  base_fee numeric,
  investment_min numeric,
  investment_max numeric,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Contact and inquiries
CREATE TABLE public.contact_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text,
  inquiry_type text NOT NULL,
  investment_range text,
  visa_type text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Market data and insights
CREATE TABLE public.market_insights (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location text NOT NULL,
  insight_type text NOT NULL,
  time_period text NOT NULL,
  insight_summary text,
  data_source text,
  data_points jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- System configuration
CREATE TABLE public.system_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key text NOT NULL,
  setting_type text NOT NULL,
  setting_value jsonb NOT NULL,
  description text,
  is_public boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- User activity tracking
CREATE TABLE public.user_activity (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  activity_type text NOT NULL,
  activity_data jsonb,
  user_agent text,
  ip_address inet,
  referrer text,
  created_at timestamp with time zone DEFAULT now()
);

-- Onboarding
CREATE TABLE public.onboarding_steps (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  step_name text NOT NULL,
  step_order integer NOT NULL,
  is_completed boolean DEFAULT false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- User management trigger functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.subscribers (user_id, email)
  VALUES (NEW.id, NEW.email);
  
  INSERT INTO public.employee_profiles (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'), NEW.email);
  
  -- Assign default employee role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'employee');
  
  -- Create default onboarding steps
  INSERT INTO public.onboarding_steps (user_id, step_name, step_order) VALUES
    (NEW.id, 'Welcome & Profile Setup', 1),
    (NEW.id, 'Department Assignment', 2),
    (NEW.id, 'Custom Training Path Creation', 3),
    (NEW.id, 'Platform Tour', 4),
    (NEW.id, 'First Training Module', 5);
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_employee()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.employee_profiles (user_id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  RETURN NEW;
END;
$$;

-- Create triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON public.businesses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_consultation_sessions_updated_at BEFORE UPDATE ON public.consultation_sessions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_agent_commissions_updated_at BEFORE UPDATE ON public.agent_commissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_training_progress_updated_at BEFORE UPDATE ON public.training_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_employee_documents_new_updated_at BEFORE UPDATE ON public.employee_documents_new FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_knowledge_base_updated_at BEFORE UPDATE ON public.knowledge_base FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON public.job_postings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_email_campaigns_updated_at BEFORE UPDATE ON public.email_campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_email_recipients_updated_at BEFORE UPDATE ON public.email_recipients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_immigration_services_updated_at BEFORE UPDATE ON public.immigration_services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON public.contact_submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_market_insights_updated_at BEFORE UPDATE ON public.market_insights FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON public.system_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON public.departments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_business_categories_updated_at BEFORE UPDATE ON public.business_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_notification_templates_updated_at BEFORE UPDATE ON public.notification_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_training_modules_updated_at BEFORE UPDATE ON public.training_modules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_training_submodules_updated_at BEFORE UPDATE ON public.training_submodules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_employee_profiles_updated_at BEFORE UPDATE ON public.employee_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_submodules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_documents_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.immigration_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_steps ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "HR and Admin can view all profiles" ON public.profiles FOR ALL USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- User roles policies
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins and HR can manage all roles" ON public.user_roles FOR ALL USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- Employee profiles policies
CREATE POLICY "Employees can view their own profile" ON public.employee_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Employees can update their own profile" ON public.employee_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "HR and Admin can manage all employee profiles" ON public.employee_profiles FOR ALL USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- Departments policies
CREATE POLICY "All authenticated users can view departments" ON public.departments FOR SELECT USING (true);

-- Properties policies
CREATE POLICY "Everyone can view active properties" ON public.properties FOR SELECT USING (status = 'active' OR status = 'pending');
CREATE POLICY "Agents can manage their properties" ON public.properties FOR ALL USING (agent_id IN (SELECT id FROM employee_profiles WHERE user_id = auth.uid()));
CREATE POLICY "HR/Admin can manage all properties" ON public.properties FOR ALL USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- Property views policies
CREATE POLICY "Users can view their own viewing history" ON public.property_views FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can track property views" ON public.property_views FOR INSERT WITH CHECK (user_id = auth.uid());

-- Property analytics policies
CREATE POLICY "Agents can view their property analytics" ON public.property_analytics FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM properties p 
    JOIN employee_profiles ep ON p.agent_id = ep.id 
    WHERE p.id = property_analytics.property_id AND ep.user_id = auth.uid()
  ) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Property comparisons policies
CREATE POLICY "Users can manage their comparisons" ON public.property_comparisons FOR ALL USING (user_id = auth.uid());

-- Business categories policies
CREATE POLICY "Everyone can view business categories" ON public.business_categories FOR SELECT USING (true);

-- Businesses policies
CREATE POLICY "Everyone can view approved businesses" ON public.businesses FOR SELECT USING (status = 'approved');
CREATE POLICY "Sellers can manage their own businesses" ON public.businesses FOR ALL USING (seller_id = auth.uid());
CREATE POLICY "Admins can manage all businesses" ON public.businesses FOR ALL USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- Business favorites policies
CREATE POLICY "Users can manage their own favorites" ON public.business_favorites FOR ALL USING (user_id = auth.uid());

-- Clients policies
CREATE POLICY "Clients can view their own profile" ON public.clients FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Agents can manage their assigned clients" ON public.clients FOR ALL USING (agent_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- Leads policies
CREATE POLICY "Agents can manage their leads" ON public.leads FOR ALL USING (
  agent_id IN (SELECT id FROM employee_profiles WHERE user_id = auth.uid()) OR 
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'hr'::app_role)
);

-- Appointments policies
CREATE POLICY "Users can view their appointments" ON public.appointments FOR SELECT USING (
  client_id = auth.uid() OR 
  agent_id IN (SELECT id FROM employee_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Users can create appointments" ON public.appointments FOR INSERT WITH CHECK (client_id = auth.uid());
CREATE POLICY "Agents can manage appointments" ON public.appointments FOR ALL USING (
  agent_id IN (SELECT id FROM employee_profiles WHERE user_id = auth.uid())
);

-- Consultation sessions policies
CREATE POLICY "Clients can view their consultation sessions" ON public.consultation_sessions FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())
);
CREATE POLICY "Agents can manage their consultation sessions" ON public.consultation_sessions FOR ALL USING (
  agent_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Agent commissions policies
CREATE POLICY "Agents can view their commissions" ON public.agent_commissions FOR SELECT USING (
  agent_id IN (SELECT id FROM employee_profiles WHERE user_id = auth.uid()) OR 
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'hr'::app_role)
);
CREATE POLICY "Admins can manage commissions" ON public.agent_commissions FOR ALL USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Training modules policies
CREATE POLICY "Authenticated users can view active modules" ON public.training_modules FOR SELECT USING (is_active = true);
CREATE POLICY "HR can manage training modules" ON public.training_modules FOR ALL USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Training submodules policies
CREATE POLICY "Authenticated users can view active submodules" ON public.training_submodules FOR SELECT USING (
  EXISTS (SELECT 1 FROM training_modules WHERE id = training_submodules.module_id AND is_active = true)
);
CREATE POLICY "HR can manage training submodules" ON public.training_submodules FOR ALL USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Training progress policies
CREATE POLICY "Users can view their own training progress" ON public.training_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own training progress" ON public.training_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own training progress" ON public.training_progress FOR UPDATE USING (auth.uid() = user_id);

-- AI training sessions policies
CREATE POLICY "Users can view their own AI training sessions" ON public.ai_training_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own AI training sessions" ON public.ai_training_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Quiz attempts policies
CREATE POLICY "Users can view their own quiz attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own quiz attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "HR can view all quiz attempts" ON public.quiz_attempts FOR SELECT USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Documents policies
CREATE POLICY "Employees can view their own documents" ON public.documents FOR SELECT USING (
  employee_id IN (SELECT id FROM employee_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "HR can manage all documents metadata" ON public.documents FOR ALL USING (
  has_role(auth.uid(), 'hr'::app_role) OR has_role(auth.uid(), 'admin'::app_role)
);

-- Employee documents new policies
CREATE POLICY "Employees can view their own documents" ON public.employee_documents_new FOR SELECT USING (
  employee_id IN (SELECT id FROM employee_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "HR can manage all employee documents" ON public.employee_documents_new FOR ALL USING (
  has_role(auth.uid(), 'hr'::app_role) OR has_role(auth.uid(), 'admin'::app_role)
);

-- Blog categories policies
CREATE POLICY "Everyone can view blog categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage blog categories" ON public.blog_categories FOR ALL USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Posts policies
CREATE POLICY "Users can manage their own posts" ON public.posts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Everyone can view published posts" ON public.posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage all posts" ON public.posts FOR ALL USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Post analytics policies
CREATE POLICY "Users can view analytics for their posts" ON public.post_analytics FOR SELECT USING (
  EXISTS (SELECT 1 FROM posts WHERE id = post_analytics.post_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create analytics for their posts" ON public.post_analytics FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM posts WHERE id = post_analytics.post_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update analytics for their posts" ON public.post_analytics FOR UPDATE USING (
  EXISTS (SELECT 1 FROM posts WHERE id = post_analytics.post_id AND user_id = auth.uid())
);

-- Knowledge base policies
CREATE POLICY "Everyone can view published knowledge base" ON public.knowledge_base FOR SELECT USING (is_published = true);
CREATE POLICY "HR and admin can view all knowledge base" ON public.knowledge_base FOR SELECT USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);
CREATE POLICY "HR and admin can create knowledge base" ON public.knowledge_base FOR INSERT WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);
CREATE POLICY "HR and admin can update knowledge base" ON public.knowledge_base FOR UPDATE USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Job postings policies
CREATE POLICY "Everyone can view active job postings" ON public.job_postings FOR SELECT USING (status = 'active');
CREATE POLICY "HR can manage all job postings" ON public.job_postings FOR ALL USING (
  has_role(auth.uid(), 'hr'::app_role) OR has_role(auth.uid(), 'admin'::app_role)
);

-- Employee invitations policies
CREATE POLICY "HR can manage employee invitations" ON public.employee_invitations FOR ALL USING (
  has_role(auth.uid(), 'hr'::app_role) OR has_role(auth.uid(), 'admin'::app_role)
);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- Notification templates policies
CREATE POLICY "Everyone can view active templates" ON public.notification_templates FOR SELECT USING (is_active = true);
CREATE POLICY "HR can manage notification templates" ON public.notification_templates FOR ALL USING (
  has_role(auth.uid(), 'hr'::app_role) OR has_role(auth.uid(), 'admin'::app_role)
);

-- System notifications policies
CREATE POLICY "Everyone can view active system notifications" ON public.system_notifications FOR SELECT USING (
  is_active = true AND start_date <= now() AND (end_date IS NULL OR end_date >= now())
);

-- Email campaigns policies
CREATE POLICY "Admins and HR can manage email campaigns" ON public.email_campaigns FOR ALL USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Email recipients policies
CREATE POLICY "System can manage email recipients for campaigns" ON public.email_recipients FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins and HR can manage email recipients" ON public.email_recipients FOR ALL USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Subscribers policies
CREATE POLICY "Users can manage their own subscription" ON public.subscribers FOR ALL USING (user_id = auth.uid());
CREATE POLICY "System can manage subscriptions" ON public.subscribers FOR INSERT WITH CHECK (true);

-- Immigration services policies
CREATE POLICY "Everyone can view active immigration services" ON public.immigration_services FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage immigration services" ON public.immigration_services FOR ALL USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Contact submissions policies
CREATE POLICY "Anyone can create contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage contact submissions" ON public.contact_submissions FOR ALL USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role)
);

-- Market insights policies
CREATE POLICY "Everyone can view market insights" ON public.market_insights FOR SELECT USING (true);

-- System settings policies
CREATE POLICY "Public settings viewable by all" ON public.system_settings FOR SELECT USING (is_public = true);
CREATE POLICY "Admins can manage all settings" ON public.system_settings FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- User activity policies
CREATE POLICY "Users can view their own activity" ON public.user_activity FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all user activity" ON public.user_activity FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "System can insert user activity" ON public.user_activity FOR INSERT WITH CHECK (true);

-- Onboarding steps policies
CREATE POLICY "Users can view their own onboarding steps" ON public.onboarding_steps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own onboarding steps" ON public.onboarding_steps FOR ALL USING (auth.uid() = user_id);

-- Create storage buckets (if not exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('training-materials', 'training-materials', false) 
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-documents', 'property-documents', false) 
ON CONFLICT (id) DO NOTHING;

-- Storage policies for property images
CREATE POLICY "Property images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
CREATE POLICY "Agents can upload property images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'property-images' AND 
  (has_role(auth.uid(), 'agent'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role))
);
CREATE POLICY "Agents can update property images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'property-images' AND 
  (has_role(auth.uid(), 'agent'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role))
);
CREATE POLICY "Agents can delete property images" ON storage.objects FOR DELETE USING (
  bucket_id = 'property-images' AND 
  (has_role(auth.uid(), 'agent'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role))
);

-- Storage policies for blog images
CREATE POLICY "Blog images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Admins can manage blog images" ON storage.objects FOR ALL USING (
  bucket_id = 'blog-images' AND 
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role))
);

-- Storage policies for documents
CREATE POLICY "Users can view their own documents" ON storage.objects FOR SELECT USING (
  bucket_id = 'documents' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can upload their own documents" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'documents' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "HR can manage all documents" ON storage.objects FOR ALL USING (
  bucket_id = 'documents' AND 
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role))
);

-- Storage policies for training materials
CREATE POLICY "Employees can view training materials" ON storage.objects FOR SELECT USING (
  bucket_id = 'training-materials' AND 
  (has_role(auth.uid(), 'employee'::app_role) OR has_role(auth.uid(), 'agent'::app_role) OR has_role(auth.uid(), 'manager'::app_role) OR has_role(auth.uid(), 'hr'::app_role) OR has_role(auth.uid(), 'admin'::app_role))
);
CREATE POLICY "HR can manage training materials" ON storage.objects FOR ALL USING (
  bucket_id = 'training-materials' AND 
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role))
);

-- Storage policies for property documents
CREATE POLICY "Agents can manage property documents" ON storage.objects FOR ALL USING (
  bucket_id = 'property-documents' AND 
  (has_role(auth.uid(), 'agent'::app_role) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role))
);
CREATE POLICY "Clients can view property documents" ON storage.objects FOR SELECT USING (
  bucket_id = 'property-documents'
);

-- Sample data inserts

-- Insert departments
INSERT INTO public.departments (id, name, description) VALUES
  (gen_random_uuid(), 'Sales', 'Real estate sales team'),
  (gen_random_uuid(), 'Marketing', 'Marketing and advertising'),
  (gen_random_uuid(), 'HR', 'Human resources department'),
  (gen_random_uuid(), 'IT', 'Information technology support'),
  (gen_random_uuid(), 'Legal', 'Legal and compliance team')
ON CONFLICT DO NOTHING;

-- Insert business categories
INSERT INTO public.business_categories (id, name, description) VALUES
  (gen_random_uuid(), 'Restaurant', 'Food service businesses'),
  (gen_random_uuid(), 'Retail', 'Retail and commercial stores'),
  (gen_random_uuid(), 'Technology', 'Tech startups and software companies'),
  (gen_random_uuid(), 'Manufacturing', 'Manufacturing and production businesses'),
  (gen_random_uuid(), 'Service', 'Service-based businesses')
ON CONFLICT DO NOTHING;

-- Insert blog categories
INSERT INTO public.blog_categories (id, name, slug, description) VALUES
  (gen_random_uuid(), 'Real Estate News', 'real-estate-news', 'Latest news in real estate'),
  (gen_random_uuid(), 'Investment Tips', 'investment-tips', 'Investment strategies and tips'),
  (gen_random_uuid(), 'Market Analysis', 'market-analysis', 'Market trends and analysis'),
  (gen_random_uuid(), 'Immigration', 'immigration', 'Immigration and visa information')
ON CONFLICT DO NOTHING;

-- Insert immigration services
INSERT INTO public.immigration_services (id, service_name, service_type, description, country_focus, processing_time, requirements, base_fee, investment_min, investment_max) VALUES
  (gen_random_uuid(), 'EB-5 Investor Visa', 'investment_visa', 'Employment-based fifth preference visa for investors', ARRAY['United States'], '18-36 months', '{"investment_amount": "$800,000 - $1,050,000", "job_creation": "10 jobs", "source_of_funds": "Legal source documentation required"}', 50000, 800000, 1050000),
  (gen_random_uuid(), 'Portugal Golden Visa', 'investment_visa', 'Portugal residence by investment program', ARRAY['Portugal'], '6-12 months', '{"investment_amount": "€280,000 - €500,000", "residence_requirement": "7 days per year", "due_diligence": "Background check required"}', 25000, 280000, 500000),
  (gen_random_uuid(), 'Spain Golden Visa', 'investment_visa', 'Spain residence by investment program', ARRAY['Spain'], '3-6 months', '{"investment_amount": "€500,000", "residence_requirement": "1 day per year", "health_insurance": "Required"}', 20000, 500000, 500000)
ON CONFLICT DO NOTHING;

-- Insert system settings
INSERT INTO public.system_settings (id, setting_key, setting_type, setting_value, description, is_public) VALUES
  (gen_random_uuid(), 'site_name', 'string', '"Grupo Sineva"', 'Website name', true),
  (gen_random_uuid(), 'contact_email', 'string', '"contact@sinevagrupo.com"', 'Contact email address', true),
  (gen_random_uuid(), 'phone_number', 'string', '"+1-800-SINEVA1"', 'Main phone number', true),
  (gen_random_uuid(), 'office_address', 'string', '"123 Business District, Miami, FL 33131"', 'Main office address', true),
  (gen_random_uuid(), 'maintenance_mode', 'boolean', 'false', 'Enable maintenance mode', false),
  (gen_random_uuid(), 'max_file_upload_size', 'number', '10485760', 'Maximum file upload size in bytes (10MB)', false)
ON CONFLICT DO NOTHING;

-- Insert notification templates
INSERT INTO public.notification_templates (id, template_name, email_subject, email_body, push_title, push_body, variables) VALUES
  (gen_random_uuid(), 'welcome_email', 'Welcome to Grupo Sineva', 'Welcome {{full_name}} to our platform! We are excited to help you with your real estate and investment needs.', 'Welcome!', 'Welcome to Grupo Sineva', '{"full_name": "string"}'),
  (gen_random_uuid(), 'property_inquiry', 'New Property Inquiry', 'You have received a new inquiry for property: {{property_title}} from {{client_name}} ({{client_email}}).', 'New Inquiry', 'New property inquiry received', '{"property_title": "string", "client_name": "string", "client_email": "string"}'),
  (gen_random_uuid(), 'appointment_reminder', 'Appointment Reminder', 'This is a reminder for your appointment on {{appointment_date}} at {{appointment_time}}.', 'Appointment Reminder', 'Your appointment is coming up', '{"appointment_date": "date", "appointment_time": "time"}')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_state ON public.properties(state);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_agent_id ON public.properties(agent_id);
CREATE INDEX IF NOT EXISTS idx_businesses_location_city ON public.businesses(location_city);
CREATE INDEX IF NOT EXISTS idx_businesses_industry ON public.businesses(industry);
CREATE INDEX IF NOT EXISTS idx_businesses_asking_price ON public.businesses(asking_price);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON public.businesses(status);
CREATE INDEX IF NOT EXISTS idx_leads_agent_id ON public.leads(agent_id);
CREATE INDEX IF NOT EXISTS idx_leads_lead_status ON public.leads(lead_status);
CREATE INDEX IF NOT EXISTS idx_clients_agent_id ON public.clients(agent_id);
CREATE INDEX IF NOT EXISTS idx_clients_status ON public.clients(status);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_training_progress_user_id ON public.training_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_training_progress_module_id ON public.training_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON public.user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_activity_type ON public.user_activity(activity_type);
CREATE INDEX IF NOT EXISTS idx_property_views_property_id ON public.property_views(property_id);
CREATE INDEX IF NOT EXISTS idx_property_views_user_id ON public.property_views(user_id);

-- Final comment
-- This migration creates a complete real estate platform database with:
-- - User management and role-based access control
-- - Property and business listings
-- - CRM for client and lead management  
-- - Training and onboarding system
-- - Document management
-- - Communication and notifications
-- - Immigration services
-- - Analytics and reporting
-- - Storage policies for file management
-- 
-- After running this migration, generate types with:
-- npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/integrations/supabase/types.ts