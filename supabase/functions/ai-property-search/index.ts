import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchRequest {
  query: string;
  maxResults?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, maxResults = 10 }: SearchRequest = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Use Gemini to parse natural language query
    const parsePrompt = `Parse this natural language property search query and extract structured search criteria. Return a JSON object with these possible fields:
    - propertyType: "house", "apartment", "condo", "townhouse", etc.
    - minPrice: number
    - maxPrice: number  
    - bedrooms: number
    - bathrooms: number
    - location: string (city, neighborhood, or area)
    - features: array of strings (pool, garage, garden, etc.)
    - listingType: "sale" or "rent"
    
    Query: "${query}"
    
    Only return valid JSON, no other text.`;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: parsePrompt }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 500,
        }
      }),
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    let searchCriteria;

    try {
      const aiResponse = geminiData.candidates[0].content.parts[0].text;
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        searchCriteria = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in AI response');
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback to simple text search
      searchCriteria = { location: query };
    }

    // Build Supabase query based on parsed criteria
    let dbQuery = supabase
      .from('properties')
      .select('*')
      .eq('status', 'active')
      .limit(maxResults);

    // Apply filters based on AI-parsed criteria
    if (searchCriteria.propertyType) {
      dbQuery = dbQuery.ilike('property_type', `%${searchCriteria.propertyType}%`);
    }
    
    if (searchCriteria.listingType) {
      dbQuery = dbQuery.eq('listing_type', searchCriteria.listingType);
    }
    
    if (searchCriteria.minPrice) {
      dbQuery = dbQuery.gte('price', searchCriteria.minPrice);
    }
    
    if (searchCriteria.maxPrice) {
      dbQuery = dbQuery.lte('price', searchCriteria.maxPrice);
    }
    
    if (searchCriteria.bedrooms) {
      dbQuery = dbQuery.gte('bedrooms', searchCriteria.bedrooms);
    }
    
    if (searchCriteria.bathrooms) {
      dbQuery = dbQuery.gte('bathrooms', searchCriteria.bathrooms);
    }
    
    if (searchCriteria.location) {
      dbQuery = dbQuery.or(`city.ilike.%${searchCriteria.location}%,state.ilike.%${searchCriteria.location}%,address.ilike.%${searchCriteria.location}%`);
    }

    const { data: properties, error } = await dbQuery;

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    // Use Gemini to rank and explain results
    if (properties && properties.length > 0) {
      const rankingPrompt = `Based on the user's query "${query}" and the parsed criteria ${JSON.stringify(searchCriteria)}, rank these properties and provide a brief explanation for each. Return JSON with "rankings" array containing objects with "id", "score" (0-100), and "reasoning":

      Properties: ${JSON.stringify(properties.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        location: `${p.city}, ${p.state}`,
        type: p.property_type,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        features: p.property_features
      })))}`;

      try {
        const rankingResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: rankingPrompt }]
            }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 1000,
            }
          }),
        });

        if (rankingResponse.ok) {
          const rankingData = await rankingResponse.json();
          const rankingText = rankingData.candidates[0].content.parts[0].text;
          const rankingMatch = rankingText.match(/\{[\s\S]*\}/);
          
          if (rankingMatch) {
            const rankings = JSON.parse(rankingMatch[0]);
            
            // Sort properties by AI ranking
            const rankedProperties = properties.map(prop => {
              const ranking = rankings.rankings?.find((r: any) => r.id === prop.id);
              return {
                ...prop,
                aiScore: ranking?.score || 50,
                aiReasoning: ranking?.reasoning || 'Property matches your search criteria'
              };
            }).sort((a, b) => b.aiScore - a.aiScore);

            return new Response(
              JSON.stringify({
                properties: rankedProperties,
                searchCriteria,
                totalResults: properties.length,
                query
              }),
              {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              },
            );
          }
        }
      } catch (rankingError) {
        console.error('Error ranking properties:', rankingError);
      }
    }

    return new Response(
      JSON.stringify({
        properties: properties || [],
        searchCriteria,
        totalResults: properties?.length || 0,
        query
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );

  } catch (error) {
    console.error('Error in ai-property-search function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        properties: [],
        totalResults: 0
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});