import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square, DollarSign } from "lucide-react";

const PropertyShowcase = () => {
  const featuredProperties = [
    {
      id: 1,
      title: "Executive Business Complex",
      location: "Downtown Houston, TX",
      price: "$2,850,000",
      type: "Commercial",
      size: "12,500 sq ft",
      image: "/api/placeholder/400/250",
      features: ["Prime location", "Modern amenities", "Parking included"],
      badge: "Featured"
    },
    {
      id: 2,
      title: "Luxury Residential Estate",
      location: "River Oaks, Houston, TX",
      price: "$1,250,000",
      type: "Residential",
      beds: 5,
      baths: 4,
      size: "4,200 sq ft",
      image: "/api/placeholder/400/250",
      features: ["Gated community", "Pool & spa", "Premium finishes"],
      badge: "New Listing"
    },
    {
      id: 3,
      title: "Tech Startup Headquarters",
      location: "Austin, TX",
      price: "$1,750,000",
      type: "Business",
      employees: "50-75",
      revenue: "$2M+",
      image: "/api/placeholder/400/250",
      features: ["Established client base", "Growth potential", "Modern tech stack"],
      badge: "Hot Deal"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
            Featured Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover premium properties and businesses carefully selected for our 
            international clients seeking investment and immigration opportunities.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-elegant transition-all duration-500 border-0 shadow-card overflow-hidden">
              {/* Property Image */}
              <div className="relative h-64 bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-20"></div>
                <Badge 
                  className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground font-medium"
                >
                  {property.badge}
                </Badge>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Property Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {property.type}
                    </Badge>
                    <span className="text-2xl font-bold text-primary font-playfair">
                      {property.price}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {property.beds && (
                    <div className="flex items-center space-x-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.beds} bed</span>
                    </div>
                  )}
                  {property.baths && (
                    <div className="flex items-center space-x-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.baths} bath</span>
                    </div>
                  )}
                  {property.size && (
                    <div className="flex items-center space-x-1">
                      <Square className="h-4 w-4" />
                      <span>{property.size}</span>
                    </div>
                  )}
                  {property.employees && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{property.revenue}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <ul className="space-y-1">
                    {property.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full shadow-button hover:shadow-elegant transition-all duration-300"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Properties CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center space-y-4">
            <p className="text-muted-foreground">
              Explore our complete portfolio of investment opportunities
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-button"
            >
              Browse All Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowcase;