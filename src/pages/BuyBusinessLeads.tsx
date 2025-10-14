import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, MapPin, DollarSign, Shield, Eye, TrendingUp, Award, Clock, Lock } from 'lucide-react';
import BusinessBuyerLeadForm from '@/components/BusinessBuyerLeadForm';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import LazySection from '@/components/LazySection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import heroImage from '@/assets/texas-business-buyer.jpg';
import logo from '@/assets/logo-sineva-grupo.svg';

const BuyBusinessLeads = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const heroAnimation = useScrollAnimation();
  const whyAnimation = useScrollAnimation();
  const receiveAnimation = useScrollAnimation();
  const opportunitiesAnimation = useScrollAnimation();
  const processAnimation = useScrollAnimation();
  const proofAnimation = useScrollAnimation();
  const formAnimation = useScrollAnimation();

  const benefits = [
    { icon: Eye, title: 'Exclusive Listings', description: 'Access opportunities not found on public marketplaces.' },
    { icon: TrendingUp, title: 'Personalized Deal Matching', description: 'We present only businesses aligned with your goals and budget.' },
    { icon: Award, title: 'Expert Guidance', description: 'From valuation to closing, we manage every step for you.' },
    { icon: MapPin, title: 'Texas Expertise', description: 'Our brokers live, work, and negotiate right here in Texas.' },
    { icon: Lock, title: '100% Confidential', description: 'Your details are never shared without your consent.' },
  ];

  const features = [
    { icon: Check, title: 'Verified Business Listings', description: 'Real financials, verified ownership, and complete documentation.' },
    { icon: TrendingUp, title: 'Customized Buyer Matches', description: 'We only send you opportunities that meet your investment criteria.' },
    { icon: Award, title: 'Broker Insights', description: 'One-on-one support to help you assess each opportunity\'s true potential.' },
    { icon: DollarSign, title: 'Financing Options', description: 'Access to SBA-preferred lenders and investor-friendly terms.' },
  ];

  const opportunities = [
    { title: 'Established HVAC Company', location: 'Houston Area', revenue: '$2.3M Revenue', blur: true },
    { title: 'Pet Grooming and Training School', location: 'Austin', revenue: '$380K Net Profit', blur: true },
    { title: 'Franchise Restaurant', location: 'Dallas Metroplex', revenue: 'Prime Location', blur: true },
  ];

  const processSteps = [
    { number: '01', title: 'Complete the Short Form Below', description: 'Tell us your goals, industries of interest, and investment range.' },
    { number: '02', title: 'Get Access to Listings', description: 'We will send opportunities that match your criteria within 24 hours.' },
    { number: '03', title: 'Review and Connect', description: 'Our local brokers guide you through financials, negotiation, and due diligence.' },
    { number: '04', title: 'Close with Confidence', description: 'You focus on running your new business - we handle the paperwork.' },
  ];

  const testimonials = [
    {
      quote: "Sinevabrokerage made buying my first business simple and stress-free. Within two weeks, I had access to listings that never appeared online.",
      author: "Daniel H.",
      title: "Investor, Dallas"
    },
    {
      quote: "They helped me buy a profitable logistics company in Houston and guided me through every step. It felt like working with a trusted business partner.",
      author: "Laura M.",
      title: "Houston Entrepreneur"
    },
  ];

  const stats = [
    { value: '$75M+', label: 'in business transactions across Texas' },
    { value: '200+', label: 'buyers matched' },
    { value: '20+', label: 'years of combined brokerage experience' },
    { value: 'Licensed', label: '& BBB Accredited' },
  ];

  const faqs = [
    {
      question: 'What industries do you specialize in?',
      answer: 'We handle businesses in hospitality, manufacturing, logistics, retail, healthcare, and professional services — all Texas-based.'
    },
    {
      question: 'Do I need to pay to access listings?',
      answer: 'No. Access is free for qualified buyers who complete the form.'
    },
    {
      question: 'How soon will I receive opportunities?',
      answer: 'Within 24–48 hours, based on your investment profile.'
    },
    {
      question: 'Can you help with financing?',
      answer: 'Yes, we partner with trusted SBA lenders and private funding sources.'
    },
  ];

  if (showThankYou) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Thank You! You're One Step Closer to Business Ownership.</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A local Sinevabrokerage advisor will contact you within 24 hours with opportunities that match your goals.
              Meanwhile, check your email for your Texas Business Buyer's Checklist.
            </p>
          </div>
          <Button size="lg" onClick={() => setShowThankYou(false)} className="mt-8">
            Return to Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Texas Business Buyer" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/20" />
        </div>
        
        <div ref={heroAnimation.elementRef} className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <img src={logo} alt="Sineva Brokerage" className="h-20 md:h-24 mx-auto mb-8" />
          
          <Badge variant="secondary" className="text-base px-6 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Exclusive Buyer Network
          </Badge>
          
          <h1 className={`text-5xl md:text-7xl font-bold leading-tight transition-all duration-700 ${heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Discover Profitable Businesses for Sale in Texas — Before Everyone Else
          </h1>
          
          <p className={`text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-200 ${heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Join Sinevabrokerage's exclusive network of verified business buyers. Get early access to off-market opportunities and personalized deal recommendations — all confidential.
          </p>
          
          <Button 
            size="lg" 
            className={`text-lg px-8 py-6 transition-all duration-700 delay-300 ${heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            📩 Get Access to Listings
          </Button>
        </div>
      </section>

      {/* Section 1 - Why This Matters */}
      <LazySection>
        <section ref={whyAnimation.elementRef} className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold">The Best Texas Businesses Never Hit the Public Market</h2>
              <p className="text-xl text-muted-foreground">
                Most high-performing Texas businesses are sold privately — to buyers who are pre-qualified, ready, and connected.
                Sinevabrokerage gives you that insider access.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}>
                🚀 Request Access to Active Listings
              </Button>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Section 2 - What You'll Receive */}
      <LazySection>
        <section ref={receiveAnimation.elementRef} className="py-16 md:py-24 px-6 md:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">When You Join, You'll Instantly Gain Access To:</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 p-6 rounded-lg bg-card border hover:border-primary/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* Section 3 - Featured Opportunities */}
      <LazySection>
        <section ref={opportunitiesAnimation.elementRef} className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Featured Opportunities Preview</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {opportunities.map((opp, index) => (
                <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="absolute inset-0 backdrop-blur-sm bg-background/60 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <div className="opacity-40">
                      <Badge variant="outline" className="mb-2">{opp.location}</Badge>
                      <h3 className="text-xl font-semibold">{opp.title}</h3>
                      <p className="text-primary font-semibold">{opp.revenue}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center space-y-6 mt-12">
              <p className="text-lg text-muted-foreground">
                Get access to these and dozens more — all verified and ready for qualified buyers.
              </p>
              <Button size="lg" onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}>
                📩 Show Me Available Businesses
              </Button>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Section 4 - How It Works */}
      <LazySection>
        <section ref={processAnimation.elementRef} className="py-16 md:py-24 px-6 md:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Our Buyer Process Is Simple, Transparent, and Proven</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {processSteps.map((step, index) => (
                <div key={index} className="flex gap-6 p-6 rounded-lg bg-card border">
                  <div className="text-5xl font-bold text-primary/20">{step.number}</div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* Section 5 - Social Proof */}
      <LazySection>
        <section ref={proofAnimation.elementRef} className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="p-8 space-y-4">
                    <p className="text-lg italic">"{testimonial.quote}"</p>
                    <div className="pt-4 border-t">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-8">📊 Results You Can Trust:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="text-4xl font-bold text-primary">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Section 6 - Lead Form */}
      <LazySection>
        <section id="lead-form" ref={formAnimation.elementRef} className="py-16 md:py-24 px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <BusinessBuyerLeadForm onSuccess={() => setShowThankYou(true)} />
          </div>
        </section>
      </LazySection>

      {/* Section 7 - FAQ */}
      <LazySection>
        <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card border rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </LazySection>

      {/* Section 8 - Final CTA */}
      <LazySection>
        <section className="py-16 md:py-24 px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Buy a Business in Texas? Start Here.</h2>
            <p className="text-xl text-muted-foreground">
              Join hundreds of Texas entrepreneurs who found their next opportunity through Sinevabrokerage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}>
                📩 Get Access to Listings Now
              </Button>
              <Button size="lg" variant="outline">
                📘 Download: "The Texas Business Buyer's Checklist (Free PDF)"
              </Button>
            </div>
          </div>
        </section>
      </LazySection>
    </div>
  );
};

export default BuyBusinessLeads;