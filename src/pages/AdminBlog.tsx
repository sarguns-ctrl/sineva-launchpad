import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { BlogManagement } from "@/components/BlogManagement";
import SEOHead from "@/components/SEOHead";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

const AdminBlog = () => {
  return (
    <RoleProtectedRoute allowedRoles={['admin', 'hr']}>
      <SEOHead 
        title="Admin - Blog Management | Grupo Sineva"
        description="Manage blog posts, content creation, and publishing workflow."
      />
      <AdminLayout title="Blog Management">
        <BlogManagement />
      </AdminLayout>
    </RoleProtectedRoute>
  );
};

export default AdminBlog;