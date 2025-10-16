import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting daily newsletter generation...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);

    // Fetch recent properties from all locations
    const { data: properties, error: propertiesError } = await supabase
      .from('properties')
      .select('title, location, price, property_type, description')
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(10);

    if (propertiesError) {
      console.error('Error fetching properties:', propertiesError);
      throw propertiesError;
    }

    // Generate AI content about the properties
    const propertyList = properties.map(p => 
      `- ${p.title} in ${p.location} - $${p.price?.toLocaleString()} (${p.property_type})`
    ).join('\n');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a professional real estate market analyst writing engaging daily newsletters for international investors interested in Texas and US properties. Write in a professional yet friendly tone.'
          },
          {
            role: 'user',
            content: `Create an engaging daily newsletter about these recently listed properties in Texas and other US markets. Include market insights, investment opportunities, and highlight the visa-eligible properties. Keep it concise but informative (300-400 words).

Recent Properties:
${propertyList}

Include:
1. A catchy opening about the current market
2. Brief highlights of 2-3 featured properties
3. Market insight or trend
4. Call to action to view more properties

Format the response as clean HTML suitable for email.`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error(`AI generation failed: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const newsletterContent = aiData.choices[0].message.content;

    // Fetch all subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('subscribed', true);

    if (subscribersError) {
      console.error('Error fetching subscribers:', subscribersError);
      throw subscribersError;
    }

    console.log(`Sending newsletter to ${subscribers.length} subscribers...`);

    // Send emails in batches
    const batchSize = 50;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (subscriber) => {
          try {
            await resend.emails.send({
              from: 'Sineva Brokerage <onboarding@resend.dev>',
              to: subscriber.email,
              subject: `Daily Market Update - ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
              html: `
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: #ffffff; margin: 0;">Sineva Brokerage</h1>
                    <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0;">Daily Market Insights</p>
                  </div>
                  
                  <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
                    ${newsletterContent}
                    
                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
                    
                    <div style="text-align: center; margin-top: 30px;">
                      <a href="https://sinevabrokerage.com/properties" style="display: inline-block; background: #1a1a2e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">View All Properties</a>
                    </div>
                    
                    <p style="font-size: 12px; color: #666; text-align: center; margin-top: 30px;">
                      You're receiving this because you subscribed to Sineva Brokerage market updates.<br>
                      <a href="https://sinevabrokerage.com" style="color: #1a1a2e;">Visit our website</a>
                    </p>
                  </div>
                </body>
                </html>
              `,
            });
          } catch (emailError) {
            console.error(`Failed to send email to ${subscriber.email}:`, emailError);
          }
        })
      );
      
      // Small delay between batches to avoid rate limits
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('Newsletter sent successfully to all subscribers');

    return new Response(
      JSON.stringify({ 
        message: 'Newsletter sent successfully',
        recipients: subscribers.length 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in send-daily-newsletter function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
