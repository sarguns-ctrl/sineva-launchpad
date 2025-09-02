import { lazy, Suspense, useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SocialProofBanner from "@/components/SocialProofBanner";
import MarketLocationCards from "@/components/MarketLocationCards";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import ExitIntentPopup, { useExitIntent } from "@/components/ExitIntentPopup";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AIPropertyAssistant from "@/components/AIPropertyAssistant";
import ErrorBoundary from "@/components/ErrorBoundary";
import LazySection from "@/components/LazySection";
import SEOHead from "@/components/SEOHead";
import PersonalizationEngine from "@/components/PersonalizationEngine";
import ConversionOptimizer from "@/components/ConversionOptimizer";
import { useAnalytics } from "@/hooks/useAnalytics";

// Lazy load heavy components
const DynamicStatsSection = lazy(() => import("@/components/DynamicStatsSection"));
const Services = lazy(() => import("@/components/Services"));
const TestimonialCarousel = lazy(() => import("@/components/TestimonialCarousel"));

const Index = () => {
  const { showExitIntent, closeExitIntent } = useExitIntent();
  const [isAssistantMinimized, setIsAssistantMinimized] = useState(true);
  const { trackPageView } = useAnalytics();

  // Track page view on mount
  useEffect(() => {
    trackPageView('Homepage');
  }, [trackPageView]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Premium Real Estate International",
    "description": "North America's most trusted real estate professionals specializing in international investment opportunities",
    "url": "https://example.com",
    "logo": "https://example.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-REAL-ESTATE",
      "contactType": "customer service",
      "availableLanguage": ["English", "Spanish", "French"]
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country", 
        "name": "Canada"
      }
    ],
    "serviceType": ["Real Estate Investment", "Commercial Real Estate", "Residential Properties", "Visa Investment Programs"]
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Premium Real Estate - International Investment Opportunities | 20+ Years Experience"
        description="Connect with North America's most trusted real estate professionals. 20+ years of expertise in international investment, E-2 visa, EB-5 visa programs. Licensed professionals serving 15+ countries."
        keywords={["real estate investment", "international property investment", "E-2 visa real estate", "EB-5 investment program", "commercial real estate", "residential investment", "visa investment"]}
        structuredData={structuredData}
      />
      
      <Navigation />
      
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <SocialProofBanner />
      </ErrorBoundary>

      <ErrorBoundary>
        <MarketLocationCards />
      </ErrorBoundary>

      <ErrorBoundary>
        <LazySection>
          <PersonalizationEngine />
        </LazySection>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <LazySection>
          <Suspense fallback={<div className="h-96 animate-pulse bg-muted/20" />}>
            <DynamicStatsSection />
          </Suspense>
        </LazySection>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <LazySection>
          <Suspense fallback={<div className="h-96 animate-pulse bg-muted/20" />}>
            <TestimonialCarousel />
          </Suspense>
        </LazySection>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <LazySection>
          <Suspense fallback={<div className="h-96 animate-pulse bg-muted/20" />}>
            <Services />
          </Suspense>
        </LazySection>
      </ErrorBoundary>
      
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
