import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { UserDashboard } from "@/components/UserDashboard";
import SEOHead from "@/components/SEOHead";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const UserDashboardPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="My Dashboard - Manage Your Real Estate Journey | Grupo Sineva"
          description="Access your personal dashboard to manage favorite properties, saved searches, appointments, and more."
        />
        <Navigation />
        
        <main className="pt-20">
          <UserDashboard />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default UserDashboardPage;