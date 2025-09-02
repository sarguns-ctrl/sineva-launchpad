import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface Lead {
  id: string;
  user_id?: string;
  agent_id?: string;
  property_id?: string;
  lead_source: string;
  lead_status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  contact_info: {
    name?: string;
    email?: string;
    phone?: string;
    preferred_contact?: 'email' | 'phone' | 'text';
  };
  estimated_value?: number;
  notes?: string;
  last_contact_at?: string;
  conversion_date?: string;
  created_at: string;
  updated_at: string;
  // Related data
  agent?: {
    id: string;
    full_name: string;
    email: string;
  };
  property?: {
    id: string;
    title: string;
    price: number;
    city: string;
    state: string;
  };
}

interface LeadFilters {
  status?: string[];
  agent_id?: string;
  source?: string;
  priority?: string;
  date_range?: {
    start: string;
    end: string;
  };
  search?: string;
}

interface LeadStats {
  total_leads: number;
  new_leads: number;
  qualified_leads: number;
  conversion_rate: number;
  avg_response_time: number;
  monthly_trend: number;
}

export const useLeads = (filters?: LeadFilters) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('leads')
        .select(`
          *,
          agent:employee_profiles(id, full_name, email),
          property:properties(id, title, price, city, state)
        `);

      // Apply filters
      if (filters?.status && filters.status.length > 0) {
        query = query.in('lead_status', filters.status);
      }

      if (filters?.agent_id) {
        query = query.eq('agent_id', filters.agent_id);
      }

      if (filters?.source) {
        query = query.eq('lead_source', filters.source);
      }

      if (filters?.priority) {
        query = query.eq('priority', filters.priority);
      }

      if (filters?.date_range) {
        query = query
          .gte('created_at', filters.date_range.start)
          .lte('created_at', filters.date_range.end);
      }

      if (filters?.search) {
        query = query.or(`
          contact_info->>name.ilike.%${filters.search}%,
          contact_info->>email.ilike.%${filters.search}%,
          notes.ilike.%${filters.search}%
        `);
      }

      const { data, error: queryError } = await query
        .order('created_at', { ascending: false })
        .limit(100);

      if (queryError) throw queryError;

      setLeads((data || []).map(lead => ({
        ...lead,
        lead_status: lead.lead_status as Lead['lead_status'],
        priority: lead.priority as Lead['priority'],
        contact_info: (lead.contact_info as any) || {}
      })));

      // Calculate stats
      if (data) {
        const totalLeads = data.length;
        const newLeads = data.filter(l => l.lead_status === 'new').length;
        const qualifiedLeads = data.filter(l => l.lead_status === 'qualified').length;
        const closedLeads = data.filter(l => l.lead_status === 'closed').length;
        const conversionRate = totalLeads > 0 ? (closedLeads / totalLeads) * 100 : 0;

        // Calculate monthly trend (mock for now)
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const lastMonthLeads = data.filter(l => 
          new Date(l.created_at) >= lastMonth
        ).length;
        const previousMonthLeads = totalLeads - lastMonthLeads;
        const monthlyTrend = previousMonthLeads > 0 ? 
          ((lastMonthLeads - previousMonthLeads) / previousMonthLeads) * 100 : 0;

        setStats({
          total_leads: totalLeads,
          new_leads: newLeads,
          qualified_leads: qualifiedLeads,
          conversion_rate: conversionRate,
          avg_response_time: 2.5, // Mock: 2.5 hours average
          monthly_trend: monthlyTrend
        });
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch leads';
      setError(errorMessage);
      console.error('Error fetching leads:', err);
      
      toast({
        title: "Error loading leads",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createLead = async (leadData: Partial<Lead>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('leads')
        .insert({
          user_id: leadData.user_id || user?.id,
          agent_id: leadData.agent_id,
          property_id: leadData.property_id,
          lead_source: leadData.lead_source || 'website',
          lead_status: leadData.lead_status || 'new',
          priority: leadData.priority || 'medium',
          contact_info: leadData.contact_info || {},
          estimated_value: leadData.estimated_value,
          notes: leadData.notes
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Lead created",
        description: "New lead has been created successfully"
      });

      // Refresh leads
      await fetchLeads();

      return { success: true, data };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return { success: false, error: err.message };
    }
  };

  const updateLeadStatus = async (leadId: string, status: Lead['lead_status'], notes?: string) => {
    try {
      const updates: any = { 
        lead_status: status,
        updated_at: new Date().toISOString()
      };

      if (notes) {
        updates.notes = notes;
      }

      if (status === 'contacted' && !leads.find(l => l.id === leadId)?.last_contact_at) {
        updates.last_contact_at = new Date().toISOString();
      }

      if (status === 'closed') {
        updates.conversion_date = new Date().toISOString();
      }

      const { error } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Lead updated",
        description: `Lead status updated to ${status}`
      });

      // Refresh leads
      await fetchLeads();

      return { success: true };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return { success: false, error: err.message };
    }
  };

  const assignAgent = async (leadId: string, agentId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          agent_id: agentId,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Agent assigned",
        description: "Lead has been assigned to an agent"
      });

      // Refresh leads
      await fetchLeads();

      return { success: true };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return { success: false, error: err.message };
    }
  };

  const addNote = async (leadId: string, note: string) => {
    try {
      // Get current lead
      const lead = leads.find(l => l.id === leadId);
      const currentNotes = lead?.notes || '';
      const timestamp = new Date().toLocaleString();
      const newNotes = `${currentNotes}\n\n[${timestamp}] ${note}`.trim();

      const { error } = await supabase
        .from('leads')
        .update({ 
          notes: newNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Note added",
        description: "Note has been added to the lead"
      });

      // Refresh leads
      await fetchLeads();

      return { success: true };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return { success: false, error: err.message };
    }
  };

  const deleteLead = async (leadId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Lead deleted",
        description: "Lead has been deleted successfully"
      });

      // Refresh leads
      await fetchLeads();

      return { success: true };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [
    filters?.status,
    filters?.agent_id,
    filters?.source,
    filters?.priority,
    filters?.date_range,
    filters?.search
  ]);

  return {
    leads,
    stats,
    loading,
    error,
    refetch: fetchLeads,
    createLead,
    updateLeadStatus,
    assignAgent,
    addNote,
    deleteLead,
    totalCount: leads.length
  };
};