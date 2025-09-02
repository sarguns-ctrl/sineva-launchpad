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
import Markets from "./pages/Markets";
import MarketDetail from "./pages/MarketDetail";
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
import BusinessMarketplace from './pages/BusinessMarketplace';
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
import AdminUsers from "./pages/AdminUsers";
import AdminProperties from "./pages/AdminProperties";
import AdminLeads from "./pages/AdminLeads";
import AdminSettings from "./pages/AdminSettings";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MessagingPage from "./pages/MessagingPage";
import AppointmentsPage from "./pages/AppointmentsPage";

import AnalyticsPage from "./pages/AnalyticsPage";
import LeadsPage from "./pages/LeadsPage";
import CampaignsPage from "./pages/CampaignsPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import AgentDashboardPageNew from "./pages/AgentDashboardPage";
import AICRMPage from "./pages/AICRMPage";
import VideoCallsPage from "./pages/VideoCallsPage";
import AdvancedSearchPage from "./pages/AdvancedSearchPage";
import AdvancedAnalyticsPage from "./pages/AdvancedAnalyticsPage";

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
        <Route path="/markets" element={<Markets />} />
        <Route path="/markets/:marketId" element={<MarketDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/search" element={<PropertySearchPage />} />
          <Route path="/ai-search" element={<AISearch />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/calculator" element={<MortgageCalculatorPage />} />
          <Route path="/messages" element={<MessagingPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/properties" element={<AdminProperties />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/agent-dashboard" element={<AgentDashboardPageNew />} />
          <Route path="/ai-crm" element={<AICRMPage />} />
          <Route path="/video-calls" element={<VideoCallsPage />} />
          <Route path="/advanced-search" element={<AdvancedSearchPage />} />
          <Route path="/advanced-analytics" element={<AdvancedAnalyticsPage />} />
          <Route path="/agent/:id" element={<AgentProfile />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/news" element={<News />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        <Route path="/business-brokerage" element={<BusinessBrokerage />} />
        <Route path="/businesses" element={<BusinessMarketplace />} />
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
