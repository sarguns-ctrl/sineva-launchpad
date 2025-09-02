import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calculator, Calendar, MessageSquare, Heart, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const QuickActions: React.FC = () => {
  const quickActions = [
    {
      href: '/search',
      icon: Search,
      title: 'Property Search',
      description: 'Find your perfect property'
    },
    {
      href: '/calculator',
      icon: Calculator,
      title: 'Mortgage Calculator',
      description: 'Calculate monthly payments'
    },
    {
      href: '/appointments',
      icon: Calendar,
      title: 'Schedule Viewing',
      description: 'Book property appointments'
    },
    {
      href: '/messages',
      icon: MessageSquare,
      title: 'Messages',
      description: 'Chat with agents'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.href}
              variant="outline"
              className="h-20 flex-col gap-2 p-4"
              asChild
            >
              <Link to={action.href}>
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};