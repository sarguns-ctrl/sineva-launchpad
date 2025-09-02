import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Users, 
  Settings, 
  MoreVertical,
  Share2,
  MessageCircle,
  Calendar,
  Clock,
  User,
  Monitor,
  Camera,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Circle,
  Download,
  Copy,
  Send
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface CallParticipant {
  id: string;
  name: string;
  avatar?: string;
  role: 'host' | 'participant';
  is_muted: boolean;
  is_video_on: boolean;
  is_screen_sharing: boolean;
  joined_at: string;
}

interface ScheduledCall {
  id: string;
  title: string;
  description?: string;
  scheduled_at: string;
  duration_minutes: number;
  participants: string[];
  meeting_link: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  recording_url?: string;
  created_by: string;
}

interface CallSession {
  id: string;
  title: string;
  participants: CallParticipant[];
  started_at: string;
  duration: number;
  is_recording: boolean;
  is_screen_sharing: boolean;
  chat_messages: ChatMessage[];
}

interface ChatMessage {
  id: string;
  sender_id: string;
  sender_name: string;
  message: string;
  timestamp: string;
  type: 'text' | 'file' | 'system';
}

export const VideoCallIntegration: React.FC = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentCall, setCurrentCall] = useState<CallSession | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [scheduledCalls, setScheduledCalls] = useState<ScheduledCall[]>([]);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  
  // Mock data
  const mockScheduledCalls: ScheduledCall[] = [
    {
      id: '1',
      title: 'Property Showing - Downtown Condo',
      description: 'Virtual tour with Maria Rodriguez for luxury condo viewing',
      scheduled_at: '2024-01-20T15:00:00Z',
      duration_minutes: 30,
      participants: ['maria.rodriguez@email.com', 'agent@sineva.com'],
      meeting_link: 'https://meet.sineva.com/property-tour-1',
      status: 'scheduled',
      created_by: 'agent@sineva.com'
    },
    {
      id: '2',
      title: 'Investment Consultation',
      description: 'Discuss investment opportunities with John Chen',
      scheduled_at: '2024-01-20T10:00:00Z',
      duration_minutes: 60,
      participants: ['john.chen@email.com', 'agent@sineva.com'],
      meeting_link: 'https://meet.sineva.com/investment-consult-2',
      status: 'completed',
      recording_url: 'https://recordings.sineva.com/call-2.mp4',
      created_by: 'agent@sineva.com'
    }
  ];

  const mockCurrentCall: CallSession = {
    id: 'call-123',
    title: 'Property Consultation with Maria Rodriguez',
    participants: [
      {
        id: 'user1',
        name: 'Maria Rodriguez',
        role: 'participant',
        is_muted: false,
        is_video_on: true,
        is_screen_sharing: false,
        joined_at: '2024-01-20T14:30:00Z'
      },
      {
        id: 'user2',
        name: 'Agent Sarah',
        role: 'host',
        is_muted: false,
        is_video_on: true,
        is_screen_sharing: false,
        joined_at: '2024-01-20T14:29:00Z'
      }
    ],
    started_at: '2024-01-20T14:30:00Z',
    duration: 0,
    is_recording: false,
    is_screen_sharing: false,
    chat_messages: [
      {
        id: 'msg1',
        sender_id: 'user1',
        sender_name: 'Maria Rodriguez',
        message: 'Thank you for setting up this call. I\'m excited to see the properties!',
        timestamp: '2024-01-20T14:31:00Z',
        type: 'text'
      },
      {
        id: 'msg2',
        sender_id: 'user2',
        sender_name: 'Agent Sarah',
        message: 'My pleasure! I have 3 properties that match your criteria perfectly. Let me share my screen to show you the virtual tours.',
        timestamp: '2024-01-20T14:32:00Z',
        type: 'text'
      }
    ]
  };

  useEffect(() => {
    setScheduledCalls(mockScheduledCalls);
  }, []);

  const startCall = (callId?: string) => {
    setCurrentCall(mockCurrentCall);
    setIsInCall(true);
    toast({
      title: "Call Started",
      description: "You are now connected to the video call"
    });
  };

  const endCall = () => {
    setCurrentCall(null);
    setIsInCall(false);
    setIsVideoOn(true);
    setIsMuted(false);
    setIsScreenSharing(false);
    setIsRecording(false);
    toast({
      title: "Call Ended",
      description: "The video call has been ended"
    });
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "Video Disabled" : "Video Enabled",
      description: isVideoOn ? "Your camera is now off" : "Your camera is now on"
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Unmuted" : "Muted",
      description: isMuted ? "Your microphone is now on" : "Your microphone is now off"
    });
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast({
      title: isScreenSharing ? "Screen Share Stopped" : "Screen Share Started",
      description: isScreenSharing ? "You stopped sharing your screen" : "You are now sharing your screen"
    });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Recording Stopped" : "Recording Started",
      description: isRecording ? "Call recording has been stopped" : "Call recording has started"
    });
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim() || !currentCall) return;
    
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender_id: 'current-user',
      sender_name: 'You',
      message: chatMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setCurrentCall({
      ...currentCall,
      chat_messages: [...currentCall.chat_messages, newMessage]
    });
    setChatMessage('');
  };

  const copyMeetingLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Meeting link has been copied to clipboard"
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getCallStatusColor = (status: ScheduledCall['status']) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'ongoing': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
    }
  };

  if (isInCall && currentCall) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {/* Call Header */}
        <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-semibold">{currentCall.title}</h2>
            <Badge className="bg-green-500 text-white animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2" />
              Live
            </Badge>
            {isRecording && (
              <Badge className="bg-red-500 text-white animate-pulse">
                <Circle className="w-3 h-3 mr-1" />
                Recording
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Call Area */}
        <div className="flex-1 flex">
          {/* Video Grid */}
          <div className={`flex-1 grid grid-cols-1 ${currentCall.participants.length > 1 ? 'md:grid-cols-2' : ''} gap-2 p-4`}>
            {currentCall.participants.map((participant) => (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-gray-900 rounded-lg overflow-hidden"
              >
                {/* Video Stream Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  {participant.is_video_on ? (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-500" />
                    </div>
                  ) : (
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="text-2xl">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                
                {/* Participant Info */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium bg-black/50 px-2 py-1 rounded">
                      {participant.name}
                    </span>
                    {participant.role === 'host' && (
                      <Badge className="bg-primary text-white text-xs">Host</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {participant.is_muted && (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <MicOff className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {participant.is_screen_sharing && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Monitor className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chat Sidebar */}
          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                className="w-80 bg-background border-l border-border flex flex-col"
              >
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold">Chat</h3>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {currentCall.chat_messages.map((message) => (
                    <div key={message.id} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">{message.sender_name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-sm bg-muted/30 p-2 rounded">
                        {message.message}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    />
                    <Button size="sm" onClick={sendChatMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Call Controls */}
        <div className="p-6 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="lg"
              className="w-12 h-12 rounded-full p-0"
              onClick={toggleMute}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            
            <Button
              variant={isVideoOn ? "secondary" : "destructive"}
              size="lg"
              className="w-12 h-12 rounded-full p-0"
              onClick={toggleVideo}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
            
            <Button
              variant="destructive"
              size="lg"
              className="w-14 h-14 rounded-full p-0"
              onClick={endCall}
            >
              <PhoneOff className="w-6 h-6" />
            </Button>
            
            <Button
              variant={isScreenSharing ? "default" : "secondary"}
              size="lg"
              className="w-12 h-12 rounded-full p-0"
              onClick={toggleScreenShare}
            >
              <Monitor className="w-5 h-5" />
            </Button>
            
            <Button
              variant={isRecording ? "destructive" : "secondary"}
              size="lg"
              className="w-12 h-12 rounded-full p-0"
              onClick={toggleRecording}
            >
              <Circle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Video className="h-8 w-8 text-primary" />
            Video Meetings
          </h1>
          <p className="text-muted-foreground">
            Virtual property tours and client consultations
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button onClick={() => startCall()}>
            <Video className="h-4 w-4 mr-2" />
            Start Instant Meeting
          </Button>
          <Button variant="outline" onClick={() => setShowScheduleDialog(true)}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
              <Video className="h-8 w-8 text-primary group-hover:text-white" />
            </div>
            <h3 className="font-semibold mb-2">Property Virtual Tours</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Showcase properties with immersive virtual tours
            </p>
            <Button size="sm" className="w-full">Start Virtual Tour</Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
              <Users className="h-8 w-8 text-accent group-hover:text-white" />
            </div>
            <h3 className="font-semibold mb-2">Client Consultations</h3>
            <p className="text-sm text-muted-foreground mb-4">
              One-on-one meetings with clients and investors
            </p>
            <Button size="sm" variant="outline" className="w-full">Schedule Consultation</Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
              <Share2 className="h-8 w-8 text-secondary group-hover:text-white" />
            </div>
            <h3 className="font-semibold mb-2">Team Meetings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Collaborate with agents and team members
            </p>
            <Button size="sm" variant="outline" className="w-full">Join Team Call</Button>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Meetings */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recordings">Recordings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledCalls
                  .filter(call => call.status === 'scheduled')
                  .map((call, index) => (
                    <motion.div
                      key={call.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Video className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{call.title}</h4>
                          <p className="text-sm text-muted-foreground">{call.description}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(call.scheduled_at).toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {call.participants.length} participants
                            </div>
                            <div>
                              {formatDuration(call.duration_minutes)}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getCallStatusColor(call.status)}>
                          {call.status}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => copyMeetingLink(call.meeting_link)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
                        </Button>
                        <Button size="sm" onClick={() => startCall(call.id)}>
                          <Video className="w-4 h-4 mr-2" />
                          Join
                        </Button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Completed Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledCalls
                  .filter(call => call.status === 'completed')
                  .map((call, index) => (
                    <motion.div
                      key={call.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Video className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{call.title}</h4>
                          <p className="text-sm text-muted-foreground">{call.description}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <div>Completed on {new Date(call.scheduled_at).toLocaleDateString()}</div>
                            <div>{formatDuration(call.duration_minutes)}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {call.recording_url && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Recording
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View Summary
                        </Button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recordings" className="space-y-4">
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Meeting Recordings</h3>
            <p className="text-muted-foreground mb-6">
              Access and manage your recorded meetings and virtual tours.
            </p>
            <Button variant="outline">
              View All Recordings
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Schedule Meeting Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule New Meeting</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Meeting Title</label>
              <Input placeholder="Enter meeting title" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea placeholder="Meeting description (optional)" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date & Time</label>
                <Input type="datetime-local" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <Input placeholder="30 minutes" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Participants</label>
              <Input placeholder="Enter email addresses (comma separated)" />
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={() => setShowScheduleDialog(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1">
                Schedule Meeting
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};