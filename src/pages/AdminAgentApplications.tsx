import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { AgentApplicationApproval } from '@/components/AgentApplicationApproval';
import SEOHead from '@/components/SEOHead';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';

const AdminAgentApplications = () => {
  return (
    <RoleProtectedRoute allowedRoles={['admin', 'hr']}>
      <SEOHead 
        title="Agent Applications - Admin Dashboard | Grupo Sineva"
        description="Review and approve agent applications for the platform."
      />
      <AdminLayout title="Agent Applications">
        <AgentApplicationApproval />
      </AdminLayout>
    </RoleProtectedRoute>
  );
};

export default AdminAgentApplications;
