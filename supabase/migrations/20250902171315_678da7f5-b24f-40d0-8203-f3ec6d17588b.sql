-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'agent', 'client');

-- Create profiles table for user management
CREATE TABLE public.profiles (
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

-- Create user_roles table for role management  
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- Create departments table
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create agents table
CREATE TABLE public.agents (
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
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL CHECK (property_type IN ('residential', 'commercial', 'business', 'land')),
  category TEXT, -- 'luxury', 'investment', 'starter', etc.
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
  features TEXT[], -- ['pool', 'garage', 'fireplace']
  amenities TEXT[], -- ['gym', 'concierge', 'parking']
  images TEXT[], -- Array of image URLs
  virtual_tour_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'sold', 'inactive')),
  visa_eligible TEXT[], -- ['E-2', 'EB-5', 'L-1']
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
CREATE TABLE public.business_properties (
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
CREATE TABLE public.inquiries (
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
CREATE TABLE public.appointments (
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
CREATE TABLE public.property_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Create market_data table for hero section metrics
CREATE TABLE public.market_data (
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
('markets_served', 15, '', 'Markets we serve globally');

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
    'client'
  );
  
  -- Assign default client role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'client');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user handling
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON public.agents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for properties (public read, agents/admins can manage)
CREATE POLICY "Anyone can view active properties" ON public.properties FOR SELECT USING (status = 'active');
CREATE POLICY "Agents can manage properties" ON public.properties FOR ALL USING (has_role(auth.uid(), 'agent') OR has_role(auth.uid(), 'admin'));
CREATE POLICY "Property creators can manage own properties" ON public.properties FOR ALL USING (auth.uid() = created_by);

-- RLS Policies for agents (public read for active agents)
CREATE POLICY "Anyone can view active agents" ON public.agents FOR SELECT USING (status = 'active');
CREATE POLICY "Agents can update own profile" ON public.agents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage agents" ON public.agents FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for inquiries
CREATE POLICY "Users can create inquiries" ON public.inquiries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own inquiries" ON public.inquiries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Agents can view assigned inquiries" ON public.inquiries FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.agents WHERE agents.user_id = auth.uid() AND agents.id = inquiries.agent_id)
);
CREATE POLICY "Agents can update assigned inquiries" ON public.inquiries FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.agents WHERE agents.user_id = auth.uid() AND agents.id = inquiries.agent_id)
);

-- RLS Policies for appointments
CREATE POLICY "Users can view own appointments" ON public.appointments FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Agents can view their appointments" ON public.appointments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.agents WHERE agents.user_id = auth.uid() AND agents.id = appointments.agent_id)
);
CREATE POLICY "Authenticated users can create appointments" ON public.appointments FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Agents can manage their appointments" ON public.appointments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.agents WHERE agents.user_id = auth.uid() AND agents.id = appointments.agent_id)
);

-- RLS Policies for favorites
CREATE POLICY "Users can manage own favorites" ON public.property_favorites FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for market data (read-only for all)
CREATE POLICY "Anyone can view market data" ON public.market_data FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage market data" ON public.market_data FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for departments
CREATE POLICY "Anyone can view departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Admins can manage departments" ON public.departments FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Business properties policies
CREATE POLICY "Anyone can view business property details" ON public.business_properties FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.properties WHERE properties.id = business_properties.property_id AND properties.status = 'active')
);
CREATE POLICY "Agents can manage business properties" ON public.business_properties FOR ALL USING (has_role(auth.uid(), 'agent') OR has_role(auth.uid(), 'admin'));