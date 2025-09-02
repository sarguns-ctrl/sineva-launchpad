import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { EnhancedPropertySearch } from "@/components/EnhancedPropertySearch";
import SEOHead from "@/components/SEOHead";

const AdvancedSearchPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Advanced Property Search - Enhanced Search & Filters | Grupo Sineva"
        description="Use our advanced property search with enhanced filters, map view, and AI-powered matching to find your perfect property."
      />
      <Navigation />
      
      <main className="pt-20">
        <EnhancedPropertySearch />
      </main>

      <Footer />
    </div>
  );
};

export default AdvancedSearchPage;