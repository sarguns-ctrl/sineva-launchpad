-- Add a test approved agent application so the system shows working agents
INSERT INTO agent_applications (
  user_id,
  full_name,
  email,
  phone,
  experience_years,
  specializations,
  motivation,
  status,
  package_type
) VALUES 
  (
    '78e077c7-b918-49ea-ada8-78de35d0e6e4', -- Using existing user ID from Sargun
    'Sarah Martinez',
    'sarah.martinez@gruposineva.com',
    '+1 (555) 123-4567',
    8,
    ARRAY['Luxury Properties', 'International Clients'],
    'I am passionate about helping international clients find their dream properties in the US market.',
    'approved',
    'professional'
  );