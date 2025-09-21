import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Database, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AgricultureData {
  id: string;
  created_at: string;
  timestamp: string;
  n: number;
  p: number;
  k: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  label: string;
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
  device_id?: string;
  location?: string;
}

export function LatestDataDisplay() {
  const [latestData, setLatestData] = useState<AgricultureData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchLatestData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-data', {
        method: 'GET'
      });

      if (error) {
        throw error;
      }

      if (data?.data) {
        setLatestData(data.data);
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch latest data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (latestData.length === 0) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Database className="h-5 w-5" />
            Latest Agricultural Data
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground mb-4">No data available yet</p>
          <Button onClick={fetchLatestData} disabled={isLoading} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            {isLoading ? "Loading..." : "Refresh"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const latest = latestData[0];

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground flex items-center gap-2">
            <Database className="h-5 w-5" />
            Latest Agricultural Data
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Clock className="mr-1 h-3 w-3" />
              {formatDate(latest.timestamp)}
            </Badge>
            <Button onClick={fetchLatestData} disabled={isLoading} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Crop</p>
            <p className="font-semibold text-foreground">{latest.label}</p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Growth Stage</p>
            <p className="font-semibold text-foreground">{latest.growth_stage}</p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Device ID</p>
            <p className="font-semibold text-foreground">{latest.device_id || 'N/A'}</p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="font-semibold text-foreground">{latest.location || 'N/A'}</p>
          </div>
        </div>

        {/* Soil Nutrients */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Soil Nutrients (ppm)</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Nitrogen (N)</p>
              <p className="text-xl font-bold text-primary">{latest.n}</p>
            </div>
            <div className="text-center p-3 bg-dashboard-warning/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Phosphorus (P)</p>
              <p className="text-xl font-bold text-dashboard-warning">{latest.p}</p>
            </div>
            <div className="text-center p-3 bg-dashboard-success/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Potassium (K)</p>
              <p className="text-xl font-bold text-dashboard-success">{latest.k}</p>
            </div>
          </div>
        </div>

        {/* Environmental Conditions */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Environmental Conditions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="font-semibold text-foreground">{latest.temperature}°C</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold text-foreground">{latest.humidity}%</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">pH Level</p>
              <p className="font-semibold text-foreground">{latest.ph}</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Soil Moisture</p>
              <p className="font-semibold text-foreground">{latest.soil_moisture}%</p>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Additional Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">CO2</p>
              <p className="font-semibold text-foreground">{latest.co2_concentration} ppm</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="font-semibold text-foreground">{latest.wind_speed} km/h</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Pest Pressure</p>
              <p className="font-semibold text-foreground">{latest.pest_pressure}</p>
            </div>
          </div>
        </div>

        {/* Show count of recent records */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing latest of {latestData.length} recent record{latestData.length !== 1 ? 's' : ''}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}