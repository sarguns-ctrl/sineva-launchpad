import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { BusinessApprovalSystem } from '@/components/BusinessApprovalSystem';
import SEOHead from '@/components/SEOHead';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';

const AdminBusinesses = () => {
  return (
    <RoleProtectedRoute allowedRoles={['admin', 'hr']}>
      <SEOHead 
        title="Business Management - Admin Dashboard | Grupo Sineva"
        description="Manage business listings, approvals, and verification processes."
      />
      <AdminLayout title="Business Management">
        <BusinessApprovalSystem />
      </AdminLayout>
    </RoleProtectedRoute>
  );
};

export default AdminBusinesses;