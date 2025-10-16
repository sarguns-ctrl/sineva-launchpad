import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AppointmentEmailRequest {
  clientName: string;
  clientEmail: string;
  agentName: string;
  appointmentType: string;
  scheduledAt: string;
  propertyAddress?: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      clientName, 
      clientEmail, 
      agentName,
      appointmentType,
      scheduledAt,
      propertyAddress,
      notes 
    }: AppointmentEmailRequest = await req.json();

    console.log("Sending appointment email:", { clientName, clientEmail, appointmentType });

    // Send notification to company
    const companyEmailResponse = await resend.emails.send({
      from: "Appointments <onboarding@resend.dev>",
      to: ["contact@sinevabrokerage.com"],
      subject: `New Appointment Scheduled - ${appointmentType}`,
      html: `
        <h2>New Appointment Scheduled</h2>
        <p>A new appointment has been scheduled:</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Appointment Details:</h3>
          <p><strong>Type:</strong> ${appointmentType}</p>
          <p><strong>Date & Time:</strong> ${new Date(scheduledAt).toLocaleString()}</p>
          <p><strong>Agent:</strong> ${agentName}</p>
          ${propertyAddress ? `<p><strong>Property:</strong> ${propertyAddress}</p>` : ''}
          
          <h3>Client Information:</h3>
          <p><strong>Name:</strong> ${clientName}</p>
          <p><strong>Email:</strong> ${clientEmail}</p>
          
          ${notes ? `<h3>Additional Notes:</h3><p>${notes}</p>` : ''}
        </div>
        
        <p>Best regards,<br>Sineva Grupo System</p>
      `,
    });

    console.log("Company notification sent:", companyEmailResponse);

    // Send confirmation to client
    const clientEmailResponse = await resend.emails.send({
      from: "Sineva Brokerage <onboarding@resend.dev>",
      to: [clientEmail],
      subject: "Appointment Confirmation - Sineva Brokerage",
      html: `
        <h2>Your Appointment is Confirmed!</h2>
        <p>Dear ${clientName},</p>
        
        <p>Your appointment with Sineva Brokerage has been successfully scheduled.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
          <h3>Appointment Details:</h3>
          <p><strong>Type:</strong> ${appointmentType}</p>
          <p><strong>Date & Time:</strong> ${new Date(scheduledAt).toLocaleString()}</p>
          <p><strong>Agent:</strong> ${agentName}</p>
          ${propertyAddress ? `<p><strong>Property Location:</strong> ${propertyAddress}</p>` : ''}
          ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
        </div>
        
        <p>We look forward to meeting with you. If you need to reschedule or have any questions, please contact us.</p>
        
        <p>Best regards,<br>The Sineva Brokerage Team</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #666;">
          If you didn't schedule this appointment, please contact us immediately.
        </p>
      `,
    });

    console.log("Client confirmation sent:", clientEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Appointment confirmation emails sent successfully" 
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
    console.error("Error in send-appointment-email function:", error);
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
