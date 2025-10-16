import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "https://esm.sh/resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalysisRequestData {
  name: string
  email: string
  phone?: string
  propertyType: string
  investmentBudget?: string
  message?: string
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

    const requestData: AnalysisRequestData = await req.json()

    console.log('Processing analysis request:', { name: requestData.name, email: requestData.email })

    // Store in analysis_requests table
    const { data: analysisRequest, error: dbError } = await supabaseClient
      .from('analysis_requests')
      .insert({
        name: requestData.name,
        email: requestData.email,
        phone: requestData.phone,
        property_type: requestData.propertyType,
        investment_budget: requestData.investmentBudget,
        message: requestData.message,
        status: 'new'
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to save analysis request')
    }

    console.log('Analysis request saved:', analysisRequest.id)

    // Property type labels
    const propertyTypeLabels: { [key: string]: string } = {
      'office': 'Office Building',
      'retail': 'Retail Space',
      'industrial': 'Industrial Property',
      'mixed-use': 'Mixed-Use Development',
      'other': 'Other'
    }

    const propertyTypeLabel = propertyTypeLabels[requestData.propertyType] || requestData.propertyType

    // Send email notification to team
    const teamEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          New Commercial Property Analysis Request
        </h2>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${requestData.name}</p>
          <p><strong>Email:</strong> ${requestData.email}</p>
          ${requestData.phone ? `<p><strong>Phone:</strong> ${requestData.phone}</p>` : ''}
        </div>

        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Investment Details</h3>
          <p><strong>Property Type:</strong> ${propertyTypeLabel}</p>
          ${requestData.investmentBudget ? `<p><strong>Investment Budget:</strong> ${requestData.investmentBudget}</p>` : ''}
        </div>

        ${requestData.message ? `
        <div style="background: #fefce8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Additional Information</h3>
          <p style="white-space: pre-wrap;">${requestData.message}</p>
        </div>
        ` : ''}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>Request ID: ${analysisRequest.id}</p>
          <p>Submitted at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `

    const { error: teamEmailError } = await resend.emails.send({
      from: 'Sineva Brokerage <onboarding@resend.dev>',
      to: ['contact@sinevabrokerage.com'],
      subject: `New Analysis Request - ${propertyTypeLabel}`,
      html: teamEmailContent,
    })

    if (teamEmailError) {
      console.error('Team email error:', teamEmailError)
      // Don't throw - request was saved
    } else {
      console.log('Team notification sent successfully')
    }

    // Send confirmation email to client
    const clientEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          Thank You for Your Analysis Request
        </h2>
        
        <p>Dear ${requestData.name},</p>
        
        <p>Thank you for requesting a commercial property investment analysis from Sineva Brokerage. We have received your request for <strong>${propertyTypeLabel}</strong> analysis.</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">What Happens Next?</h3>
          <ul style="color: #374151; line-height: 1.8;">
            <li>Our commercial real estate experts will review your request</li>
            <li>We'll prepare a detailed investment analysis including:
              <ul>
                <li>Market analysis and property valuation</li>
                <li>Financial projections and ROI calculations</li>
                <li>Risk assessment and due diligence recommendations</li>
              </ul>
            </li>
            <li>A specialist will contact you within 24 hours to discuss the analysis</li>
          </ul>
        </div>

        <p>In the meantime, feel free to contact us directly:</p>
        <ul>
          <li><strong>Email:</strong> contact@sinevabrokerage.com</li>
          <li><strong>Phone:</strong> +1 (832) 289-6124</li>
        </ul>

        <p>We look forward to helping you with your commercial real estate investment!</p>

        <p>Best regards,<br>
        The Sineva Brokerage Team</p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>Reference ID: ${analysisRequest.id}</p>
        </div>
      </div>
    `

    await resend.emails.send({
      from: 'Sineva Brokerage <onboarding@resend.dev>',
      to: [requestData.email],
      subject: 'Your Commercial Property Analysis Request - Sineva Brokerage',
      html: clientEmailContent,
    })

    console.log('Client confirmation sent successfully')

    return new Response(
      JSON.stringify({ 
        message: 'Analysis request submitted successfully', 
        requestId: analysisRequest.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in analysis-request function:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to process analysis request' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
