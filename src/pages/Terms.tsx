import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText,
  Scale,
  Shield,
  AlertTriangle,
  Globe,
  Mail,
  Calendar,
  Gavel,
  Users,
  Building2
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Terms = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  const lastUpdated = "March 15, 2024";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: FileText,
      content: [
        {
          subtitle: "Agreement to Terms",
          details: "By accessing and using the Sineva Brokerage website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
        },
        {
          subtitle: "Modifications",
          details: "Sineva Brokerage reserves the right to modify these terms at any time without prior notice. Your continued use of the service after any such changes constitutes your acceptance of the new terms."
        },
        {
          subtitle: "Capacity",
          details: "You represent that you are at least 18 years of age and have the legal capacity to enter into this agreement. If you are using our services on behalf of an entity, you represent that you have the authority to bind that entity."
        }
      ]
    },
    {
      id: "services",
      title: "Description of Services",
      icon: Building2,
      content: [
        {
          subtitle: "Real Estate Services",
          details: "Sineva Brokerage provides real estate brokerage services, including but not limited to property listing, buying and selling assistance, market analysis, and investment advisory services for commercial and residential properties."
        },
        {
          subtitle: "Immigration-Related Investment Services",
          details: "We specialize in assisting international clients with real estate investments that may qualify for various U.S. visa programs, including E-2 and EB-5 visas. However, we do not provide legal or immigration advice."
        },
        {
          subtitle: "Business Brokerage",
          details: "Our business brokerage services include business valuation, buyer-seller matching, due diligence coordination, and transaction facilitation for business acquisitions and sales."
        },
        {
          subtitle: "Service Limitations",
          details: "Our services are subject to availability and may be limited by jurisdiction, licensing requirements, and other factors. We reserve the right to refuse service or terminate our relationship with any client at our discretion."
        }
      ]
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      icon: Users,
      content: [
        {
          subtitle: "Accurate Information",
          details: "You agree to provide accurate, current, and complete information when using our services and to update such information as necessary to maintain its accuracy."
        },
        {
          subtitle: "Compliance with Laws",
          details: "You agree to comply with all applicable local, state, federal, and international laws and regulations in connection with your use of our services."
        },
        {
          subtitle: "Prohibited Uses",
          details: "You may not use our services for any unlawful purpose or to solicit others to perform illegal acts. You may not violate any international, federal, provincial, or state regulations, rules, or laws."
        },
        {
          subtitle: "Account Security",
          details: "If you create an account with us, you are responsible for maintaining the confidentiality of your account information and password and for all activities that occur under your account."
        }
      ]
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations",
      icon: AlertTriangle,
      content: [
        {
          subtitle: "No Legal or Immigration Advice",
          details: "Sineva Brokerage does not provide legal, tax, immigration, or financial advice. We strongly recommend that you consult with qualified professionals for such matters."
        },
        {
          subtitle: "Property Information",
          details: "While we strive to provide accurate property information, we make no warranties regarding the accuracy, completeness, or reliability of property descriptions, pricing, or availability."
        },
        {
          subtitle: "Investment Risks",
          details: "All real estate and business investments carry inherent risks. Past performance does not guarantee future results. You should carefully consider all risks before making any investment decisions."
        },
        {
          subtitle: "Third-Party Content",
          details: "Our website may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites or services."
        }
      ]
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: Shield,
      content: [
        {
          subtitle: "Liability Limitations",
          details: "In no event shall Sineva Brokerage, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, punitive, special, or consequential damages."
        },
        {
          subtitle: "Maximum Liability",
          details: "Our total liability to you for any damages, losses, and causes of action (whether in contract, tort, or otherwise) shall not exceed the amount paid by you, if any, for accessing our services."
        },
        {
          subtitle: "Force Majeure",
          details: "We shall not be liable for any failure or delay in performance under this agreement which is due to fire, flood, earthquake, elements of nature, acts of God, acts of war, terrorism, riots, civil disorders, rebellions, or other similar causes."
        }
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: Scale,
      content: [
        {
          subtitle: "Our Content",
          details: "The content, organization, graphics, design, compilation, magnetic translation, digital conversion, and other matters related to our website and services are protected under applicable copyrights, trademarks, and other proprietary rights."
        },
        {
          subtitle: "License to Use",
          details: "We grant you a limited, non-exclusive, non-transferable license to access and use our website and services for their intended purpose, subject to these terms of service."
        },
        {
          subtitle: "User Content",
          details: "By submitting content to us, you grant us a worldwide, royalty-free, perpetual, irrevocable, and non-exclusive right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content."
        }
      ]
    },
    {
      id: "termination",
      title: "Termination",
      icon: Gavel,
      content: [
        {
          subtitle: "Termination by You",
          details: "You may terminate your use of our services at any time by ceasing to use our website and services and, if applicable, closing your account with us."
        },
        {
          subtitle: "Termination by Us",
          details: "We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the terms."
        },
        {
          subtitle: "Effect of Termination",
          details: "Upon termination, your right to use our services will cease immediately. All provisions of the terms which by their nature should survive termination shall survive termination."
        }
      ]
    },
    {
      id: "governing-law",
      title: "Governing Law and Jurisdiction",
      icon: Globe,
      content: [
        {
          subtitle: "Texas Law",
          details: "These terms shall be interpreted and governed by the laws of the State of Texas, United States, without regard to its conflict of law provisions."
        },
        {
          subtitle: "Jurisdiction",
          details: "Any disputes arising out of or relating to these terms or our services shall be subject to the exclusive jurisdiction of the courts of Harris County, Texas."
        },
        {
          subtitle: "Dispute Resolution",
          details: "We encourage resolution of disputes through direct communication. If informal resolution is not possible, disputes may be resolved through binding arbitration in accordance with the rules of the American Arbitration Association."
        }
      ]
    }
  ];

  const contactInfo = {
    email: "contact@sinevagrupo.com",
    phone: "+1 (832) 289-6124",
    address: "5718 Westheimer Rd, Suite 1000, Houston, TX 77057"
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={headerRef}
            className={`text-center space-y-6 transition-all duration-1000 ${
              headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium">
              LEGAL INFORMATION
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair">
              Terms of Service
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              These terms govern your use of Sineva Brokerage services. Please read 
              them carefully before using our website or engaging our services.
            </p>
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <Card className="mb-12 shadow-elegant">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold font-playfair">Terms and Conditions</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to Sineva Brokerage. These Terms of Service ("Terms") govern your use of 
                    our website located at sinevabrokerage.com and our real estate and business 
                    brokerage services (collectively, the "Service") operated by Sineva Brokerage 
                    ("us," "we," or "our").
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Please read these Terms carefully before using our Service. Your access to and 
                    use of the Service is conditioned on your acceptance of and compliance with these Terms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={section.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold font-playfair">{section.title}</h2>
                    </div>
                    
                    <div className="space-y-6 ml-16">
                      {section.content.map((item, idx) => (
                        <div key={idx} className="space-y-2">
                          <h3 className="text-lg font-semibold text-foreground">{item.subtitle}</h3>
                          <p className="text-muted-foreground leading-relaxed">{item.details}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Information */}
          <Card className="mt-12 shadow-elegant">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold font-playfair">Contact Information</h2>
              </div>
              
              <div className="ml-16 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">{contactInfo.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-muted-foreground">{contactInfo.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Globe className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-sm text-muted-foreground">{contactInfo.address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card className="mt-8 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-red-800">Important Legal Notice</h3>
                  <p className="text-sm text-red-700 leading-relaxed">
                    These terms constitute a legally binding agreement between you and Sineva Brokerage. 
                    If you do not agree with any part of these terms, you must not use our services. 
                    We recommend consulting with a legal professional if you have questions about 
                    your rights and obligations under these terms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;