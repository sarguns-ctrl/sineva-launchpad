import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "https://esm.sh/resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactFormData {
  name: string
  email: string
  phone?: string
  country?: string
  inquiryType?: string
  inquiry_type?: string
  investmentRange?: string
  visaType?: string
  message: string
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

    const formData: ContactFormData = await req.json()

    console.log('Processing contact form submission:', { name: formData.name, email: formData.email })

    const inquiryType = formData.inquiry_type || formData.inquiryType || 'General Inquiry'
    
    // Store in contact_submissions
    const { data: submission, error: dbError } = await supabaseClient
      .from('contact_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        inquiry_type: inquiryType,
        investment_range: formData.investmentRange,
        visa_type: formData.visaType,
        message: formData.message
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to save submission')
    }

    console.log('Contact submission saved:', submission.id)

    // Send email notification
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
          ${formData.country ? `<p><strong>Country:</strong> ${formData.country}</p>` : ''}
        </div>

        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Inquiry Details</h3>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
          ${formData.investmentRange ? `<p><strong>Investment Range:</strong> ${formData.investmentRange}</p>` : ''}
          ${formData.visaType ? `<p><strong>Visa Type:</strong> ${formData.visaType}</p>` : ''}
        </div>

        <div style="background: #fefce8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${formData.message}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>Submission ID: ${submission.id}</p>
          <p>Submitted at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `

    const { error: emailError } = await resend.emails.send({
      from: 'Sineva Brokerage <onboarding@resend.dev>',
      to: ['contact@sinevabrokerage.com'],
      subject: `New Contact Inquiry - ${inquiryType}`,
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
          Thank You for Your Inquiry
        </h2>
        
        <p>Dear ${formData.name},</p>
        
        <p>Thank you for contacting Sineva Grupo. We have received your inquiry about <strong>${inquiryType}</strong> and will respond within 24 hours.</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">What happens next?</h3>
          <ul style="color: #374151;">
            <li>Our team will review your inquiry</li>
            <li>A specialist will contact you within 24 hours</li>
            <li>We'll schedule a consultation to discuss your goals</li>
          </ul>
        </div>

        <p>In the meantime, feel free to explore our website or contact us directly at:</p>
        <ul>
          <li>Email: contact@sinevagrupo.com</li>
          <li>Phone: +1 (713) 555-0123</li>
        </ul>

        <p>Best regards,<br>
        The Sineva Grupo Team</p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>Reference ID: ${submission.id}</p>
        </div>
      </div>
    `

    await resend.emails.send({
      from: 'Sineva Brokerage <onboarding@resend.dev>',
      to: [formData.email],
      subject: 'Thank You for Your Inquiry - Sineva Grupo',
      html: confirmationEmail,
    })

    return new Response(
      JSON.stringify({ 
        message: 'Contact form submitted successfully', 
        submissionId: submission.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in contact form function:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to process contact form' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})