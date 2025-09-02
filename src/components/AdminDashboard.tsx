import React, { useState, useEffect } from 'react';
import { Shield, Users, Home, TrendingUp, MessageSquare, Settings, DollarSign, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalAgents: number;
  totalRevenue: number;
  activeLeads: number;
  pendingCommissions: number;
  systemAlerts: number;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  priority: string;
}

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalProperties: 0,
    totalAgents: 0,
    totalRevenue: 0,
    activeLeads: 0,
    pendingCommissions: 0,
    systemAlerts: 0
  });
  
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
      setupRealTimeUpdates();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      // Load various statistics
      const [
        { count: usersCount },
        { count: propertiesCount },
        { count: agentsCount },
        { data: leadsData },
        { data: commissionsData },
        { count: alertsCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('properties').select('*', { count: 'exact', head: true }),
        supabase.from('employee_profiles').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('leads').select('*').in('lead_status', ['new', 'contacted', 'qualified']),
        supabase.from('agent_commissions').select('*').eq('status', 'pending'),
        supabase.from('system_notifications').select('*', { count: 'exact', head: true }).eq('is_active', true)
      ]);

      // Calculate total revenue from commissions
      const totalRevenue = commissionsData?.reduce((sum, commission) => sum + Number(commission.commission_amount), 0) || 0;

      setStats({
        totalUsers: usersCount || 0,
        totalProperties: propertiesCount || 0,
        totalAgents: agentsCount || 0,
        totalRevenue,
        activeLeads: leadsData?.length || 0,
        pendingCommissions: commissionsData?.length || 0,
        systemAlerts: alertsCount || 0
      });

      // Load recent activity (simplified for demo)
      const { data: activityData } = await supabase
        .from('user_activity')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (activityData) {
        const formattedActivity = activityData.map(activity => ({
          id: activity.id,
          type: activity.activity_type,
          description: `User performed ${activity.activity_type}`,
          timestamp: activity.created_at,
          priority: 'normal'
        }));
        setRecentActivity(formattedActivity);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealTimeUpdates = () => {
    const channel = supabase
      .channel('admin-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_activity' }, () => {
        loadDashboardData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        loadDashboardData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading admin dashboard...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-8 w-8" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              Active platform users
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              Listed properties
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAgents.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              Platform agents
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              Commission earnings
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Server Performance</span>
                    <span>98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Database Performance</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>API Response Time</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                {stats.systemAlerts > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">
                      {stats.systemAlerts} system alert(s) require attention
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {activity.type.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                  {recentActivity.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No recent activity
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex-col gap-2" onClick={() => window.location.href = '/admin/users'}>
                  <Users className="h-6 w-6" />
                  Manage Users
                </Button>
                <Button className="h-20 flex-col gap-2" variant="outline" onClick={() => window.location.href = '/admin/properties'}>
                  <Home className="h-6 w-6" />
                  Manage Properties
                </Button>
                <Button className="h-20 flex-col gap-2" variant="outline" onClick={() => window.location.href = '/admin/leads'}>
                  <MessageSquare className="h-6 w-6" />
                  View Leads
                </Button>
                <Button className="h-20 flex-col gap-2" variant="outline" onClick={() => window.location.href = '/admin/settings'}>
                  <Settings className="h-6 w-6" />
                  System Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">User Management Console</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive user management features coming soon
                </p>
                <Button>Access User Management</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Property Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Property Management Console</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced property management tools and analytics
                </p>
                <Button>Access Property Management</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents">
          <Card>
            <CardHeader>
              <CardTitle>Agent Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{stats.totalAgents}</div>
                      <p className="text-sm text-muted-foreground">Active Agents</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{stats.activeLeads}</div>
                      <p className="text-sm text-muted-foreground">Active Leads</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{stats.pendingCommissions}</div>
                      <p className="text-sm text-muted-foreground">Pending Commissions</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center py-4">
                  <Button>View Agent Performance Dashboard</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Lead Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Lead Management System</h3>
                <p className="text-muted-foreground mb-4">
                  Track and manage leads across the platform
                </p>
                <div className="text-2xl font-bold mb-2">{stats.activeLeads}</div>
                <p className="text-sm text-muted-foreground mb-4">Active leads requiring attention</p>
                <Button>Access Lead Management</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">System Configuration</h3>
                <p className="text-muted-foreground mb-4">
                  Platform settings and configuration management
                </p>
                <Button>Access System Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};