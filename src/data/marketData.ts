export interface MarketData {
  id: string;
  country: string;
  city: string;
  flag: string;
  region: 'North America' | 'Latin America' | 'Europe';
  specialization: string;
  properties: number;
  specialists: number;
  avgPrice: string;
  growth: string;
  growthValue: number;
  // Detailed data
  population: string;
  gdp: string;
  businessFriendlyRank: number;
  visaPrograms: string[];
  keyIndustries: string[];
  averageROI: string;
  investmentMinimum: string;
  processingTime: string;
  successRate: string;
  marketTrend: 'Rising' | 'Stable' | 'Emerging';
  riskLevel: 'Low' | 'Medium' | 'High';
  description: string;
  opportunities: string[];
  recentNews: Array<{
    title: string;
    date: string;
    type: 'policy' | 'market' | 'investment';
  }>;
}

export const marketData: MarketData[] = [
  {
    id: '1',
    country: 'US',
    city: 'Miami, FL',
    flag: '🇺🇸',
    region: 'North America',
    specialization: 'Business Immigration Hub',
    properties: 1200,
    specialists: 25,
    avgPrice: '$850K',
    growth: '+12%',
    growthValue: 12,
    population: '6.1M',
    gdp: '$344B',
    businessFriendlyRank: 8,
    visaPrograms: ['E-2', 'EB-5', 'L-1'],
    keyIndustries: ['International Trade', 'Tourism', 'Finance', 'Real Estate'],
    averageROI: '8-12%',
    investmentMinimum: '$500K',
    processingTime: '6-12 months',
    successRate: '94%',
    marketTrend: 'Rising',
    riskLevel: 'Low',
    description: 'Gateway to Latin America with robust E-2 treaty investor programs and established international business community.',
    opportunities: [
      'Growing Latin American business connections',
      'International trade facilitation',
      'Tourism and hospitality sector expansion',
      'FinTech and crypto hub development'
    ],
    recentNews: [
      { title: 'New E-2 visa processing improvements', date: '2024-01-15', type: 'policy' },
      { title: 'Commercial real estate market surge', date: '2024-01-10', type: 'market' },
      { title: '$2.5B in foreign investment recorded', date: '2024-01-05', type: 'investment' }
    ]
  },
  {
    id: '2',
    country: 'CA',
    city: 'Toronto, ON',
    flag: '🇨🇦',
    region: 'North America',
    specialization: 'Startup Visa Program',
    properties: 800,
    specialists: 18,
    avgPrice: '$920K CAD',
    growth: '+15%',
    growthValue: 15,
    population: '6.2M',
    gdp: '$398B CAD',
    businessFriendlyRank: 3,
    visaPrograms: ['Start-up Visa', 'Self-Employed Persons', 'Investor Program'],
    keyIndustries: ['Technology', 'Financial Services', 'Healthcare', 'Education'],
    averageROI: '10-15%',
    investmentMinimum: '$200K CAD',
    processingTime: '12-24 months',
    successRate: '89%',
    marketTrend: 'Rising',
    riskLevel: 'Low',
    description: 'Canada\'s financial capital with world-class startup ecosystem and favorable immigration policies.',
    opportunities: [
      'Thriving tech startup scene',
      'Government support for innovation',
      'Proximity to US markets',
      'Multicultural business environment'
    ],
    recentNews: [
      { title: 'Record startup funding in Q4', date: '2024-01-12', type: 'investment' },
      { title: 'New tech visa pathways announced', date: '2024-01-08', type: 'policy' }
    ]
  },
  {
    id: '3',
    country: 'US',
    city: 'Austin, TX',
    flag: '🇺🇸',
    region: 'North America',
    specialization: 'Tech Entrepreneur Hub',
    properties: 600,
    specialists: 22,
    avgPrice: '$650K',
    growth: '+18%',
    growthValue: 18,
    population: '2.3M',
    gdp: '$143B',
    businessFriendlyRank: 5,
    visaPrograms: ['E-2', 'EB-5', 'O-1'],
    keyIndustries: ['Technology', 'Music & Entertainment', 'Clean Energy', 'Healthcare'],
    averageROI: '12-18%',
    investmentMinimum: '$500K',
    processingTime: '6-10 months',
    successRate: '96%',
    marketTrend: 'Rising',
    riskLevel: 'Medium',
    description: 'Silicon Hills with no state income tax, vibrant startup culture, and major tech company presence.',
    opportunities: [
      'Major tech company relocations',
      'No state income tax advantage',
      'Growing venture capital scene',
      'Strong university research partnerships'
    ],
    recentNews: [
      { title: 'Tesla Gigafactory expansion announced', date: '2024-01-14', type: 'investment' },
      { title: 'New startup incubator funding', date: '2024-01-09', type: 'market' }
    ]
  },
  {
    id: '4',
    country: 'MX',
    city: 'Mexico City, MX',
    flag: '🇲🇽',
    region: 'Latin America',
    specialization: 'USMCA Business Bridge',
    properties: 400,
    specialists: 15,
    avgPrice: '$380K',
    growth: '+22%',
    growthValue: 22,
    population: '21.8M',
    gdp: '$411B',
    businessFriendlyRank: 12,
    visaPrograms: ['Investor Visa', 'Business Visa', 'USMCA Professional'],
    keyIndustries: ['Manufacturing', 'Automotive', 'Aerospace', 'Fintech'],
    averageROI: '15-25%',
    investmentMinimum: '$160K',
    processingTime: '3-6 months',
    successRate: '91%',
    marketTrend: 'Emerging',
    riskLevel: 'Medium',
    description: 'Latin America\'s largest economy with USMCA benefits and growing nearshoring opportunities.',
    opportunities: [
      'USMCA trade agreement benefits',
      'Nearshoring manufacturing boom',
      'Growing middle class market',
      'Strategic location for US market access'
    ],
    recentNews: [
      { title: 'Nearshoring investment surge continues', date: '2024-01-11', type: 'investment' },
      { title: 'New manufacturing incentives announced', date: '2024-01-07', type: 'policy' }
    ]
  },
  {
    id: '5',
    country: 'US',
    city: 'Los Angeles, CA',
    flag: '🇺🇸',
    region: 'North America',
    specialization: 'EB-5 Investment Center',
    properties: 950,
    specialists: 28,
    avgPrice: '$1.2M',
    growth: '+8%',
    growthValue: 8,
    population: '12.9M',
    gdp: '$712B',
    businessFriendlyRank: 15,
    visaPrograms: ['EB-5', 'E-2', 'L-1', 'O-1'],
    keyIndustries: ['Entertainment', 'International Trade', 'Aerospace', 'Fashion'],
    averageROI: '6-10%',
    investmentMinimum: '$800K',
    processingTime: '24-36 months',
    successRate: '87%',
    marketTrend: 'Stable',
    riskLevel: 'Medium',
    description: 'Global entertainment capital with diverse economy and established EB-5 project pipeline.',
    opportunities: [
      'Entertainment industry connections',
      'Major port for international trade',
      'Established EB-5 project network',
      'Diverse multicultural markets'
    ],
    recentNews: [
      { title: 'Hollywood production investment up 15%', date: '2024-01-13', type: 'market' },
      { title: 'Port expansion creates opportunities', date: '2024-01-06', type: 'investment' }
    ]
  },
  {
    id: '6',
    country: 'CA',
    city: 'Vancouver, BC',
    flag: '🇨🇦',
    region: 'North America',
    specialization: 'Investor Immigration',
    properties: 500,
    specialists: 16,
    avgPrice: '$1.1M CAD',
    growth: '+10%',
    growthValue: 10,
    population: '2.6M',
    gdp: '$165B CAD',
    businessFriendlyRank: 6,
    visaPrograms: ['Investor Program', 'Start-up Visa', 'Self-Employed'],
    keyIndustries: ['Natural Resources', 'Technology', 'Film Production', 'Tourism'],
    averageROI: '8-14%',
    investmentMinimum: '$500K CAD',
    processingTime: '18-30 months',
    successRate: '85%',
    marketTrend: 'Stable',
    riskLevel: 'Low',
    description: 'Pacific Gateway with strong Asia-Pacific connections and natural beauty attracting global investment.',
    opportunities: [
      'Asia-Pacific trade gateway',
      'Growing tech sector',
      'Natural resources development',
      'Tourism and hospitality growth'
    ],
    recentNews: [
      { title: 'Asian investment partnerships grow', date: '2024-01-10', type: 'investment' },
      { title: 'Clean energy projects announced', date: '2024-01-04', type: 'market' }
    ]
  }
];