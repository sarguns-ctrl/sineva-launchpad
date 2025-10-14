import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ValuationRequest {
  fullName: string;
  email: string;
  phone: string;
  annualRevenueRange: string;
  agreeToContact: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, phone, annualRevenueRange, agreeToContact }: ValuationRequest = await req.json();

    console.log("Processing valuation request for:", email);

    if (!agreeToContact) {
      return new Response(
        JSON.stringify({ error: "You must agree to be contacted" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Store in Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: valuationData, error: dbError } = await supabase
      .from("business_valuation_requests")
      .insert({
        full_name: fullName,
        email: email,
        phone: phone,
        annual_revenue_range: annualRevenueRange,
        status: 'new'
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to store valuation request: ${dbError.message}`);
    }

    console.log("Valuation request stored:", valuationData.id);

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Sinevabrokerage <onboarding@resend.dev>",
      to: ["contact@sinevabrokerage.com"],
      subject: "New Business Valuation Request",
      html: `
        <h2>New Business Valuation Request</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Annual Revenue Range:</strong> ${annualRevenueRange}</p>
        <p><strong>Request ID:</strong> ${valuationData.id}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("Admin email sent:", adminEmailResponse);

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "Sinevabrokerage <onboarding@resend.dev>",
      to: [email],
      subject: "Your Business Valuation Request Has Been Received",
      html: `
        <h1>Thank You, ${fullName}!</h1>
        <p>Your business valuation request has been received.</p>
        <p>A Sinevabrokerage broker will contact you shortly with your valuation results.</p>
        <p>Check your inbox for your free guide: <strong>"Preparing to Sell Your Business in Texas."</strong></p>
        <br>
        <p><strong>Your Information:</strong></p>
        <ul>
          <li>Annual Revenue Range: ${annualRevenueRange}</li>
          <li>Phone: ${phone}</li>
        </ul>
        <br>
        <p>Best regards,<br>The Sinevabrokerage Team</p>
      `,
    });

    console.log("User confirmation email sent:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Valuation request submitted successfully",
        requestId: valuationData.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in business-valuation-request function:", error);
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
