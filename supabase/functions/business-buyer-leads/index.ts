import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "https://esm.sh/resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BusinessBuyerLeadData {
  full_name: string
  email: string
  phone?: string
  investment_budget: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

    const formData: BusinessBuyerLeadData = await req.json()

    console.log('Processing business buyer lead:', { name: formData.full_name, email: formData.email })

    // Store in leads table
    const { data: leadSubmission, error: leadError } = await supabaseClient
      .from('leads')
      .insert({
        lead_source: 'buy_business_leads_page',
        lead_status: 'new',
        contact_info: {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          investment_budget: formData.investment_budget,
        },
        notes: `Business buyer lead - Budget: ${formData.investment_budget}`,
      })
      .select()
      .single()

    if (leadError) {
      console.error('Lead database error:', leadError)
      throw new Error('Failed to save lead submission')
    }

    console.log('Lead submission saved:', leadSubmission.id)

    // Send email notification to business team
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          New Business Buyer Lead
        </h2>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${formData.full_name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
          <p><strong>Investment Budget:</strong> ${formData.investment_budget}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>Lead ID: ${leadSubmission.id}</p>
          <p>Submitted at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `

    const { error: emailError } = await resend.emails.send({
      from: 'Sineva Brokerage <noreply@sinevabrokerage.com>',
      to: ['contact@sinevabrokerage.com'],
      subject: `New Business Buyer Lead - ${formData.investment_budget}`,
      html: emailContent,
    })

    if (emailError) {
      console.error('Email error:', emailError)
      // Don't throw error for email failure - submission was still saved
    } else {
      console.log('Email notification sent successfully')
    }

    // Send confirmation email to user
    const confirmationEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          Thank You for Your Interest in Texas Businesses
        </h2>
        
        <p>Dear ${formData.full_name},</p>
        
        <p>Thank you for submitting your information to Sineva Brokerage. We have received your business buyer inquiry and will respond within 24 hours with tailored opportunities matching your investment goals.</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">What happens next?</h3>
          <ul style="color: #374151;">
            <li>Our team will review your investment criteria</li>
            <li>We'll compile exclusive business listings matching your budget</li>
            <li>You'll receive personalized opportunities within 24 hours</li>
            <li>A specialist will contact you to discuss next steps</li>
          </ul>
        </div>

        <p>Your investment budget: <strong>${formData.investment_budget}</strong></p>

        <p>In the meantime, feel free to explore our website or contact us directly at:</p>
        <ul>
          <li>Email: contact@sinevabrokerage.com</li>
          <li>Phone: +1 (713) 555-0123</li>
        </ul>

        <p>Best regards,<br>
        The Sineva Brokerage Team</p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>Reference ID: ${leadSubmission.id}</p>
        </div>
      </div>
    `

    await resend.emails.send({
      from: 'Sineva Brokerage <noreply@sinevabrokerage.com>',
      to: [formData.email],
      subject: 'Thank You - Your Business Buyer Inquiry',
      html: confirmationEmail,
    })

    return new Response(
      JSON.stringify({ 
        message: 'Business buyer lead submitted successfully', 
        submissionId: leadSubmission.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in business-buyer-leads function:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to process business buyer lead' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
