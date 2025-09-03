import React, { useState, useEffect } from 'react';
import { Target, Plus, Filter, ArrowRight, Phone, Mail, Calendar, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  contact_info: {
    name: string;
    email: string;
    phone?: string;
  };
  lead_source: string;
  lead_status: string;
  priority: string;
  notes?: string;
  estimated_value?: number;
  last_contact_at?: string;
  created_at: string;
}

type PipelineStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'converted' | 'lost';

const pipelineStages: { id: PipelineStage; title: string; color: string }[] = [
  { id: 'new', title: 'New', color: 'border-red-200 bg-red-50 dark:bg-red-950' },
  { id: 'contacted', title: 'Contacted', color: 'border-blue-200 bg-blue-50 dark:bg-blue-950' },
  { id: 'qualified', title: 'Qualified', color: 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950' },
  { id: 'proposal', title: 'Proposal', color: 'border-purple-200 bg-purple-50 dark:bg-purple-950' },
  { id: 'negotiation', title: 'Negotiation', color: 'border-orange-200 bg-orange-50 dark:bg-orange-950' },
  { id: 'converted', title: 'Converted', color: 'border-green-200 bg-green-50 dark:bg-green-950' },
  { id: 'lost', title: 'Lost', color: 'border-gray-200 bg-gray-50 dark:bg-gray-950' }
];

export const LeadsPipeline: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Form state for creating new leads
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'website',
    priority: 'medium',
    notes: '',
    estimatedValue: ''
  });

  useEffect(() => {
    if (user) {
      loadLeads();
    }
  }, [user]);

  const loadLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const transformedLeads = data?.map(lead => ({
        ...lead,
        contact_info: typeof lead.contact_info === 'string' 
          ? JSON.parse(lead.contact_info) 
          : lead.contact_info
      })) || [];
      
      setLeads(transformedLeads);
    } catch (error: any) {
      // Use mock data if database query fails
      const mockLeads: Lead[] = [
        {
          id: '1',
          contact_info: {
            name: 'John Smith',
            email: 'john.smith@email.com',
            phone: '+1 (555) 123-4567'
          },
          lead_source: 'website',
          lead_status: 'new',
          priority: 'high',
          notes: 'Interested in downtown properties',
          estimated_value: 450000,
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          contact_info: {
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '+1 (555) 987-6543'
          },
          lead_source: 'referral',
          lead_status: 'qualified',
          priority: 'medium',
          notes: 'First-time buyer, needs financing help',
          estimated_value: 325000,
          last_contact_at: '2024-01-14T15:30:00Z',
          created_at: '2024-01-12T09:15:00Z'
        }
      ];
      setLeads(mockLeads);
    } finally {
      setLoading(false);
    }
  };

  const createLead = async () => {
    if (!newLead.name || !newLead.email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const leadData = {
        contact_info: {
          name: newLead.name,
          email: newLead.email,
          phone: newLead.phone
        },
        lead_source: newLead.source,
        lead_status: 'new',
        priority: newLead.priority,
        notes: newLead.notes,
        estimated_value: newLead.estimatedValue ? parseFloat(newLead.estimatedValue) : null
      };

      const { error } = await supabase
        .from('leads')
        .insert(leadData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead created successfully"
      });

      setShowCreateDialog(false);
      setNewLead({
        name: '',
        email: '',
        phone: '',
        source: 'website',
        priority: 'medium',
        notes: '',
        estimatedValue: ''
      });
      
      loadLeads();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const moveLeadToStage = async (leadId: string, newStage: PipelineStage) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          lead_status: newStage,
          last_contact_at: newStage !== 'new' ? new Date().toISOString() : null
        })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead moved successfully"
      });

      loadLeads();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No contact';
    return new Date(dateString).toLocaleDateString();
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.contact_info.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.contact_info.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = sourceFilter === 'all' || lead.lead_source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  const getLeadsByStage = (stage: PipelineStage) => {
    return filteredLeads.filter(lead => lead.lead_status === stage);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading pipeline...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6" />
            Sales Pipeline
          </h2>
          <p className="text-muted-foreground">Manage leads through your sales process</p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Lead</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="estimated-value">Estimated Value</Label>
                  <Input
                    id="estimated-value"
                    type="number"
                    value={newLead.estimatedValue}
                    onChange={(e) => setNewLead({ ...newLead, estimatedValue: e.target.value })}
                    placeholder="500000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="source">Lead Source</Label>
                  <Select value={newLead.source} onValueChange={(value) => setNewLead({ ...newLead, source: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="social_media">Social Media</SelectItem>
                      <SelectItem value="advertisement">Advertisement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newLead.priority} onValueChange={(value) => setNewLead({ ...newLead, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  placeholder="Lead preferences, requirements, or additional notes..."
                  rows={3}
                />
              </div>

              <Button onClick={createLead} className="w-full">
                Create Lead
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search leads by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="social_media">Social Media</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 overflow-x-auto">
        {pipelineStages.map((stage) => {
          const stageLeads = getLeadsByStage(stage.id);
          
          return (
            <Card key={stage.id} className={`min-h-[600px] ${stage.color}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  {stage.title}
                  <Badge variant="secondary" className="ml-2">
                    {stageLeads.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stageLeads.map((lead) => (
                  <Card key={lead.id} className="bg-background border shadow-sm">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{lead.contact_info.name}</h4>
                            <p className="text-xs text-muted-foreground">{lead.contact_info.email}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Phone className="h-4 w-4 mr-2" />
                                Call
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="h-4 w-4 mr-2" />
                                Schedule
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(lead.priority)} className="text-xs">
                            {lead.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {lead.lead_source}
                          </Badge>
                        </div>

                        {lead.estimated_value && (
                          <p className="text-sm font-medium text-green-600">
                            {formatCurrency(lead.estimated_value)}
                          </p>
                        )}

                        {lead.notes && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {lead.notes}
                          </p>
                        )}

                        <div className="text-xs text-muted-foreground">
                          Last contact: {formatDate(lead.last_contact_at)}
                        </div>

                        {/* Move to next stage button */}
                        {stage.id !== 'converted' && stage.id !== 'lost' && (
                          <div className="flex gap-1">
                            {pipelineStages
                              .filter(s => s.id !== stage.id && s.id !== 'lost')
                              .slice(0, 2)
                              .map((nextStage) => (
                                <Button
                                  key={nextStage.id}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-7"
                                  onClick={() => moveLeadToStage(lead.id, nextStage.id)}
                                >
                                  <ArrowRight className="h-3 w-3 mr-1" />
                                  {nextStage.title}
                                </Button>
                              ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};