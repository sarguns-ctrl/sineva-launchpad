import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  MapPin, 
  DollarSign, 
  Shield, 
  Briefcase, 
  GraduationCap,
  Handshake,
  Target,
  Building,
  Globe,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';

const FranchiseWithUs = () => {
  const franchiseBenefits = [
    {
      icon: Trophy,
      title: 'Proven Business Model',
      description: 'Join a successful real estate brokerage with a track record of growth and profitability.'
    },
    {
      icon: TrendingUp,
      title: 'Growing Market',
      description: 'Capitalize on the expanding real estate market with our established brand and systems.'
    },
    {
      icon: Users,
      title: 'Comprehensive Support',
      description: 'Get ongoing training, marketing support, and operational guidance from our experienced team.'
    },
    {
      icon: MapPin,
      title: 'Territory Protection',
      description: 'Secure exclusive territory rights with protected market areas for sustainable growth.'
    },
    {
      icon: DollarSign,
      title: 'Multiple Revenue Streams',
      description: 'Residential, commercial, international services, and business brokerage opportunities.'
    },
    {
      icon: Shield,
      title: 'Brand Recognition',
      description: 'Leverage our established brand reputation and marketing presence in the market.'
    }
  ];

  const investmentBreakdown = [
    { category: 'Initial Franchise Fee', amount: '$45,000', description: 'One-time franchise licensing fee' },
    { category: 'Setup & Equipment', amount: '$25,000', description: 'Office setup, technology, and initial marketing' },
    { category: 'Working Capital', amount: '$30,000', description: 'Operating expenses for first 6 months' },
    { category: 'Marketing Launch', amount: '$15,000', description: 'Grand opening and initial advertising campaign' }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Initial Inquiry',
      description: 'Submit your franchise application and initial investment information.'
    },
    {
      step: 2,
      title: 'Qualification Review',
      description: 'We review your qualifications, experience, and financial capacity.'
    },
    {
      step: 3,
      title: 'Discovery Process',
      description: 'Learn about our business model through meetings and franchise disclosure.'
    },
    {
      step: 4,
      title: 'Territory Selection',
      description: 'Choose your preferred market territory with our guidance and market analysis.'
    },
    {
      step: 5,
      title: 'Franchise Agreement',
      description: 'Finalize the franchise agreement and complete the investment process.'
    },
    {
      step: 6,
      title: 'Training & Launch',
      description: 'Complete comprehensive training program and launch your franchise location.'
    }
  ];

  const successStories = [
    {
      name: 'Maria Rodriguez',
      location: 'Miami, FL',
      results: '$2.8M in sales within first year',
      quote: 'The support system and proven processes made all the difference in our success.'
    },
    {
      name: 'David Chen',
      location: 'Los Angeles, CA',
      results: '150% growth in year two',
      quote: 'Joining Sineva was the best business decision I\'ve ever made.'
    },
    {
      name: 'Sarah Johnson',
      location: 'Dallas, TX',
      results: 'Top performer in region',
      quote: 'The training and ongoing support exceeded all my expectations.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            Franchise Opportunity
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Franchise with <span className="text-accent">Sineva Brokerage</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Join our growing network of successful real estate professionals and build your own thriving brokerage business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <a href="tel:+15551234567">
                <Phone className="w-5 h-5 mr-2" />
                Schedule a Call
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary" asChild>
              <a href="mailto:franchise@sineva.com?subject=Franchise Information Request">
                <Mail className="w-5 h-5 mr-2" />
                Request Information
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Investment Overview */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Investment Overview</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Total investment starting at $115,000 with multiple financing options available.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentBreakdown.map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-primary text-2xl">{item.amount}</CardTitle>
                  <CardDescription className="font-semibold text-base">
                    {item.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Franchise with Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Franchise with Sineva?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Benefit from our proven systems, comprehensive support, and established market presence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {franchiseBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Franchise Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our streamlined process gets you from inquiry to launch in 90-120 days.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                      <span className="text-primary-foreground font-bold text-lg">{step.step}</span>
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Franchise Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from our successful franchise partners across the country.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{story.name}</CardTitle>
                  <CardDescription className="flex items-center justify-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {story.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge variant="secondary" className="text-sm font-semibold">
                    {story.results}
                  </Badge>
                  <p className="text-muted-foreground italic">"{story.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Franchise Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join the Sineva family and build a successful real estate business with our proven support system.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Us Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">+1 (832) 289-6124</p>
                <p className="text-white/80">Speak with a franchise consultant</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-2">franchise@sineva.com</p>
                <p className="text-white/80">Get detailed information packet</p>
              </CardContent>
            </Card>
          </div>
          
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <a href="mailto:franchise@sineva.com?subject=Franchise Information Packet Request">
              Request Franchise Information
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FranchiseWithUs;