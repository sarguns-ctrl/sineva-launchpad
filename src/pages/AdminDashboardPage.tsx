import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AdminDashboard } from "@/components/AdminDashboard";
import SEOHead from "@/components/SEOHead";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

const AdminDashboardPage = () => {
  return (
    <RoleProtectedRoute allowedRoles={['admin', 'manager']}>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Admin Dashboard - Platform Management | Grupo Sineva"
          description="Administrative dashboard for managing users, properties, agents, and platform operations."
        />
        <Navigation />
        
        <main className="pt-20">
          <AdminDashboard />
        </main>

        <Footer />
      </div>
    </RoleProtectedRoute>
  );
};

export default AdminDashboardPage;