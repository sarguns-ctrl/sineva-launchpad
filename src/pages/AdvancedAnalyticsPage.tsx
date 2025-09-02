import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AdvancedAnalyticsDashboard } from "@/components/AdvancedAnalyticsDashboard";
import SEOHead from "@/components/SEOHead";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const AdvancedAnalyticsPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Advanced Analytics - Deep Business Insights | Grupo Sineva"
          description="Access advanced analytics with detailed business insights, predictive analytics, and comprehensive reporting tools."
        />
        <Navigation />
        
        <main className="pt-20">
          <AdvancedAnalyticsDashboard />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AdvancedAnalyticsPage;