import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calculator, Calendar, MessageSquare, Heart, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const QuickActions: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleActionClick = (href: string, requiresAuth: boolean) => {
    if (requiresAuth && !user) {
      toast({
        title: "Login Required",
        description: "Please log in to access this feature.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    navigate(href);
  };

  const quickActions = [
    {
      href: '/search',
      icon: Search,
      title: 'Property Search',
      description: 'Find your perfect property',
      requiresAuth: false
    },
    {
      href: '/calculator',
      icon: Calculator,
      title: 'Mortgage Calculator',
      description: 'Calculate monthly payments',
      requiresAuth: false
    },
    {
      href: '/appointments',
      icon: Calendar,
      title: 'Schedule Viewing',
      description: 'Book property appointments',
      requiresAuth: true
    },
    {
      href: '/messages',
      icon: MessageSquare,
      title: 'Messages',
      description: 'Chat with agents',
      requiresAuth: true
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
              onClick={() => handleActionClick(action.href, action.requiresAuth)}
            >
              <action.icon className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};