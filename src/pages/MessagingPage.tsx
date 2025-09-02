import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MessagingCenter } from "@/components/MessagingCenter";
import SEOHead from "@/components/SEOHead";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const MessagingPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Messages - Communication Center | Grupo Sineva"
          description="Communicate with agents, clients, and team members through our integrated messaging system."
        />
        <Navigation />
        
        <main className="pt-20">
          <MessagingCenter />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default MessagingPage;