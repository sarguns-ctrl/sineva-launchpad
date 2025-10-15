import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Target, Shield, Award } from "lucide-react";
import heroBusinessMeeting from "@/assets/hero-business-meeting.jpg";
import teamCollaboration from "@/assets/team-collaboration.jpg";
import businessSkyline from "@/assets/business-skyline.jpg";
import modernWorkspace from "@/assets/modern-workspace.jpg";
import businessStrategy from "@/assets/business-strategy.jpg";
import professionalsHandshake from "@/assets/professionals-handshake.jpg";

const ImmersiveGallery = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      ref={elementRef}
      className="relative py-32 bg-gradient-to-b from-muted/40 via-background to-secondary/30 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/[0.06] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <Badge className="bg-accent/10 text-accent px-6 py-2.5 text-sm font-semibold border border-accent/30 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            Why Choose Sineva Grupo
          </Badge>
          
          <h2 className="text-5xl md:text-7xl font-bold text-foreground font-clash mb-6 leading-tight">
            Your Vision,
            <span className="block mt-2 bg-gradient-accent bg-clip-text text-transparent">Our Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From strategy to success - we guide international investors through every step of their North American business journey
          </p>
        </div>

        {/* Masonry-style Image Grid */}
        <div className="grid grid-cols-12 gap-6 mb-16">
          {/* Large Hero Image - Left Side */}
          <div 
            className={`col-span-12 lg:col-span-7 transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <div className="group relative h-[600px] rounded-3xl overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-700 border border-border/40 hover:border-accent/30">
              <img 
                src={heroBusinessMeeting}
                alt="Professional business meeting with international investors"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/98 via-card/50 to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute top-6 left-6">
                <Badge className="bg-accent text-accent-foreground border-0 shadow-accent px-5 py-2.5 font-semibold text-sm">
                  <Award className="w-4 h-4 mr-2" />
                  Premium Service
                </Badge>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl p-8 shadow-elegant">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-clash leading-tight">
                    Strategic Business Advisory
                  </h3>
                  <p className="text-muted-foreground mb-7 text-lg leading-relaxed">
                    Expert guidance for E-2, EB-5, and business immigration programs with proven success rates
                  </p>
                  <Button asChild size="lg" className="group/btn shadow-accent hover:shadow-glow">
                    <Link to="/services">
                      Explore Services
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stacked Images */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            {/* Top Right Image */}
            <div 
              className={`transition-all duration-1000 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              <div className="group relative h-[285px] rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-700 border border-border/40 hover:border-accent/30">
                <img 
                  src={teamCollaboration}
                  alt="Team collaboration and strategic planning"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/55 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-accent/15 backdrop-blur-xl rounded-xl flex items-center justify-center border border-accent/30 flex-shrink-0 shadow-sm">
                      <Target className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground mb-2 font-clash">End-to-End Support</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">From visa applications to business setup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right Image */}
            <div 
              className={`transition-all duration-1000 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '400ms' }}
            >
              <div className="group relative h-[285px] rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-700 border border-border/40 hover:border-primary/30">
                <img 
                  src={businessSkyline}
                  alt="Modern city skyline representing business opportunities"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/55 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary/15 backdrop-blur-xl rounded-xl flex items-center justify-center border border-primary/30 flex-shrink-0 shadow-sm">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground mb-2 font-clash">Trusted Excellence</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">20+ years of proven market expertise</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Three Small Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '600ms' }}
          >
            <div className="group relative h-[280px] rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500">
              <img 
                src={modernWorkspace}
                alt="Modern workspace environment"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="bg-accent/20 text-accent border border-accent/40 mb-3">
                  Business Setup
                </Badge>
                <h4 className="text-lg font-bold text-foreground mb-2 font-clash">Office Solutions</h4>
                <p className="text-sm text-muted-foreground">Complete workspace infrastructure</p>
              </div>
            </div>
          </div>

          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '700ms' }}
          >
            <div className="group relative h-[280px] rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500">
              <img 
                src={businessStrategy}
                alt="Business strategy and planning"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="bg-primary/20 text-primary-foreground border border-primary/40 mb-3">
                  Strategy
                </Badge>
                <h4 className="text-lg font-bold text-foreground mb-2 font-clash">Market Analysis</h4>
                <p className="text-sm text-muted-foreground">Data-driven investment insights</p>
              </div>
            </div>
          </div>

          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '800ms' }}
          >
            <div className="group relative h-[280px] rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500">
              <img 
                src={professionalsHandshake}
                alt="Professional partnership and trust"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="bg-accent/20 text-accent border border-accent/40 mb-3">
                  Partnership
                </Badge>
                <h4 className="text-lg font-bold text-foreground mb-2 font-clash">Legal Support</h4>
                <p className="text-sm text-muted-foreground">Expert immigration attorneys</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImmersiveGallery;
