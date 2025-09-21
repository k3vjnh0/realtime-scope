import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (req.method === 'POST') {
      const body = await req.json();
      
      // Validate required fields
      const requiredFields = [
        'N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 
        'label', 'soil_moisture', 'soil_type', 'sunlight_exposure', 
        'wind_speed', 'co2_concentration', 'organic_matter', 
        'irrigation_frequency', 'crop_density', 'pest_pressure', 
        'fertilizer_usage', 'growth_stage', 'urban_area_proximity', 
        'water_source_type', 'frost_risk', 'water_usage_efficiency'
      ];

      for (const field of requiredFields) {
        if (body[field] === undefined || body[field] === null) {
          return new Response(
            JSON.stringify({ error: `Missing required field: ${field}` }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
      }

      // Insert data into the database
      const { data, error } = await supabase
        .from('agricultural_data')
        .insert([{
          N: Number(body.N),
          P: Number(body.P),
          K: Number(body.K),
          temperature: Number(body.temperature),
          humidity: Number(body.humidity),
          ph: Number(body.ph),
          rainfall: Number(body.rainfall),
          label: String(body.label),
          soil_moisture: Number(body.soil_moisture),
          soil_type: String(body.soil_type),
          sunlight_exposure: Number(body.sunlight_exposure),
          wind_speed: Number(body.wind_speed),
          co2_concentration: Number(body.co2_concentration),
          organic_matter: Number(body.organic_matter),
          irrigation_frequency: Number(body.irrigation_frequency),
          crop_density: Number(body.crop_density),
          pest_pressure: Number(body.pest_pressure),
          fertilizer_usage: Number(body.fertilizer_usage),
          growth_stage: String(body.growth_stage),
          urban_area_proximity: Number(body.urban_area_proximity),
          water_source_type: String(body.water_source_type),
          frost_risk: Number(body.frost_risk),
          water_usage_efficiency: Number(body.water_usage_efficiency),
          device_id: body.device_id || null,
          location: body.location || null,
          timestamp: body.timestamp || new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to insert data', details: error.message }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      console.log('Successfully inserted data:', data);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Data inserted successfully',
          data: data[0]
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (req.method === 'GET') {
      // Get recent data with optional filters
      const url = new URL(req.url);
      const limit = Number(url.searchParams.get('limit')) || 50;
      const device_id = url.searchParams.get('device_id');
      const hours = Number(url.searchParams.get('hours')) || 24;

      let query = supabase
        .from('agricultural_data')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (device_id) {
        query = query.eq('device_id', device_id);
      }

      // Filter by time range
      const timeThreshold = new Date();
      timeThreshold.setHours(timeThreshold.getHours() - hours);
      query = query.gte('timestamp', timeThreshold.toISOString());

      const { data, error } = await query;

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch data', details: error.message }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          data: data,
          count: data.length
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});