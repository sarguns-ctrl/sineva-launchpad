-- Continue with more sample properties and businesses
INSERT INTO properties (title, description, property_type, listing_type, price, address, city, state, zip_code, bedrooms, bathrooms, square_feet, lot_size, year_built, status, featured, images, property_features) VALUES
('Warehouse Space', 'Large industrial warehouse with loading docks.', 'Industrial', 'lease', 15000, '741 Industrial Parkway', 'Tampa', 'FL', '33619', NULL, NULL, 25000, 50000, 1995, 'active', false, '["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"]', '["Loading Docks", "Office Space"]'),
('Golf Course Home', 'Stunning home on prestigious golf course.', 'Single Family', 'sale', 1125000, '159 Fairway Drive', 'Naples', 'FL', '34102', 4, 3, 3200, 10000, 2012, 'active', true, '["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"]', '["Golf Course Views", "Pool"]'),
('Lake House Retreat', 'Peaceful lakefront home with dock.', 'Single Family', 'sale', 675000, '951 Lake Shore Drive', 'Winter Haven', 'FL', '33880', 3, 2, 1900, 15000, 2010, 'active', true, '["https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800"]', '["Lakefront", "Dock"]');

-- Add sample businesses for the business marketplace
INSERT INTO businesses (business_name, description, industry, asking_price, annual_revenue, annual_profit, location_city, location_state, seller_id, status, visa_eligible, visa_types, years_established, number_of_employees, financing_available, training_provided, inventory_included, featured, images, roi_percentage) VALUES
('Miami Beach Restaurant', 'Established beachfront restaurant with prime location.', 'Food Service', 850000, 1200000, 180000, 'Miami Beach', 'FL', (SELECT user_id FROM profiles LIMIT 1), 'approved', true, '{"E-2", "EB-5"}', 8, 12, true, true, true, true, '["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"]', 15.2),
('Orlando Tech Startup', 'Growing software development company.', 'Technology', 450000, 680000, 95000, 'Orlando', 'FL', (SELECT user_id FROM profiles LIMIT 1), 'approved', true, '{"E-2", "L-1"}', 4, 8, false, true, false, false, '["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"]', 14.0),
('Tampa Fitness Center', 'Well-established fitness center with modern equipment.', 'Fitness', 320000, 480000, 72000, 'Tampa', 'FL', (SELECT user_id FROM profiles LIMIT 1), 'approved', true, '{"E-2"}', 6, 5, true, true, true, true, '["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"]', 22.5);

-- Add sample market insights data
INSERT INTO market_insights (location, time_period, insight_type, data_source, insight_summary, data_points) VALUES
('Miami-Dade County', '2024 Q4', 'Price Trends', 'MLS Data', 'Luxury condo market shows 8% growth year-over-year.', '{"median_price": 650000, "price_change": 8.2, "days_on_market": 45}'),
('Orlando Metro', '2024 Q4', 'Inventory Analysis', 'Local MLS', 'Single-family home inventory remains tight with 2.1 months supply.', '{"months_supply": 2.1, "new_listings": 1250, "pending_sales": 2100}'),
('Tampa Bay', '2024 Q4', 'Commercial Trends', 'Commercial Board', 'Office space demand recovering with 12% increase in leasing activity.', '{"vacancy_rate": 18.5, "lease_rate_psf": 28.50, "new_construction": 450000}');

-- Fix critical security issues
-- Remove the problematic policies and create proper secure ones
DROP POLICY IF EXISTS "Admins can view all data" ON profiles;
DROP POLICY IF EXISTS "Admins can view all posts" ON posts;

-- Create proper admin access policies
CREATE POLICY "HR and Admin can view all profiles" 
ON profiles FOR ALL 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'hr'::app_role)
);

CREATE POLICY "Users and Admins can manage posts" 
ON posts FOR ALL 
USING (
  (user_id = auth.uid()) OR 
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'hr'::app_role)
);