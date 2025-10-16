import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Appointment {
  id: string;
  appointment_type: string;
  scheduled_at: string;
  duration: number;
  status: string;
  notes?: string;
  property?: {
    id: string;
    title: string;
    address: string;
  };
  agent?: {
    id: string;
    full_name: string;
    email: string;
  };
}

interface Agent {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
}

interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
}

export const AppointmentScheduler: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Form state
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      // Load appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .eq('client_id', user?.id)
        .order('scheduled_at', { ascending: true });

      if (appointmentsError) throw appointmentsError;
      setAppointments(appointmentsData || []);

      // Load agents
      const { data: agentsData, error: agentsError } = await supabase
        .from('employee_profiles')
        .select('id, user_id, full_name, email')
        .eq('is_active', true);

      if (agentsError) throw agentsError;
      setAgents(agentsData || []);

      // Load properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('id, title, address, city, state')
        .eq('status', 'active')
        .limit(50);

      if (propertiesError) {
        console.warn('Properties fetch failed, continuing without properties:', propertiesError.message);
        setProperties([]);
      } else {
        setProperties(propertiesData || []);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to schedule an appointment.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedAgent || !appointmentType || !scheduledDate || !scheduledTime) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();

      const { error } = await supabase
        .from('appointments')
        .insert({
          client_id: user?.id,
          agent_id: selectedAgent,
          property_id: selectedProperty || null,
          appointment_type: appointmentType,
          scheduled_at: scheduledAt,
          duration: parseInt(duration),
          notes: notes || null
        });

      if (error) throw error;

      // Get user profile for email
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', user?.id)
        .maybeSingle();

      // Get agent details
      const agent = agents.find(a => a.id === selectedAgent);
      
      // Get property details if selected
      const property = selectedProperty && selectedProperty !== 'none' 
        ? properties.find(p => p.id === selectedProperty) 
        : null;

      // Send email notification
      const emailData = {
        clientName: profile?.full_name || user?.email?.split('@')[0] || 'Client',
        clientEmail: user?.email || '',
        agentName: agent?.full_name || 'Agent',
        appointmentType: appointmentType,
        scheduledAt: scheduledAt,
        propertyAddress: property ? `${property.title}, ${property.address}, ${property.city}, ${property.state}` : undefined,
        notes: notes || undefined
      };

      await supabase.functions.invoke('send-appointment-email', {
        body: emailData
      });

      toast({
        title: "Success",
        description: "Appointment scheduled successfully"
      });

      // Reset form
      setSelectedAgent('');
      setSelectedProperty('');
      setAppointmentType('');
      setScheduledDate('');
      setScheduledTime('');
      setDuration('60');
      setNotes('');
      setShowCreateDialog(false);

      // Reload appointments
      loadData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Appointment cancelled"
      });

      loadData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const upcomingAppointments = appointments.filter(
    appointment => new Date(appointment.scheduled_at) > new Date() && appointment.status !== 'cancelled'
  );

  const pastAppointments = appointments.filter(
    appointment => new Date(appointment.scheduled_at) <= new Date() || appointment.status === 'cancelled'
  );

  if (authLoading || loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please log in to view and schedule appointments.
            </p>
            <Button onClick={() => window.location.href = '/auth'}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Calendar className="h-8 w-8" />
            Appointments
          </h1>
          <p className="text-muted-foreground">Schedule and manage your property appointments</p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="agent">Agent *</Label>
                <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="property">Property (Optional)</Label>
                <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No specific property</SelectItem>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.title} - {property.city}, {property.state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Appointment Type *</Label>
                <Select value={appointmentType} onValueChange={setAppointmentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewing">Property Viewing</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="signing">Document Signing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <Button onClick={createAppointment} className="w-full">
                Schedule Appointment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => {
                  const dateTime = formatDateTime(appointment.scheduled_at);
                  return (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold capitalize">{appointment.appointment_type}</h3>
                            <Badge variant={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {dateTime.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {dateTime.time} ({appointment.duration} min)
                            </div>
                          </div>

                          {appointment.agent && (
                            <div className="flex items-center gap-1 text-sm">
                              <User className="h-4 w-4" />
                              <span>Agent: {appointment.agent.full_name}</span>
                            </div>
                          )}

                          {appointment.property && (
                            <div className="flex items-center gap-1 text-sm">
                              <MapPin className="h-4 w-4" />
                              <span>{appointment.property.title}</span>
                            </div>
                          )}

                          {appointment.notes && (
                            <p className="text-sm text-muted-foreground">
                              Notes: {appointment.notes}
                            </p>
                          )}
                        </div>

                        {appointment.status === 'scheduled' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => cancelAppointment(appointment.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No upcoming appointments</h3>
                <p className="text-muted-foreground">Schedule your first appointment with an agent</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Past Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastAppointments.slice(0, 5).map((appointment) => {
                  const dateTime = formatDateTime(appointment.scheduled_at);
                  return (
                    <div key={appointment.id} className="border rounded-lg p-4 opacity-75">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold capitalize">{appointment.appointment_type}</h3>
                            <Badge variant={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {dateTime.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {dateTime.time}
                            </div>
                          </div>

                          {appointment.property && (
                            <div className="flex items-center gap-1 text-sm">
                              <MapPin className="h-4 w-4" />
                              <span>{appointment.property.title}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};