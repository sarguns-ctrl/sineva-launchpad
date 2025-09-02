import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LeadManagement } from "@/components/LeadManagement";
import SEOHead from "@/components/SEOHead";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const LeadsPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Lead Management - Track & Manage Leads | Grupo Sineva"
          description="Manage and track leads, follow up with prospects, and convert leads into clients with our comprehensive lead management system."
        />
        <Navigation />
        
        <main className="pt-20">
          <LeadManagement />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default LeadsPage;