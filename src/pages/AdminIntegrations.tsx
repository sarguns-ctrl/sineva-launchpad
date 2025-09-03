import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import SEOHead from '@/components/SEOHead';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Database, 
  Mail, 
  Zap, 
  MessageSquare, 
  BarChart3, 
  CreditCard,
  Globe,
  Settings,
  ExternalLink
} from 'lucide-react';

const integrations = [
  {
    id: 'zapier',
    name: 'Zapier',
    icon: Zap,
    description: 'Automate workflows and connect with 5000+ apps',
    status: 'available',
    category: 'Automation'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    icon: Mail,
    description: 'Email marketing and newsletter management',
    status: 'available',
    category: 'Marketing'
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    icon: BarChart3,
    description: 'Track website traffic and user behavior',
    status: 'connected',
    category: 'Analytics'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: CreditCard,
    description: 'Payment processing and subscription management',
    status: 'available',
    category: 'Payments'
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: MessageSquare,
    description: 'Team notifications and alerts',
    status: 'available',
    category: 'Communication'
  },
  {
    id: 'webhook',
    name: 'Custom Webhooks',
    icon: Globe,
    description: 'Send data to external services via HTTP',
    status: 'connected',
    category: 'Custom'
  }
];

const AdminIntegrations = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-500">Connected</Badge>;
      case 'available':
        return <Badge variant="outline">Available</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const groupedIntegrations = integrations.reduce((acc, integration) => {
    if (!acc[integration.category]) {
      acc[integration.category] = [];
    }
    acc[integration.category].push(integration);
    return acc;
  }, {} as Record<string, typeof integrations>);

  return (
    <RoleProtectedRoute allowedRoles={['admin']}>
      <SEOHead 
        title="Integrations - Admin Dashboard | Grupo Sineva"
        description="Manage third-party integrations, APIs, and webhook configurations."
      />
      <AdminLayout title="Integrations & APIs">
        <div className="space-y-8">
          {Object.entries(groupedIntegrations).map(([category, categoryIntegrations]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-semibold">{category}</h2>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryIntegrations.map((integration) => {
                  const Icon = integration.icon;
                  
                  return (
                    <Card key={integration.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{integration.name}</CardTitle>
                            </div>
                          </div>
                          {getStatusBadge(integration.status)}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {integration.description}
                        </p>
                        
                        {integration.status === 'connected' ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm">Active</Label>
                              <Switch checked defaultChecked />
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Settings className="h-4 w-4 mr-2" />
                                Configure
                              </Button>
                              <Button variant="destructive" size="sm">
                                Disconnect
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button className="w-full">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Custom Webhook Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Webhook Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input 
                    id="webhook-url"
                    placeholder="https://your-app.com/webhook"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="webhook-secret">Secret Key</Label>
                  <Input 
                    id="webhook-secret"
                    type="password"
                    placeholder="Enter webhook secret"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Events to Send</Label>
                <div className="mt-2 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    'property.created',
                    'property.updated', 
                    'lead.created',
                    'business.approved',
                    'user.registered',
                    'appointment.scheduled'
                  ].map((event) => (
                    <div key={event} className="flex items-center space-x-2">
                      <Switch id={event} />
                      <Label htmlFor={event} className="text-sm">
                        {event}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Test Webhook</Button>
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </RoleProtectedRoute>
  );
};

export default AdminIntegrations;