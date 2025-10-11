import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Shield, Target, CheckCircle, ArrowRight, PieChart, Calculator, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import investmentMeeting from "@/assets/investment-meeting.jpg";

const InvestmentAdvisory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChoosePlan = () => {
    toast({
      title: "Advisory Plan Selection",
      description: "Redirecting to plan selection and consultation scheduling...",
    });
    navigate("/contact");
  };

  const handlePortfolioReview = () => {
    toast({
      title: "Portfolio Review Request",
      description: "Your portfolio review request has been submitted. We'll contact you within 24 hours.",
    });
  };

  const handleInvestmentAnalysis = () => {
    toast({
      title: "Investment Analysis",
      description: "Redirecting to our investment analysis tools...",
    });
    navigate("/ai-search");
  };

  const handleScheduleSession = () => {
    toast({
      title: "Advisory Session",
      description: "Redirecting to schedule your advisory session...",
    });
    navigate("/contact");
  };
  const services = [
    {
      icon: BarChart3,
      title: "Market Analysis",
      description: "Comprehensive market research and trend analysis for informed investment decisions",
      features: ["Market trends", "Comparative analysis", "Growth projections", "Risk factors"]
    },
    {
      icon: Calculator,
      title: "ROI Projections",
      description: "Detailed financial modeling and return on investment calculations",
      features: ["Cash flow analysis", "Appreciation forecasts", "Tax implications", "Exit strategies"]
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Thorough evaluation of investment risks and mitigation strategies", 
      features: ["Market risks", "Property risks", "Financial risks", "Legal risks"]
    },
    {
      icon: PieChart,
      title: "Portfolio Diversification",
      description: "Strategic portfolio optimization across markets, property types, and geographies",
      features: ["Asset allocation", "Geographic spread", "Property mix", "Timeline optimization"]
    }
  ];

  const investmentTypes = [
    {
      type: "Residential Income",
      minInvestment: "$250K",
      avgROI: "8-12%",
      riskLevel: "Medium",
      highlights: ["Stable cash flow", "Appreciation potential", "Tax benefits"]
    },
    {
      type: "Commercial Properties", 
      minInvestment: "$1M",
      avgROI: "10-15%",
      riskLevel: "Medium-High",
      highlights: ["Higher returns", "Long-term leases", "Professional tenants"]
    },
    {
      type: "Development Projects",
      minInvestment: "$500K", 
      avgROI: "15-25%",
      riskLevel: "High",
      highlights: ["Maximum upside", "Value creation", "Market timing"]
    },
    {
      type: "REITs & Funds",
      minInvestment: "$50K",
      avgROI: "6-10%", 
      riskLevel: "Low-Medium",
      highlights: ["Liquidity", "Diversification", "Professional management"]
    }
  ];

  const advisoryProcess = [
    { step: "1", title: "Portfolio Review", desc: "Analyze current holdings and investment objectives" },
    { step: "2", title: "Strategy Development", desc: "Create customized investment strategy and goals" },
    { step: "3", title: "Opportunity Identification", desc: "Source and evaluate investment opportunities" },
    { step: "4", title: "Due Diligence", desc: "Comprehensive analysis of selected investments" },
    { step: "5", title: "Execution", desc: "Coordinate acquisition and closing process" },
    { step: "6", title: "Monitoring", desc: "Ongoing performance tracking and optimization" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img src={investmentMeeting} alt="Investment advisory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Strategic Investment Solutions
            </h1>
            <p className="text-2xl opacity-90">
              Maximize returns with data-driven strategies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="shadow-button" onClick={handleInvestmentAnalysis}>
                Investment Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white hover:text-primary" onClick={handleScheduleSession}>
                Schedule Session
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Investment Advisory Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive investment guidance combining market expertise, financial analysis, and strategic planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span className="text-card-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Investment Opportunities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Diverse investment options tailored to different risk profiles, investment amounts, and return objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentTypes.map((investment, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {investment.type}
                  </h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Min Investment:</span>
                      <span className="font-semibold">{investment.minInvestment}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg ROI:</span>
                      <span className="font-semibold text-accent">{investment.avgROI}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Risk Level:</span>
                      <span className="font-semibold">{investment.riskLevel}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="text-sm font-semibold text-foreground mb-2">Key Highlights:</div>
                    <ul className="space-y-1">
                      {investment.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Our Advisory Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A systematic approach to investment advisory that ensures every decision is data-driven and aligned with your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {advisoryProcess.map((item, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance & Stats */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
                Proven Investment Results
              </h2>
              <p className="text-xl text-muted-foreground">
                Our investment advisory services have consistently delivered superior returns for clients 
                across diverse market conditions and property types.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$150M+</div>
                  <div className="text-muted-foreground">Assets Under Advisory</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">12.5%</div>
                  <div className="text-muted-foreground">Average Annual Return</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Successful Investments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-muted-foreground">Client Retention Rate</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-primary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Investment Advisory Plans</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Basic Advisory</span>
                    <span className="text-xl font-bold">$2,500</span>
                  </div>
                  <p className="text-white/80 text-sm">Quarterly portfolio reviews and market analysis</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Premium Advisory</span>
                    <span className="text-xl font-bold">$5,000</span>
                  </div>
                  <p className="text-white/80 text-sm">Monthly reviews, deal sourcing, and due diligence</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Executive Advisory</span>
                    <span className="text-xl font-bold">$10,000</span>
                  </div>
                  <p className="text-white/80 text-sm">Dedicated advisor, private deals, and tax planning</p>
                </div>
              </div>
              <Button className="w-full mt-6 bg-white text-primary hover:bg-white/90" onClick={handleChoosePlan}>
                Choose Advisory Plan
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair mb-6">
            Optimize Your Investment Strategy
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Work with our investment advisory team to develop a customized strategy that maximizes returns 
            while managing risk across your real estate portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-button hover:scale-105 transition-all duration-300" onClick={handlePortfolioReview}>
              Request Portfolio Review
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary hover:bg-primary hover:text-primary-foreground" onClick={handleScheduleSession}>
              Schedule Strategy Session
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvestmentAdvisory;