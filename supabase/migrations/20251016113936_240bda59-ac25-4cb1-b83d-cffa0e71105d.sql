-- Fix appointment RLS policies to ensure privacy
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can create appointments" ON public.appointments;
DROP POLICY IF EXISTS "Agents can manage appointments" ON public.appointments;

-- Users can only view appointments where they are the client
CREATE POLICY "Users can view their own appointments"
ON public.appointments
FOR SELECT
USING (client_id = auth.uid());

-- Users can create appointments for themselves
CREATE POLICY "Users can create their own appointments"
ON public.appointments
FOR INSERT
WITH CHECK (client_id = auth.uid());

-- Users can update their own appointments (to cancel)
CREATE POLICY "Users can update their own appointments"
ON public.appointments
FOR UPDATE
USING (client_id = auth.uid());

-- Agents can view appointments assigned to them
CREATE POLICY "Agents can view their assigned appointments"
ON public.appointments
FOR SELECT
USING (
  agent_id IN (
    SELECT id FROM employee_profiles WHERE user_id = auth.uid()
  )
);

-- Agents can update appointments assigned to them
CREATE POLICY "Agents can update their assigned appointments"
ON public.appointments
FOR UPDATE
USING (
  agent_id IN (
    SELECT id FROM employee_profiles WHERE user_id = auth.uid()
  )
);

-- Admins and HR can view all appointments
CREATE POLICY "Admins can view all appointments"
ON public.appointments
FOR SELECT
USING (
  has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'hr')
);

-- Admins and HR can manage all appointments
CREATE POLICY "Admins can manage all appointments"
ON public.appointments
FOR ALL
USING (
  has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'hr')
);