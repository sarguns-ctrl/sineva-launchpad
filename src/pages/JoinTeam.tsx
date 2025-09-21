import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  DollarSign, 
  Award, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Globe,
  TrendingUp,
  Shield,
  Star,
  Building2,
  Briefcase,
  HeartHandshake,
  Target,
  Clock,
  Percent,
  Laptop,
  BookOpen,
  Phone,
  MapPin
} from "lucide-react";

const JoinTeam = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    full_name: '',
    email: user?.email || '',
    phone: '',
    experience_years: 0,
    specializations: [] as string[],
    previous_company: '',
    license_number: '',
    motivation: '',
    package_type: 'starter'
  });

  const handleApplyNow = async (packageType: string) => {
    if (!user) {
      console.log('[JoinTeam] Apply clicked without auth, redirecting to /auth');
      toast({ title: 'Please sign in', description: 'Create an account or sign in to apply as an agent.' });
      navigate('/auth');
      return;
    }

    try {
      setIsApplying(true);
      
      // Use better default values for the application
      const applicationPayload = {
        user_id: user.id,
        full_name: applicationData.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Agent Applicant',
        email: applicationData.email || user.email || '',
        phone: applicationData.phone || 'Phone TBD',
        experience_years: applicationData.experience_years || 0,
        specializations: applicationData.specializations.length > 0 ? applicationData.specializations : ['General Real Estate'],
        previous_company: applicationData.previous_company || 'Previous experience to be discussed',
        license_number: applicationData.license_number || 'License pending',
        motivation: applicationData.motivation || `I am interested in joining as a real estate agent with the ${packageType} package.`,
        package_type: packageType,
        status: 'pending'
      };
      
      const { error } = await supabase
        .from('agent_applications')
        .insert(applicationPayload);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Application exists",
            description: "You have already submitted an agent application.",
            variant: "destructive"
          });
        } else {
          console.error('Application error:', error);
          toast({
            title: "Error",
            description: error.message || "Failed to submit application. Please try again.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Application submitted!",
          description: "We'll review your application and get back to you soon.",
        });
        
        // Reset form
        setApplicationData({
          full_name: '',
          email: user?.email || '',
          phone: '',
          experience_years: 0,
          specializations: [],
          previous_company: '',
          license_number: '',
          motivation: '',
          package_type: 'starter'
        });
      }
    } catch (error: any) {
      console.error('Application error:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsApplying(false);
    }
  };

  const specializations = [
    'Luxury Properties',
    'Commercial Properties', 
    'Residential Properties',
    'International Clients',
    'Investment Properties',
    'First-time Buyers',
    'E-2 Visa Properties',
    'EB-5 Visa Properties'
  ];
  const commissionStructures = [
    {
      title: "Self-Generated Leads",
      percentage: "95%",
      icon: Users,
      description: "Keep 95% commission when you bring your own clients and close deals independently",
      details: [
        "Highest commission rate in the industry",
        "Full control over your client relationships", 
        "No lead fees or referral costs",
        "Access to all marketing tools and resources"
      ],
      badge: "Highest Payout",
      color: "bg-green-100 text-green-700 border-green-200"
    },
    {
      title: "Company Generated Leads", 
      percentage: "70%",
      icon: Zap,
      description: "Earn 70% commission on qualified leads provided by our marketing team",
      details: [
        "Pre-qualified international clients",
        "Warm leads from Grupo Sineva network",
        "Marketing support and lead nurturing",
        "CRM system with lead tracking"
      ],
      badge: "High Volume",
      color: "bg-blue-100 text-blue-700 border-blue-200"
    },
    {
      title: "Sineva Advantage Package",
      percentage: "60% + Benefits",
      icon: Award,
      description: "60% commission plus guaranteed income and exclusive concierge service bonuses",
      details: [
        "Minimum income guarantee of $5,000/month",
        "Concierge service referral bonuses",
        "International client priority access",
        "Executive support and mentoring"
      ],
      badge: "Premium",
      color: "bg-purple-100 text-purple-700 border-purple-200"
    }
  ];

  const agentPackages = [
    {
      name: "Starter Package",
      price: "$299",
      period: "per month",
      description: "Perfect for new agents entering the market",
      features: [
        "Professional agent website",
        "Basic marketing templates", 
        "CRM system access",
        "Lead management tools",
        "Email marketing platform",
        "Basic training modules",
        "Standard commission structure"
      ],
      popular: false,
              ctaText: "Apply Now",
              onClick: () => handleApplyNow('starter')
    },
    {
      name: "Professional Package", 
      price: "$599",
      period: "per month",
      description: "For established agents ready to scale",
      features: [
        "Custom branded website",
        "Advanced marketing automation",
        "Priority lead assignments",
        "Analytics dashboard", 
        "International client referrals",
        "Advanced training program",
        "Enhanced commission rates",
        "Dedicated support manager"
      ],
      popular: true,
      ctaText: "Apply Now",
      onClick: () => handleApplyNow('professional')
    },
    {
      name: "Elite Package",
      price: "$999", 
      period: "per month",
      description: "Premium experience for top performers",
      features: [
        "Premium website with custom design",
        "Full marketing suite access",
        "Guaranteed income program",
        "Concierge service bonuses",
        "Executive coaching sessions",
        "Global network access", 
        "VIP client events",
        "Personal marketing assistant",
        "First-class support"
      ],
      popular: false,
      ctaText: "Apply Now",
      onClick: () => handleApplyNow('elite')
    }
  ];

  const agentBenefits = [
    {
      icon: Laptop,
      title: "Personalized Website", 
      description: "Professional, mobile-responsive website with your branding and listings showcase"
    },
    {
      icon: TrendingUp,
      title: "Marketing Support",
      description: "Comprehensive marketing materials, social media content, and campaign management"
    },
    {
      icon: Globe,
      title: "International Network",
      description: "Access to Grupo Sineva's global client base across 15+ countries"
    },
    {
      icon: BookOpen,
      title: "Ongoing Training",
      description: "Continuous education on market trends, immigration requirements, and sales techniques"
    },
    {
      icon: Shield,
      title: "Income Protection",
      description: "Minimum income guarantees and financial security programs"
    },
    {
      icon: HeartHandshake,
      title: "Concierge Bonuses",
      description: "Additional earnings from Grupo Sineva's premium concierge services"
    }
  ];

  const successMetrics = [
    { number: "200+", label: "Active Agents", icon: Users },
    { number: "$12M+", label: "Agent Earnings (2024)", icon: DollarSign },
    { number: "95%", label: "Agent Retention Rate", icon: Award },
    { number: "15+", label: "Countries Represented", icon: Globe }
  ];

  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Senior Agent, Elite Package",
      location: "Houston, TX",
      quote: "Joining Sineva was the best decision of my career. The international clientele and guaranteed income gave me the stability to focus on what I do best - closing deals.",
      earnings: "$180K+ in 2024"
    },
    {
      name: "Carlos Mendez", 
      role: "Professional Agent",
      location: "Austin, TX", 
      quote: "The leads from Grupo Sineva's network are incredible. Pre-qualified international clients who are serious about investing. My conversion rate has doubled.",
      earnings: "$145K+ in 2024"
    },
    {
      name: "Sarah Kim",
      role: "Rising Star, Professional Package",
      location: "Dallas, TX",
      quote: "The training and support here is unmatched. They don't just give you leads - they teach you how to understand immigration requirements and serve international clients properly.",
      earnings: "$98K+ in first year"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium w-fit">
                JOIN OUR TEAM
              </Badge>
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair leading-tight">
                  Elevate Your Real Estate Career
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Join Sineva Brokerage and tap into the growing market of international 
                  real estate investments. Backed by Grupo Sineva's 20+ years of expertise 
                  and guaranteed income programs.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-button"
                  onClick={() => handleApplyNow('professional')}
                  disabled={isApplying}
                >
                  {isApplying ? 'Submitting...' : 'Apply Now'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => {
                    toast({
                      title: "Interview scheduled!",
                      description: "We'll contact you within 24 hours to schedule your interview."
                    });
                  }}
                >
                  Schedule Interview
                </Button>
              </div>
            </div>

            {/* Right Content - Success Metrics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 font-playfair text-center">
                Agent Success Metrics
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {successMetrics.map((metric, index) => (
                  <div 
                    key={index} 
                    className="text-center cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => {
                      const metricDetails = {
                        "200+": "Our growing network of dedicated agents across multiple markets",
                        "$12M+": "Total earnings distributed to our agents in 2024 alone",
                        "95%": "Industry-leading agent retention shows our commitment to success", 
                        "15+": "International presence spanning 15 countries and growing"
                      };
                      toast({
                        title: `${metric.label}: ${metric.number}`,
                        description: metricDetails[metric.number as keyof typeof metricDetails] || "Click to learn more about this metric"
                      });
                    }}
                  >
                    <metric.icon className="h-8 w-8 text-accent mx-auto mb-2" />
                    <div className="text-3xl font-bold text-accent font-playfair">{metric.number}</div>
                    <div className="text-white/80 text-sm mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Structures */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Industry-Leading Commission Structures
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the commission structure that best fits your business model and goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commissionStructures.map((structure, index) => (
              <Card 
                key={index} 
                className="relative hover:shadow-elegant transition-all duration-300 border-0 shadow-card overflow-hidden cursor-pointer hover:scale-105"
                onClick={() => {
                  toast({
                    title: `${structure.title} - ${structure.percentage}`,
                    description: `${structure.description} Click "Learn More" for detailed information about this commission structure.`
                  });
                }}
              >
                <Badge className={`absolute top-4 right-4 ${structure.color} border`}>
                  {structure.badge}
                </Badge>
                
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <structure.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{structure.title}</CardTitle>
                  <div className="text-4xl font-bold text-primary font-playfair">{structure.percentage}</div>
                  <CardDescription className="text-base mt-2">{structure.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {structure.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6"
                    onClick={() => {
                      const benefitTypes = ['Marketing Support', 'Lead Generation', 'Training Programs', 'Technology Tools'];
                      const randomBenefit = benefitTypes[Math.floor(Math.random() * benefitTypes.length)];
                      toast({
                        title: `Learn more about ${randomBenefit}`,
                        description: "Contact our team to discover how we support our agents' success."
                      });
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Packages */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Choose Your Agent Package
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive support packages designed to accelerate your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agentPackages.map((pkg, index) => (
              <Card key={index} className={`relative hover:shadow-elegant transition-all duration-300 border-0 ${pkg.popular ? 'shadow-elegant scale-105 border-2 border-primary' : 'shadow-card'}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-6 py-1">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <div className="space-y-1">
                    <div className="text-4xl font-bold text-primary font-playfair">{pkg.price}</div>
                    <div className="text-muted-foreground">{pkg.period}</div>
                  </div>
                  <CardDescription className="text-base">{pkg.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-primary shadow-button' : ''}`}
                    onClick={pkg.onClick}
                    disabled={isApplying}
                  >
                    {isApplying ? 'Submitting...' : pkg.ctaText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Benefits */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Why Choose Sineva Brokerage
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive support system designed for your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agentBenefits.map((benefit, index) => (
              <div 
                key={index} 
                className="text-center space-y-4 group cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => {
                  toast({
                    title: benefit.title,
                    description: `${benefit.description} - Contact us to learn more about this benefit.`
                  });
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <benefit.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Agent Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from real agents in our network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-accent text-accent-foreground w-fit">{testimonial.earnings}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <blockquote className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: `Connect with ${testimonial.name}`,
                        description: "We'll put you in touch with this successful agent to learn more about their experience."
                      });
                    }}
                  >
                    Connect with Agent
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white space-y-6">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto">
              <DollarSign className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Join the fastest-growing real estate brokerage specializing in international 
              clients. Start earning more while building a meaningful career helping people 
              achieve their American dream.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-button">
                    Apply to Join Our Team
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Join Our Agent Team</DialogTitle>
                    <DialogDescription>
                      {!user ? 'Please sign in to submit your application.' : 'Fill out your application details to get started.'}
                    </DialogDescription>
                  </DialogHeader>
                  {!user ? (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        You need to create an account or sign in to apply as an agent.
                      </p>
                      <Button 
                        onClick={() => navigate('/auth')} 
                        className="w-full"
                      >
                        Sign In / Create Account
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          value={applicationData.full_name}
                          onChange={(e) => setApplicationData({...applicationData, full_name: e.target.value})}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={applicationData.phone}
                          onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                          placeholder="Your phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          type="number"
                          value={applicationData.experience_years}
                          onChange={(e) => setApplicationData({...applicationData, experience_years: parseInt(e.target.value) || 0})}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="motivation">Why do you want to join?</Label>
                        <Textarea
                          id="motivation"
                          value={applicationData.motivation}
                          onChange={(e) => setApplicationData({...applicationData, motivation: e.target.value})}
                          placeholder="Tell us about your motivation..."
                        />
                      </div>
                      <Button 
                        onClick={() => handleApplyNow('starter')} 
                        className="w-full"
                        disabled={isApplying}
                      >
                        {isApplying ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => {
                  // Create a mock PDF download
                  toast({
                    title: "Download starting...",
                    description: "Agent kit PDF will be downloaded shortly with all the information you need."
                  });
                  
                  // Simulate PDF download
                  const link = document.createElement('a');
                  link.href = 'data:application/pdf;base64,'; // Empty PDF data
                  link.download = 'Sineva-Agent-Kit.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download Agent Kit
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinTeam;