-- Phase 1: Content Population - Fixed approach
-- Add sample properties across different types
INSERT INTO properties (title, description, property_type, listing_type, price, address, city, state, zip_code, bedrooms, bathrooms, square_feet, lot_size, year_built, status, featured, images, property_features) VALUES
('Luxury Downtown Condo', 'Modern luxury condominium in the heart of downtown with stunning city views and premium amenities.', 'Condo', 'sale', 850000, '123 Main Street Unit 1205', 'Miami', 'FL', '33131', 2, 2, 1200, NULL, 2019, 'active', true, '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"]', '["City Views", "Gym", "Pool", "Concierge", "Parking"]'),

('Suburban Family Home', 'Beautiful 4-bedroom family home in quiet suburban neighborhood with large backyard and excellent schools.', 'Single Family', 'sale', 475000, '456 Oak Avenue', 'Orlando', 'FL', '32801', 4, 3, 2400, 8500, 2015, 'active', false, '["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800", "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800"]', '["Large Yard", "Garage", "Updated Kitchen", "Hardwood Floors"]'),

('Beachfront Villa', 'Spectacular oceanfront villa with private beach access and panoramic water views.', 'Single Family', 'sale', 2850000, '789 Ocean Drive', 'Key Biscayne', 'FL', '33149', 5, 4, 4200, 12000, 2018, 'active', true, '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"]', '["Ocean Views", "Private Beach", "Pool", "Wine Cellar", "Smart Home"]'),

('Commercial Office Space', 'Prime commercial office space in business district, perfect for growing companies.', 'Commercial', 'lease', 8500, '321 Business Boulevard Suite 500', 'Tampa', 'FL', '33602', NULL, NULL, 3500, NULL, 2010, 'active', false, '["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"]', '["Conference Rooms", "Parking", "Reception Area", "High-Speed Internet"]'),

('Retail Storefront', 'High-traffic retail space in popular shopping district with excellent visibility.', 'Commercial', 'lease', 12000, '654 Shopping Center Drive', 'Jacksonville', 'FL', '32202', NULL, NULL, 2800, NULL, 2005, 'active', false, '["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"]', '["Street Facing", "High Traffic", "Display Windows", "Storage Area"]'),

('Investment Duplex', 'Excellent investment opportunity - duplex with two 2-bedroom units, currently rented.', 'Multi Family', 'sale', 320000, '987 Investment Lane', 'Gainesville', 'FL', '32601', 4, 4, 2000, 6000, 2008, 'active', false, '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"]', '["Rental Income", "Separate Utilities", "Parking", "Laundry Hookups"]'),

('Modern Townhouse', 'Contemporary townhouse with open floor plan and rooftop terrace in trendy neighborhood.', 'Townhouse', 'sale', 625000, '147 Modern Way', 'Fort Lauderdale', 'FL', '33301', 3, 2.5, 1800, 1200, 2020, 'active', true, '["https://images.unsplash.com/photo-1605276373954-0c4a0dac5cc0?w=800"]', '["Rooftop Terrace", "Open Floor Plan", "Modern Finishes", "Garage"]'),

('Luxury Penthouse', 'Exclusive penthouse with 360-degree city views and premium finishes throughout.', 'Condo', 'sale', 1950000, '555 Skyline Tower Penthouse', 'Miami', 'FL', '33131', 3, 3, 2800, NULL, 2021, 'active', true, '["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800"]', '["360 Views", "Private Elevator", "Terrace", "Premium Finishes", "Concierge"]'),

('Starter Home', 'Perfect starter home for first-time buyers in established neighborhood with good schools.', 'Single Family', 'sale', 285000, '852 Maple Street', 'Tallahassee', 'FL', '32301', 3, 2, 1400, 5500, 2005, 'active', false, '["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"]', '["Move-in Ready", "Fenced Yard", "Updated Appliances", "Quiet Street"]'),

('Warehouse Space', 'Large industrial warehouse with loading docks and office space, perfect for distribution.', 'Industrial', 'lease', 15000, '741 Industrial Parkway', 'Tampa', 'FL', '33619', NULL, NULL, 25000, 50000, 1995, 'active', false, '["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"]', '["Loading Docks", "Office Space", "High Ceilings", "Truck Access"]'),

('Rental Apartment', 'Spacious 2-bedroom apartment in desirable location with modern amenities.', 'Apartment', 'rent', 2200, '963 Rental Avenue Apt 3B', 'St. Petersburg', 'FL', '33701', 2, 2, 1100, NULL, 2016, 'active', false, '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]', '["Pool", "Fitness Center", "In-unit Laundry", "Balcony"]'),

('Golf Course Home', 'Stunning home on prestigious golf course with fairway views and club membership.', 'Single Family', 'sale', 1125000, '159 Fairway Drive', 'Naples', 'FL', '34102', 4, 3, 3200, 10000, 2012, 'active', true, '["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"]', '["Golf Course Views", "Club Membership", "Pool", "Premium Location"]'),

('Historic Charm', 'Beautifully restored historic home with original character and modern updates.', 'Single Family', 'sale', 525000, '357 Heritage Boulevard', 'St. Augustine', 'FL', '32084', 3, 2, 2200, 7500, 1925, 'active', false, '["https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800"]', '["Historic Character", "Restored Features", "Modern Updates", "Large Lot"]'),

('Medical Office', 'Professional medical office space with multiple exam rooms and reception area.', 'Commercial', 'lease', 18000, '753 Medical Plaza Drive', 'Sarasota', 'FL', '34236', NULL, NULL, 4200, NULL, 2008, 'active', false, '["https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800"]', '["Exam Rooms", "Reception Area", "Medical Equipment Ready", "Parking"]'),

