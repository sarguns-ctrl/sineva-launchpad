import React, { useState } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Users, 
  TrendingUp, 
  MapPin, 
  Search, 
  Filter,
  DollarSign,
  BarChart3,
  Globe,
  ArrowUpRight,
  Calendar,
  Star,
  Target
} from 'lucide-react';

interface MarketData {
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

const Markets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [visaFilter, setVisaFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('growth');

  const marketData: MarketData[] = [
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

  const filteredMarkets = marketData.filter(market => {
    const matchesSearch = market.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.keyIndustries.some(industry => 
                           industry.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesRegion = regionFilter === 'all' || market.region === regionFilter;
    const matchesVisa = visaFilter === 'all' || market.visaPrograms.includes(visaFilter);
    
    return matchesSearch && matchesRegion && matchesVisa;
  });

  const sortedMarkets = [...filteredMarkets].sort((a, b) => {
    switch (sortBy) {
      case 'growth':
        return b.growthValue - a.growthValue;
      case 'properties':
        return b.properties - a.properties;
      case 'roi':
        return parseFloat(b.averageROI.split('-')[1] || '0') - parseFloat(a.averageROI.split('-')[1] || '0');
      default:
        return 0;
    }
  });

  const getGrowthColor = (growth: number) => {
    if (growth >= 15) return 'text-green-600';
    if (growth >= 10) return 'text-green-500';
    return 'text-orange-500';
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Rising': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'Stable': return <BarChart3 className="w-4 h-4 text-blue-600" />;
      case 'Emerging': return <ArrowUpRight className="w-4 h-4 text-purple-600" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const marketOverviewStats = [
    {
      label: 'Total Markets',
      value: marketData.length,
      icon: Globe,
      description: 'Investment destinations'
    },
    {
      label: 'Active Properties',
      value: marketData.reduce((sum, market) => sum + market.properties, 0).toLocaleString(),
      icon: Building,
      description: 'Available investments'
    },
    {
      label: 'Market Specialists',
      value: marketData.reduce((sum, market) => sum + market.specialists, 0),
      icon: Users,
      description: 'Expert consultants'
    },
    {
      label: 'Avg Growth Rate',
      value: `${Math.round(marketData.reduce((sum, market) => sum + market.growthValue, 0) / marketData.length)}%`,
      icon: TrendingUp,
      description: 'Year-over-year'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Global Investment Markets - Real Estate Opportunities | Grupo Sineva"
        description="Explore international real estate investment opportunities across North America and Latin America. Detailed market analysis, visa programs, and investment guides."
        keywords={["investment markets", "international real estate", "visa investment", "market analysis", "global opportunities"]}
      />
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Badge className="bg-accent/15 text-accent mb-4">
                <Globe className="w-4 h-4 mr-1" />
                Global Market Intelligence
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-clash">
                Investment Markets Overview
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive analysis of international real estate and business investment opportunities 
                with detailed market insights, visa programs, and expert guidance.
              </p>
            </div>

            {/* Market Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {marketOverviewStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm font-medium text-foreground">{stat.label}</div>
                      <div className="text-xs text-muted-foreground">{stat.description}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search markets, specializations, industries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-3 items-center">
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="North America">North America</SelectItem>
                    <SelectItem value="Latin America">Latin America</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={visaFilter} onValueChange={setVisaFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Visa Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Visas</SelectItem>
                    <SelectItem value="E-2">E-2</SelectItem>
                    <SelectItem value="EB-5">EB-5</SelectItem>
                    <SelectItem value="L-1">L-1</SelectItem>
                    <SelectItem value="Start-up Visa">Startup Visa</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="properties">Properties</SelectItem>
                    <SelectItem value="roi">ROI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Markets Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {sortedMarkets.map((market) => (
                <Card key={market.id} className="group hover:shadow-elegant transition-all duration-300 overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{market.flag}</span>
                        <div>
                          <CardTitle className="text-lg group-hover:text-accent transition-colors">
                            {market.city}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {market.region}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(market.marketTrend)}
                        <span className="text-xs text-muted-foreground">{market.marketTrend}</span>
                      </div>
                    </div>
                    
                    <Badge className="bg-accent/10 text-accent text-xs w-fit">
                      {market.specialization}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="font-bold text-primary">{market.properties.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Properties</div>
                      </div>
                      <div>
                        <div className="font-bold text-primary">{market.avgPrice}</div>
                        <div className="text-xs text-muted-foreground">Avg Price</div>
                      </div>
                      <div>
                        <div className={`font-bold ${getGrowthColor(market.growthValue)}`}>
                          {market.growth}
                        </div>
                        <div className="text-xs text-muted-foreground">Growth</div>
                      </div>
                    </div>

                    {/* Investment Details */}
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 text-xs">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="investment">Investment</TabsTrigger>
                        <TabsTrigger value="news">News</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="space-y-3 mt-4">
                        <p className="text-sm text-muted-foreground">{market.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Population:</span>
                            <span className="font-medium">{market.population}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Business Rank:</span>
                            <span className="font-medium">#{market.businessFriendlyRank}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Risk Level:</span>
                            <Badge className={`text-xs ${getRiskBadgeColor(market.riskLevel)}`}>
                              {market.riskLevel}
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-2">Visa Programs:</div>
                          <div className="flex flex-wrap gap-1">
                            {market.visaPrograms.map((visa, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {visa}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="investment" className="space-y-3 mt-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Min Investment</div>
                            <div className="font-bold text-accent">{market.investmentMinimum}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">ROI Range</div>
                            <div className="font-bold text-green-600">{market.averageROI}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Processing</div>
                            <div className="font-medium">{market.processingTime}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Success Rate</div>
                            <div className="font-bold text-primary">{market.successRate}</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-2">Key Industries:</div>
                          <div className="flex flex-wrap gap-1">
                            {market.keyIndustries.slice(0, 3).map((industry, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {industry}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-2">Opportunities:</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {market.opportunities.slice(0, 2).map((opp, idx) => (
                              <li key={idx} className="flex items-start">
                                <Target className="w-3 h-3 mr-1 mt-0.5 text-accent flex-shrink-0" />
                                {opp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="news" className="space-y-2 mt-4">
                        {market.recentNews.slice(0, 2).map((news, idx) => (
                          <div key={idx} className="p-2 bg-muted/20 rounded-lg">
                            <div className="text-sm font-medium">{news.title}</div>
                            <div className="flex items-center justify-between mt-1">
                              <Badge variant="outline" className="text-xs capitalize">
                                {news.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(news.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>

                    <Button className="w-full" variant="outline">
                      View Market Details
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedMarkets.length === 0 && (
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Markets Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters to find markets.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Ready to Invest in Global Markets?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with our market specialists for personalized investment guidance 
              and detailed market analysis tailored to your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary">
                Schedule Market Consultation
                <Calendar className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Download Market Reports
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Markets;