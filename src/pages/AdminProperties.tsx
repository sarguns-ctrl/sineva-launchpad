import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home } from 'lucide-react';

const AdminProperties = () => {
  return (
    <RoleProtectedRoute allowedRoles={['admin', 'manager']}>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Admin - Property Management | Grupo Sineva"
          description="Manage property listings, approvals, and content moderation."
        />
        <Navigation />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Home className="h-8 w-8" />
                Property Management
              </h1>
              <p className="text-muted-foreground">Manage property listings and content</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Property Management Console</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Home className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Property Management</h3>
                  <p className="text-muted-foreground">
                    Advanced property management tools and analytics are coming soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </RoleProtectedRoute>
  );
};

export default AdminProperties;