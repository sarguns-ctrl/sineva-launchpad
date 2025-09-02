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
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
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

          {/* Desktop Navigation - Clean & Simple */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-space text-sm font-medium transition-colors duration-200 relative group ${
                    isActive 
                      ? 'text-accent' 
                      : 'text-foreground hover:text-accent'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTAs - Simplified */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-muted">
                    <User className="w-4 h-4 mr-2" />
                    {user.user_metadata?.full_name || 'Account'}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-muted"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Simplified */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border/50">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block font-medium py-3 px-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-accent bg-accent/10' 
                      : 'text-foreground hover:text-accent hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-border/30 space-y-3">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
              
              {user ? (
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/dashboard">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full text-destructive" onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button className="w-full" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;