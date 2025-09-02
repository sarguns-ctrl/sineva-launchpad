import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  Mail,
  Globe,
  Award,
  Building2,
  TrendingUp,
  BookOpen,
  Briefcase
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InteractiveCard from "@/components/InteractiveCard";

const Leadership = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  const leadership = [
    {
      name: "Carlos Sineva",
      title: "Founder & CEO",
      bio: "Carlos founded Grupo Sineva over 20 years ago with a vision to bridge the gap between international entrepreneurs and US business opportunities. A former immigrant himself, he understands the challenges and opportunities that come with starting a new life in America.",
      experience: "25+ years",
      specialties: ["Immigration Business Strategy", "International Expansion", "Corporate Leadership"],
      achievements: [
        "Built Grupo Sineva into a $100M+ enterprise",
        "Helped 5,000+ families immigrate to the US",
        "Recognized as 'Entrepreneur of the Year' by Houston Business Journal",
        "Featured speaker at 50+ international investment conferences"
      ],
      languages: ["Spanish", "English", "Portuguese"],
      email: "carlos.sineva@gruposineva.com"
    },
    {
      name: "Maria Rodriguez",
      title: "Chief Operating Officer",
      bio: "Maria brings over 15 years of operational excellence to Sineva Brokerage, ensuring seamless client experiences from initial consultation through business ownership. Her expertise in process optimization has helped scale our operations internationally.",
      experience: "15+ years",
      specialties: ["Operations Management", "Client Relations", "International Business"],
      achievements: [
        "Reduced average transaction time by 40%",
        "Implemented quality assurance programs achieving 98% client satisfaction",
        "Led expansion into 8 new international markets",
        "Certified Six Sigma Black Belt"
      ],
      languages: ["English", "Spanish"],
      email: "maria.rodriguez@sinevabrokerage.com"
    },
    {
      name: "David Chen",
      title: "Chief Technology Officer",
      bio: "David leads our technology initiatives, including our revolutionary AI-powered business matching platform. With a background in fintech and machine learning, he's transforming how international investors discover business opportunities.",
      experience: "12+ years",
      specialties: ["AI & Machine Learning", "Fintech", "Platform Development"],
      achievements: [
        "Developed proprietary business matching algorithm",
        "Led digital transformation increasing efficiency by 60%",
        "Holds 3 patents in financial technology",
        "Former Microsoft Senior Engineer"
      ],
      languages: ["English", "Mandarin", "Cantonese"],
      email: "david.chen@sinevabrokerage.com"
    },
    {
      name: "Ana Gutierrez",
      title: "Head of Immigration Services",
      bio: "Ana specializes in immigration law and visa compliance, ensuring all business transactions meet federal requirements for E-2, EB-5, and other investment-based visas. She works closely with immigration attorneys to provide comprehensive guidance.",
      experience: "18+ years",
      specialties: ["Immigration Law", "Visa Compliance", "Legal Advisory"],
      achievements: [
        "Successfully processed 2,000+ visa applications",
        "Maintains 95% visa approval rate",
        "Certified Immigration Consultant",
        "Published author on immigration investment strategies"
      ],
      languages: ["Spanish", "English"],
      email: "ana.gutierrez@sinevabrokerage.com"
    },
    {
      name: "Roberto Silva",
      title: "Director of International Markets",
      bio: "Roberto oversees our expansion across Latin America and Europe, building relationships with international partners and managing our global client acquisition strategies. His multicultural background enables effective communication across diverse markets.",
      experience: "20+ years",
      specialties: ["International Relations", "Market Development", "Strategic Partnerships"],
      achievements: [
        "Established partnerships in 15 countries",
        "Generated $50M+ in international investments",
        "Former Brazilian Trade Commission member",
        "MBA from Wharton School"
      ],
      languages: ["Portuguese", "Spanish", "English", "French"],
      email: "roberto.silva@sinevabrokerage.com"
    },
    {
      name: "Sarah Kim",
      title: "Chief Financial Officer",
      bio: "Sarah ensures financial transparency and strategic growth planning for all Sineva operations. Her expertise in international finance and tax optimization helps clients maximize their investment returns while maintaining compliance.",
      experience: "14+ years",
      specialties: ["International Finance", "Tax Strategy", "Investment Analysis"],
      achievements: [
        "Managed $200M+ in client investments",
        "Reduced client tax burden by average 25%",
        "CPA and CFA certified",
        "Former Goldman Sachs Vice President"
      ],
      languages: ["English", "Korean"],
      email: "sarah.kim@sinevabrokerage.com"
    }
  ];

  const advisoryBoard = [
    {
      name: "Judge Patricia Williams (Ret.)",
      title: "Legal Advisor",
      background: "Former Federal Immigration Judge with 30+ years experience in immigration law and policy."
    },
    {
      name: "Dr. James Morrison",
      title: "Economic Advisor", 
      background: "Professor of Economics at Rice University, specializing in international trade and investment."
    },
    {
      name: "Miguel Fernandez",
      title: "Industry Advisor",
      background: "Former CEO of major commercial real estate firm, 25+ years in Texas real estate markets."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={headerRef}
            className={`text-center space-y-6 transition-all duration-1000 ${
              headerVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <Badge className="bg-accent text-accent-foreground px-6 py-2 text-sm font-medium">
              LEADERSHIP TEAM
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair">
              Meet Our Leadership
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Experienced leaders with deep expertise in international business, immigration, 
              real estate, and technology - committed to your success.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Executive Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leaders who've built their careers helping international entrepreneurs succeed
            </p>
          </div>

          <div className="space-y-16">
            {leadership.map((leader, index) => (
              <InteractiveCard 
                key={index}
                delay={index * 100}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile */}
                  <div className="space-y-6">
                    <div className="text-center lg:text-left">
                      <div className="w-32 h-32 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto lg:mx-0 mb-4">
                        <Users className="h-16 w-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground font-playfair mb-2">
                        {leader.name}
                      </h3>
                      <p className="text-lg text-accent font-medium mb-4">{leader.title}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center lg:justify-start space-x-2">
                          <Award className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{leader.experience} Experience</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start space-x-2">
                          <Globe className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{leader.languages.join(', ')}</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start space-x-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground text-xs">{leader.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {leader.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bio & Achievements */}
                  <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-foreground">Biography</h4>
                      <p className="text-muted-foreground leading-relaxed">{leader.bio}</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-foreground">Key Achievements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {leader.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <Award className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact {leader.name.split(' ')[0]}
                    </Button>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Advisory Board
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Distinguished advisors providing strategic guidance and industry expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisoryBoard.map((advisor, index) => (
              <InteractiveCard 
                key={index}
                delay={index * 150}
                className="text-center"
              >
                <div className="space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">{advisor.name}</h3>
                    <p className="text-accent font-medium">{advisor.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{advisor.background}</p>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-playfair">
              Our Leadership Principles
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The values that guide our leadership and decision-making
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Client-Centric",
                description: "Every decision prioritizes our clients' success and long-term interests."
              },
              {
                icon: Globe,
                title: "Global Perspective",
                description: "We think globally while acting locally to serve international clients effectively."
              },
              {
                icon: TrendingUp,
                title: "Results-Driven",
                description: "Measurable outcomes and continuous improvement drive our approach."
              },
              {
                icon: Building2,
                title: "Ethical Excellence",
                description: "Integrity, transparency, and ethical conduct in all business practices."
              }
            ].map((principle, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <principle.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{principle.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Leadership;