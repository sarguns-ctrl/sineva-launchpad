import { useEffect, useCallback } from 'react';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

interface UserBehavior {
  pageViews: number;
  timeOnPage: number;
  interactions: string[];
  scrollDepth: number;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // In production, this would send to your analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', {
        ...event,
        timestamp: event.timestamp || new Date(),
        url: window.location.href,
        userAgent: navigator.userAgent
      });
    }
    
    // Example integration with Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.name, {
        ...event.properties,
        custom_parameter_1: 'real_estate_platform'
      });
    }
  }, []);

  const trackPageView = useCallback((pageName?: string) => {
    trackEvent({
      name: 'page_view',
      properties: {
        page_name: pageName || document.title,
        page_url: window.location.href,
        referrer: document.referrer
      }
    });
  }, [trackEvent]);

  const trackUserInteraction = useCallback((interaction: string, element?: string) => {
    trackEvent({
      name: 'user_interaction',
      properties: {
        interaction_type: interaction,
        element_id: element,
        page_url: window.location.href
      }
    });
  }, [trackEvent]);

  const trackConversion = useCallback((type: string, value?: number) => {
    trackEvent({
      name: 'conversion',
      properties: {
        conversion_type: type,
        conversion_value: value,
        page_url: window.location.href
      }
    });
  }, [trackEvent]);

  // Auto-track scroll depth
  useEffect(() => {
    let maxScrollDepth = 0;
    
    const trackScrollDepth = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = Math.round((window.scrollY / scrollHeight) * 100);
      
      if (scrollDepth > maxScrollDepth && scrollDepth % 25 === 0) {
        maxScrollDepth = scrollDepth;
        trackEvent({
          name: 'scroll_depth',
          properties: { 
            depth_percentage: scrollDepth,
            page_url: window.location.href
          }
        });
      }
    };

    window.addEventListener('scroll', trackScrollDepth);
    return () => window.removeEventListener('scroll', trackScrollDepth);
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackUserInteraction,
    trackConversion
  };
};