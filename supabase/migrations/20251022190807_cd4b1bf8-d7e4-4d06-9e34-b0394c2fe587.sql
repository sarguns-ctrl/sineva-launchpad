-- Create table for Texas business buyer leads
CREATE TABLE public.texas_business_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_type TEXT NOT NULL,
  investment_budget TEXT NOT NULL,
  agreed_to_contact BOOLEAN NOT NULL DEFAULT true,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.texas_business_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create leads
CREATE POLICY "Anyone can create texas business leads"
  ON public.texas_business_leads
  FOR INSERT
  WITH CHECK (true);

-- Policy: Admins can manage leads
CREATE POLICY "Admins can manage texas business leads"
  ON public.texas_business_leads
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_texas_business_leads_updated_at
  BEFORE UPDATE ON public.texas_business_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();