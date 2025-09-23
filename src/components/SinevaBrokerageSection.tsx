import { Badge } from "./ui/badge";
import { CheckCircle, MapPin, FileText, Search, DollarSign, Handshake, Megaphone, Monitor, Users, Calculator, Plane } from 'lucide-react';

const SinevaBrokerageSection = () => {
  const mainServices = [
    {
      icon: Search,
      title: "Find the Right Business for You",
      description: "We help you choose a business that matches your budget, visa needs, and lifestyle — so you don't waste time on the wrong deals."
    },
    {
      icon: MapPin,
      title: "Pick the Best Location for Your Family",
      description: "We guide you on which state and city fit your family — safe neighborhoods, good schools, reasonable taxes, and a business community where you can thrive."
    },
    {
      icon: FileText,
      title: "Handle the Paperwork (NDAs & LOIs)",
      description: "We prepare the agreements you need to talk to sellers and make offers — all explained in simple language so you understand exactly what you're signing."
    },
    {
      icon: CheckCircle,
      title: "Check the Business is Real (Due Diligence)",
      description: "We go through tax returns, supplier invoices, rent agreements, and payroll records to confirm the store is really making the money the seller claims."
    },
    {
      icon: DollarSign,
      title: "Help You With Financing",
      description: "We negotiate with sellers to arrange seller financing (so you don't pay everything upfront) or guide you on other funding options."
    },
    {
      icon: Handshake,
      title: "Close the Deal Smoothly",
      description: "We coordinate with lawyers, accountants, and brokers so you don't miss steps — and you walk away with the keys in hand."
    }
  ];

  const afterBuyServices = [
    {
      icon: Megaphone,
      title: "Marketing Basics",
      description: "We help you get your store on Google Maps, local flyers, or simple ads so customers know you're open."
    },
    {
      icon: Monitor,
      title: "Simple IT Setup",
      description: "We make sure you have a working POS system, inventory tracking, and basic bookkeeping — easy for you to use."
    },
    {
      icon: Users,
      title: "Hiring Staff",
      description: "We help you find and train reliable employees so you're not stuck working every shift yourself."
    },
    {
      icon: Calculator,
      title: "Basic Accounting",
      description: "We set up monthly profit/loss tracking so you always know if your store is really making money."
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-background/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-background/80 text-accent px-6 py-3 text-sm font-space font-medium border border-accent/40 backdrop-blur-md hover:bg-background/90 transition-all duration-300 mb-6">
            🏪 Sineva Brokerage
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-foreground mb-6 leading-tight drop-shadow-lg">
            Helping You Buy Your First
            <br />
            <span className="text-accent bg-gradient-accent bg-clip-text text-transparent">
              U.S. Business
            </span>
          </h2>
          
          <p className="text-xl text-foreground/90 max-w-4xl mx-auto font-satoshi leading-relaxed drop-shadow-sm">
            Buying a business is stressful — especially when it's your first time and you're also moving your family. 
            At Sineva Brokerage, we make the process simple, safe, and practical.
          </p>
        </div>

        {/* Main Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-clash font-bold text-foreground mb-8 text-center drop-shadow-md">
            Here's what we do for you:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="bg-background/20 backdrop-blur-sm rounded-lg border border-foreground/10 p-6 hover:bg-background/30 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-clash font-semibold text-foreground mb-2 drop-shadow-sm">
                        {index + 1}. {service.title}
                      </h4>
                      <p className="text-foreground/80 font-satoshi leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* After You Buy Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-clash font-bold text-foreground mb-8 text-center drop-shadow-md">
            After You Buy (Extra Support)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {afterBuyServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="bg-background/20 backdrop-blur-sm rounded-lg border border-foreground/10 p-6 hover:bg-background/30 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-clash font-semibold text-foreground mb-2 drop-shadow-sm">
                        {index + 7}. {service.title}
                      </h4>
                      <p className="text-foreground/80 font-satoshi leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* In-Person Support */}
        <div className="text-center">
          <div className="bg-background/30 backdrop-blur-md rounded-lg border border-accent/20 p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                <Plane className="w-8 h-8 text-accent" />
              </div>
            </div>
            <h3 className="text-2xl font-clash font-bold text-foreground mb-4 drop-shadow-md">
              ✈ In-Person Support
            </h3>
            <p className="text-lg text-foreground/90 font-satoshi leading-relaxed">
              If you want, our team can come with you in person to visit businesses, meet sellers, and finalize the deal — so you're never alone in the process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinevaBrokerageSection;