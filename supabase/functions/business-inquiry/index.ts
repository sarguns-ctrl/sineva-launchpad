import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BusinessInquiryRequest {
  businessId: string;
  inquirerName: string;
  inquirerEmail: string;
  inquirerPhone?: string;
  message: string;
  investmentBudget?: number;
  visaRequirement?: string;
  businessName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get the authorization header
    const authHeader = req.headers.get('authorization');
    if (authHeader) {
      supabase.auth.setAuth(authHeader.replace('Bearer ', ''));
    }

    const inquiryData: BusinessInquiryRequest = await req.json();
    console.log("Business inquiry received:", inquiryData);

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Authentication required');
    }

    // Save inquiry to database
    const { error: dbError } = await supabase
      .from('business_inquiries')
      .insert({
        business_id: inquiryData.businessId,
        inquirer_id: user.id,
        inquirer_name: inquiryData.inquirerName,
        inquirer_email: inquiryData.inquirerEmail,
        inquirer_phone: inquiryData.inquirerPhone,
        message: inquiryData.message,
        investment_budget: inquiryData.investmentBudget,
        visa_requirement: inquiryData.visaRequirement,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw dbError;
    }

    // Send email notification to company
    const companyEmailResponse = await resend.emails.send({
      from: "Business Inquiries <contact@sinevagrupo.com>",
      to: ["contact@sinevagrupo.com"],
      subject: `New Business Inquiry - ${inquiryData.businessName}`,
      html: `
        <h2>New Business Inquiry</h2>
        <p>A new inquiry has been submitted for the business listing: <strong>${inquiryData.businessName}</strong></p>
        
        <h3>Inquirer Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${inquiryData.inquirerName}</li>
          <li><strong>Email:</strong> ${inquiryData.inquirerEmail}</li>
          ${inquiryData.inquirerPhone ? `<li><strong>Phone:</strong> ${inquiryData.inquirerPhone}</li>` : ''}
          ${inquiryData.investmentBudget ? `<li><strong>Investment Budget:</strong> $${inquiryData.investmentBudget.toLocaleString()}</li>` : ''}
          ${inquiryData.visaRequirement ? `<li><strong>Visa Requirement:</strong> ${inquiryData.visaRequirement}</li>` : ''}
        </ul>
        
        <h3>Message:</h3>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${inquiryData.message}
        </p>
        
        <p>Please follow up with this inquiry promptly.</p>
      `,
    });

    console.log("Company notification sent:", companyEmailResponse);

    // Send confirmation email to inquirer
    const confirmationEmailResponse = await resend.emails.send({
      from: "Grupo Sineva <contact@sinevagrupo.com>",
      to: [inquiryData.inquirerEmail],
      subject: `Thank you for your inquiry - ${inquiryData.businessName}`,
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${inquiryData.inquirerName},</p>
        
        <p>We have received your inquiry regarding <strong>${inquiryData.businessName}</strong> and will get back to you shortly.</p>
        
        <h3>Your inquiry details:</h3>
        <ul>
          ${inquiryData.investmentBudget ? `<li><strong>Investment Budget:</strong> $${inquiryData.investmentBudget.toLocaleString()}</li>` : ''}
          ${inquiryData.visaRequirement ? `<li><strong>Visa Requirement:</strong> ${inquiryData.visaRequirement}</li>` : ''}
        </ul>
        
        <p><strong>Your message:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${inquiryData.message}
        </p>
        
        <p>One of our business brokers will contact you within 24 hours to discuss this opportunity.</p>
        
        <p>Best regards,<br>
        The Grupo Sineva Team<br>
        Email: contact@sinevagrupo.com</p>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in business-inquiry function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);