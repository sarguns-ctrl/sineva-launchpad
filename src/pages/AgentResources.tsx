import { Download, FileText, Calculator, Smartphone, Globe, Users, BookOpen, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AgentResources = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDownload = (resourceName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${resourceName}...`,
    });
  };

  const handleAccessTool = (toolName: string) => {
    toast({
      title: "Tool Access",
      description: `Opening ${toolName}...`,
    });
  };

  const handleWatchTraining = (trainingTitle: string) => {
    toast({
      title: "Training Started",
      description: `Starting "${trainingTitle}" training session...`,
    });
  };

  const handleContactSupport = () => {
    navigate('/contact');
  };

  const handleViewHelpCenter = () => {
    toast({
      title: "Help Center",
      description: "Opening comprehensive help documentation...",
    });
  };
  const tools = [
    {
      category: "Marketing Materials",
      icon: FileText,
      resources: [
        { name: "Listing Presentation Templates", type: "PowerPoint", size: "15 MB" },
        { name: "Business Card Templates", type: "AI/PSD", size: "8 MB" },
        { name: "Social Media Graphics", type: "PNG/AI", size: "25 MB" },
        { name: "Property Flyers", type: "InDesign", size: "12 MB" },
        { name: "Email Newsletter Templates", type: "HTML", size: "5 MB" }
      ]
    },
    {
      category: "Calculators & Tools",
      icon: Calculator,
      resources: [
        { name: "Mortgage Calculator", type: "Excel", size: "2 MB" },
        { name: "Commission Calculator", type: "Excel", size: "1 MB" },
        { name: "ROI Analysis Tool", type: "Excel", size: "3 MB" },
        { name: "Market Analysis Spreadsheet", type: "Excel", size: "4 MB" },
        { name: "Lead Tracking Template", type: "Excel", size: "2 MB" }
      ]
    },
    {
      category: "Legal Documents",
      icon: FileText,
      resources: [
        { name: "Purchase Agreement Templates", type: "PDF", size: "1 MB" },
        { name: "Disclosure Forms", type: "PDF", size: "800 KB" },
        { name: "Listing Agreement Templates", type: "PDF", size: "600 KB" },
        { name: "Addendum Templates", type: "PDF", size: "400 KB" },
        { name: "Inspection Forms", type: "PDF", size: "700 KB" }
      ]
    }
  ];

  const digitalTools = [
    {
      name: "Mobile CRM App",
      description: "Manage leads and clients on the go",
      platform: "iOS & Android",
      icon: Smartphone
    },
    {
      name: "Virtual Tour Creator",
      description: "Create immersive property experiences",
      platform: "Web & Mobile",
      icon: Globe
    },
    {
      name: "Team Collaboration Hub",
      description: "Coordinate with team members and clients",
      platform: "Web Based",
      icon: Users
    },
    {
      name: "Learning Management System",
      description: "Access training courses and certifications",
      platform: "Web & Mobile",
      icon: BookOpen
    }
  ];

  const trainingResources = [
    {
      title: "Market Update Webinars",
      description: "Monthly market analysis and trends",
      duration: "45 min",
      type: "Live"
    },
    {
      title: "Sales Technique Masterclass",
      description: "Advanced closing and negotiation strategies",
      duration: "2 hours",
      type: "On-demand"
    },
    {
      title: "Technology Training Series",
      description: "Master our platform tools and features",
      duration: "30 min",
      type: "Interactive"
    },
    {
      title: "Luxury Market Specialization",
      description: "High-end property marketing and sales",
      duration: "1.5 hours",
      type: "Certification"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground">Resource Center</Badge>
            <h1 className="text-4xl md:text-5xl font-clash font-bold mb-6">
              Agent Resources
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Everything you need to succeed: tools, templates, training materials, and digital resources.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="downloads" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="digital-tools">Digital Tools</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
            </TabsList>

            <TabsContent value="downloads" className="mt-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {tools.map((category) => (
                  <Card key={category.category}>
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <category.icon className="w-6 h-6 text-accent mr-2" />
                        <CardTitle className="text-lg">{category.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.resources.map((resource) => (
                          <div key={resource.name} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium text-sm">{resource.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {resource.type} • {resource.size}
                              </div>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => handleDownload(resource.name)}>
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="digital-tools" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {digitalTools.map((tool) => (
                  <Card key={tool.name}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <tool.icon className="w-8 h-8 text-accent mr-3" />
                          <div>
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{tool.platform}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" onClick={() => handleAccessTool(tool.name)}>Access Tool</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="training" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {trainingResources.map((resource) => (
                  <Card key={resource.title}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-accent text-accent-foreground">{resource.type}</Badge>
                          <div className="text-xs text-muted-foreground mt-1">{resource.duration}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" onClick={() => handleWatchTraining(resource.title)}>
                        <Video className="w-4 h-4 mr-2" />
                        Watch Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Quick Access Tools</h2>
            <p className="text-lg text-muted-foreground">
              Frequently used tools and calculators for daily operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Mortgage Calc", icon: Calculator },
              { name: "Commission Calc", icon: Calculator },
              { name: "ROI Analysis", icon: Calculator },
              { name: "Market Reports", icon: FileText },
              { name: "Contact Manager", icon: Users },
              { name: "Document Library", icon: BookOpen }
            ].map((tool) => (
              <Card key={tool.name} className="text-center cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleAccessTool(tool.name)}>
                <CardContent className="pt-6">
                  <tool.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-sm font-medium">{tool.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-clash font-bold text-primary mb-6">Need Help?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our support team is here to help you make the most of your resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleContactSupport}>
              Contact Support
            </Button>
            <Button size="lg" variant="outline" onClick={handleViewHelpCenter}>
              View Help Center
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AgentResources;