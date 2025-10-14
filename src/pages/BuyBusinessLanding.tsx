import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, MapPin, ShieldCheck, Users, DollarSign, Clock, Briefcase, Award, FileCheck } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import heroImage from '@/assets/texas-business-buyer.jpg';
import handshakeImage from '@/assets/business-deal-handshake.jpg';
import skylineImage from '@/assets/texas-skyline-business.jpg';
import celebrationImage from '@/assets/team-success-celebration.jpg';
import consultationImage from '@/assets/consultation-meeting.jpg';
import mapImage from '@/assets/texas-business-map.jpg';
import ownerImage from '@/assets/successful-business-owner.jpg';
import SEOHead from '@/components/SEOHead';

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
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              alt="Texas Business Acquisition" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
          </div>
          
          <div className="container relative z-10 px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Own a Profitable Texas Business
              </h1>
              
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-3xl mx-auto">
                Verified opportunities. Expert guidance. Zero guesswork.
              </p>

              <div className="flex flex-wrap gap-4 justify-center items-center pt-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-base py-2 px-4">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  20+ Years
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-base py-2 px-4">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  100% Texas
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-base py-2 px-4">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Licensed Brokers
                </Badge>
              </div>

              <div className="pt-6">
                <p className="text-white/90 text-lg mb-4">🎯 Free 30-Minute Consultation</p>
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform"
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
        <section className="py-20 bg-background">
          <div className="container px-4">
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
                  Your Texas Business Partner
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  From search to closing, we handle everything.
                </p>
                <Button size="lg" asChild>
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    Get Started
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

        {/* Process with Image */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Simple 5-Step Process
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="space-y-6">
                {[
                  { step: 1, title: "Consultation", desc: "Share your goals with us" },
                  { step: 2, title: "Matching", desc: "Receive handpicked opportunities" },
                  { step: 3, title: "Evaluation", desc: "Analyze financials together" },
                  { step: 4, title: "Negotiation", desc: "Structure your best offer" },
                  { step: 5, title: "Closing", desc: "Own your business" }
                ].map((item) => (
                  <Card key={item.step} className="border-l-4 border-l-primary">
                    <CardContent className="flex items-center gap-6 p-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <img 
                  src={handshakeImage} 
                  alt="Business deal" 
                  className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
                />
              </div>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  💬 Schedule Your Free Strategy Session
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Texas Market with Large Visual */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Why Texas?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  #1 state for business buyers
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-1">🌎 Fastest-Growing Economy</h3>
                      <p className="text-muted-foreground">300,000+ thriving businesses</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <DollarSign className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-1">💡 Pro-Business Climate</h3>
                      <p className="text-muted-foreground">No state income tax</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Briefcase className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-1">🚀 Booming Industries</h3>
                      <p className="text-muted-foreground">Logistics, healthcare, hospitality</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Award className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-1">💼 Hidden Opportunities</h3>
                      <p className="text-muted-foreground">Best deals never go public</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <img 
                  src={skylineImage} 
                  alt="Texas skyline" 
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover mb-6"
                />
                <img 
                  src={mapImage} 
                  alt="Texas business map" 
                  className="rounded-2xl shadow-lg w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories with Images */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Real Success Stories
              </h2>
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
                      "Matched with a logistics company. Closed in under 60 days!"
                    </p>
                    <p className="font-bold text-white">— Alicia G., Austin</p>
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
                      "Now running a successful café in Dallas. Transition was seamless."
                    </p>
                    <p className="font-bold text-white">— Luis M., Dallas</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$75M+</div>
                <p className="text-white/80">Transactions</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-white/80">Texas Focus</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">90</div>
                <p className="text-white/80">Days Average</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">200+</div>
                <p className="text-white/80">Buyers Matched</p>
              </div>
            </div>
          </div>
        </section>

        {/* About - Minimal Text */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                More Than Brokers — Your Partners
              </h2>
              
              <p className="text-xl text-muted-foreground mb-12">
                Decades of experience in Texas business acquisitions. Transparent, expert-led service that protects your investment.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Badge variant="outline" className="text-base py-3 px-4 justify-center">
                  <FileCheck className="w-5 h-5 mr-2" />
                  Licensed
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
                  20+ Years
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Condensed */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Quick Answers
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="q1" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    How much do I need to invest?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Typically $100K–$1M. We'll find businesses matching your budget.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q2" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    How long does it take?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    60–90 days on average. We manage everything.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q3" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    Are consultations free?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes — no fees or commitments.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q4" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    Can you help with financing?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely. We connect you with SBA lenders and investors.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Start Your Journey Today
              </h2>
              
              <p className="text-xl mb-10 text-white/90">
                Find your next profitable opportunity — confidentially and strategically.
              </p>

              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform"
                asChild
              >
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  📅 Book Your Free Consultation
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
