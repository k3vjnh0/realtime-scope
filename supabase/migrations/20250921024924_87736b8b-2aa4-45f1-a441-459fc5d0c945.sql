-- Create agricultural sensor data table
CREATE TABLE public.agricultural_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  N DECIMAL(10,2) NOT NULL,
  P DECIMAL(10,2) NOT NULL,
  K DECIMAL(10,2) NOT NULL,
  temperature DECIMAL(10,2) NOT NULL,
  humidity DECIMAL(10,2) NOT NULL,
  ph DECIMAL(10,2) NOT NULL,
  rainfall DECIMAL(10,2) NOT NULL,
  label TEXT NOT NULL,
  soil_moisture DECIMAL(10,2) NOT NULL,
  soil_type TEXT NOT NULL,
  sunlight_exposure DECIMAL(10,2) NOT NULL,
  wind_speed DECIMAL(10,2) NOT NULL,
  co2_concentration DECIMAL(10,2) NOT NULL,
  organic_matter DECIMAL(10,2) NOT NULL,
  irrigation_frequency DECIMAL(10,2) NOT NULL,
  crop_density DECIMAL(10,2) NOT NULL,
  pest_pressure DECIMAL(10,2) NOT NULL,
  fertilizer_usage DECIMAL(10,2) NOT NULL,
  growth_stage TEXT NOT NULL,
  urban_area_proximity DECIMAL(10,2) NOT NULL,
  water_source_type TEXT NOT NULL,
  frost_risk DECIMAL(10,2) NOT NULL,
  water_usage_efficiency DECIMAL(10,2) NOT NULL,
  device_id TEXT,
  location TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.agricultural_data ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading all data (public dashboard)
CREATE POLICY "Allow public read access to agricultural data" 
ON public.agricultural_data 
FOR SELECT 
USING (true);

-- Create policy to allow inserting data (for API endpoints)
CREATE POLICY "Allow public insert access to agricultural data" 
ON public.agricultural_data 
FOR INSERT 
WITH CHECK (true);

-- Create index for timestamp queries
CREATE INDEX idx_agricultural_data_timestamp ON public.agricultural_data(timestamp DESC);

-- Create index for device_id queries
CREATE INDEX idx_agricultural_data_device_id ON public.agricultural_data(device_id);

-- Enable realtime for live updates
ALTER TABLE public.agricultural_data REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agricultural_data;