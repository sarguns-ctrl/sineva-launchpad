import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EstablishedBusinessLeadData {
  full_name: string;
  email: string;
  phone?: string;
  business_type: string;
  investment_budget: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    const leadData: EstablishedBusinessLeadData = await req.json();
    console.log('Received lead data:', { ...leadData, phone: leadData.phone ? '***' : undefined });

    // Insert lead into database
    const { data: insertedLead, error: insertError } = await supabase
      .from('established_business_leads')
      .insert({
        full_name: leadData.full_name,
        email: leadData.email,
        phone: leadData.phone,
        business_type: leadData.business_type,
        investment_budget: leadData.investment_budget,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error(`Failed to save lead: ${insertError.message}`);
    }

    console.log('Lead saved to database:', insertedLead.id);

    // Send email notification to business team
    const { error: businessEmailError } = await resend.emails.send({
      from: 'Sineva Brokerage <onboarding@resend.dev>',
      to: ['contact@sinevabrokerage.com'],
      subject: '🏢 New Established Business Lead',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Established Business Lead Inquiry</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
            <p><strong>Name:</strong> ${leadData.full_name}</p>
            <p><strong>Email:</strong> <a href="mailto:${leadData.email}">${leadData.email}</a></p>
            ${leadData.phone ? `<p><strong>Phone:</strong> <a href="tel:${leadData.phone}">${leadData.phone}</a></p>` : ''}
          </div>

          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Business Interests</h3>
            <p><strong>Business Type:</strong> ${leadData.business_type}</p>
            <p><strong>Investment Budget:</strong> ${leadData.investment_budget}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">Lead ID: ${insertedLead.id}</p>
            <p style="color: #6b7280; font-size: 14px;">Submitted: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    if (businessEmailError) {
      console.error('Business email error:', businessEmailError);
    } else {
      console.log('Business notification email sent successfully');
    }

    // Send confirmation email to user
    const { error: userEmailError } = await resend.emails.send({
      from: 'Sineva Brokerage <onboarding@resend.dev>',
      to: [leadData.email],
      subject: 'Thank You for Your Interest in Buying an Established Business',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Thank You for Your Interest!</h2>
          
          <p>Dear ${leadData.full_name},</p>
          
          <p>Thank you for your interest in purchasing an established business through Sineva Brokerage. We've received your inquiry and our team will review your information shortly.</p>
          
          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">What Happens Next?</h3>
            <ul style="color: #374151;">
              <li>Our team will review your inquiry within 24 hours</li>
              <li>We'll match you with suitable established business opportunities</li>
              <li>A dedicated broker will contact you to discuss your requirements</li>
              <li>We'll schedule a consultation to understand your goals better</li>
            </ul>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Your Inquiry Details</h3>
            <p><strong>Business Type:</strong> ${leadData.business_type}</p>
            <p><strong>Investment Budget:</strong> ${leadData.investment_budget}</p>
          </div>

          <p>If you have any immediate questions, please don't hesitate to contact us at <a href="mailto:contact@sinevabrokerage.com">contact@sinevabrokerage.com</a>.</p>
          
          <p>Best regards,<br>
          <strong>The Sineva Brokerage Team</strong></p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px;">This is an automated confirmation email. Please do not reply directly to this message.</p>
          </div>
        </div>
      `,
    });

    if (userEmailError) {
      console.error('User confirmation email error:', userEmailError);
    } else {
      console.log('User confirmation email sent successfully');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: insertedLead.id,
        message: 'Lead submitted successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing established business lead:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
};

serve(handler);
