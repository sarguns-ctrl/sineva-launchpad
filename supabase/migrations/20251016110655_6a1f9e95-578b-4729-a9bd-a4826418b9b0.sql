-- Update handle_new_user() to assign 'user' role instead of 'employee'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.subscribers (user_id, email)
  VALUES (NEW.id, NEW.email);
  
  INSERT INTO public.employee_profiles (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'), NEW.email);
  
  -- Assign default 'user' role instead of 'employee'
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  -- Create default onboarding steps
  INSERT INTO public.onboarding_steps (user_id, step_name, step_order) VALUES
    (NEW.id, 'Welcome & Profile Setup', 1),
    (NEW.id, 'Department Assignment', 2),
    (NEW.id, 'Custom Training Path Creation', 3),
    (NEW.id, 'Platform Tour', 4),
    (NEW.id, 'First Training Module', 5);
  
  RETURN NEW;
END;
$function$;