import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import SEOHead from "@/components/SEOHead";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const AnalyticsPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Analytics Dashboard - Platform Insights | Grupo Sineva"
          description="View comprehensive analytics and insights about platform performance, user engagement, and business metrics."
        />
        <Navigation />
        
        <main className="pt-20">
          <AnalyticsDashboard />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AnalyticsPage;