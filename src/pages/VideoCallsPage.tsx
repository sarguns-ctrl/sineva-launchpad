import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { VideoCallIntegration } from "@/components/VideoCallIntegration";
import SEOHead from "@/components/SEOHead";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const VideoCallsPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <SEOHead 
          title="Video Calls - Virtual Property Tours & Meetings | Grupo Sineva"
          description="Schedule and conduct video calls for virtual property tours, client consultations, and remote meetings."
        />
        <Navigation />
        
        <main className="pt-20">
          <VideoCallIntegration />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default VideoCallsPage;