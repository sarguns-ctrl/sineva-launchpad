import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const AdminLeads = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Admin - Lead Management | Grupo Sineva"
          description="Manage and track leads across the platform and agent assignments."
        />
        <Navigation />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <MessageSquare className="h-8 w-8" />
                Lead Management
              </h1>
              <p className="text-muted-foreground">Track and manage platform leads</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lead Management Console</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Lead Management</h3>
                  <p className="text-muted-foreground">
                    Comprehensive lead tracking and management features are coming soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AdminLeads;