import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Upload, Check, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { BusinessForm } from './BusinessForm';

interface Business {
  id: string;
  business_name: string;
  asking_price: number;
  location_city: string;
  location_state: string;
  industry: string;
  description: string;
  visa_eligible: boolean;
  inventory_included: boolean;
  training_provided: boolean;
  financing_available: boolean;
  status: string;
  featured: boolean;
  images?: string[];
  created_at: string;
}

export const BusinessManagement: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to ensure images is properly typed
      const transformedBusinesses: Business[] = (data || []).map(business => ({
        ...business,
        images: Array.isArray(business.images) ? 
          business.images.filter(img => typeof img === 'string') as string[] : 
          []
      }));
      
      setBusinesses(transformedBusinesses);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast({
        title: "Error",
        description: "Failed to fetch businesses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (businessId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update({ status: newStatus })
        .eq('id', businessId);

      if (error) throw error;

      setBusinesses(prev => prev.map(b => 
        b.id === businessId ? { ...b, status: newStatus } : b
      ));

      toast({
        title: "Success",
        description: "Business status updated successfully",
      });
    } catch (error) {
      console.error('Error updating business status:', error);
      toast({
        title: "Error",
        description: "Failed to update business status",
        variant: "destructive",
      });
    }
  };

  const handleFeaturedToggle = async (businessId: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update({ featured: !featured })
        .eq('id', businessId);

      if (error) throw error;

      setBusinesses(prev => prev.map(b => 
        b.id === businessId ? { ...b, featured: !featured } : b
      ));

      toast({
        title: "Success",
        description: `Business ${!featured ? 'featured' : 'unfeatured'} successfully`,
      });
    } catch (error) {
      console.error('Error updating business featured status:', error);
      toast({
        title: "Error",
        description: "Failed to update featured status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (businessId: string) => {
    if (!confirm('Are you sure you want to delete this business?')) return;

    try {
      const { error } = await supabase
        .from('businesses')
        .delete()
        .eq('id', businessId);

      if (error) throw error;

      setBusinesses(prev => prev.filter(b => b.id !== businessId));
      toast({
        title: "Success",
        description: "Business deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting business:', error);
      toast({
        title: "Error",
        description: "Failed to delete business",
        variant: "destructive",
      });
    }
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.location_city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || business.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'default',
      pending: 'secondary',
      rejected: 'destructive',
      draft: 'outline'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading businesses...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Business Management</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedBusiness(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Business
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedBusiness ? 'Edit Business' : 'Add New Business'}
              </DialogTitle>
            </DialogHeader>
            <BusinessForm
              business={selectedBusiness}
              onSuccess={() => {
                setIsFormOpen(false);
                setSelectedBusiness(null);
                fetchBusinesses();
              }}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedBusiness(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search businesses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredBusinesses.map((business) => (
          <Card key={business.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start gap-6">
                {/* Business Image */}
                <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  {business.images && Array.isArray(business.images) && business.images.length > 0 ? (
                    <img
                      src={business.images[0]}
                      alt={business.business_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Business Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{business.business_name}</h3>
                    {business.featured && (
                      <Badge variant="outline" className="text-primary border-primary">
                        Featured
                      </Badge>
                    )}
                    {getStatusBadge(business.status)}
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {business.location_city}, {business.location_state}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{business.industry}</span>
                  </div>
                  <p className="text-2xl font-bold text-primary mt-2">
                    ${business.asking_price.toLocaleString()}
                  </p>
                  
                  {business.images && Array.isArray(business.images) && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {business.images.length} image{business.images.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeaturedToggle(business.id, business.featured)}
                  >
                    {business.featured ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Select
                    value={business.status}
                    onValueChange={(value) => handleStatusUpdate(business.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedBusiness(business);
                      setIsFormOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(business.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredBusinesses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No businesses found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};