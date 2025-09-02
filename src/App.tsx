import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Services from "./pages/Services";
import Agents from "./pages/Agents";
import Properties from "./pages/Properties";
import MarketInsights from "./pages/MarketInsights";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PropertyDetail from "./pages/PropertyDetail";
import AgentProfile from "./pages/AgentProfile";
import Blog from "./pages/Blog";
import News from "./pages/News";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CommercialRealEstate from "@/pages/CommercialRealEstate";
import ResidentialProperties from "@/pages/ResidentialProperties";
import InternationalServices from "@/pages/InternationalServices";
import ConciergeServices from "@/pages/ConciergeServices";
import InvestmentAdvisory from "@/pages/InvestmentAdvisory";
import BusinessBrokerage from "./pages/BusinessBrokerage";
import Leadership from "./pages/Leadership";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/services" element={<Services />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/insights" element={<MarketInsights />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/agent/:id" element={<AgentProfile />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/news" element={<News />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        <Route path="/commercial-real-estate" element={<CommercialRealEstate />} />
        <Route path="/residential-properties" element={<ResidentialProperties />} />
        <Route path="/international-services" element={<InternationalServices />} />
        <Route path="/concierge-services" element={<ConciergeServices />} />
        <Route path="/investment-advisory" element={<InvestmentAdvisory />} />
        <Route path="/business-brokerage" element={<BusinessBrokerage />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/help" element={<HelpCenter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
