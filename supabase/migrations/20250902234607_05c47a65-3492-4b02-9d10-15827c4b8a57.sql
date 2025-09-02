-- Add remaining sample data without conflicts
INSERT INTO properties (title, description, property_type, listing_type, price, address, city, state, zip_code, bedrooms, bathrooms, square_feet, lot_size, year_built, status, featured, images, property_features) VALUES
('Luxury Penthouse', 'Exclusive penthouse with 360-degree city views.', 'Condo', 'sale', 1950000, '555 Skyline Tower Penthouse', 'Miami', 'FL', '33131', 3, 3, 2800, NULL, 2021, 'active', true, '["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800"]', '["360 Views", "Private Elevator", "Terrace"]'),
('Medical Office', 'Professional medical office space with exam rooms.', 'Commercial', 'lease', 18000, '753 Medical Plaza Drive', 'Sarasota', 'FL', '34236', NULL, NULL, 4200, NULL, 2008, 'active', false, '["https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800"]', '["Exam Rooms", "Reception Area", "Medical Ready"]'),
('Historic Charm', 'Beautifully restored historic home with original character.', 'Single Family', 'sale', 525000, '357 Heritage Boulevard', 'St. Augustine', 'FL', '32084', 3, 2, 2200, 7500, 1925, 'active', false, '["https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800"]', '["Historic Character", "Modern Updates", "Large Lot"]'),
('Rental Apartment', 'Spacious 2-bedroom apartment with modern amenities.', 'Apartment', 'rent', 2200, '963 Rental Avenue Apt 3B', 'St. Petersburg', 'FL', '33701', 2, 2, 1100, NULL, 2016, 'active', false, '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]', '["Pool", "Fitness Center", "In-unit Laundry"]');

-- Add basic departments if not existing  
INSERT INTO departments (name, description) 
SELECT 'Sales', 'Real Estate Sales Department'
WHERE NOT EXISTS (SELECT 1 FROM departments WHERE name = 'Sales');

-- Add business categories
INSERT INTO business_categories (name, description) 
SELECT 'Food & Beverage', 'Restaurants, cafes, and food service businesses'
WHERE NOT EXISTS (SELECT 1 FROM business_categories WHERE name = 'Food & Beverage');

INSERT INTO business_categories (name, description) 
SELECT 'Technology', 'Software, IT services, and tech startups'  
WHERE NOT EXISTS (SELECT 1 FROM business_categories WHERE name = 'Technology');

INSERT INTO business_categories (name, description)
SELECT 'Fitness & Health', 'Gyms, wellness centers, and health services'
WHERE NOT EXISTS (SELECT 1 FROM business_categories WHERE name = 'Fitness & Health');