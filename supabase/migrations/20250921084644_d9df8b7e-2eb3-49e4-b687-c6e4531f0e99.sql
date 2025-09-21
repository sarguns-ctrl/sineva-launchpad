-- Add sample real estate agent data to employee_profiles
INSERT INTO employee_profiles (
  user_id, 
  full_name, 
  email, 
  position, 
  years_experience, 
  is_active,
  learning_preferences
) VALUES 
  (
    gen_random_uuid(), 
    'Sarah Martinez', 
    'sarah.martinez@gruposineva.com', 
    'Senior Real Estate Agent', 
    8, 
    true,
    'Luxury Properties,International Clients'
  ),
  (
    gen_random_uuid(), 
    'Michael Chen', 
    'michael.chen@gruposineva.com', 
    'Commercial Real Estate Specialist', 
    12, 
    true,
    'Commercial Properties,Investment Advisory'
  ),
  (
    gen_random_uuid(), 
    'Isabella Rodriguez', 
    'isabella.rodriguez@gruposineva.com', 
    'Residential Property Expert', 
    6, 
    true,
    'Residential Properties,First-time Buyers'
  ),
  (
    gen_random_uuid(), 
    'David Thompson', 
    'david.thompson@gruposineva.com', 
    'International Investment Advisor', 
    15, 
    true,
    'Investment Properties,E-2 Visa Properties'
  );