('Lake House Retreat', 'Peaceful lakefront home perfect for weekend getaways or full-time living.', 'Single Family', 'sale', 675000, '951 Lake Shore Drive', 'Winter Haven', 'FL', '33880', 3, 2, 1900, 15000, 2010, 'active', true, '["https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800"]', '["Lakefront", "Dock", "Peaceful Setting", "Nature Views"]');

-- Add some sample businesses for the business marketplace
INSERT INTO businesses (business_name, description, industry, asking_price, annual_revenue, annual_profit, location_city, location_state, category_id, seller_id, status, visa_eligible, visa_types, years_established, number_of_employees, financing_available, training_provided, inventory_included, featured, images, assets_included, reason_for_selling, roi_percentage) VALUES
('Miami Beach Restaurant', 'Established beachfront restaurant with prime location and loyal customer base. Fully equipped kitchen and outdoor seating.', 'Food Service', 850000, 1200000, 180000, 'Miami Beach', 'FL', (SELECT id FROM business_categories LIMIT 1), (SELECT user_id FROM profiles LIMIT 1), 'approved', true, '{"E-2", "EB-5"}', 8, 12, true, true, true, true, '["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"]', '{"equipment", "furniture", "inventory", "goodwill"}', 'Owner retiring, looking for motivated buyer to continue success', 15.2),

('Orlando Tech Startup', 'Growing software development company with established client base and recurring revenue streams.', 'Technology', 450000, 680000, 95000, 'Orlando', 'FL', (SELECT id FROM business_categories LIMIT 1), (SELECT user_id FROM profiles LIMIT 1), 'approved', true, '{"E-2", "L-1"}', 4, 8, false, true, false, false, '["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"]', '{"client_contracts", "software_licenses", "equipment"}', 'Founder moving to West Coast, established business ready for new leadership', 14.0),

('Tampa Fitness Center', 'Well-established fitness center with modern equipment and strong membership base in growing area.', 'Fitness', 320000, 480000, 72000, 'Tampa', 'FL', (SELECT id FROM business_categories LIMIT 1), (SELECT user_id FROM profiles LIMIT 1), 'approved', true, '{"E-2"}', 6, 5, true, true, true, true, '["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"]', '{"equipment", "membership_base", "lease_agreement"}', 'Owner diversifying investments, profitable and growing business', 22.5),

('Jacksonville Auto Repair', 'Full-service automotive repair shop with established customer base and excellent reputation.', 'Automotive', 275000, 420000, 68000, 'Jacksonville', 'FL', (SELECT id FROM business_categories LIMIT 1), (SELECT user_id FROM profiles LIMIT 1), 'approved', false, NULL, 12, 6, true, true, true, false, '["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800"]', '{"equipment", "tools", "customer_database"}', 'Retirement sale, turn-key operation with loyal customers', 24.7),

('Fort Lauderdale Marina', 'Marina and boat services business with prime waterfront location and multiple revenue streams.', 'Marine Services', 1250000, 890000, 156000, 'Fort Lauderdale', 'FL', (SELECT id FROM business_categories LIMIT 1), (SELECT user_id FROM profiles LIMIT 1), 'approved', true, '{"EB-5", "E-2"}', 15, 8, false, true, false, true, '["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"]', '{"marina_slips", "equipment", "real_estate", "contracts"}', 'Owner relocating, exceptional waterfront business opportunity', 17.5);

-- Add sample market insights data
INSERT INTO market_insights (location, time_period, insight_type, data_source, insight_summary, data_points) VALUES
('Miami-Dade County', '2024 Q4', 'Price Trends', 'MLS Data', 'Luxury condo market shows 8% growth year-over-year with strong international buyer interest.', '{"median_price": 650000, "price_change": 8.2, "days_on_market": 45, "inventory_level": "low"}'),
('Orlando Metro', '2024 Q4', 'Inventory Analysis', 'Local MLS', 'Single-family home inventory remains tight with 2.1 months supply, favoring sellers.', '{"months_supply": 2.1, "new_listings": 1250, "pending_sales": 2100, "absorption_rate": 0.95}'),
('Tampa Bay', '2024 Q4', 'Commercial Trends', 'Commercial Board', 'Office space demand recovering with 12% increase in leasing activity this quarter.', '{"vacancy_rate": 18.5, "lease_rate_psf": 28.50, "new_construction": 450000, "absorption": 125000}'),
('Jacksonville', '2024 Q4', 'Investment Activity', 'Investment Reports', 'Multi-family properties see strong cap rate compression, indicating healthy investment climate.', '{"cap_rates": 5.8, "transaction_volume": 285000000, "price_per_unit": 125000, "occupancy_rate": 94.2}'),
('Naples', '2024 Q4', 'Luxury Market', 'Luxury MLS', 'Ultra-luxury segment ($2M+) shows resilience with 15% increase in closed sales.', '{"luxury_sales": 156, "median_luxury_price": 2850000, "luxury_inventory": 8.2, "international_buyers": 42}}');

-- Phase 2: Fix critical security issues
-- Remove the problematic RLS bypass policy and create proper secure policies
DROP POLICY IF EXISTS "Admins can view all data" ON profiles;

-- Create proper admin access policy for profiles
CREATE POLICY "HR and Admin can view all profiles" 
ON profiles FOR ALL 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'hr'::app_role)
);

-- Fix posts admin policy to use proper role checking
DROP POLICY IF EXISTS "Admins can view all posts" ON posts;
CREATE POLICY "Admins can view all posts" 
ON posts FOR ALL 
USING (
  (user_id = auth.uid()) OR 
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'hr'::app_role)
);