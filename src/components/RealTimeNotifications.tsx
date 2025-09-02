import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, AlertTriangle, Info, CheckCircle, Eye, Settings, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  is_read: boolean;
  created_at: string;
  action_url?: string;
  metadata?: any;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  propertyAlerts: boolean;
  marketUpdates: boolean;
  appointmentReminders: boolean;
  systemAlerts: boolean;
}

export const RealTimeNotifications: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    propertyAlerts: true,
    marketUpdates: true,
    appointmentReminders: true,
    systemAlerts: false
  });

  // Load notifications
  const loadNotifications = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setNotifications((data || []) as Notification[]);
    } catch (error: any) {
      console.error('Error loading notifications:', error);
      toast({
        title: "Error loading notifications",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  // Set up real-time notifications
  useEffect(() => {
    if (!user) return;

    loadNotifications();

    // Subscribe to real-time notifications
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications(prev => [newNotification, ...prev]);
          
          // Show toast for high priority notifications
          if (newNotification.priority === 'high' || newNotification.priority === 'urgent') {
            toast({
              title: newNotification.title,
              description: newNotification.message,
              variant: newNotification.type === 'error' ? 'destructive' : 'default'
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, loadNotifications, toast]);

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (error: any) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications
        .filter(n => !n.is_read)
        .map(n => n.id);

      if (unreadIds.length === 0) return;

      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .in('id', unreadIds);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(notification => ({ ...notification, is_read: true }))
      );

      toast({
        title: "All notifications marked as read",
        description: `${unreadIds.length} notifications updated`
      });
    } catch (error: any) {
      console.error('Error marking all as read:', error);
      toast({
        title: "Error updating notifications",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error: any) {
      console.error('Error deleting notification:', error);
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.is_read;
      case 'urgent':
        return notification.priority === 'high' || notification.priority === 'urgent';
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;
  const urgentCount = notifications.filter(n => 
    (n.priority === 'high' || n.priority === 'urgent') && !n.is_read
  ).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive" className="text-xs">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-500 text-white text-xs">High</Badge>;
      case 'normal':
        return <Badge variant="secondary" className="text-xs">Normal</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Low</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="outline"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.div>
        )}
        {urgentCount > 0 && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          />
        )}
      </Button>

      {/* Notifications Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: -10 }}
              className="absolute right-0 top-full mt-2 w-96 z-50"
            >
              <Card className="border-0 shadow-elegant bg-background/95 backdrop-blur-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                      {unreadCount > 0 && (
                        <Badge className="bg-accent text-accent-foreground">
                          {unreadCount}
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-xs"
                        >
                          Mark all read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="w-6 h-6 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <Tabs value={filter} onValueChange={(value: any) => setFilter(value)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all" className="text-xs">
                        All ({notifications.length})
                      </TabsTrigger>
                      <TabsTrigger value="unread" className="text-xs">
                        Unread ({unreadCount})
                      </TabsTrigger>
                      <TabsTrigger value="urgent" className="text-xs">
                        Urgent ({urgentCount})
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>

                <CardContent className="p-0">
                  <ScrollArea className="h-96">
                    <div className="px-6 pb-4">
                      <AnimatePresence>
                        {filteredNotifications.length === 0 ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-8"
                          >
                            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground text-sm">
                              {filter === 'unread' ? 'No unread notifications' :
                               filter === 'urgent' ? 'No urgent notifications' :
                               'No notifications yet'}
                            </p>
                          </motion.div>
                        ) : (
                          filteredNotifications.map((notification, index) => {
                            const IconComponent = getNotificationIcon(notification.type);
                            const iconColor = getNotificationColor(notification.type);
                            
                            return (
                              <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.05 }}
                                className={`group p-4 rounded-lg border transition-all duration-200 mb-3 ${
                                  notification.is_read 
                                    ? 'bg-muted/30 border-border/50' 
                                    : 'bg-accent/10 border-accent/30 hover:bg-accent/20'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`mt-1 ${iconColor}`}>
                                    <IconComponent className="h-4 w-4" />
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <h4 className={`text-sm font-medium ${
                                            notification.is_read 
                                              ? 'text-muted-foreground' 
                                              : 'text-foreground'
                                          }`}>
                                            {notification.title}
                                          </h4>
                                          {getPriorityBadge(notification.priority)}
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                          {notification.message}
                                        </p>
                                        <div className="flex items-center justify-between mt-2">
                                          <span className="text-xs text-muted-foreground">
                                            {formatTimestamp(notification.created_at)}
                                          </span>
                                          
                                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {!notification.is_read && (
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 w-6 p-0"
                                                onClick={() => markAsRead(notification.id)}
                                              >
                                                <Check className="h-3 w-3" />
                                              </Button>
                                            )}
                                            {notification.action_url && (
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 w-6 p-0"
                                                onClick={() => window.location.href = notification.action_url!}
                                              >
                                                <Eye className="h-3 w-3" />
                                              </Button>
                                            )}
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                              onClick={() => deleteNotification(notification.id)}
                                            >
                                              <X className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Settings Footer */}
                <div className="p-4 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs"
                  >
                    <Settings className="h-3 w-3 mr-2" />
                    Notification Settings
                  </Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};