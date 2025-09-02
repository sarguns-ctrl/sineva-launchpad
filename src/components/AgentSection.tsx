import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, DollarSign, Globe, Zap, Users, Award } from "lucide-react";

const AgentSection = () => {
  const commissionStructures = [
    {
      title: "Self-Generated Leads",
      percentage: "95%",
      description: "Keep 95% when you bring your own clients",
      icon: Users,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Company Leads",
      percentage: "70%",
      description: "70% commission on Sineva marketing leads",
      icon: Zap,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Sineva Advantage",
      percentage: "60% + Benefits",
      description: "60% plus guaranteed income & concierge bonuses",
      icon: Award,
      color: "bg-purple-100 text-purple-700"
    }
  ];

  const agentBenefits = [
    "Personalized professional website",
    "Comprehensive marketing support",
    "Exclusive listing showcase platform",
    "International client referrals",
    "Minimum income guarantee",
    "Concierge service commissions",
    "Advanced CRM and tools",
    "Ongoing training & certification"
  ];

  const packages = [
    {
      name: "Starter",
      price: "$299/month",
      description: "Perfect for new agents",
      features: ["Basic website", "Marketing templates", "CRM access", "Lead management"]
    },
    {
      name: "Professional",
      price: "$599/month", 
      description: "For established agents",
      features: ["Custom website", "Advanced marketing", "Priority leads", "Analytics dashboard", "International referrals"]
    },
    {
      name: "Elite",
      price: "$999/month",
      description: "Top-tier agent experience",
      features: ["Premium website", "Full marketing suite", "Guaranteed income", "Concierge bonuses", "Executive support", "Global network access"]
    }
  ];

  return (
    <section id="agents" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-accent text-accent-foreground px-4 py-2 text-sm font-medium">
            FOR REAL ESTATE AGENTS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Join the Sineva Advantage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get your personalized website, marketing support, exclusive listings showcase, 
            and industry-leading commission structures with guaranteed income.
          </p>
        </div>

        {/* Commission Structures */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Three Ways to Earn More
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commissionStructures.map((structure, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-full ${structure.color} flex items-center justify-center mx-auto mb-4`}>
                    <structure.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{structure.title}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{structure.percentage}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {structure.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            What You Get as a Sineva Agent
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agentBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 bg-muted/50 rounded-lg p-4">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Package Options */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Choose Your Package
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative hover:shadow-elegant transition-all duration-300 ${index === 1 ? 'border-primary shadow-lg scale-105' : ''}`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${index === 1 ? 'bg-primary' : ''}`} 
                    variant={index === 1 ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white">
            <DollarSign className="h-16 w-16 mx-auto mb-6 text-accent" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Guaranteed Income Promise
            </h3>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              With our Sineva Advantage package, we guarantee minimum monthly income 
              plus exclusive access to our international concierge service commissions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Schedule Interview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSection;