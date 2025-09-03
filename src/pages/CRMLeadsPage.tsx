import React from 'react';
import { CRMLayout } from '@/components/CRMLayout';
import { LeadsPipeline } from '@/components/LeadsPipeline';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import SEOHead from '@/components/SEOHead';

const CRMLeadsPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Leads Pipeline - CRM | Grupo Sineva"
          description="Manage your sales pipeline with visual lead tracking and conversion tools."
        />
        
        <CRMLayout>
          <LeadsPipeline />
        </CRMLayout>
      </div>
    </ProtectedRoute>
  );
};

export default CRMLeadsPage;