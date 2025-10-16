import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AgentApplicationRequest {
  full_name: string;
  email: string;
  phone: string;
  experience_years: number;
  specializations: string[];
  previous_company: string;
  license_number: string;
  motivation: string;
  package_type: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const applicationData: AgentApplicationRequest = await req.json();
    console.log("[agent-application] Processing application for:", applicationData.email);

    // Send confirmation email to applicant
    const applicantEmailResponse = await resend.emails.send({
      from: "Sineva Brokerage <onboarding@resend.dev>",
      to: [applicationData.email],
      subject: "Thank You for Your Agent Application!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Thank You for Applying to Sineva Brokerage!</h1>
          
          <p>Dear ${applicationData.full_name},</p>
          
          <p>We have received your application to join our team of real estate agents. Thank you for your interest in Sineva Brokerage!</p>
          
          <h2 style="color: #2563eb;">Application Summary:</h2>
          <ul>
            <li><strong>Package Type:</strong> ${applicationData.package_type.charAt(0).toUpperCase() + applicationData.package_type.slice(1)}</li>
            <li><strong>Experience:</strong> ${applicationData.experience_years} years</li>
            <li><strong>Phone:</strong> ${applicationData.phone}</li>
            <li><strong>Specializations:</strong> ${applicationData.specializations.join(', ') || 'General Real Estate'}</li>
          </ul>
          
          <h2 style="color: #2563eb;">What's Next?</h2>
          <p>Our HR team will review your application within 24-48 hours. If your profile matches our requirements, we will contact you at:</p>
          <ul>
            <li>Email: ${applicationData.email}</li>
            <li>Phone: ${applicationData.phone}</li>
          </ul>
          
          <p>In the meantime, feel free to learn more about our services and team at <a href="https://sinevabrokerage.com">sinevabrokerage.com</a>.</p>
          
          <p>Best regards,<br>
          The Sineva Brokerage Team</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            This is an automated confirmation email. If you did not submit this application, please contact us immediately.
          </p>
        </div>
      `,
    });

    console.log("[agent-application] Applicant email sent:", applicantEmailResponse);

    // Send notification email to admin team
    const adminEmailResponse = await resend.emails.send({
      from: "Sineva Applications <onboarding@resend.dev>",
      to: ["contact@sinevabrokerage.com"],
      subject: `New Agent Application: ${applicationData.full_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">New Agent Application Received</h1>
          
          <h2 style="color: #2563eb;">Applicant Details:</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f3f4f6;">
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Full Name</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.full_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Email</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="mailto:${applicationData.email}">${applicationData.email}</a></td>
            </tr>
            <tr style="background-color: #f3f4f6;">
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Phone</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="tel:${applicationData.phone}">${applicationData.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Package Type</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.package_type.charAt(0).toUpperCase() + applicationData.package_type.slice(1)}</td>
            </tr>
            <tr style="background-color: #f3f4f6;">
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Years of Experience</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.experience_years}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Previous Company</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.previous_company || 'Not specified'}</td>
            </tr>
            <tr style="background-color: #f3f4f6;">
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>License Number</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.license_number || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Specializations</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${applicationData.specializations.join(', ') || 'None specified'}</td>
            </tr>
          </table>
          
          <h2 style="color: #2563eb; margin-top: 20px;">Motivation:</h2>
          <p style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #2563eb;">
            ${applicationData.motivation || 'No motivation provided'}
          </p>
          
          <p style="margin-top: 20px;">
            <a href="https://sinevabrokerage.com/admin/agent-applications" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Review Application in Dashboard
            </a>
          </p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            This notification was sent automatically from the Sineva Brokerage agent application system.
          </p>
        </div>
      `,
    });

    console.log("[agent-application] Admin email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Application processed and emails sent successfully" 
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
    console.error("[agent-application] Error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
