import { Briefcase, Users, Award, TrendingUp, Heart, Globe, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Real Estate Agent",
      department: "Sales",
      location: "Houston, TX",
      type: "Full-time",
      experience: "3+ years",
      description: "Experienced agent to join our growing Houston office with luxury market focus."
    },
    {
      title: "Property Marketing Specialist",
      department: "Marketing", 
      location: "Miami, FL",
      type: "Full-time",
      experience: "2+ years",
      description: "Digital marketing expert to enhance our property promotion strategies."
    },
    {
      title: "International Relations Coordinator",
      department: "Operations",
      location: "Mexico City, MX",
      type: "Full-time", 
      experience: "1+ years",
      description: "Coordinate cross-border transactions and international client relationships."
    },
    {
      title: "Business Development Manager",
      department: "Business Development",
      location: "Toronto, CA",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead expansion efforts and strategic partnerships in Canadian markets."
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Competitive Compensation",
      description: "Industry-leading commission structure with performance bonuses"
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: Award,
      title: "Professional Development",
      description: "Continuous training and certification opportunities"
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Work across multiple markets and international locations"
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative environment with supportive team members"
    },
    {
      icon: Briefcase,
      title: "Work-Life Balance",
      description: "Flexible schedules and remote work options available"
    }
  ];

  const values = [
    {
      title: "Excellence",
      description: "We strive for the highest standards in everything we do"
    },
    {
      title: "Innovation",
      description: "We embrace new technologies and creative solutions"
    },
    {
      title: "Integrity",
      description: "We conduct business with honesty and transparency"
    },
    {
      title: "Collaboration",
      description: "We achieve more when we work together as a team"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground">Join Our Team</Badge>
            <h1 className="text-4xl md:text-5xl font-clash font-bold mb-6">
              Build Your Career With Us
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Join a dynamic team that's reshaping real estate across the Americas. Grow your career in an environment that values innovation, excellence, and collaboration.
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              View Open Positions
            </Button>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do and shape our company culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg text-accent">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Why Work With Us?</h2>
            <p className="text-lg text-muted-foreground">
              We invest in our people with competitive benefits and growth opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardHeader>
                  <benefit.icon className="w-8 h-8 text-accent mb-4" />
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

      {/* Open Positions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Open Positions</h2>
            <p className="text-lg text-muted-foreground">
              Find your next opportunity with our growing team.
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position) => (
              <Card key={position.title}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-primary">{position.title}</h3>
                        <Badge variant="outline">{position.type}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>📍 {position.location}</span>
                        <span>🏢 {position.department}</span>
                        <span>⏱️ {position.experience}</span>
                      </div>
                      
                      <p className="text-muted-foreground">{position.description}</p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Don't see a position that fits? We're always looking for talented individuals.
            </p>
            <Button variant="outline">
              Submit General Application
            </Button>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Application Process</h2>
            <p className="text-lg text-muted-foreground">
              Our streamlined process designed to find the right fit for both you and our team.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Apply Online", description: "Submit your application and resume through our portal" },
              { step: "2", title: "Initial Review", description: "Our HR team reviews your qualifications and experience" },
              { step: "3", title: "Interview Process", description: "Meet with hiring managers and team members" },
              { step: "4", title: "Welcome Aboard", description: "Complete onboarding and start your journey with us" }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-clash font-bold text-primary mb-6">Ready to Join Our Team?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Take the next step in your career with a company that values growth, innovation, and success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Browse All Positions
            </Button>
            <Button size="lg" variant="outline">
              Learn About Our Culture
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;