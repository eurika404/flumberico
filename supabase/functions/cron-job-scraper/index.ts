import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verify the request is from a cron job (you should add authentication)
    const authHeader = req.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${Deno.env.get('CRON_SECRET_KEY')}`) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    // Call the job scraper function
    const scraperUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/job-scraper`

    const response = await fetch(scraperUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Job scraper failed: ${response.statusText}`)
    }

    const result = await response.json()

    return new Response(
      JSON.stringify({
        success: true,
        message: 'CRON job scraping completed successfully',
        timestamp: new Date().toISOString(),
        result
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('CRON job scraper error:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})