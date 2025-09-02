import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Users, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Target, 
  Star, 
  Clock,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Zap,
  Filter,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash,
  Send,
  FileText,
  Upload,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useLeads } from '@/hooks/useLeads';
import { useToast } from '@/hooks/use-toast';

interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  action_items: string[];
  related_leads: string[];
  created_at: string;
}

interface CommunicationTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'call_script';
  subject?: string;
  content: string;
  variables: string[];
  usage_count: number;
  effectiveness_score: number;
}

interface LeadScoringMetric {
  lead_id: string;
  score: number;
  factors: {
    engagement: number;
    budget_match: number;
    timeline: number;
    authority: number;
    need: number;
  };
  predicted_close_probability: number;
  recommended_actions: string[];
  next_best_action: string;
}

export const AIPoweredCRM: React.FC = () => {
  const { toast } = useToast();
  const { leads, loading, createLead } = useLeads();
  
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [leadScoring, setLeadScoring] = useState<LeadScoringMetric[]>([]);
  const [templates, setTemplates] = useState<CommunicationTemplate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewLeadDialog, setShowNewLeadDialog] = useState(false);

  // Mock AI insights data
  const mockInsights: AIInsight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'High-Value Lead Ready to Close',
      description: 'Maria Rodriguez shows strong buying signals and has been viewing luxury properties consistently.',
      confidence: 92,
      priority: 'high',
      action_items: [
        'Schedule showing for luxury condos downtown',
        'Prepare financing pre-approval documents',
        'Share market analysis report'
      ],
      related_leads: ['lead-1'],
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      type: 'risk',
      title: 'Lead Going Cold',
      description: 'John Chen hasn\'t responded to communications in 7 days. Risk of losing this opportunity.',
      confidence: 78,
      priority: 'urgent',
      action_items: [
        'Send personalized follow-up email',
        'Try alternative contact method (phone)',
        'Offer virtual property tour'
      ],
      related_leads: ['lead-2'],
      created_at: '2024-01-14T15:30:00Z'
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'Cross-Sell Opportunity',
      description: 'Based on purchase history, Sarah Kim might be interested in investment properties.',
      confidence: 85,
      priority: 'medium',
      action_items: [
        'Share investment property portfolio',
        'Schedule investment consultation',
        'Provide ROI analysis'
      ],
      related_leads: ['lead-3'],
      created_at: '2024-01-13T09:15:00Z'
    }
  ];

  const mockTemplates: CommunicationTemplate[] = [
    {
      id: '1',
      name: 'Initial Contact - Luxury Properties',
      type: 'email',
      subject: 'Exclusive Luxury Properties in {{city}}',
      content: `Hi {{first_name}},\n\nI noticed you're interested in luxury properties in {{city}}. I have some exclusive listings that match your criteria perfectly.\n\nWould you be available for a private showing this {{preferred_day}}?\n\nBest regards,\n{{agent_name}}`,
      variables: ['first_name', 'city', 'preferred_day', 'agent_name'],
      usage_count: 156,
      effectiveness_score: 68
    },
    {
      id: '2',
      name: 'Follow-up - Investment Opportunity',
      type: 'email',
      subject: 'Investment Opportunity - {{property_type}} with {{roi}}% ROI',
      content: `Hello {{first_name}},\n\nFollowing up on our conversation about investment opportunities. I found a {{property_type}} that offers {{roi}}% ROI in the first year.\n\nKey highlights:\n- Prime location in {{neighborhood}}\n- Expected appreciation: {{appreciation}}%\n- Rental yield: {{rental_yield}}%\n\nShall we schedule a time to discuss this further?\n\nBest,\n{{agent_name}}`,
      variables: ['first_name', 'property_type', 'roi', 'neighborhood', 'appreciation', 'rental_yield', 'agent_name'],
      usage_count: 89,
      effectiveness_score: 74
    }
  ];

  useEffect(() => {
    setAIInsights(mockInsights);
    setTemplates(mockTemplates);
    generateLeadScoring();
  }, [leads]);

  const generateLeadScoring = () => {
    const scoring: LeadScoringMetric[] = leads.map(lead => ({
      lead_id: lead.id,
      score: Math.floor(Math.random() * 40) + 60, // 60-100 score range
      factors: {
        engagement: Math.random() * 100,
        budget_match: Math.random() * 100,
        timeline: Math.random() * 100,
        authority: Math.random() * 100,
        need: Math.random() * 100
      },
      predicted_close_probability: Math.random() * 100,
      recommended_actions: [
        'Schedule follow-up call',
        'Send property recommendations',
        'Share market analysis'
      ],
      next_best_action: 'Schedule property viewing'
    }));
    setLeadScoring(scoring);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPriorityColor = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-blue-600 bg-blue-100';
      case 'low': return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = searchTerm === '' || 
      lead.contact_info?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact_info?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || lead.lead_status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleSendTemplate = async (leadId: string, templateId: string) => {
    // Here you would integrate with email service
    toast({
      title: "Message Sent",
      description: "Template message has been sent successfully"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            AI-Powered CRM
          </h1>
          <p className="text-muted-foreground">
            Intelligent lead management with AI insights and automation
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button onClick={() => setShowNewLeadDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* AI Insights Banner */}
      <Card className="border-0 shadow-card bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Today's AI Insights</h3>
                <p className="text-muted-foreground mb-4">
                  {aiInsights.length} new insights generated from your lead data
                </p>
                <div className="flex flex-wrap gap-2">
                  {aiInsights.slice(0, 3).map((insight) => (
                    <Badge key={insight.id} className={`${getPriorityColor(insight.priority)} border-0`}>
                      {insight.title}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="outline">
              View All Insights
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search leads by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pipeline">Lead Pipeline</TabsTrigger>
          <TabsTrigger value="scoring">AI Scoring</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lead List */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Lead Pipeline
                    <Badge variant="secondary">{filteredLeads.length} leads</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <AnimatePresence>
                      {filteredLeads.map((lead, index) => {
                        const leadScore = leadScoring.find(s => s.lead_id === lead.id);
                        return (
                          <motion.div
                            key={lead.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-all cursor-pointer ${
                              selectedLead === lead.id ? 'bg-primary/5 border-primary/30' : ''
                            }`}
                            onClick={() => setSelectedLead(lead.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <Avatar>
                                  <AvatarFallback>
                                    {lead.contact_info?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold">{lead.contact_info?.name || 'Unknown'}</h4>
                                    <Badge variant="outline" className="text-xs">
                                      {lead.lead_status}
                                    </Badge>
                                  </div>
                                  <div className="space-y-1 text-sm text-muted-foreground">
                                    {lead.contact_info?.email && (
                                      <div className="flex items-center gap-1">
                                        <Mail className="w-3 h-3" />
                                        {lead.contact_info.email}
                                      </div>
                                    )}
                                    {lead.contact_info?.phone && (
                                      <div className="flex items-center gap-1">
                                        <Phone className="w-3 h-3" />
                                        {lead.contact_info.phone}
                                      </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                      <DollarSign className="w-3 h-3" />
                                      {lead.estimated_value ? `$${lead.estimated_value.toLocaleString()}` : 'No budget set'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {leadScore && (
                                  <Badge className={`${getScoreColor(leadScore.score)} text-xs`}>
                                    {leadScore.score}
                                  </Badge>
                                )}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                      <MoreVertical className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Edit className="w-4 h-4 mr-2" />
                                      Edit Lead
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <MessageSquare className="w-4 h-4 mr-2" />
                                      Send Message
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Calendar className="w-4 h-4 mr-2" />
                                      Schedule Meeting
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash className="w-4 h-4 mr-2" />
                                      Delete Lead
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lead Details Sidebar */}
            <div>
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Lead Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedLead ? (
                    <div className="space-y-6">
                      {(() => {
                        const lead = leads.find(l => l.id === selectedLead);
                        const leadScore = leadScoring.find(s => s.lead_id === selectedLead);
                        if (!lead) return <div>Lead not found</div>;
                        
                        return (
                          <>
                            {/* Lead Score */}
                            {leadScore && (
                              <div>
                                <h4 className="font-medium mb-3">AI Lead Score</h4>
                                <div className="text-center mb-4">
                                  <div className={`text-3xl font-bold ${getScoreColor(leadScore.score).split(' ')[0]}`}>
                                    {leadScore.score}
                                  </div>
                                  <div className="text-sm text-muted-foreground">out of 100</div>
                                </div>
                                
                                <div className="space-y-2">
                                  {Object.entries(leadScore.factors).map(([factor, value]) => (
                                    <div key={factor} className="space-y-1">
                                      <div className="flex justify-between text-sm">
                                        <span className="capitalize">{factor.replace('_', ' ')}</span>
                                        <span>{value.toFixed(0)}%</span>
                                      </div>
                                      <Progress value={value} className="h-2" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Next Best Action */}
                            {leadScore && (
                              <div>
                                <h4 className="font-medium mb-3">Recommended Actions</h4>
                                <div className="space-y-2">
                                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Target className="w-4 h-4 text-primary" />
                                      <span className="font-medium text-sm">Next Best Action</span>
                                    </div>
                                    <p className="text-sm">{leadScore.next_best_action}</p>
                                  </div>
                                  
                                  <div className="space-y-1">
                                    {leadScore.recommended_actions.map((action, index) => (
                                      <div key={index} className="flex items-center gap-2 text-sm">
                                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                                        {action}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Quick Actions */}
                            <div>
                              <h4 className="font-medium mb-3">Quick Actions</h4>
                              <div className="space-y-2">
                                <Button size="sm" className="w-full justify-start">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Send Email
                                </Button>
                                <Button size="sm" variant="outline" className="w-full justify-start">
                                  <Phone className="w-4 h-4 mr-2" />
                                  Schedule Call
                                </Button>
                                <Button size="sm" variant="outline" className="w-full justify-start">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Book Meeting
                                </Button>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        Select a lead to view details and AI recommendations
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scoring" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                AI Lead Scoring Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {leadScoring.length > 0 ? Math.round(leadScoring.reduce((sum, s) => sum + s.score, 0) / leadScoring.length) : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Lead Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {leadScoring.filter(s => s.score >= 80).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Hot Leads (80+)</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {leadScoring.length > 0 ? Math.round(leadScoring.reduce((sum, s) => sum + s.predicted_close_probability, 0) / leadScoring.length) : 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Close Probability</div>
                </div>
              </div>

              <div className="space-y-4">
                {leadScoring
                  .sort((a, b) => b.score - a.score)
                  .map((scoring, index) => {
                    const lead = leads.find(l => l.id === scoring.lead_id);
                    if (!lead) return null;

                    return (
                      <motion.div
                        key={scoring.lead_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${getScoreColor(scoring.score).split(' ')[0]}`}>
                              {scoring.score}
                            </div>
                            <div className="text-xs text-muted-foreground">Score</div>
                          </div>
                          <div>
                            <div className="font-semibold">{lead.contact_info?.name || 'Unknown'}</div>
                            <div className="text-sm text-muted-foreground">{lead.contact_info?.email}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="font-medium">{scoring.predicted_close_probability.toFixed(0)}%</div>
                            <div className="text-xs text-muted-foreground">Close Prob</div>
                          </div>
                          <Badge className={`${getScoreColor(scoring.score)}`}>
                            {scoring.score >= 90 ? 'Hot' : 
                             scoring.score >= 70 ? 'Warm' : 
                             scoring.score >= 50 ? 'Cool' : 'Cold'}
                          </Badge>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-card hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          insight.type === 'opportunity' ? 'bg-green-100 text-green-600' :
                          insight.type === 'risk' ? 'bg-red-100 text-red-600' :
                          insight.type === 'recommendation' ? 'bg-blue-100 text-blue-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {insight.type === 'opportunity' ? <TrendingUp className="w-5 h-5" /> :
                           insight.type === 'risk' ? <Target className="w-5 h-5" /> :
                           insight.type === 'recommendation' ? <Brain className="w-5 h-5" /> :
                           <Star className="w-5 h-5" />}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`text-xs ${getPriorityColor(insight.priority)}`}>
                              {insight.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {insight.confidence}% confidence
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{insight.description}</p>
                    
                    <div>
                      <h5 className="font-medium mb-2">Recommended Actions:</h5>
                      <ul className="space-y-1">
                        {insight.action_items.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">
                        {new Date(insight.created_at).toLocaleDateString()}
                      </span>
                      <Button size="sm">
                        Take Action
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Communication Templates
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{template.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {template.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Used {template.usage_count} times
                          </span>
                          <span className="text-xs text-green-600">
                            {template.effectiveness_score}% effective
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Template
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="w-4 h-4 mr-2" />
                            Use Template
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {template.subject && (
                      <div className="mb-2">
                        <span className="text-sm font-medium">Subject: </span>
                        <span className="text-sm text-muted-foreground">{template.subject}</span>
                      </div>
                    )}
                    
                    <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                      {template.content.substring(0, 200)}
                      {template.content.length > 200 && '...'}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-wrap gap-1">
                        {template.variables.slice(0, 4).map((variable) => (
                          <Badge key={variable} variant="secondary" className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                        {template.variables.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.variables.length - 4} more
                          </Badge>
                        )}
                      </div>
                      <Button size="sm" variant="outline">
                        Use Template
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div className="text-center py-12">
            <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Marketing Automation</h3>
            <p className="text-muted-foreground mb-6">
              Set up automated workflows, drip campaigns, and lead nurturing sequences.
            </p>
            <Button>
              Create Automation Workflow
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Lead Dialog */}
      <Dialog open={showNewLeadDialog} onOpenChange={setShowNewLeadDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Lead name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="lead@example.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="Phone number" />
            </div>
            <div>
              <Label htmlFor="source">Lead Source</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="advertising">Advertising</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowNewLeadDialog(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1">
                Add Lead
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};