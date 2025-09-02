import { useParams, useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone,
  Mail,
  Globe,
  Star,
  Award,
  TrendingUp,
  Users,
  Building2,
  Home,
  ArrowLeft,
  Calendar,
  MessageCircle,
  Languages,
  CheckCircle,
  Briefcase
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AnimatedCounter from "@/components/AnimatedCounter";

const AgentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  // Mock agent data - in real app this would come from API/database
  const agent = {
    id: id || "1",
    name: "Maria Rodriguez",
    title: "Senior Commercial Specialist",
    experience: "8+ years",
    specialties: ["Commercial Real Estate", "International Clients", "E-2/EB-5 Visa Properties"],
    location: "Houston, TX",
    phone: "+1 (713) 555-0123",
    email: "maria.rodriguez@sinevabrokerage.com",
    languages: ["English", "Spanish", "Portuguese"],
    bio: "Maria is a seasoned commercial real estate specialist with over 8 years of experience helping international investors navigate the US property market. She specializes in investment-grade properties that meet E-2 and EB-5 visa requirements, having successfully closed over $50M in international transactions.",
    achievements: [
      "Top 5% Producer 2023",
      "International Client Specialist Certified",
      "E-2/EB-5 Visa Expert Designation",
      "Grupo Sineva Excellence Award 2022"
    ],
    stats: {
      totalSales: 52000000,
      propertiesSold: 156,
      clientRating: 4.9,
      responseTime: "< 2 hours"
    },
    recentSales: [
      {
        id: 1,
        title: "Downtown Office Complex",
        type: "Commercial",
        price: 2850000,
        location: "Houston, TX",
        soldDate: "2024-02-15",
        clientType: "International Investor"
      },
      {
        id: 2,
        title: "Manufacturing Facility",
        type: "Industrial",
        price: 1750000,
        location: "Katy, TX",
        soldDate: "2024-01-28",
        clientType: "E-2 Visa Client"
      },
      {
        id: 3,
        title: "Medical Office Building",
        type: "Commercial",
        price: 3200000,
        location: "The Woodlands, TX",
        soldDate: "2024-01-10",
        clientType: "EB-5 Investor"
      }
    ],
    testimonials: [
      {
        client: "Carlos M.",
        country: "Mexico",
        rating: 5,
        comment: "Maria guided us through every step of our E-2 visa investment. Her expertise in immigration requirements made the process seamless.",
        property: "Restaurant Business - $450K"
      },
      {
        client: "Ana S.",
        country: "Brazil", 
        rating: 5,
        comment: "Professional, knowledgeable, and always available. Maria found us the perfect commercial property that met all our EB-5 requirements.",
        property: "Office Complex - $2.1M"
      },
      {
        client: "David L.",
        country: "Colombia",
        rating: 5,
        comment: "Outstanding service! Maria's bilingual communication and cultural understanding made us feel confident throughout the entire process.",
        property: "Retail Plaza - $1.8M"
      }
    ],
    certifications: [
      "Licensed Real Estate Broker - Texas",
      "Certified Commercial Investment Member (CCIM)",
      "International Real Estate Specialist",
      "Immigration Investment Advisor"
    ],
    currentListings: [
      {
        id: 4,
        title: "Premium Retail Center",
        type: "Commercial",
        price: 4200000,
        location: "Sugar Land, TX",
        features: ["High Traffic", "Triple Net Lease", "EB-5 Eligible"]
      },
      {
        id: 5,
        title: "Tech Consulting Business",
        type: "Business",
        price: 890000,
        location: "Austin, TX", 
        features: ["Established Clientele", "Remote Operations", "E-2 Ready"]
      }
    ]
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="border-white text-white hover:bg-white hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Agents
            </Button>
          </div>
          
          <div 
            ref={headerRef}
            className={`transition-all duration-1000 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Agent Info */}
              <div className="lg:col-span-2 space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Users className="h-16 w-16 text-white" />
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <h1 className="text-4xl md:text-5xl font-bold text-white font-playfair">
                        {agent.name}
                      </h1>
                      <p className="text-xl text-accent font-medium">{agent.title}</p>
                      <div className="flex items-center space-x-4 text-white/80">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{agent.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4" />
                          <span>{agent.experience}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{agent.stats.clientRating}/5.0</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((specialty, idx) => (
                        <Badge key={idx} className="bg-accent text-accent-foreground">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-button">
                        <Phone className="h-5 w-5 mr-2" />
                        Call Agent
                      </Button>
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                        <Mail className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 space-y-6">
                <h3 className="text-xl font-bold text-white font-playfair text-center">
                  Performance Stats
                </h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent font-playfair">
                      <AnimatedCounter end={agent.stats.totalSales} prefix="$" />
                    </div>
                    <div className="text-white/80 text-sm">Total Sales Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent font-playfair">
                      <AnimatedCounter end={agent.stats.propertiesSold} suffix="+" />
                    </div>
                    <div className="text-white/80 text-sm">Properties Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent font-playfair">{agent.stats.clientRating}</div>
                    <div className="text-white/80 text-sm">Client Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-accent">{agent.stats.responseTime}</div>
                    <div className="text-white/80 text-sm">Avg Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Details */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-playfair">About {agent.name.split(' ')[0]}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{agent.bio}</p>
              </div>

              {/* Recent Sales */}
              <div>
                <h3 className="text-2xl font-bold mb-6 font-playfair">Recent Sales</h3>
                <div className="space-y-4">
                  {agent.recentSales.map((sale, idx) => (
                    <Card key={idx} className="p-6 shadow-card hover:shadow-elegant transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h4 className="text-xl font-semibold">{sale.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{sale.type}</span>
                            <span>•</span>
                            <span>{sale.location}</span>
                            <span>•</span>
                            <span>Sold {new Date(sale.soldDate).toLocaleDateString()}</span>
                          </div>
                          <Badge variant="secondary">{sale.clientType}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary font-playfair">
                            {formatPrice(sale.price)}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Client Testimonials */}
              <div>
                <h3 className="text-2xl font-bold mb-6 font-playfair">Client Testimonials</h3>
                <div className="space-y-6">
                  {agent.testimonials.map((testimonial, idx) => (
                    <Card key={idx} className="p-6 shadow-card">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                              <Users className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">{testimonial.client}</div>
                              <div className="text-sm text-muted-foreground flex items-center space-x-1">
                                <Globe className="h-3 w-3" />
                                <span>{testimonial.country}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <blockquote className="text-muted-foreground italic">
                          "{testimonial.comment}"
                        </blockquote>
                        <div className="text-sm font-medium text-primary">
                          Property: {testimonial.property}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <Card className="p-6 shadow-elegant">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-sm">{agent.email}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Languages className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Languages</div>
                      <div className="text-sm text-muted-foreground">
                        {agent.languages.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Button className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Chat
                  </Button>
                </div>
              </Card>

              {/* Achievements */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold mb-4">Achievements</h3>
                <div className="space-y-3">
                  {agent.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Award className="h-4 w-4 text-accent" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Certifications */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold mb-4">Certifications</h3>
                <div className="space-y-3">
                  {agent.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Current Listings */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold mb-4">Current Listings</h3>
                <div className="space-y-4">
                  {agent.currentListings.map((listing, idx) => (
                    <div key={idx} className="border-l-2 border-primary pl-4 space-y-2">
                      <h4 className="font-medium">{listing.title}</h4>
                      <div className="text-lg font-bold text-primary">
                        {formatPrice(listing.price)}
                      </div>
                      <div className="text-sm text-muted-foreground">{listing.location}</div>
                      <div className="flex flex-wrap gap-1">
                        {listing.features.map((feature, fidx) => (
                          <Badge key={fidx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AgentProfile;