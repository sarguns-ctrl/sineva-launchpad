import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, MapPin, TrendingUp, Shield, Users, CheckCircle2, Building2, Store, Smartphone, Scissors, UtensilsCrossed, Fuel } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/texas-business-hero.jpg";
import logoImage from "@/assets/logo-sineva-grupo.svg";
import laundromatImage from "@/assets/laundromat-business-interior.jpg";
import salonImage from "@/assets/salon-spa-interior.jpg";
import mobileStoreImage from "@/assets/mobile-store-interior.jpg";
import gasStationImage from "@/assets/gas-station-convenience.jpg";
import restaurantImage from "@/assets/restaurant-modern.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BuyTexasBusiness = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessType: "",
    investmentBudget: "",
    agreeToContact: false,
  });

  const { elementRef: heroRef } = useScrollAnimation();
  const { elementRef: whyChooseRef } = useScrollAnimation();
  const { elementRef: processRef } = useScrollAnimation();
  const { elementRef: successRef } = useScrollAnimation();
  const { elementRef: investmentRef } = useScrollAnimation();
  const { elementRef: aboutRef } = useScrollAnimation();
  const { elementRef: faqRef } = useScrollAnimation();
  const { elementRef: formRef } = useScrollAnimation();
  const { elementRef: finalCtaRef } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <SEOHead
        title="Buy a Proven Texas Business | Laundromat, Gas Station, Restaurant & More"
        description="Discover profitable, ready-to-operate businesses across Texas. From small retail shops to established gas stations — Sinevabrokerage helps entrepreneurs buy with confidence."
        keywords={["buy business Texas", "Texas business for sale", "laundromat for sale", "gas station for sale", "restaurant for sale Texas", "business opportunities Texas"]}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(13, 35, 75, 0.85), rgba(13, 35, 75, 0.85)), url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 relative z-10">
            {/* Logo */}
            <div className="flex justify-center mb-8 md:mb-12">
              <img 
                src={logoImage} 
                alt="Sinevabrokerage Logo" 
                className="h-16 sm:h-20 md:h-24 w-auto"
              />
            </div>
            
            {/* Hero Content */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 animate-fade-in px-4">
                Own a Proven Texas Business
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-3 sm:mb-4 max-w-5xl mx-auto px-4">
                Laundromat, Convenience Store, Gas Station, Restaurant & More
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Discover profitable, ready-to-operate businesses across Texas. From small retail shops to established gas stations — Sinevabrokerage helps entrepreneurs buy with confidence, speed, and complete guidance.
              </p>
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 hover-scale">
                📩 Get Access to Available Businesses
              </Button>
            </div>
          </div>
        </section>

        {/* Section 1 - Why Choose Sinevabrokerage */}
        <section ref={whyChooseRef} className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
                Buy a Stable, Cash-Flowing Business — Not Just a Dream
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto px-4">
                Buying a business is one of the smartest ways to enter or expand in the U.S. market — especially in Texas, where everyday-service businesses thrive. At Sinevabrokerage, we connect you directly with verified owners ready to sell.
              </p>
            </div>

            {/* Business Types Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <Card className="group hover:shadow-2xl transition-all duration-300 hover-scale">
                <CardHeader>
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img src={laundromatImage} alt="Laundromats" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Laundromats & Wash Centers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Turnkey operations with steady income</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 hover-scale">
                <CardHeader>
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img src={gasStationImage} alt="Gas Stations" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <Fuel className="w-5 h-5 text-primary" />
                    Convenience Stores & Gas Stations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">High-traffic, recession-resistant assets</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 hover-scale">
                <CardHeader>
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img src={mobileStoreImage} alt="Mobile Stores" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    Mobile & Electronics Shops
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Consistent margins, easy-to-train staff</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 hover-scale">
                <CardHeader>
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img src={salonImage} alt="Salons" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-primary" />
                    Salons & Spas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Service-based businesses with loyal clientele</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 hover-scale">
                <CardHeader>
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img src={restaurantImage} alt="Restaurants" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-primary" />
                    Restaurants & Cafés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">From quick-service to dine-in concepts</p>
                </CardContent>
              </Card>
            </div>

            {/* Why Buyers Trust Us */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 md:p-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">Why Buyers Trust Us</h3>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Off-market listings & verified financials</h4>
                    <p className="text-muted-foreground">Access exclusive opportunities not available publicly</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Full due diligence & valuation support</h4>
                    <p className="text-muted-foreground">Professional analysis of every opportunity</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">SBA financing & investor introductions</h4>
                    <p className="text-muted-foreground">Connect with lenders who understand business acquisitions</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">100% confidentiality & personalized advisory</h4>
                    <p className="text-muted-foreground">Your information and interests are protected</p>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6 sm:mt-8">
                <Button size="lg" className="hover-scale w-full sm:w-auto">
                  📩 Request Business Listings
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - The Buyer Process */}
        <section ref={processRef} className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
                From Search to Ownership — We Handle Every Step
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              {[
                {
                  step: "1",
                  title: "Tell Us What You're Looking For",
                  description: "Complete a short form with your goals, budget, and preferred business type."
                },
                {
                  step: "2",
                  title: "Receive Tailored Opportunities",
                  description: "Get access to verified listings that match your profile — many never seen online."
                },
                {
                  step: "3",
                  title: "Evaluate & Visit Businesses",
                  description: "Review financials, visit locations, and meet owners (confidentially)."
                },
                {
                  step: "4",
                  title: "Negotiate & Close",
                  description: "We help you make strong offers, handle contracts, and secure financing."
                },
                {
                  step: "5",
                  title: "Transition Support",
                  description: "Our team ensures a smooth handover so you can start operating from day one."
                }
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground ml-16">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" className="hover-scale w-full sm:w-auto">
                📞 Request Access to Listings
              </Button>
            </div>
          </div>
        </section>

        {/* Section 3 - Success Stories */}
        <section ref={successRef} className="py-12 sm:py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">Success Stories from Real Buyers</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-8 sm:mb-12">
              <Card className="hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <p className="text-lg mb-4 italic">
                    "I wanted a simple business that would let me manage operations and earn stable income. Sinevabrokerage connected me to a laundromat in Houston that's now running profitably. Their process was professional and honest."
                  </p>
                  <p className="font-semibold">— Farhan A., Houston</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <p className="text-lg mb-4 italic">
                    "They helped me buy a gas station in Dallas and walked me through SBA financing. I didn't know where to start, but they made it easy."
                  </p>
                  <p className="font-semibold">— Jessica M., Dallas</p>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 md:p-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">📊 Results You Can Trust</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">200+</div>
                  <p className="text-sm sm:text-base text-muted-foreground">Successful Transactions</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">$75M+</div>
                  <p className="text-sm sm:text-base text-muted-foreground">Total Deal Volume</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">20+</div>
                  <p className="text-sm sm:text-base text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">BBB</div>
                  <p className="text-sm sm:text-base text-muted-foreground">Accredited Brokerage</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 - Why Everyday Businesses */}
        <section ref={investmentRef} className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
                Why Everyday Businesses Are Smart Investments
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
                These Business Types Work — Because People Always Need Them
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mb-6 sm:mb-8">
              {[
                { icon: Building2, title: "Laundromats", description: "Steady, passive income with minimal staff" },
                { icon: Fuel, title: "Convenience Stores & Gas Stations", description: "Daily cash flow, loyal customer base" },
                { icon: Scissors, title: "Salons & Spas", description: "High repeat clientele, quick ROI" },
                { icon: UtensilsCrossed, title: "Restaurants & Cafés", description: "Proven models, strong brand opportunities" },
                { icon: Smartphone, title: "Mobile & Electronics Stores", description: "Stable margins and scalable operations" }
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover-scale">
                  <CardHeader>
                    <item.icon className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-4 sm:p-6 max-w-4xl mx-auto mb-6 sm:mb-8">
              <p className="text-base sm:text-lg">
                🔥 Most of these businesses are owner-absentee or semi-managed — perfect for investors or immigrants starting in the U.S.
              </p>
            </div>

            <div className="text-center">
              <Button size="lg" className="hover-scale w-full sm:w-auto">
                📩 Access Verified Texas Listings
              </Button>
            </div>
          </div>
        </section>

        {/* Section 5 - About Sinevabrokerage */}
        <section ref={aboutRef} className="py-12 sm:py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
                Your Local Texas Business Brokerage Experts
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 px-4">
                Sinevabrokerage is a professional brokerage firm that helps entrepreneurs buy and sell established businesses across Texas. We specialize in connecting buyers with verified listings that offer solid cash flow, proven operations, and long-term stability.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {[
                  { icon: Shield, title: "Licensed Texas Brokerage" },
                  { icon: Users, title: "IBBA Member" },
                  { icon: TrendingUp, title: "$75M+ in Transactions" },
                  { icon: MapPin, title: "Dallas, Houston & Austin Offices" },
                  { icon: CheckCircle2, title: "Local Agents" },
                  { icon: Phone, title: "Dedicated Support" }
                ].map((item, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 hover-scale">
                    <CardContent className="pt-6 text-center">
                      <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="font-semibold">{item.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button size="lg" className="hover-scale w-full sm:w-auto">
                📞 Talk to a Texas Broker Today
              </Button>
            </div>
          </div>
        </section>

        {/* Section 6 - FAQ */}
        <section ref={faqRef} className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    What's the minimum investment to buy a business?
                  </AccordionTrigger>
                  <AccordionContent>
                    Most buyers start between $100K–$1M, depending on the type of business and location. We work with buyers at all investment levels and can help you find opportunities that match your budget.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Do you help international buyers?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes! We specialize in assisting foreign investors (E2, L1A, EB5 visas) looking to purchase U.S. businesses. Our team understands visa requirements and can guide you through the process.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Are the listings verified?
                  </AccordionTrigger>
                  <AccordionContent>
                    Every listing is reviewed by our brokers for financial and operational accuracy. We conduct thorough due diligence to ensure you have reliable information before making a decision.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Do you help with financing?
                  </AccordionTrigger>
                  <AccordionContent>
                    Absolutely. We partner with SBA lenders and private investors who fund small business acquisitions. We can introduce you to financing options that fit your situation.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Will the seller train me?
                  </AccordionTrigger>
                  <AccordionContent>
                    Most of our listings include post-sale transition support for 2–4 weeks. The seller typically provides training to ensure you understand the operations and can succeed.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Section 7 - Lead Form */}
        <section ref={formRef} className="py-12 sm:py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4">
                  Get Instant Access to Verified Texas Businesses
                </h2>
                <p className="text-base sm:text-lg text-primary-foreground/90 px-4">
                  Complete this form to receive handpicked opportunities in your preferred industries and cities.
                </p>
              </div>

              <Card className="bg-card text-card-foreground">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
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
                        placeholder="john@example.com"
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
                        placeholder="(555) 123-4567"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                      >
                        <SelectTrigger className="mt-2 bg-background">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent className="bg-background z-50">
                          <SelectItem value="laundromat">Laundromat</SelectItem>
                          <SelectItem value="gas-station">Gas Station</SelectItem>
                          <SelectItem value="convenience-store">Convenience Store</SelectItem>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="salon">Salon</SelectItem>
                          <SelectItem value="spa">Spa</SelectItem>
                          <SelectItem value="mobile-store">Mobile Store</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="investmentBudget">Investment Budget *</Label>
                      <Select
                        value={formData.investmentBudget}
                        onValueChange={(value) => setFormData({ ...formData, investmentBudget: value })}
                      >
                        <SelectTrigger className="mt-2 bg-background">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent className="bg-background z-50">
                          <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                          <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                          <SelectItem value="500k-plus">$500K+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToContact"
                        checked={formData.agreeToContact}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, agreeToContact: checked as boolean })
                        }
                      />
                      <Label htmlFor="agreeToContact" className="text-sm leading-tight cursor-pointer">
                        I agree to be contacted by Sinevabrokerage (Privacy Policy)
                      </Label>
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                      ✅ Send Me Business Listings
                    </Button>

                    <p className="text-sm text-center text-muted-foreground">
                      🔒 100% confidential. Your information will never be shared.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 8 - Final CTA */}
        <section ref={finalCtaRef} className="py-12 sm:py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
              Start Your Texas Business Ownership Journey Today
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Join hundreds of buyers who found success through Sinevabrokerage. Whether you want to manage your business or invest for income, we'll help you find the right fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 hover-scale w-full sm:w-auto">
                📩 Get Access to Listings Now
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 hover-scale w-full sm:w-auto">
                📘 Download "The Texas Small Business Buyer's Guide"
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BuyTexasBusiness;