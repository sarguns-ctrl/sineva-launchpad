import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import LanguageSwitcher from './LanguageSwitcher';
import MagneticButton from './MagneticButton';
import NavigationSearch from './NavigationSearch';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, Phone, User, LogOut, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { name: 'Properties', href: '/properties' },
    { name: 'Businesses', href: '/businesses' },
    { name: 'Franchise with Us', href: '/franchise' },
  ];

  const agentItems = [
    { name: 'Find an Agent', href: '/agents' },
    { name: 'Join as Agent', href: '/join-team' },
  ];

  const servicesItems = [
    { name: 'All Services', href: '/services' },
    { name: 'Commercial Real Estate', href: '/commercial-real-estate' },
    { name: 'Residential Properties', href: '/residential-properties' },
    { name: 'Concierge Services', href: '/concierge-services' },
    { name: 'Investment Advisory', href: '/investment-advisory' },
    { name: 'International Services', href: '/international-services' },
    { name: 'Market Insights', href: '/market-insights' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with enhanced typography */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-button group-hover:shadow-accent transition-all duration-300 group-hover:scale-110">
              <span className="text-primary-foreground font-clash font-bold text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-clash font-bold text-lg text-primary leading-tight">
                Sineva
              </span>
              <span className="font-satoshi text-xs text-muted-foreground leading-tight">
                Brokerage
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with improved structure */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.slice(0, 2).map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-space text-sm font-medium transition-all duration-300 hover:scale-105 relative group ${
                    isActive 
                      ? 'text-accent font-semibold' 
                      : 'text-foreground hover:text-accent'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              );
            })}
            
            {/* Services Dropdown - Merged */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="font-space text-sm font-medium text-foreground hover:text-accent transition-all duration-300 p-0 h-auto bg-transparent hover:bg-transparent group relative"
                >
                  Services
                  <ChevronDown className="ml-1 h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 w-0 group-hover:w-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-background border shadow-lg z-50 animate-fade-in">
                {servicesItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className="w-full cursor-pointer hover:bg-accent/10 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Agents Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="font-space text-sm font-medium text-foreground hover:text-accent transition-all duration-300 p-0 h-auto bg-transparent hover:bg-transparent group relative"
                >
                  Agents
                  <ChevronDown className="ml-1 h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 w-0 group-hover:w-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-background border shadow-lg z-50 animate-fade-in">
                {agentItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className="w-full cursor-pointer hover:bg-accent/10 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Remaining navigation items */}
            {navigationItems.slice(2).map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-space text-sm font-medium transition-all duration-300 hover:scale-105 relative group ${
                    isActive 
                      ? 'text-accent font-semibold' 
                      : 'text-foreground hover:text-accent'
                  }`}
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTAs with full functionality */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavigationSearch />
            <LanguageSwitcher />
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span className="font-mono">+1 (555) 123-4567</span>
            </div>
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-muted">
                    <User className="w-4 h-4 mr-2" />
                    {user.user_metadata?.full_name || 'Account'}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg z-50">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/crm" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      CRM
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <NavigationSearch />
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-accent/10"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with full functionality */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-xl border-t border-border/50 shadow-elegant">
          <div className="px-4 py-6 space-y-4">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block font-space text-base font-medium transition-all duration-300 py-2 border-b border-border/30 last:border-b-0 ${
                    isActive 
                      ? 'text-accent font-semibold bg-accent/10' 
                      : 'text-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              );
            })}
            
            {/* Mobile Services Section */}
            <div className="space-y-2">
              <div className="font-space text-base font-medium text-foreground py-2 border-b border-border/30">
                Services
              </div>
              {servicesItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block font-space text-sm text-muted-foreground hover:text-accent transition-all duration-300 py-2 pl-4"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${(navigationItems.length + index) * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Agents Section */}
            <div className="space-y-2">
              <div className="font-space text-base font-medium text-foreground py-2 border-b border-border/30">
                Agents
              </div>
              {agentItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block font-space text-sm text-muted-foreground hover:text-accent transition-all duration-300 py-2 pl-4"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${(navigationItems.length + servicesItems.length + index) * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-4 space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground px-3">
                <Phone className="w-4 h-4" />
                <span className="font-mono">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex space-x-3">
                {user && (
                  <>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to="/crm">
                        <User className="w-4 h-4 mr-2" />
                        CRM
                      </Link>
                    </Button>
                    <Button variant="destructive" className="flex-1" onClick={() => signOut()}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;