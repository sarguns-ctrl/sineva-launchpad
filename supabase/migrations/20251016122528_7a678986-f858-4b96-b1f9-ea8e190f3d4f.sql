-- Fix RLS policy for subscribers table to allow public inserts
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscribers;

CREATE POLICY "Anyone can subscribe" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view own subscription" 
ON public.subscribers 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() IS NULL);