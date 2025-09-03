import React from 'react';
import { CRMLayout } from '@/components/CRMLayout';
import { CRMDashboard } from '@/components/CRMDashboard';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import SEOHead from '@/components/SEOHead';

const CRMPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="CRM Dashboard - Customer Relationship Management | Grupo Sineva"
          description="Comprehensive CRM dashboard for managing leads, clients, communications, and sales pipeline."
        />
        
        <CRMLayout>
          <CRMDashboard />
        </CRMLayout>
      </div>
    </ProtectedRoute>
  );
};

export default CRMPage;