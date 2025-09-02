import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AppointmentScheduler } from "@/components/AppointmentScheduler";
import SEOHead from "@/components/SEOHead";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const AppointmentsPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Appointments - Schedule & Manage Meetings | Grupo Sineva"
          description="Schedule property viewings, consultations, and meetings with agents and clients."
        />
        <Navigation />
        
        <main className="pt-20">
          <AppointmentScheduler />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AppointmentsPage;