import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Shield, 
  Target, 
  Eye, 
  Users, 
  Settings,
  TrendingUp,
  DollarSign,
  FileCheck,
  Handshake,
  CheckCircle2,
  Phone,
  Calendar,
  Award
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import successfulBusinessOwner from "@/assets/successful-business-owner.jpg";
import businessHandshake from "@/assets/business-handshake.jpg";
import businessDealHandshake from "@/assets/business-deal-handshake.jpg";
import professionalWorkspace from "@/assets/professional-workspace.jpg";
import businessGrowthAnalytics from "@/assets/business-growth-analytics.jpg";
import consultationMeeting from "@/assets/consultation-meeting.jpg";
import texasBusinessDistrict from "@/assets/texas-business-district.jpg";
import happyBusinessOwner from "@/assets/happy-business-owner.jpg";
import businessTeamSuccess from "@/assets/business-team-success.jpg";
import investmentMeeting from "@/assets/investment-meeting.jpg";

const SellBusinessLanding = () => {
  const heroAnimation = useScrollAnimation();
  const section1Animation = useScrollAnimation();
  const section2Animation = useScrollAnimation();
  const section3Animation = useScrollAnimation();
  const section4Animation = useScrollAnimation();
  const section5Animation = useScrollAnimation();
  const section6Animation = useScrollAnimation();
  const section7Animation = useScrollAnimation();
  const section8Animation = useScrollAnimation();

  const sellingProcess = [
    {
      step: "1. Confidential Consultation",
      description: "Discuss your goals and timeline privately.",
      icon: Shield
    },
    {
      step: "2. Business Valuation",
      description: "Receive an accurate, no-obligation market valuation.",
      icon: Target
    },
    {
      step: "3. Preparation & Packaging",
      description: "We enhance your financials and presentation to attract top buyers.",
      icon: FileCheck
    },
    {
      step: "4. Marketing & Buyer Screening",
      description: "Your listing is shared confidentially with our network of verified Texas buyers.",
      icon: Users
    },
    {
      step: "5. Negotiation & Closing",
      description: "We handle offers, due diligence, and final agreements until funds are secured.",
      icon: Handshake
    }
  ];

  const texasCities = [
    "Houston",
    "Dallas-Fort Worth",
    "San Antonio",
    "Austin",
    "El Paso",
    "and every growing Texas community"
  ];

  const testimonials = [
    {
      quote: "After 15 years running my retail shop, I wanted to retire but didn't know where to start. Sinevabrokerage sold my business within 4 months — privately and profitably.",
      author: "Cynthia Rodriguez",
      location: "Houston"
    },
    {
      quote: "They found a serious buyer fast and guided us through every step. I walked away with more than I expected.",
      author: "Miguel Torres",
      location: "San Antonio"
    }
  ];

  const stats = [
    { label: "90% of listed businesses sold within 6 months", icon: TrendingUp },
    { label: "Average sale price: 98% of asking", icon: DollarSign },
    { label: "$75M+ in transactions", icon: Award },
    { label: "20 years of experience", icon: CheckCircle2 }
  ];

  const valueFactors = [
    "Consistent revenue and cash flow",
    "Strong brand and customer retention",
    "Reliable team and systems",
    "Growth potential and scalability",
    "Clean financial documentation"
  ];

  const aboutPoints = [
    "Integrity",
    "Clear communication",
    "Data-driven valuations",
    "Proven results"
  ];

  const faqs = [
    {
      question: "How much does it cost to sell my business?",
      answer: "Our consultation and valuation are free. Brokerage fees are success-based — you only pay when your business sells."
    },
    {
      question: "How long does a sale take?",
      answer: "Typically between 90–180 days, depending on your industry and buyer readiness."
    },
    {
      question: "Will my employees or clients find out?",
      answer: "No. We maintain complete confidentiality throughout the process."
    },
    {
      question: "Do you sell all industries?",
      answer: "We specialize in service, retail, manufacturing, logistics, and hospitality sectors across Texas."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroAnimation.elementRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${successfulBusinessOwner})`
          }}
        ></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black/20 to-secondary/30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 ${heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge variant="secondary" className="text-base px-6 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Professional Business Brokerage
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl bg-gradient-to-r from-white via-white to-white/90 bg-clip-text">
              Sell Your Texas Business for Maximum Value — Privately and Professionally
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
              From valuation to closing, we handle every step of the selling process. Our goal: get you the best possible price with complete confidentiality.
            </p>
            
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-2xl border-0"
              onClick={() => window.open('https://cal.com/sineva-brokerage/sell', '_blank')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Free Business Valuation Call
            </Button>
          </div>
        </div>
      </section>

      {/* Section 1 - Why Choose Sinevabrokerage */}
      <section ref={section1Animation.elementRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Image Banner */}
          <div className="max-w-6xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={businessHandshake} 
              alt="Professional business brokerage services" 
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${section1Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Texas Business Owners Deserve a Brokerage That Protects Their Legacy
            </h2>
            <p className="text-xl text-muted-foreground">
              Selling your business is personal. We respect the years you've built and make sure your exit is rewarding — not rushed.
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
                    <h3 className="text-xl font-bold mb-2">True Market Valuation</h3>
                    <p className="text-muted-foreground">
                      Based on real Texas comps, not generic algorithms.
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
                    <h3 className="text-xl font-bold mb-2">Confidential Representation</h3>
                    <p className="text-muted-foreground">
                      We market discreetly — your employees, customers, and competitors will not know.
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
                    <h3 className="text-xl font-bold mb-2">Qualified Buyers Only</h3>
                    <p className="text-muted-foreground">
                      We screen all inquiries for financial and operational capability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Turnkey Process</h3>
                    <p className="text-muted-foreground">
                      From listing to closing, our team manages everything.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2 - The Selling Process */}
      <section ref={section2Animation.elementRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${section2Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Sinevabrokerage Selling Process
            </h2>
          </div>

          {/* Image Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={consultationMeeting} 
                alt="Business consultation meeting" 
                className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={businessDealHandshake} 
                alt="Business deal closing" 
                className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {sellingProcess.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-102">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{item.step}</h3>
                        <p className="text-lg text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={() => window.open('https://cal.com/sineva-brokerage/sell', '_blank')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Book Your Free Valuation Session
            </Button>
          </div>
        </div>
      </section>

      {/* Section 3 - Local Brokerage Value */}
      <section ref={section3Animation.elementRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Featured Image */}
          <div className="max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={texasBusinessDistrict} 
              alt="Texas business district" 
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${section3Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Value of Working with a Local Brokerage
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Unlike national online listing sites, Sinevabrokerage specializes exclusively in Texas transactions. We know the local market, buyer demand, and pricing realities that maximize your sale.
            </p>

            <div className="bg-muted/50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">We Sell Businesses In:</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {texasCities.map((city, index) => (
                  <div key={index} className="flex items-center justify-center space-x-2 p-4 bg-background rounded-lg hover:shadow-md transition-shadow">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-semibold">{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Testimonials */}
      <section ref={section4Animation.elementRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${section4Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories from Texas Business Owners
            </h2>
          </div>

          {/* Success Images */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={happyBusinessOwner} 
                alt="Happy business owner after successful sale" 
                className="w-full h-[250px] object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={businessTeamSuccess} 
                alt="Team celebrating successful business transaction" 
                className="w-full h-[250px] object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={investmentMeeting} 
                alt="Investment meeting with buyers" 
                className="w-full h-[250px] object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-4 text-2xl">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                    <p className="font-bold text-lg">— {testimonial.author}</p>
                    <p className="text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 bg-primary/5 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-center mb-8">Transaction Highlights</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4">
                        <Icon className="w-8 h-8 text-primary shrink-0" />
                        <span className="text-lg font-semibold">{stat.label}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 5 - Educational Value */}
      <section ref={section5Animation.elementRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Featured Analytics Image */}
          <div className="max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={businessGrowthAnalytics} 
              alt="Business growth analytics and valuation" 
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${section5Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Want a Higher Selling Price? Here's What Buyers Look For:
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              We'll help you position your business to command top dollar.
            </p>

            <Card className="border-2 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {valueFactors.map((factor, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <span className="text-lg">{factor}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 6 - About Us */}
      <section ref={section6Animation.elementRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Professional Workspace Image */}
          <div className="max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={professionalWorkspace} 
              alt="Professional brokerage workspace" 
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${section6Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
              About Sinevabrokerage
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Sinevabrokerage is a Texas-based brokerage firm dedicated to helping entrepreneurs buy and sell businesses with transparency, precision, and confidentiality. Our team of licensed brokers, financial analysts, and transaction coordinators manages the entire process — so you don't have to.
            </p>

            <Card className="border-2 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-center mb-8">Our reputation is built on:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {aboutPoints.map((point, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                      <span className="text-lg font-semibold">{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 7 - FAQ */}
      <section ref={section7Animation.elementRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${section7Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-2 rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Section 8 - Final CTA */}
      <section ref={section8Animation.elementRef} className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${section8Animation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Your Next Chapter Starts with the Right Exit
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Let's help you sell your business — privately, profitably, and professionally.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://cal.com/sineva-brokerage/sell', '_blank')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Free Business Valuation Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellBusinessLanding;
