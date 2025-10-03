import { MapPin, Users, Building2, Globe2, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const GlobalPresence = () => {
  const regions = [
    {
      name: "North America",
      countries: ["United States", "Canada"],
      offices: [
        {
          city: "Houston",
          country: "USA",
          address: "5718 Westheimer Rd, Suite 1000",
          phone: "+1 (832) 289-6124",
          email: "contact@sinevagrupo.com",
          agents: 45,
          isHeadquarters: true
        },
        {
          city: "Miami",
          country: "USA", 
          address: "1450 Brickell Ave, Suite 1200",
          phone: "+1 (305) 555-0124",
          email: "miami@sinevabrokeragre.com",
          agents: 32
        },
        {
          city: "Toronto",
          country: "Canada",
          address: "100 King St W, Suite 600",
          phone: "+1 (416) 555-0125",
          email: "toronto@sinevabrokeragre.com",
          agents: 28
        }
      ]
    },
    {
      name: "Latin America",
      countries: ["Mexico", "Colombia", "Brazil", "Argentina"],
      offices: [
        {
          city: "Mexico City",
          country: "Mexico",
          address: "Av. Paseo de la Reforma 250, Col. Juárez",
          phone: "+52 (55) 555-0126",
          email: "mexicocity@sinevabrokeragre.com",
          agents: 38
        },
        {
          city: "Bogotá",
          country: "Colombia",
          address: "Carrera 13 # 93-40, Piso 15",
          phone: "+57 (1) 555-0127",
          email: "bogota@sinevabrokeragre.com",
          agents: 25
        },
        {
          city: "São Paulo",
          country: "Brazil",
          address: "Av. Paulista 1374, 12º andar",
          phone: "+55 (11) 555-0128",
          email: "saopaulo@sinevabrokeragre.com",
          agents: 42
        },
        {
          city: "Buenos Aires",
          country: "Argentina",
          address: "Av. Corrientes 456, Piso 8",
          phone: "+54 (11) 555-0129",
          email: "buenosaires@sinevabrokeragre.com",
          agents: 31
        }
      ]
    }
  ];

  const stats = [
    { label: "Countries", value: "6", icon: Globe2 },
    { label: "Cities", value: "7", icon: MapPin },
    { label: "Offices", value: "7", icon: Building2 },
    { label: "Agents", value: "241", icon: Users }
  ];

  const services = [
    "International property investment",
    "Cross-border transaction management",
    "Multi-currency transaction support",
    "Local market expertise",
    "Relocation services",
    "Property management coordination"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground">Global Network</Badge>
            <h1 className="text-4xl md:text-5xl font-clash font-bold mb-6">
              Our Global Presence
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Connecting real estate opportunities across North America and Latin America with local expertise and global reach.
            </p>
          </div>
        </div>
      </section>

      {/* Global Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Regional Offices */}
          <div className="space-y-12">
            {regions.map((region) => (
              <div key={region.name}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-clash font-bold text-primary mb-4">{region.name}</h2>
                  <p className="text-lg text-muted-foreground">
                    Serving {region.countries.join(", ")}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {region.offices.map((office) => (
                    <Card key={`${office.city}-${office.country}`} className="relative">
                      {office.isHeadquarters && (
                        <div className="absolute -top-2 -right-2">
                          <Badge className="bg-accent text-accent-foreground">HQ</Badge>
                        </div>
                      )}
                      
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <MapPin className="w-5 h-5 text-accent mr-2" />
                          {office.city}, {office.country}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">{office.address}</p>
                          </div>
                          
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 text-accent mr-2" />
                            <span>{office.phone}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-accent mr-2" />
                            <span className="text-xs">{office.email}</span>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 text-accent mr-1" />
                              <span className="text-xs">{office.agents} Agents</span>
                            </div>
                            <Button size="sm" variant="outline">
                              Contact
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-clash font-bold text-primary mb-6">
                International Real Estate Services
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our global network enables seamless cross-border transactions and comprehensive international real estate services.
              </p>
              
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service} className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-secondary rounded-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">Need International Support?</h3>
              <p className="text-muted-foreground mb-6">
                Connect with our international team for cross-border transactions and global property investments.
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Contact International Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Expansion Plans */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-clash font-bold text-primary mb-6">
            Expanding Our Reach
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're continuously growing our network to better serve clients across the Americas. 
            New offices opening in Chile, Peru, and Costa Rica in 2024.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Partnership Opportunities
            </Button>
            <Button size="lg" variant="outline">
              Office Locations Map
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalPresence;