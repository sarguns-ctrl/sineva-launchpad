import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from './AdminSidebar';
import Navigation from './Navigation';
import Footer from './Footer';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <SidebarProvider>
        <div className="flex w-full pt-20">
          <AdminSidebar />
          
          <main className="flex-1 p-6">
            {title && (
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              </div>
            )}
            {children}
          </main>
        </div>
      </SidebarProvider>
      
      <Footer />
    </div>
  );
};