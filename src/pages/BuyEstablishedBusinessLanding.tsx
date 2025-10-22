import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EstablishedBusinessLeadForm from "@/components/EstablishedBusinessLeadForm";
import { CheckCircle2, TrendingUp, Shield, Users, Building2, Store, Fuel, Sparkles, DollarSign, MapPin, Award, FileCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import LazySection from "@/components/LazySection";

const BuyEstablishedBusinessLanding = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: whyTexasRef, isVisible: whyTexasVisible } = useScrollAnimation();
  const { elementRef: howItWorksRef, isVisible: howItWorksVisible } = useScrollAnimation();

  const marketFacts = [
    { icon: DollarSign, text: "Over 300,000 small businesses operate successfully in Texas" },
    { icon: TrendingUp, text: "No state income tax = higher business profit retention" },
    { icon: MapPin, text: "Growing cities like Dallas, Houston, Austin, and San Antonio" },
    { icon: Users, text: "Local services are always in demand — laundry, food, grooming, beauty, fuel, and convenience" },
  ];

  const whyUsFeatures = [
    { icon: Sparkles, title: "Exclusive, Off-Market Listings", desc: "Businesses not found online." },
    { icon: FileCheck, title: "Verified Financials & Owner Transparency", desc: "We ensure everything checks out." },
    { icon: Shield, title: "Complete Guidance", desc: "From valuation and negotiation to closing." },
    { icon: MapPin, title: "Local Expertise", desc: "We know the Texas market better than anyone." },
    { icon: Award, title: "Confidential Process", desc: "Protecting your privacy and your investment." },
  ];

  const howItWorksSteps = [
    { 
      step: "1", 
      title: "Tell Us What You Want", 
      desc: "Fill out a short form with your goals, preferred industry, and investment range.",
      advantage: "We identify businesses that fit your lifestyle and financial goals."
    },
    { 
      step: "2", 
      title: "Get Personalized Matches", 
      desc: "Receive verified listings — laundromats, gas stations, convenience stores, salons, and more.",
      advantage: "No wasted time searching random listings."
    },
    { 
      step: "3", 
      title: "Review & Visit Businesses", 
      desc: "We coordinate viewings and owner introductions confidentially.",
      advantage: "You get firsthand access before other buyers."
    },
    { 
      step: "4", 
      title: "Evaluate the Numbers", 
      desc: "Our team helps analyze cash flow, expenses, and return potential.",
      advantage: "Make data-backed decisions."
    },
    { 
      step: "5", 
      title: "Negotiate & Close Confidently", 
      desc: "We assist with offers, contracts, and financing.",
      advantage: "You acquire the business safely and smoothly."
    },
  ];

  const testimonials = [
    {
      quote: "I wanted a stable business with consistent cash flow. Sinevabrokerage matched me with a laundromat in Houston that's now generating steady income every month.",
      author: "Farhan A.",
      location: "Houston"
    },
    {
      quote: "They helped me buy a gas station in Dallas and guided me through SBA financing. It was my first business purchase, and the experience was seamless.",
      author: "Jessica M.",
      location: "Dallas"
    },
    {
      quote: "After six months of searching online, Sinevabrokerage found me a profitable convenience store in Austin. They handled everything from due diligence to closing.",
      author: "Alicia R.",
      location: "Austin"
    },
    {
      quote: "I live overseas and needed a trusted team. Sinevabrokerage found me a restaurant in Texas that qualifies for my E2 visa. Exceptional service.",
      author: "Naveen S.",
      location: "International Investor"
    },
  ];

  const whoWeWorkWith = [
    "First-time entrepreneurs ready to own a local business",
    "Immigrant investors (E2, L1A, EB5 visas) seeking U.S. operations",
    "Experienced owners looking to expand their portfolio",
    "Passive investors wanting semi-absentee ownership",
  ];

  const scrollToForm = () => {
    document.getElementById('lead-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-accent"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2000')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary-light/90 to-accent/85" />
        
        <div className={`container mx-auto px-4 relative z-10 text-center transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-block mb-4">
              <Badge variant="secondary" className="text-lg px-6 py-2 bg-white/20 backdrop-blur-sm border-white/30 text-white">
                Own a Proven, Income-Generating Business in Texas
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Buy a Laundromat, Gas Station, Convenience Store, Restaurant, Salon, or Spa
              <span className="block mt-4 text-gold">Without the Guesswork</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Sinevabrokerage helps entrepreneurs and investors acquire profitable, established businesses across Texas. We simplify the process from discovery to closing — so you can focus on growth, not paperwork.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="bg-gold hover:bg-gold/90 text-primary font-semibold text-lg px-8 py-6 shadow-gold"
              >
                📩 Get Access to Businesses for Sale
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Copy Section */}
      <LazySection>
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">
                You don't need to build a business from scratch to succeed in Texas.
              </h2>
              <p className="text-xl text-center text-muted-foreground">
                With Sinevabrokerage, you can buy into proven cash flow and take control of your financial future.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 pt-8">
                {[
                  { icon: CheckCircle2, text: "Already operating profitably" },
                  { icon: FileCheck, text: "Have clean financials and verifiable income" },
                  { icon: Users, text: "Supported by trained staff and loyal customers" },
                  { icon: Award, text: "Ready for transfer — not trial and error" },
                ].map((item, idx) => (
                  <Card key={idx} className="border-accent/20 hover:shadow-card transition-all">
                    <CardContent className="p-6 flex items-start gap-4">
                      <item.icon className="w-8 h-8 text-accent flex-shrink-0" />
                      <p className="text-lg font-medium">{item.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center pt-8">
                <Button 
                  size="lg" 
                  onClick={scrollToForm}
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-white"
                >
                  📋 See Available Texas Businesses
                </Button>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Why Texas Section */}
      <LazySection>
        <section 
          ref={whyTexasRef}
          className="py-20 bg-background"
        >
          <div className={`container mx-auto px-4 transition-all duration-1000 ${whyTexasVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Buying the Right Business in Texas Can Change Everything
              </h2>
              <h3 className="text-2xl md:text-3xl font-semibold text-accent">
                Texas Is the Best Place to Own a Small Business — Here's Why
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Texas is one of the fastest-growing economies in the U.S. Low taxes, a booming population, and strong local demand make everyday businesses — laundromats, gas stations, convenience stores, salons, and restaurants — highly resilient and profitable.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 pt-8">
                {marketFacts.map((fact, idx) => (
                  <Card key={idx} className="border-primary/20 hover:shadow-accent transition-all">
                    <CardContent className="p-6 flex items-start gap-4">
                      <fact.icon className="w-10 h-10 text-primary flex-shrink-0" />
                      <p className="text-left text-lg">{fact.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Why Work With Us Section */}
      <LazySection>
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Why Work With Sinevabrokerage?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  We're not a listing website — we're your local brokerage partner with over a decade of experience helping entrepreneurs buy real businesses safely.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyUsFeatures.map((feature, idx) => (
                  <Card key={idx} className="border-accent/20 hover:shadow-accent hover:-translate-y-1 transition-all">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="font-bold text-lg">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Client Success Stories */}
      <LazySection>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">
                Client Success Stories
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {testimonials.slice(0, 2).map((testimonial, idx) => (
                  <Card key={idx} className="border-primary/20 hover:shadow-card transition-all">
                    <CardContent className="p-8 space-y-4">
                      <p className="text-lg italic text-muted-foreground">"{testimonial.quote}"</p>
                      <div className="font-semibold text-foreground">
                        — {testimonial.author}, <span className="text-accent">{testimonial.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 pt-8">
                <Card className="border-gold/30 bg-gold/5">
                  <CardContent className="p-8 text-center space-y-2">
                    <div className="text-4xl font-bold text-gold">$75M+</div>
                    <p className="text-muted-foreground">in completed transactions</p>
                  </CardContent>
                </Card>
                <Card className="border-gold/30 bg-gold/5">
                  <CardContent className="p-8 text-center space-y-2">
                    <div className="text-4xl font-bold text-gold">200+</div>
                    <p className="text-muted-foreground">Texas business owners matched with buyers</p>
                  </CardContent>
                </Card>
                <Card className="border-gold/30 bg-gold/5">
                  <CardContent className="p-8 text-center space-y-2">
                    <div className="text-4xl font-bold text-gold">20+</div>
                    <p className="text-muted-foreground">years combined experience</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center">
                <Button 
                  size="lg" 
                  onClick={scrollToForm}
                  className="bg-primary hover:bg-primary-light text-white"
                >
                  📩 Access Active Business Listings
                </Button>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* How It Works Section */}
      <LazySection>
        <section 
          ref={howItWorksRef}
          className="py-20 bg-secondary/30"
        >
          <div className={`container mx-auto px-4 transition-all duration-1000 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  We Help You Find, Evaluate, and Own the Right Business
                </h2>
                <p className="text-xl text-muted-foreground">Here's Exactly How It Works</p>
              </div>
              
              <div className="space-y-6">
                {howItWorksSteps.map((step, idx) => (
                  <Card key={idx} className="border-accent/20 hover:shadow-card transition-all">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                          <p className="text-lg text-muted-foreground">{step.desc}</p>
                          <div className="flex items-start gap-2 pt-2">
                            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <p className="text-accent font-medium">{step.advantage}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Who We Work With Section */}
      <LazySection>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">
                Who We Work With
              </h2>
              <p className="text-xl text-center text-muted-foreground">
                Sinevabrokerage works with:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {whoWeWorkWith.map((type, idx) => (
                  <Card key={idx} className="border-primary/20 hover:shadow-accent transition-all">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-lg font-medium">{type}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <p className="text-xl text-center text-foreground font-semibold">
                We make ownership achievable — not complicated.
              </p>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Lead Form Section */}
      <section id="lead-form-section" className="py-20 bg-gradient-to-br from-primary via-primary-light to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <EstablishedBusinessLeadForm />
          </div>
        </div>
      </section>

      {/* More Testimonials */}
      <LazySection>
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">
                What Our Clients Say
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {testimonials.slice(2, 4).map((testimonial, idx) => (
                  <Card key={idx} className="border-primary/20 hover:shadow-card transition-all">
                    <CardContent className="p-8 space-y-4">
                      <p className="text-lg italic text-muted-foreground">"{testimonial.quote}"</p>
                      <div className="font-semibold text-foreground">
                        — {testimonial.author}, <span className="text-accent">{testimonial.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Final CTA Section */}
      <LazySection>
        <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold">
                Start Owning, Not Just Dreaming
              </h2>
              <p className="text-xl md:text-2xl text-white/90">
                Thousands of entrepreneurs have built financial freedom by buying existing businesses instead of starting from scratch. Now it's your turn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button 
                  size="lg" 
                  onClick={scrollToForm}
                  className="bg-gold hover:bg-gold/90 text-primary font-semibold text-lg px-8 py-6 shadow-gold"
                >
                  📩 Get Access to Texas Businesses for Sale
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  📘 Download "The Texas Business Buyer's Guide (Free)"
                </Button>
              </div>
              
              <p className="text-white/80 text-sm pt-4">
                Receive handpicked listings — laundromats, gas stations, salons, restaurants, spas, and more — all verified and ready for purchase.
              </p>
            </div>
          </div>
        </section>
      </LazySection>

      <Footer />
    </div>
  );
};

export default BuyEstablishedBusinessLanding;
