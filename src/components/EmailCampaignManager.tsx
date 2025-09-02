import React, { useState, useEffect } from 'react';
import { Mail, Send, Users, Calendar, BarChart3, Eye, MousePointer, UserMinus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface EmailCampaign {
  id: string;
  campaign_name: string;
  campaign_type: string;
  subject_line: string;
  email_content: string;
  status: string;
  scheduled_at?: string;
  sent_at?: string;
  created_at: string;
  recipient_count?: number;
  open_rate?: number;
  click_rate?: number;
}

export const EmailCampaignManager: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Form state for creating campaigns
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'newsletter',
    subject: '',
    content: '',
    scheduledDate: '',
    scheduledTime: ''
  });

  useEffect(() => {
    if (user) {
      loadCampaigns();
    }
  }, [user]);

  const loadCampaigns = async () => {
    try {
      // Mock data since we're building the system
      const mockCampaigns: EmailCampaign[] = [
        {
          id: '1',
          campaign_name: 'New Property Listings - January',
          campaign_type: 'property_alert',
          subject_line: 'New Properties Just Listed in Your Area',
          email_content: 'Check out these amazing new properties...',
          status: 'sent',
          sent_at: '2024-01-15T10:00:00Z',
          created_at: '2024-01-14T15:00:00Z',
          recipient_count: 1250,
          open_rate: 35.6,
          click_rate: 8.2
        },
        {
          id: '2',
          campaign_name: 'Monthly Market Update',
          campaign_type: 'newsletter',
          subject_line: 'Market Trends & Investment Opportunities',
          email_content: 'Here are the latest market insights...',
          status: 'scheduled',
          scheduled_at: '2024-01-20T09:00:00Z',
          created_at: '2024-01-16T11:30:00Z',
          recipient_count: 2100
        },
        {
          id: '3',
          campaign_name: 'Follow-up Campaign',
          campaign_type: 'follow_up',
          subject_line: 'Still Looking for Your Dream Home?',
          email_content: 'We have some great options for you...',
          status: 'draft',
          created_at: '2024-01-17T14:15:00Z'
        }
      ];
      
      setCampaigns(mockCampaigns);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load email campaigns",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async () => {
    if (!newCampaign.name || !newCampaign.subject || !newCampaign.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const campaignData = {
        campaign_name: newCampaign.name,
        campaign_type: newCampaign.type,
        subject_line: newCampaign.subject,
        email_content: newCampaign.content,
        scheduled_at: newCampaign.scheduledDate && newCampaign.scheduledTime 
          ? new Date(`${newCampaign.scheduledDate}T${newCampaign.scheduledTime}`).toISOString()
          : null,
        status: newCampaign.scheduledDate ? 'scheduled' : 'draft',
        created_by: user?.id
      };

      // In a real implementation, this would save to the database
      console.log('Creating campaign:', campaignData);

      toast({
        title: "Success",
        description: "Email campaign created successfully"
      });

      setShowCreateDialog(false);
      setNewCampaign({
        name: '',
        type: 'newsletter',
        subject: '',
        content: '',
        scheduledDate: '',
        scheduledTime: ''
      });
      
      loadCampaigns();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const sendCampaign = async (campaignId: string) => {
    try {
      // In a real implementation, this would trigger the email sending process
      console.log('Sending campaign:', campaignId);

      toast({
        title: "Success",
        description: "Campaign sent successfully"
      });

      loadCampaigns();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'default';
      case 'scheduled': return 'secondary';
      case 'sending': return 'default';
      case 'draft': return 'outline';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const campaignStats = {
    total: campaigns.length,
    sent: campaigns.filter(c => c.status === 'sent').length,
    scheduled: campaigns.filter(c => c.status === 'scheduled').length,
    draft: campaigns.filter(c => c.status === 'draft').length,
    totalRecipients: campaigns.reduce((sum, c) => sum + (c.recipient_count || 0), 0),
    avgOpenRate: campaigns
      .filter(c => c.open_rate)
      .reduce((sum, c) => sum + (c.open_rate || 0), 0) / campaigns.filter(c => c.open_rate).length || 0
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading campaigns...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Mail className="h-8 w-8" />
            Email Campaign Manager
          </h1>
          <p className="text-muted-foreground">Create and manage email marketing campaigns</p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Email Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name *</Label>
                  <Input
                    id="campaign-name"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    placeholder="Monthly Newsletter"
                  />
                </div>
                <div>
                  <Label htmlFor="campaign-type">Campaign Type</Label>
                  <Select value={newCampaign.type} onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                      <SelectItem value="property_alert">Property Alert</SelectItem>
                      <SelectItem value="follow_up">Follow Up</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject Line *</Label>
                <Input
                  id="subject"
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                  placeholder="Your Dream Home Awaits..."
                />
              </div>

              <div>
                <Label htmlFor="content">Email Content *</Label>
                <Textarea
                  id="content"
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
                  placeholder="Write your email content here..."
                  rows={8}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheduled-date">Schedule Date (Optional)</Label>
                  <Input
                    id="scheduled-date"
                    type="date"
                    value={newCampaign.scheduledDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, scheduledDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="scheduled-time">Schedule Time</Label>
                  <Input
                    id="scheduled-time"
                    type="time"
                    value={newCampaign.scheduledTime}
                    onChange={(e) => setNewCampaign({ ...newCampaign, scheduledTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={createCampaign} className="flex-1">
                  {newCampaign.scheduledDate ? 'Schedule Campaign' : 'Save as Draft'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setNewCampaign({ ...newCampaign, scheduledDate: '', scheduledTime: '' });
                    createCampaign();
                  }}
                >
                  Save Draft
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaign Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{campaignStats.total}</div>
            <p className="text-sm text-muted-foreground">Total Campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{campaignStats.sent}</div>
            <p className="text-sm text-muted-foreground">Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{campaignStats.scheduled}</div>
            <p className="text-sm text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">{campaignStats.draft}</div>
            <p className="text-sm text-muted-foreground">Drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{campaignStats.totalRecipients.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Recipients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{campaignStats.avgOpenRate.toFixed(1)}%</div>
            <p className="text-sm text-muted-foreground">Avg. Open Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{campaign.campaign_name}</h3>
                        <Badge variant={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {campaign.campaign_type.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        <strong>Subject:</strong> {campaign.subject_line}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Created: {formatDate(campaign.created_at)}
                        </div>
                        {campaign.scheduled_at && (
                          <div className="flex items-center gap-1">
                            <Send className="h-4 w-4" />
                            Scheduled: {formatDate(campaign.scheduled_at)}
                          </div>
                        )}
                        {campaign.sent_at && (
                          <div className="flex items-center gap-1">
                            <Send className="h-4 w-4" />
                            Sent: {formatDate(campaign.sent_at)}
                          </div>
                        )}
                        {campaign.recipient_count && (
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {campaign.recipient_count.toLocaleString()} recipients
                          </div>
                        )}
                      </div>

                      {campaign.status === 'sent' && campaign.open_rate && campaign.click_rate && (
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{campaign.open_rate}% open rate</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MousePointer className="h-4 w-4" />
                            <span>{campaign.click_rate}% click rate</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      {campaign.status === 'draft' && (
                        <>
                          <Button size="sm" onClick={() => sendCampaign(campaign.id)}>
                            <Send className="h-4 w-4 mr-2" />
                            Send Now
                          </Button>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </>
                      )}
                      {campaign.status === 'scheduled' && (
                        <>
                          <Button size="sm" variant="outline">
                            Edit Schedule
                          </Button>
                          <Button size="sm" variant="destructive">
                            Cancel
                          </Button>
                        </>
                      )}
                      {campaign.status === 'sent' && (
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {campaigns.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
                  <p className="text-muted-foreground">Create your first email campaign to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Templates</h3>
                <p className="text-muted-foreground mb-4">
                  Create reusable email templates for your campaigns
                </p>
                <Button>Create Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Open Rate</span>
                    <span>35.6%</span>
                  </div>
                  <Progress value={35.6} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Click Rate</span>
                    <span>8.2%</span>
                  </div>
                  <Progress value={8.2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Unsubscribe Rate</span>
                    <span>0.5%</span>
                  </div>
                  <Progress value={0.5} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Property Alert Campaign</p>
                      <p className="text-sm text-muted-foreground">Sent to 1,250 subscribers</p>
                    </div>
                    <Badge variant="default">Sent</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Market Update Newsletter</p>
                      <p className="text-sm text-muted-foreground">Scheduled for tomorrow</p>
                    </div>
                    <Badge variant="secondary">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle>Subscriber Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Subscriber Management</h3>
                <p className="text-muted-foreground mb-4">
                  Manage your email subscribers and mailing lists
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold">2,487</div>
                    <p className="text-sm text-muted-foreground">Total Subscribers</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-sm text-muted-foreground">New This Month</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">23</div>
                    <p className="text-sm text-muted-foreground">Unsubscribed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};