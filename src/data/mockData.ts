// Comprehensive Agricultural IoT Sensor Data
export const environmentalData = {
  temperature: Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    value: Math.round((22 + Math.sin(i / 4) * 8 + Math.random() * 3) * 10) / 10
  })),
  
  humidity: Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    value: Math.round((65 + Math.cos(i / 3) * 20 + Math.random() * 5) * 10) / 10
  })),
  
  co2_concentration: Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    value: Math.round(380 + Math.sin(i / 6) * 50 + Math.random() * 20)
  })),
  
  wind_speed: Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    value: Math.round((3 + Math.sin(i / 5) * 2 + Math.random() * 1) * 10) / 10
  })),
  
  sunlight_exposure: Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    value: i >= 6 && i <= 18 ? Math.round((60 + Math.sin((i-12) / 3) * 30 + Math.random() * 10) * 10) / 10 : 0
  }))
};

export const soilData = {
  soil_moisture: Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    value: Math.round((45 + Math.sin(i / 8) * 15 + Math.random() * 5) * 10) / 10
  })),
  
  ph: Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    value: Math.round((6.8 + Math.sin(i / 12) * 0.5 + Math.random() * 0.2) * 100) / 100
  })),
  
  N: Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    value: Math.round((85 + Math.random() * 20) * 10) / 10
  })),
  
  P: Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    value: Math.round((45 + Math.random() * 15) * 10) / 10
  })),
  
  K: Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    value: Math.round((75 + Math.random() * 25) * 10) / 10
  })),
  
  organic_matter: 4.2
};

export const waterManagement = {
  irrigation_frequency: 3.2, // times per week
  water_usage_efficiency: 87.5, // percentage
  water_source_type: "Groundwater",
  rainfall: Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    value: Math.round(Math.random() * 15 * 10) / 10
  }))
};

export const cropManagement = {
  crop_density: 450, // plants per hectare
  growth_stage: "Flowering",
  pest_pressure: "Low",
  fertilizer_usage: 125.5, // kg per hectare
  label: "Tomato",
  frost_risk: "None"
};

export const locationContext = {
  urban_area_proximity: 12.5, // km
  soil_type: "Loamy"
};

export const deviceStatus = [
  { id: 1, name: "Weather Station Alpha", status: "online", location: "Field A - North", lastUpdate: "1 min ago", sensors: ["Temperature", "Humidity", "Wind"] },
  { id: 2, name: "Soil Monitor Beta", status: "online", location: "Field A - Center", lastUpdate: "2 min ago", sensors: ["pH", "Moisture", "NPK"] },
  { id: 3, name: "CO2 Sensor Gamma", status: "warning", location: "Field B - East", lastUpdate: "5 min ago", sensors: ["CO2", "Air Quality"] },
  { id: 4, name: "Light Sensor Delta", status: "online", location: "Field B - West", lastUpdate: "30 sec ago", sensors: ["UV", "PAR", "Lux"] },
  { id: 5, name: "Water Monitor Epsilon", status: "offline", location: "Irrigation Hub", lastUpdate: "15 min ago", sensors: ["Flow", "Pressure", "Quality"] },
  { id: 6, name: "Pest Detector Zeta", status: "online", location: "Field C - South", lastUpdate: "3 min ago", sensors: ["Motion", "Camera", "Sound"] }
];