import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Navigation validation component to ensure all routes are working
const NavigationValidator = () => {
  const location = useLocation();
  const [validationResults, setValidationResults] = useState<Record<string, boolean>>({});

  // All routes that should be available
  const allRoutes = [
    '/',
    '/auth',
    '/services',
    '/agents',
    '/properties',
    '/insights',
    '/about', 
    '/contact',
    '/commercial-real-estate',
    '/residential-properties',
    '/international-services',
    '/concierge-services',
    '/investment-advisory',
    '/businesses',
    '/join-team',
    '/commission-structure',
    '/agent-packages',
    '/training-programs',
    '/agent-resources',
    '/global-presence',
    '/careers',
    '/press-media',
    '/legal-documents',
    '/privacy',
    '/terms',
    '/franchise',
    '/help',
    '/leadership',
    '/blog',
    '/news',
    '/ai-search',
    '/dashboard',
    '/calculator',
    '/messages',
    '/appointments',
    '/admin',
    '/analytics',
    '/leads',
    '/campaigns',
    '/recommendations',
    '/agent-dashboard',
    '/ai-crm',
    '/video-calls',
    '/advanced-search',
    '/advanced-analytics',
    '/list-business'
  ];

  // Navigation menu items that should match routes
  const navigationItems = [
    { name: 'Properties', href: '/properties' },
    { name: 'Businesses', href: '/businesses' },
    { name: 'Services', href: '/services' },
    { name: 'Market Insights', href: '/insights' },
    { name: 'Franchise with Us', href: '/franchise' },
  ];

  const agentItems = [
    { name: 'Find an Agent', href: '/agents' },
    { name: 'Join as Agent', href: '/join-team' },
  ];

  const moreServicesItems = [
    { name: 'Concierge Services', href: '/concierge-services' },
    { name: 'Investment Advisory', href: '/investment-advisory' },
    { name: 'International Services', href: '/international-services' },
  ];

  const footerLinks = {
    Services: [
      { name: "Business Brokerage", href: "/businesses" },
      { name: "Commercial Real Estate", href: "/commercial-real-estate" },
      { name: "Residential Properties", href: "/residential-properties" },
      { name: "International Services", href: "/international-services" },
      { name: "Concierge Services", href: "/concierge-services" }
    ],
    "For Agents": [
      { name: "Join Our Team", href: "/join-team" },
      { name: "Commission Structure", href: "/commission-structure" },
      { name: "Agent Packages", href: "/agent-packages" },
      { name: "Training Programs", href: "/training-programs" },
      { name: "Agent Resources", href: "/agent-resources" }
    ],
    Company: [
      { name: "About Grupo Sineva", href: "/about" },
      { name: "Leadership Team", href: "/leadership" },
      { name: "Global Presence", href: "/global-presence" },
      { name: "Careers", href: "/careers" },
      { name: "Press & Media", href: "/press-media" }
    ],
    Support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "/help" },
      { name: "Legal Documents", href: "/legal-documents" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" }
    ]
  };

  useEffect(() => {
    // Validate all navigation links
    const allNavigationLinks = [
      ...navigationItems,
      ...agentItems,
      ...moreServicesItems,
      ...Object.values(footerLinks).flat()
    ];

    const results: Record<string, boolean> = {};
    
    // Check if all navigation links have corresponding routes
    allNavigationLinks.forEach(link => {
      results[link.href] = allRoutes.includes(link.href);
    });

    setValidationResults(results);

    // Log validation results in development
    if (process.env.NODE_ENV === 'development') {
      const broken = Object.entries(results).filter(([_, isValid]) => !isValid);
      if (broken.length > 0) {
        console.warn('🚨 Navigation Validation: Broken links found:', broken);
      } else {
        console.log('✅ Navigation Validation: All links are valid');
      }
    }
  }, []);

  // Only render validation info in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const brokenLinks = Object.entries(validationResults).filter(([_, isValid]) => !isValid);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-card border border-border rounded-lg p-4 shadow-lg text-sm max-w-sm">
      <h3 className="font-semibold text-foreground mb-2">Navigation Status</h3>
      <div className="space-y-1">
        <div className="text-green-600">
          ✅ Valid Links: {Object.values(validationResults).filter(Boolean).length}
        </div>
        {brokenLinks.length > 0 && (
          <div className="text-red-600">
            ❌ Broken Links: {brokenLinks.length}
            <details className="mt-1">
              <summary className="cursor-pointer">Show details</summary>
              <ul className="text-xs mt-1 space-y-1">
                {brokenLinks.map(([href]) => (
                  <li key={href} className="text-red-500">• {href}</li>
                ))}
              </ul>
            </details>
          </div>
        )}
        <div className="text-muted-foreground text-xs pt-1 border-t">
          Current: {location.pathname}
        </div>
      </div>
    </div>
  );
};

export default NavigationValidator;