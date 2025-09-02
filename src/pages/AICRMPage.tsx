import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AIPoweredCRM } from "@/components/AI-PoweredCRM";
import SEOHead from "@/components/SEOHead";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const AICRMPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="AI-Powered CRM - Smart Customer Management | Grupo Sineva"
          description="Manage customer relationships with AI-powered insights, automated workflows, and intelligent lead scoring."
        />
        <Navigation />
        
        <main className="pt-20">
          <AIPoweredCRM />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AICRMPage;