import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { AdminDashboard } from "@/components/AdminDashboard";
import SEOHead from "@/components/SEOHead";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

const AdminDashboardPage = () => {
  return (
    <RoleProtectedRoute allowedRoles={['admin', 'manager']}>
      <SEOHead 
        title="Admin Dashboard - Platform Management | Grupo Sineva"
        description="Administrative dashboard for managing users, properties, agents, and platform operations."
      />
      <AdminLayout title="Admin Dashboard">
        <AdminDashboard />
      </AdminLayout>
    </RoleProtectedRoute>
  );
};

export default AdminDashboardPage;