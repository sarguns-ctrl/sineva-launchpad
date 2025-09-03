import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { SystemSettingsManagement } from '@/components/SystemSettingsManagement';
import SEOHead from "@/components/SEOHead";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

const AdminSettings = () => {
  return (
    <RoleProtectedRoute allowedRoles={['admin']}>
      <SEOHead 
        title="Admin - System Settings | Grupo Sineva"
        description="Configure system settings, integrations, and platform preferences."
      />
      <AdminLayout title="System Settings">
        <SystemSettingsManagement />
      </AdminLayout>
    </RoleProtectedRoute>
  );
};

export default AdminSettings;