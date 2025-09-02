import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Flag, DollarSign, FileText, CheckCircle, ArrowRight, Users, TrendingUp } from "lucide-react";

const InternationalServices = () => {
  const services = [
    {
      icon: Flag,
      title: "US Market Access",
      description: "Navigate the US real estate market with expert guidance for international buyers",
      features: ["Market analysis", "Legal compliance", "Tax optimization", "Financing solutions"]
    },
    {
      icon: Globe,
      title: "Canadian Properties",
      description: "Access premium Canadian real estate markets from coast to coast",
      features: ["Provincial expertise", "Immigration pathways", "Investment programs", "Tax benefits"]
    },
    {
      icon: TrendingUp,
      title: "Latin America Expansion",
      description: "Strategic property investments across emerging Latin American markets",
      features: ["Market research", "Local partnerships", "Growth opportunities", "Currency hedging"]
    },
    {
      icon: DollarSign,
      title: "Currency Guidance",
      description: "Expert advice on currency exchange and international fund transfers",
      features: ["Exchange strategies", "Transfer optimization", "Risk management", "Timing advice"]
    }
  ];

  const countries = [
    { name: "United States", markets: "15+ Cities", deals: "500+" },
    { name: "Canada", markets: "8+ Cities", deals: "200+" },
    { name: "Mexico", markets: "5+ Cities", deals: "150+" },
    { name: "Colombia", markets: "3+ Cities", deals: "75+" },
    { name: "Costa Rica", markets: "2+ Cities", deals: "50+" },
    { name: "Panama", markets: "2+ Cities", deals: "40+" }
  ];

  const benefits = [
    "Cross-border transaction expertise spanning multiple jurisdictions",
    "Local market knowledge backed by international perspective", 
    "Currency and regulatory risk mitigation strategies",
    "End-to-end support from initial inquiry to closing",
    "Ongoing property management and investment optimization"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold font-playfair">
              International Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Cross-border transactions and international property investments. 
              Expert guidance for global investors expanding their real estate portfolios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Explore Markets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                International Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Cross-Border Real Estate Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive international real estate services designed for global investors and businesses expanding across borders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span className="text-card-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Coverage */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Global Market Coverage
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We operate across key international markets with local expertise and global perspective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-6">
                  <Flag className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-foreground mb-4">{country.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Markets:</span>
                      <span className="font-semibold">{country.markets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completed Deals:</span>
                      <span className="font-semibold text-accent">{country.deals}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose International Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
                Why Choose Our International Expertise?
              </h2>
              <p className="text-xl text-muted-foreground">
                With decades of experience in cross-border transactions, we understand the complexities 
                of international real estate investment and provide comprehensive support every step of the way.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-primary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">International Success Metrics</h3>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">$500M+</div>
                  <div className="text-white/80">Cross-Border Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">25+</div>
                  <div className="text-white/80">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">1,000+</div>
                  <div className="text-white/80">International Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">98%</div>
                  <div className="text-white/80">Client Satisfaction</div>
                </div>
              </div>
              <Button className="w-full bg-white text-primary hover:bg-white/90">
                Request Market Analysis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Our International Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A streamlined approach to international real estate investment that minimizes complexity and maximizes results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Market Analysis", desc: "Comprehensive market research and opportunity identification" },
              { step: "02", title: "Legal Framework", desc: "Navigate regulations, tax implications, and compliance requirements" },
              { step: "03", title: "Transaction Support", desc: "End-to-end deal management with local and international expertise" },
              { step: "04", title: "Ongoing Management", desc: "Continued support for property management and portfolio optimization" }
            ].map((item, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair mb-6">
            Ready to Expand Internationally?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let our international real estate experts help you navigate cross-border investments and expand your portfolio globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-button hover:scale-105 transition-all duration-300">
              Explore Markets
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary hover:bg-primary hover:text-primary-foreground">
              Schedule International Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternationalServices;