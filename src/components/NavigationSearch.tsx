import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface SearchResult {
  title: string;
  href: string;
  description: string;
  category: string;
}

const NavigationSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search data
  const searchData: SearchResult[] = [
    // Properties & Businesses
    { title: 'Properties', href: '/properties', description: 'Browse all available properties', category: 'Main' },
    { title: 'Businesses', href: '/businesses', description: 'Business brokerage and opportunities', category: 'Main' },
    { title: 'Commercial Real Estate', href: '/commercial-real-estate', description: 'Office buildings, retail spaces, industrial properties', category: 'Services' },
    { title: 'Residential Properties', href: '/residential-properties', description: 'Luxury homes and residential investments', category: 'Services' },
    
    // Services
    { title: 'Services', href: '/services', description: 'All our real estate services', category: 'Main' },
    { title: 'International Services', href: '/international-services', description: 'Cross-border transactions and investments', category: 'Services' },
    { title: 'Concierge Services', href: '/concierge-services', description: 'Complete support from acquisition to settlement', category: 'Services' },
    { title: 'Investment Advisory', href: '/investment-advisory', description: 'Expert guidance on investment opportunities', category: 'Services' },
    
    // Agents & Team
    { title: 'Find an Agent', href: '/agents', description: 'Connect with our professional agents', category: 'Agents' },
    { title: 'Join Our Team', href: '/join-team', description: 'Career opportunities with Sineva', category: 'Agents' },
    { title: 'Commission Structure', href: '/commission-structure', description: 'Agent compensation details', category: 'Agents' },
    { title: 'Agent Packages', href: '/agent-packages', description: 'Support packages for agents', category: 'Agents' },
    { title: 'Training Programs', href: '/training-programs', description: 'Professional development programs', category: 'Agents' },
    { title: 'Agent Resources', href: '/agent-resources', description: 'Tools and resources for agents', category: 'Agents' },
    
    // Company & Info
    { title: 'About Us', href: '/about', description: 'Learn about Grupo Sineva', category: 'Company' },
    { title: 'Contact', href: '/contact', description: 'Get in touch with our team', category: 'Company' },
    { title: 'Leadership', href: '/leadership', description: 'Meet our leadership team', category: 'Company' },
    { title: 'Global Presence', href: '/global-presence', description: 'Our international locations', category: 'Company' },
    { title: 'Careers', href: '/careers', description: 'Job opportunities', category: 'Company' },
    
    // Tools & Features
    { title: 'AI Search', href: '/ai-search', description: 'Intelligent property search', category: 'Tools' },
    { title: 'Mortgage Calculator', href: '/calculator', description: 'Calculate your mortgage payments', category: 'Tools' },
    { title: 'Dashboard', href: '/dashboard', description: 'Your personal dashboard', category: 'Account' },
    { title: 'Messages', href: '/messages', description: 'Communication center', category: 'Account' },
    { title: 'Appointments', href: '/appointments', description: 'Schedule and manage appointments', category: 'Account' },
    
    // Business
    { title: 'List Business', href: '/list-business', description: 'List your business for sale', category: 'Business' },
    { title: 'Franchise with Us', href: '/franchise', description: 'Franchise opportunities', category: 'Main' },
    
    // Support
    { title: 'Help Center', href: '/help', description: 'Get support and answers', category: 'Support' },
    { title: 'Blog', href: '/blog', description: 'Latest articles and insights', category: 'Content' },
    { title: 'News', href: '/news', description: 'Company and industry news', category: 'Content' },
    { title: 'Press & Media', href: '/press-media', description: 'Media resources and press releases', category: 'Company' },
  ];

  // Filter results based on query
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8); // Limit to 8 results

    setResults(filtered);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (href: string) => {
    navigate(href);
    setIsOpen(false);
    setQuery('');
  };

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <div ref={searchRef} className="relative">
      {/* Search Trigger */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Search className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex ml-2 pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Search Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" />
          
          {/* Search Dialog */}
          <Card className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4 z-50 bg-card border shadow-elegant">
            <div className="p-4">
              {/* Search Input */}
              <div className="flex items-center space-x-3 pb-3 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, services, tools..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                  autoComplete="off"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="p-1 h-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {results.length === 0 && query.length >= 2 && (
                  <div className="py-8 text-center text-muted-foreground">
                    <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No results found for "{query}"</p>
                  </div>
                )}

                {results.length === 0 && query.length < 2 && (
                  <div className="py-6 text-center text-muted-foreground">
                    <p className="text-sm">Start typing to search pages and services...</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div>• Properties</div>
                      <div>• Services</div>
                      <div>• Agents</div>
                      <div>• Tools</div>
                    </div>
                  </div>
                )}

                {Object.entries(groupedResults).map(([category, categoryResults]) => (
                  <div key={category} className="py-2">
                    <div className="text-xs font-medium text-muted-foreground px-3 py-2 uppercase tracking-wider">
                      {category}
                    </div>
                    {categoryResults.map((result, index) => (
                      <button
                        key={`${category}-${index}`}
                        onClick={() => handleSelect(result.href)}
                        className="w-full text-left px-3 py-2 hover:bg-accent/50 transition-colors rounded-md mx-1 group"
                      >
                        <div className="font-medium text-sm group-hover:text-accent transition-colors">
                          {result.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {result.description}
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              {/* Footer */}
              {results.length > 0 && (
                <div className="border-t border-border pt-3 mt-3 text-xs text-muted-foreground flex items-center justify-between">
                  <span>Press Enter to navigate</span>
                  <span>ESC to close</span>
                </div>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default NavigationSearch;