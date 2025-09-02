import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PropertySearch } from "@/components/PropertySearch";
import SEOHead from "@/components/SEOHead";

const PropertySearchPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Property Search - Find Your Perfect Property | Grupo Sineva"
        description="Search through thousands of properties for sale and rent. Find your perfect home or commercial property with our advanced search filters."
      />
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Property Search
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find your perfect property with our comprehensive search tools and filters.
              </p>
            </div>
            
            <PropertySearch />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertySearchPage;