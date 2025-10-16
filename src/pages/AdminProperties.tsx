import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { PropertyManagement } from "@/components/PropertyManagement";
import SEOHead from "@/components/SEOHead";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

const AdminProperties = () => {
  return (
    <RoleProtectedRoute allowedRoles={['admin', 'hr']}>
      <SEOHead 
        title="Admin - Property Management | Grupo Sineva"
        description="Manage property listings, approvals, and content moderation."
      />
      <AdminLayout title="Property Management">
        <PropertyManagement />
      </AdminLayout>
    </RoleProtectedRoute>
  );
};

export default AdminProperties;