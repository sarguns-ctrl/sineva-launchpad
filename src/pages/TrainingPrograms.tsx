import { BookOpen, Users, Trophy, Clock, CheckCircle, PlayCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TrainingPrograms = () => {
  const programs = [
    {
      title: "New Agent Bootcamp",
      duration: "4 weeks",
      format: "Hybrid",
      level: "Beginner",
      description: "Comprehensive foundation program for new real estate agents",
      topics: [
        "Real estate fundamentals",
        "Legal requirements and ethics",
        "Market analysis techniques",
        "Client communication skills",
        "Technology platform training",
        "First 90 days success plan"
      ]
    },
    {
      title: "Advanced Sales Mastery", 
      duration: "6 weeks",
      format: "Online",
      level: "Intermediate",
      description: "Advanced sales techniques and negotiation strategies",
      topics: [
        "Advanced listing presentations",
        "Negotiation psychology",
        "Luxury market specialization",
        "Investment property expertise",
        "Commercial real estate basics",
        "International client management"
      ]
    },
    {
      title: "Leadership Development",
      duration: "8 weeks", 
      format: "In-person",
      level: "Advanced",
      description: "Build and lead high-performing real estate teams",
      topics: [
        "Team building strategies",
        "Recruitment and hiring",
        "Performance management",
        "Business planning",
        "Financial management",
        "Succession planning"
      ]
    }
  ];

  const certifications = [
    {
      name: "Digital Marketing Specialist",
      description: "Master online marketing for real estate",
      duration: "2 weeks"
    },
    {
      name: "International Property Advisor",
      description: "Specialize in cross-border transactions",
      duration: "3 weeks"
    },
    {
      name: "Luxury Home Specialist",
      description: "Expert certification for high-end properties",
      duration: "1 week"
    },
    {
      name: "Commercial Real Estate Certified",
      description: "Commercial property transaction expertise", 
      duration: "4 weeks"
    }
  ];

  const learningPaths = [
    {
      icon: BookOpen,
      title: "Self-Paced Learning",
      description: "Access our library of on-demand courses and resources"
    },
    {
      icon: Users,
      title: "Group Workshops",
      description: "Interactive sessions with peers and industry experts"
    },
    {
      icon: Trophy,
      title: "Mentorship Program",
      description: "One-on-one guidance from successful agents"
    },
    {
      icon: PlayCircle,
      title: "Live Training Sessions",
      description: "Real-time training with Q&A opportunities"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground">Education First</Badge>
            <h1 className="text-4xl md:text-5xl font-clash font-bold mb-6">
              Training Programs
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Comprehensive training programs designed to accelerate your real estate career at every stage.
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              View All Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Core Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Core Training Programs</h2>
            <p className="text-lg text-muted-foreground">
              Structured programs for every career stage and specialization.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.title} className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{program.level}</Badge>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {program.duration}
                      </div>
                      <div className="mt-1">{program.format}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <p className="text-muted-foreground">{program.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-sm">What You'll Learn:</h4>
                    <ul className="space-y-1">
                      {program.topics.map((topic) => (
                        <li key={topic} className="flex items-start text-sm">
                          <CheckCircle className="w-3 h-3 text-accent mr-2 mt-1 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Learning Formats</h2>
            <p className="text-lg text-muted-foreground">
              Choose the learning style that fits your schedule and preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.title} className="text-center">
                <CardHeader>
                  <path.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{path.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Certifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-clash font-bold text-primary mb-4">Specialized Certifications</h2>
            <p className="text-lg text-muted-foreground">
              Earn industry-recognized certifications to set yourself apart.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.name}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-2">{cert.name}</CardTitle>
                      <p className="text-muted-foreground">{cert.description}</p>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">
                      {cert.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-clash font-bold text-primary mb-6">Invest in Your Success</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of agents who have accelerated their careers through our training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Browse All Courses
            </Button>
            <Button size="lg" variant="outline">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingPrograms;