import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Phone, Mail, MessageCircle, Award, Users, Eye } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useAgents } from "@/hooks/useAgents";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import agentsHero from "@/assets/agents-collaboration.jpg";

// Static agent data demonstrating the search functionality
const staticAgents = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    location: "Miami, FL",
    specialization: "Luxury Properties",
    rating: 4.9,
    reviews: 127,
    experience: 8,
    phone: "(305) 555-0123",
    email: "sarah.j@gruposineva.com",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b2bc?w=150&h=150&fit=crop&crop=face",
    description: "Specialist in luxury residential properties in Miami-Dade and Broward counties with extensive knowledge of waterfront properties.",
    languages: ["English", "Spanish"],
    certifications: ["CRS", "GRI", "CLHMS"],
    closedDeals: 45,
    totalVolume: "$18.5M"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Commercial Real Estate Expert",
    location: "Tampa, FL", 
    specialization: "Commercial Properties",
    rating: 4.8,
    reviews: 95,
    experience: 12,
    phone: "(813) 555-0124",
    email: "michael.r@gruposineva.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    description: "Expert in office buildings, retail spaces, and commercial investments throughout Central Florida.",
    languages: ["English", "Spanish"],
    certifications: ["CCIM", "SIOR"],
    closedDeals: 38,
    totalVolume: "$25.2M"
  },
  {
    id: 3,
    name: "Emily Chen",
    title: "First-Time Buyer Specialist",
    location: "Orlando, FL",
    specialization: "Residential Properties", 
    rating: 4.7,
    reviews: 73,
    experience: 5,
    phone: "(407) 555-0125",
    email: "emily.c@gruposineva.com", 
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    description: "Dedicated to helping first-time buyers navigate the Orlando real estate market with confidence.",
    languages: ["English", "Mandarin"],
    certifications: ["ABR", "GRI"],
    closedDeals: 32,
    totalVolume: "$8.9M"
  },
  {
    id: 4,
    name: "David Thompson", 
    title: "Luxury Waterfront Specialist",
    location: "Naples, FL",
    specialization: "Luxury Properties",
    rating: 4.9,
    reviews: 156,
    experience: 15,
    phone: "(239) 555-0126",
    email: "david.t@gruposineva.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", 
    description: "Premier specialist in luxury waterfront properties throughout Southwest Florida's most exclusive communities.",
    languages: ["English"],
    certifications: ["CLHMS", "CRS"],
    closedDeals: 28,
    totalVolume: "$42.8M"
  },
  {
    id: 5,
    name: "Lisa Martinez",
    title: "Investment Property Advisor", 
    location: "Jacksonville, FL",
    specialization: "Investment Properties",
    rating: 4.6,
    reviews: 89,
    experience: 7,
    phone: "(904) 555-0127", 
    email: "lisa.m@gruposineva.com",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    description: "Helping investors build wealth through strategic real estate investments and portfolio development.",
    languages: ["English", "Spanish"],
    certifications: ["CCIM", "GRI"],
    closedDeals: 52,
    totalVolume: "$12.4M"
  },
  {
    id: 6,
    name: "Robert Wilson",
    title: "Industrial Real Estate Expert",
    location: "Tampa, FL",
    specialization: "Industrial Properties", 
    rating: 4.8,
    reviews: 112,
    experience: 18,
    phone: "(813) 555-0128",
    email: "robert.w@gruposineva.com",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    description: "Statewide expertise in warehouse, industrial, and distribution properties for growing businesses.",
    languages: ["English"],
    certifications: ["SIOR", "CCIM"],
    closedDeals: 41,
    totalVolume: "$35.7M"
  }
];

const US_STATES = [
  "FL", "AL", "AZ", "AR", "CA", "CO", "CT", "DE", "GA", "ID", "IL", "IN", "IA", "KS", "KY", 
  "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", 
  "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", 
  "WV", "WI", "WY"
];

const SPECIALIZATIONS = [
  "All Specializations",
  "Luxury Properties", 
  "Commercial Properties",
  "Residential Properties",
  "Investment Properties", 
  "Industrial Properties"
];

