import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AdvancedAgentDashboard } from "@/components/AdvancedAgentDashboard";
import SEOHead from "@/components/SEOHead";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

const AgentDashboardPage = () => {
  return (
    <RoleProtectedRoute allowedRoles={['agent', 'admin']}>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Agent Dashboard - Performance & Management | Grupo Sineva"
          description="Advanced agent dashboard with performance metrics, lead management, and business tools."
        />
        <Navigation />
        
        <main className="pt-20">
          <AdvancedAgentDashboard />
        </main>

        <Footer />
      </div>
    </RoleProtectedRoute>
  );
};

export default AgentDashboardPage;