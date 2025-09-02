-- Create business categories table
CREATE TABLE public.business_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create businesses table
CREATE TABLE public.businesses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL,
  category_id UUID REFERENCES public.business_categories(id),
  business_name TEXT NOT NULL,
  description TEXT NOT NULL,
  industry TEXT NOT NULL,
  location_city TEXT NOT NULL,
  location_state TEXT NOT NULL,
  asking_price NUMERIC NOT NULL,
  annual_revenue NUMERIC,
  annual_profit NUMERIC,
  years_established INTEGER,
  number_of_employees INTEGER,
  visa_eligible BOOLEAN DEFAULT false,
  visa_types TEXT[],
  roi_percentage NUMERIC,
  assets_included TEXT[],
  inventory_included BOOLEAN DEFAULT false,
  training_provided BOOLEAN DEFAULT false,
  financing_available BOOLEAN DEFAULT false,
  reason_for_selling TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'pending'::text CHECK (status IN ('pending', 'approved', 'rejected', 'sold', 'withdrawn')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create business documents table
CREATE TABLE public.business_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  uploaded_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create business inquiries table
CREATE TABLE public.business_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  inquirer_id UUID NOT NULL,
  inquirer_name TEXT NOT NULL,
  inquirer_email TEXT NOT NULL,
  inquirer_phone TEXT,
  message TEXT NOT NULL,
  investment_budget NUMERIC,
  visa_requirement TEXT,
  status TEXT DEFAULT 'new'::text CHECK (status IN ('new', 'responded', 'in_negotiation', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create business favorites table
CREATE TABLE public.business_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, business_id)
);

-- Enable Row Level Security
ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_favorites ENABLE ROW LEVEL SECURITY;

-- Insert default categories
INSERT INTO public.business_categories (name, description) VALUES
('Restaurants & Food Service', 'Restaurants, cafes, food trucks, catering services'),
('Retail & E-commerce', 'Physical stores, online businesses, franchises'),
('Technology & Software', 'Software companies, IT services, tech startups'),
('Healthcare & Medical', 'Medical practices, clinics, healthcare services'),
('Manufacturing & Production', 'Manufacturing facilities, production companies'),
('Professional Services', 'Consulting, legal services, accounting firms'),
('Automotive', 'Auto repair, dealerships, car washes'),
('Real Estate & Construction', 'Real estate agencies, construction companies'),
('Entertainment & Recreation', 'Entertainment venues, sports facilities, gaming'),
('Education & Training', 'Schools, training centers, educational services');

-- RLS Policies for business_categories
CREATE POLICY "Everyone can view business categories"
ON public.business_categories
FOR SELECT
USING (true);

-- RLS Policies for businesses
CREATE POLICY "Everyone can view approved businesses"
ON public.businesses
FOR SELECT
USING (status = 'approved');

CREATE POLICY "Sellers can manage their own businesses"
ON public.businesses
FOR ALL
USING (seller_id = auth.uid())
WITH CHECK (seller_id = auth.uid());

CREATE POLICY "Admins can manage all businesses"
ON public.businesses
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- RLS Policies for business_documents
CREATE POLICY "Business owners can manage their documents"
ON public.business_documents
FOR ALL
USING (
  business_id IN (
    SELECT id FROM public.businesses WHERE seller_id = auth.uid()
  )
)
WITH CHECK (
  business_id IN (
    SELECT id FROM public.businesses WHERE seller_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all business documents"
ON public.business_documents
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- RLS Policies for business_inquiries
CREATE POLICY "Business owners can view inquiries for their businesses"
ON public.business_inquiries
FOR SELECT
USING (
  business_id IN (
    SELECT id FROM public.businesses WHERE seller_id = auth.uid()
  )
);

CREATE POLICY "Users can create inquiries"
ON public.business_inquiries
FOR INSERT
WITH CHECK (inquirer_id = auth.uid());

CREATE POLICY "Inquirers can view their own inquiries"
ON public.business_inquiries
FOR SELECT
USING (inquirer_id = auth.uid());

CREATE POLICY "Admins can manage all inquiries"
ON public.business_inquiries
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- RLS Policies for business_favorites
CREATE POLICY "Users can manage their own favorites"
ON public.business_favorites
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Create trigger for updated_at
CREATE TRIGGER update_businesses_updated_at
BEFORE UPDATE ON public.businesses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_business_inquiries_updated_at
BEFORE UPDATE ON public.business_inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_business_categories_updated_at
BEFORE UPDATE ON public.business_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();