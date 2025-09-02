import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  HelpCircle,
  Book,
  Users,
  Globe,
  Building2,
  Briefcase,
  Shield,
  ChevronRight,
  Clock,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InteractiveCard from "@/components/InteractiveCard";

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  const categories = [
    { id: "all", label: "All Topics", icon: Book, count: 45 },
    { id: "getting-started", label: "Getting Started", icon: Users, count: 12 },
    { id: "visa-immigration", label: "Visa & Immigration", icon: Globe, count: 15 },
    { id: "property-investment", label: "Property Investment", icon: Building2, count: 8 },
    { id: "business-acquisition", label: "Business Acquisition", icon: Briefcase, count: 6 },
    { id: "account-support", label: "Account Support", icon: Shield, count: 4 }
  ];

  const popularArticles = [
    {
      id: 1,
      title: "How to Get Started: Complete Guide for International Investors",
      category: "Getting Started",
      categoryId: "getting-started",
      readTime: "8 min read",
      views: 2341,
      helpful: 89,
      description: "Step-by-step guide for international entrepreneurs looking to invest in US real estate or businesses."
    },
    {
      id: 2,
      title: "E-2 Visa Requirements: Investment Amounts and Business Types",
      category: "Visa & Immigration",
      categoryId: "visa-immigration",
      readTime: "12 min read", 
      views: 1876,
      helpful: 92,
      description: "Comprehensive overview of E-2 visa requirements, minimum investments, and qualifying business types."
    },
    {
      id: 3,
      title: "Due Diligence Checklist for Business Acquisitions",
      category: "Business Acquisition",
      categoryId: "business-acquisition",
      readTime: "10 min read",
      views: 1432,
      helpful: 87,
      description: "Essential items to review when evaluating a business for purchase, including financial and legal considerations."
    },
    {
      id: 4,
      title: "Commercial vs Residential: Which Investment is Right for You?",
      category: "Property Investment",
      categoryId: "property-investment",
      readTime: "6 min read",
      views: 1289,
      helpful: 85,
      description: "Comparison of commercial and residential real estate investments for international buyers."
    }
  ];

  const faqSections = [
    {
      title: "General Questions",
      questions: [
        {
          q: "What services does Sineva Brokerage provide?",
          a: "We provide comprehensive real estate brokerage, business brokerage, and immigration investment advisory services for international clients looking to invest in the United States."
        },
        {
          q: "Do you work with clients from all countries?",
          a: "Yes, we work with clients from around the world. However, visa eligibility and investment requirements may vary by country of origin."
        },
        {
          q: "What are your fees for services?",
          a: "Our fees vary depending on the services required. We provide detailed fee structures during initial consultations and maintain complete transparency about all costs."
        }
      ]
    },
    {
      title: "Investment Requirements",
      questions: [
        {
          q: "What is the minimum investment required for an E-2 visa?",
          a: "While there's no statutory minimum, investments typically range from $100,000 to $200,000 depending on the business type and your country of origin."
        },
        {
          q: "Can I invest in residential real estate for immigration purposes?",
          a: "Residential real estate investments alone typically don't qualify for business-based visas like E-2. However, they can be part of an EB-5 investment strategy."
        },
        {
          q: "How long does the investment process take?",
          a: "The timeline varies but typically ranges from 3-6 months from initial consultation to closing, depending on the complexity of the transaction and visa requirements."
        }
      ]
    }
  ];

  const supportOptions = [
    {
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      availability: "Mon-Fri 9AM-6PM EST",
      icon: MessageCircle,
      action: "Start Chat",
      primary: true
    },
    {
      title: "Phone Support",
      description: "Speak directly with a specialist",
      availability: "+1 (713) 555-0100",
      icon: Phone,
      action: "Call Now",
      primary: false
    },
    {
      title: "Email Support",
      description: "Send us detailed questions",
      availability: "Response within 24 hours",
      icon: Mail,
      action: "Send Email",
      primary: false
    },
    {
      title: "Schedule Consultation",
      description: "Book a personalized session",
      availability: "Available worldwide",
      icon: Users,
      action: "Book Session",
      primary: false
    }
  ];

  const filteredArticles = popularArticles.filter(article => {
    const matchesCategory = activeCategory === "all" || article.categoryId === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={headerRef}
            className={`text-center space-y-8 transition-all duration-1000 ${
              headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium">
              HELP CENTER
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair">
              How Can We Help You?
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Find answers to your questions about real estate investment, business acquisition, 
              and immigration processes. Our comprehensive help center is here to guide you.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for answers, guides, or topics..."
                  className="w-full pl-12 pr-4 py-4 text-lg border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-foreground font-playfair">
              Get Support
            </h2>
            <p className="text-lg text-muted-foreground">
              Multiple ways to get the help you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <InteractiveCard 
                key={index}
                delay={index * 100}
                className={`text-center group ${option.primary ? 'border-2 border-primary' : ''}`}
              >
                <div className="space-y-4">
                  <div className={`w-16 h-16 rounded-full ${option.primary ? 'bg-primary' : 'bg-primary/10'} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <option.icon className={`h-8 w-8 ${option.primary ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{option.availability}</span>
                    </div>
                  </div>
                  <Button 
                    className={`w-full ${option.primary ? 'shadow-button' : ''}`}
                    variant={option.primary ? 'default' : 'outline'}
                  >
                    {option.action}
                  </Button>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Categories & Articles */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-foreground font-playfair">
              Browse by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Find the information you need organized by topic
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Popular Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article, index) => (
              <InteractiveCard 
                key={article.id}
                delay={index * 100}
                className="group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{article.readTime}</span>
                      <span>{article.views} views</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-muted-foreground">{article.helpful}% found helpful</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Read Article
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-foreground font-playfair">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-8">
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.questions.map((faq, index) => (
                    <Card key={index} className="shadow-card">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <h4 className="font-semibold text-foreground">{faq.q}</h4>
                          </div>
                          <p className="text-muted-foreground ml-8 leading-relaxed">{faq.a}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair">
              Still Need Help?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Can't find what you're looking for? Our expert team is ready to provide 
              personalized assistance with your specific questions and needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-button">
                Contact Support Team
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;