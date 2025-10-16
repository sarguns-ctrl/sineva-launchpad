-- Safe migration: Just migrate existing role data without changing enum
-- Convert manager roles to hr (merge functionality)
DELETE FROM public.user_roles 
WHERE role = 'manager' 
AND user_id IN (
  SELECT user_id FROM public.user_roles WHERE role = 'hr'
);

UPDATE public.user_roles 
SET role = 'hr' 
WHERE role = 'manager';

-- Remove employee roles (unused)
DELETE FROM public.user_roles 
WHERE role = 'employee';

-- Note: We keep 'manager' and 'employee' in the enum for backward compatibility
-- but the application code will only use: admin, hr, agent, user