import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, MapPin, ShieldCheck, Users, DollarSign, Clock, Briefcase, Award, FileCheck, Target, Search, FileText, Handshake, Key } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import heroImage from '@/assets/texas-business-buyer.jpg';
import handshakeImage from '@/assets/business-deal-handshake.jpg';
import skylineImage from '@/assets/texas-skyline-business.jpg';
import celebrationImage from '@/assets/team-success-celebration.jpg';
import consultationImage from '@/assets/consultation-meeting.jpg';
import ownerImage from '@/assets/successful-business-owner.jpg';
import growthImage from '@/assets/business-growth-analytics.jpg';
import logoImage from '@/assets/logo-sineva-grupo.svg';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';

const BuyBusinessLanding = () => {
  const bookingUrl = "https://cal.com/sineva-brokerage/buy";

  return (
    <>
      <SEOHead
        title="Buy a Profitable Texas Business | Sinevabrokerage"
        description="Gain access to verified business opportunities across Texas. Our licensed brokers help you evaluate, negotiate, and close with confidence."
        keywords={["buy business texas", "texas business broker", "business acquisition", "texas business opportunities"]}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              alt="Texas Business Acquisition" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
          </div>
          
          <div className="container relative z-10 px-6 md:px-8 text-center">
            <div className="max-w-5xl mx-auto space-y-6">
              <Link to="/buy-business" className="inline-block mb-6">
                <img src={logoImage} alt="Sineva Brokerage" className="h-20 md:h-24 mx-auto" />
              </Link>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight px-4">
                Own a Profitable Texas Business
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-3xl mx-auto px-4 pt-2">
                Access verified opportunities across Texas. Our licensed brokers guide you through evaluation, negotiation, and closing — so you can focus on success, not stress.
              </p>

              <div className="flex flex-wrap gap-3 justify-center items-center pt-6 px-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm md:text-base py-2 px-4">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  20+ Years Experience
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm md:text-base py-2 px-4">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  100% Texas Focus
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm md:text-base py-2 px-4">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Licensed Brokers
                </Badge>
              </div>

              <div className="pt-8 px-4">
                <p className="text-white/90 text-base md:text-lg mb-6">🎯 Free 30-Minute Buyer Consultation with Licensed Texas Broker</p>
                <Button 
                  size="lg" 
                  className="text-base md:text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform"
                  asChild
                >
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    📅 Book My Free Consultation
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Image + Benefits Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img 
                  src={consultationImage} 
                  alt="Business consultation" 
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Your Texas Business Acquisition Partner — Every Step of the Way
                </h2>
                <p className="text-xl text-muted-foreground mb-6">
                  Buying a business is a major life decision. Whether you're an investor, first-time buyer, or seasoned entrepreneur, we ensure your acquisition is informed, structured, and secure.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  From search to closing, we handle everything. Our personalized approach means you're never navigating this complex process alone.
                </p>
                <Button size="lg" asChild>
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    Get Started Today
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <Award className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-lg font-bold mb-2">🏆 Exclusive Listings</h3>
                  <p className="text-sm text-muted-foreground">
                    Access businesses not publicly advertised
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <MapPin className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-lg font-bold mb-2">🧭 Local Experts</h3>
                  <p className="text-sm text-muted-foreground">
                    We live and work in Texas
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <ShieldCheck className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-lg font-bold mb-2">🔍 Vetted Sellers</h3>
                  <p className="text-sm text-muted-foreground">
                    Every listing pre-screened
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <Users className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-lg font-bold mb-2">🤝 Full Guidance</h3>
                  <p className="text-sm text-muted-foreground">
                    Every step with you
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <Briefcase className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-lg font-bold mb-2">💼 End-to-End</h3>
                  <p className="text-sm text-muted-foreground">
                    Financing to closing
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Process with Image */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-6 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                We Simplify the Business Buying Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our proven 5-step methodology ensures you make informed decisions at every stage of your business acquisition journey.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="space-y-6">
                <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-start gap-6 p-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold">Initial Consultation</h3>
                      </div>
                      <p className="text-muted-foreground">
                        We learn your goals — industry preferences, location, budget, ideal business size, and lifestyle objectives. This helps us understand exactly what you're looking for.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-start gap-6 p-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Search className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold">Opportunity Matching</h3>
                      </div>
                      <p className="text-muted-foreground">
                        You receive handpicked, pre-screened businesses that fit your exact profile. We present only opportunities that match your criteria and financial capacity.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-start gap-6 p-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold">Financial Evaluation</h3>
                      </div>
                      <p className="text-muted-foreground">
                        We analyze financials, market trends, and potential risks together. Full transparency on numbers, cash flow, profitability, and growth potential.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-start gap-6 p-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      4
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Handshake className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold">Negotiation & Offer</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Our brokers help you structure offers that protect your interests. We negotiate terms, price, and conditions on your behalf to secure the best deal.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-start gap-6 p-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      5
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Key className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold">Closing Support</h3>
                      </div>
                      <p className="text-muted-foreground">
                        We coordinate with attorneys, accountants, and banks until you own your business. Complete guidance through documentation, legal requirements, and transition planning.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <img 
                  src={handshakeImage} 
                  alt="Business deal" 
                  className="rounded-2xl shadow-2xl w-full h-full object-cover sticky top-24"
                />
              </div>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  💬 Schedule Your Free Buyer Strategy Session Now
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Texas Market with Large Visual */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Why Texas Is the #1 State for Business Buyers
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Texas offers unmatched opportunities for entrepreneurs and investors looking to acquire established businesses.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">🌎 Fastest-Growing Economy</h3>
                      <p className="text-muted-foreground">
                        Over 300,000 small businesses thrive in Texas. The state's GDP growth consistently outpaces the national average, creating a robust environment for business ownership.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <DollarSign className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">💡 Pro-Business Climate</h3>
                      <p className="text-muted-foreground">
                        No state income tax, favorable lending environment, and business-friendly regulations make Texas the ideal state for business acquisitions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Briefcase className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">🚀 Booming Industries</h3>
                      <p className="text-muted-foreground">
                        Manufacturing, logistics, healthcare, and hospitality sectors are experiencing unprecedented growth across major Texas cities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Award className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">💼 Hidden Opportunities</h3>
                      <p className="text-muted-foreground">
                        The best business opportunities never hit public listings. Our insider network gives you first access to premium deals before they reach the market.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <img 
                  src={skylineImage} 
                  alt="Texas skyline" 
                  className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                />
                <img 
                  src={growthImage} 
                  alt="Business growth analytics" 
                  className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories with Images */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-6 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Real Success Stories from Texas Buyers
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Join hundreds of satisfied business owners who trusted Sinevabrokerage to find and acquire their perfect business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
              <div className="relative">
                <img 
                  src={ownerImage} 
                  alt="Successful business owner" 
                  className="rounded-2xl w-full h-[400px] object-cover mb-6"
                />
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <p className="text-lg mb-4 text-white/90">
                      "I spent months looking for a business on my own and kept hitting dead ends. Sinevabrokerage matched me with a logistics company that perfectly fit my investment range. I closed in under 60 days!"
                    </p>
                    <p className="font-bold text-white">— Alicia Gomez, Austin Investor</p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <img 
                  src={celebrationImage} 
                  alt="Team success" 
                  className="rounded-2xl w-full h-[400px] object-cover mb-6"
                />
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <p className="text-lg mb-4 text-white/90">
                      "From the first call to the final handshake, they were on top of every detail. I now run a successful café in Dallas — and the transition was seamless."
                    </p>
                    <p className="font-bold text-white">— Luis Morales, Business Owner</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$75M+</div>
                <p className="text-white/80">Successful Transactions</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-white/80">Texas Market Focus</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">90 Days</div>
                <p className="text-white/80">Average Closing</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">200+</div>
                <p className="text-white/80">Buyers Matched</p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                We're More Than Brokers — We're Your Texas Business Partners
              </h2>
              
              <p className="text-xl text-muted-foreground mb-6">
                Founded in Texas, Sinevabrokerage specializes in facilitating confidential business acquisitions and sales across the state.
              </p>

              <p className="text-lg text-muted-foreground mb-12">
                Our mission is to empower entrepreneurs with transparent, expert-led brokerage services that protect their investment and time. We combine decades of experience in valuation, negotiation, and deal management with a personalized, high-touch approach.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Badge variant="outline" className="text-base py-3 px-4 justify-center">
                  <FileCheck className="w-5 h-5 mr-2" />
                  Licensed Brokerage
                </Badge>
                <Badge variant="outline" className="text-base py-3 px-4 justify-center">
                  <Award className="w-5 h-5 mr-2" />
                  IBBA Member
                </Badge>
                <Badge variant="outline" className="text-base py-3 px-4 justify-center">
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  BBB Accredited
                </Badge>
                <Badge variant="outline" className="text-base py-3 px-4 justify-center">
                  <Clock className="w-5 h-5 mr-2" />
                  20+ Years Experience
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-6 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Common questions about buying a business in Texas
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="q1" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    How much do I need to invest to buy a business in Texas?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Typically, buyers invest between $100K and $1M. We'll help identify businesses that align with your capital and financing options. Many buyers use a combination of personal funds and SBA loans to complete the purchase.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q2" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    How long does it take to buy a business?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    On average, 60–90 days depending on due diligence and financing. We manage every step for you to ensure a smooth and efficient process.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q3" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    Are your consultations really free?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes — no hidden fees or commitments. It's a discovery session to understand your goals and see if we're a good fit to work together.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q4" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    Can you help with financing?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely. We connect buyers with SBA lenders and private investors who specialize in business acquisitions. Our network can help you secure favorable financing terms.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q5" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    What types of businesses do you broker?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We handle a wide range of industries including restaurants, retail, manufacturing, service businesses, healthcare, and more. Our portfolio includes businesses across all major Texas cities.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-6 md:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Start Your Texas Business Ownership Journey Today
              </h2>
              
              <p className="text-xl mb-10 text-white/90">
                Let's find your next profitable opportunity — confidentially, efficiently, and strategically.
              </p>

              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform"
                asChild
              >
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  📅 Book Your Free Buyer Consultation
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BuyBusinessLanding;
