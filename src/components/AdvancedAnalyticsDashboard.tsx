import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Eye, 
  MapPin, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Building
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import AnimatedCounter from './AnimatedCounter';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  totalProperties: number;
  totalViews: number;
  totalLeads: number;
  conversionRate: number;
  averagePrice: number;
  revenueGrowth: number;
  marketTrend: 'up' | 'down' | 'stable';
}

interface ChartDataPoint {
  name: string;
  value: number;
  change?: number;
}

interface PropertyMetric {
  property_id: string;
  title: string;
  views: number;
  inquiries: number;
  favorites: number;
  conversion_rate: number;
}

export const AdvancedAnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalProperties: 0,
    totalViews: 0,
    totalLeads: 0,
    conversionRate: 0,
    averagePrice: 0,
    revenueGrowth: 0,
    marketTrend: 'stable'
  });

  // Mock data for charts
  const viewsData: ChartDataPoint[] = [
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 1398 },
    { name: 'Wed', value: 9800 },
    { name: 'Thu', value: 3908 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 4300 }
  ];

  const revenueData: ChartDataPoint[] = [
    { name: 'Jan', value: 65000 },
    { name: 'Feb', value: 59000 },
    { name: 'Mar', value: 80000 },
    { name: 'Apr', value: 81000 },
    { name: 'May', value: 56000 },
    { name: 'Jun', value: 55000 },
    { name: 'Jul', value: 78000 }
  ];

  const propertyTypesData = [
    { name: 'Residential', value: 400, color: 'hsl(var(--primary))' },
    { name: 'Commercial', value: 300, color: 'hsl(var(--accent))' },
    { name: 'Land', value: 300, color: 'hsl(var(--secondary))' },
    { name: 'Business', value: 200, color: 'hsl(var(--muted))' }
  ];

  const topProperties: PropertyMetric[] = [
    {
      property_id: '1',
      title: 'Luxury Downtown Condo',
      views: 1250,
      inquiries: 45,
      favorites: 89,
      conversion_rate: 3.6
    },
    {
      property_id: '2',
      title: 'Commercial Office Space',
      views: 980,
      inquiries: 32,
      favorites: 67,
      conversion_rate: 3.3
    },
    {
      property_id: '3',
      title: 'Tech Startup Business',
      views: 756,
      inquiries: 28,
      favorites: 52,
      conversion_rate: 3.7
    },
    {
      property_id: '4',
      title: 'Residential Estate',
      views: 643,
      inquiries: 19,
      favorites: 41,
      conversion_rate: 3.0
    }
  ];

  const marketInsights = [
    {
      metric: 'Average Days on Market',
      value: 34,
      change: -12,
      trend: 'down' as const
    },
    {
      metric: 'Price per Sq Ft',
      value: 285,
      change: 8,
      trend: 'up' as const
    },
    {
      metric: 'Inventory Turnover',
      value: 67,
      change: 15,
      trend: 'up' as const
    },
    {
      metric: 'Market Velocity',
      value: 2.3,
      change: -5,
      trend: 'down' as const
    }
  ];

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAnalytics({
        totalProperties: 2847,
        totalViews: 124567,
        totalLeads: 3456,
        conversionRate: 2.8,
        averagePrice: 875000,
        revenueGrowth: 12.5,
        marketTrend: 'up'
      });
      setLoading(false);
    }, 1000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-elegant">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' && entry.value > 1000 
                ? formatNumber(entry.value)
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into property performance and market trends
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Properties',
            value: analytics.totalProperties,
            icon: Building,
            trend: 'up',
            change: '+12.5%',
            color: 'text-blue-600'
          },
          {
            title: 'Total Views',
            value: analytics.totalViews,
            icon: Eye,
            trend: 'up',
            change: '+23.1%',
            color: 'text-green-600'
          },
          {
            title: 'Active Leads',
            value: analytics.totalLeads,
            icon: Users,
            trend: 'up',
            change: '+8.2%',
            color: 'text-purple-600'
          },
          {
            title: 'Avg. Property Price',
            value: analytics.averagePrice,
            icon: DollarSign,
            trend: 'up',
            change: '+5.4%',
            color: 'text-orange-600',
            format: 'currency'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <div className="text-2xl font-bold">
                      {metric.format === 'currency' ? (
                        formatCurrency(metric.value)
                      ) : (
                        <AnimatedCounter end={metric.value} duration={2000} />
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                      <span className={`text-xs font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r opacity-20 flex items-center justify-center ${metric.color}`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="market">Market Insights</TabsTrigger>
          <TabsTrigger value="properties">Top Properties</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Views Chart */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Property Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Chart */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      content={<CustomTooltip />}
                      formatter={(value: any) => [formatCurrency(value), 'Revenue']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Property Types Distribution */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Property Types Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={propertyTypesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {propertyTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                
                <div className="flex flex-col justify-center space-y-4">
                  {propertyTypesData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm font-medium">{entry.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{entry.value}</div>
                        <div className="text-xs text-muted-foreground">
                          {((entry.value / propertyTypesData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketInsights.map((insight, index) => (
              <motion.div
                key={insight.metric}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-card">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      {insight.metric}
                    </h3>
                    <div className="text-3xl font-bold mb-2">
                      {insight.metric.includes('Price') 
                        ? `$${insight.value}` 
                        : insight.metric.includes('Velocity')
                        ? `${insight.value}x`
                        : insight.value}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      {insight.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {Math.abs(insight.change)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Top Performing Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProperties.map((property, index) => (
                  <motion.div
                    key={property.property_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-all"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{property.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {formatNumber(property.views)} views
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {property.inquiries} inquiries
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          {property.conversion_rate}% conversion
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={property.conversion_rate > 3.5 ? 'default' : 'secondary'}
                        className="mb-2"
                      >
                        #{index + 1}
                      </Badge>
                      <Progress 
                        value={property.conversion_rate} 
                        max={5} 
                        className="w-20" 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};