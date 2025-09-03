import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import { BlogManagement } from "@/components/BlogManagement";

const AdminBlog = () => {
  return (
    <RoleProtectedRoute allowedRoles={['admin', 'hr']}>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Admin - Blog Management | Grupo Sineva"
          description="Manage blog posts, content creation, and publishing workflow."
        />
        <Navigation />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <BlogManagement />
          </div>
        </main>

        <Footer />
      </div>
    </RoleProtectedRoute>
  );
};

export default AdminBlog;