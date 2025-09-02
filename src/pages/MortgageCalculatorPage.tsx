import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import SEOHead from "@/components/SEOHead";

const MortgageCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Mortgage Calculator - Calculate Your Monthly Payments | Grupo Sineva"
        description="Use our free mortgage calculator to estimate your monthly payments. Compare loan scenarios and save your calculations."
      />
      <Navigation />
      
      <main className="pt-20">
        <MortgageCalculator />
      </main>

      <Footer />
    </div>
  );
};

export default MortgageCalculatorPage;