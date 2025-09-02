import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
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
import BusinessBrokerage from './pages/BusinessBrokerage';
import BusinessDetail from './pages/BusinessDetail';
import ListBusiness from './pages/ListBusiness';
import Leadership from "./pages/Leadership";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./pages/NotFound";
import AISearch from "./pages/AISearch";
import JoinTeam from "./pages/JoinTeam";
import CommissionStructure from "./pages/CommissionStructure";
import AgentPackages from "./pages/AgentPackages";
import TrainingPrograms from "./pages/TrainingPrograms";
import AgentResources from "./pages/AgentResources";
import GlobalPresence from "./pages/GlobalPresence";
import Careers from "./pages/Careers";
import PressMedia from "./pages/PressMedia";
import LegalDocuments from "./pages/LegalDocuments";
import FranchiseWithUs from "./pages/FranchiseWithUs";
import PropertySearchPage from "./pages/PropertySearchPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import MortgageCalculatorPage from "./pages/MortgageCalculatorPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import { MessagingCenter } from "@/components/MessagingCenter";
import { AppointmentScheduler } from "@/components/AppointmentScheduler";

import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { LeadManagement } from "@/components/LeadManagement";
import { EmailCampaignManager } from "@/components/EmailCampaignManager";
import { AIPropertyRecommendations } from "@/components/AIPropertyRecommendations";
import { AdvancedAgentDashboard } from "@/components/AdvancedAgentDashboard";
import { AIPoweredCRM } from "@/components/AI-PoweredCRM";
import { VideoCallIntegration } from "@/components/VideoCallIntegration";
import { EnhancedPropertySearch } from "@/components/EnhancedPropertySearch";
import { AdvancedAnalyticsDashboard } from "@/components/AdvancedAnalyticsDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <BreadcrumbNavigation />
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/services" element={<Services />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/insights" element={<MarketInsights />} />
          <Route path="/insights/trends" element={<MarketInsights />} />
          <Route path="/insights/economic" element={<MarketInsights />} />
          <Route path="/insights/cities" element={<MarketInsights />} />
          <Route path="/insights/forecast" element={<MarketInsights />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/search" element={<PropertySearchPage />} />
          <Route path="/ai-search" element={<AISearch />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/calculator" element={<MortgageCalculatorPage />} />
          <Route path="/messages" element={<MessagingCenter />} />
          <Route path="/appointments" element={<AppointmentScheduler />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/leads" element={<LeadManagement />} />
          <Route path="/campaigns" element={<EmailCampaignManager />} />
          <Route path="/recommendations" element={<AIPropertyRecommendations />} />
          <Route path="/agent-dashboard" element={<AdvancedAgentDashboard />} />
          <Route path="/ai-crm" element={<AIPoweredCRM />} />
          <Route path="/video-calls" element={<VideoCallIntegration />} />
          <Route path="/advanced-search" element={<EnhancedPropertySearch />} />
          <Route path="/advanced-analytics" element={<AdvancedAnalyticsDashboard />} />
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
          <Route path="/businesses" element={<BusinessBrokerage />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
          <Route path="/list-business" element={<ListBusiness />} />
        <Route path="/join-team" element={<JoinTeam />} />
        <Route path="/commission-structure" element={<CommissionStructure />} />
        <Route path="/agent-packages" element={<AgentPackages />} />
        <Route path="/training-programs" element={<TrainingPrograms />} />
        <Route path="/agent-resources" element={<AgentResources />} />
        <Route path="/global-presence" element={<GlobalPresence />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press-media" element={<PressMedia />} />
        <Route path="/legal-documents" element={<LegalDocuments />} />
        <Route path="/franchise" element={<FranchiseWithUs />} />
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
