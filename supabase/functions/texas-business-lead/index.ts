import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TexasBusinessLeadRequest {
  fullName: string;
  email: string;
  phone: string;
  businessType: string;
  investmentBudget: string;
  agreeToContact: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      fullName,
      email,
      phone,
      businessType,
      investmentBudget,
      agreeToContact,
    }: TexasBusinessLeadRequest = await req.json();

    console.log("Processing Texas business lead for:", email);

    // Validate required fields
    if (!fullName || !email || !phone || !businessType || !investmentBudget) {
      throw new Error("Missing required fields");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save lead to database
    const { data: leadData, error: leadError } = await supabase
      .from("texas_business_leads")
      .insert({
        full_name: fullName,
        email: email,
        phone: phone,
        business_type: businessType,
        investment_budget: investmentBudget,
        agreed_to_contact: agreeToContact,
        status: "new",
      })
      .select()
      .single();

    if (leadError) {
      console.error("Error saving lead:", leadError);
      throw leadError;
    }

    console.log("Lead saved successfully:", leadData.id);

    // Send notification email to Sinevabrokerage
    const notificationEmailResponse = await resend.emails.send({
      from: "Sinevabrokerage Leads <onboarding@resend.dev>",
      to: ["contact@sinevabrokerage.com"],
      subject: `New Texas Business Buyer Lead - ${fullName}`,
      html: `
        <h2>New Texas Business Buyer Lead</h2>
        <p>A new potential buyer has submitted their information:</p>
        
        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        
        <h3>Business Preferences:</h3>
        <ul>
          <li><strong>Business Type:</strong> ${businessType}</li>
          <li><strong>Investment Budget:</strong> ${investmentBudget}</li>
          <li><strong>Agreed to Contact:</strong> ${agreeToContact ? "Yes" : "No"}</li>
        </ul>
        
        <p><strong>Lead ID:</strong> ${leadData.id}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        
        <hr />
        <p style="color: #666; font-size: 12px;">
          This lead was submitted through the Texas Business Buyer Landing Page.
        </p>
      `,
    });

    if (notificationEmailResponse.error) {
      console.error(
        "Error sending notification email:",
        notificationEmailResponse.error
      );
    } else {
      console.log(
        "Notification email sent successfully:",
        notificationEmailResponse.data
      );
    }

    // Send confirmation email to the lead
    const confirmationEmailResponse = await resend.emails.send({
      from: "Sinevabrokerage <onboarding@resend.dev>",
      to: [email],
      subject: "Thank You for Your Interest in Texas Businesses",
      html: `
        <h2>Thank You, ${fullName}!</h2>
        <p>We've received your request for information about available Texas businesses.</p>
        
        <h3>What's Next?</h3>
        <p>One of our expert business brokers will review your preferences and reach out to you within 24 hours with:</p>
        <ul>
          <li>Personalized business listings matching your criteria</li>
          <li>Market insights for your investment range</li>
          <li>Information about financing options</li>
          <li>Details about the acquisition process</li>
        </ul>
        
        <h3>Your Submission Details:</h3>
        <ul>
          <li><strong>Business Type:</strong> ${businessType}</li>
          <li><strong>Investment Budget:</strong> ${investmentBudget}</li>
        </ul>
        
        <p>In the meantime, if you have any urgent questions, feel free to reply to this email or call us directly.</p>
        
        <p>Best regards,<br>
        <strong>Sinevabrokerage Team</strong><br>
        Your Texas Business Brokerage Experts</p>
        
        <hr />
        <p style="color: #666; font-size: 12px;">
          Sinevabrokerage | Licensed Texas Brokerage<br>
          Offices in Dallas, Houston & Austin<br>
          <a href="mailto:contact@sinevabrokerage.com">contact@sinevabrokerage.com</a>
        </p>
      `,
    });

    if (confirmationEmailResponse.error) {
      console.error(
        "Error sending confirmation email:",
        confirmationEmailResponse.error
      );
    } else {
      console.log(
        "Confirmation email sent successfully:",
        confirmationEmailResponse.data
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your information has been submitted successfully!",
        leadId: leadData.id,
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
    console.error("Error in texas-business-lead function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "An error occurred processing your request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
