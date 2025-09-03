import React from 'react';
import { Users, MessageSquare, Calendar, Mail, BarChart3, Target, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CRMLayoutProps {
  children: React.ReactNode;
}

export const CRMLayout: React.FC<CRMLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      title: 'CRM Dashboard',
      href: '/crm',
      icon: BarChart3,
      description: 'Overview and analytics'
    },
    {
      title: 'Leads Pipeline',
      href: '/crm/leads',
      icon: Target,
      description: 'Lead management and tracking'
    },
    {
      title: 'Messages',
      href: '/crm/messages',
      icon: MessageSquare,
      description: 'Client communications'
    },
    {
      title: 'Appointments',
      href: '/crm/appointments',
      icon: Calendar,
      description: 'Schedule and manage meetings'
    },
    {
      title: 'Email Campaigns',
      href: '/crm/campaigns',
      icon: Mail,
      description: 'Marketing automation'
    },
    {
      title: 'Client Profiles',
      href: '/crm/clients',
      icon: Users,
      description: 'Customer relationship management'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Customer Relationship Management</h1>
          <p className="text-muted-foreground">Manage leads, communications, and client relationships</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    
                    return (
                      <Button
                        key={item.href}
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start h-auto p-3",
                          !isActive && "hover:bg-accent"
                        )}
                        onClick={() => navigate(item.href)}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="h-5 w-5 mt-0.5 shrink-0" />
                          <div className="text-left">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};