import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
}

const SEOHead = ({ 
  title = "Premium Real Estate - International Investment Opportunities",
  description = "Connect with North America's most trusted real estate professionals. 20+ years of expertise backing every transaction. Licensed professionals serving 15+ countries.",
  keywords = ["real estate", "international investment", "property investment", "E-2 visa", "EB-5 visa", "commercial real estate"],
  canonicalUrl = window.location.href,
  ogImage = "/og-image.jpg",
  structuredData
}: SEOHeadProps) => {
  
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic SEO meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:type', 'website', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    
    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl);
    
    // Structured Data (JSON-LD)
    if (structuredData) {
      let jsonLdElement = document.querySelector('#structured-data') as HTMLScriptElement;
      if (!jsonLdElement) {
        jsonLdElement = document.createElement('script');
        jsonLdElement.id = 'structured-data';
        jsonLdElement.type = 'application/ld+json';
        document.head.appendChild(jsonLdElement);
      }
      jsonLdElement.textContent = JSON.stringify(structuredData);
    }
    
  }, [title, description, keywords, canonicalUrl, ogImage, structuredData]);

  return null;
};

export default SEOHead;