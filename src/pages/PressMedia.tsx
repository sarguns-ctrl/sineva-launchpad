import { Calendar, FileText, Award, Users, ExternalLink, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PressMedia = () => {
  const pressReleases = [
    {
      title: "Sineva Brokerage Expands Operations to Three New Latin American Markets",
      date: "2024-01-15",
      excerpt: "Strategic expansion into Chile, Peru, and Costa Rica positions company for continued growth in the Americas.",
      category: "Expansion"
    },
    {
      title: "Record-Breaking Q4 2023: $2.8 Billion in Transaction Volume",
      date: "2024-01-08",
      excerpt: "Sineva Brokerage reports exceptional performance with 35% year-over-year growth in transaction volume.",
      category: "Financial"
    },
    {
      title: "AI-Powered Property Search Platform Launches Globally",
      date: "2023-12-12",
      excerpt: "Revolutionary AI technology enhances property discovery and client matching across all markets.",
      category: "Technology"
    },
    {
      title: "Partnership with Leading International Relocation Services",
      date: "2023-11-28",
      excerpt: "New strategic alliance expands comprehensive services for international clients and corporations.",
      category: "Partnership"
    }
  ];

  const awards = [
    {
      title: "Best International Real Estate Brokerage 2023",
      organization: "Americas Real Estate Awards",
      year: "2023",
      description: "Recognized for outstanding service in cross-border transactions"
    },
    {
      title: "Top Innovative Technology Platform",
      organization: "PropTech Excellence Awards",
      year: "2023", 
      description: "Award for AI-powered property search and client matching system"
    },
    {
      title: "Fastest Growing Brokerage - Latin America",
      organization: "Regional Business Excellence",
      year: "2022",
      description: "Acknowledged rapid expansion and market penetration"
    },
    {
      title: "Sustainability in Real Estate Leadership",
      organization: "Green Building Council",
      year: "2022",
      description: "Environmental responsibility in property development and sales"
    }
  ];

  const mediaContacts = [
    {
      name: "Maria Rodriguez",
      title: "Director of Communications",
      phone: "+1 (713) 555-0130",
      email: "media@sinevabrokeragre.com",
      region: "North America"
    },
    {
      name: "Carlos Mendoza",
      title: "Latin America Communications Manager",
      phone: "+52 (55) 555-0131",
      email: "prensa@sinevabrokeragre.com",
      region: "Latin America"
    }
  ];

  const mediaKit = [
    { name: "Company Logo (High Resolution)", format: "PNG/AI", size: "15 MB" },
    { name: "Executive Headshots", format: "JPG", size: "25 MB" },
    { name: "Company Fact Sheet", format: "PDF", size: "2 MB" },
    { name: "Brand Guidelines", format: "PDF", size: "8 MB" },
    { name: "Office Photos", format: "JPG", size: "45 MB" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground">Media Center</Badge>
            <h1 className="text-4xl md:text-5xl font-clash font-bold mb-6">
              Press & Media
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Stay informed about Sineva Brokerage's latest news, achievements, and industry insights.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="press-releases" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="press-releases">Press Releases</TabsTrigger>
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="media-kit">Media Kit</TabsTrigger>
              <TabsTrigger value="contacts">Media Contacts</TabsTrigger>
            </TabsList>

            <TabsContent value="press-releases" className="mt-8">
              <div className="space-y-6">
                {pressReleases.map((release) => (
                  <Card key={release.title}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline">{release.category}</Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(release.date).toLocaleDateString()}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-primary mb-3">{release.title}</h3>
                          <p className="text-muted-foreground">{release.excerpt}</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6">
                          <Button variant="outline">
                            Read Full Release
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="awards" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {awards.map((award) => (
                  <Card key={award.title}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Award className="w-8 h-8 text-accent" />
                        <Badge className="bg-accent text-accent-foreground">{award.year}</Badge>
                      </div>
                      <CardTitle className="text-lg">{award.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{award.organization}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{award.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="media-kit" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-6">Download Media Resources</h3>
                  <div className="space-y-4">
                    {mediaKit.map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.format} • {item.size}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-primary mb-4">Media Guidelines</h4>
                  <div className="space-y-3 text-sm">
                    <p>• Please use our official company name: "Sineva Brokerage by Grupo Sineva"</p>
                    <p>• Logo should maintain minimum clear space requirements</p>
                    <p>• High-resolution images are available for print publications</p>
                    <p>• For interview requests, please contact our media team</p>
                    <p>• All press materials are copyright protected</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {mediaContacts.map((contact) => (
                  <Card key={contact.name}>
                    <CardHeader>
                      <div className="flex items-center">
                        <Users className="w-6 h-6 text-accent mr-3" />
                        <div>
                          <CardTitle className="text-lg">{contact.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{contact.title}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">{contact.region}</Badge>
                        </div>
                        <div>
                          <strong>Phone:</strong> {contact.phone}
                        </div>
                        <div>
                          <strong>Email:</strong> {contact.email}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <div className="bg-muted rounded-lg p-6 max-w-2xl mx-auto">
                  <h4 className="text-lg font-semibold text-primary mb-4">General Media Inquiries</h4>
                  <p className="text-muted-foreground mb-4">
                    For general press inquiries or to schedule interviews with our executives, 
                    please contact our communications team.
                  </p>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Contact Media Team
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-clash font-bold text-primary mb-6">Stay Updated</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to receive our latest press releases and company news directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PressMedia;