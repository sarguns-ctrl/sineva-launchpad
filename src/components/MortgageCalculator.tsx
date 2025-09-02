import React, { useState, useEffect } from 'react';
import { Calculator, PieChart, TrendingUp, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface CalculationResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  monthlyPrincipalAndInterest: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  monthlyHOA: number;
}

export const MortgageCalculator: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [propertyTaxes, setPropertyTaxes] = useState<string>('');
  const [insurance, setInsurance] = useState<string>('');
  const [hoaFees, setHoaFees] = useState<string>('');
  const [scenarioName, setScenarioName] = useState<string>('');
  
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [savedScenarios, setSavedScenarios] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      loadSavedScenarios();
    }
  }, [user]);

  useEffect(() => {
    if (purchasePrice && downPayment && interestRate && loanTerm) {
      calculateMortgage();
    }
  }, [purchasePrice, downPayment, interestRate, loanTerm, propertyTaxes, insurance, hoaFees]);

  const loadSavedScenarios = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_scenarios')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedScenarios(data || []);
    } catch (error: any) {
      console.error('Error loading scenarios:', error);
    }
  };

  const calculateMortgage = () => {
    const price = parseFloat(purchasePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseInt(loanTerm) || 30;
    const taxes = parseFloat(propertyTaxes) || 0;
    const ins = parseFloat(insurance) || 0;
    const hoa = parseFloat(hoaFees) || 0;

    if (price === 0 || down === 0 || rate === 0) {
      setResults(null);
      return;
    }

    const principal = price - down;
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;

    let monthlyPI = 0;
    if (monthlyRate > 0) {
      monthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                  (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyPI = principal / numPayments;
    }

    const monthlyTaxes = taxes / 12;
    const monthlyInsurance = ins / 12;
    const monthlyHOA = hoa / 12;
    const monthlyPayment = monthlyPI + monthlyTaxes + monthlyInsurance + monthlyHOA;
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = (monthlyPI * numPayments) - principal;

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      principal,
      monthlyPrincipalAndInterest: monthlyPI,
      monthlyTaxes,
      monthlyInsurance,
      monthlyHOA
    });
  };

  const saveScenario = async () => {
    if (!user || !results || !scenarioName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a scenario name and ensure calculations are complete",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('financial_scenarios')
        .insert({
          user_id: user.id,
          scenario_name: scenarioName,
          purchase_price: parseFloat(purchasePrice),
          down_payment: parseFloat(downPayment),
          interest_rate: parseFloat(interestRate),
          loan_term: parseInt(loanTerm),
          property_taxes: parseFloat(propertyTaxes) || 0,
          insurance: parseFloat(insurance) || 0,
          hoa_fees: parseFloat(hoaFees) || 0,
          calculations: results as any
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Scenario saved successfully"
      });

      setScenarioName('');
      loadSavedScenarios();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const loadScenario = (scenario: any) => {
    setPurchasePrice(scenario.purchase_price.toString());
    setDownPayment(scenario.down_payment.toString());
    setInterestRate(scenario.interest_rate.toString());
    setLoanTerm(scenario.loan_term.toString());
    setPropertyTaxes(scenario.property_taxes?.toString() || '');
    setInsurance(scenario.insurance?.toString() || '');
    setHoaFees(scenario.hoa_fees?.toString() || '');
    setScenarioName(scenario.scenario_name);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateDownPaymentPercentage = () => {
    const price = parseFloat(purchasePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    return price > 0 ? (down / price) * 100 : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Calculator className="h-8 w-8" />
          Mortgage Calculator
        </h1>
        <p className="text-muted-foreground">Calculate mortgage payments and compare scenarios</p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="scenarios">Saved Scenarios</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purchase-price">Purchase Price</Label>
                    <Input
                      id="purchase-price"
                      type="number"
                      placeholder="500000"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="down-payment">Down Payment</Label>
                    <Input
                      id="down-payment"
                      type="number"
                      placeholder="100000"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                    />
                    {purchasePrice && downPayment && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {calculateDownPaymentPercentage().toFixed(1)}% of purchase price
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.01"
                      placeholder="6.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loan-term">Loan Term (years)</Label>
                    <Input
                      id="loan-term"
                      type="number"
                      placeholder="30"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Additional Costs (Annual)</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="property-taxes">Property Taxes</Label>
                      <Input
                        id="property-taxes"
                        type="number"
                        placeholder="12000"
                        value={propertyTaxes}
                        onChange={(e) => setPropertyTaxes(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="insurance">Homeowners Insurance</Label>
                      <Input
                        id="insurance"
                        type="number"
                        placeholder="2400"
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hoa-fees">HOA Fees</Label>
                      <Input
                        id="hoa-fees"
                        type="number"
                        placeholder="1200"
                        value={hoaFees}
                        onChange={(e) => setHoaFees(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {user && (
                  <div className="pt-4 border-t">
                    <Label htmlFor="scenario-name">Scenario Name (to save)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="scenario-name"
                        placeholder="My Home Purchase"
                        value={scenarioName}
                        onChange={(e) => setScenarioName(e.target.value)}
                      />
                      <Button onClick={saveScenario} disabled={!scenarioName.trim() || !results}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">
                        {formatCurrency(results.monthlyPayment)}
                      </p>
                      <p className="text-muted-foreground">Monthly Payment</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Principal & Interest</span>
                        <span className="font-semibold">
                          {formatCurrency(results.monthlyPrincipalAndInterest)}
                        </span>
                      </div>
                      {results.monthlyTaxes > 0 && (
                        <div className="flex justify-between">
                          <span>Property Taxes</span>
                          <span className="font-semibold">
                            {formatCurrency(results.monthlyTaxes)}
                          </span>
                        </div>
                      )}
                      {results.monthlyInsurance > 0 && (
                        <div className="flex justify-between">
                          <span>Insurance</span>
                          <span className="font-semibold">
                            {formatCurrency(results.monthlyInsurance)}
                          </span>
                        </div>
                      )}
                      {results.monthlyHOA > 0 && (
                        <div className="flex justify-between">
                          <span>HOA Fees</span>
                          <span className="font-semibold">
                            {formatCurrency(results.monthlyHOA)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t space-y-2">
                      <div className="flex justify-between">
                        <span>Loan Amount</span>
                        <span>{formatCurrency(results.principal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Interest</span>
                        <span>{formatCurrency(results.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total Payment</span>
                        <span>{formatCurrency(results.totalPayment)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calculator className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Enter loan details to calculate your mortgage payment
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios">
          <Card>
            <CardHeader>
              <CardTitle>Saved Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              {savedScenarios.length > 0 ? (
                <div className="space-y-4">
                  {savedScenarios.map((scenario) => (
                    <div key={scenario.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{scenario.scenario_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(scenario.purchase_price)} • {scenario.interest_rate}% • {scenario.loan_term} years
                          </p>
                          {scenario.calculations && (
                            <p className="text-lg font-semibold text-primary mt-2">
                              {formatCurrency(scenario.calculations.monthlyPayment)}/month
                            </p>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => loadScenario(scenario)}
                        >
                          Load
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Save className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No saved scenarios</h3>
                  <p className="text-muted-foreground">
                    Calculate mortgage payments and save scenarios to compare different options
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Compare Scenarios</h3>
                <p className="text-muted-foreground">
                  Select multiple saved scenarios to compare side by side
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};