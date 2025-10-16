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
  UserCheck,
  FileText,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AgentApplication {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  experience_years: number;
  license_number: string | null;
  previous_company: string | null;
  specializations: string[] | null;
  motivation: string | null;
  package_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const AgentApplicationApproval: React.FC = () => {
  const [applications, setApplications] = useState<AgentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<AgentApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [processing, setProcessing] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('agent_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch agent applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalAction = async (
    applicationId: string, 
    status: 'approved' | 'rejected',
    application: AgentApplication
  ) => {
    setProcessing(applicationId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Update application status
      const { error: updateError } = await supabase
        .from('agent_applications')
        .update({ status })
        .eq('id', applicationId);

      if (updateError) throw updateError;

      // If approved, assign 'agent' role
      if (status === 'approved' && application.user_id) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: application.user_id,
            role: 'agent' as any,
            assigned_by: user.id,
            assigned_at: new Date().toISOString()
          });

        if (roleError && roleError.code !== '23505') {
          console.error('Error assigning agent role:', roleError);
          toast({
            title: "Warning",
            description: "Application approved but failed to assign agent role. Please assign manually.",
            variant: "destructive",
          });
        }

        // Update employee profile to be active
        await supabase
          .from('employee_profiles')
          .update({ is_active: true })
          .eq('user_id', application.user_id);
      }

      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === applicationId 
          ? { ...app, status, updated_at: new Date().toISOString() }
          : app
      ));

      setSelectedApplication(null);
      setReviewNotes('');

      toast({
        title: "Success",
        description: `Agent application ${status} successfully`,
      });
    } catch (error) {
      console.error('Error processing application:', error);
      toast({
        title: "Error",
        description: "Failed to process application",
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
      rejected: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' }
    };

    const config = variants[status as keyof typeof variants] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.toUpperCase()}
      </Badge>
    );
  };

  const filterApplications = (status?: string) => {
    if (!status || status === 'all') return applications;
    return applications.filter(app => app.status === status);
  };

  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;

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
          <h2 className="text-2xl font-bold">Agent Applications</h2>
          <p className="text-muted-foreground">Review and approve agent applications</p>
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
          <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
        </TabsList>

        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <TabsContent key={status} value={status}>
            <div className="grid gap-4">
              {filterApplications(status === 'all' ? undefined : status).map((application) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <UserCheck className="h-5 w-5" />
                          <h3 className="text-lg font-semibold">
                            {application.full_name}
                          </h3>
                          {getStatusBadge(application.status)}
                          <Badge variant="outline" className="capitalize">
                            {application.package_type} Package
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{application.email}</span>
                          </div>
                          {application.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>{application.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            <span>{application.experience_years} years experience</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>License: {application.license_number || 'Not provided'}</span>
                          </div>
                        </div>

                        {application.specializations && application.specializations.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium mb-1">Specializations:</p>
                            <div className="flex flex-wrap gap-2">
                              {application.specializations.map((spec, idx) => (
                                <Badge key={idx} variant="secondary">{spec}</Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {application.previous_company && (
                          <div className="mb-3 text-sm">
                            <span className="font-medium">Previous Company:</span> {application.previous_company}
                          </div>
                        )}

                        {application.motivation && (
                          <div className="mt-4 p-3 bg-muted rounded-lg">
                            <p className="text-sm">
                              <strong>Motivation:</strong> {application.motivation}
                            </p>
                          </div>
                        )}

                        <div className="text-xs text-muted-foreground mt-3">
                          Applied on {new Date(application.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {application.status === 'pending' && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline"
                                onClick={() => {
                                  setSelectedApplication(application);
                                  setReviewNotes('');
                                }}
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Review Agent Application</DialogTitle>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                <div className="border rounded-lg p-4">
                                  <h4 className="font-semibold mb-2">Applicant Details</h4>
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div><strong>Name:</strong> {application.full_name}</div>
                                    <div><strong>Email:</strong> {application.email}</div>
                                    <div><strong>Phone:</strong> {application.phone || 'N/A'}</div>
                                    <div><strong>Experience:</strong> {application.experience_years} years</div>
                                    <div><strong>License:</strong> {application.license_number || 'N/A'}</div>
                                    <div><strong>Package:</strong> {application.package_type}</div>
                                  </div>
                                  {application.previous_company && (
                                    <div className="mt-2 text-sm">
                                      <strong>Previous Company:</strong> {application.previous_company}
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <Label htmlFor="review-notes">Review Notes (Optional)</Label>
                                  <Textarea
                                    id="review-notes"
                                    value={reviewNotes}
                                    onChange={(e) => setReviewNotes(e.target.value)}
                                    placeholder="Add any notes about this application..."
                                    rows={4}
                                  />
                                </div>

                                <div className="flex justify-end gap-3">
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleApprovalAction(application.id, 'rejected', application)}
                                    disabled={processing === application.id}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                  <Button
                                    onClick={() => handleApprovalAction(application.id, 'approved', application)}
                                    disabled={processing === application.id}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve & Assign Role
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

              {filterApplications(status === 'all' ? undefined : status).length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Applications Found</h3>
                    <p className="text-muted-foreground">
                      {status === 'pending' 
                        ? "No pending agent applications at the moment."
                        : `No ${status} applications found.`
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