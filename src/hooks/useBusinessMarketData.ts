import { useState, useEffect } from 'react';

interface BusinessMarketData {
  id: string;
  state: string;
  city: string;
  stateCode: string;
  businessType: string;
  specialization: string;
  properties: number;
  specialists: number;
  avgPrice: string;
  growth: string;
  businessCategories: string[];
  flag: string;
}

export const useBusinessMarketData = () => {
  const [marketData, setMarketData] = useState<BusinessMarketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateBusinessMarketData = () => {
    const baseMarkets = [
      {
        id: 'miami-fl',
        state: 'Florida',
        city: 'Miami',
        stateCode: 'FL',
        businessType: 'Business Immigration Hub',
        specialization: 'EB-5 Investment & Restaurant Franchises',
        baseProperties: 1200,
        baseSpecialists: 25,
        basePrice: 850,
        currency: 'K',
        businessCategories: ['Restaurants', 'Retail', 'Real Estate', 'Healthcare'],
        flag: '🇺🇸'
      },
      {
        id: 'austin-tx',
        state: 'Texas',
        city: 'Austin',
        stateCode: 'TX',
        businessType: 'Tech Entrepreneur Hub',
        specialization: 'E-2 Visa & Tech Startups',
        baseProperties: 800,
        baseSpecialists: 22,
        basePrice: 650,
        currency: 'K',
        businessCategories: ['Technology', 'Software', 'E-commerce', 'Consulting'],
        flag: '🇺🇸'
      },
      {
        id: 'los-angeles-ca',
        state: 'California',
        city: 'Los Angeles',
        stateCode: 'CA',
        businessType: 'EB-5 Investment Center',
        specialization: 'Entertainment & Manufacturing',
        baseProperties: 950,
        baseSpecialists: 28,
        basePrice: 1200,
        currency: 'K',
        businessCategories: ['Entertainment', 'Manufacturing', 'Logistics', 'Food Service'],
        flag: '🇺🇸'
      },
      {
        id: 'new-york-ny',
        state: 'New York',
        city: 'New York City',
        stateCode: 'NY',
        businessType: 'Global Business Gateway',
        specialization: 'L-1 Visa & International Trade',
        baseProperties: 1100,
        baseSpecialists: 32,
        basePrice: 1500,
        currency: 'K',
        businessCategories: ['Finance', 'Import/Export', 'Professional Services', 'Fashion'],
        flag: '🇺🇸'
      },
      {
        id: 'chicago-il',
        state: 'Illinois',
        city: 'Chicago',
        stateCode: 'IL',
        businessType: 'Manufacturing Hub',
        specialization: 'Industrial & Distribution Centers',
        baseProperties: 600,
        baseSpecialists: 18,
        basePrice: 480,
        currency: 'K',
        businessCategories: ['Manufacturing', 'Distribution', 'Agriculture', 'Transportation'],
        flag: '🇺🇸'
      },
      {
        id: 'atlanta-ga',
        state: 'Georgia',
        city: 'Atlanta',
        stateCode: 'GA',
        businessType: 'Southern Business Center',
        specialization: 'Franchise & Logistics',
        baseProperties: 750,
        baseSpecialists: 20,
        basePrice: 420,
        currency: 'K',
        businessCategories: ['Franchises', 'Logistics', 'Healthcare', 'Hospitality'],
        flag: '🇺🇸'
      }
    ];

    const generatedData = baseMarkets.map(market => {
      // Add realistic variance to make it dynamic
      const propertyVariance = Math.floor((Math.random() - 0.5) * 200);
      const specialistVariance = Math.floor((Math.random() - 0.5) * 6);
      const priceVariance = Math.floor((Math.random() - 0.5) * 100);
      const growthPercent = Math.floor(Math.random() * 20) + 8; // 8-28% growth

      const properties = Math.max(100, market.baseProperties + propertyVariance);
      const specialists = Math.max(10, market.baseSpecialists + specialistVariance);
      const price = Math.max(200, market.basePrice + priceVariance);

      return {
        id: market.id,
        state: market.state,
        city: market.city,
        stateCode: market.stateCode,
        businessType: market.businessType,
        specialization: market.specialization,
        properties: properties,
        specialists: specialists,
        avgPrice: `$${price}${market.currency}`,
        growth: `+${growthPercent}%`,
        businessCategories: market.businessCategories,
        flag: market.flag
      };
    });

    setMarketData(generatedData);
    setIsLoading(false);
  };

  useEffect(() => {
    // Generate data on mount
    generateBusinessMarketData();

    // Regenerate every 45 seconds to simulate real-time updates
    const interval = setInterval(generateBusinessMarketData, 45000);

    return () => clearInterval(interval);
  }, []);

  return { marketData, isLoading, refreshData: generateBusinessMarketData };
};