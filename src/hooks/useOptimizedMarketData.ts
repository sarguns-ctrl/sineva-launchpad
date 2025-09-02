import { useQuery } from '@tanstack/react-query';

interface MarketMetric {
  id: string;
  metric_name: string;
  metric_value: number;
  metric_suffix: string;
  description?: string;
  last_updated?: string;
  is_active?: boolean;
}

const fetchMarketData = async (): Promise<MarketMetric[]> => {
  // Return optimized static data with slight randomization
  return [
    {
      id: 'properties_sold',
      metric_name: 'properties_sold',
      metric_value: 2400 + Math.floor(Math.random() * 200),
      metric_suffix: '+',
      description: 'Properties successfully sold'
    },
    {
      id: 'total_revenue',
      metric_name: 'total_revenue',
      metric_value: 18 + Math.floor(Math.random() * 4),
      metric_suffix: 'M+',
      description: 'Total revenue generated'
    },
    {
      id: 'active_agents',
      metric_name: 'active_agents',
      metric_value: 115 + Math.floor(Math.random() * 25),
      metric_suffix: '+',
      description: 'Licensed real estate professionals'
    }
  ];
};

export const useOptimizedMarketData = () => {
  return useQuery({
    queryKey: ['market-data'],
    queryFn: fetchMarketData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });
};