import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject?: string;
  message: string;
  property_id?: string;
  is_read: boolean;
  created_at: string;
  // Related data
  sender?: {
    id: string;
    full_name: string;
    email: string;
  };
  recipient?: {
    id: string;
    full_name: string;
    email: string;
  };
  property?: {
    id: string;
    title: string;
    price: number;
  };
}

interface Conversation {
  participant_id: string;
  participant_name: string;
  participant_email: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
  messages: Message[];
}

interface MessagingFilters {
  unread_only?: boolean;
  property_id?: string;
  participant_id?: string;
  search?: string;
}

export const useMessaging = (filters?: MessagingFilters) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMessages = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // For now, let's simplify and not join with profiles to avoid foreign key issues
      let query = supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`);

      // Apply filters
      if (filters?.unread_only) {
        query = query.eq('is_read', false).eq('recipient_id', user.id);
      }

      if (filters?.property_id) {
        query = query.eq('property_id', filters.property_id);
      }

      if (filters?.participant_id) {
        query = query.or(`sender_id.eq.${filters.participant_id},recipient_id.eq.${filters.participant_id}`);
      }

      const { data, error: queryError } = await query
        .order('created_at', { ascending: false })
        .limit(100);

      if (queryError) throw queryError;

      setMessages((data || []).map(msg => ({
        ...msg,
        sender: { id: msg.sender_id, full_name: 'User', email: '' },
        recipient: { id: msg.recipient_id, full_name: 'User', email: '' }
      })));

      // Group messages into conversations
      const conversationMap = new Map<string, Conversation>();
      
      (data || []).forEach(message => {
        const transformedMessage = {
          ...message,
          sender: { id: message.sender_id, full_name: 'User', email: '' },
          recipient: { id: message.recipient_id, full_name: 'User', email: '' }
        };

        const otherParticipantId = transformedMessage.sender_id === user.id ? 
          transformedMessage.recipient_id : transformedMessage.sender_id;

        if (!conversationMap.has(otherParticipantId)) {
          conversationMap.set(otherParticipantId, {
            participant_id: otherParticipantId,
            participant_name: 'User',
            participant_email: '',
            last_message: transformedMessage.message,
            last_message_at: transformedMessage.created_at,
            unread_count: 0,
            messages: []
          });
        }

        const conversation = conversationMap.get(otherParticipantId)!;
        conversation.messages.push(transformedMessage);
        
        // Count unread messages from this participant
        if (!transformedMessage.is_read && transformedMessage.recipient_id === user.id) {
          conversation.unread_count++;
        }

        // Update last message if this one is more recent
        if (new Date(transformedMessage.created_at) > new Date(conversation.last_message_at)) {
          conversation.last_message = transformedMessage.message;
          conversation.last_message_at = transformedMessage.created_at;
        }
      });

      setConversations(Array.from(conversationMap.values())
        .sort((a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()));

    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch messages';
      setError(errorMessage);
      console.error('Error fetching messages:', err);
      
      toast({
        title: "Error loading messages",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (
    recipientId: string, 
    messageText: string, 
    subject?: string,
    propertyId?: string
  ) => {
    if (!user) return { success: false, error: 'Must be logged in' };

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          recipient_id: recipientId,
          message: messageText,
          subject,
          property_id: propertyId,
          is_read: false
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Message sent",
        description: "Your message has been sent successfully"
      });

      // Refresh messages
      await fetchMessages();

      return { success: true, data };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return { success: false, error: err.message };
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId)
        .eq('recipient_id', user?.id); // Only mark as read if current user is recipient

      if (error) throw error;

      // Update local state
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, is_read: true } : msg
      ));

      return { success: true };
    } catch (err: any) {
      console.error('Error marking message as read:', err);
      return { success: false, error: err.message };
    }
  };

  const markConversationAsRead = async (participantId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('sender_id', participantId)
        .eq('recipient_id', user.id)
        .eq('is_read', false);

      if (error) throw error;

      // Refresh messages
      await fetchMessages();

      return { success: true };
    } catch (err: any) {
      console.error('Error marking conversation as read:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId)
        .eq('sender_id', user?.id); // Only sender can delete

      if (error) throw error;

      toast({
        title: "Message deleted",
        description: "Message has been deleted successfully"
      });

      // Refresh messages
      await fetchMessages();

      return { success: true };
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
      return { success: false, error: err.message };
    }
  };

  const getUnreadCount = (): number => {
    return messages.filter(m => !m.is_read && m.recipient_id === user?.id).length;
  };

  const setupRealTimeUpdates = () => {
    if (!user) return;

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `recipient_id=eq.${user.id}`
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  useEffect(() => {
    if (user) {
      fetchMessages();
      const cleanup = setupRealTimeUpdates();
      return cleanup;
    }
  }, [user, filters?.unread_only, filters?.property_id, filters?.participant_id]);

  return {
    messages,
    conversations,
    loading,
    error,
    refetch: fetchMessages,
    sendMessage,
    markAsRead,
    markConversationAsRead,
    deleteMessage,
    getUnreadCount,
    totalMessages: messages.length,
    unreadCount: getUnreadCount()
  };
};