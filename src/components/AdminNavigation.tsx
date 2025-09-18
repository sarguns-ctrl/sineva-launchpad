import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BarChart3, Users, MessageSquare, Mail, Brain, Home, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export const AdminNavigation: React.FC = () => {
  const { user } = useAuth();

  // Only show admin navigation if user exists (role checking could be added here)
  if (!user) return null;

  const adminLinks = [
    {
      href: '/admin',
      icon: Shield,
      title: 'Admin Dashboard',
      description: 'System overview and management'
    },
    {
      href: '/admin/roles',
      icon: UserCog,
      title: 'Role Management',
      description: 'Manage user roles and permissions'
    },
    {
      href: '/analytics',
      icon: BarChart3,
      title: 'Analytics',
      description: 'Platform performance insights'
    },
    {
      href: '/admin/properties',
      icon: Home,
      title: 'Property Management',
      description: 'Manage property listings'
    },
    {
      href: '/admin/blog',
      icon: MessageSquare,
      title: 'Blog Management', 
      description: 'Create and manage blog posts'
    },
    {
      href: '/campaigns',
      icon: Mail,
      title: 'Email Campaigns',
      description: 'Marketing campaign management'
    },
    {
      href: '/recommendations',
      icon: Brain,
      title: 'AI Recommendations',
      description: 'AI-powered property suggestions'
    }
  ];

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Shield className="h-5 w-5" />
          Admin Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {adminLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              className="h-auto p-4 flex flex-col items-start text-left hover:bg-primary/10"
              asChild
            >
              <Link to={link.href}>
                <div className="flex items-center gap-2 mb-1">
                  <link.icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{link.title}</span>
                </div>
                <p className="text-xs text-muted-foreground">{link.description}</p>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};