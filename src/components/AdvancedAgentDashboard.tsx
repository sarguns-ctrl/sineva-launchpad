import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Phone,
  Video,
  Star,
  Award,
  Target,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Filter,
  Search,
  Plus,
  Bell,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAgents } from '@/hooks/useAgents';
import { useLeads } from '@/hooks/useLeads';
import { useCommissions } from '@/hooks/useCommissions';
import AnimatedCounter from './AnimatedCounter';
import { RealTimeNotifications } from './RealTimeNotifications';

interface AgentPerformanceMetrics {
  agent_id: string;
  agent_name: string;
  total_sales: number;
  total_commissions: number;
  active_listings: number;
  closed_deals: number;
  conversion_rate: number;
  avg_deal_size: number;
  client_satisfaction: number;
  response_time: number;
  this_month_performance: {
    sales: number;
    leads: number;
    appointments: number;
    closings: number;
  };
}

interface TeamGoal {
  id: string;
  title: string;
  target_value: number;
  current_value: number;
  deadline: string;
  type: 'sales' | 'listings' | 'leads' | 'satisfaction';
  status: 'on_track' | 'behind' | 'achieved';
}

export const AdvancedAgentDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [performanceMetrics, setPerformanceMetrics] = useState<AgentPerformanceMetrics[]>([]);
  const [teamGoals, setTeamGoals] = useState<TeamGoal[]>([]);

  const { agents, loading: agentsLoading } = useAgents();
  const { leads, loading: leadsLoading } = useLeads();
  const { commissions, loading: commissionsLoading } = useCommissions();

  // Mock team goals data
  const mockTeamGoals: TeamGoal[] = [
    {
      id: '1',
      title: 'Q1 Sales Target',
      target_value: 5000000,
      current_value: 3250000,
      deadline: '2024-03-31',
      type: 'sales',
      status: 'on_track'
    },
    {
      id: '2',
      title: 'New Listings This Month',
      target_value: 50,
      current_value: 32,
      deadline: '2024-01-31',
      type: 'listings',
      status: 'behind'
    },
    {
      id: '3',
      title: 'Client Satisfaction Score',
      target_value: 4.8,
      current_value: 4.6,
      deadline: '2024-12-31',
      type: 'satisfaction',
      status: 'on_track'
    }
  ];

  useEffect(() => {
    setTeamGoals(mockTeamGoals);
    generatePerformanceMetrics();
  }, [agents, leads, commissions]);

  const generatePerformanceMetrics = () => {
    const metrics: AgentPerformanceMetrics[] = agents.map(agent => ({
      agent_id: agent.id,
      agent_name: agent.full_name,
      total_sales: agent.total_sales,
      total_commissions: agent.total_sales * (agent.commission_rate || 0.03),
      active_listings: agent.active_listings,
      closed_deals: Math.floor(agent.total_sales / 500000), // Estimate based on avg deal size
      conversion_rate: 2.8 + Math.random() * 2, // Mock conversion rate
      avg_deal_size: 500000 + Math.random() * 300000,
      client_satisfaction: agent.rating,
      response_time: 2 + Math.random() * 6, // Hours
      this_month_performance: {
        sales: Math.floor(agent.total_sales * 0.15),
        leads: Math.floor(Math.random() * 20) + 5,
        appointments: Math.floor(Math.random() * 15) + 3,
        closings: Math.floor(Math.random() * 8) + 1
      }
    }));
    setPerformanceMetrics(metrics);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGoalStatusColor = (status: TeamGoal['status']) => {
    switch (status) {
      case 'achieved': return 'text-green-600 bg-green-100';
      case 'on_track': return 'text-blue-600 bg-blue-100';
      case 'behind': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGoalProgress = (goal: TeamGoal) => {
    return Math.min((goal.current_value / goal.target_value) * 100, 100);
  };

  const filteredAgents = agents.filter(agent =>
    searchTerm === '' || agent.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topPerformers = performanceMetrics
    .sort((a, b) => b.total_commissions - a.total_commissions)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agent Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive agent performance and team management
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <RealTimeNotifications />
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Agent
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All agents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Agents',
            value: agents.length,
            icon: Users,
            change: '+12%',
            trend: 'up'
          },
          {
            title: 'Total Sales (YTD)',
            value: performanceMetrics.reduce((sum, m) => sum + m.total_sales, 0),
            icon: DollarSign,
            change: '+23%',
            trend: 'up',
            format: 'currency'
          },
          {
            title: 'Active Listings',
            value: performanceMetrics.reduce((sum, m) => sum + m.active_listings, 0),
            icon: TrendingUp,
            change: '+8%',
            trend: 'up'
          },
          {
            title: 'Avg Satisfaction',
            value: performanceMetrics.reduce((sum, m) => sum + m.client_satisfaction, 0) / performanceMetrics.length || 0,
            icon: Star,
            change: '+0.2',
            trend: 'up',
            format: 'decimal'
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
                      ) : metric.format === 'decimal' ? (
                        metric.value.toFixed(1)
                      ) : (
                        <AnimatedCounter end={metric.value} duration={2000} />
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs font-medium text-green-600">
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <metric.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Team Goals */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Team Goals & Objectives
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamGoals.map((goal) => (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium">{goal.title}</h4>
                  <Badge className={`text-xs ${getGoalStatusColor(goal.status)}`}>
                    {goal.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Due: {new Date(goal.deadline).toLocaleDateString()}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    {goal.type === 'sales' ? formatCurrency(goal.current_value) : goal.current_value.toLocaleString()}
                    {' of '}
                    {goal.type === 'sales' ? formatCurrency(goal.target_value) : goal.target_value.toLocaleString()}
                  </span>
                  <span className="font-medium">
                    {getGoalProgress(goal).toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={getGoalProgress(goal)} 
                  className="h-2" 
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="agents">Agent Directory</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Performers (This Month)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <motion.div
                      key={performer.agent_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback>
                              {performer.agent_name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {index < 3 && (
                            <Badge 
                              className={`absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs ${
                                index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                              }`}
                            >
                              {index + 1}
                            </Badge>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{performer.agent_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatCurrency(performer.this_month_performance.sales)} this month
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          {formatCurrency(performer.total_commissions)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Total commissions
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {performanceMetrics.length > 0 
                          ? (performanceMetrics.reduce((sum, m) => sum + m.conversion_rate, 0) / performanceMetrics.length).toFixed(1)
                          : 0
                        }%
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Conversion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {performanceMetrics.length > 0
                          ? formatCurrency(performanceMetrics.reduce((sum, m) => sum + m.avg_deal_size, 0) / performanceMetrics.length)
                          : '$0'
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Deal Size</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { label: 'Response Time', value: 4.2, unit: 'hrs', target: 2 },
                      { label: 'Client Satisfaction', value: 4.6, unit: '/5', target: 4.5 },
                      { label: 'Deal Velocity', value: 87, unit: '%', target: 90 }
                    ].map((metric, index) => (
                      <div key={metric.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{metric.label}</span>
                          <span className="font-medium">
                            {metric.value} {metric.unit}
                          </span>
                        </div>
                        <Progress 
                          value={(metric.value / metric.target) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Agent Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredAgents.map((agent, index) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="hover:shadow-elegant transition-all duration-300 cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback>
                                {agent.full_name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold">{agent.full_name}</h3>
                              <p className="text-sm text-muted-foreground">{agent.position}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{agent.rating.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Total Sales:</span>
                              <span className="font-medium">{formatCurrency(agent.total_sales)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Active Listings:</span>
                              <span className="font-medium">{agent.active_listings}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Experience:</span>
                              <span className="font-medium">{agent.years_experience || 0} years</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline" className="flex-1">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Monthly Leaderboard
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics
                  .sort((a, b) => b.this_month_performance.sales - a.this_month_performance.sales)
                  .map((agent, index) => (
                    <motion.div
                      key={agent.agent_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        index < 3 ? 'bg-gradient-to-r from-accent/10 to-primary/5 border-primary/20' : 'border-border/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{agent.agent_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {agent.this_month_performance.closings} deals closed
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          {formatCurrency(agent.this_month_performance.sales)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {agent.conversion_rate.toFixed(1)}% conversion
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground mb-6">
              Detailed performance analytics and insights will be available here.
            </p>
            <Button variant="outline">
              View Full Analytics Dashboard
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};