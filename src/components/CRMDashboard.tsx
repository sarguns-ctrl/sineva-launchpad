import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Calendar, Mail, TrendingUp, Target, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  totalAppointments: number;
  upcomingAppointments: number;
  unreadMessages: number;
  activeCampaigns: number;
  conversionRate: number;
  avgDealValue: number;
  totalRevenue: number;
}

interface RecentActivity {
  id: string;
  type: 'lead_created' | 'appointment_scheduled' | 'message_sent' | 'lead_converted';
  description: string;
  timestamp: string;
}

export const CRMDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeads: 0,
    convertedLeads: 0,
    totalAppointments: 0,
    upcomingAppointments: 0,
    unreadMessages: 0,
    activeCampaigns: 0,
    conversionRate: 0,
    avgDealValue: 0,
    totalRevenue: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      // Load leads stats
      const { data: leadsData } = await supabase
        .from('leads')
        .select('lead_status, estimated_value, created_at');

      const totalLeads = leadsData?.length || 0;
      const newLeads = leadsData?.filter(l => l.lead_status === 'new')?.length || 0;
      const convertedLeads = leadsData?.filter(l => l.lead_status === 'converted')?.length || 0;
      const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
      
      const totalRevenue = leadsData
        ?.filter(l => l.lead_status === 'converted')
        ?.reduce((sum, l) => sum + (l.estimated_value || 0), 0) || 0;
      
      const avgDealValue = convertedLeads > 0 ? totalRevenue / convertedLeads : 0;

      // Load appointments stats
      const { data: appointmentsData } = await supabase
        .from('appointments')
        .select('scheduled_at, status')
        .eq('client_id', user?.id);

      const totalAppointments = appointmentsData?.length || 0;
      const upcomingAppointments = appointmentsData?.filter(a => 
        new Date(a.scheduled_at) > new Date() && a.status !== 'cancelled'
      )?.length || 0;

      // Load messages stats
      const { data: messagesData } = await supabase
        .from('messages')
        .select('is_read')
        .eq('recipient_id', user?.id);

      const unreadMessages = messagesData?.filter(m => !m.is_read)?.length || 0;

      // Load campaigns stats
      const { data: campaignsData } = await supabase
        .from('email_campaigns')
        .select('status')
        .in('status', ['scheduled', 'sending']);

      const activeCampaigns = campaignsData?.length || 0;

      setStats({
        totalLeads,
        newLeads,
        convertedLeads,
        totalAppointments,
        upcomingAppointments,
        unreadMessages,
        activeCampaigns,
        conversionRate,
        avgDealValue,
        totalRevenue
      });

      // Generate mock recent activity (in real app, this would come from an activity log)
      const mockActivity: RecentActivity[] = [
        {
          id: '1',
          type: 'lead_created',
          description: 'New lead: John Smith - Interested in downtown properties',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          type: 'appointment_scheduled',
          description: 'Appointment scheduled with Sarah Johnson for property viewing',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          type: 'message_sent',
          description: 'Follow-up message sent to Mike Davis',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '4',
          type: 'lead_converted',
          description: 'Lead converted: Lisa Wilson purchased luxury condo',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
        }
      ];

      setRecentActivity(mockActivity);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
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

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'lead_created':
        return <Target className="h-4 w-4 text-blue-500" />;
      case 'appointment_scheduled':
        return <Calendar className="h-4 w-4 text-green-500" />;
      case 'message_sent':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'lead_converted':
        return <DollarSign className="h-4 w-4 text-emerald-500" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{stats.totalLeads}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {stats.newLeads} new
                  </Badge>
                </div>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</p>
                <Progress value={stats.conversionRate} className="mt-2 h-2" />
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-xs text-muted-foreground">
                  Avg: {formatCurrency(stats.avgDealValue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Appointments</p>
                <p className="text-2xl font-bold">{stats.upcomingAppointments}</p>
                <p className="text-xs text-muted-foreground">
                  {stats.totalAppointments} total
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => navigate('/crm/leads')}
            >
              <Target className="h-6 w-6" />
              <span className="text-sm">New Lead</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => navigate('/crm/appointments')}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Schedule</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => navigate('/crm/messages')}
            >
              <MessageSquare className="h-6 w-6" />
              <div className="text-center">
                <div className="text-sm">Messages</div>
                {stats.unreadMessages > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {stats.unreadMessages}
                  </Badge>
                )}
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => navigate('/crm/campaigns')}
            >
              <Mail className="h-6 w-6" />
              <div className="text-center">
                <div className="text-sm">Campaign</div>
                {stats.activeCampaigns > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {stats.activeCampaigns} active
                  </Badge>
                )}
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                <div>
                  <p className="font-medium">New</p>
                  <p className="text-sm text-muted-foreground">{stats.newLeads} leads</p>
                </div>
                <Badge variant="destructive">{stats.newLeads}</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <div>
                  <p className="font-medium">Qualified</p>
                  <p className="text-sm text-muted-foreground">In progress</p>
                </div>
                <Badge variant="secondary">3</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div>
                  <p className="font-medium">Converted</p>
                  <p className="text-sm text-muted-foreground">{stats.convertedLeads} closed</p>
                </div>
                <Badge variant="default">{stats.convertedLeads}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.description}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        {formatTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};