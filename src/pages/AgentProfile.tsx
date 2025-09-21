import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Phone,
  Mail,
  Star,
  Award,
  Users,
  ArrowLeft,
  MessageCircle
} from "lucide-react";
import { useAgents } from "@/hooks/useAgents";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import SEOHead from "@/components/SEOHead";

const AgentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { agents, loading, error } = useAgents();
  
  if (loading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load agent details" />;
  
  const agent = agents.find(a => a.id === id);
  
  if (!agent) {
    return <ErrorState message="Agent not found" />;
  }

  const handleCall = () => {
    if (agent.phone) {
      window.open(`tel:${agent.phone}`, '_self');
    }
  };

  const handleEmail = () => {
    if (agent.email) {
      window.open(`mailto:${agent.email}`, '_self');
    }
  };

  const handleMessage = () => {
    navigate(`/messages?agent=${agent.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${agent.full_name} - Real Estate Agent | Grupo Sineva`}
        description={`Meet ${agent.full_name}, experienced real estate agent.`}
      />
      <Navigation />
      
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/agents')}
              className="mb-6 hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Agents
            </Button>
            
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-start gap-6 mb-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={agent.profile_image_url} alt={agent.full_name} />
                        <AvatarFallback className="text-2xl">
                          {agent.full_name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-2">{agent.full_name}</h1>
                        <p className="text-xl text-muted-foreground mb-4">{agent.position || 'Real Estate Agent'}</p>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-muted-foreground" />
                            <span>Available</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{agent.rating.toFixed(1)} Rating</span>
                          </div>
                          <Badge variant="secondary">{agent.years_experience} years experience</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mb-6">
                      <Button onClick={handleCall} className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Agent
                      </Button>
                      <Button variant="outline" onClick={handleEmail} className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button variant="outline" onClick={handleMessage} className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 text-primary mb-2">
                          <Users className="w-5 h-5" />
                          <span className="text-2xl font-bold">{agent.total_sales}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Total Sales</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 text-primary mb-2">
                          <Award className="w-5 h-5" />
                          <span className="text-2xl font-bold">{agent.active_listings}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Active Listings</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 text-primary mb-2">
                          <Star className="w-5 h-5" />
                          <span className="text-2xl font-bold">{agent.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Client Rating</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-4">About {agent.full_name}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {agent.bio || `${agent.full_name} is an experienced real estate professional dedicated to helping clients achieve their property goals.`}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Specializations</h3>
                        <div className="flex flex-wrap gap-2">
                          {(agent.specializations || ['General Real Estate']).map((spec, index) => (
                            <Badge key={index} variant="outline">{spec}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {(agent.languages || ['English']).map((lang, index) => (
                            <Badge key={index} variant="outline">{lang}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-muted-foreground" />
                            <span>{agent.phone || 'Phone available upon request'}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <span>{agent.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AgentProfile;