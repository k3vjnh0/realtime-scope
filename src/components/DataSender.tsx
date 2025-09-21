import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SensorData {
  N: number;
  P: number;
  K: number;
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

export function DataSender() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SensorData>({
    N: 0,
    P: 0,
    K: 0,
    temperature: 0,
    humidity: 0,
    ph: 0,
    rainfall: 0,
    label: '',
    soil_moisture: 0,
    soil_type: '',
    sunlight_exposure: 0,
    wind_speed: 0,
    co2_concentration: 0,
    organic_matter: 0,
    irrigation_frequency: 0,
    crop_density: 0,
    pest_pressure: 0,
    fertilizer_usage: 0,
    growth_stage: '',
    urban_area_proximity: 0,
    water_source_type: '',
    frost_risk: 0,
    water_usage_efficiency: 0,
    device_id: '',
    location: ''
  });

  const { toast } = useToast();

  const handleInputChange = (field: keyof SensorData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const sendData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-data', {
        body: formData
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Agricultural data sent successfully",
      });

      // Reset form
      setFormData({
        N: 0,
        P: 0,
        K: 0,
        temperature: 0,
        humidity: 0,
        ph: 0,
        rainfall: 0,
        label: '',
        soil_moisture: 0,
        soil_type: '',
        sunlight_exposure: 0,
        wind_speed: 0,
        co2_concentration: 0,
        organic_matter: 0,
        irrigation_frequency: 0,
        crop_density: 0,
        pest_pressure: 0,
        fertilizer_usage: 0,
        growth_stage: '',
        urban_area_proximity: 0,
        water_source_type: '',
        frost_risk: 0,
        water_usage_efficiency: 0,
        device_id: '',
        location: ''
      });

    } catch (error: any) {
      console.error('Error sending data:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSampleData = () => {
    setFormData({
      N: Math.round(85 + Math.random() * 20),
      P: Math.round(45 + Math.random() * 15),
      K: Math.round(75 + Math.random() * 25),
      temperature: Math.round((22 + Math.random() * 8) * 10) / 10,
      humidity: Math.round((65 + Math.random() * 20) * 10) / 10,
      ph: Math.round((6.8 + Math.random() * 0.4) * 100) / 100,
      rainfall: Math.round(Math.random() * 15 * 10) / 10,
      label: ['Tomato', 'Wheat', 'Rice', 'Corn', 'Potato'][Math.floor(Math.random() * 5)],
      soil_moisture: Math.round((45 + Math.random() * 20) * 10) / 10,
      soil_type: ['Sandy', 'Loamy', 'Clay'][Math.floor(Math.random() * 3)],
      sunlight_exposure: Math.round((6 + Math.random() * 6) * 10) / 10,
      wind_speed: Math.round((3 + Math.random() * 3) * 10) / 10,
      co2_concentration: Math.round(380 + Math.random() * 50),
      organic_matter: Math.round((3 + Math.random() * 2) * 10) / 10,
      irrigation_frequency: Math.round((2 + Math.random() * 3) * 10) / 10,
      crop_density: Math.round(400 + Math.random() * 100),
      pest_pressure: Math.round(Math.random() * 30),
      fertilizer_usage: Math.round((100 + Math.random() * 50) * 10) / 10,
      growth_stage: ['Seedling', 'Vegetative', 'Flowering', 'Fruiting'][Math.floor(Math.random() * 4)],
      urban_area_proximity: Math.round((10 + Math.random() * 20) * 10) / 10,
      water_source_type: ['River', 'Groundwater', 'Recycled'][Math.floor(Math.random() * 3)],
      frost_risk: Math.round(Math.random() * 10),
      water_usage_efficiency: Math.round((80 + Math.random() * 15) * 10) / 10,
      device_id: `sensor_${Math.floor(Math.random() * 1000)}`,
      location: `Field ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Send className="h-5 w-5" />
          Send Agricultural Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 mb-4">
          <Button onClick={generateSampleData} variant="outline" size="sm">
            Generate Sample Data
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Soil Nutrients */}
          <div className="space-y-2">
            <Label htmlFor="N">Nitrogen (N)</Label>
            <Input
              id="N"
              type="number"
              value={formData.N}
              onChange={(e) => handleInputChange('N', Number(e.target.value))}
              placeholder="ppm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="P">Phosphorus (P)</Label>
            <Input
              id="P"
              type="number"
              value={formData.P}
              onChange={(e) => handleInputChange('P', Number(e.target.value))}
              placeholder="ppm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="K">Potassium (K)</Label>
            <Input
              id="K"
              type="number"
              value={formData.K}
              onChange={(e) => handleInputChange('K', Number(e.target.value))}
              placeholder="ppm"
            />
          </div>

          {/* Environmental Conditions */}
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              type="number"
              step="0.1"
              value={formData.temperature}
              onChange={(e) => handleInputChange('temperature', Number(e.target.value))}
              placeholder="°C"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="humidity">Humidity</Label>
            <Input
              id="humidity"
              type="number"
              step="0.1"
              value={formData.humidity}
              onChange={(e) => handleInputChange('humidity', Number(e.target.value))}
              placeholder="%"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ph">pH Level</Label>
            <Input
              id="ph"
              type="number"
              step="0.01"
              value={formData.ph}
              onChange={(e) => handleInputChange('ph', Number(e.target.value))}
              placeholder="pH"
            />
          </div>

          {/* Crop Information */}
          <div className="space-y-2">
            <Label htmlFor="label">Crop Type</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => handleInputChange('label', e.target.value)}
              placeholder="e.g., Tomato"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="growth_stage">Growth Stage</Label>
            <Select value={formData.growth_stage} onValueChange={(value) => handleInputChange('growth_stage', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Seedling">Seedling</SelectItem>
                <SelectItem value="Vegetative">Vegetative</SelectItem>
                <SelectItem value="Flowering">Flowering</SelectItem>
                <SelectItem value="Fruiting">Fruiting</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="crop_density">Crop Density</Label>
            <Input
              id="crop_density"
              type="number"
              value={formData.crop_density}
              onChange={(e) => handleInputChange('crop_density', Number(e.target.value))}
              placeholder="plants/m²"
            />
          </div>

          {/* Soil Conditions */}
          <div className="space-y-2">
            <Label htmlFor="soil_moisture">Soil Moisture</Label>
            <Input
              id="soil_moisture"
              type="number"
              step="0.1"
              value={formData.soil_moisture}
              onChange={(e) => handleInputChange('soil_moisture', Number(e.target.value))}
              placeholder="%"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="soil_type">Soil Type</Label>
            <Select value={formData.soil_type} onValueChange={(value) => handleInputChange('soil_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sandy">Sandy</SelectItem>
                <SelectItem value="Loamy">Loamy</SelectItem>
                <SelectItem value="Clay">Clay</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="organic_matter">Organic Matter</Label>
            <Input
              id="organic_matter"
              type="number"
              step="0.1"
              value={formData.organic_matter}
              onChange={(e) => handleInputChange('organic_matter', Number(e.target.value))}
              placeholder="%"
            />
          </div>

          {/* Water Management */}
          <div className="space-y-2">
            <Label htmlFor="rainfall">Rainfall</Label>
            <Input
              id="rainfall"
              type="number"
              step="0.1"
              value={formData.rainfall}
              onChange={(e) => handleInputChange('rainfall', Number(e.target.value))}
              placeholder="mm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="irrigation_frequency">Irrigation Frequency</Label>
            <Input
              id="irrigation_frequency"
              type="number"
              step="0.1"
              value={formData.irrigation_frequency}
              onChange={(e) => handleInputChange('irrigation_frequency', Number(e.target.value))}
              placeholder="times/week"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="water_source_type">Water Source</Label>
            <Select value={formData.water_source_type} onValueChange={(value) => handleInputChange('water_source_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="River">River</SelectItem>
                <SelectItem value="Groundwater">Groundwater</SelectItem>
                <SelectItem value="Recycled">Recycled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Parameters */}
          <div className="space-y-2">
            <Label htmlFor="sunlight_exposure">Sunlight Exposure</Label>
            <Input
              id="sunlight_exposure"
              type="number"
              step="0.1"
              value={formData.sunlight_exposure}
              onChange={(e) => handleInputChange('sunlight_exposure', Number(e.target.value))}
              placeholder="hours/day"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wind_speed">Wind Speed</Label>
            <Input
              id="wind_speed"
              type="number"
              step="0.1"
              value={formData.wind_speed}
              onChange={(e) => handleInputChange('wind_speed', Number(e.target.value))}
              placeholder="km/h"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="co2_concentration">CO2 Concentration</Label>
            <Input
              id="co2_concentration"
              type="number"
              value={formData.co2_concentration}
              onChange={(e) => handleInputChange('co2_concentration', Number(e.target.value))}
              placeholder="ppm"
            />
          </div>

          {/* Device and Location */}
          <div className="space-y-2">
            <Label htmlFor="device_id">Device ID (Optional)</Label>
            <Input
              id="device_id"
              value={formData.device_id}
              onChange={(e) => handleInputChange('device_id', e.target.value)}
              placeholder="sensor_001"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Field A"
            />
          </div>
        </div>

        <Button 
          onClick={sendData} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Data...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Data
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}