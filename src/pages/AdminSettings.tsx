import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

const AdminSettings = () => {
  return (
    <RoleProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Admin - System Settings | Grupo Sineva"
          description="Configure system settings, integrations, and platform preferences."
        />
        <Navigation />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Settings className="h-8 w-8" />
                System Settings
              </h1>
              <p className="text-muted-foreground">Configure platform settings and preferences</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">System Settings</h3>
                  <p className="text-muted-foreground">
                    Advanced system configuration options including email templates, notification settings, payment processing, and integration management are being developed.
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

export default AdminSettings;