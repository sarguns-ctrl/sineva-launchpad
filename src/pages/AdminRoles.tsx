import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { RoleManagement } from '@/components/RoleManagement';
import SEOHead from '@/components/SEOHead';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';

const AdminRoles = () => {
  return (
    <RoleProtectedRoute allowedRoles={['admin']}>
      <SEOHead 
        title="Role Management - Admin Dashboard | Grupo Sineva"
        description="Manage user roles and permissions across the platform."
      />
      <AdminLayout title="Role Management">
        <RoleManagement />
      </AdminLayout>
    </RoleProtectedRoute>
  );
};

export default AdminRoles;