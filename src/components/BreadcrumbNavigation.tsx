import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  // Route name mapping for better display
  const routeNames: Record<string, string> = {
    'properties': 'Properties',
    'businesses': 'Businesses', 
    'services': 'Services',
    'insights': 'Market Insights',
    'franchise': 'Franchise with Us',
    'agents': 'Agents',
    'join-team': 'Join Team',
    'commercial-real-estate': 'Commercial Real Estate',
    'residential-properties': 'Residential Properties',
    'international-services': 'International Services',
    'concierge-services': 'Concierge Services',
    'investment-advisory': 'Investment Advisory',
    'about': 'About',
    'contact': 'Contact',
    'auth': 'Authentication',
    'dashboard': 'Dashboard',
    'help': 'Help Center',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'blog': 'Blog',
    'news': 'News',
    'careers': 'Careers',
    'leadership': 'Leadership',
    'global-presence': 'Global Presence',
    'press-media': 'Press & Media',
    'legal-documents': 'Legal Documents',
    'ai-search': 'AI Search',
    'calculator': 'Mortgage Calculator',
    'messages': 'Messages',
    'appointments': 'Appointments',
    'admin': 'Admin Dashboard',
    'analytics': 'Analytics',
    'leads': 'Lead Management',
    'campaigns': 'Email Campaigns',
    'recommendations': 'AI Recommendations',
    'agent-dashboard': 'Agent Dashboard',
    'ai-crm': 'AI CRM',
    'video-calls': 'Video Calls',
    'advanced-search': 'Advanced Search',
    'advanced-analytics': 'Advanced Analytics',
    'commission-structure': 'Commission Structure',
    'agent-packages': 'Agent Packages',
    'training-programs': 'Training Programs',
    'agent-resources': 'Agent Resources',
    'list-business': 'List Business'
  };

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted/30 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {pathnames.map((pathname, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              const displayName = routeNames[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);

              return (
                <React.Fragment key={routeTo}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="font-medium text-foreground">
                        {displayName}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={routeTo} className="hover:text-primary transition-colors">
                          {displayName}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;