import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Phone, Calendar, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface CrossPageCTAProps {
  title?: string;
  description?: string;
  primaryAction?: {
    text: string;
    href: string;
    external?: boolean;
  };
  secondaryAction?: {
    text: string;
    href: string;
    external?: boolean;
  };
  variant?: 'default' | 'gradient' | 'outline';
  showContactOptions?: boolean;
}

const CrossPageCTA = ({
  title = "Ready to Get Started?",
  description = "Take the next step towards your real estate goals with our expert guidance and comprehensive services.",
  primaryAction = { text: "Get Started", href: "/contact" },
  secondaryAction = { text: "Learn More", href: "/about" },
  variant = 'default',
  showContactOptions = true
}: CrossPageCTAProps) => {

  const contactOptions = [
    {
      icon: Phone,
      text: "Call Now",
      href: "tel:+15551234567",
      description: "+1 (832) 289-6124"
    },
    {
      icon: Calendar,
      text: "Schedule",
      href: "/appointments",
      description: "Book consultation"
    },
    {
      icon: MessageCircle,
      text: "Message",
      href: "/messages",
      description: "Start chat"
    }
  ];

  if (variant === 'gradient') {
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white text-center shadow-elegant">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-button"
                asChild
              >
                <Link to={primaryAction.href}>
                  {primaryAction.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link to={secondaryAction.href}>
                  {secondaryAction.text}
                </Link>
              </Button>
            </div>
            
            {showContactOptions && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
                {contactOptions.map((option, index) => (
                  <Link
                    key={index}
                    to={option.href}
                    className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 group"
                  >
                    <option.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-sm font-medium">{option.text}</div>
                    <div className="text-xs text-white/80">{option.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'outline') {
    return (
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 border-2 border-dashed border-border hover:border-accent/50 transition-colors duration-300">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {title}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild>
                  <Link to={primaryAction.href}>
                    {primaryAction.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to={secondaryAction.href}>
                    {secondaryAction.text}
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 shadow-elegant">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild>
                <Link to={primaryAction.href}>
                  {primaryAction.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to={secondaryAction.href}>
                  {secondaryAction.text}
                </Link>
              </Button>
            </div>
            
            {showContactOptions && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                {contactOptions.map((option, index) => (
                  <Link
                    key={index}
                    to={option.href}
                    className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-border hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 group"
                  >
                    <option.icon className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-sm font-medium text-foreground">{option.text}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CrossPageCTA;