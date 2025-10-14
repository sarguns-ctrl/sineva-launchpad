import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, MapPin, ShieldCheck, Users, DollarSign, Clock, Briefcase, Award, FileCheck } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import heroImage from '@/assets/texas-business-buyer.jpg';
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
                Own a Profitable Texas Business — Without the Risk or Guesswork
              </h1>
              
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-3xl mx-auto">
                Gain access to verified business opportunities across Texas and acquire your next business with full confidence. 
                Our brokers help you evaluate, negotiate, and close — so you can focus on success, not stress.
              </p>

              <div className="flex flex-wrap gap-4 justify-center items-center pt-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-base py-2 px-4">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  20+ Years Experience
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-base py-2 px-4">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  100% Texas Focus
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-base py-2 px-4">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Licensed Brokers
                </Badge>
              </div>

              <div className="pt-6">
                <p className="text-white/90 text-lg mb-4">🎯 Free 30-Minute Buyer Consultation</p>
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

        {/* Section 1 - Why Work with Us */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Texas Business Acquisition Partner — Every Step of the Way
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Buying a business is a major life decision. Whether you're an investor, first-time buyer, 
                or seasoned entrepreneur, we ensure your acquisition is informed, structured, and secure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Award className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">🏆 Exclusive Texas Listings</h3>
                  <p className="text-muted-foreground">
                    Gain insider access to businesses that are not publicly advertised.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <MapPin className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">🧭 Local Expertise</h3>
                  <p className="text-muted-foreground">
                    Our brokers live and work in Texas — we know local industries, valuations, and hidden opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <ShieldCheck className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">🔍 Screened Sellers</h3>
                  <p className="text-muted-foreground">
                    Every listing is pre-vetted for accuracy, documentation, and profitability.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">🤝 Hands-On Guidance</h3>
                  <p className="text-muted-foreground">
                    From negotiation to due diligence, we walk with you through every stage.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Briefcase className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">💼 End-to-End Support</h3>
                  <p className="text-muted-foreground">
                    Financing introductions, legal documentation, and transition management.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 2 - The Buyer's Journey */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                We Simplify the Business Buying Process
              </h2>
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
              {[
                { step: 1, title: "Consultation", desc: "We learn your goals — industry, location, budget, and ideal lifestyle." },
                { step: 2, title: "Opportunity Matching", desc: "You receive handpicked, pre-screened businesses that fit your exact profile." },
                { step: 3, title: "Financial Evaluation", desc: "We analyze numbers, trends, and risks together to ensure transparency." },
                { step: 4, title: "Negotiation & Offer", desc: "Our brokers help you structure offers that protect your interests." },
                { step: 5, title: "Closing Support", desc: "We coordinate with attorneys, accountants, and banks until you own your business." }
              ].map((item) => (
                <Card key={item.step} className="border-l-4 border-l-primary">
                  <CardContent className="flex items-start gap-6 p-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
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

        {/* Section 3 - Market Insight */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Texas Is the #1 State for Business Buyers
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
              <Card className="border-2">
                <CardContent className="pt-6">
                  <TrendingUp className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">🌎 Fastest-Growing Economy</h3>
                  <p className="text-muted-foreground">
                    Over 300,000 small businesses operate successfully in the U.S.'s fastest-growing economy.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <DollarSign className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">💡 Low Taxes, Pro-Business</h3>
                  <p className="text-muted-foreground">
                    No state income tax and favorable commercial lending environment.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <Briefcase className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">🚀 Booming Industries</h3>
                  <p className="text-muted-foreground">
                    Manufacturing, logistics, healthcare, and hospitality are thriving.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <Award className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">💼 Strong Buyer Demand</h3>
                  <p className="text-muted-foreground">
                    The best opportunities never hit public listings — we give you first access.
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-xl max-w-3xl mx-auto">
              Partnering with <span className="font-bold">Sinevabrokerage</span> means you see opportunities before the market does.
            </p>
          </div>
        </section>

        {/* Section 4 - Success Stories */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Success Stories
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <p className="text-lg mb-4 text-white/90">
                    "I spent months looking for a business on my own and kept hitting dead ends. 
                    Sinevabrokerage matched me with a logistics company that perfectly fit my investment range. 
                    I closed in under 60 days!"
                  </p>
                  <p className="font-bold text-white">— Alicia Gomez, Austin Investor</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <p className="text-lg mb-4 text-white/90">
                    "From the first call to the final handshake, they were on top of every detail. 
                    I now run a successful café in Dallas — and the transition was seamless."
                  </p>
                  <p className="font-bold text-white">— Luis Morales, Business Owner</p>
                </CardContent>
              </Card>
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
                <p className="text-white/80">Average Closing Time</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">200+</div>
                <p className="text-white/80">Buyers Matched</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 - About */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                We're More Than Brokers — We're Your Texas Business Partners
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8">
                Founded in Texas, Sinevabrokerage specializes in facilitating confidential business acquisitions 
                and sales across the state. Our mission is to empower entrepreneurs with transparent, expert-led 
                brokerage services that protect their investment and time.
              </p>

              <p className="text-lg text-muted-foreground mb-12">
                We combine decades of experience in valuation, negotiation, and deal management with a personalized, 
                high-touch approach.
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

        {/* Section 6 - FAQ */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Common Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="q1" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    How much do I need to invest to buy a business in Texas?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Typically, buyers invest between $100K and $1M. We'll help identify businesses that align 
                    with your capital and financing options.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q2" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    How long does it take to buy a business?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    On average, 60–90 days depending on due diligence and financing. We manage every step for you.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q3" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    Are your consultations really free?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes — no hidden fees or commitments. It's a discovery session to understand your goals.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q4" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    Can you help with financing?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely. We connect buyers with SBA lenders and private investors.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Section 7 - Final CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 text-center">
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
