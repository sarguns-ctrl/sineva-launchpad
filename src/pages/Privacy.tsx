import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  Eye,
  Lock,
  Users,
  Globe,
  Mail,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Privacy = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  const lastUpdated = "March 15, 2024";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Eye,
      content: [
        {
          subtitle: "Personal Information",
          details: "We collect personal information you provide directly to us, such as when you create an account, contact us, or use our services. This may include your name, email address, phone number, postal address, and professional information."
        },
        {
          subtitle: "Property and Investment Information", 
          details: "When you inquire about properties or investment opportunities, we collect information about your investment preferences, budget, visa status, and specific requirements for immigration-related investments."
        },
        {
          subtitle: "Usage Information",
          details: "We automatically collect information about how you use our website, including your IP address, browser type, pages visited, time spent on pages, and other analytics data."
        },
        {
          subtitle: "Communication Records",
          details: "We maintain records of communications between you and our agents, including emails, phone calls, and chat messages to provide better service and maintain transaction records."
        }
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Users,
      content: [
        {
          subtitle: "Service Provision",
          details: "We use your information to provide real estate services, match you with suitable properties, facilitate transactions, and provide immigration-related investment guidance."
        },
        {
          subtitle: "Communication",
          details: "We use your contact information to respond to inquiries, provide updates on properties or market conditions, and send important notifications about our services."
        },
        {
          subtitle: "Personalization", 
          details: "We use your preferences and behavior data to personalize your experience, recommend relevant properties, and improve our services."
        },
        {
          subtitle: "Legal Compliance",
          details: "We may use your information to comply with legal obligations, including anti-money laundering requirements, tax reporting, and immigration documentation requirements."
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: Globe,
      content: [
        {
          subtitle: "Service Providers",
          details: "We may share your information with trusted third-party service providers who assist us in operating our business, such as payment processors, background check companies, and marketing platforms."
        },
        {
          subtitle: "Real Estate Partners",
          details: "With your consent, we may share relevant information with real estate professionals, property sellers, lenders, and other parties involved in your transaction."
        },
        {
          subtitle: "Legal Requirements",
          details: "We may disclose your information when required by law, court order, or government regulation, or when we believe disclosure is necessary to protect our rights or comply with legal processes."
        },
        {
          subtitle: "Business Transfers",
          details: "In the event of a merger, acquisition, or sale of business assets, your information may be transferred to the acquiring entity as part of the transaction."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Security Measures",
          details: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Encryption",
          details: "We use industry-standard encryption protocols (SSL/TLS) to protect data transmission and store sensitive information using encrypted databases."
        },
        {
          subtitle: "Access Controls",
          details: "Access to your personal information is restricted to authorized employees and service providers who need the information to perform their job functions."
        },
        {
          subtitle: "Regular Monitoring",
          details: "We regularly monitor our systems for vulnerabilities and potential security breaches, and we have incident response procedures in place."
        }
      ]
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      icon: Shield,
      content: [
        {
          subtitle: "Access and Correction",
          details: "You have the right to access, update, or correct your personal information. You can do this by logging into your account or contacting us directly."
        },
        {
          subtitle: "Data Portability",
          details: "You have the right to request a copy of your personal information in a structured, machine-readable format for transfer to another service provider."
        },
        {
          subtitle: "Deletion",
          details: "You can request deletion of your personal information, subject to certain exceptions such as legal requirements or legitimate business purposes."
        },
        {
          subtitle: "Marketing Opt-out",
          details: "You can opt out of receiving marketing communications from us at any time by using the unsubscribe link in emails or contacting us directly."
        }
      ]
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      icon: Globe,
      content: [
        {
          subtitle: "Cross-Border Services",
          details: "As we serve international clients, your information may be transferred to and processed in countries other than your country of residence, including the United States."
        },
        {
          subtitle: "Adequate Protections",
          details: "When we transfer personal information internationally, we ensure adequate safeguards are in place, such as standard contractual clauses or other approved transfer mechanisms."
        },
        {
          subtitle: "Group Sineva Network",
          details: "Your information may be shared within the Grupo Sineva network of companies to provide comprehensive services across our international offices."
        }
      ]
    }
  ];

  const contactInfo = {
    email: "privacy@sinevabrokerage.com",
    phone: "+1 (713) 555-0100",
    address: "1401 McKinney Street, Suite 2000, Houston, TX 77010",
    dpo: "Data Protection Officer"
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
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how Sineva Brokerage 
              collects, uses, and protects your personal information.
            </p>
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <Card className="mb-12 shadow-elegant">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold font-playfair">Our Commitment to Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Sineva Brokerage ("we," "our," or "us") is committed to protecting your privacy and 
                    maintaining the confidentiality of your personal information. This Privacy Policy 
                    describes our practices concerning the collection, use, and disclosure of information 
                    you provide to us through our website, services, and interactions with our team.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This policy applies to all users of our services, including prospective clients, 
                    current clients, website visitors, and anyone who interacts with our real estate 
                    and investment advisory services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
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
                <h2 className="text-2xl font-bold font-playfair">Contact Us About Privacy</h2>
              </div>
              
              <div className="ml-16 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy, wish to exercise your privacy rights, 
                  or need to report a privacy concern, please contact us using the information below:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
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
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Mailing Address</div>
                        <div className="text-sm text-muted-foreground">{contactInfo.address}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">Attention</div>
                        <div className="text-sm text-muted-foreground">{contactInfo.dpo}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates Notice */}
          <Card className="mt-8 border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-amber-800">Policy Updates</h3>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our 
                    practices or legal requirements. We will notify you of any material changes by 
                    posting the updated policy on our website and updating the "Last updated" date. 
                    We encourage you to review this policy periodically.
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

export default Privacy;