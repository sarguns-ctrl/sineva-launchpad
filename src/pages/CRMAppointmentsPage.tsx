import React from 'react';
import { CRMLayout } from '@/components/CRMLayout';
import { AppointmentScheduler } from '@/components/AppointmentScheduler';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import SEOHead from '@/components/SEOHead';

const CRMAppointmentsPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Appointments - CRM Scheduling | Grupo Sineva"
          description="Schedule and manage property viewings, consultations, and client meetings."
        />
        
        <CRMLayout>
          <AppointmentScheduler />
        </CRMLayout>
      </div>
    </ProtectedRoute>
  );
};

export default CRMAppointmentsPage;