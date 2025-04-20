
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-do-api-key',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Handle the request
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const url = new URL(req.url);
    
    // Try both environment variables in order
    let apiKey = Deno.env.get("DIGITAL_OCEAN_API_KEY");
    if (!apiKey) {
      apiKey = Deno.env.get("DIGITAL_OCEAN_API_KEY1");
      console.log("Using fallback API key from DIGITAL_OCEAN_API_KEY1");
    } else {
      console.log("Using primary API key from DIGITAL_OCEAN_API_KEY");
    }
    
    // Use the API key from the request header as a fallback
    const requestApiKey = req.headers.get('x-do-api-key');
    
    // Prefer the environment variable, but fallback to the header
    const effectiveApiKey = apiKey || requestApiKey;
    
    if (!effectiveApiKey) {
      console.error('No API key found in environment or request headers');
      return new Response(
        JSON.stringify({ error: 'API key is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Extract the DigitalOcean endpoint from the URL path
    const endpoint = url.pathname.replace('/digital-ocean/', '');
    
    let doUrl = '';
    let doMethod = 'GET';
    let doBody = null;

    // Handle different endpoints
    if (req.method === 'GET') {
      if (endpoint === 'validate') {
        // Validate API key by checking account
        doUrl = 'https://api.digitalocean.com/v2/account';
      } else if (endpoint === 'sizes') {
        // Get available droplet sizes
        doUrl = 'https://api.digitalocean.com/v2/sizes';
      } else if (endpoint === 'regions') {
        // Get available regions
        doUrl = 'https://api.digitalocean.com/v2/regions';
      } else {
        // Default to passing through the endpoint
        doUrl = `https://api.digitalocean.com/v2/${endpoint}`;
      }
    } else if (req.method === 'POST') {
      // Handle POST requests (create resources)
      if (endpoint === 'sizes') {
        // Special case for sizes - use GET request to DigitalOcean API
        doUrl = 'https://api.digitalocean.com/v2/sizes';
        doMethod = 'GET';
      } else if (endpoint === 'regions') {
        // Special case for regions - use GET request to DigitalOcean API
        doUrl = 'https://api.digitalocean.com/v2/regions';
        doMethod = 'GET';
      } else if (endpoint === 'droplets') {
        doUrl = 'https://api.digitalocean.com/v2/droplets';
        doMethod = 'POST';
        
        try {
          doBody = await req.json();
          console.log("Droplet creation request:", JSON.stringify(doBody));
        } catch (e) {
          console.error('Error parsing request body:', e.message);
          return new Response(
            JSON.stringify({ error: 'Invalid request body' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }
      } else {
        // Default to passing through the endpoint and body
        doUrl = `https://api.digitalocean.com/v2/${endpoint}`;
        doMethod = 'POST';
        
        try {
          doBody = await req.json();
        } catch (e) {
          console.error('Error parsing request body:', e.message);
          return new Response(
            JSON.stringify({ error: 'Invalid request body' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }
      }
    }

    // Make the request to Digital Ocean API
    console.log(`Making ${doMethod} request to ${doUrl}`);
    const doResponse = await fetch(doUrl, {
      method: doMethod,
      headers: {
        'Authorization': `Bearer ${effectiveApiKey}`,
        'Content-Type': 'application/json',
      },
      body: doBody ? JSON.stringify(doBody) : null,
    });

    // Check if the response is ok
    if (!doResponse.ok) {
      const errorText = await doResponse.text();
      console.error(`DigitalOcean API error (${doResponse.status}):`, errorText);
      
      let errorJson;
      try {
        errorJson = JSON.parse(errorText);
      } catch (e) {
        errorJson = { message: errorText || 'Unknown error from DigitalOcean API' };
      }
      
      return new Response(
        JSON.stringify({ error: errorJson }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: doResponse.status 
        }
      );
    }

    // Get the response data as text first
    const responseText = await doResponse.text();
    
    // Try to parse it as JSON
    let responseData;
    try {
      responseData = responseText ? JSON.parse(responseText) : {};
      if (endpoint === 'sizes') {
        console.log(`Retrieved ${responseData.sizes?.length || 0} package sizes`);
      }
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      console.error('Response text was:', responseText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to parse response from DigitalOcean API',
          details: error.message,
          responseText: responseText.substring(0, 500) // Include part of the raw response for debugging
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }
    
    // Pass through the status and data from Digital Ocean
    return new Response(
      JSON.stringify(responseData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: doResponse.status 
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
