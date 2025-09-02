import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ConsultationModal from "@/components/ConsultationModal";
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
  Target,
  Download
} from 'lucide-react';
import { marketData, type MarketData } from '@/data/marketData';
import { useToast } from '@/hooks/use-toast';

const Markets = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [visaFilter, setVisaFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('growth');
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [selectedMarketForConsultation, setSelectedMarketForConsultation] = useState<string>('');

  const handleViewMarketDetails = (marketId: string) => {
    navigate(`/markets/${marketId}`);
  };

  const handleScheduleConsultation = (marketCity: string) => {
    setSelectedMarketForConsultation(marketCity);
    setConsultationModalOpen(true);
  };

  const handleDownloadReport = (market: MarketData) => {
    // Generate and download market report
    const reportData = {
      market: market.city,
      date: new Date().toISOString().split('T')[0],
      summary: {
        specialization: market.specialization,
        averagePrice: market.avgPrice,
        growth: market.growth,
        successRate: market.successRate,
        averageROI: market.averageROI,
        investmentMinimum: market.investmentMinimum,
        processingTime: market.processingTime
      },
      marketMetrics: {
        population: market.population,
        gdp: market.gdp,
        businessRank: market.businessFriendlyRank,
        riskLevel: market.riskLevel,
        marketTrend: market.marketTrend
      },
      visaPrograms: market.visaPrograms,
      keyIndustries: market.keyIndustries,
      opportunities: market.opportunities,
      recentNews: market.recentNews
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${market.city.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_market_report.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: `${market.city} market report has been downloaded successfully.`,
    });
  };

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
                        <div className="text-2xl">{market.flag}</div>
                        <div>
                          <Badge className="bg-accent/15 text-accent text-xs mb-1">
                            {market.region}
                          </Badge>
                          <CardTitle className="text-lg font-bold text-primary">
                            {market.city}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {market.specialization}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(market.marketTrend)}
                        <Badge variant="outline" className={`text-xs ${
                          market.riskLevel === 'Low' ? 'border-green-500 text-green-600' :
                          market.riskLevel === 'Medium' ? 'border-yellow-500 text-yellow-600' :
                          'border-red-500 text-red-600'
                        }`}>
                          {market.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Market Stats */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-lg font-bold text-primary">{market.properties}</div>
                        <div className="text-xs text-muted-foreground">Properties</div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className={`text-lg font-bold ${getGrowthColor(market.growthValue)}`}>
                          {market.growth}
                        </div>
                        <div className="text-xs text-muted-foreground">Growth</div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Price:</span>
                        <span className="font-medium text-primary">{market.avgPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ROI Range:</span>
                        <span className="font-medium text-green-600">{market.averageROI}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Specialists:</span>
                        <span className="font-medium text-accent">{market.specialists}</span>
                      </div>
                    </div>

                    {/* Visa Programs & Industries */}
                    <Tabs defaultValue="visa" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 h-8">
                        <TabsTrigger value="visa" className="text-xs">Visa Programs</TabsTrigger>
                        <TabsTrigger value="industries" className="text-xs">Industries</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="visa" className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {market.visaPrograms.slice(0, 3).map((visa, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {visa}
                            </Badge>
                          ))}
                          {market.visaPrograms.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{market.visaPrograms.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="industries" className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {market.keyIndustries.slice(0, 2).map((industry, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {industry}
                            </Badge>
                          ))}
                          {market.keyIndustries.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{market.keyIndustries.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewMarketDetails(market.id)}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleScheduleConsultation(market.city)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Consult
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleDownloadReport(market)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
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
      </main>
      
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        marketLocation={selectedMarketForConsultation}
      />
      
      <Footer />
    </div>
  );
};

export default Markets;