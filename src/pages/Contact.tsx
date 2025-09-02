import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Building2,
  Users,
  MessageSquare,
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Send
} from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    inquiryType: "",
    investmentRange: "",
    visaType: "",
    message: ""
  });

  const officeLocations = [
    {
      city: "Houston",
      country: "USA",
      isHeadquarters: true,
      address: "2700 Post Oak Blvd, Suite 1400",
      zipCode: "Houston, TX 77056",
      phone: "+1 (713) 555-0123",
      email: "houston@sinevabroker.com",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM CST",
      services: ["Real Estate Brokerage", "Business Sales", "Investment Consulting"],
      languages: ["English", "Spanish", "Portuguese"]
    },
    {
      city: "Austin",
      country: "USA", 
      isHeadquarters: false,
      address: "500 W 2nd St, Suite 1200",
      zipCode: "Austin, TX 78701", 
      phone: "+1 (512) 555-0124",
      email: "austin@sinevabroker.com",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM CST",
      services: ["Tech Business Sales", "Commercial Real Estate", "Startup Investments"],
      languages: ["English", "Spanish"]
    },
    {
      city: "Miami",
      country: "USA",
      isHeadquarters: false,
      address: "1450 Brickell Ave, Suite 1900",
      zipCode: "Miami, FL 33131",
      phone: "+1 (305) 555-0125", 
      email: "miami@sinevabroker.com",
      hours: "Mon-Fri: 8:30 AM - 5:30 PM EST",
      services: ["International Real Estate", "EB-5 Investments", "Latin America Relations"],
      languages: ["English", "Spanish", "Portuguese"]
    },
    {
      city: "Toronto",
      country: "Canada",
      isHeadquarters: false,
      address: "181 Bay St, Suite 2100", 
      zipCode: "Toronto, ON M5J 2T3",
      phone: "+1 (416) 555-0126",
      email: "toronto@sinevabroker.com",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM EST",
      services: ["Canadian Real Estate", "Business Immigration", "Investment Programs"],
      languages: ["English", "French", "Spanish"]
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Consultation",
      description: "Speak directly with our experts",
      action: "Schedule a call",
      details: "Available in 8 languages",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: Mail,
      title: "Email Support", 
      description: "Get detailed information via email",
      action: "Send us a message",
      details: "Response within 4 hours",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant answers to your questions", 
      action: "Start chat now",
      details: "Available 24/7",
      color: "bg-purple-100 text-purple-700"
    },
    {
      icon: Calendar,
      title: "In-Person Meeting",
      description: "Meet at our office or your location",
      action: "Book appointment", 
      details: "Available worldwide",
      color: "bg-orange-100 text-orange-700"
    }
  ];

  const inquiryTypes = [
    "Real Estate Investment",
    "Business Acquisition", 
    "E-2 Visa Investment",
    "EB-5 Investment", 
    "Agent Partnership",
    "Market Research",
    "General Inquiry"
  ];

  const investmentRanges = [
    "Under $250K",
    "$250K - $500K", 
    "$500K - $1M",
    "$1M - $2M",
    "$2M - $5M",
    "$5M+"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium">
              GET IN TOUCH
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair">
              Contact Our Experts
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Ready to discuss your real estate investment goals? Our international 
              team is here to provide personalized guidance every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300 border-0 shadow-sm group">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl ${method.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs text-muted-foreground">{method.details}</div>
                  <Button className="w-full group-hover:shadow-button transition-all duration-300">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground font-playfair mb-8">
                Send Us a Message
              </h2>
              
              <Card className="shadow-elegant border-0">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Country of Residence
                        </label>
                        <input
                          type="text"
                          name="country"
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={formData.country}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Inquiry Type *
                        </label>
                        <select
                          name="inquiryType"
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                        >
                          <option value="">Select inquiry type</option>
                          {inquiryTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Investment Range
                        </label>
                        <select
                          name="investmentRange"
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={formData.investmentRange}
                          onChange={handleInputChange}
                        >
                          <option value="">Select range</option>
                          {investmentRanges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Visa Type (if applicable)
                      </label>
                      <select
                        name="visaType"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formData.visaType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select visa type</option>
                        <option value="E-2">E-2 Treaty Investor</option>
                        <option value="EB-5">EB-5 Investor</option>
                        <option value="L-1">L-1 Intracompany Transfer</option>
                        <option value="O-1">O-1 Extraordinary Ability</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        placeholder="Tell us about your investment goals and any specific questions you have..."
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>

                    <Button type="submit" className="w-full shadow-button">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-3xl font-bold text-foreground font-playfair mb-8">
                Our Office Locations
              </h2>
              
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <Card key={index} className="hover:shadow-card transition-all duration-300 border-0 shadow-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <CardTitle className="text-xl">{office.city}, {office.country}</CardTitle>
                            {office.isHeadquarters && (
                              <Badge className="bg-primary text-primary-foreground text-xs">
                                Headquarters
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{office.address}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{office.zipCode}</div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-primary" />
                          <span className="text-sm">{office.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="text-sm">{office.email}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">{office.hours}</span>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-foreground mb-2">Services</div>
                        <div className="flex flex-wrap gap-1">
                          {office.services.map((service, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-foreground mb-2">Languages</div>
                        <div className="flex flex-wrap gap-1">
                          {office.languages.map((language, idx) => (
                            <Badge key={idx} className="bg-accent/10 text-accent text-xs">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground font-playfair text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  How quickly can you respond to my inquiry?
                </h3>
                <p className="text-muted-foreground">
                  We typically respond to all inquiries within 4 hours during business hours. 
                  For urgent matters, please call our main number and our team will prioritize your request.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Do you offer virtual consultations for international clients?
                </h3>
                <p className="text-muted-foreground">
                  Yes! We provide comprehensive virtual consultations via video conference in multiple languages. 
                  Our team can also arrange in-person meetings worldwide for qualified investors.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  What information should I prepare before our consultation?
                </h3>
                <p className="text-muted-foreground">
                  Please have your investment budget, timeline, visa requirements (if applicable), 
                  and preferred locations ready. This helps us provide more targeted recommendations 
                  during your consultation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white space-y-6">
            <Globe className="h-16 w-16 mx-auto text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold font-playfair">
              Let's Start Your Journey Today
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Whether you're ready to invest or just exploring your options, 
              our team is here to provide expert guidance tailored to your unique situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-button">
                Schedule Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Call Now: (713) 555-0123
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;