import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { EmailCampaignManager } from "@/components/EmailCampaignManager";
import SEOHead from "@/components/SEOHead";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const CampaignsPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Email Campaigns - Marketing Automation | Grupo Sineva"
          description="Create, manage, and track email marketing campaigns to engage leads and clients effectively."
        />
        <Navigation />
        
        <main className="pt-20">
          <EmailCampaignManager />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CampaignsPage;