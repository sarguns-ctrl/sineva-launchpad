import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Globe,
  Building2,
  Gavel,
  DollarSign,
  Users
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InteractiveCard from "@/components/InteractiveCard";

const News = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  const breakingNews = {
    id: 1,
    title: "Federal Reserve Announces New Interest Rate Decision - Impact on Commercial Real Estate",
    excerpt: "Latest Fed decision affects commercial real estate investments and E-2/EB-5 visa applications.",
    date: "2024-03-15",
    time: "09:30 AM EST",
    urgent: true,
    category: "Market Update"
  };

  const newsCategories = [
    {
      id: "market-updates",
      label: "Market Updates",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: "policy-changes",
      label: "Policy Changes", 
      icon: Gavel,
      color: "bg-red-100 text-red-700"
    },
    {
      id: "immigration-news",
      label: "Immigration News",
      icon: Globe,
      color: "bg-green-100 text-green-700"
    },
    {
      id: "industry-updates",
      label: "Industry Updates",
      icon: Building2,
      color: "bg-purple-100 text-purple-700"
    }
  ];

  const newsArticles = [
    {
      id: 2,
      title: "New USCIS Guidelines for E-2 Visa Business Investments Released",
      excerpt: "Updated guidelines provide clearer criteria for qualifying business investments under the E-2 treaty investor visa program.",
      date: "2024-03-14",
      time: "2:15 PM EST",
      category: "Policy Changes",
      categoryId: "policy-changes",
      priority: "high",
      source: "USCIS Official Statement",
      tags: ["E-2 Visa", "USCIS", "Policy Update"]
    },
    {
      id: 3,
      title: "Texas Commercial Real Estate Market Reaches Record High in Q1 2024",
      excerpt: "Commercial property values in major Texas cities hit all-time highs, driven by international investment and business relocations.",
      date: "2024-03-13",
      time: "4:45 PM EST",
      category: "Market Updates",
      categoryId: "market-updates",
      priority: "medium",
      source: "Texas Real Estate Commission",
      tags: ["Texas", "Commercial", "Market Growth"]
    },
    {
      id: 4,
      title: "EB-5 Program Extends Regional Center Authorization Through 2025",
      excerpt: "Congress approves extension of EB-5 Regional Center Program with new integrity measures and increased investment thresholds.",
      date: "2024-03-12",
      time: "11:30 AM EST", 
      category: "Immigration News",
      categoryId: "immigration-news",
      priority: "high",
      source: "Department of Homeland Security",
      tags: ["EB-5", "Regional Centers", "Congress"]
    },
    {
      id: 5,
      title: "Houston Emerges as Top Destination for International Business Acquisitions",
      excerpt: "New report shows Houston leading in international business acquisitions, particularly from Latin American entrepreneurs.",
      date: "2024-03-11",
      time: "1:20 PM EST",
      category: "Industry Updates",
      categoryId: "industry-updates", 
      priority: "medium",
      source: "Greater Houston Partnership",
      tags: ["Houston", "International", "Business Acquisition"]
    },
    {
      id: 6,
      title: "Changes to Currency Exchange Regulations Affect International Property Buyers",
      excerpt: "New Treasury Department regulations impact how international buyers can transfer funds for US real estate purchases.",
      date: "2024-03-10",
      time: "10:15 AM EST",
      category: "Policy Changes",
      categoryId: "policy-changes",
      priority: "medium",
      source: "US Treasury Department",
      tags: ["Currency", "Regulations", "International Buyers"]
    },
    {
      id: 7,
      title: "Austin Tech Sector Growth Drives Commercial Real Estate Demand",
      excerpt: "Continued expansion of Austin's technology sector creates new opportunities for commercial real estate investors.",
      date: "2024-03-09",
      time: "3:00 PM EST",
      category: "Market Updates",
      categoryId: "market-updates",
      priority: "low",
      source: "Austin Chamber of Commerce",
      tags: ["Austin", "Technology", "Commercial Real Estate"]
    },
    {
      id: 8,
      title: "New Immigration Attorney Certification Program for Real Estate Professionals",
      excerpt: "National Association of Realtors launches certification program to help agents better serve international clients.",
      date: "2024-03-08",
      time: "9:45 AM EST",
      category: "Industry Updates",
      categoryId: "industry-updates",
      priority: "low",
      source: "National Association of Realtors",
      tags: ["Certification", "Real Estate", "Immigration"]
    }
  ];

  const marketAlerts = [
    {
      title: "Interest Rates",
      change: "+0.25%",
      status: "up",
      description: "Federal Reserve raises rates"
    },
    {
      title: "Commercial Property Index",
      change: "+3.8%",
      status: "up", 
      description: "Month-over-month growth"
    },
    {
      title: "International Investment", 
      change: "+12.5%",
      status: "up",
      description: "Year-over-year increase"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700 border-red-200">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Medium Priority</Badge>;
      default:
        return <Badge variant="secondary">Standard</Badge>;
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = newsCategories.find(cat => cat.id === categoryId);
    return category ? category.icon : AlertCircle;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={headerRef}
            className={`text-center space-y-6 transition-all duration-1000 ${
              headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium">
              LATEST NEWS
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair">
              Industry News & Updates
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Stay informed with the latest developments in real estate markets, 
              immigration policy changes, and industry regulations affecting international investors.
            </p>
          </div>
        </div>
      </section>

      {/* Market Alerts Bar */}
      <section className="py-6 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Live Market Indicators
            </h2>
            <div className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between bg-background rounded-lg p-4 shadow-sm">
                <div>
                  <div className="font-semibold text-foreground">{alert.title}</div>
                  <div className="text-sm text-muted-foreground">{alert.description}</div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${alert.status === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {alert.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breaking News */}
      {breakingNews && (
        <section className="py-8 bg-red-50 border-b border-red-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-red-200 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Badge className="bg-red-600 text-white animate-pulse">
                      BREAKING NEWS
                    </Badge>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold text-foreground">
                      {breakingNews.title}
                    </h3>
                    <p className="text-muted-foreground">{breakingNews.excerpt}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(breakingNews.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{breakingNews.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="flex-shrink-0">
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* News Categories */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 font-playfair">News Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="hover:shadow-elegant transition-all duration-300 cursor-pointer group border-0 shadow-card">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {category.label}
                    </h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 font-playfair">Latest News Articles</h2>
          
          <div className="space-y-6">
            {newsArticles.map((article, index) => {
              const CategoryIcon = getCategoryIcon(article.categoryId);
              return (
                <InteractiveCard 
                  key={article.id}
                  delay={index * 100}
                  className="hover:shadow-elegant transition-all duration-300 group cursor-pointer"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Icon & Category */}
                    <div className="flex items-center space-x-4 lg:col-span-1">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <CategoryIcon className="h-8 w-8 text-primary group-hover:text-white" />
                      </div>
                      <div className="lg:hidden">
                        <Badge variant="secondary">{article.category}</Badge>
                        {getPriorityBadge(article.priority)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2 space-y-3">
                      <div className="hidden lg:flex items-center space-x-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        {getPriorityBadge(article.priority)}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {article.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Meta & Action */}
                    <div className="lg:col-span-1 space-y-4">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.time}</span>
                        </div>
                        <div className="text-xs">
                          Source: {article.source}
                        </div>
                      </div>

                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Load More News
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair">
              Never Miss Important Updates
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Get breaking news alerts and important policy changes that could 
              affect your real estate investments and immigration plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email for alerts"
                className="flex-1 px-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-button">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;