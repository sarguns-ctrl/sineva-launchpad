import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Heart, Search, Calendar, Calculator, MessageSquare, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { AdminNavigation } from '@/components/AdminNavigation';

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
}

interface Favorite {
  id: string;
  property: {
    id: string;
    title: string;
    price: number;
    city: string;
    state: string;
    images: any;
  };
  created_at: string;
}

interface SavedSearch {
  id: string;
  name: string;
  search_criteria: any;
  alert_frequency: string;
  is_active: boolean;
  created_at: string;
}

interface Appointment {
  id: string;
  appointment_type: string;
  scheduled_at: string;
  status: string;
  property?: {
    title: string;
    address: string;
  };
  agent?: {
    full_name: string;
  };
}

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      setProfile(profileData);

      // Load favorites
      const { data: favoritesData } = await supabase
        .from('user_favorites')
        .select(`
          id,
          created_at,
          property:properties(id, title, price, city, state, images)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      setFavorites(favoritesData || []);

      // Load saved searches
      const { data: searchesData } = await supabase
        .from('saved_searches')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      setSavedSearches(searchesData || []);

      // Load appointments
      const { data: appointmentsData } = await supabase
        .from('appointments')
        .select(`
          id,
          appointment_type,
          scheduled_at,
          status,
          property:properties(title, address),
          agent:employee_profiles(full_name)
        `)
        .eq('client_id', user?.id)
        .order('scheduled_at', { ascending: true });

      setAppointments(appointmentsData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) throw error;

      setFavorites(favorites.filter(f => f.id !== favoriteId));
      toast({
        title: "Success",
        description: "Property removed from favorites"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const toggleSearchAlert = async (searchId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('saved_searches')
        .update({ is_active: !isActive })
        .eq('id', searchId);

      if (error) throw error;

      setSavedSearches(savedSearches.map(s => 
        s.id === searchId ? { ...s, is_active: !isActive } : s
      ));

      toast({
        title: "Success",
        description: `Search alerts ${!isActive ? 'enabled' : 'disabled'}`
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <User className="h-8 w-8" />
          My Dashboard
        </h1>
        <p className="text-muted-foreground">Welcome back, {profile?.full_name || user?.email}</p>
      </div>

      {/* Admin Navigation for authenticated users */}
      <div className="mb-8">
        <AdminNavigation />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="searches">Saved Searches</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favorite Properties</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{favorites.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Searches</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{savedSearches.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {appointments.filter(a => new Date(a.scheduled_at) > new Date()).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {savedSearches.filter(s => s.is_active).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Button 
              className="h-20 flex-col gap-2" 
              variant="outline"
              onClick={() => navigate('/search')}
            >
              <Search className="h-6 w-6" />
              Property Search
            </Button>
            <Button 
              className="h-20 flex-col gap-2" 
              variant="outline"
              onClick={() => navigate('/calculator')}
            >
              <Calculator className="h-6 w-6" />
              Mortgage Calculator
            </Button>
            <Button 
              className="h-20 flex-col gap-2" 
              variant="outline"
              onClick={() => navigate('/appointments')}
            >
              <Calendar className="h-6 w-6" />
              Schedule Viewing
            </Button>
            <Button 
              className="h-20 flex-col gap-2" 
              variant="outline"
              onClick={() => navigate('/messages')}
            >
              <MessageSquare className="h-6 w-6" />
              Messages
            </Button>
          </div>

          {/* Recent Activity */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favorites.slice(0, 3).map((favorite) => (
                  <div key={favorite.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{favorite.property.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Added to favorites • {formatDate(favorite.created_at)}
                      </p>
                    </div>
                    <Badge variant="secondary">Favorite</Badge>
                  </div>
                ))}
                {favorites.length === 0 && (
                  <p className="text-muted-foreground">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((favorite) => (
                  <Card key={favorite.id}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{favorite.property.title}</h3>
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(favorite.property.price)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {favorite.property.city}, {favorite.property.state}
                        </p>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" onClick={() => navigate(`/property/${favorite.property.id}`)}>
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => removeFavorite(favorite.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {favorites.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                    <p className="text-muted-foreground">Start browsing properties to add them to your favorites!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="searches">
          <Card>
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedSearches.map((search) => (
                  <div key={search.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{search.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Created {formatDate(search.created_at)} • Alerts: {search.alert_frequency}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={search.is_active ? "default" : "secondary"}>
                        {search.is_active ? "Active" : "Inactive"}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleSearchAlert(search.id, search.is_active)}
                      >
                        {search.is_active ? "Disable" : "Enable"} Alerts
                      </Button>
                    </div>
                  </div>
                ))}
                {savedSearches.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No saved searches</h3>
                    <p className="text-muted-foreground">Save your property searches to get alerts for new listings!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold capitalize">{appointment.appointment_type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(appointment.scheduled_at).toLocaleString()}
                      </p>
                      {appointment.property && (
                        <p className="text-sm">{appointment.property.title}</p>
                      )}
                    </div>
                    <Badge variant={
                      appointment.status === 'confirmed' ? 'default' :
                      appointment.status === 'completed' ? 'secondary' :
                      appointment.status === 'cancelled' ? 'destructive' : 'outline'
                    }>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
                {appointments.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No appointments</h3>
                    <p className="text-muted-foreground">Schedule property viewings and consultations with agents!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Messaging Center</h3>
                <p className="text-muted-foreground">Connect with agents and other users</p>
                <Button className="mt-4" onClick={() => navigate('/messages')}>
                  Start a Conversation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-muted-foreground">{profile?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="text-muted-foreground">{profile?.full_name || 'Not provided'}</p>
                </div>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};