import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "https://esm.sh/resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Get active saved searches that need alerts
    const { data: searches, error: searchError } = await supabaseClient
      .from('saved_searches')
      .select(`
        *,
        profiles!saved_searches_user_id_fkey(email, full_name)
      `)
      .eq('is_active', true)
      .neq('alert_frequency', 'never')

    if (searchError) throw searchError

    // Process each search and send alerts for new matching properties
    for (const search of searches || []) {
      // This would contain logic to check for new properties matching search criteria
      // and send email alerts using Resend
      console.log(`Processing search alert for user: ${search.profiles?.email}`)
    }

    return new Response(
      JSON.stringify({ message: 'Search alerts processed successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})