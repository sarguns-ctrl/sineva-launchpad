-- Create agent_applications table for users who want to become agents
CREATE TABLE IF NOT EXISTS agent_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  experience_years INTEGER DEFAULT 0,
  specializations TEXT[],
  previous_company TEXT,
  license_number TEXT,
  motivation TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  package_type TEXT DEFAULT 'starter' CHECK (package_type IN ('starter', 'professional', 'elite')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS on agent_applications
ALTER TABLE agent_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for agent_applications
CREATE POLICY "Users can create their own application"
ON agent_applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own application"
ON agent_applications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "HR and admins can manage all applications"
ON agent_applications
FOR ALL
USING (has_role(auth.uid(), 'hr'::app_role) OR has_role(auth.uid(), 'admin'::app_role));