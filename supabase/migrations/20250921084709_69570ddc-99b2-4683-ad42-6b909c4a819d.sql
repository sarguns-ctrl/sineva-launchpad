-- Update existing employee profiles to be real estate agents
UPDATE employee_profiles 
SET 
  position = 'Senior Real Estate Agent',
  years_experience = 8,
  learning_preferences = 'Luxury Properties,International Clients'
WHERE full_name = 'Sargun';

UPDATE employee_profiles 
SET 
  position = 'Commercial Real Estate Specialist', 
  years_experience = 12,
  learning_preferences = 'Commercial Properties,Investment Advisory'
WHERE full_name = 'Baksheesh';

UPDATE employee_profiles 
SET 
  position = 'Residential Property Expert',
  years_experience = 6, 
  learning_preferences = 'Residential Properties,First-time Buyers',
  full_name = 'Isabella Rodriguez'
WHERE full_name = 'fsddsf';

UPDATE employee_profiles 
SET 
  position = 'International Investment Advisor',
  years_experience = 15,
  learning_preferences = 'Investment Properties,E-2 Visa Properties', 
  full_name = 'David Thompson'
WHERE full_name = 'google';