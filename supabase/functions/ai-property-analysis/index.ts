import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisRequest {
  propertyId: string;
  analysisType: 'investment' | 'market' | 'description' | 'comparison';
  compareWith?: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { propertyId, analysisType, compareWith }: AnalysisRequest = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Fetch property data
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propertyId)
      .single();

    if (error || !property) {
      throw new Error('Property not found');
    }

    // Fetch market insights for the area
    const { data: marketData } = await supabase
      .from('market_insights')
      .select('*')
      .ilike('location', `%${property.city}%`)
      .limit(5);

    let prompt = '';
    let context = {
      property,
      marketData: marketData || []
    };

    switch (analysisType) {
      case 'investment':
        prompt = `Analyze this property as an investment opportunity:
        
        Property: ${property.title}
        Price: $${property.price}
        Location: ${property.city}, ${property.state}
        Type: ${property.property_type}
        Bedrooms: ${property.bedrooms}
        Bathrooms: ${property.bathrooms}
        Square Feet: ${property.square_feet}
        Year Built: ${property.year_built}
        
        Market Data: ${JSON.stringify(marketData)}
        
        Provide analysis on:
        1. Investment potential (ROI, appreciation outlook)
        2. Rental yield potential
        3. Market conditions and trends
        4. Risk factors
        5. Recommendation (buy/hold/pass)
        
        Format as structured JSON with sections: summary, investmentScore (0-100), pros, cons, marketOutlook, recommendation.`;
        break;

      case 'market':
        prompt = `Provide a comprehensive market analysis for this property:
        
        Property Location: ${property.city}, ${property.state}
        Property Type: ${property.property_type}
        Price: $${property.price}
        
        Market Data: ${JSON.stringify(marketData)}
        
        Analyze:
        1. Current market conditions
        2. Price competitiveness 
        3. Neighborhood trends
        4. Future outlook
        5. Comparable sales
        
        Format as JSON with: marketConditions, priceAnalysis, trends, outlook, comparables.`;
        break;

      case 'description':
        prompt = `Generate an engaging, SEO-optimized property description:
        
        Property Details:
        - Title: ${property.title}
        - Price: $${property.price}
        - Location: ${property.address}, ${property.city}, ${property.state}
        - Type: ${property.property_type}
        - Bedrooms: ${property.bedrooms}
        - Bathrooms: ${property.bathrooms}
        - Square Feet: ${property.square_feet}
        - Features: ${JSON.stringify(property.property_features)}
        - Current Description: ${property.description}
        
        Create a compelling description that highlights:
        1. Key features and benefits
        2. Location advantages
        3. Investment potential
        4. Lifestyle benefits
        
        Return JSON with: title, description, highlights, seoKeywords.`;
        break;

      case 'comparison':
        if (compareWith && compareWith.length > 0) {
          const { data: compareProperties } = await supabase
            .from('properties')
            .select('*')
            .in('id', compareWith);
          
          context = { ...context, compareProperties };
          
          prompt = `Compare these properties and provide detailed analysis:
          
          Main Property: ${JSON.stringify(property)}
          
          Comparison Properties: ${JSON.stringify(compareProperties)}
          
          Provide:
          1. Side-by-side comparison
          2. Pros/cons of each
          3. Value analysis
          4. Investment potential ranking
          5. Recommendation
          
          Format as JSON with comparison matrix and analysis.`;
        } else {
          throw new Error('Comparison properties required for comparison analysis');
        }
        break;

      default:
        throw new Error('Invalid analysis type');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;

    // Try to parse as JSON, fallback to text
    let analysis;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        analysis = { content: aiResponse };
      }
    } catch (parseError) {
      analysis = { content: aiResponse };
    }

    return new Response(
      JSON.stringify({
        analysis,
        analysisType,
        propertyId,
        context,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );

  } catch (error) {
    console.error('Error in ai-property-analysis function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        analysis: null
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});