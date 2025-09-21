import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InterviewRequestData {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  experience?: string;
  preferredTime?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: InterviewRequestData = await req.json();
    console.log("Interview request received:", requestData);

    // Send notification to company
    const companyEmailResponse = await resend.emails.send({
      from: "Interview Requests <onboarding@resend.dev>",
      to: ["hr@sinevagrupo.com"], // Company email
      subject: "New Interview Request - Agent Position",
      html: `
        <h2>New Interview Request</h2>
        <p>A new agent interview request has been submitted:</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Candidate Information:</h3>
          <p><strong>Name:</strong> ${requestData.name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${requestData.email || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${requestData.phone || 'Not provided'}</p>
          <p><strong>Location:</strong> ${requestData.location || 'Not provided'}</p>
          <p><strong>Experience:</strong> ${requestData.experience || 'Not provided'}</p>
          <p><strong>Preferred Time:</strong> ${requestData.preferredTime || 'Not provided'}</p>
          <p><strong>Request Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <p>Please contact the candidate within 24 hours to schedule their interview.</p>
        
        <p>Best regards,<br>Sineva Grupo System</p>
      `,
    });

    console.log("Company notification sent:", companyEmailResponse);

    // Send confirmation to candidate if email provided
    if (requestData.email) {
      const candidateEmailResponse = await resend.emails.send({
        from: "Sineva Grupo HR <onboarding@resend.dev>",
        to: [requestData.email],
        subject: "Interview Request Received - Sineva Grupo",
        html: `
          <h2>Thank you for your interest in joining Sineva Grupo!</h2>
          <p>Dear ${requestData.name || 'Candidate'},</p>
          
          <p>We have received your interview request and are excited to learn more about you.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
            <h3>What happens next?</h3>
            <ul>
              <li>Our HR team will review your request within 24 hours</li>
              <li>We'll contact you to schedule a convenient interview time</li>
              <li>The interview will cover your experience and our opportunities</li>
              <li>We'll discuss commission structures and support systems</li>
            </ul>
          </div>
          
          <p>In the meantime, feel free to explore more about our company and agent benefits on our website.</p>
          
          <p>Best regards,<br>The Sineva Grupo Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            If you didn't request this interview, please ignore this email.
          </p>
        `,
      });

      console.log("Candidate confirmation sent:", candidateEmailResponse);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Interview request submitted successfully" 
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
    console.error("Error in schedule-interview function:", error);
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