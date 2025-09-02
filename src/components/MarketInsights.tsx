import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, BarChart3, Calendar } from "lucide-react";

const MarketInsights = () => {
  const marketData = [
    {
      title: "Texas Commercial Market",
      trend: "up",
      percentage: "+12.5%",
      description: "Year-over-year growth in commercial real estate values",
      insight: "Strong demand from international businesses relocating to Texas"
    },
    {
      title: "Business Acquisition Trend",
      trend: "up", 
      percentage: "+18.2%",
      description: "Increase in business acquisitions by foreign entrepreneurs",
      insight: "E-2 and EB-5 visa applicants driving market growth"
    },
    {
      title: "Residential Investment",
      trend: "up",
      percentage: "+8.7%",
      description: "Premium residential properties for immigrant investors",
      insight: "Houston and Austin leading in high-end property investments"
    }
  ];

  const recentInsights = [
    {
      date: "December 2024",
      title: "Immigration-Driven Real Estate: 2024 Market Report",
      excerpt: "Analysis of how immigration policies are shaping Texas real estate investments, with focus on business acquisition trends.",
      readTime: "5 min read"
    },
    {
      date: "November 2024", 
      title: "E-2 Visa Businesses: Top Investment Sectors",
      excerpt: "Comprehensive guide to the most successful business categories for E-2 treaty investor visa applications in Texas.",
      readTime: "8 min read"
    },
    {
      date: "November 2024",
      title: "Commercial Real Estate Tax Benefits for Foreign Investors",
      excerpt: "Understanding tax advantages and depreciation benefits for international clients investing in US commercial properties.",
      readTime: "6 min read"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
            Market Intelligence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay ahead with our exclusive market insights tailored for international 
            investors and immigration-focused real estate opportunities.
          </p>
        </div>

        {/* Market Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {marketData.map((data, index) => (
            <Card key={index} className="text-center hover:shadow-card transition-all duration-300 border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  {data.trend === "up" ? (
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  )}
                </div>
                <CardTitle className="text-3xl font-bold text-primary font-playfair">
                  {data.percentage}
                </CardTitle>
                <CardDescription className="text-base font-medium text-foreground">
                  {data.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground text-sm">
                  {data.description}
                </p>
                <div className="bg-accent/10 rounded-lg p-3">
                  <p className="text-xs text-accent-foreground font-medium">
                    💡 {data.insight}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Insights */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-playfair">
              Latest Market Insights
            </h3>
            <p className="text-muted-foreground">
              Expert analysis and market intelligence from our research team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentInsights.map((insight, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                <CardHeader className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{insight.date}</span>
                    <span>•</span>
                    <span>{insight.readTime}</span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {insight.excerpt}
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              Get Personalized Market Analysis
            </h3>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Receive tailored market insights and investment opportunities 
              based on your specific immigration and business goals.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-button"
            >
              Request Custom Report
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;