import { Building2, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerLinks = {
    Services: [
      "Business Brokerage",
      "Commercial Real Estate", 
      "Residential Properties",
      "International Services",
      "Concierge Services"
    ],
    "For Agents": [
      "Join Our Team",
      "Commission Structure",
      "Agent Packages",
      "Training Programs",
      "Agent Resources"
    ],
    Company: [
      "About Grupo Sineva",
      "Leadership Team",
      "Global Presence",
      "Careers",
      "Press & Media"
    ],
    Support: [
      "Contact Us",
      "Help Center", 
      "Legal Documents",
      "Privacy Policy",
      "Terms of Service"
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
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
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