-- Phase 5: Advanced Property Platform Database Schema

-- Properties table for property listings
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.employee_profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL, -- 'residential', 'commercial', 'land'
  listing_type TEXT NOT NULL, -- 'sale', 'rent', 'lease'
  price DECIMAL(12,2) NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms DECIMAL(3,1),
  square_feet INTEGER,
  lot_size DECIMAL(10,2),
  year_built INTEGER,
  property_features JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  virtual_tour_url TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'pending', 'sold', 'withdrawn'
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User favorites for properties
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Saved searches for users
CREATE TABLE public.saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  search_criteria JSONB NOT NULL,
  alert_frequency TEXT DEFAULT 'daily', -- 'immediate', 'daily', 'weekly', 'never'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Property viewing history
CREATE TABLE public.property_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT now(),
  view_duration INTEGER, -- in seconds
  source TEXT -- 'search', 'featured', 'recommendation'
);

-- Messages between users and agents
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id),
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Appointment scheduling
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES public.employee_profiles(user_id),
  property_id UUID REFERENCES public.properties(id),
  appointment_type TEXT NOT NULL, -- 'viewing', 'consultation', 'signing'
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration INTEGER DEFAULT 60, -- in minutes
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'confirmed', 'completed', 'cancelled'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Financial calculations and mortgage scenarios
CREATE TABLE public.financial_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id),
  scenario_name TEXT NOT NULL,
  purchase_price DECIMAL(12,2) NOT NULL,
  down_payment DECIMAL(12,2) NOT NULL,
  interest_rate DECIMAL(5,4) NOT NULL,
  loan_term INTEGER NOT NULL, -- in years
  property_taxes DECIMAL(10,2),
  insurance DECIMAL(10,2),
  hoa_fees DECIMAL(10,2),
  calculations JSONB, -- stores calculated values
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_scenarios ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "Everyone can view active properties" ON public.properties
  FOR SELECT USING (status = 'active' OR status = 'pending');

CREATE POLICY "Agents can manage their properties" ON public.properties
  FOR ALL USING (
    agent_id IN (
      SELECT id FROM public.employee_profiles 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "HR/Admin can manage all properties" ON public.properties
  FOR ALL USING (
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'hr'::app_role)
  );

-- User favorites policies
CREATE POLICY "Users can manage their favorites" ON public.user_favorites
  FOR ALL USING (user_id = auth.uid());

-- Saved searches policies
CREATE POLICY "Users can manage their saved searches" ON public.saved_searches
  FOR ALL USING (user_id = auth.uid());

-- Property views policies
CREATE POLICY "Users can view their own viewing history" ON public.property_views
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can track property views" ON public.property_views
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Messages policies
CREATE POLICY "Users can view messages they sent or received" ON public.messages
  FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can mark their received messages as read" ON public.messages
  FOR UPDATE USING (recipient_id = auth.uid());

-- Appointments policies
CREATE POLICY "Users can view their appointments" ON public.appointments
  FOR SELECT USING (
    client_id = auth.uid() OR 
    agent_id IN (
      SELECT id FROM public.employee_profiles 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (client_id = auth.uid());

CREATE POLICY "Agents can manage appointments" ON public.appointments
  FOR ALL USING (
    agent_id IN (
      SELECT id FROM public.employee_profiles 
      WHERE user_id = auth.uid()
    )
  );

-- Financial scenarios policies
CREATE POLICY "Users can manage their financial scenarios" ON public.financial_scenarios
  FOR ALL USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_properties_location ON public.properties(city, state);
CREATE INDEX idx_properties_price ON public.properties(price);
CREATE INDEX idx_properties_type ON public.properties(property_type, listing_type);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_user_favorites_user ON public.user_favorites(user_id);
CREATE INDEX idx_property_views_user ON public.property_views(user_id);
CREATE INDEX idx_messages_recipient ON public.messages(recipient_id, is_read);
CREATE INDEX idx_appointments_agent_date ON public.appointments(agent_id, scheduled_at);

-- Update trigger for properties
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update trigger for saved searches
CREATE TRIGGER update_saved_searches_updated_at
  BEFORE UPDATE ON public.saved_searches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update trigger for appointments
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update trigger for financial scenarios
CREATE TRIGGER update_financial_scenarios_updated_at
  BEFORE UPDATE ON public.financial_scenarios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();