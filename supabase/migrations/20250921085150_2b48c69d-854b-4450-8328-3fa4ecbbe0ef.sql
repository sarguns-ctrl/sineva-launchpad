-- Update the agents page query to only show approved agent applications
-- Reset the employee_profiles to not be agents anymore
UPDATE employee_profiles 
SET 
  position = NULL,
  years_experience = NULL,
  learning_preferences = NULL
WHERE id IN (
  SELECT id FROM employee_profiles 
  WHERE position LIKE '%Agent%' OR position LIKE '%Specialist%' OR position LIKE '%Advisor%'
);