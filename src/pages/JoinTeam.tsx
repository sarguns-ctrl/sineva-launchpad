import { Mail, Phone, Users, TrendingUp, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const JoinTeam = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Competitive Commission Structure",
      description: "Industry-leading commission splits with transparent fee structure"
    },
    {
      icon: Award,
      title: "Professional Development",
      description: "Continuous training and certification programs"
    },
    {
      icon: Globe,
      title: "International Network",
      description: "Access to global client base and property portfolio"
    },
    {
      icon: Users,
      title: "Team Support",
      description: "Collaborative environment with experienced mentors"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground">Now Hiring</Badge>
            <h1 className="text-4xl md:text-5xl font-clash font-bold mb-6">
              Join Our Elite Team
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Be part of an award-winning brokerage that's redefining real estate across North America and Latin America.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Why Choose Sineva?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a team that values excellence, innovation, and your professional growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardHeader>
                  <benefit.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Application Process</h2>
            <p className="text-lg text-muted-foreground">Simple steps to join our team</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Submit Application", description: "Complete our online application form" },
              { step: "2", title: "Interview Process", description: "Meet with our team leaders and discuss your goals" },
              { step: "3", title: "Onboarding", description: "Complete training and start your successful career" }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-clash font-bold text-primary mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Contact our recruitment team to learn more about opportunities at Sineva Brokerage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
            <Button size="lg" variant="outline">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinTeam;