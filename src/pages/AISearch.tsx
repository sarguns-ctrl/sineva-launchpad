import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AIPropertySearch from "@/components/AIPropertySearch";


const AISearch = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                AI-Powered Property Search
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Use natural language to find your perfect property. Our AI understands your preferences and finds the best matches.
              </p>
            </div>
            
            <AIPropertySearch />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AISearch;