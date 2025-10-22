import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import EstablishedBusinessLeadForm from "@/components/EstablishedBusinessLeadForm";
import { CheckCircle2, TrendingUp, Shield, Users, Building2, Store, Fuel, Sparkles, DollarSign, MapPin, Award, FileCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import LazySection from "@/components/LazySection";
import heroImage from "@/assets/business-owner-hero.jpg";
import teamSuccessImage from "@/assets/team-success-celebration.jpg";
import teamMeetingImage from "@/assets/business-team-meeting.jpg";
import storefrontImage from "@/assets/small-business-storefront.jpg";
import laundromatModernImage from "@/assets/laundromat-modern.jpg";
import restaurantModernImage from "@/assets/restaurant-modern.jpg";
import convenienceStoreImage from "@/assets/convenience-store-modern.jpg";
import restaurantImage from "@/assets/restaurant-interior.jpg";
import businessGrowthImage from "@/assets/business-growth.jpg";
import successfulOwnerImage from "@/assets/successful-business-owner.jpg";
import texasBusinessImage from "@/assets/texas-business-buyer.jpg";
import consultationImage from "@/assets/business-consultation-meeting.jpg";
import logoImage from "@/assets/logo-sineva-grupo.svg";
import gasstationImage from "@/assets/commercial-skyline.jpg";
import franchiseImage from "@/assets/franchise-office.jpg";

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
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/95 via-[#2c5282]/90 to-[#1a202c]/85" />
        
        {/* Logo at top */}
        <Link 
          to="/buy-established-business" 
          className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 transition-transform hover:scale-105"
        >
          <img 
            src={logoImage} 
            alt="Sineva Brokerage" 
            className="h-16 md:h-20 w-auto"
          />
        </Link>
        
        <div className={`container mx-auto px-4 relative z-10 text-center transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge variant="secondary" className="text-base px-5 py-2 bg-white/20 backdrop-blur-sm border-white/30 text-white shadow-lg">
              🏢 Own a Proven, Income-Generating Business in Texas
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              Buy Established Businesses
              <span className="block mt-3 text-white">
                Without the Risk
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Acquire profitable laundromats, gas stations, restaurants, salons, and more across Texas with expert guidance every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="bg-white hover:bg-white/90 text-[#1e3a5f] font-bold text-lg px-10 py-7 shadow-2xl transition-all"
              >
                📩 View Available Businesses
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Copy Section */}
      <LazySection>
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">
                    Skip the Startup Struggle
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Buy into proven cash flow and take control of your financial future with businesses that are:
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { icon: CheckCircle2, text: "Already operating profitably" },
                      { icon: FileCheck, text: "Clean financials and verifiable income" },
                      { icon: Users, text: "Trained staff and loyal customers" },
                      { icon: Award, text: "Ready for transfer — not trial and error" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                        <div className="w-10 h-10 rounded-full bg-[#2c5282]/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-[#2c5282]" />
                        </div>
                        <p className="text-base font-medium text-slate-700 pt-1.5">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/20 to-[#1e3a5f]/20 rounded-2xl blur-2xl" />
                  <img 
                    src={teamSuccessImage} 
                    alt="Successful business team celebration" 
                    className="relative rounded-2xl shadow-2xl w-full h-[350px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Featured Business Types Banner */}
      <LazySection>
        <section className="py-12 bg-gradient-to-r from-slate-100 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e3a5f] mb-8">
                Types of Businesses We Broker
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                  <img src={laundromatModernImage} alt="Laundromat business" className="w-full h-56 object-cover" />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">Laundromats</h3>
                    <p className="text-muted-foreground">Steady cash flow with minimal management required</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                  <img src={restaurantModernImage} alt="Restaurant business" className="w-full h-56 object-cover" />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">Restaurants & Cafes</h3>
                    <p className="text-muted-foreground">Established customer base and proven menus</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                  <img src={convenienceStoreImage} alt="Convenience store business" className="w-full h-56 object-cover" />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">Convenience & Retail</h3>
                    <p className="text-muted-foreground">Prime locations with loyal customer bases</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Why Texas Section */}
      <LazySection>
        <section 
          ref={whyTexasRef}
          className="py-16 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <Badge className="bg-[#1e3a5f] text-white text-sm px-4 py-2">
                    🌟 Texas Advantage
                  </Badge>
                  
                  <h2 className="text-3xl md:text-5xl font-bold text-[#1e3a5f]">
                    Why Texas is Perfect for Business Ownership
                  </h2>
                  
                  <p className="text-lg text-slate-600">
                    Low taxes, booming population, and strong local demand make everyday businesses highly resilient and profitable.
                  </p>
                  
                  <div className="space-y-4">
                    {marketFacts.map((fact, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg hover:from-blue-100 transition-all">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] flex items-center justify-center flex-shrink-0">
                          <fact.icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-base font-medium text-slate-700 pt-2">{fact.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/20 to-[#2c5282]/20 rounded-2xl blur-2xl" />
                  <img 
                    src={texasBusinessImage} 
                    alt="Texas business opportunities" 
                    className="relative rounded-2xl shadow-2xl w-full h-[450px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Why Work With Us Section */}
      <LazySection>
        <section className="py-16 bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={teamMeetingImage} alt="" className="w-full h-full object-cover" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <Badge className="bg-white text-[#1e3a5f] text-sm px-4 py-2">
                  ⭐ Our Expertise
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Why Choose Sinevabrokerage?
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Your trusted partner with over a decade of experience helping entrepreneurs acquire businesses safely.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyUsFeatures.map((feature, idx) => (
                  <Card key={idx} className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-2 transition-all">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center shadow-lg">
                        <feature.icon className="w-8 h-8 text-[#1e3a5f]" />
                      </div>
                      <h3 className="font-bold text-lg text-white">{feature.title}</h3>
                      <p className="text-white/70 text-sm">{feature.desc}</p>
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
        <section className="py-16 bg-background">
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
                <Card className="border-[#2c5282]/30 bg-[#2c5282]/5">
                  <CardContent className="p-8 text-center space-y-2">
                    <div className="text-4xl font-bold text-[#1e3a5f]">$75M+</div>
                    <p className="text-muted-foreground">in completed transactions</p>
                  </CardContent>
                </Card>
                <Card className="border-[#2c5282]/30 bg-[#2c5282]/5">
                  <CardContent className="p-8 text-center space-y-2">
                    <div className="text-4xl font-bold text-[#1e3a5f]">200+</div>
                    <p className="text-muted-foreground">Texas business owners matched with buyers</p>
                  </CardContent>
                </Card>
                <Card className="border-[#2c5282]/30 bg-[#2c5282]/5">
                  <CardContent className="p-8 text-center space-y-2">
                    <div className="text-4xl font-bold text-[#1e3a5f]">20+</div>
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
          className="py-16 bg-secondary/30"
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
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Who We Work With
                </h2>
                <p className="text-xl text-muted-foreground">
                  Sinevabrokerage works with:
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {whoWeWorkWith.map((type, idx) => (
                    <Card key={idx} className="border-primary/20 hover:shadow-xl transition-all hover:border-[#2c5282]">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-lg font-medium pt-1.5">{type}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/20 to-[#1e3a5f]/20 rounded-2xl blur-2xl" />
                  <img 
                    src={consultationImage} 
                    alt="Business consultation meeting" 
                    className="relative rounded-2xl shadow-2xl w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-center pt-6">
                <p className="text-2xl text-foreground font-semibold">
                  We make ownership achievable — not complicated.
                </p>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Lead Form Section */}
      <section id="lead-form-section" className="py-20 bg-gradient-to-br from-[#1e3a5f] via-[#2c5282] to-[#1a202c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src={laundromatModernImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <EstablishedBusinessLeadForm />
          </div>
        </div>
      </section>

      {/* Success Stories with Images */}
      <LazySection>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">
                Success Stories from Real Owners
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="overflow-hidden hover:shadow-2xl transition-all border-primary/20">
                  <img 
                    src={successfulOwnerImage} 
                    alt="Successful business owner" 
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-8 space-y-4">
                    <p className="text-lg italic text-muted-foreground">"{testimonials[2].quote}"</p>
                    <div className="font-semibold text-foreground">
                      — {testimonials[2].author}, <span className="text-accent">{testimonials[2].location}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden hover:shadow-2xl transition-all border-primary/20">
                  <img 
                    src={businessGrowthImage} 
                    alt="Business growth and success" 
                    className="w-full h-64 object-cover"
                  />
                  <CardContent className="p-8 space-y-4">
                    <p className="text-lg italic text-muted-foreground">"{testimonials[3].quote}"</p>
                    <div className="font-semibold text-foreground">
                      — {testimonials[3].author}, <span className="text-accent">{testimonials[3].location}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Final CTA Section */}
      <LazySection>
        <section className="py-20 bg-gradient-to-br from-[#1e3a5f] via-[#2c5282] to-[#1e3a5f] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={restaurantImage} alt="" className="w-full h-full object-cover" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Start Owning, Not Just Dreaming
              </h2>
              <p className="text-xl text-white/90 font-medium">
                Thousands have built financial freedom by buying existing businesses. Now it's your turn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button 
                  size="lg" 
                  onClick={scrollToForm}
                  className="bg-white hover:bg-white/90 text-[#1e3a5f] font-bold text-lg px-10 py-7 shadow-2xl"
                >
                  📩 Get Your Business Matches
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1e3a5f] font-semibold"
                >
                  📘 Free Buyer's Guide
                </Button>
              </div>
            </div>
          </div>
        </section>
      </LazySection>
    </div>
  );
};

export default BuyEstablishedBusinessLanding;
