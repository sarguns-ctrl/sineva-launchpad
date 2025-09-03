import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import SEOHead from '@/components/SEOHead';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';

const AdminPerformance = () => {
  return (
    <RoleProtectedRoute allowedRoles={['admin', 'hr']}>
      <SEOHead 
        title="Performance Analytics - Admin Dashboard | Grupo Sineva"
        description="Detailed performance analytics and insights for properties, leads, and business metrics."
      />
      <AdminLayout title="Performance Analytics">
        <AnalyticsDashboard />
      </AdminLayout>
    </RoleProtectedRoute>
  );
};

export default AdminPerformance;