-- Create profiles table for user management (if not exists)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  role app_role DEFAULT 'client',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create agents table
CREATE TABLE IF NOT EXISTS public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  license_number TEXT UNIQUE,
  specializations TEXT[],
  languages TEXT[] DEFAULT ARRAY['English'],
  experience_years INTEGER DEFAULT 0,
  commission_rate DECIMAL(5,4) DEFAULT 0.03,
  team_lead BOOLEAN DEFAULT false,
  department_id UUID REFERENCES public.departments(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_sales INTEGER DEFAULT 0,
  total_volume DECIMAL(15,2) DEFAULT 0.0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL CHECK (property_type IN ('residential', 'commercial', 'business', 'land')),
  category TEXT,
  price DECIMAL(15,2) NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'TX',
  zip_code TEXT,
  country TEXT DEFAULT 'USA',
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  size_sqft INTEGER,
  lot_size_sqft INTEGER,
  bedrooms INTEGER,
  bathrooms DECIMAL(3,1),
  year_built INTEGER,
  features TEXT[],
  amenities TEXT[],
  images TEXT[],
  virtual_tour_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'sold', 'inactive')),
  visa_eligible TEXT[],
  investment_highlights TEXT[],
  roi_potential DECIMAL(5,2),
  rental_income DECIMAL(10,2),
  agent_id UUID REFERENCES public.agents(id),
  listing_agent_id UUID REFERENCES public.agents(id),
  created_by UUID REFERENCES auth.users(id),
  views_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  listing_date DATE DEFAULT CURRENT_DATE,
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create business_properties table for business-specific data
CREATE TABLE IF NOT EXISTS public.business_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE UNIQUE NOT NULL,
  business_type TEXT NOT NULL,
  industry TEXT,
  annual_revenue DECIMAL(15,2),
  net_profit DECIMAL(15,2),
  employee_count INTEGER,
  years_established INTEGER,
  growth_rate DECIMAL(5,2),
  reason_for_sale TEXT,
  included_assets TEXT[],
  training_provided BOOLEAN DEFAULT false,
  franchise BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create inquiries table for lead management
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES public.agents(id),
  inquiry_type TEXT NOT NULL CHECK (inquiry_type IN ('viewing', 'information', 'offer', 'consultation')),
  subject TEXT,
  message TEXT NOT NULL,
  contact_preference TEXT DEFAULT 'email' CHECK (contact_preference IN ('email', 'phone', 'text')),
  preferred_contact_time TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  response TEXT,
  responded_at TIMESTAMPTZ,
  responded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  agent_id UUID REFERENCES public.agents(id) NOT NULL,
  appointment_type TEXT NOT NULL CHECK (appointment_type IN ('viewing', 'consultation', 'signing', 'inspection')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  location TEXT,
  meeting_link TEXT,
  notes TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create property_favorites table
CREATE TABLE IF NOT EXISTS public.property_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Create market_data table for hero section metrics
CREATE TABLE IF NOT EXISTS public.market_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL UNIQUE,
  metric_value INTEGER NOT NULL,
  metric_suffix TEXT DEFAULT '',
  description TEXT,
  last_updated TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Insert sample market data for hero section
INSERT INTO public.market_data (metric_name, metric_value, metric_suffix, description) VALUES
('properties_sold', 2547, '+', 'Properties successfully sold'),
('client_satisfaction', 98, '%', 'Client satisfaction rating'),
('markets_served', 15, '', 'Markets we serve globally')
ON CONFLICT (metric_name) DO UPDATE SET
  metric_value = EXCLUDED.metric_value,
  last_updated = now();

-- Enable Row Level Security
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles') THEN
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'agents') THEN  
    ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'properties') THEN
    ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'business_properties') THEN
    ALTER TABLE public.business_properties ENABLE ROW LEVEL SECURITY;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'inquiries') THEN
    ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'appointments') THEN
    ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'property_favorites') THEN
    ALTER TABLE public.property_favorites ENABLE ROW LEVEL SECURITY;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'market_data') THEN
    ALTER TABLE public.market_data ENABLE ROW LEVEL SECURITY;
  END IF;
END$$;

-- RLS Policies for properties (public read, agents/admins can manage)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Anyone can view active properties') THEN
    CREATE POLICY "Anyone can view active properties" ON public.properties FOR SELECT USING (status = 'active');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Agents can manage properties') THEN
    CREATE POLICY "Agents can manage properties" ON public.properties FOR ALL USING (has_role(auth.uid(), 'agent') OR has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Property creators can manage own properties') THEN
    CREATE POLICY "Property creators can manage own properties" ON public.properties FOR ALL USING (auth.uid() = created_by);
  END IF;
END$$;

-- RLS Policies for agents (public read for active agents)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'agents' AND policyname = 'Anyone can view active agents') THEN
    CREATE POLICY "Anyone can view active agents" ON public.agents FOR SELECT USING (status = 'active');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'agents' AND policyname = 'Agents can update own profile') THEN
    CREATE POLICY "Agents can update own profile" ON public.agents FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'agents' AND policyname = 'Admins can manage agents') THEN
    CREATE POLICY "Admins can manage agents" ON public.agents FOR ALL USING (has_role(auth.uid(), 'admin'));
  END IF;
END$$;

-- RLS Policies for market data (read-only for all)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'market_data' AND policyname = 'Anyone can view market data') THEN
    CREATE POLICY "Anyone can view market data" ON public.market_data FOR SELECT USING (is_active = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'market_data' AND policyname = 'Admins can manage market data') THEN
    CREATE POLICY "Admins can manage market data" ON public.market_data FOR ALL USING (has_role(auth.uid(), 'admin'));
  END IF;
END$$;