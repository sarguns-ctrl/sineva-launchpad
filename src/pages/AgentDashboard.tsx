import { useState } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3,
  DollarSign,
  Users,
  Calendar,
  MessageCircle,
  Building2,
  TrendingUp,
  Target,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Award,
  ArrowRight,
  Plus,
  Eye,
  Edit,
  ExternalLink
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const AgentDashboard = () => {
  const [activeMetric, setActiveMetric] = useState("overview");

  // Mock agent performance data
  const performanceMetrics = {
    totalEarnings: 185000,
    monthlyEarnings: 23500,
    propertiesSold: 34,
    activeListings: 12,
    leadConversion: 18.5,
    clientSatisfaction: 4.8,
    responseTime: 1.2
  };

  const recentActivity = [
    {
      type: "sale",
      title: "Commercial Office Complex Sold",
      amount: 2850000,
      client: "International Investor",
      date: "2 hours ago",
      status: "completed"
    },
    {
      type: "inquiry",
      title: "New Lead: EB-5 Investment Property",
      amount: 1500000,
      client: "Ana Rodriguez",
      date: "4 hours ago", 
      status: "pending"
    },
    {
      type: "appointment",
      title: "Property Showing Scheduled",
      amount: 890000,
      client: "Carlos Martinez",
      date: "6 hours ago",
      status: "scheduled"
    },
    {
      type: "listing",
      title: "New Property Listed",
      amount: 1200000,
      client: "Retail Plaza",
      date: "1 day ago",
      status: "active"
    }
  ];

  const activeListings = [
    {
      id: 1,
      title: "Premium Office Building",
      type: "Commercial",
      price: 3200000,
      location: "Houston, TX",
      status: "active",
      inquiries: 8,
      views: 245,
      daysOnMarket: 12
    },
    {
      id: 2,
      title: "Manufacturing Facility",
      type: "Industrial", 
      price: 1850000,
      location: "Katy, TX",
      status: "pending",
      inquiries: 3,
      views: 89,
      daysOnMarket: 28
    },
    {
      id: 3,
      title: "Restaurant Business",
      type: "Business",
      price: 450000,
      location: "Sugar Land, TX",
      status: "active",
      inquiries: 12,
      views: 156,
      daysOnMarket: 8
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      client: "Maria Santos",
      property: "Office Complex - $2.1M",
      type: "Property Showing",
      date: "Today",
      time: "2:00 PM",
      location: "Downtown Houston"
    },
    {
      id: 2,
      client: "David Chen", 
      property: "Manufacturing Facility - $1.8M",
      type: "Initial Consultation",
      date: "Tomorrow",
      time: "10:00 AM",
      location: "Virtual Meeting"
    },
    {
      id: 3,
      client: "Ana Rodriguez",
      property: "EB-5 Investment Discussion",
      type: "Investment Consultation", 
      date: "Dec 18",
      time: "3:30 PM",
      location: "Office"
    }
  ];

  const leads = [
    {
      id: 1,
      name: "Carlos Mendez",
      email: "carlos@email.com",
      phone: "+1 (713) 555-0123",
      interest: "E-2 Visa Business",
      budget: "$800K - $1.2M",
      source: "Website",
      status: "hot",
      lastContact: "2 hours ago"
    },
    {
      id: 2,
      name: "Isabella Rodriguez",
      email: "isabella@email.com", 
      phone: "+1 (281) 555-0145",
      interest: "EB-5 Commercial Property",
      budget: "$2M - $5M",
      source: "Referral",
      status: "warm",
      lastContact: "1 day ago"
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      email: "ahmed@email.com",
      phone: "+1 (832) 555-0167",
      interest: "Investment Property",
      budget: "$1.5M - $3M", 
      source: "Google Ads",
      status: "cold",
      lastContact: "3 days ago"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-700';
      case 'warm': return 'bg-orange-100 text-orange-700';
      case 'cold': return 'bg-blue-100 text-blue-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white font-playfair">
                Welcome back, Maria
              </h1>
              <p className="text-xl text-white/80 mt-2">
                Here's what's happening with your business today
              </p>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Listing
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="text-center hover:shadow-card transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold font-playfair">
                  <AnimatedCounter end={performanceMetrics.totalEarnings} prefix="$" />
                </CardTitle>
                <CardDescription>Total Earnings 2024</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-card transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold font-playfair">
                  <AnimatedCounter end={performanceMetrics.monthlyEarnings} prefix="$" />
                </CardTitle>
                <CardDescription>This Month</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-card transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold font-playfair">
                  <AnimatedCounter end={performanceMetrics.propertiesSold} />
                </CardTitle>
                <CardDescription>Properties Sold</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-card transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-2xl font-bold font-playfair">
                  <AnimatedCounter end={performanceMetrics.leadConversion} suffix="%" />
                </CardTitle>
                <CardDescription>Conversion Rate</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="appointments">Calendar</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{activity.title}</h4>
                          <p className="text-xs text-muted-foreground">{activity.client}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="font-semibold text-sm">{formatPrice(activity.amount)}</div>
                          <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Upcoming Appointments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Upcoming Appointments</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <div key={index} className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{appointment.client}</h4>
                          <Badge className="text-xs bg-blue-100 text-blue-700">
                            {appointment.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{appointment.property}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{appointment.date} at {appointment.time}</span>
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Listings Tab */}
            <TabsContent value="listings" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Your Active Listings</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Listing
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeListings.map((listing, index) => (
                  <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(listing.status)}>
                          {listing.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {listing.daysOnMarket} days
                        </span>
                      </div>
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <div className="text-2xl font-bold text-primary font-playfair">
                        {formatPrice(listing.price)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{listing.location}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-blue-500" />
                          <span>{listing.views} views</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="h-4 w-4 text-green-500" />
                          <span>{listing.inquiries} inquiries</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" className="flex-1">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Leads Tab */}
            <TabsContent value="leads" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Lead Management</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </div>

              <div className="space-y-4">
                {leads.map((lead, index) => (
                  <Card key={index} className="hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold">{lead.name}</h4>
                            <Badge className={getStatusColor(lead.status)}>
                              {lead.status} lead
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{lead.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{lead.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>Last contact: {lead.lastContact}</span>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Interest: </span>
                              <span className="text-muted-foreground">{lead.interest}</span>
                            </div>
                            <div>
                              <span className="font-medium">Budget: </span>
                              <span className="text-muted-foreground">{lead.budget}</span>
                            </div>
                            <div>
                              <span className="font-medium">Source: </span>
                              <span className="text-muted-foreground">{lead.source}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-6">
                          <Button size="sm">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Calendar & Appointments</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingAppointments.filter(apt => apt.date === "Today").map((appointment, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/50 border-l-4 border-primary">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{appointment.client}</h4>
                          <span className="text-sm font-medium text-primary">{appointment.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{appointment.property}</p>
                        <p className="text-xs text-muted-foreground">{appointment.location}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming This Week</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingAppointments.filter(apt => apt.date !== "Today").map((appointment, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{appointment.client}</h4>
                          <Badge variant="secondary">{appointment.date}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{appointment.property}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{appointment.time}</span>
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <h3 className="text-2xl font-bold">Performance Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                      <Star className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-playfair">
                      {performanceMetrics.clientSatisfaction}/5.0
                    </CardTitle>
                    <CardDescription>Client Satisfaction</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-playfair">
                      {performanceMetrics.responseTime}h
                    </CardTitle>
                    <CardDescription>Avg Response Time</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-playfair">
                      {performanceMetrics.activeListings}
                    </CardTitle>
                    <CardDescription>Active Listings</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance Trend</CardTitle>
                  <CardDescription>Your sales and earnings over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">Chart visualization would be integrated here</p>
                      <p className="text-sm text-muted-foreground">
                        Showing earnings trend: {formatPrice(performanceMetrics.totalEarnings)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AgentDashboard;