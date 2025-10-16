import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface LiveChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LiveChatDialog: React.FC<LiveChatDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Store chat message in contact_submissions
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name,
          email,
          inquiry_type: 'Live Chat',
          message,
          status: 'new'
        });

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke('contact-form', {
        body: {
          name,
          email,
          inquiryType: 'Live Chat',
          message
        }
      });

      toast({
        title: "Message Sent!",
        description: "Our team will respond shortly via email."
      });

      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Live Chat Support
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Send us a message and our team will respond shortly. For immediate assistance, please call us at +1 (832) 289-6124.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you today?"
                rows={4}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSending}>
              <Send className="h-4 w-4 mr-2" />
              {isSending ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
