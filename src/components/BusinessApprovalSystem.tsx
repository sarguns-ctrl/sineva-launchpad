import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  MessageSquare,
  Building,
  FileText,
  Calendar
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BusinessApproval {
  id: string;
  business_id: string;
  approval_type: 'listing' | 'document' | 'verification';
  status: 'pending' | 'approved' | 'rejected' | 'requires_changes';
  reviewer_id?: string;
  review_notes?: string;
  approval_criteria: any;
  submitted_at: string;
  reviewed_at?: string;
  business?: {
    id: string;
    business_name: string;
    industry: string;
    asking_price: number;
    location_city: string;
    location_state: string;
  };
}

export const BusinessApprovalSystem: React.FC = () => {
  const [approvals, setApprovals] = useState<BusinessApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApproval, setSelectedApproval] = useState<BusinessApproval | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [processing, setProcessing] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      // Since business_approvals table doesn't exist, let's use business_inquiries as a proxy
      const { data, error } = await supabase
        .from('business_inquiries')
        .select(`
          id,
          business_id,
          status,
          message,
          created_at,
          updated_at,
          inquirer_name,
          inquirer_email,
          businesses!inner(
            id,
            business_name,
            industry,
            asking_price,
            location_city,
            location_state
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform to match BusinessApproval interface
      const transformedApprovals = (data || []).map(inquiry => ({
        id: inquiry.id,
        business_id: inquiry.business_id,
        approval_type: 'listing' as const,
        status: inquiry.status === 'new' ? 'pending' as const : 
                inquiry.status === 'approved' ? 'approved' as const : 'rejected' as const,
        reviewer_id: undefined,
        review_notes: inquiry.message,
        approval_criteria: {},
        submitted_at: inquiry.created_at,
        reviewed_at: inquiry.updated_at !== inquiry.created_at ? inquiry.updated_at : undefined,
        business: inquiry.businesses
      }));
      
      setApprovals(transformedApprovals);
    } catch (error) {
      console.error('Error fetching approvals:', error);
      toast({
        title: "Error",
        description: "Failed to fetch business approvals",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalAction = async (
    approvalId: string, 
    status: 'approved' | 'rejected' | 'requires_changes',
    notes?: string
  ) => {
    setProcessing(approvalId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('business_inquiries')
        .update({
          status: status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'new'
        })
        .eq('id', approvalId);

      if (error) throw error;

      // Update local state
      setApprovals(prev => prev.map(approval => 
        approval.id === approvalId 
          ? { 
              ...approval, 
              status, 
              reviewer_id: user.id,
              review_notes: notes || reviewNotes,
              reviewed_at: new Date().toISOString()
            }
          : approval
      ));

      // If approving, also update business status
      if (status === 'approved') {
        const approval = approvals.find(a => a.id === approvalId);
        if (approval && approval.approval_type === 'listing') {
          await supabase
            .from('businesses')
            .update({ status: 'approved' })
            .eq('id', approval.business_id);
        }
      }

      setSelectedApproval(null);
      setReviewNotes('');

      toast({
        title: "Success",
        description: `Business ${status.replace('_', ' ')} successfully`,
      });
    } catch (error) {
      console.error('Error processing approval:', error);
      toast({
        title: "Error",
        description: "Failed to process approval",
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: 'secondary' as const, icon: Clock, color: 'text-orange-600' },
      approved: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      rejected: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
      requires_changes: { variant: 'outline' as const, icon: AlertTriangle, color: 'text-yellow-600' }
    };

    const config = variants[status as keyof typeof variants] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'listing':
        return <Building className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'verification':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const filterApprovals = (status?: string) => {
    if (!status || status === 'all') return approvals;
    return approvals.filter(approval => approval.status === status);
  };

  const pendingCount = approvals.filter(a => a.status === 'pending').length;
  const approvedCount = approvals.filter(a => a.status === 'approved').length;
  const rejectedCount = approvals.filter(a => a.status === 'rejected').length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
          <div className="grid gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Business Approvals</h2>
          <p className="text-muted-foreground">Review and manage business listing approvals</p>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-orange-600" />
            <span>{pendingCount} Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>{approvedCount} Approved</span>
          </div>
          <div className="flex items-center gap-1">
            <XCircle className="h-4 w-4 text-red-600" />
            <span>{rejectedCount} Rejected</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All ({approvals.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
        </TabsList>

        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <TabsContent key={status} value={status}>
            <div className="grid gap-4">
              {filterApprovals(status === 'all' ? undefined : status).map((approval) => (
                <Card key={approval.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getTypeIcon(approval.approval_type)}
                          <h3 className="text-lg font-semibold">
                            {approval.business?.business_name || 'Unknown Business'}
                          </h3>
                          {getStatusBadge(approval.status)}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                          <div>
                            <span className="font-medium">Industry:</span> {approval.business?.industry}
                          </div>
                          <div>
                            <span className="font-medium">Price:</span> ${approval.business?.asking_price?.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span> {approval.business?.location_city}, {approval.business?.location_state}
                          </div>
                          <div>
                            <span className="font-medium">Submitted:</span> {new Date(approval.submitted_at).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="capitalize">
                            {approval.approval_type.replace('_', ' ')} Review
                          </Badge>
                          {approval.reviewed_at && (
                            <span className="text-muted-foreground">
                              Reviewed on {new Date(approval.reviewed_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        {approval.review_notes && (
                          <div className="mt-4 p-3 bg-muted rounded-lg">
                            <p className="text-sm">
                              <strong>Review Notes:</strong> {approval.review_notes}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {approval.status === 'pending' && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline"
                                onClick={() => {
                                  setSelectedApproval(approval);
                                  setReviewNotes('');
                                }}
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Review Business Approval</DialogTitle>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                <div className="border rounded-lg p-4">
                                  <h4 className="font-semibold mb-2">Business Details</h4>
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div><strong>Name:</strong> {approval.business?.business_name}</div>
                                    <div><strong>Industry:</strong> {approval.business?.industry}</div>
                                    <div><strong>Price:</strong> ${approval.business?.asking_price?.toLocaleString()}</div>
                                    <div><strong>Location:</strong> {approval.business?.location_city}, {approval.business?.location_state}</div>
                                  </div>
                                </div>

                                <div>
                                  <Label htmlFor="review-notes">Review Notes</Label>
                                  <Textarea
                                    id="review-notes"
                                    value={reviewNotes}
                                    onChange={(e) => setReviewNotes(e.target.value)}
                                    placeholder="Add your review comments here..."
                                    rows={4}
                                  />
                                </div>

                                <div className="flex justify-end gap-3">
                                  <Button
                                    variant="outline"
                                    onClick={() => handleApprovalAction(approval.id, 'requires_changes')}
                                    disabled={processing === approval.id}
                                  >
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    Needs Changes
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleApprovalAction(approval.id, 'rejected')}
                                    disabled={processing === approval.id}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                  <Button
                                    onClick={() => handleApprovalAction(approval.id, 'approved')}
                                    disabled={processing === approval.id}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}

                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filterApprovals(status === 'all' ? undefined : status).length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Approvals Found</h3>
                    <p className="text-muted-foreground">
                      {status === 'pending' 
                        ? "No pending approvals at the moment."
                        : `No ${status} approvals found.`
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};