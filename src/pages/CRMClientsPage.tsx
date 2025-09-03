import React from 'react';
import { CRMLayout } from '@/components/CRMLayout';
import { ClientProfiles } from '@/components/ClientProfiles';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import SEOHead from '@/components/SEOHead';

const CRMClientsPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Client Profiles - CRM | Grupo Sineva"
          description="Comprehensive client relationship management with detailed profiles and interaction history."
        />
        
        <CRMLayout>
          <ClientProfiles />
        </CRMLayout>
      </div>
    </ProtectedRoute>
  );
};

export default CRMClientsPage;