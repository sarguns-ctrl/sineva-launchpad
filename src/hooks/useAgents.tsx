import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface Agent {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  position?: string;
  department_id?: string;
  phone?: string;
  bio?: string;
  specializations?: string[];
  years_experience?: number;
  languages?: string[];
  rating: number;
  total_sales: number;
  active_listings: number;
  commission_rate: number;
  is_active: boolean;
  profile_image_url?: string;
  social_links?: Record<string, string>;
  certifications?: string[];
  created_at: string;
  updated_at: string;
}

interface AgentStats {
  total_commissions: number;
  properties_sold: number;
  active_leads: number;
  client_satisfaction: number;
  this_month_sales: number;
  avg_days_to_sell: number;
}

export const useAgents = (filters?: { 
  active?: boolean; 
  department?: string; 
  specialization?: string;
  search?: string;
}) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('agent_applications')
        .select('*')
        .eq('status', 'approved');

      if (filters?.search) {
        query = query.or(`
          full_name.ilike.%${filters.search}%,
          email.ilike.%${filters.search}%
        `);
      }

      const { data, error: queryError } = await query
        .order('created_at', { ascending: false });

      if (queryError) throw queryError;

      // Get agent statistics  
      const agentStats = await Promise.all(
        (data || []).map(async (agent) => {
          const [commissions, properties, leads] = await Promise.all([
            supabase
              .from('agent_commissions')
              .select('commission_amount')
              .eq('agent_id', agent.id),
            supabase
              .from('properties')
              .select('id, status')
              .eq('agent_id', agent.id),
            supabase
              .from('leads')
              .select('id, lead_status')
              .eq('agent_id', agent.id)
              .in('lead_status', ['new', 'contacted', 'qualified'])
          ]);

          const totalCommissions = commissions.data?.reduce(
            (sum, c) => sum + Number(c.commission_amount), 0
          ) || 0;

          const propertiesSold = properties.data?.filter(
            p => p.status === 'sold'
          ).length || 0;

          const activeListings = properties.data?.filter(
            p => ['active', 'pending'].includes(p.status)
          ).length || 0;

          const activeLeads = leads.data?.length || 0;

          return {
            id: agent.id,
            user_id: agent.user_id,
            full_name: agent.full_name,
            email: agent.email,
            position: `${agent.experience_years || 0} Year${(agent.experience_years || 0) !== 1 ? 's' : ''} Experience`,
            phone: agent.phone,
            bio: agent.motivation || 'Experienced real estate professional ready to help you with your property needs.',
            specializations: agent.specializations || ['General Real Estate'],
            years_experience: agent.experience_years || 0,
            languages: ['English'],
            rating: 4.5 + Math.random() * 0.5,
            total_sales: totalCommissions,
            active_listings: activeListings,
            commission_rate: 0.03,
            is_active: true,
            profile_image_url: null,
            certifications: [],
            created_at: agent.created_at,
            updated_at: agent.updated_at
          };
        })
      );

      setAgents(agentStats);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch agents';
      setError(errorMessage);
      console.error('Error fetching agents:', err);
      
      toast({
        title: "Error loading agents",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getAgentStats = async (agentId: string): Promise<AgentStats> => {
    try {
      const [commissions, properties, leads] = await Promise.all([
        supabase
          .from('agent_commissions')
          .select('*')
          .eq('agent_id', agentId),
        supabase
          .from('properties')
          .select('*')
          .eq('agent_id', agentId),
        supabase
          .from('leads')
          .select('*')
          .eq('agent_id', agentId)
      ]);

      const totalCommissions = commissions.data?.reduce(
        (sum, c) => sum + Number(c.commission_amount), 0
      ) || 0;

      const propertiesSold = properties.data?.filter(
        p => p.status === 'sold'
      ).length || 0;

      const activeLeads = leads.data?.filter(
        l => ['new', 'contacted', 'qualified'].includes(l.lead_status)
      ).length || 0;

      // Calculate this month's sales
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const thisMonthSales = commissions.data?.filter(c => 
        new Date(c.created_at) >= thisMonth
      ).reduce((sum, c) => sum + Number(c.commission_amount), 0) || 0;

      return {
        total_commissions: totalCommissions,
        properties_sold: propertiesSold,
        active_leads: activeLeads,
        client_satisfaction: 4.5 + Math.random() * 0.5, // Mock for now
        this_month_sales: thisMonthSales,
        avg_days_to_sell: 30 + Math.floor(Math.random() * 30) // Mock for now
      };
    } catch (err: any) {
      console.error('Error fetching agent stats:', err);
      return {
        total_commissions: 0,
        properties_sold: 0,
        active_leads: 0,
        client_satisfaction: 0,
        this_month_sales: 0,
        avg_days_to_sell: 0
      };
    }
  };

  const assignLead = async (agentId: string, leadId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          agent_id: agentId,
          lead_status: 'assigned'
        })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Lead assigned",
        description: "Lead has been assigned to the agent successfully"
      });

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

  const updateAgentProfile = async (agentId: string, updates: Partial<Agent>) => {
    try {
      const { error } = await supabase
        .from('agent_applications')
        .update(updates)
        .eq('id', agentId);

      if (error) throw error;

      // Refresh agents list
      await fetchAgents();

      toast({
        title: "Profile updated",
        description: "Agent profile has been updated successfully"
      });

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
    fetchAgents();
  }, [filters?.active, filters?.department, filters?.search]);

  return {
    agents,
    loading,
    error,
    refetch: fetchAgents,
    getAgentStats,
    assignLead,
    updateAgentProfile,
    totalCount: agents.length
  };
};