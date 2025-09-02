import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PropertyShowcase from "@/components/PropertyShowcase";
import MarketInsights from "@/components/MarketInsights";
import AgentSection from "@/components/AgentSection";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <PropertyShowcase />
      <MarketInsights />
      <AgentSection />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
