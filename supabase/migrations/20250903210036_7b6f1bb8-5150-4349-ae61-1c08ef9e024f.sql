-- Create property favorites table for user recommendations
CREATE TABLE public.property_favorites (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Enable RLS
ALTER TABLE public.property_favorites ENABLE ROW LEVEL SECURITY;

-- Create policies for property favorites
CREATE POLICY "Users can view their own property favorites" 
ON public.property_favorites 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own property favorites" 
ON public.property_favorites 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own property favorites" 
ON public.property_favorites 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create saved searches table for AI recommendations
CREATE TABLE public.saved_searches (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  search_name text NOT NULL,
  search_criteria jsonb NOT NULL DEFAULT '{}',
  alert_frequency text NOT NULL DEFAULT 'never',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for saved searches
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;

-- Create policies for saved searches
CREATE POLICY "Users can manage their own saved searches" 
ON public.saved_searches 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_saved_searches_updated_at
BEFORE UPDATE ON public.saved_searches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();