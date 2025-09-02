import { Building2, Mail, Phone, MapPin, Globe, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Footer = () => {
  const { user, signOut } = useAuth();
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
    "Market Insights": [
      { name: "Market Reports", href: "/insights" },
      { name: "Investment Trends", href: "/insights/trends" },
      { name: "Economic Indicators", href: "/insights/economic" },
      { name: "City Comparisons", href: "/insights/cities" },
      { name: "Forecast Analysis", href: "/insights/forecast" }
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

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-accent" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">Sineva</span>
                  <span className="text-sm text-primary-foreground/80 -mt-1">BROKERAGE</span>
                </div>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed">
                World-class real estate brokerage by Grupo Sineva. 
                Connecting opportunities across US, Canada, and Latin America 
                with unmatched expertise and international reach.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Houston, Texas, USA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <span>info@sinevabrokeragre.com</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-semibold text-accent">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
              <p className="text-primary-foreground/80">
                Get the latest market insights and property opportunities
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Subscribe
              </Button>
            </div>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center justify-center">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary min-w-[140px]"
                  asChild
                >
                  <Link to="/dashboard">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={() => signOut()}
                  className="text-primary-foreground hover:bg-destructive hover:text-destructive-foreground min-w-[140px]"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[140px] font-medium"
                  asChild
                >
                  <Link to="/auth">Get Started</Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary min-w-[140px]"
                  asChild
                >
                  <Link to="/auth">
                    <Mail className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80">
              © 2024 Sineva Brokerage by Grupo Sineva. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <Globe className="h-4 w-4 text-accent" />
                <span>Serving US • Canada • Latin America</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;