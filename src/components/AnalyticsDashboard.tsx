import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Eye, Heart, MessageSquare, Calendar, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  propertyViews: any[];
  userActivity: any[];
  leadConversion: any[];
  revenueData: any[];
  topProperties: any[];
  agentPerformance: any[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

export const AnalyticsDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    propertyViews: [],
    userActivity: [],
    leadConversion: [],
    revenueData: [],
    topProperties: [],
    agentPerformance: []
  });
  
  const [dateRange, setDateRange] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAnalyticsData();
    }
  }, [user, dateRange]);

  const loadAnalyticsData = async () => {
    try {
      // Generate mock analytics data since we're building the system
      const mockPropertyViews = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 200) + 50,
        inquiries: Math.floor(Math.random() * 20) + 5,
        favorites: Math.floor(Math.random() * 15) + 2
      }));

      const mockUserActivity = [
        { name: 'Property Views', value: 1245, change: '+12%' },
        { name: 'Search Queries', value: 892, change: '+8%' },
        { name: 'Contact Requests', value: 234, change: '+15%' },
        { name: 'Appointments', value: 156, change: '+22%' },
        { name: 'Favorites Added', value: 445, change: '+5%' }
      ];

      const mockLeadConversion = [
        { stage: 'Visitors', count: 2450, conversion: 100 },
        { stage: 'Inquiries', count: 490, conversion: 20 },
        { stage: 'Qualified', count: 147, conversion: 6 },
        { stage: 'Appointments', count: 89, conversion: 3.6 },
        { stage: 'Conversions', count: 23, conversion: 0.9 }
      ];

      const mockRevenueData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
        revenue: Math.floor(Math.random() * 50000) + 20000,
        commissions: Math.floor(Math.random() * 15000) + 5000,
        transactions: Math.floor(Math.random() * 20) + 5
      }));

      const mockTopProperties = [
        { id: '1', title: 'Luxury Downtown Condo', views: 1234, inquiries: 45, agent: 'Sarah Johnson' },
        { id: '2', title: 'Family Home in Suburbs', views: 998, inquiries: 38, agent: 'Mike Chen' },
        { id: '3', title: 'Modern Townhouse', views: 876, inquiries: 32, agent: 'Emily Davis' },
        { id: '4', title: 'Waterfront Villa', views: 734, inquiries: 28, agent: 'David Wilson' },
        { id: '5', title: 'Urban Loft Space', views: 692, inquiries: 25, agent: 'Lisa Brown' }
      ];

      const mockAgentPerformance = [
        { name: 'Sarah Johnson', listings: 12, views: 3456, inquiries: 123, conversions: 8, revenue: 45000 },
        { name: 'Mike Chen', listings: 10, views: 2890, inquiries: 98, conversions: 6, revenue: 38000 },
        { name: 'Emily Davis', listings: 8, views: 2234, inquiries: 87, conversions: 5, revenue: 32000 },
        { name: 'David Wilson', listings: 9, views: 2567, inquiries: 76, conversions: 4, revenue: 28000 },
        { name: 'Lisa Brown', listings: 7, views: 1998, inquiries: 65, conversions: 4, revenue: 26000 }
      ];

      setAnalytics({
        propertyViews: mockPropertyViews,
        userActivity: mockUserActivity,
        leadConversion: mockLeadConversion,
        revenueData: mockRevenueData,
        topProperties: mockTopProperties,
        agentPerformance: mockAgentPerformance
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading analytics...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8" />
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">Platform performance and insights</p>
        </div>
        
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,567</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +22% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(145000)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Views Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Property Views Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.propertyViews}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="inquiries" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* User Activity */}
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.userActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">{activity.change}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{activity.value.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lead Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.leadConversion} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="stage" type="category" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topProperties.map((property, index) => (
                    <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <p className="text-sm text-muted-foreground">Agent: {property.agent}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-4 text-sm">
                          <div>
                            <p className="font-semibold">{property.views}</p>
                            <p className="text-muted-foreground">Views</p>
                          </div>
                          <div>
                            <p className="font-semibold">{property.inquiries}</p>
                            <p className="text-muted-foreground">Inquiries</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Property Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Views vs Inquiries</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics.propertyViews}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} name="Views" />
                      <Line type="monotone" dataKey="inquiries" stroke="#82ca9d" strokeWidth={2} name="Inquiries" />
                      <Line type="monotone" dataKey="favorites" stroke="#ffc658" strokeWidth={2} name="Favorites" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Property Performance Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'High Performers', value: 15 },
                          { name: 'Medium Performers', value: 45 },
                          { name: 'Low Performers', value: 30 },
                          { name: 'New Listings', value: 10 }
                        ]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents">
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.agentPerformance.map((agent, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
                    <div className="md:col-span-2">
                      <p className="font-semibold">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">{agent.listings} active listings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{agent.views.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{agent.inquiries}</p>
                      <p className="text-xs text-muted-foreground">Inquiries</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{agent.conversions}</p>
                      <p className="text-xs text-muted-foreground">Conversions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{formatCurrency(agent.revenue)}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analytics.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                  <Bar dataKey="commissions" fill="#82ca9d" name="Commissions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};