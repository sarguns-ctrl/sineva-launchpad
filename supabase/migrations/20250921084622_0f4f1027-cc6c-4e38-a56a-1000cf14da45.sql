-- Create RLS policies for employee_profiles to allow public viewing of agents
-- This will allow the agents page to display agent profiles publicly

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Employees can view their own documents" ON employee_profiles;
DROP POLICY IF EXISTS "HR can manage all employee documents" ON employee_profiles;

-- Create new policies for public agent viewing
CREATE POLICY "Everyone can view active agent profiles" 
ON employee_profiles 
FOR SELECT 
USING (is_active = true);

-- Allow HR and admins to manage all employee profiles
CREATE POLICY "HR and admins can manage employee profiles" 
ON employee_profiles 
FOR ALL
USING (has_role(auth.uid(), 'hr'::app_role) OR has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'hr'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Allow employees to view and update their own profile
CREATE POLICY "Employees can view and update own profile"
ON employee_profiles
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);