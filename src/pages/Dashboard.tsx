import React, { useState, useMemo } from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Zap, 
  Activity, 
  Wifi,
  Leaf,
  Beaker,
  CloudRain,
  Sun,
  TreePine,
  Sprout,
  Bug,
  MapPin
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { SensorChart } from "@/components/SensorChart";
import { NutrientChart, StatusGauge } from "@/components/AgricultureCharts";
import { CSVUploader } from "@/components/CSVUploader";
import { DataSender } from "@/components/DataSender";
import { LatestDataDisplay } from "@/components/LatestDataDisplay";
import { 
  environmentalData, 
  soilData, 
  waterManagement, 
  cropManagement, 
  locationContext,
  deviceStatus 
} from "@/data/mockData";

interface CSVData {
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
}

export default function Dashboard() {
  const [uploadedData, setUploadedData] = useState<CSVData[]>([]);

  // Helper functions for data interpretation
  const getSoilTypeName = (type: number | string): string => {
    const numType = Number(type);
    switch (numType) {
      case 1: return 'Sandy';
      case 2: return 'Loamy';
      case 3: return 'Clay';
      default: return String(type);
    }
  };

  const getGrowthStageName = (stage: number | string): string => {
    const numStage = Number(stage);
    switch (numStage) {
      case 1: return 'Seedling';
      case 2: return 'Vegetative';
      case 3: return 'Flowering';
      default: return String(stage);
    }
  };

  const getWaterSourceName = (source: number | string): string => {
    const numSource = Number(source);
    switch (numSource) {
      case 1: return 'River';
      case 2: return 'Groundwater';
      case 3: return 'Recycled';
      default: return String(source);
    }
  };

  // Get most recent data point and calculate metrics
  const processedMetrics = useMemo(() => {
    if (uploadedData.length === 0) {
      return {
        temperature: 22,
        soilMoisture: 65,
        pestPressure: 15,
        cropHealthScore: 85,
        latestData: null
      };
    }

    // Get the most recent data point
    const latestData = uploadedData[uploadedData.length - 1];
    
    // Calculate crop health score for the latest data
    const cropHealthScore = Math.min(100, 
      (latestData.soil_moisture / 100 * 30) + 
      (latestData.ph > 6 && latestData.ph < 8 ? 25 : 10) + 
      (latestData.N + latestData.P + latestData.K) / 300 * 25 + 
      (100 - latestData.pest_pressure)
    );

    return {
      temperature: Math.round(latestData.temperature * 10) / 10,
      soilMoisture: Math.round(latestData.soil_moisture * 10) / 10,
      pestPressure: Math.round(latestData.pest_pressure * 10) / 10,
      cropHealthScore: Math.round(cropHealthScore * 10) / 10,
      latestData
    };
  }, [uploadedData]);

  // Generate time series data from uploaded data
  const generateTimeSeriesData = (field: keyof CSVData, unit: string) => {
    if (uploadedData.length === 0) {
      return environmentalData.temperature; // fallback to mock data
    }

    return uploadedData.slice(0, 24).map((item, index) => ({
      time: `${index.toString().padStart(2, '0')}:00`,
      value: Number(item[field]) || 0
    }));
  };

  const handleDataUpload = (data: CSVData[]) => {
    setUploadedData(data);
  };
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Agricultural IoT Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive crop and environmental monitoring system</p>
      </div>

      {/* CSV Upload Section */}
      <CSVUploader onDataUpload={handleDataUpload} />

      {/* Data Sender Section */}
      <DataSender />

      {/* Latest Data Display */}
      <LatestDataDisplay />

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Temperature"
          value={`${processedMetrics.temperature}°C`}
          change={uploadedData.length > 0 ? "Latest Reading" : "Optimal for growth"}
          changeType="positive"
          icon={Thermometer}
        />
        <MetricCard
          title="Soil Moisture"
          value={`${processedMetrics.soilMoisture}%`}
          change={uploadedData.length > 0 ? "Latest Reading" : "Well hydrated"}
          changeType="positive"
          icon={Droplets}
        />
        <MetricCard
          title="Crop Health"
          value={uploadedData.length > 0 ? `${processedMetrics.cropHealthScore}%` : "Excellent"}
          change={uploadedData.length > 0 ? "Calculated Score" : "97% plant vitality"}
          changeType="positive"
          icon={Leaf}
        />
        <MetricCard
          title="Pest Pressure"
          value={uploadedData.length > 0 ? `${processedMetrics.pestPressure}` : "Low"}
          change={uploadedData.length > 0 ? "Risk Index" : "No threats detected"}
          changeType="positive"
          icon={Bug}
        />
      </div>

      {/* Environmental Conditions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Environmental Conditions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SensorChart
            title="Temperature (24h)"
            data={generateTimeSeriesData('temperature', '°C')}
            color="hsl(var(--primary))"
            unit="°C"
          />
          <SensorChart
            title="Humidity (24h)"
            data={generateTimeSeriesData('humidity', '%')}
            color="hsl(var(--dashboard-accent))"
            unit="%"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SensorChart
            title="CO2 Concentration (24h)"
            data={generateTimeSeriesData('co2_concentration', ' ppm')}
            color="hsl(var(--dashboard-warning))"
            unit=" ppm"
          />
          <SensorChart
            title="Wind Speed (24h)"
            data={generateTimeSeriesData('wind_speed', ' km/h')}
            color="hsl(var(--dashboard-success))"
            unit=" km/h"
          />
        </div>
        
        <SensorChart
          title="Sunlight Exposure (24h)"
          data={generateTimeSeriesData('sunlight_exposure', ' hrs/day')}
          color="hsl(38 92% 50%)"
          unit=" hrs/day"
        />
      </div>

      {/* Soil Analysis */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Soil Analysis</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SensorChart
            title="Soil Moisture (24h)"
            data={soilData.soil_moisture}
            color="hsl(var(--dashboard-accent))"
            unit="%"
          />
          <SensorChart
            title="pH Levels (24h)"
            data={soilData.ph}
            color="hsl(var(--dashboard-success))"
            unit=""
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NutrientChart
            title="Nitrogen (N)"
            data={soilData.N}
            color="hsl(var(--primary))"
            unit=" ppm"
          />
          <NutrientChart
            title="Phosphorus (P)"
            data={soilData.P}
            color="hsl(var(--dashboard-warning))"
            unit=" ppm"
          />
          <NutrientChart
            title="Potassium (K)"
            data={soilData.K}
            color="hsl(var(--dashboard-success))"
            unit=" ppm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusGauge
            title="Organic Matter"
            value={soilData.organic_matter}
            maxValue={10}
            unit="%"
            color="hsl(var(--dashboard-success))"
            status="good"
          />
          <StatusGauge
            title="Soil Type Quality"
            value={85}
            maxValue={100}
            unit="%"
            color="hsl(var(--primary))"
            status="good"
          />
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <TreePine className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Soil Type</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {processedMetrics.latestData ? getSoilTypeName(processedMetrics.latestData.soil_type) : locationContext.soil_type}
            </p>
            <p className="text-sm text-muted-foreground">Well-draining</p>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Location</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {processedMetrics.latestData ? `${processedMetrics.latestData.urban_area_proximity}km` : `${locationContext.urban_area_proximity}km`}
            </p>
            <p className="text-sm text-muted-foreground">From urban area</p>
          </div>
        </div>
      </div>

      {/* Water Management */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Water Management</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NutrientChart
            title="Weekly Rainfall"
            data={waterManagement.rainfall}
            color="hsl(var(--dashboard-accent))"
            unit=" mm"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatusGauge
              title="Water Efficiency"
              value={processedMetrics.latestData ? processedMetrics.latestData.water_usage_efficiency : waterManagement.water_usage_efficiency}
              maxValue={processedMetrics.latestData ? 10 : 100}
              unit={processedMetrics.latestData ? " L/kg" : "%"}
              color="hsl(var(--dashboard-success))"
              status="good"
            />
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-2">
                <CloudRain className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">Irrigation</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {processedMetrics.latestData ? processedMetrics.latestData.irrigation_frequency : waterManagement.irrigation_frequency}
              </p>
              <p className="text-sm text-muted-foreground">times per week</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Droplets className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">
              Water Source: {processedMetrics.latestData ? getWaterSourceName(processedMetrics.latestData.water_source_type) : waterManagement.water_source_type}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-dashboard-success">
                {processedMetrics.latestData ? `${processedMetrics.latestData.water_usage_efficiency} L/kg` : `${waterManagement.water_usage_efficiency}%`}
              </p>
              <p className="text-sm text-muted-foreground">
                {processedMetrics.latestData ? "Water Usage Efficiency" : "Efficiency Rate"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-dashboard-accent">
                {processedMetrics.latestData ? processedMetrics.latestData.irrigation_frequency : waterManagement.irrigation_frequency}
              </p>
              <p className="text-sm text-muted-foreground">Weekly Frequency</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">Auto</p>
              <p className="text-sm text-muted-foreground">System Mode</p>
            </div>
          </div>
        </div>
      </div>

      {/* Crop Management */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Crop Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Crop Type</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {processedMetrics.latestData ? processedMetrics.latestData.label : cropManagement.label}
            </p>
            <p className="text-sm text-muted-foreground">Primary crop</p>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Sprout className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Growth Stage</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {processedMetrics.latestData ? getGrowthStageName(processedMetrics.latestData.growth_stage) : cropManagement.growth_stage}
            </p>
            <p className="text-sm text-muted-foreground">Current phase</p>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Bug className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Pest Pressure</span>
            </div>
            <p className="text-2xl font-bold text-dashboard-success">
              {processedMetrics.latestData ? processedMetrics.latestData.pest_pressure : cropManagement.pest_pressure}
            </p>
            <p className="text-sm text-muted-foreground">Risk level</p>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Beaker className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Fertilizer Usage</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {processedMetrics.latestData ? processedMetrics.latestData.fertilizer_usage : cropManagement.fertilizer_usage}
            </p>
            <p className="text-sm text-muted-foreground">kg per hectare</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatusGauge
            title="Crop Density"
            value={processedMetrics.latestData ? processedMetrics.latestData.crop_density : cropManagement.crop_density}
            maxValue={500}
            unit=" plants/m²"
            color="hsl(var(--dashboard-success))"
            status="good"
          />
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Environmental Risk Assessment</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Frost Risk</span>
                <span className="px-2 py-1 bg-dashboard-success/20 text-dashboard-success rounded text-sm">
                  {processedMetrics.latestData ? processedMetrics.latestData.frost_risk : cropManagement.frost_risk}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Disease Pressure</span>
                <span className="px-2 py-1 bg-dashboard-success/20 text-dashboard-success rounded text-sm">Low</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Weather Forecast</span>
                <span className="px-2 py-1 bg-dashboard-warning/20 text-dashboard-warning rounded text-sm">Moderate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Status */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Agricultural Sensor Network</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deviceStatus.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${
                  device.status === 'online' ? 'bg-dashboard-success' :
                  device.status === 'warning' ? 'bg-dashboard-warning' :
                  'bg-dashboard-danger'
                }`} />
                <div>
                  <p className="font-medium text-foreground">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.location}</p>
                  <p className="text-xs text-muted-foreground">{device.sensors.join(", ")}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium capitalize text-foreground">{device.status}</p>
                <p className="text-xs text-muted-foreground">{device.lastUpdate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}