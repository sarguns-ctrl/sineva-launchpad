import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AIPropertyRecommendations } from "@/components/AIPropertyRecommendations";
import SEOHead from "@/components/SEOHead";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const RecommendationsPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="AI Property Recommendations - Smart Property Matching | Grupo Sineva"
          description="Get personalized property recommendations powered by AI based on your preferences and search history."
        />
        <Navigation />
        
        <main className="pt-20">
          <AIPropertyRecommendations />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default RecommendationsPage;