-- Create table for established business leads
CREATE TABLE IF NOT EXISTS public.established_business_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_type TEXT NOT NULL,
  investment_budget TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.established_business_leads ENABLE ROW LEVEL SECURITY;

-- Policy for anyone to submit leads
CREATE POLICY "Anyone can create established business leads"
ON public.established_business_leads
FOR INSERT
WITH CHECK (true);

-- Policy for admins to view and manage leads
CREATE POLICY "Admins can manage established business leads"
ON public.established_business_leads
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_established_business_leads_updated_at
BEFORE UPDATE ON public.established_business_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();