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

  const lastUpdated = "November 2, 2015";

  const sections = [
    {
      id: "trec-regulation",
      title: "Texas Real Estate Commission Regulation",
      icon: Shield,
      content: [
        {
          subtitle: "TREC Oversight",
          details: "The Texas Real Estate Commission (TREC) regulates real estate brokers and sales agents, real estate inspectors, easement and right-of-way agents, and timeshare interest providers. You can find more information and check the status of a license holder at www.trec.texas.gov"
        },
        {
          subtitle: "Filing Complaints",
          details: "You can send a complaint against a license holder to TREC. A complaint form is available on the TREC website."
        },
        {
          subtitle: "Recovery Trust Account",
          details: "TREC administers the Real Estate Recovery Trust Account which may be used to satisfy a civil court judgment against a broker, sales agent, or easement or right-of-way agent, if certain requirements are met."
        },
        {
          subtitle: "Inspector Insurance Requirements",
          details: "Real estate inspectors are required to maintain errors and omissions insurance to cover losses arising from the performance of a real estate inspection in a negligent or incompetent manner. Please note: Inspectors may limit liability through provisions in the contract or inspection agreement. Please be sure to read any contract or agreement carefully. If you do not understand any terms or provisions, consult an attorney."
        }
      ]
    },
    {
      id: "license-holders",
      title: "Types of Real Estate License Holders",
      icon: Users,
      content: [
        {
          subtitle: "Broker",
          details: "A BROKER is responsible for all brokerage activities, including acts performed by sales agents sponsored by the broker."
        },
        {
          subtitle: "Sales Agent",
          details: "A SALES AGENT must be sponsored by a broker and works with clients on behalf of the broker."
        }
      ]
    },
    {
      id: "broker-duties",
      title: "A Broker's Minimum Duties Required by Law",
      icon: AlertTriangle,
      content: [
        {
          subtitle: "Client Representation",
          details: "A client is the person or party that the broker represents. The broker must:"
        },
        {
          subtitle: "Primary Obligations",
          details: "• Put the interests of the client above all others, including the broker's own interests\n• Inform the client of any material information about the property or transaction received by the broker\n• Answer the client's questions and present any offer to or counter-offer from the client\n• Treat all parties to a real estate transaction honestly and fairly"
        }
      ]
    },
    {
      id: "representation-types",
      title: "How a License Holder Can Represent a Party",
      icon: Users,
      content: [
        {
          subtitle: "As Agent for Owner (Seller/Landlord)",
          details: "The broker becomes the property owner's agent through an agreement with the owner, usually in a written listing to sell or property management agreement. An owner's agent must perform the broker's minimum duties and must inform the owner of any material information about the property or transaction known by the agent, including information disclosed to the agent or subagent by the buyer or buyer's agent."
        },
        {
          subtitle: "As Agent for Buyer/Tenant",
          details: "The broker becomes the buyer/tenant's agent by agreeing to represent the buyer, usually through a written representation agreement. A buyer's agent must perform the broker's minimum duties and must inform the buyer of any material information about the property or transaction known by the agent, including information disclosed to the agent by the seller or seller's agent."
        },
        {
          subtitle: "As Agent for Both - Intermediary",
          details: "To act as an intermediary between the parties the broker must first obtain the written agreement of each party to the transaction. The written agreement must state who will pay the broker and, in conspicuous bold or underlined print, set forth the broker's obligations as an intermediary."
        },
        {
          subtitle: "Intermediary Obligations",
          details: "A broker who acts as an intermediary:\n• Must treat all parties to the transaction impartially and fairly\n• May, with the parties' written consent, appoint a different license holder associated with the broker to each party (owner and buyer) to communicate with, provide opinions and advice to, and carry out the instructions of each party to the transaction\n• Must not, unless specifically authorized in writing to do so by the party, disclose: that the owner will accept a price less than the written asking price; that the buyer/tenant will pay a price greater than the price submitted in a written offer; and any confidential information or any other information that a party specifically instructs the broker in writing not to disclose, unless required to do so by law"
        },
        {
          subtitle: "As Subagent",
          details: "A license holder acts as a subagent when aiding a buyer in a transaction without an agreement to represent the buyer. A subagent can assist the buyer but does not represent the buyer and must place the interests of the owner first."
        }
      ]
    },
    {
      id: "written-agreements",
      title: "Importance of Written Agreements",
      icon: Lock,
      content: [
        {
          subtitle: "Clear Documentation",
          details: "To avoid disputes, all agreements between you and a broker should be in writing and clearly establish:"
        },
        {
          subtitle: "Key Elements",
          details: "• The broker's duties and responsibilities to you, and your obligations under the representation agreement\n• Who will pay the broker for services provided to you, when payment will be made and how the payment will be calculated"
        }
      ]
    },
    {
      id: "contact-information",
      title: "License Holder Contact Information",
      icon: Mail,
      content: [
        {
          subtitle: "Stewart and Campbell Real Estate",
          details: "Licensed Broker/Broker Firm Name\nLicense No: 9001706\nEmail: broker@stewartandcampbell.com\nPhone: (713) 955-8817"
        },
        {
          subtitle: "Rodney Campbell - Designated Broker",
          details: "License No: 613021\nEmail: broker@stewartandcampbell.com\nPhone: (713) 955-8817"
        },
        {
          subtitle: "Important Notice",
          details: "This notice is being provided for information purposes. It does not create an obligation for you to use the broker's services."
        }
      ]
    }
  ];

  const contactInfo = {
    email: "contact@sinevagrupo.com",
    phone: "+1 (832) 289-6124",
    address: "5718 Westheimer Rd, Suite 1000, Houston, TX 77057",
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
              Information About Brokerage Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Important information about real estate brokerage services and Texas Real Estate Commission regulations
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
                  <h2 className="text-2xl font-bold font-playfair">Equal Housing Opportunity</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This information is provided by the Texas Real Estate Commission to inform you about 
                    brokerage services, the types of real estate license holders, and their legal duties 
                    and responsibilities. Understanding these distinctions will help you make informed 
                    decisions when engaging real estate services.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    For more information about TREC and to verify license holder status, visit www.trec.texas.gov. 
                    Contact information: Texas Real Estate Commission, P.O. Box 12188, Austin, Texas 78711-2188, 
                    Phone: (512) 936-3000
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
                <h2 className="text-2xl font-bold font-playfair">Acknowledgment of Receipt</h2>
              </div>
              
              <div className="ml-16 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Please acknowledge that you have received this notice about brokerage services. 
                  Retain a copy for your records. For questions or additional information, please contact:
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
                  <h3 className="font-semibold text-amber-800">Important Notice</h3>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    This information about brokerage services is provided for informational purposes only. 
                    It does not create an obligation for you to use any specific broker's services. 
                    All agreements should be in writing to avoid disputes and clearly establish the duties, 
                    responsibilities, and payment terms between you and your chosen broker.
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