import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  User,
  ArrowRight,
  TrendingUp,
  Globe,
  Building2,
  Briefcase,
  Search,
  Filter
} from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InteractiveCard from "@/components/InteractiveCard";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  const categories = [
    { id: "all", label: "All Posts", count: 24 },
    { id: "market-insights", label: "Market Insights", count: 8 },
    { id: "investment-guide", label: "Investment Guide", count: 6 },
    { id: "visa-immigration", label: "Visa & Immigration", count: 5 },
    { id: "success-stories", label: "Success Stories", count: 3 },
    { id: "industry-news", label: "Industry News", count: 2 }
  ];

  const featuredPost = {
    id: 1,
    title: "E-2 Visa Investment Requirements: Complete Guide for 2024",
    excerpt: "Everything international entrepreneurs need to know about E-2 visa investment requirements, including minimum investment amounts, business types, and application process.",
    author: "Maria Rodriguez",
    authorRole: "Senior Investment Advisor",
    date: "2024-03-15",
    readTime: "12 min read",
    category: "visa-immigration",
    categoryLabel: "Visa & Immigration",
    image: "/api/placeholder/800/400",
    featured: true,
    tags: ["E-2 Visa", "Investment", "Immigration", "Business"]
  };

  const blogPosts = [
    {
      id: 2,
      title: "Texas Commercial Real Estate Market Outlook 2024",
      excerpt: "Deep dive into Texas commercial real estate trends, growth projections, and investment opportunities for international buyers.",
      author: "Carlos Mendez",
      date: "2024-03-12",
      readTime: "8 min read",
      category: "market-insights",
      categoryLabel: "Market Insights",
      image: "/api/placeholder/400/250",
      tags: ["Texas", "Commercial", "Market Analysis"]
    },
    {
      id: 3,
      title: "EB-5 Program Changes: What Investors Need to Know",
      excerpt: "Recent updates to the EB-5 investor visa program and how they affect international real estate investments.",
      author: "Sarah Kim",
      date: "2024-03-10",
      readTime: "10 min read",
      category: "visa-immigration",
      categoryLabel: "Visa & Immigration",
      image: "/api/placeholder/400/250",
      tags: ["EB-5", "Investment", "Policy Changes"]
    },
    {
      id: 4,
      title: "Success Story: From Mexico to Houston - A $2.5M Commercial Investment",
      excerpt: "How Jorge Martinez successfully acquired a commercial property in Houston through the E-2 visa program.",
      author: "Ana Gutierrez",
      date: "2024-03-08",
      readTime: "6 min read",
      category: "success-stories",
      categoryLabel: "Success Stories",
      image: "/api/placeholder/400/250",
      tags: ["Success Story", "Mexico", "E-2 Visa"]
    },
    {
      id: 5,
      title: "Top 10 Business Industries for E-2 Visa Investments",
      excerpt: "Comprehensive analysis of the most successful business types for E-2 visa investments in Texas.",
      author: "David Lopez",
      date: "2024-03-05",
      readTime: "9 min read",
      category: "investment-guide",
      categoryLabel: "Investment Guide",
      image: "/api/placeholder/400/250",
      tags: ["Business", "E-2 Visa", "Investment Strategy"]
    },
    {
      id: 6,
      title: "Houston vs Austin vs Dallas: Where to Invest in 2024",
      excerpt: "Comparative analysis of major Texas markets for international real estate investors.",
      author: "Lisa Chen",
      date: "2024-03-03",
      readTime: "11 min read",
      category: "market-insights",
      categoryLabel: "Market Insights",
      image: "/api/placeholder/400/250",
      tags: ["Houston", "Austin", "Dallas", "Comparison"]
    },
    {
      id: 7,
      title: "Essential Documents for International Property Purchases",
      excerpt: "Complete checklist of required documentation for international buyers purchasing US real estate.",
      author: "Michael Roberts",
      date: "2024-02-28",
      readTime: "7 min read",
      category: "investment-guide",
      categoryLabel: "Investment Guide",
      image: "/api/placeholder/400/250",
      tags: ["Documentation", "International", "Legal"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'market-insights': return TrendingUp;
      case 'investment-guide': return Building2;
      case 'visa-immigration': return Globe;
      case 'success-stories': return User;
      case 'industry-news': return Briefcase;
      default: return ArrowRight;
    }
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
              INSIGHTS & RESOURCES
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair">
              Real Estate & Investment Blog
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Expert insights, market analysis, and success stories for international 
              real estate investors and immigration-focused business acquisitions.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Button */}
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 font-playfair">Featured Article</h2>
          
          <Card className="overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-500 group">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 lg:h-auto bg-gradient-primary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="h-24 w-24 text-white/20" />
                </div>
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  Featured
                </Badge>
              </div>

              {/* Content */}
              <CardContent className="p-8 lg:p-12 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <Badge variant="secondary">{featuredPost.categoryLabel}</Badge>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-foreground font-playfair group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{featuredPost.author}</div>
                      <div className="text-sm text-muted-foreground">{featuredPost.authorRole}</div>
                    </div>
                  </div>
                  
                  <Button className="shadow-button group-hover:scale-105 transition-transform duration-300">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground font-playfair">
              Latest Articles ({filteredPosts.length})
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Sort by:</span>
              <Button variant="ghost" size="sm">Latest</Button>
              <Button variant="ghost" size="sm">Popular</Button>
              <Button variant="ghost" size="sm">Most Read</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => {
              const CategoryIcon = getCategoryIcon(post.category);
              return (
                <InteractiveCard 
                  key={post.id}
                  delay={index * 100}
                  className="overflow-hidden group cursor-pointer h-full"
                >
                  <div className="space-y-4 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-primary rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CategoryIcon className="h-12 w-12 text-white/30" />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">
                        {post.categoryLabel}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 flex-1 flex flex-col">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Author & CTA */}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Load More Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair">
              Stay Updated with Market Insights
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Get the latest market analysis, investment opportunities, and immigration 
              updates delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
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

export default Blog;