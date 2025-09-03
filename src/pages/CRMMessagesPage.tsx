import React from 'react';
import { CRMLayout } from '@/components/CRMLayout';
import { MessagingCenter } from '@/components/MessagingCenter';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import SEOHead from '@/components/SEOHead';

const CRMMessagesPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Messages - CRM Communication | Grupo Sineva"
          description="Manage client communications and conversations in one centralized location."
        />
        
        <CRMLayout>
          <MessagingCenter />
        </CRMLayout>
      </div>
    </ProtectedRoute>
  );
};

export default CRMMessagesPage;