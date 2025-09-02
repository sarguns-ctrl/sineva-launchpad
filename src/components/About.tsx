import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Award, Globe } from "lucide-react";

const About = () => {
  const stats = [
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "3", label: "Countries", icon: Globe },
    { number: "500+", label: "Agents Worldwide", icon: Users },
    { number: "50+", label: "Cities Served", icon: MapPin }
  ];

  const teamMembers = [
    {
      name: "Carlos Sineva",
      role: "Founder & CEO",
      description: "Visionary leader with 20+ years in international real estate",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Maria Rodriguez", 
      role: "VP of Operations",
      description: "Expert in cross-border transactions and business acquisitions",
      image: "/api/placeholder/300/300"
    },
    {
      name: "James Thompson",
      role: "Head of Agent Development", 
      description: "Specialist in agent training and commission optimization",
      image: "/api/placeholder/300/300"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
            ABOUT SINEVA BROKERAGE
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Powered by Grupo Sineva
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A world-class real estate brokerage with international reach, 
            connecting opportunities across North America and Latin America.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-card transition-shadow duration-300">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">Our Mission</h3>
            <p className="text-xl leading-relaxed text-white/90">
              To revolutionize real estate by creating seamless connections between 
              buyers, sellers, and investors across international markets. We combine 
              cutting-edge technology with personalized service to deliver exceptional 
              results for our clients and unparalleled opportunities for our agents.
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Leadership Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="pt-6">
                  <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-1">{member.name}</h4>
                  <div className="text-primary font-medium mb-3">{member.role}</div>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Global Presence */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            Global Presence
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold">United States</h4>
              <p className="text-muted-foreground">
                Major markets including Texas, California, Florida, and New York
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold">Canada</h4>
              <p className="text-muted-foreground">
                Serving Toronto, Vancouver, Montreal, and other key cities
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold">Latin America</h4>
              <p className="text-muted-foreground">
                Mexico, Colombia, Brazil, and other emerging markets
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;