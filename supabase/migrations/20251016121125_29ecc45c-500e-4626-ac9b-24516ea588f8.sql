-- Create analysis_requests table for commercial property analysis requests
CREATE TABLE IF NOT EXISTS public.analysis_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  property_type TEXT NOT NULL,
  investment_budget TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.analysis_requests ENABLE ROW LEVEL SECURITY;

-- Admins can manage all requests
CREATE POLICY "Admins can manage analysis requests"
  ON public.analysis_requests
  FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'hr'));

-- Anyone can create analysis requests (public form)
CREATE POLICY "Anyone can create analysis requests"
  ON public.analysis_requests
  FOR INSERT
  WITH CHECK (true);

-- Add index for performance
CREATE INDEX idx_analysis_requests_status ON public.analysis_requests(status);
CREATE INDEX idx_analysis_requests_created_at ON public.analysis_requests(created_at DESC);

-- Add updated_at trigger
CREATE TRIGGER update_analysis_requests_updated_at
  BEFORE UPDATE ON public.analysis_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();