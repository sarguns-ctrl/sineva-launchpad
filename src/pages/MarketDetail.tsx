import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  Users, 
  TrendingUp, 
  MapPin, 
  DollarSign,
  BarChart3,
  Globe,
  ArrowUpRight,
  Calendar,
  Star,
  Target,
  ArrowLeft,
  Download,
  Clock,
  Shield,
  Briefcase,
  FileText,
  Phone,
  Mail
} from 'lucide-react';
import { marketData } from '@/data/marketData';

const MarketDetail = () => {
  const { marketId } = useParams();
  const navigate = useNavigate();
  
  const market = marketData.find(m => m.id === marketId);

  if (!market) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Market Not Found</h2>
          <Button onClick={() => navigate('/markets')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Markets
          </Button>
        </div>
      </div>
    );
  }

  const handleScheduleConsultation = () => {
    // This will be handled by the consultation modal
    console.log('Schedule consultation for', market.city);
  };

  const handleDownloadReport = () => {
    // Generate and download market report
    const reportData = {
      market: market.city,
      date: new Date().toISOString().split('T')[0],
      data: market
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${market.city.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_market_report.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const riskPercentage = market.riskLevel === 'Low' ? 25 : market.riskLevel === 'Medium' ? 50 : 75;
  const successPercentage = parseInt(market.successRate.replace('%', ''));

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${market.city} Market Analysis - Investment Opportunities | Grupo Sineva`}
        description={`Detailed analysis of ${market.city} real estate and business investment opportunities. ${market.description}`}
        keywords={[market.city, "investment opportunities", "market analysis", ...market.keyIndustries]}
      />
      <Navigation />
      
      <main className="pt-20">
        {/* Breadcrumb & Back Navigation */}
        <section className="py-6 border-b border-border/50">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/markets')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Markets
            </Button>
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Markets</span>
              <span>/</span>
              <span className="text-primary font-medium">{market.city}</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-6xl">{market.flag}</div>
                    <div>
                      <Badge className="bg-accent/15 text-accent mb-2">
                        <Globe className="w-4 h-4 mr-1" />
                        {market.region}
                      </Badge>
                      <h1 className="text-4xl md:text-5xl font-bold text-primary font-clash">
                        {market.city}
                      </h1>
                      <p className="text-xl text-muted-foreground mt-2">
                        {market.specialization}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-foreground mb-8 leading-relaxed">
                    {market.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Button onClick={handleScheduleConsultation} className="bg-primary hover:bg-primary/90">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Consultation
                    </Button>
                    <Button variant="outline" onClick={handleDownloadReport}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Full Report
                    </Button>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Specialist
                    </Button>
                  </div>
                </div>

                {/* Quick Stats Card */}
                <Card className="w-full lg:w-96">
                  <CardHeader>
                    <CardTitle className="text-lg">Market Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-primary">{market.properties}</div>
                        <div className="text-sm text-muted-foreground">Properties</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{market.growth}</div>
                        <div className="text-sm text-muted-foreground">Growth Rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{market.avgPrice}</div>
                        <div className="text-sm text-muted-foreground">Avg Price</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">{market.specialists}</div>
                        <div className="text-sm text-muted-foreground">Specialists</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Success Rate</span>
                        <span className="font-medium">{market.successRate}</span>
                      </div>
                      <Progress value={successPercentage} className="h-2" />
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Risk Level</span>
                        <Badge variant={market.riskLevel === 'Low' ? 'default' : 'secondary'}>
                          {market.riskLevel}
                        </Badge>
                      </div>
                      <Progress value={riskPercentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="investment" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="investment">Investment Details</TabsTrigger>
                <TabsTrigger value="visa">Visa Programs</TabsTrigger>
                <TabsTrigger value="market">Market Analysis</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              </TabsList>

              <TabsContent value="investment" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        Investment Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Minimum Investment</span>
                        <span className="font-medium">{market.investmentMinimum}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average ROI</span>
                        <span className="font-medium text-green-600">{market.averageROI}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing Time</span>
                        <span className="font-medium">{market.processingTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Success Rate</span>
                        <span className="font-medium text-green-600">{market.successRate}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        Market Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Population</span>
                        <span className="font-medium">{market.population}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GDP</span>
                        <span className="font-medium">{market.gdp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Business Ranking</span>
                        <span className="font-medium">#{market.businessFriendlyRank}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Market Trend</span>
                        <Badge>{market.marketTrend}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="visa" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        Available Visa Programs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {market.visaPrograms.map((visa, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <span className="font-medium">{visa}</span>
                            <Badge variant="outline">Available</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-purple-600" />
                        Key Industries
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {market.keyIndustries.map((industry, index) => (
                          <Badge key={index} variant="secondary">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="market" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-orange-600" />
                      Recent Market News
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {market.recentNews.map((news, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            news.type === 'policy' ? 'bg-blue-500' :
                            news.type === 'market' ? 'bg-green-500' : 'bg-purple-500'
                          }`} />
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground">{news.title}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span>{news.date}</span>
                              <Badge variant="outline" className="capitalize">
                                {news.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="opportunities" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      Investment Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {market.opportunities.map((opportunity, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                          <ArrowUpRight className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{opportunity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact Specialists Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Ready to Invest in {market.city}?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Connect with our {market.specialists} local specialists who can guide you through 
                the investment process and help you find the perfect opportunity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleScheduleConsultation} className="bg-primary hover:bg-primary/90">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Consultation
                </Button>
                <Button size="lg" variant="outline" onClick={handleDownloadReport}>
                  <Download className="w-5 h-5 mr-2" />
                  Download Market Report
                </Button>
                <Button size="lg" variant="outline">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Specialists
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketDetail;