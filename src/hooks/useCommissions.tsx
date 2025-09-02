import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface Commission {
  id: string;
  agent_id: string;
  client_id?: string;
  property_id?: string;
  transaction_date: string;
  transaction_type: 'sale' | 'lease' | 'rental';
  sale_price: number;
  commission_rate: number;
  commission_amount: number;
  status: 'pending' | 'approved' | 'paid' | 'disputed';
  notes?: string;
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
    address: string;
    city: string;
    state: string;
  };
  client?: {
    id: string;
    full_name: string;
    email: string;
  };
}

interface CommissionFilters {
  agent_id?: string;
  status?: string[];
  transaction_type?: string;
  date_range?: {
    start: string;
    end: string;
  };
  min_amount?: number;
  max_amount?: number;
}

interface CommissionStats {
  total_commissions: number;
  pending_amount: number;
  paid_amount: number;
  avg_commission: number;
  total_transactions: number;
  monthly_trend: number;
}

export const useCommissions = (filters?: CommissionFilters) => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [stats, setStats] = useState<CommissionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCommissions = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('agent_commissions')
        .select(`
          *,
          agent:employee_profiles(id, full_name, email),
          property:properties(id, title, address, city, state)
        `);

      // Apply filters
      if (filters?.agent_id) {
        query = query.eq('agent_id', filters.agent_id);
      }

      if (filters?.status && filters.status.length > 0) {
        query = query.in('status', filters.status);
      }

      if (filters?.transaction_type) {
        query = query.eq('transaction_type', filters.transaction_type);
      }

      if (filters?.date_range) {
        query = query
          .gte('transaction_date', filters.date_range.start)
          .lte('transaction_date', filters.date_range.end);
      }

      if (filters?.min_amount) {
        query = query.gte('commission_amount', filters.min_amount);
      }

      if (filters?.max_amount) {
        query = query.lte('commission_amount', filters.max_amount);
      }

      const { data, error: queryError } = await query
        .order('transaction_date', { ascending: false })
        .limit(100);

      if (queryError) throw queryError;

      setCommissions((data || []).map(commission => ({
        ...commission,
        transaction_type: commission.transaction_type as Commission['transaction_type'],
        status: commission.status as Commission['status']
      })));

      // Calculate stats
      if (data && data.length > 0) {
        const totalCommissions = data.reduce(
          (sum, c) => sum + Number(c.commission_amount), 0
        );
        const pendingAmount = data
          .filter(c => c.status === 'pending')
          .reduce((sum, c) => sum + Number(c.commission_amount), 0);
        const paidAmount = data
          .filter(c => c.status === 'paid')
          .reduce((sum, c) => sum + Number(c.commission_amount), 0);
        
        const avgCommission = data.length > 0 ? totalCommissions / data.length : 0;

        // Calculate monthly trend
        const thisMonth = new Date();
        thisMonth.setDate(1);
        const thisMonthCommissions = data
          .filter(c => new Date(c.transaction_date) >= thisMonth)
          .reduce((sum, c) => sum + Number(c.commission_amount), 0);
        
        const lastMonth = new Date(thisMonth);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const lastMonthCommissions = data
          .filter(c => {
            const date = new Date(c.transaction_date);
            return date >= lastMonth && date < thisMonth;
          })
          .reduce((sum, c) => sum + Number(c.commission_amount), 0);
        
        const monthlyTrend = lastMonthCommissions > 0 ? 
          ((thisMonthCommissions - lastMonthCommissions) / lastMonthCommissions) * 100 : 0;

        setStats({
          total_commissions: totalCommissions,
          pending_amount: pendingAmount,
          paid_amount: paidAmount,
          avg_commission: avgCommission,
          total_transactions: data.length,
          monthly_trend: monthlyTrend
        });
      } else {
        setStats({
          total_commissions: 0,
          pending_amount: 0,
          paid_amount: 0,
          avg_commission: 0,
          total_transactions: 0,
          monthly_trend: 0
        });
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch commissions';
      setError(errorMessage);
      console.error('Error fetching commissions:', err);
      
      toast({
        title: "Error loading commissions",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateCommission = (salePrice: number, commissionRate: number): number => {
    return salePrice * (commissionRate / 100);
  };

  const createCommission = async (commissionData: Partial<Commission>) => {
    try {
      const calculatedAmount = calculateCommission(
        commissionData.sale_price || 0,
        commissionData.commission_rate || 3
      );

      const { data, error } = await supabase
        .from('agent_commissions')
        .insert({
          agent_id: commissionData.agent_id,
          client_id: commissionData.client_id,
          property_id: commissionData.property_id,
          transaction_date: commissionData.transaction_date || new Date().toISOString().split('T')[0],
          transaction_type: commissionData.transaction_type || 'sale',
          sale_price: commissionData.sale_price || 0,
          commission_rate: commissionData.commission_rate || 3,
          commission_amount: calculatedAmount,
          status: 'pending',
          notes: commissionData.notes
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Commission created",
        description: `Commission of ${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(calculatedAmount)} created successfully`
      });

      // Refresh commissions
      await fetchCommissions();

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

  const updateCommissionStatus = async (
    commissionId: string, 
    status: Commission['status'],
    notes?: string
  ) => {
    try {
      const updates: any = { 
        status,
        updated_at: new Date().toISOString()
      };

      if (notes) {
        updates.notes = notes;
      }

      const { error } = await supabase
        .from('agent_commissions')
        .update(updates)
        .eq('id', commissionId);

      if (error) throw error;

      toast({
        title: "Commission updated",
        description: `Commission status updated to ${status}`
      });

      // Refresh commissions
      await fetchCommissions();

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

  const approveCommission = async (commissionId: string) => {
    return updateCommissionStatus(commissionId, 'approved');
  };

  const markAsPaid = async (commissionId: string) => {
    return updateCommissionStatus(commissionId, 'paid');
  };

  const disputeCommission = async (commissionId: string, reason: string) => {
    return updateCommissionStatus(commissionId, 'disputed', reason);
  };

  const getAgentCommissionSummary = async (agentId: string) => {
    try {
      const { data, error } = await supabase
        .from('agent_commissions')
        .select('*')
        .eq('agent_id', agentId);

      if (error) throw error;

      const summary = {
        total_earned: data?.reduce((sum, c) => sum + Number(c.commission_amount), 0) || 0,
        pending: data?.filter(c => c.status === 'pending').length || 0,
        paid: data?.filter(c => c.status === 'paid').length || 0,
        this_month: data?.filter(c => {
          const thisMonth = new Date();
          thisMonth.setDate(1);
          return new Date(c.transaction_date) >= thisMonth;
        }).reduce((sum, c) => sum + Number(c.commission_amount), 0) || 0
      };

      return { success: true, summary };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchCommissions();
  }, [
    filters?.agent_id,
    filters?.status,
    filters?.transaction_type,
    filters?.date_range,
    filters?.min_amount,
    filters?.max_amount
  ]);

  return {
    commissions,
    stats,
    loading,
    error,
    refetch: fetchCommissions,
    calculateCommission,
    createCommission,
    updateCommissionStatus,
    approveCommission,
    markAsPaid,
    disputeCommission,
    getAgentCommissionSummary,
    totalCount: commissions.length
  };
};