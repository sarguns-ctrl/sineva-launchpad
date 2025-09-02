import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import MagneticButton from './MagneticButton';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, Phone, Mail, User, LogOut } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navigationItems = [
    { name: 'Properties', href: '/properties' },
    { name: 'Services', href: '/services' },
    { name: 'Agents', href: '/agents' },
    { name: 'Market Insights', href: '/market-insights' },
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

          {/* Desktop Navigation with asymmetric spacing */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className="font-space text-sm font-medium text-foreground hover:text-accent transition-all duration-300 hover:scale-105 relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTAs with new design */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span className="font-mono">+1 (555) 123-4567</span>
            </div>
            
            {user ? (
              <>
                <MagneticButton 
                  variant="outline" 
                  size="sm"
                  className="border-primary/30 hover:bg-primary hover:border-primary"
                >
                  <User className="w-4 h-4" />
                  {user.user_metadata?.full_name || 'Profile'}
                </MagneticButton>
                
                <MagneticButton 
                  variant="ghost" 
                  size="sm"
                  onClick={() => signOut()}
                  className="hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </MagneticButton>
              </>
            ) : (
              <>
                <MagneticButton 
                  variant="outline" 
                  size="sm"
                  className="border-primary/30 hover:bg-primary hover:border-primary"
                  asChild
                >
                  <Link to="/auth">
                    <Mail className="w-4 h-4" />
                    Sign In
                  </Link>
                </MagneticButton>
                
                <MagneticButton 
                  variant="accent" 
                  size="sm"
                  className="shadow-accent"
                  asChild
                >
                  <Link to="/auth">Get Started</Link>
                </MagneticButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
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

      {/* Mobile Navigation with improved design */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-xl border-t border-border/50 shadow-elegant">
          <div className="px-4 py-6 space-y-4">
            {navigationItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className="block font-space text-base font-medium text-foreground hover:text-accent transition-all duration-300 py-2 border-b border-border/30 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="font-mono">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex space-x-3">
                {user ? (
                  <>
                    <Button variant="outline" className="flex-1">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button variant="destructive" className="flex-1" onClick={() => signOut()}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to="/auth">
                        <Mail className="w-4 h-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button variant="accent" className="flex-1" asChild>
                      <Link to="/auth">Get Started</Link>
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