const AgentCard = ({ agent, onViewDetails, onCall, onEmail, onMessage }: { 
  agent: any;
  onViewDetails: (agentId: string) => void;
  onCall: (phone: string) => void;
  onEmail: (email: string) => void;
  onMessage: (agentId: string) => void;
}) => (
  <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/20">
    <CardHeader className="pb-4">
      <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
          <AvatarImage src={agent.profile_image_url} alt={agent.full_name || 'Agent'} />
          <AvatarFallback>{agent.full_name ? agent.full_name.split(' ').map((n: string) => n[0]).join('') : 'A'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-lg">{agent.full_name || 'Agent Name'}</CardTitle>
          <CardDescription className="text-sm">{agent.position || 'Real Estate Agent'}</CardDescription>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{(agent.rating || 0).toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({agent.total_sales || 0})</span>
            </div>
            <Badge variant="secondary">{agent.years_experience || 0} years</Badge>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4" />
        {agent.phone ? agent.phone.split(' ')[0] : 'Location TBD'}
      </div>
      
      <p className="text-sm leading-relaxed">{agent.bio || 'Experienced real estate professional ready to help you with your property needs.'}</p>
      
      <div className="grid grid-cols-2 gap-4 py-2">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-primary">
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold">{agent.total_sales}</span>
          </div>
          <p className="text-xs text-muted-foreground">Sales Volume</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-primary">
            <Award className="w-4 h-4" />
            <span className="text-sm font-semibold">{agent.active_listings}</span>
          </div>
          <p className="text-xs text-muted-foreground">Active Listings</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm">
          <strong>Specializations:</strong> {agent.specializations?.join(', ') || 'General Real Estate'}
        </div>
        <div className="text-sm">
          <strong>Languages:</strong> {agent.languages?.join(', ') || 'English'}
        </div>
        <div className="text-sm">
          <strong>Certifications:</strong> {agent.certifications?.join(', ') || 'Licensed Agent'}
        </div>
      </div>
      
      <div className="space-y-2 pt-4">
        <Button size="sm" className="w-full" onClick={() => onViewDetails(agent.id)}>
          <Eye className="w-4 h-4 mr-2" />
          View Profile
        </Button>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1" onClick={() => onCall(agent.phone || '')}>
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onEmail(agent.email)}>
            <Mail className="w-4 h-4 mr-2" />
            Email  
          </Button>
          <Button variant="outline" size="sm" onClick={() => onMessage(agent.id)}>
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Agents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations");
  
  const { agents, loading, error } = useAgents({
    active: true
  });

  // Fallback to static agents if database query fails or returns empty
  const staticAgents = [
    {
      id: '1',
      user_id: '1',
      full_name: 'Sarah Martinez',
      email: 'sarah.martinez@gruposineva.com',
      position: 'Senior Real Estate Agent',
      phone: '+1 (555) 123-4567',
      bio: 'Experienced real estate professional specializing in luxury properties and international clients.',
      specializations: ['Luxury Properties', 'International Clients'],
      years_experience: 8,
      languages: ['English', 'Spanish'],
      rating: 4.9,
      total_sales: 127,
      active_listings: 15,
      commission_rate: 0.03,
      is_active: true,
      profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b2bc?w=150&h=150&fit=crop&crop=face',
      certifications: ['CRS', 'GRI'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      user_id: '2', 
      full_name: 'Michael Chen',
      email: 'michael.chen@gruposineva.com',
      position: 'Commercial Real Estate Specialist',
      phone: '+1 (555) 123-4568',
      bio: 'Expert in commercial properties and investment advisory with over 12 years of experience.',
      specializations: ['Commercial Properties', 'Investment Advisory'],
      years_experience: 12,
      languages: ['English', 'Mandarin'],
      rating: 4.8,
      total_sales: 89,
      active_listings: 8,
      commission_rate: 0.03,
      is_active: true,
      profile_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      certifications: ['CCIM', 'SIOR'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      user_id: '3',
      full_name: 'Isabella Rodriguez', 
      email: 'isabella.rodriguez@gruposineva.com',
      position: 'Residential Property Expert',
      phone: '+1 (555) 123-4569',
      bio: 'Dedicated to helping families find their perfect home with expertise in residential properties.',
      specializations: ['Residential Properties', 'First-time Buyers'],
      years_experience: 6,
      languages: ['English', 'Spanish'],
      rating: 4.7,
      total_sales: 156,
      active_listings: 22,
      commission_rate: 0.03,
      is_active: true,
      profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      certifications: ['ABR', 'SRS'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Use database agents if available, otherwise fallback to static
  const displayAgents = agents.length > 0 ? agents : staticAgents;

  // Filter agents based on search criteria
  const filteredAgents = displayAgents.filter(agent => {
    if (!agent || !agent.full_name) return false;
    
    const matchesSearch = searchTerm === "" || 
                         agent.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (agent.position || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (agent.specializations?.join(' ') || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = selectedSpecialization === "All Specializations" ||
                                 agent.specializations?.includes(selectedSpecialization);
    
    return matchesSearch && matchesSpecialization;
  });

  const handleViewDetails = (agentId: string) => {
    navigate(`/agent/${agentId}`);
  };

  const handleCall = (phone: string) => {
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    }
  };

  const handleEmail = (email: string) => {
    if (email) {
      window.open(`mailto:${email}`, '_self');
    }
  };

  const handleMessage = (agentId: string) => {
    navigate(`/messages?agent=${agentId}`);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load agents" />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Find Real Estate Agents | Expert Agents in Florida | Grupo Sineva"
        description="Find experienced real estate agents in Florida. Search by location, specialization, and expertise. Connect with top-rated agents for buying, selling, and investing."
      />
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center">
          <div className="absolute inset-0">
            <img src={agentsHero} alt="Professional real estate agents" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Find Your Perfect Agent
              </h1>
              <p className="text-2xl mb-8 opacity-90">
                Connect with top-performing agents who deliver results
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full">✓ Licensed Professionals</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">✓ Local Market Experts</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">✓ Proven Track Record</span>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Search by name, city, or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="col-span-1 md:col-span-2"
                  />
                  
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All States">All States</SelectItem>
                      {US_STATES.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger>
                      <SelectValue placeholder="Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIALIZATIONS.map(spec => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Found {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''}
                  </div>
                  {(searchTerm || selectedState !== "All States" || selectedSpecialization !== "All Specializations") && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedState("All States");
                        setSelectedSpecialization("All Specializations");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredAgents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredAgents.map(agent => (
                  <AgentCard 
                    key={agent.id} 
                    agent={agent}
                    onViewDetails={handleViewDetails}
                    onCall={handleCall}
                    onEmail={handleEmail}
                    onMessage={handleMessage}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-2">No agents found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search criteria or browse all available agents.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedState("All States");
                      setSelectedSpecialization("All Specializations");
                    }}
                  >
                    Show All Agents
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Work with Our Team?</h2>
              <p className="text-muted-foreground mb-8">
                Our agents are ready to help you achieve your real estate goals. Get in touch today to start your journey.
              </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => navigate('/contact')}>Schedule Consultation</Button>
                  <Button variant="outline" size="lg" onClick={() => navigate('/services')}>Learn About Our Services</Button>
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