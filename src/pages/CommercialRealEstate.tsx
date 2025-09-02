import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, MapPin, TrendingUp, Users, CheckCircle, ArrowRight } from "lucide-react";

const CommercialRealEstate = () => {
  const propertyTypes = [
    {
      icon: Building,
      title: "Office Buildings",
      description: "Class A and B office spaces in prime locations",
      features: ["Downtown locations", "Modern amenities", "Flexible layouts", "Parking available"]
    },
    {
      icon: MapPin,
      title: "Retail Spaces",
      description: "High-traffic retail locations for maximum exposure",
      features: ["Street-level access", "High foot traffic", "Flexible terms", "Marketing support"]
    },
    {
      icon: TrendingUp,
      title: "Industrial Properties",
      description: "Warehouses and manufacturing facilities",
      features: ["Large spaces", "Loading docks", "Strategic locations", "Scalable options"]
    },
    {
      icon: Users,
      title: "Mixed-Use Developments",
      description: "Combined residential and commercial opportunities",
      features: ["Diversified income", "Prime locations", "Growth potential", "Full-service management"]
    }
  ];

  const benefits = [
    "Professional market analysis and property valuation",
    "Comprehensive due diligence and legal support", 
    "Financing assistance and investment structuring",
    "Property management and tenant relations",
    "Exit strategy planning and portfolio optimization"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold font-playfair">
              Commercial Real Estate
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Premium commercial properties for investment, development, and business operations. 
              Expert guidance for domestic and international investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                View Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Commercial Property Types
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From office buildings to industrial facilities, we specialize in all types of commercial real estate investments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {propertyTypes.map((type, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <type.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                    {type.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
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

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
                Why Choose Our Commercial Services?
              </h2>
              <p className="text-xl text-muted-foreground">
                We provide comprehensive commercial real estate services backed by decades of experience 
                and deep market knowledge across multiple international markets.
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
              <h3 className="text-2xl font-bold mb-4">Investment Analysis</h3>
              <p className="text-white/90 mb-6">
                Get detailed financial projections, market analysis, and ROI calculations for every property investment opportunity.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">$2.5B+</div>
                  <div className="text-white/80">Properties Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">15%</div>
                  <div className="text-white/80">Avg. ROI</div>
                </div>
              </div>
              <Button className="w-full bg-white text-primary hover:bg-white/90">
                Request Analysis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair mb-6">
            Ready to Invest in Commercial Real Estate?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let our experts help you find the perfect commercial property for your investment goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-button hover:scale-105 transition-all duration-300">
              Browse Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary hover:bg-primary hover:text-primary-foreground">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommercialRealEstate;