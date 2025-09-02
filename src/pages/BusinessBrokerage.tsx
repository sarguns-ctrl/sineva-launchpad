import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BusinessCard } from '@/components/BusinessCard';
import { BusinessFilters } from '@/components/BusinessFilters';
import { useBusinesses, BusinessFilters as BusinessFiltersType } from '@/hooks/useBusinesses';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  Award, 
  Search, 
  Plus,
  Briefcase,
  Globe,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  MessageSquare
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import InteractiveCard from '@/components/InteractiveCard';
import AnimatedCounter from "@/components/AnimatedCounter";

const BusinessBrokerage = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: howItWorksRef, isVisible: howItWorksVisible } = useScrollAnimation();
  const { elementRef: categoriesRef, isVisible: categoriesVisible } = useScrollAnimation();
  const { elementRef: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const { elementRef: metricsRef, isVisible: metricsVisible } = useScrollAnimation();

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<BusinessFiltersType>({});
  const [showFilters, setShowFilters] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { 
    businesses, 
    loading, 
    error, 
    totalCount, 
    addToFavorites, 
    removeFromFavorites 
  } = useBusinesses(filters);

  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      // Add search functionality by filtering business names or descriptions
    }));
  };

  const handleListBusiness = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/list-business');
  };

  const filteredBusinesses = businesses.filter(business =>
    business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const businessTypes = [
    {
      icon: Building2,
      title: 'Restaurants & Food Service',
      description: 'Established restaurants, cafes, and food service businesses with proven customer bases.',
      investmentRange: '$150K - $2M',
      avgROI: '15-25%',
      visaEligible: true
    },
    {
      icon: Users,
      title: 'Retail & E-commerce',
      description: 'Physical stores and online businesses with strong brand presence and customer loyalty.',
      investmentRange: '$100K - $5M',
      avgROI: '12-20%',
      visaEligible: true
    },
    {
      icon: TrendingUp,
      title: 'Technology & Software',
      description: 'Growing tech companies and SaaS businesses with recurring revenue streams.',
      investmentRange: '$500K - $10M',
      avgROI: '20-35%',
      visaEligible: false
    },
    {
      icon: Shield,
      title: 'Healthcare & Medical',
      description: 'Medical practices, clinics, and healthcare service providers with stable income.',
      investmentRange: '$300K - $3M',
      avgROI: '18-28%',
      visaEligible: true
    }
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Browse & Search',
      description: 'Explore our curated marketplace of verified businesses. Use advanced filters to find opportunities that match your investment budget, industry preference, and visa requirements.'
    },
    {
      step: '02',
      title: 'Connect & Inquire',
      description: 'Submit inquiries directly to business owners through our secure platform. Share your investment profile and schedule calls or meetings to discuss opportunities.'
    },
    {
      step: '03',
      title: 'Due Diligence',
      description: 'Access financial documents, review business operations, and conduct thorough analysis. Our platform facilitates secure document sharing and expert consultation.'
    },
    {
      step: '04',
      title: 'Close & Transition',
      description: 'Complete the acquisition with legal support and seamless handover. Get guidance on visa applications, business operations, and smooth ownership transition.'
    }
  ];

  const successMetrics = [
    { number: '500+', label: 'Businesses Listed', icon: Building2 },
    { number: '95%', label: 'Verified Listings', icon: Shield },
    { number: '$2.3B', label: 'Total Deal Value', icon: DollarSign },
    { number: '89%', label: 'Buyer Satisfaction', icon: Award }
  ];

  const keyFeatures = [
    {
      icon: Shield,
      title: 'Verified Business Listings',
      description: 'Every business undergoes thorough verification including financial review, legal compliance, and operational assessment before listing.'
    },
    {
      icon: Search,
      title: 'Smart Matching System',
      description: 'AI-powered search and filtering system helps you discover businesses that match your investment criteria and visa requirements.'
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Connect directly with business owners through our secure messaging system to discuss opportunities and schedule meetings.'
    },
    {
      icon: Globe,
      title: 'Visa Compliance Focus',
      description: 'All listings clearly indicate visa eligibility for E-2, EB-5, and other investor programs with immigration guidance available.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Buy Your American Dream
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Discover established U.S. businesses perfect for international entrepreneurs seeking E-2 and EB-5 visa opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => document.getElementById('business-listings')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Businesses
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1"
                onClick={() => document.getElementById('business-search')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Business Search
              </Button>
            </div>
            
            {user && (
              <Button 
                onClick={handleListBusiness}
                variant="secondary"
                size="lg"
                className="mb-8"
              >
                <Plus className="w-5 h-5 mr-2" />
                List Your Business
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Business Search & Listings Section */}
      <section id="business-search" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Available Businesses</h2>
              <p className="text-xl text-muted-foreground">
                {totalCount} businesses available for acquisition
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search businesses by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
              {!user && (
                <Button onClick={handleListBusiness}>
                  <Plus className="w-4 h-4 mr-2" />
                  List Your Business
                </Button>
              )}
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="mb-8">
                <BusinessFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={() => setFilters({})}
                />
              </div>
            )}

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredBusinesses.length} of {totalCount} businesses
              </p>
              {Object.keys(filters).length > 0 && (
                <Badge variant="secondary">
                  {Object.keys(filters).length} filter(s) applied
                </Badge>
              )}
            </div>

            {/* Business Listings */}
            <div id="business-listings">
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-destructive">Error loading businesses: {error}</p>
                  <Button onClick={() => window.location.reload()} className="mt-4">
                    Try Again
                  </Button>
                </div>
              ) : filteredBusinesses.length === 0 ? (
                <div className="text-center py-12">
                  <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No businesses found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button onClick={() => {
                    setSearchTerm('');
                    setFilters({});
                  }}>
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBusinesses.map((business) => (
                    <BusinessCard
                      key={business.id}
                      business={business}
                      onFavorite={async (businessId, isFavorite) => {
                        if (isFavorite) {
                          await removeFromFavorites(businessId);
                        } else {
                          await addToFavorites(businessId);
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              How Our Process Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From initial consultation to business ownership - we guide you through every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <InteractiveCard 
                key={step.step}
                delay={index * 150}
                className="text-center relative overflow-hidden"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto">
                    {step.step}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-primary"></div>
                )}
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Business Categories */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Business Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Diverse portfolio of profitable businesses across multiple industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessTypes.map((type, index) => (
              <InteractiveCard 
                key={index}
                delay={index * 100}
                className="group"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {type.title}
                    </h3>
                    <Badge className="bg-accent text-accent-foreground">
                      {type.investmentRange}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm leading-relaxed">{type.description}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-muted-foreground">ROI: {type.avgROI}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Shield className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {type.visaEligible ? 'Visa Eligible' : 'Not Visa Eligible'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      Investment Range
                    </div>
                    <Button variant="outline" size="sm">
                      View Listings
                    </Button>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Why Choose Our Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced technology meets expert guidance for seamless business acquisitions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white space-y-6">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto">
              <Briefcase className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair">
              Ready to Find Your Perfect Business?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Join hundreds of successful international entrepreneurs who found their 
              ideal US business through our platform. Start your matching process today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-button">
                Start Business Search
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

export default BusinessBrokerage;