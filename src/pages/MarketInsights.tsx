import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  ExternalLink,
  Globe,
  DollarSign,
  Building2,
  Home,
  Briefcase,
  Users,
  MapPin,
  Clock,
  Target,
  ArrowRight,
  FileText,
  Zap,
  Award,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const MarketInsights = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDownloadReport = (reportTitle: string) => {
    toast({
      title: "Report Download",
      description: `"${reportTitle}" will be sent to your email shortly.`,
    });
  };

  const handleSubscribeUpdates = async () => {
    if (!subscriberEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscriberEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email: subscriberEmail }
      });

      if (error) throw error;

      toast({
        title: "Subscription Added",
        description: "You'll receive daily market updates with AI-curated property insights!",
      });
      
      setShowSubscribeDialog(false);
      setSubscriberEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestCustomReport = () => {
    navigate('/contact');
  };

  const marketOverview = [
    {
      title: "Texas Commercial Market",
      value: "$2.85B",
      change: "+12.8%",
      trend: "up",
      description: "Total commercial real estate transactions Q3 2024",
      icon: Building2
    },
    {
      title: "International Investment",
      value: "$847M", 
      change: "+24.3%",
      trend: "up",
      description: "Foreign capital deployed in Texas real estate",
      icon: Globe
    },
    {
      title: "E-2 Business Sales",
      value: "1,247",
      change: "+18.7%", 
      trend: "up",
      description: "Businesses sold to E-2 visa applicants",
      icon: Briefcase
    },
    {
      title: "Residential Investment",
      value: "$1.12B",
      change: "+8.9%",
      trend: "up", 
      description: "Luxury residential purchases by foreign buyers",
      icon: Home
    }
  ];

  const regionalData = [
    {
      city: "Houston",
      population: "2.3M",
      medianPrice: "$425,000",
      growth: "+11.2%",
      investmentGrade: "A+",
      highlights: ["Energy hub", "Port access", "Diverse economy"]
    },
    {
      city: "Austin", 
      population: "965K",
      medianPrice: "$587,000",
      growth: "+15.8%",
      investmentGrade: "A",
      highlights: ["Tech center", "University town", "High growth"]
    },
    {
      city: "Dallas",
      population: "1.34M", 
      medianPrice: "$398,000",
      growth: "+9.7%",
      investmentGrade: "A+",
      highlights: ["Financial center", "Corporate HQs", "Infrastructure"]
    },
    {
      city: "San Antonio",
      population: "1.55M",
      medianPrice: "$285,000", 
      growth: "+7.3%",
      investmentGrade: "A-",
      highlights: ["Military presence", "Healthcare", "Tourism"]
    }
  ];

  const investmentTrends = [
    {
      category: "Commercial Office",
      currentYield: "7.2%",
      forecast: "Stable",
      risk: "Low",
      visaCompatible: ["E-2", "EB-5"],
      insight: "Strong demand from international businesses relocating to Texas"
    },
    {
      category: "Industrial/Warehouse", 
      currentYield: "8.5%",
      forecast: "Growing",
      risk: "Low",
      visaCompatible: ["EB-5", "E-2"],
      insight: "E-commerce growth driving warehouse demand"
    },
    {
      category: "Retail Centers",
      currentYield: "6.8%",
      forecast: "Moderate", 
      risk: "Medium",
      visaCompatible: ["E-2", "EB-5"],
      insight: "Recovery in foot traffic, focus on experience-based retail"
    },
    {
      category: "Multifamily",
      currentYield: "5.9%",
      forecast: "Strong",
      risk: "Low", 
      visaCompatible: ["EB-5"],
      insight: "Population growth driving rental demand"
    }
  ];

  const recentReports = [
    {
      title: "Q3 2024 Texas Immigration Real Estate Report",
      date: "November 2024",
      type: "Quarterly Report",
      pages: 47,
      highlights: ["E-2 visa trends", "Commercial market analysis", "Investment hotspots"],
      downloadUrl: "#"
    },
    {
      title: "EB-5 Investment Opportunities: Commercial Real Estate Focus",
      date: "October 2024", 
      type: "Special Report",
      pages: 28,
      highlights: ["EB-5 compliance", "Job creation analysis", "ROI projections"],
      downloadUrl: "#"
    },
    {
      title: "International Buyer Trends in Texas Luxury Markets",
      date: "October 2024",
      type: "Market Analysis", 
      pages: 35,
      highlights: ["Luxury market trends", "Foreign buyer preferences", "Tax implications"],
      downloadUrl: "#"
    },
    {
      title: "Small Business Acquisition Guide for E-2 Investors",
      date: "September 2024",
      type: "Investment Guide",
      pages: 52,
      highlights: ["Due diligence", "Valuation methods", "Visa requirements"],
      downloadUrl: "#"
    }
  ];

  const economicIndicators = [
    {
      indicator: "GDP Growth (Texas)",
      value: "4.2%",
      national: "2.8%", 
      status: "outperforming"
    },
    {
      indicator: "Employment Rate", 
      value: "96.3%",
      national: "95.1%",
      status: "above"
    },
    {
      indicator: "Population Growth",
      value: "1.8%",
      national: "0.4%",
      status: "leading"
    },
    {
      indicator: "Business Formation",
      value: "+23.4%",
      national: "+12.1%", 
      status: "exceptional"
    }
  ];

  const tabs = [
    { id: "overview", label: "Market Overview" },
    { id: "regional", label: "Regional Analysis" }, 
    { id: "investment", label: "Investment Trends" },
    { id: "reports", label: "Reports & Research" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium">
              MARKET INTELLIGENCE
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair">
              Real Estate Market Insights
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Comprehensive market analysis and investment intelligence for international 
              real estate investors. Data-driven insights to guide your investment decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-6 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center space-x-2"
              >
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Market Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* Key Metrics */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-foreground mb-8 font-playfair text-center">
                Market Performance Q3 2024
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {marketOverview.map((metric, index) => (
                  <Card key={index} className="text-center hover:shadow-card transition-all duration-300 border-0 shadow-sm">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <metric.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl font-bold font-playfair">{metric.value}</CardTitle>
                      <div className="flex items-center justify-center space-x-1">
                        {metric.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {metric.change}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">{metric.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Economic Indicators */}
              <div className="bg-muted/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6 font-playfair text-center">
                  Texas Economic Indicators
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {economicIndicators.map((indicator, index) => (
                    <div key={index} className="text-center space-y-2">
                      <div className="text-lg font-semibold text-foreground">{indicator.indicator}</div>
                      <div className="text-3xl font-bold text-primary font-playfair">{indicator.value}</div>
                      <div className="text-sm text-muted-foreground">
                        US Average: {indicator.national}
                      </div>
                      <Badge className={`text-xs ${
                        indicator.status === "outperforming" || indicator.status === "leading" || indicator.status === "exceptional" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {indicator.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Regional Analysis Tab */}
      {activeTab === "regional" && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-playfair text-center">
              Texas Major Markets Analysis
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regionalData.map((city, index) => (
                <Card key={index} className="hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-2xl font-playfair">{city.city}</CardTitle>
                      <Badge className={`${
                        city.investmentGrade.startsWith("A") 
                          ? "bg-green-100 text-green-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        Grade {city.investmentGrade}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Population</div>
                        <div className="text-xl font-semibold">{city.population}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Median Price</div>
                        <div className="text-xl font-semibold">{city.medianPrice}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">YoY Growth:</span>
                      <span className="text-lg font-semibold text-green-600">{city.growth}</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Key Highlights</div>
                      <div className="flex flex-wrap gap-2">
                        {city.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                     <Button className="w-full" onClick={() => navigate('/properties')}>
                         View {city.city} Properties
                     </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Investment Trends Tab */}
      {activeTab === "investment" && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-playfair text-center">
              Investment Category Analysis
            </h2>
            
            <div className="space-y-6">
              {investmentTrends.map((trend, index) => (
                <Card key={index} className="hover:shadow-card transition-all duration-300 border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-3">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{trend.category}</h3>
                        <p className="text-muted-foreground text-sm">{trend.insight}</p>
                      </div>
                      
                      <div className="lg:col-span-2 text-center">
                        <div className="text-sm text-muted-foreground">Current Yield</div>
                        <div className="text-2xl font-bold text-primary font-playfair">{trend.currentYield}</div>
                      </div>
                      
                      <div className="lg:col-span-2 text-center">
                        <div className="text-sm text-muted-foreground">Forecast</div>
                        <Badge className={`${
                          trend.forecast === "Strong" || trend.forecast === "Growing" 
                            ? "bg-green-100 text-green-700"
                            : trend.forecast === "Stable" || trend.forecast === "Moderate"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {trend.forecast}
                        </Badge>
                      </div>
                      
                      <div className="lg:col-span-2 text-center">
                        <div className="text-sm text-muted-foreground">Risk Level</div>
                        <Badge className={`${
                          trend.risk === "Low" 
                            ? "bg-green-100 text-green-700"
                            : trend.risk === "Medium"
                            ? "bg-yellow-100 text-yellow-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {trend.risk}
                        </Badge>
                      </div>
                      
                      <div className="lg:col-span-3">
                        <div className="text-sm text-muted-foreground mb-2">Visa Compatible</div>
                        <div className="flex flex-wrap gap-1">
                          {trend.visaCompatible.map((visa, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {visa}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reports & Research Tab */}
      {activeTab === "reports" && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-playfair text-center">
              Research Reports & Analysis
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentReports.map((report, index) => (
                <Card key={index} className="hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge className="bg-primary/10 text-primary mb-3">{report.type}</Badge>
                        <CardTitle className="text-lg leading-tight mb-2">{report.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{report.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="h-4 w-4" />
                            <span>{report.pages} pages</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-foreground mb-2">Key Highlights:</div>
                      <ul className="space-y-1">
                        {report.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button className="flex-1" onClick={() => handleDownloadReport(report.title)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                      <Button variant="outline" onClick={() => handleDownloadReport(report.title)}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white space-y-6">
            <BarChart3 className="h-16 w-16 mx-auto text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold font-playfair">
              Get Personalized Market Analysis
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Receive customized market insights and investment recommendations 
              tailored to your specific immigration goals and investment criteria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-button" onClick={handleRequestCustomReport}>
                Request Custom Report
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary" onClick={() => setShowSubscribeDialog(true)}>
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Subscribe Dialog */}
      <Dialog open={showSubscribeDialog} onOpenChange={setShowSubscribeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subscribe to Market Updates</DialogTitle>
            <DialogDescription>
              Get weekly market insights, investment opportunities, and exclusive reports delivered to your inbox.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubscribeUpdates();
                  }
                }}
              />
            </div>
            <Button 
              className="w-full" 
              onClick={handleSubscribeUpdates}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketInsights;