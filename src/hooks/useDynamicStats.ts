import { useState, useEffect } from 'react';

interface DynamicStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  change: string;
  changeType: 'positive' | 'neutral';
}

export const useDynamicStats = () => {
  const [stats, setStats] = useState<DynamicStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateRandomStats = () => {
    // Base ranges for realistic variation
    const statConfigs = [
      {
        id: 'consultations',
        label: 'Active Consultations Today',
        baseValue: 45,
        variance: 15,
        suffix: '',
        changeRange: [8, 18]
      },
      {
        id: 'properties',
        label: 'Properties Viewed This Week',
        baseValue: 2300,
        variance: 200,
        suffix: '',
        changeRange: [15, 30]
      },
      {
        id: 'investments',
        label: 'Investments This Month',
        baseValue: 18,
        variance: 3,
        suffix: 'M',
        changeRange: [2, 8]
      },
      {
        id: 'success',
        label: 'Success Rate',
        baseValue: 97,
        variance: 2,
        suffix: '%',
        changeRange: [0, 0], // Success rate stays consistent
        isConsistent: true
      }
    ];

    const newStats = statConfigs.map(config => {
      const randomVariance = (Math.random() - 0.5) * 2 * config.variance;
      const value = Math.max(1, Math.round(config.baseValue + randomVariance));
      
      let change: string;
      let changeType: 'positive' | 'neutral' = 'positive';
      
      if (config.isConsistent) {
        change = 'Consistent';
        changeType = 'neutral';
      } else {
        const changePercent = Math.floor(Math.random() * (config.changeRange[1] - config.changeRange[0] + 1)) + config.changeRange[0];
        change = `+${changePercent}%`;
      }

      // Format the value based on its size
      let displayValue = value;
      let displaySuffix = config.suffix;
      
      if (config.id === 'investments') {
        displayValue = Math.round(value * 10) / 10; // One decimal place for millions
      }

      return {
        id: config.id,
        label: config.label,
        value: displayValue,
        suffix: displaySuffix,
        change,
        changeType
      };
    });

    setStats(newStats);
    setIsLoading(false);
  };

  // Generate new stats every time someone visits
  useEffect(() => {
    // Initial generation
    generateRandomStats();

    // Also regenerate every 30 seconds to simulate real-time updates
    const interval = setInterval(generateRandomStats, 30000);

    return () => clearInterval(interval);
  }, []);

  // Activity indicators that change dynamically
  const getActivityIndicators = () => {
    const baseIndicators = [
      { icon: '🟢', text: 'Real-time activity' },
      { icon: '👔', text: 'Licensed professionals' },
      { icon: '👥', text: `${500 + Math.floor(Math.random() * 100)}+ successful investors` },
      { icon: '🌍', text: `${15 + Math.floor(Math.random() * 10)}+ markets served` }
    ];

    return baseIndicators;
  };

  return { 
    stats, 
    isLoading, 
    activityIndicators: getActivityIndicators(),
    refreshStats: generateRandomStats 
  };
};