import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { useAgents } from "@/hooks/useAgents";
import SEOHead from "@/components/SEOHead";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Users, 
  Award,
  TrendingUp,
  Search,
  Filter
} from "lucide-react";

// US states for filtering
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  // Filter agents based on search criteria
  const searchFilters = useMemo(() => ({
    search: searchTerm,
    specialization: selectedSpecialization,
    active: true
  }), [searchTerm, selectedSpecialization]);

  const { agents, loading, error } = useAgents(searchFilters);

  // Filter agents by state (since we don't have state in employee_profiles, we'll mock this)
  const filteredAgents = useMemo(() => {
    let filtered = agents;
    
    if (selectedState) {
      // For now, we'll use the agent's location from mock data
      // In production, you'd add a location/state field to employee_profiles
      filtered = filtered.filter(agent => 
        // Mock filtering - in real implementation, check agent.state or similar field
        true // Return all agents for now
      );
    }
    
    return filtered;
  }, [agents, selectedState]);

  const specializations = [
    "Residential Sales",
    "Commercial Properties", 
    "International Clients",
    "Investment Properties",
    "Luxury Homes",
    "First-Time Buyers",
    "Business Brokerage"
  ];

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Find a Real Estate Agent | Expert Agents Across the US"
        description="Find experienced real estate agents in your area. Search by location, specialization, and expertise to find the perfect agent for your needs."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium">
              FIND AN AGENT
            </Badge>
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair leading-tight">
                Find Your Perfect Real Estate Agent
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Connect with experienced agents across the United States. Search by location, 
                specialization, and expertise to find the right agent for your real estate needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <section className="py-12 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search by Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Search by Name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Agent name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* State Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">State</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Specialization Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Specialization</label>
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Specializations</SelectItem>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedState("");
                    setSelectedSpecialization("");
                  }}
                  className="w-full"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredAgents.length}</span> agents
              {selectedState && <span> in {selectedState}</span>}
              {selectedSpecialization && <span> specializing in {selectedSpecialization}</span>}
            </p>
          </div>
        </div>
      </section>

      {/* Agent Grid */}
      <section className="pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAgents.length === 0 ? (
            <div className="text-center py-16">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No agents found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or contact us to find agents in your area.
              </p>
              <Button className="mt-4">Contact Us</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAgents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
                  <CardHeader className="text-center pb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-1">{agent.full_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{agent.position || "Real Estate Agent"}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(agent.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}`} 
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({agent.rating.toFixed(1)})</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Specializations */}
                    {agent.specializations && agent.specializations.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Specializations</h4>
                        <div className="flex flex-wrap gap-1">
                          {agent.specializations.slice(0, 2).map((spec, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                          {agent.specializations.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{agent.specializations.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-muted">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{agent.active_listings}</div>
                        <div className="text-xs text-muted-foreground">Active Listings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{agent.years_experience || 0}</div>
                        <div className="text-xs text-muted-foreground">Years Experience</div>
                      </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="flex space-x-2 pt-4">
                      <Button className="flex-1" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" className="flex-1" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>

                    {/* View Profile */}
                    <Button variant="ghost" className="w-full" size="sm">
                      View Full Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-playfair">
                Need Help Finding the Right Agent?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our team can help match you with the perfect agent based on your specific needs, 
                location, and property requirements.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground shadow-button">
                Get Agent Recommendation
              </Button>
              <Button size="lg" variant="outline">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agents;