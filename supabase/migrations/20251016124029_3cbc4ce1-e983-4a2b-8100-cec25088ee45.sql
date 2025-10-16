-- Allow null user_id for public subscriptions
ALTER TABLE public.subscribers 
ALTER COLUMN user_id DROP NOT NULL;