// Mock IoT sensor data for demonstration
export const temperatureData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  value: Math.round((20 + Math.sin(i / 4) * 5 + Math.random() * 2) * 10) / 10
}));

export const humidityData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  value: Math.round((60 + Math.cos(i / 3) * 15 + Math.random() * 5) * 10) / 10
}));

export const co2Data = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  value: Math.round(400 + Math.sin(i / 6) * 100 + Math.random() * 20)
}));

export const energyData = Array.from({ length: 7 }, (_, i) => ({
  day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
  consumption: Math.round((50 + Math.random() * 30) * 10) / 10,
  production: Math.round((30 + Math.random() * 25) * 10) / 10
}));

export const deviceStatus = [
  { id: 1, name: "Temperature Sensor A1", status: "online", location: "Building A - Floor 1", lastUpdate: "2 min ago" },
  { id: 2, name: "Humidity Sensor B2", status: "online", location: "Building B - Floor 2", lastUpdate: "1 min ago" },
  { id: 3, name: "CO2 Sensor C1", status: "offline", location: "Building C - Floor 1", lastUpdate: "15 min ago" },
  { id: 4, name: "Energy Meter D1", status: "online", location: "Building D - Main", lastUpdate: "30 sec ago" },
  { id: 5, name: "Soil Moisture E1", status: "warning", location: "Greenhouse E", lastUpdate: "5 min ago" },
];