import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MarketStatsSection from "@/components/MarketStatsSection";
import Services from "@/components/Services";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import SocialProofBanner from "@/components/SocialProofBanner";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import ExitIntentPopup, { useExitIntent } from "@/components/ExitIntentPopup";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AIPropertyAssistant from "@/components/AIPropertyAssistant";
import { useState } from "react";

const Index = () => {
  const { showExitIntent, closeExitIntent } = useExitIntent();
  const [isAssistantMinimized, setIsAssistantMinimized] = useState(true);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <SocialProofBanner />
      <MarketStatsSection />
      <TestimonialCarousel />
      <Services />
      
      {/* Lead Capture Section */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-clash text-primary mb-4">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-lg text-muted-foreground">
              Get expert guidance tailored to your investment goals and visa requirements
            </p>
          </div>
          <LeadCaptureForm variant="hero" />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
      
      {/* Exit Intent Popup */}
      <ExitIntentPopup 
        isOpen={showExitIntent} 
        onClose={closeExitIntent} 
      />
      
      <AIPropertyAssistant 
        isMinimized={isAssistantMinimized}
        onToggleMinimize={() => setIsAssistantMinimized(!isAssistantMinimized)}
      />
    </div>
  );
};

export default Index;
