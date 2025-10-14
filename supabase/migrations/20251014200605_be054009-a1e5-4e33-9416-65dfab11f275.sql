-- Create business_valuation_requests table
CREATE TABLE IF NOT EXISTS public.business_valuation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  annual_revenue_range TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.business_valuation_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can manage all valuation requests
CREATE POLICY "Admins can manage valuation requests"
ON public.business_valuation_requests
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'hr'::app_role));

-- Policy: Anyone can create valuation requests
CREATE POLICY "Anyone can create valuation requests"
ON public.business_valuation_requests
FOR INSERT
WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER update_business_valuation_requests_updated_at
BEFORE UPDATE ON public.business_valuation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();