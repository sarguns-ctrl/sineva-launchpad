import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MarketMetric {
  id: string;
  metric_name: string;
  metric_value: number;
  metric_suffix: string;
  description: string;
  last_updated: string;
  is_active: boolean;
}

export const useMarketData = () => {
  const [marketData, setMarketData] = useState<MarketMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = async () => {
    try {
      // For now, we'll use fallback data since the table might not be fully set up yet
      // This will be replaced with actual Supabase query once the table is ready
      setMarketData([
        {
          id: '1',
          metric_name: 'properties_sold',
          metric_value: 2547,
          metric_suffix: '+',
          description: 'Properties successfully sold',
          last_updated: new Date().toISOString(),
          is_active: true
        },
        {
          id: '2',
          metric_name: 'client_satisfaction',
          metric_value: 98,
          metric_suffix: '%',
          description: 'Client satisfaction rating',
          last_updated: new Date().toISOString(),
          is_active: true
        },
        {
          id: '3',
          metric_name: 'markets_served',
          metric_value: 15,
          metric_suffix: '',
          description: 'Markets we serve globally',
          last_updated: new Date().toISOString(),
          is_active: true
        }
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
      console.error('Error fetching market data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  return { marketData, loading, error, refetch: fetchMarketData };
};