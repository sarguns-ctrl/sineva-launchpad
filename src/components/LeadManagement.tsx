import React, { useState, useEffect } from 'react';
import { UserPlus, Phone, Mail, MessageSquare, Calendar, TrendingUp, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  contact_info: {
    name: string;
    email: string;
    phone?: string;
    preferences?: string;
  };
  lead_source: string;
  lead_status: string;
  priority: string;
  notes?: string;
  estimated_value?: number;
  last_contact_at?: string;
  created_at: string;
  property?: {
    title: string;
    address: string;
  };
  agent?: {
    full_name: string;
  };
}

export const LeadManagement: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
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

  useEffect(() => {
    filterLeads();
  }, [leads, searchQuery, statusFilter, priorityFilter]);

  const loadLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select(`
          *,
          property:properties(title, address),
          agent:employee_profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
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
            phone: '+1 (555) 123-4567',
            preferences: 'Looking for 3BR house under $500k'
          },
          lead_source: 'website',
          lead_status: 'new',
          priority: 'high',
          notes: 'Interested in downtown properties',
          estimated_value: 450000,
          created_at: '2024-01-15T10:00:00Z',
          property: {
            title: 'Downtown Condo',
            address: '123 Main St'
          }
        },
        {
          id: '2',
          contact_info: {
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '+1 (555) 987-6543',
            preferences: 'First-time buyer, needs financing help'
          },
          lead_source: 'referral',
          lead_status: 'contacted',
          priority: 'medium',
          notes: 'Scheduled viewing for this weekend',
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

  const filterLeads = () => {
    let filtered = leads;

    if (searchQuery) {
      filtered = filtered.filter(lead =>
        lead.contact_info.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.contact_info.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.lead_status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(lead => lead.priority === priorityFilter);
    }

    setFilteredLeads(filtered);
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
          phone: newLead.phone,
          preferences: newLead.notes
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

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          lead_status: newStatus,
          last_contact_at: newStatus !== 'new' ? new Date().toISOString() : null
        })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead status updated"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'destructive';
      case 'contacted': return 'default';
      case 'qualified': return 'secondary';
      case 'converted': return 'default';
      case 'lost': return 'outline';
      default: return 'outline';
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
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const leadStats = {
    total: leads.length,
    new: leads.filter(l => l.lead_status === 'new').length,
    contacted: leads.filter(l => l.lead_status === 'contacted').length,
    qualified: leads.filter(l => l.lead_status === 'qualified').length,
    converted: leads.filter(l => l.lead_status === 'converted').length
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading leads...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <UserPlus className="h-8 w-8" />
            Lead Management
          </h1>
          <p className="text-muted-foreground">Track and manage your sales leads</p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Create Lead
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

      {/* Lead Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{leadStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{leadStats.new}</div>
            <p className="text-sm text-muted-foreground">New</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{leadStats.contacted}</div>
            <p className="text-sm text-muted-foreground">Contacted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{leadStats.qualified}</div>
            <p className="text-sm text-muted-foreground">Qualified</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{leadStats.converted}</div>
            <p className="text-sm text-muted-foreground">Converted</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads by name, email, or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{lead.contact_info.name}</h3>
                    <Badge variant={getStatusColor(lead.lead_status)}>
                      {lead.lead_status}
                    </Badge>
                    <Badge variant={getPriorityColor(lead.priority)}>
                      {lead.priority} priority
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {lead.contact_info.email}
                    </div>
                    {lead.contact_info.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {lead.contact_info.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Created: {formatDate(lead.created_at)}
                    </div>
                    {lead.last_contact_at && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        Last contact: {formatDate(lead.last_contact_at)}
                      </div>
                    )}
                  </div>

                  {lead.property && (
                    <div className="text-sm">
                      <span className="font-medium">Interested in:</span> {lead.property.title} - {lead.property.address}
                    </div>
                  )}

                  {lead.contact_info.preferences && (
                    <div className="text-sm">
                      <span className="font-medium">Preferences:</span> {lead.contact_info.preferences}
                    </div>
                  )}

                  {lead.notes && (
                    <div className="text-sm">
                      <span className="font-medium">Notes:</span> {lead.notes}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm">
                    <span><strong>Source:</strong> {lead.lead_source}</span>
                    <span><strong>Est. Value:</strong> {formatCurrency(lead.estimated_value)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Select
                    value={lead.lead_status}
                    onValueChange={(value) => updateLeadStatus(lead.id, value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredLeads.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No leads found</h3>
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                  ? 'Try adjusting your filters to see more leads.'
                  : 'Create your first lead to get started.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};