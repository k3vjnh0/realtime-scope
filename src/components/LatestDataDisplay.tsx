import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LatestData {
  id: string;
  n: number;
  p: number;
  k: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  soil_moisture: number;
  soil_type: string;
  sunlight_exposure: number;
  wind_speed: number;
  co2_concentration: number;
  organic_matter: number;
  irrigation_frequency: number;
  crop_density: number;
  pest_pressure: number;
  fertilizer_usage: number;
  growth_stage: string;
  urban_area_proximity: number;
  water_source_type: string;
  frost_risk: number;
  water_usage_efficiency: number;
  label: string;
  device_id?: string;
  location?: string;
  created_at: string;
  timestamp: string;
}

interface LatestDataDisplayProps {
  onDataFetched?: (data: LatestData) => void;
}

export function LatestDataDisplay({ onDataFetched }: LatestDataDisplayProps) {
  const [latestData, setLatestData] = useState<LatestData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestData();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('agricultural_data_changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'agricultural_data'
      }, () => {
        fetchLatestData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLatestData = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('agricultural_data')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setLatestData(data);
        onDataFetched?.(data);
      }
    } catch (err) {
      console.error('Error fetching latest data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Don't render anything - this is just a data fetcher
  return null;
}