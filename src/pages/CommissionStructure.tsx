import { CheckCircle, TrendingUp, Calculator, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CommissionStructure = () => {
  const commissionTiers = [
    {
      name: "New Agent",
      split: "60/40",
      requirements: "0 - 12 months experience",
      features: ["Full marketing support", "Lead generation assistance", "Dedicated mentor", "Training programs"]
    },
    {
      name: "Professional",
      split: "70/30", 
      requirements: "1+ years experience",
      features: ["Advanced marketing tools", "Priority lead access", "Business coaching", "Team collaboration"]
    },
    {
      name: "Elite",
      split: "80/20",
      requirements: "$2M+ annual volume",
      features: ["Premium brand support", "Executive assistance", "Global network access", "Custom marketing"]
    },
    {
      name: "Top Producer",
      split: "90/10",
      requirements: "$5M+ annual volume",
      features: ["Maximum earning potential", "Personal brand development", "Strategic partnerships", "Exclusive opportunities"]
    }
  ];

  const additionalBenefits = [
    "No desk fees or monthly charges",
    "100% referral fee retention",
    "International transaction support", 
    "Professional photography included",
    "Marketing materials provided",
    "Technology platform access"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground">Transparent & Fair</Badge>
            <h1 className="text-4xl md:text-5xl font-clash font-bold mb-6">
              Commission Structure
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Clear, competitive commission splits that grow with your success. No hidden fees, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Commission Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Choose Your Path</h2>
            <p className="text-lg text-muted-foreground">
              Our commission structure is designed to reward your growth and success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commissionTiers.map((tier) => (
              <Card key={tier.name} className="relative">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg mb-2">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold text-accent mb-2">{tier.split}</div>
                  <p className="text-sm text-muted-foreground">{tier.requirements}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-clash font-bold text-primary mb-6">Additional Benefits</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Beyond competitive commissions, we provide comprehensive support to help you succeed.
              </p>
              
              <div className="space-y-4">
                {additionalBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Performance Bonuses</h3>
                  <p className="text-sm text-muted-foreground">Extra rewards for top performers</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Calculator className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No Hidden Fees</h3>
                  <p className="text-sm text-muted-foreground">Transparent fee structure</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Team Support</h3>
                  <p className="text-sm text-muted-foreground">Collaborative work environment</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Badge className="w-8 h-8 bg-accent text-accent-foreground mx-auto mb-4 flex items-center justify-center">$</Badge>
                  <h3 className="font-semibold mb-2">Fast Payouts</h3>
                  <p className="text-sm text-muted-foreground">Quick commission processing</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-clash font-bold text-primary mb-6">Ready to Maximize Your Earnings?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join a brokerage that invests in your success with industry-leading commission structures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Apply Now
            </Button>
            <Button size="lg" variant="outline">
              Calculate Earnings
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommissionStructure;