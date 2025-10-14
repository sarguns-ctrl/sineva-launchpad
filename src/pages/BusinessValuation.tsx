import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  DollarSign, 
  Eye, 
  Users, 
  MapPin, 
  Settings, 
  CheckCircle2, 
  FileText,
  Shield,
  TrendingUp,
  Award,
  Phone,
  Download
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import businessValuationHero from "@/assets/business-valuation-hero.jpg";
import valuationHandshake from "@/assets/valuation-handshake.jpg";
import valuationConsultation from "@/assets/valuation-consultation.jpg";
import proudBusinessOwner from "@/assets/proud-business-owner.jpg";
import valuationReport from "@/assets/valuation-report.jpg";
import brokerPresentation from "@/assets/broker-presentation.jpg";

const BusinessValuation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    annualRevenueRange: "",
    agreeToContact: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const heroAnimation = useScrollAnimation();
  const section1Animation = useScrollAnimation();
  const section2Animation = useScrollAnimation();
  const section3Animation = useScrollAnimation();
  const section4Animation = useScrollAnimation();
  const section5Animation = useScrollAnimation();
  const section6Animation = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToContact) {
      toast({
        title: "Agreement Required",
        description: "Please agree to be contacted to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('business-valuation-request', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "We'll contact you shortly with your valuation.",
      });
      
      // Redirect to thank you page
      navigate('/thank-you');
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const testimonials = [
    {
      quote: "I had no idea my business was worth more than I thought. Sinevabrokerage found the right buyer fast and kept the entire process confidential.",
      author: "Miguel Torres",
      location: "San Antonio"
    },
    {
      quote: "They handled everything — valuation, negotiation, and closing. I sold for 18% above my initial target.",
      author: "Cynthia R.",
      location: "Austin"
    }
  ];

  const faqs = [
    {
      question: "How do you calculate my business value?",
      answer: "We use a mix of revenue, earnings, market comparables, and industry trends to determine a realistic, data-backed valuation."
    },
    {
      question: "What types of businesses do you sell?",
      answer: "Service, retail, logistics, manufacturing, construction, and hospitality — all Texas-based."
    },
    {
      question: "Will my employees or competitors know I'm selling?",
      answer: "No. We operate confidentially and only share details with verified, NDA-signed buyers."
    },
    {
      question: "What's the cost?",
      answer: "The valuation is free. If you decide to sell, brokerage fees are only charged after a successful sale."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroAnimation.elementRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${businessValuationHero})` }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black/20 to-secondary/30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 ${heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge variant="secondary" className="text-base px-6 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Free & Confidential
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
              Find Out What Your Texas Business Is Worth
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-lg">
              Get a professional market valuation and learn how to sell your business for maximum value, privately and profitably.
            </p>
            
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-2xl"
              onClick={() => document.getElementById('valuation-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <FileText className="w-5 h-5 mr-2" />
              Request Your Free Business Valuation
            </Button>
          </div>
        </div>
      </section>

      {/* Section 1 – Why Texas Owners Choose Sinevabrokerage */}
      <section ref={section1Animation.elementRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={valuationHandshake} 
              alt="Business handshake with Texas skyline" 
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${section1Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Texas Owners Choose Sinevabrokerage
            </h2>
            <p className="text-xl text-muted-foreground">
              Selling a business isn't just a transaction — it's a turning point. We help Texas business owners exit strategically, protect their privacy, and secure the right buyer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Accurate Market Valuation</h3>
                    <p className="text-muted-foreground">
                      Based on verified Texas data, not automated estimates.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Confidential Process</h3>
                    <p className="text-muted-foreground">
                      We protect your identity and business details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Serious Buyer Network</h3>
                    <p className="text-muted-foreground">
                      We only work with financially pre-qualified buyers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Texas Expertise</h3>
                    <p className="text-muted-foreground">
                      Local brokers who know your market and its true value.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 md:col-span-2">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">End-to-End Support</h3>
                    <p className="text-muted-foreground">
                      Valuation, marketing, negotiation, and closing — handled for you.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2 – What You'll Receive */}
      <section ref={section2Animation.elementRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Featured Image */}
          <div className="max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={proudBusinessOwner} 
              alt="Proud business owner" 
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${section2Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What You'll Receive
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Free, Detailed Valuation Report</h3>
                <p className="text-muted-foreground">
                  Understand your business's fair market value.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Consultation with a Texas Broker</h3>
                <p className="text-muted-foreground">
                  Get expert feedback and sale-readiness advice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Confidential Buyer Introduction</h3>
                <p className="text-muted-foreground">
                  If you're ready, we'll quietly present your business to our buyer network.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3 – Real Texas Success Stories */}
      <section ref={section3Animation.elementRef} className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${section3Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              Real Texas Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Proven Results
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <CardContent className="p-10 relative z-10">
                  <div className="mb-6">
                    <svg className="w-12 h-12 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  <p className="text-lg mb-6 leading-relaxed">{testimonial.quote}</p>
                  <div className="pt-4 border-t">
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-8 text-center max-w-4xl mx-auto">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="font-semibold">$75M+ in Transactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-primary" />
                <span className="font-semibold">90% Success Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="font-semibold">20 Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 – The Selling Process */}
      <section ref={section4Animation.elementRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${section4Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Selling Process
            </h2>
          </div>

          {/* Image Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={valuationConsultation} 
                alt="Business consultation meeting" 
                className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={valuationReport} 
                alt="Business valuation report" 
                className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={brokerPresentation} 
                alt="Broker presenting to client" 
                className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { number: "1", title: "Submit Your Information", desc: "Complete the form below." },
              { number: "2", title: "Receive Your Valuation", desc: "Get your report within 24–48 hours." },
              { number: "3", title: "Discuss Your Goals", desc: "Confidential strategy session with our broker." },
              { number: "4", title: "Optional Listing", desc: "If you're ready, we prepare your listing discreetly." }
            ].map((step, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 flex items-start space-x-6">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 – Lead Form */}
      <section id="valuation-form" ref={section5Animation.elementRef} className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className={`max-w-2xl mx-auto transition-all duration-1000 ${section5Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Request Your Free Business Valuation
              </h2>
              <p className="text-xl text-muted-foreground">
                Complete the form below — no obligation, 100% confidential.
              </p>
            </div>

            <Card className="border-2 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="revenue">Annual Revenue Range *</Label>
                    <Select
                      value={formData.annualRevenueRange}
                      onValueChange={(value) => setFormData({ ...formData, annualRevenueRange: value })}
                      required
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select revenue range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<$500K">Less than $500K</SelectItem>
                        <SelectItem value="$500K-$1M">$500K - $1M</SelectItem>
                        <SelectItem value="$1M+">$1M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agree"
                      checked={formData.agreeToContact}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, agreeToContact: checked as boolean })
                      }
                    />
                    <Label htmlFor="agree" className="text-sm cursor-pointer">
                      I agree to be contacted by Sinevabrokerage.
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    {isSubmitting ? "Submitting..." : "Get My Valuation"}
                  </Button>
                </form>

                <p className="text-sm text-muted-foreground text-center mt-6 flex items-center justify-center">
                  <Shield className="w-4 h-4 mr-2" />
                  We never share your information. All valuations are handled privately.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 6 – FAQ */}
      <section ref={section6Animation.elementRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${section6Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-2 rounded-lg px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Section 7 – CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Your Business Deserves a Professional Exit
            </h2>
            <p className="text-xl text-muted-foreground">
              Know your value. Protect your legacy. Sell on your terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
                onClick={() => document.getElementById('valuation-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <FileText className="w-5 h-5 mr-2" />
                Get My Free Valuation
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Exit Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessValuation;
