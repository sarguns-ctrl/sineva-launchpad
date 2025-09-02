import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Award, 
  Building2, 
  Users,
  Filter,
  Globe
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

interface Agent {
  id: string;
  full_name: string;
  email: string;
  position?: string;
  department_id?: string;
  years_experience?: number;
  current_skill_level?: string;
  is_active: boolean;
  // We'll add more fields like location, phone, etc. when they're available in the database
}

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [specializationFilter, setSpecializationFilter] = useState<string>('all');

  // US States for location filtering
  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
    'Wisconsin', 'Wyoming'
  ];

  const specializations = [
    'Residential Sales',
    'Commercial Real Estate', 
    'Investment Properties',
    'International Clients',
    'Luxury Properties',
    'First-Time Buyers',
    'Relocation Services',
    'Property Management'
  ];

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('employee_profiles')
        .select('*')
        .eq('is_active', true)
        .order('full_name');

      if (error) throw error;

      setAgents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
      console.error('Error fetching agents:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (agent.position && agent.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         agent.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For now, we'll use a simple filter since location data might not be available
    // In the future, this should filter by actual location data from the database
    return matchesSearch;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getExperienceLevel = (years?: number) => {
    if (!years) return 'New Agent';
    if (years < 2) return 'Junior Agent';
    if (years < 5) return 'Experienced Agent'; 
    return 'Senior Agent';
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={fetchAgents} />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Find an Agent - Real Estate Professionals | Grupo Sineva"
        description="Connect with experienced real estate agents across the United States. Find local experts specializing in residential, commercial, and international real estate."
        keywords={["real estate agents", "find agent", "property specialists", "local agents", "real estate professionals"]}
      />
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="bg-accent/15 text-accent mb-4">
                <Users className="w-4 h-4 mr-1" />
                Find Your Agent
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 font-clash">
                Find Your Perfect Agent
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect with experienced real estate professionals in your area. Our agents specialize in helping international clients and local buyers find their dream properties.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, city, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-3 items-center">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {usStates.map(state => (
                      <SelectItem key={state} value={state.toLowerCase()}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    {specializations.map(spec => (
                      <SelectItem key={spec} value={spec.toLowerCase()}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">
                Available Agents ({filteredAgents.length})
              </h2>
              <p className="text-muted-foreground">
                Connect with our experienced real estate professionals
              </p>
            </div>

            {filteredAgents.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Agents Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or browse all agents.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                  <Card key={agent.id} className="group hover:shadow-elegant transition-all duration-300">
                    <CardHeader className="text-center pb-4">
                      <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage src="" alt={agent.full_name} />
                        <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                          {getInitials(agent.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                        {agent.full_name}
                      </CardTitle>
                      
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">
                          {agent.position || 'Real Estate Agent'}
                        </Badge>
                        {agent.years_experience && (
                          <div className="text-sm text-muted-foreground">
                            {getExperienceLevel(agent.years_experience)}
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>Multiple Locations</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="truncate">{agent.email}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          International Clients
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Residential
                        </Badge>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          asChild
                        >
                          <Link to={`/agent/${agent.id}`}>
                            View Profile
                          </Link>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          asChild
                        >
                          <a href={`mailto:${agent.email}`}>
                            Contact
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Ready to Work with a Professional?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our agents are ready to help you find the perfect property or sell your current one. 
                Get personalized service from experienced professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Building2 className="w-5 h-5 mr-2" />
                  Browse Properties
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Agents;