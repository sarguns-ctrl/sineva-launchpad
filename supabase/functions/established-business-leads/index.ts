import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EstablishedBusinessLeadData {
  full_name: string;
  email: string;
  phone?: string;
  business_type: string;
  investment_budget: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const leadData: EstablishedBusinessLeadData = await req.json();
    console.log("Processing established business lead submission");

    // Validate required fields
    if (!leadData.full_name || !leadData.email || !leadData.business_type || !leadData.investment_budget) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Insert lead into database
    const { data: insertedLead, error: insertError } = await supabase
      .from("established_business_leads")
      .insert([
        {
          full_name: leadData.full_name,
          email: leadData.email,
          phone: leadData.phone || null,
          business_type: leadData.business_type,
          investment_budget: leadData.investment_budget,
          status: "new",
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting lead:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to submit lead" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Lead inserted successfully:", insertedLead.id);

    // Send email notification to business team
    try {
      const emailHtml = `
        <h2>New Established Business Lead</h2>
        <p><strong>Name:</strong> ${leadData.full_name}</p>
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Phone:</strong> ${leadData.phone || "Not provided"}</p>
        <p><strong>Business Type:</strong> ${leadData.business_type}</p>
        <p><strong>Investment Budget:</strong> ${leadData.investment_budget}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><em>Lead ID: ${insertedLead.id}</em></p>
      `;

      const { error: emailError } = await resend.emails.send({
        from: "Sineva Brokerage <onboarding@resend.dev>",
        to: ["contact@sinevabrokerage.com"],
        subject: `New Established Business Lead: ${leadData.full_name}`,
        html: emailHtml,
      });

      if (emailError) {
        console.error("Error sending email notification:", emailError);
        // Don't fail the request if email fails
      } else {
        console.log("Email notification sent successfully");
      }

      // Send confirmation email to the user
      const confirmationHtml = `
        <h2>Thank You for Your Interest!</h2>
        <p>Dear ${leadData.full_name},</p>
        <p>Thank you for your interest in buying an established business. We have received your inquiry and one of our experienced business brokers will contact you shortly.</p>
        <p><strong>Your Submission Details:</strong></p>
        <ul>
          <li><strong>Business Type:</strong> ${leadData.business_type}</li>
          <li><strong>Investment Budget:</strong> ${leadData.investment_budget}</li>
        </ul>
        <p>In the meantime, feel free to explore our available businesses or contact us if you have any questions.</p>
        <p>Best regards,<br>
        <strong>Sineva Brokerage Team</strong><br>
        contact@sinevabrokerage.com</p>
      `;

      await resend.emails.send({
        from: "Sineva Brokerage <onboarding@resend.dev>",
        to: [leadData.email],
        subject: "Thank You for Your Interest - Sineva Brokerage",
        html: confirmationHtml,
      });

      console.log("Confirmation email sent to user");
    } catch (emailError) {
      console.error("Email error:", emailError);
      // Continue even if email fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: insertedLead.id,
        message: "Lead submitted successfully" 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in established-business-leads function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);