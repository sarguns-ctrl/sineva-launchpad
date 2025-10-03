import { FileText, Download, Search, Calendar, Shield, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LegalDocuments = () => {
  const documentCategories = [
    {
      name: "Purchase Agreements",
      documents: [
        { title: "Standard Residential Purchase Agreement", version: "2024.1", date: "2024-01-15", size: "2.5 MB" },
        { title: "Commercial Property Purchase Agreement", version: "2024.1", date: "2024-01-15", size: "3.2 MB" },
        { title: "International Purchase Agreement", version: "2023.3", date: "2023-12-10", size: "2.8 MB" },
        { title: "Investment Property Purchase Agreement", version: "2024.1", date: "2024-01-15", size: "2.7 MB" }
      ]
    },
    {
      name: "Listing Agreements", 
      documents: [
        { title: "Exclusive Right to Sell Agreement", version: "2024.1", date: "2024-01-15", size: "1.8 MB" },
        { title: "Open Listing Agreement", version: "2024.1", date: "2024-01-15", size: "1.5 MB" },
        { title: "Commercial Listing Agreement", version: "2024.1", date: "2024-01-15", size: "2.1 MB" },
        { title: "Luxury Property Listing Agreement", version: "2023.2", date: "2023-11-20", size: "1.9 MB" }
      ]
    },
    {
      name: "Disclosure Forms",
      documents: [
        { title: "Property Condition Disclosure", version: "2024.1", date: "2024-01-15", size: "1.2 MB" },
        { title: "Lead-Based Paint Disclosure", version: "2023.1", date: "2023-06-01", size: "800 KB" },
        { title: "Environmental Hazards Disclosure", version: "2024.1", date: "2024-01-15", size: "1.1 MB" },
        { title: "HOA Disclosure Statement", version: "2023.2", date: "2023-09-15", size: "950 KB" }
      ]
    },
    {
      name: "Addendums & Amendments",
      documents: [
        { title: "Financing Contingency Addendum", version: "2024.1", date: "2024-01-15", size: "600 KB" },
        { title: "Home Inspection Addendum", version: "2024.1", date: "2024-01-15", size: "750 KB" },
        { title: "Appraisal Contingency Addendum", version: "2023.3", date: "2023-12-05", size: "650 KB" },
        { title: "Closing Date Extension Amendment", version: "2024.1", date: "2024-01-15", size: "500 KB" }
      ]
    }
  ];

  const complianceDocuments = [
    { title: "Fair Housing Policy", description: "Our commitment to fair housing practices", updated: "2024-01-01" },
    { title: "Anti-Money Laundering Policy", description: "AML compliance procedures and guidelines", updated: "2024-01-01" },
    { title: "Data Privacy Policy", description: "Client information protection and GDPR compliance", updated: "2024-01-15" },
    { title: "Code of Ethics", description: "Professional conduct standards for all agents", updated: "2023-12-01" }
  ];

  const jurisdictions = [
    { name: "United States", count: 45, flag: "🇺🇸" },
    { name: "Canada", count: 32, flag: "🇨🇦" },
    { name: "Mexico", count: 28, flag: "🇲🇽" },
    { name: "Colombia", count: 15, flag: "🇨🇴" },
    { name: "Brazil", count: 22, flag: "🇧🇷" },
    { name: "Argentina", count: 18, flag: "🇦🇷" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground">Legal Resources</Badge>
            <h1 className="text-4xl md:text-5xl font-clash font-bold mb-6">
              Legal Document Center
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Access the latest legal forms, agreements, and compliance documents for real estate transactions across all our markets.
            </p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> These documents are for use by licensed Sineva Brokerage agents only. 
              Always consult with legal counsel for complex transactions or when local regulations require specific modifications.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search documents..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">All Jurisdictions</Button>
              <Button variant="outline" size="sm">Latest Version</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="transaction-docs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transaction-docs">Transaction Documents</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="jurisdictions">By Jurisdiction</TabsTrigger>
            </TabsList>

            <TabsContent value="transaction-docs" className="mt-8">
              <div className="space-y-8">
                {documentCategories.map((category) => (
                  <div key={category.name}>
                    <h3 className="text-2xl font-bold text-primary mb-4">{category.name}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.documents.map((doc) => (
                        <Card key={doc.title}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <FileText className="w-5 h-5 text-accent" />
                                  <Badge variant="outline" className="text-xs">v{doc.version}</Badge>
                                </div>
                                <h4 className="font-semibold text-primary mb-1">{doc.title}</h4>
                                <div className="text-sm text-muted-foreground">
                                  <div className="flex items-center gap-4">
                                    <span className="flex items-center">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {new Date(doc.date).toLocaleDateString()}
                                    </span>
                                    <span>{doc.size}</span>
                                  </div>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {complianceDocuments.map((doc) => (
                  <Card key={doc.title}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Shield className="w-6 h-6 text-accent" />
                        <Badge variant="outline">Updated {doc.updated}</Badge>
                      </div>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="jurisdictions" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jurisdictions.map((jurisdiction) => (
                  <Card key={jurisdiction.name} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{jurisdiction.flag}</span>
                          <CardTitle className="text-lg">{jurisdiction.name}</CardTitle>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">
                          {jurisdiction.count} docs
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        View Documents
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Legal Notice & Disclaimer</h2>
          </div>
          
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong>Professional Use Only:</strong> These documents are provided exclusively for use by licensed Sineva Brokerage agents 
              and authorized personnel. Unauthorized use is prohibited.
            </p>
            <p>
              <strong>Local Compliance:</strong> Real estate laws vary by jurisdiction. Always ensure documents comply with local 
              regulations and consider consulting legal counsel for complex transactions.
            </p>
            <p>
              <strong>Version Control:</strong> Always use the most current version of documents. Older versions may not reflect 
              current legal requirements or best practices.
            </p>
            <p>
              <strong>Support:</strong> For questions about document usage or to request customized forms, contact our Legal Affairs department 
              at contact@sinevagrupo.com or call +1 (832) 289-6124.
            </p>
          </div>
          
          <div className="text-center mt-8">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Contact Legal Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalDocuments;