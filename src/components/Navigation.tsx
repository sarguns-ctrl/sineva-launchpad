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
    { name: 'Businesses', href: '/businesses' },
    { name: 'Franchise with Us', href: '/franchise' },
  ];

  const propertyItems = [
    { name: 'Properties', href: '/properties' },
    { name: 'New Properties', href: '/new-properties' },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-xl border-b border-primary-glow/30 shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with enhanced typography */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-16 flex items-center">
              <img 
                src="/logo-sineva-grupo.svg" 
                alt="Sineva Grupo Logo" 
                className="h-16 w-auto object-contain group-hover:scale-105 transition-all duration-300"
              />
            </div>
          </Link>

          {/* Desktop Navigation with improved structure */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Properties Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="font-space text-sm font-medium text-primary-foreground hover:text-white transition-all duration-300 px-3 py-2 h-auto group relative"
                >
                  Properties
                  <ChevronDown className="ml-1 h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 w-0 group-hover:w-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-background border border-border shadow-lg z-[60]">
                {propertyItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className="w-full cursor-pointer text-foreground hover:bg-primary/10 transition-colors px-3 py-2"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navigationItems.slice(0, 1).map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-space text-sm font-medium transition-all duration-300 hover:scale-105 relative group px-3 py-2 ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-primary-foreground hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
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
                  className="font-space text-sm font-medium text-primary-foreground hover:text-white transition-all duration-300 px-3 py-2 h-auto group relative"
                >
                  Services
                  <ChevronDown className="ml-1 h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 w-0 group-hover:w-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-background border border-border shadow-lg z-[60]">
                {servicesItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className="w-full cursor-pointer text-foreground hover:bg-primary/10 transition-colors px-3 py-2"
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
                  className="font-space text-sm font-medium text-primary-foreground hover:text-white transition-all duration-300 px-3 py-2 h-auto group relative"
                >
                  Agents
                  <ChevronDown className="ml-1 h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 w-0 group-hover:w-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-background border border-border shadow-lg z-[60]">
                {agentItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className="w-full cursor-pointer text-foreground hover:bg-primary/10 transition-colors px-3 py-2"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Remaining navigation items */}
            {navigationItems.slice(1).map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-space text-sm font-medium transition-all duration-300 hover:scale-105 relative group px-3 py-2 ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-primary-foreground hover:text-white'
                  }`}
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
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
            
            <div className="hidden xl:flex items-center space-x-2 text-sm text-primary-foreground/80">
              <Phone className="w-4 h-4" />
              <span className="font-mono whitespace-nowrap">+1 (555) 123-4567</span>
            </div>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-white hover:bg-white/10">
                    <User className="w-4 h-4 mr-2" />
                    {user.user_metadata?.full_name || 'Account'}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background border border-border shadow-lg z-[60]">
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
            ) : (
              <Button asChild className="bg-white/20 hover:bg-white/30 text-white border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                <Link to="/auth">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <div className="hidden sm:block">
              <NavigationSearch />
            </div>
            <LanguageSwitcher />
            {!user && (
              <Button size="sm" asChild className="bg-white/20 hover:bg-white/30 text-white border border-white/30 shadow-md font-semibold">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
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
        <div className="lg:hidden bg-primary/98 backdrop-blur-xl border-t border-primary-glow/30 shadow-elegant">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Properties Section */}
            <div className="space-y-2">
              <div className="font-space text-base font-semibold text-primary-foreground py-2 border-b border-primary-glow/30">
                Properties
              </div>
              {propertyItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block font-space text-sm text-primary-foreground/80 hover:text-white transition-all duration-300 py-2 pl-4"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block font-space text-base font-medium transition-all duration-300 py-3 px-3 border-b border-primary-glow/30 last:border-b-0 rounded ${
                    isActive 
                      ? 'text-white font-semibold bg-white/10' 
                      : 'text-primary-foreground hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${(propertyItems.length + index) * 50}ms` }}
                >
                  {item.name}
                </Link>
              );
            })}
            
            {/* Mobile Services Section */}
            <div className="space-y-2">
              <div className="font-space text-base font-semibold text-primary-foreground py-2 border-b border-primary-glow/30">
                Services
              </div>
              {servicesItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block font-space text-sm text-primary-foreground/80 hover:text-white transition-all duration-300 py-2 pl-4"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${(navigationItems.length + index) * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Agents Section */}
            <div className="space-y-2">
              <div className="font-space text-base font-semibold text-primary-foreground py-2 border-b border-primary-glow/30">
                Agents
              </div>
              {agentItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block font-space text-sm text-primary-foreground/80 hover:text-white transition-all duration-300 py-2 pl-4"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${(navigationItems.length + servicesItems.length + index) * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-4 space-y-3">
              <div className="sm:hidden">
                <NavigationSearch />
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-primary-foreground/80 px-3">
                <Phone className="w-4 h-4" />
                <span className="font-mono whitespace-nowrap">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex space-x-3">
                {user ? (
                  <>
                    <Button variant="outline" className="flex-1 border-white/30 text-primary-foreground hover:bg-white/10" asChild>
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1 border-white/30 text-primary-foreground hover:bg-white/10" asChild>
                      <Link to="/crm" onClick={() => setIsMenuOpen(false)}>
                        <User className="w-4 h-4 mr-2" />
                        CRM
                      </Link>
                    </Button>
                    <Button variant="destructive" className="flex-1 shadow-md" onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 shadow-lg font-semibold" asChild>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
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